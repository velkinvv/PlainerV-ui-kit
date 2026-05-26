import type { CSSProperties } from 'react';

/**
 * Стили демо кастомной темы в Storybook.
 */
export const customThemeStoriesStyles = {
  /** Вертикальный стек секций с отступами. */
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '720px',
  } satisfies CSSProperties,

  /** Ряд: подпись + контрол. */
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '16px',
  } satisfies CSSProperties,

  /** Плашка с hex текущего primary из темы. */
  colorSwatch: (backgroundColor: string): CSSProperties => ({
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor,
    border: '1px solid rgba(128, 128, 128, 0.35)',
    flexShrink: 0,
  }),

  /** Моноширинный блок с результатом merge. */
  codeResult: {
    margin: 0,
    padding: '12px 16px',
    borderRadius: '8px',
    fontFamily: 'ui-monospace, monospace',
    fontSize: '13px',
    lineHeight: 1.5,
  } satisfies CSSProperties,
};
