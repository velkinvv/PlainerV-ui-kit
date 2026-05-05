import type { CSSProperties } from 'react';

export const avatarGroupStoriesStyles = {
  columnGap24: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  } satisfies CSSProperties,

  columnGap32: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  } satisfies CSSProperties,

  rowCenterGap24: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  } satisfies CSSProperties,
};
