#!/usr/bin/env node
/**
 * Генератор таблиц пропсов для конкретных версий кита.
 *
 * Источник правды — опубликованный пакет: скрипт скачивает `npm pack
 * @velkinvv/plainerv@<версия>` во временный каталог и читает `dist/index.d.ts`.
 * Сборка из исходников не выполняется: у архивных версий исходников под рукой нет.
 *
 * Для версии, совпадающей с текущим пакетом (`web/package.json`), сеть не нужна —
 * берётся локальный `web/dist/index.d.ts`.
 *
 * Результат: `src/generated/versions/<version>/props.json` + сводный `index.json`.
 */
import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const execFileAsync = promisify(execFile);

const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const DOCS_APP_ROOT = path.resolve(SCRIPT_DIRECTORY, '..');
const PACKAGE_ROOT = path.resolve(DOCS_APP_ROOT, '..');
const CONFIG_FILE = path.join(DOCS_APP_ROOT, 'docs-versioning.config.json');
const MANIFEST_FILE = path.join(DOCS_APP_ROOT, 'src/generated/docs-manifest.json');
const OUTPUT_ROOT = path.join(DOCS_APP_ROOT, 'src/generated/versions');
const LOCAL_TYPES_FILE = path.join(PACKAGE_ROOT, 'dist/index.d.ts');
const PACKAGE_NAME = '@velkinvv/plainerv';

const readJson = async (filePath) => JSON.parse(await fs.readFile(filePath, 'utf8'));

const parseCliArguments = (argv) => {
  const result = { versionIds: [], force: false, strict: false };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--force') {
      result.force = true;
      continue;
    }
    if (argument === '--strict') {
      result.strict = true;
      continue;
    }
    if (argument === '--versions') {
      const value = argv[index + 1] ?? '';
      result.versionIds = value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
      index += 1;
    }
  }

  return result;
};

/** `v_0.3.3` → `0.3.3`, `v_0.1` → `0.1.0`, `v1` → `1.0.0`; нечисловые id → null. */
const toPackageVersion = (versionId) => {
  const match = /^v_?(\d+)(?:\.(\d+))?(?:\.(\d+))?$/.exec(versionId);
  if (!match) return null;

  const [, major, minor = '0', patch = '0'] = match;
  return `${Number(major)}.${Number(minor)}.${Number(patch)}`;
};

/**
 * Ищет объявление компонента и его типа пропсов во всех декларациях пакета:
 * формат `dist/index.d.ts` у разных версий отличается (FC, forwardRef,
 * функция-стрелка, отдельный интерфейс `${Name}Props`), поэтому опираемся не
 * на одну форму записи, а на тип символа компонента.
 */
const findDeclarationNodes = (program, rootDirectory, componentName) => {
  const result = { componentNode: null, propsNode: null };
  const normalizedRoot = `${path.resolve(rootDirectory)}${path.sep}`;

  for (const sourceFile of program.getSourceFiles()) {
    if (!path.resolve(sourceFile.fileName).startsWith(normalizedRoot)) continue;

    const visit = (node) => {
      if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        (node.name.text === componentName || node.name.text === `${componentName}Base`)
      ) {
        result.componentNode = result.componentNode ?? node;
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

const resolvePropsType = (checker, declarationNodes, componentName) => {
  const { componentNode, propsNode } = declarationNodes;

  if (componentNode?.type && ts.isTypeReferenceNode(componentNode.type)) {
    const { typeName, typeArguments } = componentNode.type;

    if (
      ts.isQualifiedName(typeName) &&
      ts.isIdentifier(typeName.left) &&
      typeName.left.text === 'React' &&
      typeName.right.text === 'FC' &&
      typeArguments?.length
    ) {
      return checker.getTypeFromTypeNode(typeArguments[0]);
    }

    if (ts.isIdentifier(typeName) && typeArguments?.length) {
      return checker.getTypeFromTypeNode(typeArguments[0]);
    }
  }

  if (componentNode?.initializer && ts.isCallExpression(componentNode.initializer)) {
    if (
      ts.isIdentifier(componentNode.initializer.expression) &&
      componentNode.initializer.expression.text === 'forwardRef' &&
      componentNode.initializer.typeArguments?.length === 2
    ) {
      return checker.getTypeFromTypeNode(componentNode.initializer.typeArguments[1]);
    }
  }

  if (componentNode) {
    const symbol = checker.getSymbolAtLocation(componentNode.name);
    if (symbol) {
      const type = checker.getTypeOfSymbolAtLocation(symbol, componentNode.name);
      const signatures = [...type.getCallSignatures(), ...type.getConstructSignatures()];

      for (const signature of signatures) {
        const parameter = signature.getParameters()[0];
        if (!parameter) continue;

        const parameterDeclaration =
          parameter.valueDeclaration ?? parameter.declarations?.[0] ?? componentNode;
        return checker.getTypeOfSymbolAtLocation(parameter, parameterDeclaration);
      }
    }
  }

  if (propsNode) {
    return checker.getTypeAtLocation(propsNode.name);
  }

  console.log(`[props] ${componentName}: тип пропсов не найден в декларациях`);
  return null;
};

const mapPropsFromType = (checker, propsType, rootDirectory) => {
  const normalizedRoot = `${path.resolve(rootDirectory)}${path.sep}`;
  const isOwnPackageSymbol = (symbol) => {
    const declarations =
      symbol.declarations ?? (symbol.valueDeclaration ? [symbol.valueDeclaration] : []);
    if (declarations.length === 0) return true;

    return declarations.some((declaration) =>
      path.resolve(declaration.getSourceFile().fileName).startsWith(normalizedRoot),
    );
  };

  return checker
    .getPropertiesOfType(propsType)
    .filter(isOwnPackageSymbol)
    .map((symbol) => {
      const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
      const propertyType = declaration
        ? checker.getTypeOfSymbolAtLocation(symbol, declaration)
        : checker.getTypeOfSymbol(symbol);

      return {
        name: symbol.getName(),
        type: checker.typeToString(propertyType),
        required: !(symbol.flags & ts.SymbolFlags.Optional),
        defaultValue: '',
        description: ts.displayPartsToString(symbol.getDocumentationComment(checker)),
        deprecated: symbol.getJsDocTags(checker).some((tag) => tag.name === 'deprecated'),
      };
    });
};

const extractPropsFromTypesFile = (typesFilePath, components) => {
  const program = ts.createProgram([typesFilePath], {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    skipLibCheck: true,
    noResolve: false,
  });

  const declarationFile = program.getSourceFile(typesFilePath);
  if (!declarationFile) {
    throw new Error(`Не удалось прочитать декларации: ${typesFilePath}`);
  }

  const checker = program.getTypeChecker();
  const result = {};
  const rootDirectory = path.dirname(typesFilePath);

  for (const component of components) {
    const declarationNodes = findDeclarationNodes(program, rootDirectory, component.name);
    const propsType = resolvePropsType(checker, declarationNodes, component.name);
    if (!propsType) continue;

    const items = mapPropsFromType(checker, propsType, rootDirectory);
    if (items.length === 0) continue;

    result[component.slug] = { name: component.name, items };
  }

  return result;
};

const packPublishedPackage = async (packageVersion) => {
  const temporaryDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'plainerv-props-'));
  const specification = `${PACKAGE_NAME}@${packageVersion}`;

  try {
    const { stdout } = await execFileAsync(
      process.platform === 'win32' ? 'npm.cmd' : 'npm',
      ['pack', specification, '--pack-destination', temporaryDirectory, '--silent'],
      {
        cwd: temporaryDirectory,
        maxBuffer: 10 * 1024 * 1024,
        // На Windows .cmd запускается только через shell, иначе spawn EINVAL.
        shell: process.platform === 'win32',
      },
    );

    const archiveName = stdout
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.endsWith('.tgz'))
      .pop();

    if (!archiveName) {
      throw new Error(`npm pack не вернул имя архива для ${specification}`);
    }

    await execFileAsync('tar', ['-xzf', archiveName, '-C', temporaryDirectory], {
      cwd: temporaryDirectory,
      maxBuffer: 10 * 1024 * 1024,
    });

    const typesFilePath = path.join(temporaryDirectory, 'package/dist/index.d.ts');
    if (!fsSync.existsSync(typesFilePath)) {
      throw new Error(`В пакете ${specification} нет dist/index.d.ts`);
    }

    return { typesFilePath, temporaryDirectory };
  } catch (error) {
    await fs.rm(temporaryDirectory, { recursive: true, force: true });
    throw error;
  }
};

const writePropsFile = async (versionId, payload) => {
  const versionDirectory = path.join(OUTPUT_ROOT, versionId);
  await fs.mkdir(versionDirectory, { recursive: true });
  await fs.writeFile(
    path.join(versionDirectory, 'props.json'),
    `${JSON.stringify(payload, null, 2)}\n`,
    'utf8',
  );
};

const writeVersionsIndex = async () => {
  const entries = [];
  if (fsSync.existsSync(OUTPUT_ROOT)) {
    for (const directoryName of await fs.readdir(OUTPUT_ROOT)) {
      const propsFile = path.join(OUTPUT_ROOT, directoryName, 'props.json');
      if (!fsSync.existsSync(propsFile)) continue;

      const payload = JSON.parse(await fs.readFile(propsFile, 'utf8'));
      entries.push({
        id: payload.version,
        packageVersion: payload.packageVersion,
        source: payload.source,
        generatedAt: payload.generatedAt,
        components: Object.keys(payload.components ?? {}).length,
      });
    }
  }

  entries.sort((left, right) => left.packageVersion.localeCompare(right.packageVersion, 'en'));
  await fs.mkdir(OUTPUT_ROOT, { recursive: true });
  await fs.writeFile(
    path.join(OUTPUT_ROOT, 'index.json'),
    `${JSON.stringify({ versions: entries }, null, 2)}\n`,
    'utf8',
  );

  return entries;
};

const main = async () => {
  const { versionIds, force, strict } = parseCliArguments(process.argv.slice(2));
  const configuration = await readJson(CONFIG_FILE);
  const docsManifest = await readJson(MANIFEST_FILE);
  const packageJson = await readJson(path.join(PACKAGE_ROOT, 'package.json'));

  const components = (docsManifest.components ?? []).map((component) => ({
    slug: component.slug,
    name: component.name,
  }));

  if (components.length === 0) {
    throw new Error(
      'В docs-manifest.json нет компонентов — сначала выполните npm run content:manifest',
    );
  }

  const platform = configuration.platforms.find((item) => item.id === 'web');
  const declaredVersions = platform?.versions ?? [];
  const targets = versionIds.length
    ? declaredVersions.filter((version) => versionIds.includes(version.id))
    : declaredVersions;

  let generated = 0;
  let reused = 0;
  const failures = [];

  for (const version of targets) {
    const packageVersion = toPackageVersion(version.id);
    if (!packageVersion) {
      console.log(`[props] ${version.id}: пропуск — не semver-версия`);
      continue;
    }

    const propsFile = path.join(OUTPUT_ROOT, version.id, 'props.json');
    if (!force && fsSync.existsSync(propsFile)) {
      console.log(`[props] ${version.id}: уже сгенерировано (--force для пересборки)`);
      reused += 1;
      continue;
    }

    const isCurrentPackage = packageVersion === packageJson.version;
    let temporaryDirectory = null;

    try {
      let typesFilePath;
      let source;

      if (isCurrentPackage && fsSync.existsSync(LOCAL_TYPES_FILE)) {
        typesFilePath = LOCAL_TYPES_FILE;
        source = `local:dist/index.d.ts`;
      } else {
        const packed = await packPublishedPackage(packageVersion);
        typesFilePath = packed.typesFilePath;
        temporaryDirectory = packed.temporaryDirectory;
        source = `npm:${PACKAGE_NAME}@${packageVersion}`;
      }

      const extracted = extractPropsFromTypesFile(typesFilePath, components);
      const componentCount = Object.keys(extracted).length;

      if (componentCount === 0) {
        throw new Error('в декларациях не найдено ни одного типа пропсов');
      }

      await writePropsFile(version.id, {
        version: version.id,
        packageVersion,
        source,
        generatedAt: new Date().toISOString(),
        components: extracted,
      });

      console.log(`[props] ${version.id}: ${componentCount} компонентов (${source})`);
      generated += 1;
    } catch (error) {
      failures.push({ version: version.id, message: error.message });
      console.warn(`[props] ${version.id}: ${error.message}`);
    } finally {
      if (temporaryDirectory) {
        await fs.rm(temporaryDirectory, { recursive: true, force: true });
      }
    }
  }

  const entries = await writeVersionsIndex();

  console.log(
    `[props] готово: сгенерировано ${generated}, из кэша ${reused}, версий в индексе ${entries.length}`,
  );

  if (failures.length > 0) {
    console.log(`[props] не удалось: ${failures.map((item) => item.version).join(', ')}`);
    if (strict) {
      process.exitCode = 1;
    }
  }
};

main().catch((error) => {
  console.error(`[props] ошибка: ${error.stack ?? error.message}`);
  process.exitCode = 1;
});
