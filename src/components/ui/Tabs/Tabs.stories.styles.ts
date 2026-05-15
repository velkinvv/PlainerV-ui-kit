import type { CSSProperties } from 'react';
import { lightTheme } from '@/themes/themes';

export const tabsStoriesStyles = {
  contentPadding16: {
    padding: '16px',
  } satisfies CSSProperties,
  codeBlock: {
    backgroundColor: lightTheme.colors.backgroundTertiary,
    padding: '12px',
    borderRadius: '6px',
    fontSize: '14px',
    overflow: 'auto',
  } satisfies CSSProperties,
  previewPanel: {
    border: `1px solid ${lightTheme.colors.border}`,
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
  } satisfies CSSProperties,
  docsStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  } satisfies CSSProperties,
  controlledContainer: {
    width: '500px',
  } satisfies CSSProperties,
  controlledLabel: {
    marginBottom: '16px',
  } satisfies CSSProperties,
  /** Широкая рамка для сторис **underline** с базовой линией FULL vs ITEMS */
  wideDashedPanel: {
    border: `1px dashed ${lightTheme.colors.border}`,
    padding: '12px',
  } satisfies CSSProperties,
};
