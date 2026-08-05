import type { CSSProperties } from 'react';

/** Стили обёртки сторис Rating */
export const ratingStoriesStyles = {
  storyContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: 16,
    maxWidth: 480,
    fontFamily: 'Montserrat, sans-serif',
  } satisfies CSSProperties,
  row: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  } satisfies CSSProperties,
  caption: {
    margin: 0,
    fontSize: 13,
    opacity: 0.75,
  } satisfies CSSProperties,
};
