import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const ROOT = path.resolve(process.cwd(), 'web/src/components/ui');

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

const getStringId = (obj) => {
  const idProp = getObjectProperty(obj, 'id');
  if (!idProp || !ts.isStringLiteral(idProp.initializer)) return null;
  return idProp.initializer.text;
};

const hasProperty = (obj, key) => Boolean(getObjectProperty(obj, key));

const formatLocation = (sourceFile, node) => {
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
  return `${line + 1}:${character + 1}`;
};

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
    }

    if (!hasProperty(ex, 'code') || !hasProperty(ex, 'render')) {
      errors.push(`${formatLocation(sf, ex)} в examples обязательны поля code и render`);
    }
  }

  const variants = getArrayItems(rootObj, 'variants');
  const variantIds = new Set();

  for (const group of variants) {
    const groupId = getStringId(group);
    if (groupId) {
      if (variantIds.has(groupId)) {
        errors.push(`${formatLocation(sf, group)} duplicate variants id: ${groupId}`);
      }
      variantIds.add(groupId);
    }

    const itemsProp = getObjectProperty(group, 'items');
    if (!itemsProp || !ts.isArrayLiteralExpression(itemsProp.initializer)) continue;

    for (const item of itemsProp.initializer.elements) {
      if (!ts.isObjectLiteralExpression(item)) continue;
      const itemId = getStringId(item);
      if (!itemId) continue;
      if (variantIds.has(itemId)) {
        errors.push(`${formatLocation(sf, item)} duplicate variant item id: ${itemId}`);
      }
      variantIds.add(itemId);
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
