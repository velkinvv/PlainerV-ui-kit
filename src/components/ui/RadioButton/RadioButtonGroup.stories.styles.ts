import type { CSSProperties } from 'react';
import { lightTheme } from '@/themes/themes';

export const radioButtonGroupStoriesStyles = {
  columnGap16: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  } satisfies CSSProperties,
  columnGap24: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  } satisfies CSSProperties,
  selectedCard: {
    padding: '12px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    borderRadius: '4px',
  } satisfies CSSProperties,
  showcaseContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    maxWidth: '520px',
  } satisfies CSSProperties,
  showcaseHeading: {
    margin: '0 0 12px',
    fontSize: '15px',
    fontWeight: 600,
  } satisfies CSSProperties,
  width500: {
    width: '500px',
  } satisfies CSSProperties,
};
