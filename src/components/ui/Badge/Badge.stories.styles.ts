import type { CSSProperties } from 'react';

export const badgeStoriesStyles = {
  wrapRowCenter: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
    alignItems: 'center',
  } satisfies CSSProperties,
  rowCenter: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
  } satisfies CSSProperties,
  wrapRow: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
  } satisfies CSSProperties,
};
