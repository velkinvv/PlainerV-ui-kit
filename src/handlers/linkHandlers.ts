import type { HTMLAttributeAnchorTarget } from 'react';

/**
 * Дополняет `rel` для безопасного открытия в новой вкладке (`target="_blank"`).
 * @param target - Значение HTML-атрибута `target`.
 * @param rel - Уже заданный потребителем `rel` (может быть пустым).
 * @returns Итоговая строка `rel` или `undefined`, если нечего выставлять.
 */
export const mergeAnchorRel = (
  target?: HTMLAttributeAnchorTarget,
  rel?: string,
): string | undefined => {
  if (target !== '_blank') {
    return rel?.trim() ? rel : undefined;
  }
  const parts = new Set(
    (rel ?? '')
      .split(/\s+/)
      .map(s => s.trim())
      .filter(Boolean),
  );
  parts.add('noopener');
  parts.add('noreferrer');
  return [...parts].join(' ');
};
