import type { CSSProperties } from 'react';

/**
 * Стили для сторис `Icon / Test` — сетка превью иконок.
 */
export const iconTestStoriesStyles = {
  iconRow: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  } satisfies CSSProperties,

  iconCell: {
    textAlign: 'center',
  } satisfies CSSProperties,
};
