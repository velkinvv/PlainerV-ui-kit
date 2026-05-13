import type { CSSProperties } from 'react';

export const avatarStoriesStyles = {
  iconFallback: {
    fontSize: 24,
  } satisfies CSSProperties,
  rowContainer: {
    display: 'flex',
    gap: 16,
    alignItems: 'center',
  } satisfies CSSProperties,
  wideRowContainer: {
    display: 'flex',
    gap: 20,
    alignItems: 'center',
    padding: 20,
  } satisfies CSSProperties,
  grid4Container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 24,
    padding: 20,
  } satisfies CSSProperties,
  grid3Container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
    padding: 20,
  } satisfies CSSProperties,
  centeredCell: {
    textAlign: 'center',
  } satisfies CSSProperties,
  caption: {
    marginTop: 8,
    fontSize: 12,
  } satisfies CSSProperties,
};
