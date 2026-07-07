import type { CSSProperties } from 'react';

export const accordionStoriesStyles = {
  controlledContainer: {
    width: '400px',
  } satisfies CSSProperties,
  controlledCaption: {
    marginBottom: '16px',
  } satisfies CSSProperties,
  /** Контейнер «встроенного» аккордеона без внешних скруглений */
  embeddedContainer: {
    maxWidth: '480px',
    border: '1px solid #ececec',
    borderRadius: '12px',
    overflow: 'hidden',
  } satisfies CSSProperties,
  /** Фон для демо glass-темы */
  glassDemoCanvas: {
    padding: '24px',
    borderRadius: '16px',
    minHeight: '180px',
  } satisfies CSSProperties,
};
