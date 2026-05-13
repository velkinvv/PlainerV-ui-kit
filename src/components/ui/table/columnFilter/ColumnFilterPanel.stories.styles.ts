import type { CSSProperties } from 'react';

/**
 * Стили разметки для сторис `ColumnFilterPanel`.
 */
export const columnFilterPanelStoriesStyles = {
  /** Вертикальный стек: панель фильтра + сообщение о применении. */
  defaultStoryStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'flex-start',
  } satisfies CSSProperties,
};
