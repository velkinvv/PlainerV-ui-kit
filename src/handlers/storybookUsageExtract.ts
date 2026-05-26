/**
 * Извлечение примеров использования компонента из исходника CSF-сторис (render/return).
 */

/**
 * Извлекает объявления useState из тела render-функции сторис.
 * @param source - Фрагмент исходника одной сторис.
 */
export const extractUseStateDeclarationsFromStorySource = (source: string): string[] => {
  const declarations: string[] = [];
  const pattern =
    /const\s*\[([^\]]+)\]\s*=\s*(?:React\.)?useState(?:<[^>]+>)?\([\s\S]*?\);/g;

  let match = pattern.exec(source);
  while (match !== null) {
    declarations.push(match[0].trim());
    match = pattern.exec(source);
  }

  return declarations;
};

/**
 * Извлекает JSX из `return (...)` внутри render-функции.
 * @param source - Фрагмент исходника одной сторис.
 */
/**
 * Извлекает содержимое скобок после `prefix` (return или стрелочная функция).
 * @param source - Исходник сторис.
 * @param prefix - Начало совпадения, после которого идёт `(`.
 */
const extractParenthesizedBlockAfter = (
  source: string,
  prefix: RegExp,
): string | null => {
  const match = source.match(prefix);
  if (!match || match.index === undefined) {
    return null;
  }

  let index = match.index + match[0].length;
  let depth = 1;

  while (index < source.length && depth > 0) {
    const character = source[index];
    if (character === '(') {
      depth += 1;
    } else if (character === ')') {
      depth -= 1;
    }
    index += 1;
  }

  if (depth !== 0) {
    return null;
  }

  return source.slice(match.index + match[0].length, index - 1).trim();
};

/**
 * Извлекает JSX после `return` без скобок: `return <Foo />`.
 * @param source - Фрагмент исходника сторис.
 */
const extractReturnJsxWithoutParens = (source: string): string | null => {
  const match = source.match(/return\s+(<[\s\S]+?);/);
  return match?.[1]?.trim() ?? null;
};

/**
 * JSX сразу после стрелочного render: `render: () => <Foo />` (без скобок вокруг корня).
 * @param source - Фрагмент исходника сторис.
 */
const extractArrowRenderJsx = (source: string): string | null => {
  const match = source.match(/render\s*:\s*\([^)]*\)\s*=>\s*(<[\s\S]+)/);
  if (!match?.[1]) {
    return null;
  }

  let fragment = match[1].trim();
  if (fragment.startsWith('(')) {
    return null;
  }

  const cutAtCommaParams = fragment.search(/,\s*\n\s*(?:parameters|decorators|args|name)\s*:/);
  if (cutAtCommaParams !== -1) {
    fragment = fragment.slice(0, cutAtCommaParams).trim();
  }

  if (fragment.endsWith(',')) {
    fragment = fragment.slice(0, -1).trim();
  }

  return fragment.length > 0 ? fragment : null;
};

export const extractReturnJsxFromStorySource = (source: string): string | null => {
  return (
    extractParenthesizedBlockAfter(source, /return\s*\(/) ??
    extractParenthesizedBlockAfter(source, /render\s*:\s*\(\)\s*=>\s*\(/) ??
    extractParenthesizedBlockAfter(source, /render\s*:\s*\([^)]*\)\s*=>\s*\(/) ??
    /** Storybook Docs иногда передаёт только тело сторис без `render:` */
    extractParenthesizedBlockAfter(source, /^\s*\(\)\s*=>\s*\(/m) ??
    extractParenthesizedBlockAfter(source, /^\s*\([^)]*\)\s*=>\s*\(/m) ??
    extractArrowRenderJsx(source) ??
    extractReturnJsxWithoutParens(source)
  );
};

/**
 * Вырезает тело одного экспорта `export const StoryName = { ... };` из CSF-файла.
 * @param fullSource - Полный исходник файла сторис.
 * @param exportName - Имя экспорта (например `Default`, `SingleControlled`).
 */
export const extractStoryExportBlock = (
  fullSource: string,
  exportName: string,
): string | null => {
  const marker = `export const ${exportName}`;
  const startIndex = fullSource.indexOf(marker);
  if (startIndex === -1) {
    return null;
  }

  const equalsIndex = fullSource.indexOf('=', startIndex + marker.length);
  if (equalsIndex === -1) {
    return null;
  }

  const openBraceIndex = fullSource.indexOf('{', equalsIndex);
  if (openBraceIndex === -1) {
    return null;
  }

  let depth = 0;
  let index = openBraceIndex;

  while (index < fullSource.length) {
    const character = fullSource[index];
    if (character === '{') {
      depth += 1;
    } else if (character === '}') {
      depth -= 1;
      if (depth === 0) {
        return fullSource.slice(startIndex, index + 1);
      }
    }
    index += 1;
  }

  return null;
};

/**
 * Извлекает экспорт сторис от `export const Name` до следующего `export const` (устойчиво к spread `...describeStory()`).
 * @param fullSource - Полный исходник CSF-файла.
 * @param exportName - Имя экспорта (`WithHelperText`).
 */
export const extractRenderSectionFromExport = (
  fullSource: string,
  exportName: string,
): string | null => {
  const marker = `export const ${exportName}`;
  const exportStart = fullSource.indexOf(marker);
  if (exportStart === -1) {
    return null;
  }

  const renderIndex = fullSource.indexOf('render:', exportStart);
  if (renderIndex === -1) {
    return null;
  }

  const afterRender = fullSource.slice(renderIndex + 1);
  const nextExportOffset = afterRender.search(/\nexport const /);
  const exportEnd =
    nextExportOffset === -1 ? fullSource.length : renderIndex + 1 + nextExportOffset;

  return fullSource.slice(exportStart, exportEnd).trim();
};

/**
 * Упрощает JSX для вкладки Docs: убирает story-стили и лишние обёртки.
 * @param jsx - Сырой JSX из return.
 */
export const normalizeStoryUsageJsx = (jsx: string): string => {
  let normalized = jsx;

  normalized = normalized.replace(/\sstyle=\{[a-zA-Z0-9_.]+\}/g, '');
  normalized = normalized.replace(/\sstyle=\{\{[\s\S]*?\}\}/g, '');
  normalized = normalized.replace(/displayCharacterCounter=\{true\}/g, 'displayCharacterCounter');
  normalized = normalized.replace(/displayCharacterCounter=\{false\}/g, '');
  normalized = normalized.replace(/disabled=\{true\}/g, 'disabled');
  normalized = normalized.replace(/disabled=\{false\}/g, '');
  normalized = normalized.replace(/readOnly=\{true\}/g, 'readOnly');
  normalized = normalized.replace(/readOnly=\{false\}/g, '');
  normalized = normalized.replace(/required=\{true\}/g, 'required');
  normalized = normalized.replace(/fullWidth=\{true\}/g, 'fullWidth');
  normalized = normalized.replace(/fullWidth=\{false\}/g, '');
  normalized = normalized.replace(/success=\{true\}/g, 'success');
  normalized = normalized.replace(/success=\{false\}/g, '');

  const divClosingTag = `</${'div'}>`;
  const divWrapperPattern = new RegExp(`^<div>\\s*([\\s\\S]+?)\\s*${divClosingTag.replace('/', '\\/')}$`, 'm');
  const divWrapperMatch = normalized.match(divWrapperPattern);
  if (divWrapperMatch?.[1]) {
    normalized = divWrapperMatch[1].trim();
  }

  normalized = normalized.replace(/<StoryLayoutWrapper[^>]*>/g, '<>');
  normalized = normalized.replace(/<\/StoryLayoutWrapper>/g, '</>');

  return normalized.trim();
};

/**
 * Фрагмент исходника только внутри `render:` (без строк usageCode в spread `describeStory`).
 * @param source - Блок экспорта сторис или полный файл.
 */
export const extractStoryRenderScope = (source: string): string => {
  const renderIndex = source.search(/render\s*:\s*/);
  return renderIndex === -1 ? source : source.slice(renderIndex);
};

/**
 * Нужна ли обёртка в функцию-компонент перед `<Form>` (хуки нельзя класть в children Form).
 * @param body - Тело сниппета до обёртки в Form.
 */
export const usageSnippetNeedsComponentWrapper = (body: string): boolean =>
  /\buseState\s*\(/.test(body) ||
  /\buseEffect\s*\(/.test(body) ||
  /\buseReducer\s*\(/.test(body) ||
  /\buseMemo\s*\(/.test(body) ||
  /\buseCallback\s*\(/.test(body) ||
  /(?:^|\n)\s*(?:const|let)\s*\[[^\]]+\]\s*=/.test(body);

/**
 * Превращает объявления состояния + JSX в тело функции с `return`.
 * @param body - Объявления и корневой JSX без `return`.
 */
export const formatUsageSnippetAsComponentBody = (body: string): string => {
  const trimmed = body.trim();

  if (/\breturn\s+/.test(trimmed)) {
    return indentUsageLines(trimmed, 2);
  }

  const firstJsxIndex = trimmed.search(/(?:^|\n)\s*</);
  if (firstJsxIndex === -1) {
    return `  return (\n    ${indentUsageLines(trimmed, 4)}\n  );`;
  }

  const declarations = trimmed.slice(0, firstJsxIndex).trim();
  const jsx = trimmed.slice(firstJsxIndex).trim();
  const jsxIndented = jsx.includes('\n') ? indentUsageLines(jsx, 4) : jsx;
  const declarationBlock =
    declarations.length > 0 ? `${indentUsageLines(declarations, 2)}\n\n` : '';

  return `${declarationBlock}  return (\n    ${jsxIndented}\n  );`;
};

/**
 * Оборачивает сниппет в `<Form>`; при хуках — через `StoryExample`, как на канвасе с декоратором.
 * @param body - Сниппет использования.
 * @param wrapInForm - Нужна обёртка Form (поля UI Kit).
 */
export const wrapUsageSnippetForDocs = (body: string, wrapInForm: boolean): string => {
  const trimmed = body.trim();
  if (!trimmed) {
    return body;
  }

  if (!wrapInForm || trimmed.includes('<Form')) {
    return trimmed;
  }

  if (usageSnippetNeedsComponentWrapper(trimmed)) {
    const componentBody = formatUsageSnippetAsComponentBody(trimmed);
    return `function StoryExample() {\n${componentBody}\n}\n\n<Form formId="example-form">\n  <StoryExample />\n</Form>`;
  }

  return `<Form formId="example-form">\n${indentUsageLines(trimmed, 2)}\n</Form>`;
};

/**
 * Собирает пример кода из render-функции сторис.
 * @param source - Исходник сторис из Storybook.
 * @param options.wrapInForm - Обернуть в Form, если внутри нет Form.
 */
export const buildUsageSnippetFromRenderSource = (
  source: string,
  options?: { wrapInForm?: boolean },
): string | null => {
  const renderScope = extractStoryRenderScope(source);
  const stateDeclarations = extractUseStateDeclarationsFromStorySource(renderScope);
  const returnJsx = extractReturnJsxFromStorySource(renderScope);

  if (!returnJsx) {
    return null;
  }

  const normalizedJsx = normalizeStoryUsageJsx(returnJsx);
  const body =
    stateDeclarations.length > 0
      ? `${stateDeclarations.join('\n')}\n\n${normalizedJsx}`
      : normalizedJsx;

  return wrapUsageSnippetForDocs(body, Boolean(options?.wrapInForm));
};

/**
 * Добавляет отступ каждой строке сниппета.
 * @param text - Многострочный текст.
 * @param spaces - Число пробелов отступа.
 */
const indentUsageLines = (text: string, spaces: number): string => {
  const padding = ' '.repeat(spaces);
  return text
    .split('\n')
    .map((line) => (line.length > 0 ? `${padding}${line}` : line))
    .join('\n');
};
