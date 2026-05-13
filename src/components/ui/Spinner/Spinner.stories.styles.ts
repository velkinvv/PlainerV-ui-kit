import type { CSSProperties } from 'react';
import { lightTheme } from '@/themes/themes';

export const spinnerStoriesStyles = {
  row24: {
    display: 'flex',
    gap: 24,
    alignItems: 'center',
  } satisfies CSSProperties,
  row24Wrap: {
    display: 'flex',
    gap: 24,
    alignItems: 'center',
    flexWrap: 'wrap',
  } satisfies CSSProperties,
  row32Wrap: {
    display: 'flex',
    gap: 32,
    alignItems: 'center',
    flexWrap: 'wrap',
  } satisfies CSSProperties,
  textCenter: {
    textAlign: 'center',
  } satisfies CSSProperties,
  caption: {
    marginTop: 8,
    fontSize: 12,
  } satisfies CSSProperties,
  column24Width320: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    width: 320,
  } satisfies CSSProperties,
  heading8: {
    marginBottom: 8,
  } satisfies CSSProperties,
  centeredContainer200x100: {
    width: 200,
    height: 100,
    border: `1px solid ${lightTheme.colors.border}`,
    borderRadius: 8,
    position: 'relative',
  } satisfies CSSProperties,
  centeredContainer200x120: {
    width: 200,
    height: 120,
    border: `1px solid ${lightTheme.colors.border}`,
    borderRadius: 8,
    position: 'relative',
  } satisfies CSSProperties,
  column32: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
  } satisfies CSSProperties,
  heading16: {
    marginBottom: 16,
  } satisfies CSSProperties,
  defaultSpinnerColor: lightTheme.colors.info,
  colorBlue: lightTheme.colors.info,
  colorRed: lightTheme.colors.danger,
  colorGreen: lightTheme.colors.success,
  colorPurple: lightTheme.colors.primary,
  colorOrange: lightTheme.colors.warning,
};
