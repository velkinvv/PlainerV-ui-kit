import type { CSSProperties } from 'react';

/**
 * Стили сторис {@link ThemeVariantSelector}.
 */
export const themeVariantSelectorStoriesStyles = {
  panel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    minWidth: '280px',
  } satisfies CSSProperties,

  controlsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '16px',
  } satisfies CSSProperties,
};
