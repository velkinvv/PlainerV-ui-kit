import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import {
  createDeclarationProgram,
  findDeclarationNodes,
  resolvePropsType,
} from './lib/props-from-dts.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DOCS_APP_ROOT = path.resolve(SCRIPT_DIR, '..');
const PROJECT_ROOT = path.resolve(DOCS_APP_ROOT, '..');
const SOURCE_ROOT = path.resolve(PROJECT_ROOT, 'src');
const DIST_TYPES_FILE = path.resolve(PROJECT_ROOT, 'dist/index.d.ts');
const CACHE_FILE = path.resolve(DOCS_APP_ROOT, '.cache/docs-manifest-cache.json');
const CACHE_VERSION = 6;

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const config = readJson(path.resolve(DOCS_APP_ROOT, 'docs-manifest.config.json'));
const docsRoot = path.resolve(DOCS_APP_ROOT, config.docsRoot);
const outputJson = path.resolve(DOCS_APP_ROOT, config.outputJson);
const outputTs = path.resolve(DOCS_APP_ROOT, config.outputTs);
const llmsTxtPath = path.resolve(DOCS_APP_ROOT, config.llmsTxt);
const llmsFullTxtPath = path.resolve(DOCS_APP_ROOT, config.llmsFullTxt);

const isIdentifier = (node, text) => ts.isIdentifier(node) && node.text === text;
const slugify = (value) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const hashText = (value) => crypto.createHash('sha1').update(value).digest('hex');

const walkDocsFiles = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkDocsFiles(fullPath);
    if (entry.isFile() && fullPath.endsWith('.docs.tsx')) return [fullPath];
    return [];
  });
};

const getObjectProperty = (obj, key) =>
  obj.properties.find(
    (property) =>
      ts.isPropertyAssignment(property) &&
      ts.isIdentifier(property.name) &&
      property.name.text === key,
  );

const getString = (obj, key) => {
  const prop = getObjectProperty(obj, key);
  if (!prop) return undefined;
  if (ts.isStringLiteral(prop.initializer) || ts.isNoSubstitutionTemplateLiteral(prop.initializer)) {
    return prop.initializer.text;
  }
  return undefined;
};

const getBoolean = (obj, key) => {
  const prop = getObjectProperty(obj, key);
  if (!prop) return undefined;
  if (prop.initializer.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (prop.initializer.kind === ts.SyntaxKind.FalseKeyword) return false;
  return undefined;
};

const getNumber = (obj, key) => {
  const prop = getObjectProperty(obj, key);
  if (!prop || !ts.isNumericLiteral(prop.initializer)) return undefined;
  return Number(prop.initializer.text);
};

const getStringArray = (obj, key) => {
  const prop = getObjectProperty(obj, key);
  if (!prop || !ts.isArrayLiteralExpression(prop.initializer)) return [];
  return prop.initializer.elements
    .filter((item) => ts.isStringLiteral(item) || ts.isNoSubstitutionTemplateLiteral(item))
    .map((item) => item.text);
};

const getObjectArray = (obj, key) => {
  const prop = getObjectProperty(obj, key);
  if (!prop || !ts.isArrayLiteralExpression(prop.initializer)) return [];
  return prop.initializer.elements.filter(ts.isObjectLiteralExpression);
};

const getPropItems = (obj, key) => {
  const prop = getObjectProperty(obj, key);
  if (!prop || !ts.isArrayLiteralExpression(prop.initializer)) return [];

  return prop.initializer.elements
    .filter(ts.isObjectLiteralExpression)
    .map((item) => ({
      name: getString(item, 'name') ?? '',
      type: getString(item, 'type') ?? 'unknown',
      required: getBoolean(item, 'required') ?? false,
      defaultValue: getString(item, 'defaultValue') ?? '',
      description: getString(item, 'description') ?? '',
      deprecated: getBoolean(item, 'deprecated') ?? false,
    }))
    .filter((item) => item.name);
};

const resolveImportFilePath = (fromFilePath, specifier) => {
  if (!specifier.startsWith('.')) return null;

  const basePath = path.resolve(path.dirname(fromFilePath), specifier);
  const candidates = [
    basePath,
    `${basePath}.ts`,
    `${basePath}.tsx`,
    `${basePath}.js`,
    `${basePath}.jsx`,
    path.join(basePath, 'index.ts'),
    path.join(basePath, 'index.tsx'),
  ];

  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
};

const findImportedComponentPath = (sourceFile, docsFilePath, componentName) => {
  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    if (!statement.importClause?.namedBindings || !ts.isNamedImports(statement.importClause.namedBindings)) {
      continue;
    }

    const hasComponentImport = statement.importClause.namedBindings.elements.some((item) => {
      const localName = item.name.text;
      const importedName = item.propertyName?.text ?? item.name.text;
      return localName === componentName || importedName === componentName;
    });

    if (!hasComponentImport || !ts.isStringLiteral(statement.moduleSpecifier)) continue;

    const resolved = resolveImportFilePath(docsFilePath, statement.moduleSpecifier.text);
    if (resolved) return resolved;
  }

  return null;
};

const findComponentTypeReference = (sourceFile, componentName) => {
  let result = null;

  const visit = (node) => {
    if (result) return;

    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      const varName = node.name.text;
      const matchesComponent = varName === componentName || varName === `${componentName}Base`;

      if (matchesComponent && node.type && ts.isTypeReferenceNode(node.type)) {
        if (
          ts.isQualifiedName(node.type.typeName) &&
          ts.isIdentifier(node.type.typeName.left) &&
          node.type.typeName.left.text === 'React' &&
          node.type.typeName.right.text === 'FC' &&
          node.type.typeArguments?.length
        ) {
          result = node.type.typeArguments[0];
          return;
        }
      }

      if (
        matchesComponent &&
        node.initializer &&
        ts.isCallExpression(node.initializer) &&
        ts.isIdentifier(node.initializer.expression) &&
        node.initializer.expression.text === 'forwardRef' &&
        node.initializer.typeArguments?.length === 2
      ) {
        result = node.initializer.typeArguments[1];
        return;
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return result;
};

const collectDefaultPropValues = (sourceFile, componentName) => {
  const defaults = new Map();

  const collectFromParam = (param) => {
    if (!ts.isObjectBindingPattern(param.name)) return;

    for (const element of param.name.elements) {
      if (!ts.isBindingElement(element) || !ts.isIdentifier(element.name)) continue;
      if (!element.initializer) continue;
      defaults.set(element.name.text, element.initializer.getText(sourceFile));
    }
  };

  const visit = (node) => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      const varName = node.name.text;
      if ((varName === componentName || varName === `${componentName}Base`) && node.initializer) {
        if (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer)) {
          if (node.initializer.parameters[0]) collectFromParam(node.initializer.parameters[0]);
        }

        if (
          ts.isCallExpression(node.initializer) &&
          ts.isIdentifier(node.initializer.expression) &&
          node.initializer.expression.text === 'forwardRef' &&
          node.initializer.arguments[0] &&
          (ts.isArrowFunction(node.initializer.arguments[0]) ||
            ts.isFunctionExpression(node.initializer.arguments[0]))
        ) {
          const renderFn = node.initializer.arguments[0];
          if (renderFn.parameters[0]) collectFromParam(renderFn.parameters[0]);
        }
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return defaults;
};

const normalizePath = (value) => value.split(path.sep).join('/');

const isKitSourceFile = (fileName) => {
  const normalized = normalizePath(path.resolve(fileName));
  const sourceRoot = normalizePath(SOURCE_ROOT);
  return normalized.startsWith(`${sourceRoot}/`);
};

const mapPropsFromType = (checker, propsType, defaultValues = new Map(), filterSymbol) =>
  checker
    .getPropertiesOfType(propsType)
    .filter((symbol) => (filterSymbol ? filterSymbol(symbol) : true))
    .map((symbol) => {
      const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
      const propertyType = declaration
        ? checker.getTypeOfSymbolAtLocation(symbol, declaration)
        : checker.getTypeOfSymbol(symbol);

      const docs = ts.displayPartsToString(symbol.getDocumentationComment(checker));
      const tags = symbol.getJsDocTags(checker);

      return {
        name: symbol.getName(),
        type: checker.typeToString(propertyType),
        required: !(symbol.flags & ts.SymbolFlags.Optional),
        defaultValue: defaultValues.get(symbol.getName()) ?? '',
        description: docs,
        deprecated: tags.some((tag) => tag.name === 'deprecated'),
      };
    });

const isOwnKitPropSymbol = (symbol) => {
  const declarations = symbol.declarations ?? (symbol.valueDeclaration ? [symbol.valueDeclaration] : []);
  if (declarations.length === 0) return true;

  return declarations.some((declaration) => {
    const declarationFile = declaration.getSourceFile()?.fileName;
    return declarationFile ? isKitSourceFile(declarationFile) : false;
  });
};

/**
 * То же для режима `dist`: декларации лежат в `web/dist`, а не в `web/src`,
 * поэтому фильтр по каталогу пакета, иначе в таблицу попадают DOM/React-пропсы
 * (`style`, `className`, `onClick` и сотни других).
 */
const isPackagePropSymbol = (symbol) => {
  const declarations = symbol.declarations ?? (symbol.valueDeclaration ? [symbol.valueDeclaration] : []);
  if (declarations.length === 0) return true;

  const normalizedDist = `${path.resolve(path.dirname(DIST_TYPES_FILE))}${path.sep}`;

  return declarations.some((declaration) =>
    path.resolve(declaration.getSourceFile().fileName).startsWith(normalizedDist),
  );
};

/**
 * Ищет объявление переменной компонента (`const X = ...` / `const X = forwardRef(...)`).
 * Нужно как fallback: у обёрнутых в `forwardRef` компонентов тип пропсов живёт
 * в параметре функции, а не в аннотации переменной (например, `DataGrid`).
 */
const findComponentDeclaration = (sourceFile, componentName) => {
  let result = null;
  const names = new Set([componentName, `${componentName}Base`]);

  const visit = (node) => {
    if (result) return;

    if (
      (ts.isVariableDeclaration(node) || ts.isFunctionDeclaration(node)) &&
      node.name &&
      ts.isIdentifier(node.name) &&
      names.has(node.name.text)
    ) {
      result = node;
      return;
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return result;
};

const extractComponentPropsFromSource = (componentFilePath, componentName) => {
  const program = ts.createProgram([componentFilePath], {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    jsx: ts.JsxEmit.ReactJSX,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    allowJs: true,
    skipLibCheck: true,
    noResolve: false,
  });

  const sourceFile = program.getSourceFile(componentFilePath);
  if (!sourceFile) return [];

  const checker = program.getTypeChecker();
  const propsTypeNode = findComponentTypeReference(sourceFile, componentName);
  const defaultValues = collectDefaultPropValues(sourceFile, componentName);

  let propsType = propsTypeNode ? checker.getTypeFromTypeNode(propsTypeNode) : null;

  if (!propsType) {
    // `forwardRef` с generic-функцией: тип пропсов — первый параметр вызова.
    const declaration = findComponentDeclaration(sourceFile, componentName);
    const symbol =
      declaration && ts.isIdentifier(declaration.name)
        ? checker.getSymbolAtLocation(declaration.name)
        : null;

    if (symbol) {
      const componentType = checker.getTypeOfSymbolAtLocation(symbol, declaration.name);
      const signature = [
        ...componentType.getCallSignatures(),
        ...componentType.getConstructSignatures(),
      ][0];
      const parameter = signature?.getParameters()[0];

      if (parameter) {
        propsType = checker.getTypeOfSymbolAtLocation(
          parameter,
          parameter.valueDeclaration ?? declaration,
        );
      }
    }
  }

  if (!propsType) return [];

  return mapPropsFromType(checker, propsType, defaultValues, isOwnKitPropSymbol);
};

const extractComponentPropsFromDist = (componentName) => {
  if (!fs.existsSync(DIST_TYPES_FILE)) return [];

  const program = createDeclarationProgram(DIST_TYPES_FILE);
  const declarationFile = program.getSourceFile(DIST_TYPES_FILE);
  if (!declarationFile) return [];

  const checker = program.getTypeChecker();
  // Обходим весь каталог пакета: часть компонентов объявлена не в
  // `index.d.ts`, а в собственном declaration-файле и реэкспортируется
  // (например, `DataGrid` объявлен через generic-forwardRef в своём файле).
  const declarationNodes = findDeclarationNodes(
    program,
    path.dirname(DIST_TYPES_FILE),
    componentName,
  );
  const propsType = resolvePropsType(checker, declarationNodes, componentName);

  if (!propsType) return [];

  return mapPropsFromType(checker, propsType, new Map(), isPackagePropSymbol);
};

const resolvePropsSourceMode = () => {
  if (process.env.DOCS_MANIFEST_PROPS_SOURCE === 'src') return 'src';
  if (process.env.DOCS_MANIFEST_PROPS_SOURCE === 'dist') return 'dist';
  if (process.env.DOCS_MANIFEST_DEV === '1') return 'src';
  return fs.existsSync(DIST_TYPES_FILE) ? 'dist' : 'src';
};

const buildPropsPayload = (propsNode, docsFilePath, sourceFile, componentName) => {
  if (!propsNode) return null;

  const mode = getString(propsNode, 'mode') ?? 'autogen';
  const include = getStringArray(propsNode, 'include');
  const exclude = getStringArray(propsNode, 'exclude');
  const manual = getPropItems(propsNode, 'manual');

  const componentFilePath = findImportedComponentPath(sourceFile, docsFilePath, componentName);
  const propsSourceMode = resolvePropsSourceMode();

  let auto = [];
  if (propsSourceMode === 'dist') {
    auto = extractComponentPropsFromDist(componentName);
    if (auto.length === 0 && componentFilePath) {
      auto = extractComponentPropsFromSource(componentFilePath, componentName);
    }
  } else if (componentFilePath) {
    auto = extractComponentPropsFromSource(componentFilePath, componentName);
  }

  const filteredAuto = auto.filter((item) => {
    if (include.length > 0 && !include.includes(item.name)) return false;
    if (exclude.includes(item.name)) return false;
    return true;
  });

  const manualMap = new Map(manual.map((item) => [item.name, item]));

  let items = [];
  if (mode === 'manual') {
    items = manual;
  } else if (mode === 'merge') {
    items = filteredAuto.map((item) => ({ ...item, ...(manualMap.get(item.name) ?? {}) }));
    for (const manualItem of manual) {
      if (!items.some((item) => item.name === manualItem.name)) {
        items.push(manualItem);
      }
    }
  } else {
    items = filteredAuto;
  }

  return {
    mode,
    include,
    exclude,
    items,
  };
};

const findDefineCall = (sourceFile) => {
  for (const statement of sourceFile.statements) {
    if (
      ts.isExportAssignment(statement) &&
      ts.isCallExpression(statement.expression) &&
      isIdentifier(statement.expression.expression, 'defineComponentDocs')
    ) {
      return statement.expression;
    }
  }
  return null;
};

const parseDocsFile = (filePath) => {
  const source = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const defineCall = findDefineCall(sourceFile);
  if (!defineCall) return null;

  const root = defineCall.arguments[0];
  if (!root || !ts.isObjectLiteralExpression(root)) return null;

  const metaProp = getObjectProperty(root, 'meta');
  if (!metaProp || !ts.isObjectLiteralExpression(metaProp.initializer)) return null;

  const meta = metaProp.initializer;
  const componentName = getString(meta, 'name');
  if (!componentName) return null;

  const examples = getObjectArray(root, 'examples').map((example) => ({
    id: getString(example, 'id') ?? 'example',
    title: getString(example, 'title') ?? 'Example',
    description: getString(example, 'description') ?? '',
    code: getString(example, 'code') ?? '',
    layout: getString(example, 'layout') ?? '',
    themes: getStringArray(example, 'themes'),
    showCode: getBoolean(example, 'showCode') ?? true,
  }));

  const variants = getObjectArray(root, 'variants').map((variantGroup) => ({
    id: getString(variantGroup, 'id') ?? 'variant-group',
    title: getString(variantGroup, 'title') ?? 'Variants',
    columns: getNumber(variantGroup, 'columns') ?? 3,
    items: getObjectArray(variantGroup, 'items').map((variantItem) => ({
      id: getString(variantItem, 'id') ?? 'variant-item',
      title: getString(variantItem, 'title') ?? 'Variant',
      code: getString(variantItem, 'code') ?? '',
      description: getString(variantItem, 'description') ?? '',
    })),
  }));

  const propsNode = getObjectProperty(root, 'props');
  const props =
    propsNode && ts.isObjectLiteralExpression(propsNode.initializer)
      ? buildPropsPayload(propsNode.initializer, filePath, sourceFile, componentName)
      : null;

  return {
    slug: slugify(componentName),
    name: componentName,
    group: getString(meta, 'group') ?? 'General',
    status: getString(meta, 'status') ?? 'stable',
    since: getString(meta, 'since') ?? 'unknown',
    description: getString(meta, 'description') ?? '',
    examples,
    variants,
    props,
  };
};

const buildManifest = () => {
  const packageJson = readJson(path.resolve(PROJECT_ROOT, 'package.json'));
  const docsFiles = walkDocsFiles(docsRoot).sort();

  const rawCache = fs.existsSync(CACHE_FILE) ? readJson(CACHE_FILE) : null;
  const cache =
    rawCache &&
    typeof rawCache === 'object' &&
    rawCache.version === CACHE_VERSION &&
    rawCache.byFile &&
    typeof rawCache.byFile === 'object'
      ? rawCache
      : { version: CACHE_VERSION, byFile: {} };

  const nextCache = { version: CACHE_VERSION, byFile: {} };

  const components = docsFiles
    .map((filePath) => {
      const content = fs.readFileSync(filePath, 'utf8');
      const hash = hashText(content);
      const cached = cache.byFile[filePath];
      if (cached && cached.hash === hash) {
        nextCache.byFile[filePath] = cached;
        return cached.component;
      }
      const component = parseDocsFile(filePath);
      if (!component) return null;
      nextCache.byFile[filePath] = { hash, component };
      return component;
    })
    .filter(Boolean)
    .sort((a, b) => a.group.localeCompare(b.group, 'ru') || a.name.localeCompare(b.name, 'ru'));

  const groupsMap = new Map();
  for (const item of components) {
    const current = groupsMap.get(item.group) ?? [];
    current.push(item.slug);
    groupsMap.set(item.group, current);
  }

  // См. build-content-manifest.mjs: `generatedAt` делал артефакт нестабильным.
  return {
    version: packageJson.version,
    groups: Array.from(groupsMap.entries()).map(([title, items]) => ({ id: slugify(title), title, items })),
    components,
    cache: nextCache,
  };
};

const writeManifestArtifacts = (manifest) => {
  fs.mkdirSync(path.dirname(outputJson), { recursive: true });
  fs.mkdirSync(path.dirname(outputTs), { recursive: true });
  fs.mkdirSync(path.dirname(llmsTxtPath), { recursive: true });
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });

  const payload = { version: manifest.version, groups: manifest.groups, components: manifest.components };
  fs.writeFileSync(outputJson, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  fs.writeFileSync(outputTs, `export const docsManifest = ${JSON.stringify(payload, null, 2)} as const;\n`, 'utf8');

  const llmsItems = payload.components.map((item) => `- ${item.name}: ${config.componentBaseRoute}/${item.slug}`);
  fs.writeFileSync(llmsTxtPath, `# PlainerV docs\n${llmsItems.join('\n')}\n`, 'utf8');

  const llmsFullItems = payload.components.map((item) => {
    const examples = item.examples.map((example) => `  - ${example.title}: ${example.description}`).join('\n');
    return `## ${item.name}\nStatus: ${item.status}\nSince: ${item.since}\nDescription: ${item.description}\n${examples}`;
  });
  fs.writeFileSync(llmsFullTxtPath, `# PlainerV docs full\n\n${llmsFullItems.join('\n\n')}\n`, 'utf8');
  fs.writeFileSync(CACHE_FILE, `${JSON.stringify(manifest.cache, null, 2)}\n`, 'utf8');
};

const result = buildManifest();
writeManifestArtifacts(result);
console.log(`[docs-manifest] Generated ${result.components.length} components`);
