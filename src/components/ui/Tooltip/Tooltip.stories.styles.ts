import type { CSSProperties } from 'react';
import { lightTheme } from '@/themes/themes';

export const tooltipStoriesStyles = {
  htmlAccentText: {
    color: lightTheme.colors.info,
  } satisfies CSSProperties,
  gridDemo: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(2, 1fr)',
    padding: '40px',
  } satisfies CSSProperties,
  rowDemo: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  } satisfies CSSProperties,
  arrowDemo: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    padding: '40px',
  } satisfies CSSProperties,
};
