import type { ReactNode } from 'react';

/** Имена пропсов, из которых чаще всего берётся подпись для экспорта */
const EXPORT_LABEL_PROP_NAMES = ['children', 'label', 'title', 'text', 'description'] as const;

/**
 * Преобразует React-узел (результат `render` / `format`) в строку для Excel.
 * @param node — узел дерева React
 * @param fallback — значение, если извлечь текст не удалось
 */
export function reactNodeToExportPlainText(node: ReactNode, fallback = ''): string {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return fallback;
  }
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node
      .map((part) => reactNodeToExportPlainText(part, ''))
      .filter(Boolean)
      .join(' ')
      .trim();
  }
  if (typeof node === 'object' && node !== null && 'props' in node) {
    const elementProps = (node as { props?: Record<string, ReactNode> }).props;
    if (elementProps) {
      for (const propName of EXPORT_LABEL_PROP_NAMES) {
        const propValue = elementProps[propName];
        if (propValue !== undefined && propValue !== null) {
          const extracted = reactNodeToExportPlainText(propValue, '');
          if (extracted.trim() !== '') {
            return extracted.trim();
          }
        }
      }
    }
  }
  return fallback;
}
