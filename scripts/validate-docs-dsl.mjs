import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, '../src/components/ui');

const isIdentifier = (node, text) => ts.isIdentifier(node) && node.text === text;

const walk = (dir) => {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...walk(fullPath));
      continue;
    }
    if (entry.isFile() && fullPath.endsWith('.docs.tsx')) result.push(fullPath);
  }
  return result;
};

const getObjectProperty = (obj, name) =>
  obj.properties.find(
    (p) => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === name,
  );

const parseObjectLiteral = (expr) => {
  if (!ts.isObjectLiteralExpression(expr)) return null;
  return expr;
};

const getArrayItems = (obj, key) => {
  const prop = getObjectProperty(obj, key);
  if (!prop || !ts.isArrayLiteralExpression(prop.initializer)) return [];
  return prop.initializer.elements.filter(ts.isObjectLiteralExpression);
};

const getStringLiteralPropertyValue = (obj, key) => {
  const prop = getObjectProperty(obj, key);
  if (!prop) return null;
  if (ts.isStringLiteral(prop.initializer) || ts.isNoSubstitutionTemplateLiteral(prop.initializer)) {
    return prop.initializer.text;
  }
  return null;
};

const getStringArrayPropertyValues = (obj, key) => {
  const prop = getObjectProperty(obj, key);
  if (!prop) return null;
  if (!ts.isArrayLiteralExpression(prop.initializer)) return null;

  const values = [];
  for (const element of prop.initializer.elements) {
    if (ts.isStringLiteral(element) || ts.isNoSubstitutionTemplateLiteral(element)) {
      values.push(element.text);
      continue;
    }
    return null;
  }

  return values;
};

const getStringId = (obj) => getStringLiteralPropertyValue(obj, 'id');

const hasProperty = (obj, key) => Boolean(getObjectProperty(obj, key));

const formatLocation = (sourceFile, node) => {
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
  return `${line + 1}:${character + 1}`;
};

const ALLOWED_PLATFORMS = new Set(['web', 'mobile']);
const ALLOWED_STATUSES = new Set(['stable', 'beta', 'deprecated']);
const ALLOWED_LAYOUTS = new Set(['inline', 'block', 'grid']);
const ALLOWED_THEME_AXES = new Set([
  'theme',
  'colorMode',
  'contrast',
  'density',
  'motion',
  'locale',
  'rtl',
]);

const validateFile = (filePath) => {
  const source = fs.readFileSync(filePath, 'utf8');
  const sf = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const errors = [];

  const topLevelForbidden = [
    ts.SyntaxKind.IfStatement,
    ts.SyntaxKind.ForStatement,
    ts.SyntaxKind.ForInStatement,
    ts.SyntaxKind.ForOfStatement,
    ts.SyntaxKind.WhileStatement,
    ts.SyntaxKind.DoStatement,
    ts.SyntaxKind.SwitchStatement,
    ts.SyntaxKind.TryStatement,
    ts.SyntaxKind.ThrowStatement,
  ];

  let docsCall = null;

  for (const stmt of sf.statements) {
    if (topLevelForbidden.includes(stmt.kind)) {
      errors.push(`${formatLocation(sf, stmt)} запрещены условные ветки/циклы на верхнем уровне`);
    }

    if (ts.isExpressionStatement(stmt) && ts.isCallExpression(stmt.expression)) {
      const expr = stmt.expression.expression;
      if (!isIdentifier(expr, 'defineComponentDocs')) {
        errors.push(`${formatLocation(sf, stmt)} запрещён произвольный runtime-вызов на верхнем уровне`);
      }
    }

    if (
      ts.isExportAssignment(stmt) &&
      ts.isCallExpression(stmt.expression) &&
      isIdentifier(stmt.expression.expression, 'defineComponentDocs')
    ) {
      docsCall = stmt.expression;
    }

    if (ts.isVariableStatement(stmt)) {
      for (const d of stmt.declarationList.declarations) {
        if (
          d.initializer &&
          ts.isCallExpression(d.initializer) &&
          isIdentifier(d.initializer.expression, 'defineComponentDocs')
        ) {
          docsCall = d.initializer;
        }
      }
    }
  }

  if (!docsCall) {
    errors.push('0:0 не найден вызов defineComponentDocs(...)');
    return errors;
  }

  const arg = docsCall.arguments[0];
  const rootObj = parseObjectLiteral(arg);
  if (!rootObj) {
    errors.push(`${formatLocation(sf, docsCall)} аргумент defineComponentDocs должен быть литералом объекта`);
    return errors;
  }

  const checkComputedKeys = (node) => {
    if (ts.isPropertyAssignment(node) && ts.isComputedPropertyName(node.name)) {
      errors.push(`${formatLocation(sf, node)} вычисляемые ключи запрещены`);
    }
    node.forEachChild(checkComputedKeys);
  };
  checkComputedKeys(rootObj);

  const metaProp = getObjectProperty(rootObj, 'meta');
  if (!metaProp || !ts.isObjectLiteralExpression(metaProp.initializer)) {
    errors.push(`${formatLocation(sf, rootObj)} отсутствует meta или meta не является литералом объекта`);
  } else {
    for (const key of ['name', 'group', 'platform', 'since', 'status', 'description']) {
      if (!getStringLiteralPropertyValue(metaProp.initializer, key)) {
        errors.push(`${formatLocation(sf, metaProp)} meta.${key} должен быть строковым литералом`);
      }
    }

    const platform = getStringLiteralPropertyValue(metaProp.initializer, 'platform');
    if (platform && !ALLOWED_PLATFORMS.has(platform)) {
      errors.push(
        `${formatLocation(sf, metaProp)} meta.platform должен быть одним из: ${Array.from(ALLOWED_PLATFORMS).join(', ')}`,
      );
    }

    const status = getStringLiteralPropertyValue(metaProp.initializer, 'status');
    if (status && !ALLOWED_STATUSES.has(status)) {
      errors.push(
        `${formatLocation(sf, metaProp)} meta.status должен быть одним из: ${Array.from(ALLOWED_STATUSES).join(', ')}`,
      );
    }

    const deprecatedProp = getObjectProperty(metaProp.initializer, 'deprecated');
    if (deprecatedProp) {
      if (!ts.isObjectLiteralExpression(deprecatedProp.initializer)) {
        errors.push(`${formatLocation(sf, deprecatedProp)} meta.deprecated должен быть литералом объекта`);
      } else {
        const deprecatedSince = getStringLiteralPropertyValue(deprecatedProp.initializer, 'since');
        if (!deprecatedSince) {
          errors.push(`${formatLocation(sf, deprecatedProp)} meta.deprecated.since должен быть строковым литералом`);
        }

        for (const optionalKey of ['reason', 'replacement']) {
          if (hasProperty(deprecatedProp.initializer, optionalKey)) {
            const optionalValue = getStringLiteralPropertyValue(deprecatedProp.initializer, optionalKey);
            if (!optionalValue) {
              errors.push(
                `${formatLocation(sf, deprecatedProp)} meta.deprecated.${optionalKey} должен быть строковым литералом`,
              );
            }
          }
        }
      }
    }
  }

  const seenStoryIds = new Map();
  const registerStoryId = (storyId, node, scope) => {
    const prevScope = seenStoryIds.get(storyId);
    if (prevScope) {
      errors.push(`${formatLocation(sf, node)} duplicate story id (${scope}): ${storyId}; уже используется в ${prevScope}`);
      return;
    }
    seenStoryIds.set(storyId, scope);
  };

  const examples = getArrayItems(rootObj, 'examples');
  const exampleIds = new Set();

  for (const ex of examples) {
    const id = getStringId(ex);
    if (!id) {
      errors.push(`${formatLocation(sf, ex)} examples[*].id должен быть строковым литералом`);
    } else if (exampleIds.has(id)) {
      errors.push(`${formatLocation(sf, ex)} duplicate examples id: ${id}`);
    } else {
      exampleIds.add(id);
      registerStoryId(id, ex, 'examples');
    }

    if (!hasProperty(ex, 'render')) {
      errors.push(`${formatLocation(sf, ex)} в examples обязательно поле render`);
    }

    if (hasProperty(ex, 'code')) {
      const codeProp = getObjectProperty(ex, 'code');
      if (
        !codeProp ||
        !(ts.isStringLiteral(codeProp.initializer) || ts.isNoSubstitutionTemplateLiteral(codeProp.initializer))
      ) {
        errors.push(`${formatLocation(sf, ex)} examples[*].code должен быть строковым литералом`);
      }
    }

    if (hasProperty(ex, 'showCode')) {
      const showCodeProp = getObjectProperty(ex, 'showCode');
      if (
        !showCodeProp ||
        (showCodeProp.initializer.kind !== ts.SyntaxKind.TrueKeyword &&
          showCodeProp.initializer.kind !== ts.SyntaxKind.FalseKeyword)
      ) {
        errors.push(`${formatLocation(sf, ex)} examples[*].showCode должен быть boolean-литералом`);
      }
    }

    if (hasProperty(ex, 'layout')) {
      const layout = getStringLiteralPropertyValue(ex, 'layout');
      if (!layout) {
        errors.push(`${formatLocation(sf, ex)} examples[*].layout должен быть строковым литералом`);
      } else if (!ALLOWED_LAYOUTS.has(layout)) {
        errors.push(
          `${formatLocation(sf, ex)} examples[*].layout должен быть одним из: ${Array.from(ALLOWED_LAYOUTS).join(', ')}`,
        );
      }
    }

    if (hasProperty(ex, 'themes')) {
      const themes = getStringArrayPropertyValues(ex, 'themes');
      if (!themes) {
        errors.push(`${formatLocation(sf, ex)} examples[*].themes должен быть массивом строковых литералов`);
      } else {
        const invalidTheme = themes.find((theme) => !ALLOWED_THEME_AXES.has(theme));
        if (invalidTheme) {
          errors.push(
            `${formatLocation(sf, ex)} examples[*].themes содержит недопустимое значение: ${invalidTheme}. Допустимо: ${Array.from(ALLOWED_THEME_AXES).join(', ')}`,
          );
        }
      }
    }
  }

  const variants = getArrayItems(rootObj, 'variants');
  const variantGroupIds = new Set();

  for (const group of variants) {
    const groupId = getStringId(group);
    if (!groupId) {
      errors.push(`${formatLocation(sf, group)} variants[*].id должен быть строковым литералом`);
    } else if (variantGroupIds.has(groupId)) {
      errors.push(`${formatLocation(sf, group)} duplicate variants id: ${groupId}`);
    } else {
      variantGroupIds.add(groupId);
    }

    const groupTitle = getStringLiteralPropertyValue(group, 'title');
    if (!groupTitle) {
      errors.push(`${formatLocation(sf, group)} variants[*].title должен быть строковым литералом`);
    }

    const itemsProp = getObjectProperty(group, 'items');
    if (!itemsProp || !ts.isArrayLiteralExpression(itemsProp.initializer)) {
      errors.push(`${formatLocation(sf, group)} variants[*].items должен быть массивом литералов объектов`);
      continue;
    }

    const itemIdsInGroup = new Set();
    for (const item of itemsProp.initializer.elements) {
      if (!ts.isObjectLiteralExpression(item)) {
        errors.push(`${formatLocation(sf, itemsProp)} variants[*].items должен содержать только литералы объектов`);
        continue;
      }

      const itemId = getStringId(item);
      if (!itemId) {
        errors.push(`${formatLocation(sf, item)} variants[*].items[*].id должен быть строковым литералом`);
      } else if (itemIdsInGroup.has(itemId)) {
        errors.push(`${formatLocation(sf, item)} duplicate variant item id в группе ${groupId ?? '<unknown>'}: ${itemId}`);
      } else {
        itemIdsInGroup.add(itemId);
      }

      const itemTitle = getStringLiteralPropertyValue(item, 'title');
      if (!itemTitle) {
        errors.push(`${formatLocation(sf, item)} variants[*].items[*].title должен быть строковым литералом`);
      }

      if (!hasProperty(item, 'render')) {
        errors.push(`${formatLocation(sf, item)} в variants[*].items[*] обязательно поле render`);
      }

      if (hasProperty(item, 'code')) {
        const codeProp = getObjectProperty(item, 'code');
        if (
          !codeProp ||
          !(ts.isStringLiteral(codeProp.initializer) || ts.isNoSubstitutionTemplateLiteral(codeProp.initializer))
        ) {
          errors.push(`${formatLocation(sf, item)} variants[*].items[*].code должен быть строковым литералом`);
        }
      }

      if (groupId && itemId) {
        const variantStoryId = `${groupId}-${itemId}`;
        registerStoryId(variantStoryId, item, `variants:${groupId}`);
      }
    }
  }

  return errors;
};

const files = fs.existsSync(ROOT) ? walk(ROOT) : [];

if (files.length === 0) {
  console.log('[docs-dsl] .docs.tsx файлы не найдены — проверка пройдена');
  process.exit(0);
}

let totalErrors = 0;
for (const file of files) {
  const errs = validateFile(file);
  if (errs.length === 0) continue;
  totalErrors += errs.length;
  const rel = file.replace(process.cwd() + path.sep, '').replaceAll('\\', '/');
  console.error(`\n[docs-dsl] ${rel}`);
  errs.forEach((e) => console.error(`  - ${e}`));
}

if (totalErrors > 0) {
  console.error(`\n[docs-dsl] Ошибок: ${totalErrors}`);
  process.exit(1);
}

console.log(`[docs-dsl] Проверено файлов: ${files.length}. Ошибок нет.`);
