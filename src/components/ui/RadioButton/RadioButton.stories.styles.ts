import type { CSSProperties } from 'react';
import { lightTheme } from '@/themes/themes';

export const radioButtonStoriesStyles = {
  fieldsetReset: {
    border: 'none',
    margin: 0,
    padding: 0,
  } satisfies CSSProperties,
  legendBase: {
    fontWeight: 600,
    marginBottom: 12,
    padding: 0,
  } satisfies CSSProperties,
  columnGap16: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  } satisfies CSSProperties,
  columnGap12: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  } satisfies CSSProperties,
  selectedCard: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    borderRadius: '4px',
  } satisfies CSSProperties,
  selectedValueCaption: {
    margin: '12px 0 0',
    color: lightTheme.colors.textSecondary,
    fontSize: '14px',
  } satisfies CSSProperties,
  headingWithBottom16: {
    margin: '0 0 16px 0',
  } satisfies CSSProperties,
  errorText: {
    color: lightTheme.colors.danger,
    fontSize: '14px',
    marginTop: '8px',
  } satisfies CSSProperties,
  width400Column16: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '400px',
  } satisfies CSSProperties,
  columnGap24: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  } satisfies CSSProperties,
};
