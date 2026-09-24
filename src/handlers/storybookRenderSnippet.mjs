/**
 * Извлекает JSX-код из источника render-функции Storybook.
 * Поддерживает варианты:
 * - () => (<JSX />)
 * - () => { return (<JSX />) }
 * - render: () => (<JSX />)
 * - render: () => <JSX />
 * - return <JSX />
 * Если JSX не найден, возвращает исходный текст.
 */
const extractParenthesizedBlockAfter = (source, prefix) => {
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

const extractReturnJsxWithoutParens = (source) => {
  const match = source.match(/return\s+(<[\s\S]+?);/);
  return match?.[1]?.trim() ?? null;
};

const extractArrowRenderJsx = (source) => {
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

export const extractCodeFromRenderText = (renderText) => {
  const source = renderText.trim();

  return (
    extractParenthesizedBlockAfter(source, /return\s*\(/) ??
    extractParenthesizedBlockAfter(source, /render\s*:\s*\(\)\s*=>\s*\(/) ??
    extractParenthesizedBlockAfter(source, /render\s*:\s*\([^)]*\)\s*=>\s*\(/) ??
    extractParenthesizedBlockAfter(source, /^\s*\(\)\s*=>\s*\(/m) ??
    extractParenthesizedBlockAfter(source, /^\s*\([^)]*\)\s*=>\s*\(/m) ??
    extractArrowRenderJsx(source) ??
    extractReturnJsxWithoutParens(source) ??
    source
  );
};
