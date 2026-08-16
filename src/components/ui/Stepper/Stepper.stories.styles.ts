import type { CSSProperties } from 'react';

export const stepperStoriesStyles = {
  interactiveContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'flex-start',
  } satisfies CSSProperties,
  narrow320: {
    width: 320,
    maxWidth: '100%',
    border: '1px dashed #ccc',
    padding: 8,
    boxSizing: 'border-box',
  } satisfies CSSProperties,
  narrow360: {
    width: 360,
    maxWidth: '100%',
    border: '1px dashed #ccc',
    padding: 8,
    boxSizing: 'border-box',
  } satisfies CSSProperties,
  narrow480: {
    width: 480,
    maxWidth: '100%',
    border: '1px dashed #ccc',
    padding: 8,
    boxSizing: 'border-box',
  } satisfies CSSProperties,
  wide960: {
    width: 960,
    maxWidth: '100%',
    border: '1px dashed #ccc',
    padding: 8,
    boxSizing: 'border-box',
  } satisfies CSSProperties,
};
