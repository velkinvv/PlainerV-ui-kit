import type { CSSProperties } from 'react';

export const buttonGroupStoriesStyles = {
  columnGap16: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  } satisfies CSSProperties,
  columnGap12: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  } satisfies CSSProperties,
  maxWidth480: {
    maxWidth: 480,
  } satisfies CSSProperties,
  maxWidth400: {
    maxWidth: 400,
  } satisfies CSSProperties,
};
