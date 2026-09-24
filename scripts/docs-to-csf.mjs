import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { extractCodeFromRenderText } from '../src/handlers/storybookRenderSnippet.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, '../src/components/ui');

const isIdentifier = (node, text) => ts.isIdentifier(node) && node.text === text;

const walkDocsFiles = (dir) => {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkDocsFiles(fullPath));
      continue;
    }
    if (entry.isFile() && fullPath.endsWith('.docs.tsx')) {
      result.push(fullPath);
    }
  }
  return result;
};

const walkGeneratedStoriesFiles = (dir) => {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkGeneratedStoriesFiles(fullPath));
      continue;
    }
    if (entry.isFile() && fullPath.endsWith('.generated.stories.tsx')) {
      result.push(fullPath);
    }
  }
  return result;
};

const getObjectProperty = (obj, name) =>
  obj.properties.find(
    (p) => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === name,
  );

const getStringLiteralValue = (obj, key) => {
  const prop = getObjectProperty(obj, key);
  if (!prop) return null;
  if (ts.isStringLiteral(prop.initializer) || ts.isNoSubstitutionTemplateLiteral(prop.initializer)) {
    return prop.initializer.text;
  }
  return null;
};

const getBooleanLiteralValue = (obj, key) => {
  const prop = getObjectProperty(obj, key);
  if (!prop) return null;
  if (prop.initializer.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (prop.initializer.kind === ts.SyntaxKind.FalseKeyword) return false;
  return null;
};

const getExpressionText = (obj, key, sourceFile) => {
  const prop = getObjectProperty(obj, key);
  if (!prop) return null;
  return prop.initializer.getText(sourceFile).trim();
};

const getObjectArray = (obj, key) => {
  const prop = getObjectProperty(obj, key);
  if (!prop || !ts.isArrayLiteralExpression(prop.initializer)) return [];
  return prop.initializer.elements.filter(ts.isObjectLiteralExpression);
};

const getStringArray = (obj, key) => {
  const prop = getObjectProperty(obj, key);
  if (!prop || !ts.isArrayLiteralExpression(prop.initializer)) return [];
  return prop.initializer.elements
    .filter((element) => ts.isStringLiteral(element) || ts.isNoSubstitutionTemplateLiteral(element))
    .map((element) => element.text);
};

/**
 * Соответствие DSL-layout и layout-значений Storybook.
 * В DSL значение описывает способ подачи примера, в CSF — режим полотна.
 */
const STORYBOOK_LAYOUT_BY_DSL = {
  inline: 'centered',
  block: 'padded',
  grid: 'fullscreen',
};

const toPascalCase = (value) => {
  const cleaned = value
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1));

  const candidate = cleaned.join('') || 'Example';
  return /^[A-Za-z]/.test(candidate) ? candidate : `Example${candidate}`;
};

const getDefineCall = (sourceFile) => {
  for (const stmt of sourceFile.statements) {
    if (
      ts.isExportAssignment(stmt) &&
      ts.isCallExpression(stmt.expression) &&
      isIdentifier(stmt.expression.expression, 'defineComponentDocs')
    ) {
      return stmt.expression;
    }

    if (ts.isVariableStatement(stmt)) {
      for (const declaration of stmt.declarationList.declarations) {
        if (
          declaration.initializer &&
          ts.isCallExpression(declaration.initializer) &&
          isIdentifier(declaration.initializer.expression, 'defineComponentDocs')
        ) {
          return declaration.initializer;
        }
      }
    }
  }

  return null;
};

const generateStoriesFile = (docsFilePath) => {
  const source = fs.readFileSync(docsFilePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    docsFilePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  const defineCall = getDefineCall(sourceFile);
  if (!defineCall) {
    throw new Error(`Не найден defineComponentDocs в ${docsFilePath}`);
  }

  const root = defineCall.arguments[0];
  if (!root || !ts.isObjectLiteralExpression(root)) {
    throw new Error(`Аргумент defineComponentDocs должен быть объектом: ${docsFilePath}`);
  }

  const metaProp = getObjectProperty(root, 'meta');
  if (!metaProp || !ts.isObjectLiteralExpression(metaProp.initializer)) {
    throw new Error(`Отсутствует meta в ${docsFilePath}`);
  }

  const componentName = getStringLiteralValue(metaProp.initializer, 'name') ?? 'Component';
  const group = getStringLiteralValue(metaProp.initializer, 'group') ?? 'Generated';
  const description = getStringLiteralValue(metaProp.initializer, 'description') ?? '';
  const status = getStringLiteralValue(metaProp.initializer, 'status') ?? 'stable';
  const hasDeprecatedMeta = Boolean(getObjectProperty(metaProp.initializer, 'deprecated'));

  const examples = getObjectArray(root, 'examples');
  const variants = getObjectArray(root, 'variants');

  const baseName = path.basename(docsFilePath).replace('.docs.tsx', '');
  const title = `UI Kit (DSL)/${group}/${componentName}`;
  const outputFilePath = docsFilePath.replace('.docs.tsx', '.generated.stories.tsx');
  const metaTags = ['autodocs', 'dsl-generated'];
  if (status === 'deprecated' || hasDeprecatedMeta) {
    metaTags.push('deprecated');
  }

  const lines = [];
  lines.push("import type { Meta, StoryObj } from '@storybook/react';");
  lines.push(`import { ${componentName} } from './${baseName}';`);
  lines.push(`import docs from './${baseName}.docs';`);
  lines.push('');
  lines.push('const buildDslDocsDescription = () => {');
  lines.push('  const sections: string[] = [];');
  lines.push('');
  lines.push('  if (docs.meta.description?.trim()) {');
  lines.push('    sections.push(docs.meta.description.trim());');
  lines.push('  }');
  lines.push('');
  lines.push('  if (docs.meta.deprecated?.since) {');
  lines.push('    const replacement = docs.meta.deprecated.replacement ? ` Замена: ${docs.meta.deprecated.replacement}.` : "";');
  lines.push('    const reason = docs.meta.deprecated.reason ? ` Причина: ${docs.meta.deprecated.reason}.` : "";');
  lines.push('    sections.push(`**Deprecated since ${docs.meta.deprecated.since}.**${reason}${replacement}`);');
  lines.push('  }');
  lines.push('');
  lines.push('  if (docs.a11y) {');
  lines.push('    const a11yLines: string[] = [];');
  lines.push('    if (docs.a11y.roles?.length) a11yLines.push(`- Roles: ${docs.a11y.roles.join(", ")}`);');
  lines.push('    if (docs.a11y.requiredAttributes?.length) {');
  lines.push('      a11yLines.push(`- Required attributes: ${docs.a11y.requiredAttributes.join(", ")}`);');
  lines.push('    }');
  lines.push('    if (docs.a11y.keyboard?.length) a11yLines.push(`- Keyboard: ${docs.a11y.keyboard.join("; ")}`);');
  lines.push('    if (docs.a11y.notes?.length) a11yLines.push(`- Notes: ${docs.a11y.notes.join("; ")}`);');
  lines.push('    if (a11yLines.length > 0) {');
  lines.push('      sections.push(`### Accessibility\\n${a11yLines.join("\\n")}`);');
  lines.push('    }');
  lines.push('  }');
  lines.push('');
  lines.push('  if (docs.related?.length) {');
  lines.push('    const relatedLines = docs.related.map((item) => `- [${item.name}](${item.href})${item.reason ? ` — ${item.reason}` : ""}`);');
  lines.push('    sections.push(`### Related\\n${relatedLines.join("\\n")}`);');
  lines.push('  }');
  lines.push('');
  lines.push('  if (docs.props) {');
  lines.push('    const modeLine = `Mode: ${docs.props.mode}`;');
  lines.push('    const includeLine = docs.props.include?.length ? `Included: ${docs.props.include.join(", ")}` : null;');
  lines.push('    const excludeLine = docs.props.exclude?.length ? `Excluded: ${docs.props.exclude.join(", ")}` : null;');
  lines.push('    const manualLine = docs.props.manual?.length ? `Manual props: ${docs.props.manual.length}` : null;');
  lines.push('    const manualItems = docs.props.manual?.length');
  lines.push('      ? docs.props.manual.map((prop) => {');
  lines.push('          const required = prop.required ? " required" : "";');
  lines.push('          const deprecated = prop.deprecated ? " deprecated" : "";');
  lines.push('          const defaultValue = prop.defaultValue ? ` (default: ${prop.defaultValue})` : "";');
  lines.push('          const description = prop.description ? ` — ${prop.description}` : "";');
  lines.push('          return `- \\`${prop.name}\\` (${prop.type})${required}${deprecated}${defaultValue}${description}`;');
  lines.push('        })');
  lines.push('      : [];');
  lines.push('    const propsLines = [modeLine, includeLine, excludeLine, manualLine, ...manualItems].filter(Boolean);');
  lines.push('    sections.push(`### Props source\\n${propsLines.join("\\n")}`);');
  lines.push('  }');
  lines.push('');
  lines.push('  return sections.join("\\n\\n");');
  lines.push('};');
  lines.push('');
  lines.push(`const meta: Meta<typeof ${componentName}> = {`);
  lines.push(`  title: ${JSON.stringify(title)},`);
  lines.push(`  component: ${componentName},`);
  lines.push(`  tags: ${JSON.stringify(metaTags)},`);
  lines.push('  parameters: {');
  lines.push('    docs: { description: { component: buildDslDocsDescription() } },');
  lines.push('    dsl: {');
  lines.push('      platform: docs.meta.platform,');
  lines.push('      since: docs.meta.since,');
  lines.push('      status: docs.meta.status,');
  lines.push('      deprecated: docs.meta.deprecated ?? null,');
  lines.push('      props: docs.props ?? null,');
  lines.push('      a11y: docs.a11y ?? null,');
  lines.push('      related: docs.related ?? null,');
  lines.push('    },');
  lines.push('  },');
  lines.push('};');
  lines.push('');
  lines.push('export default meta;');
  lines.push('type Story = StoryObj<typeof meta>;');
  lines.push('');

  const usedStoryNames = new Set();
  const pushStory = ({
    storyId,
    storyTitle,
    storyDescription,
    storyCode,
    renderExpr,
    layout,
    themes,
    showCode = null,
  }) => {
    let exportName = toPascalCase(storyId);
    if (usedStoryNames.has(exportName)) {
      let idx = 2;
      while (usedStoryNames.has(`${exportName}${idx}`)) idx += 1;
      exportName = `${exportName}${idx}`;
    }
    usedStoryNames.add(exportName);

    const storybookLayout = layout ? STORYBOOK_LAYOUT_BY_DSL[layout] : null;

    lines.push(`export const ${exportName}: Story = {`);
    lines.push(`  name: ${JSON.stringify(storyTitle)},`);
    lines.push(`  render: ${renderExpr},`);
    lines.push('  parameters: {');
    if (storybookLayout) {
      lines.push(`    layout: ${JSON.stringify(storybookLayout)},`);
    }
    if (layout || themes?.length || typeof showCode === 'boolean') {
      lines.push('    /** Способ подачи примера и оси темы, объявленные в DSL */');
      lines.push('    dsl: {');
      if (layout) {
        lines.push(`      layout: ${JSON.stringify(layout)},`);
      }
      if (themes?.length) {
        lines.push(`      themes: ${JSON.stringify(themes)},`);
      }
      if (typeof showCode === 'boolean') {
        lines.push(`      showCode: ${showCode},`);
      }
      lines.push('    },');
    }
    lines.push('    docs: {');
    lines.push(`      description: { story: ${JSON.stringify(storyDescription ?? '')} },`);
    if (showCode !== false) {
      lines.push('      source: {');
      lines.push("        type: 'code',");
      lines.push(`        code: ${JSON.stringify(storyCode ?? '')},`);
      lines.push("        language: 'tsx',");
      lines.push('      },');
    }
    lines.push('    },');
    lines.push('  },');
    lines.push('};');
    lines.push('');
  };

  examples.forEach((example, index) => {
    const id = getStringLiteralValue(example, 'id') ?? `example-${index + 1}`;
    const storyTitle = getStringLiteralValue(example, 'title') ?? id;
    const storyDescription = getStringLiteralValue(example, 'description') ?? '';
    const explicitCode = getStringLiteralValue(example, 'code');
    const renderText = getExpressionText(example, 'render', sourceFile);
    const fallbackCode = renderText ? extractCodeFromRenderText(renderText) : '';

    pushStory({
      storyId: id,
      storyTitle,
      storyDescription,
      storyCode: explicitCode ?? fallbackCode,
      renderExpr: `docs.examples[${index}].render`,
      layout: getStringLiteralValue(example, 'layout'),
      themes: getStringArray(example, 'themes'),
      showCode: getBooleanLiteralValue(example, 'showCode'),
    });
  });

  variants.forEach((variantGroup, groupIndex) => {
    const groupId = getStringLiteralValue(variantGroup, 'id') ?? `variant-group-${groupIndex + 1}`;
    const groupTitle = getStringLiteralValue(variantGroup, 'title') ?? groupId;

    const itemsProp = getObjectProperty(variantGroup, 'items');
    if (!itemsProp || !ts.isArrayLiteralExpression(itemsProp.initializer)) return;

    const items = itemsProp.initializer.elements.filter(ts.isObjectLiteralExpression);
    items.forEach((item, itemIndex) => {
      const itemId = getStringLiteralValue(item, 'id') ?? `${groupId}-${itemIndex + 1}`;
      const itemTitle = getStringLiteralValue(item, 'title') ?? itemId;
      const itemDescription = getStringLiteralValue(item, 'description') ?? '';
      const explicitCode = getStringLiteralValue(item, 'code');
      const renderText = getExpressionText(item, 'render', sourceFile);
      const fallbackCode = renderText ? extractCodeFromRenderText(renderText) : '';

      pushStory({
        storyId: `${groupId}-${itemId}`,
        storyTitle: `${groupTitle}: ${itemTitle}`,
        storyDescription: itemDescription,
        storyCode: explicitCode ?? fallbackCode,
        renderExpr: `docs.variants?.[${groupIndex}]?.items?.[${itemIndex}]?.render ?? (() => null)`,
      });
    });
  });

  fs.writeFileSync(outputFilePath, `${lines.join('\n')}\n`, 'utf8');
  return { outputFilePath, title, description };
};

const docsFiles = fs.existsSync(ROOT) ? walkDocsFiles(ROOT) : [];
const generatedStoriesFiles = fs.existsSync(ROOT) ? walkGeneratedStoriesFiles(ROOT) : [];
const expectedGeneratedFiles = new Set(
  docsFiles.map((docsFilePath) => docsFilePath.replace('.docs.tsx', '.generated.stories.tsx')),
);

const orphanedGeneratedFiles = generatedStoriesFiles.filter(
  (generatedFilePath) => !expectedGeneratedFiles.has(generatedFilePath),
);

orphanedGeneratedFiles.forEach((generatedFilePath) => {
  fs.unlinkSync(generatedFilePath);
  const rel = path.relative(path.resolve(SCRIPT_DIR, '..'), generatedFilePath).replaceAll('\\', '/');
  console.log(`[docs-to-csf] removed orphan: ${rel}`);
});

if (docsFiles.length === 0) {
  console.log('[docs-to-csf] .docs.tsx файлы не найдены');
  process.exit(0);
}

const generated = docsFiles.map(generateStoriesFile);
generated.forEach((item) => {
  const rel = path.relative(path.resolve(SCRIPT_DIR, '..'), item.outputFilePath).replaceAll('\\', '/');
  console.log(`[docs-to-csf] generated: ${rel} -> ${item.title}`);
});
