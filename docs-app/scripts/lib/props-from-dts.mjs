import path from 'node:path';
import ts from 'typescript';

/**
 * Ищет объявление компонента и его типа пропсов во всех декларациях пакета.
 *
 * Формат `dist/index.d.ts` у разных версий отличается (FC, forwardRef,
 * функция-стрелка, `declare function`, отдельный интерфейс `${Name}Props`),
 * а часть компонентов объявлена не в `index.d.ts`, а в собственном
 * declaration-файле и реэкспортируется. Поэтому обходим все файлы внутри
 * каталога пакета и опираемся не на одну форму записи, а на найденные узлы.
 */
export const findDeclarationNodes = (program, rootDirectory, componentName) => {
  const result = { componentNode: null, propsNode: null };
  const normalizedRoot = `${path.resolve(rootDirectory)}${path.sep}`;

  for (const sourceFile of program.getSourceFiles()) {
    if (!path.resolve(sourceFile.fileName).startsWith(normalizedRoot)) continue;

    const visit = (node) => {
      const isComponentLike =
        (ts.isVariableDeclaration(node) || ts.isFunctionDeclaration(node)) &&
        node.name &&
        ts.isIdentifier(node.name) &&
        (node.name.text === componentName || node.name.text === `${componentName}Base`);

      if (isComponentLike) {
        // Объявление переменной информативнее `declare function`: у него тип
        // пропсов часто записан напрямую (`React.FC<Props>`), поэтому имеет
        // приоритет независимо от порядка обхода файлов.
        const current = result.componentNode;

        if (!current || (ts.isFunctionDeclaration(current) && ts.isVariableDeclaration(node))) {
          result.componentNode = node;
        }
      }

      if (
        (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) &&
        node.name.text === `${componentName}Props`
      ) {
        result.propsNode = result.propsNode ?? node;
      }

      ts.forEachChild(node, visit);
    };

    visit(sourceFile);
  }

  return result;
};

/**
 * Достаёт тип пропсов, перебирая известные формы записи. Каждая ветка
 * проверяет, что в найденном типе реально есть свойства: иначе у
 * `declare function` в руки попадает тип возвращаемого значения, а у
 * неразрешённых generic-параметров — пустой тип.
 */
export const resolvePropsType = (checker, declarationNodes, componentName) => {
  const { componentNode, propsNode } = declarationNodes;
  const hasProps = (type) => Boolean(type) && checker.getPropertiesOfType(type).length > 0;

  // `declare function Name(props: NameProps): ReactElement` — пропсы в параметре.
  if (componentNode && ts.isFunctionDeclaration(componentNode)) {
    const parameter = componentNode.parameters[0];

    if (parameter) {
      const parameterType = checker.getTypeAtLocation(parameter);
      if (hasProps(parameterType)) return parameterType;
    }
  }

  if (componentNode?.type && ts.isTypeReferenceNode(componentNode.type)) {
    const { typeName, typeArguments } = componentNode.type;

    const firstArgumentType =
      typeArguments?.length === 1 ? checker.getTypeFromTypeNode(typeArguments[0]) : null;

    if (firstArgumentType && hasProps(firstArgumentType)) {
      const isReactFc =
        ts.isQualifiedName(typeName) &&
        ts.isIdentifier(typeName.left) &&
        typeName.left.text === 'React' &&
        typeName.right.text === 'FC';

      if (isReactFc || ts.isIdentifier(typeName)) {
        return firstArgumentType;
      }
    }
  }

  if (componentNode?.initializer && ts.isCallExpression(componentNode.initializer)) {
    const { expression, typeArguments } = componentNode.initializer;

    if (
      ts.isIdentifier(expression) &&
      expression.text === 'forwardRef' &&
      typeArguments?.length === 2
    ) {
      const forwardRefPropsType = checker.getTypeFromTypeNode(typeArguments[1]);
      if (hasProps(forwardRefPropsType)) return forwardRefPropsType;
    }
  }

  // Тип символа компонента и первый параметр его сигнатуры вызова.
  if (componentNode?.name) {
    const symbol = checker.getSymbolAtLocation(componentNode.name);

    if (symbol) {
      const type = checker.getTypeOfSymbolAtLocation(symbol, componentNode.name);
      const signatures = [...type.getCallSignatures(), ...type.getConstructSignatures()];

      for (const signature of signatures) {
        const parameter = signature.getParameters()[0];
        if (!parameter) continue;

        const parameterDeclaration =
          parameter.valueDeclaration ?? parameter.declarations?.[0] ?? componentNode;
        const parameterType = checker.getTypeOfSymbolAtLocation(parameter, parameterDeclaration);

        if (hasProps(parameterType)) return parameterType;
      }
    }
  }

  // Последний шанс — объявленный интерфейс/тип `${Name}Props`.
  if (propsNode) {
    const propsNodeType = checker.getTypeAtLocation(propsNode.name);
    if (hasProps(propsNodeType)) return propsNodeType;
  }

  return null;
};

/** Создаёт TypeScript-программу по одному declaration-файлу пакета. */
export const createDeclarationProgram = (typesFilePath) =>
  ts.createProgram([typesFilePath], {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    skipLibCheck: true,
    noResolve: false,
  });
