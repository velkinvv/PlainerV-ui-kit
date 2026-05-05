import type { CSSProperties } from 'react';

export const checkboxStoriesStyles = {
  sizesColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  } satisfies CSSProperties,
  checkboxGroupColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  } satisfies CSSProperties,
  checkboxGroupHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '12px',
    alignItems: 'center',
  } satisfies CSSProperties,
};
