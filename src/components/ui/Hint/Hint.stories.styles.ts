import type { CSSProperties } from 'react';
import { lightTheme } from '@/themes/themes';

export const hintStoriesStyles = {
  rowCenter20: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  } satisfies CSSProperties,
  grid2Gap20: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(2, 1fr)',
  } satisfies CSSProperties,
  grid2Gap20Padded40: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(2, 1fr)',
    padding: '40px',
  } satisfies CSSProperties,
  arrowDemoRow: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    padding: '40px',
  } satisfies CSSProperties,
  centeredColumnGap20: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
  } satisfies CSSProperties,
  logPanel: {
    padding: '16px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    borderRadius: '8px',
    minWidth: '300px',
    maxHeight: '200px',
    overflowY: 'auto',
  } satisfies CSSProperties,
  logTitle: {
    margin: '0 0 12px 0',
    fontSize: '14px',
    fontWeight: 600,
  } satisfies CSSProperties,
  hintText12: {
    margin: 0,
    color: lightTheme.colors.textSecondary,
    fontSize: '12px',
  } satisfies CSSProperties,
  list12: {
    margin: 0,
    paddingLeft: '20px',
    fontSize: '12px',
  } satisfies CSSProperties,
  listItemGap4: {
    marginBottom: '4px',
  } satisfies CSSProperties,
  comparisonRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    padding: '100px',
  } satisfies CSSProperties,
  rowCenter20MarginTop200: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    marginTop: '200px',
  } satisfies CSSProperties,
  columnGap20Padding40: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '40px',
  } satisfies CSSProperties,
  buttonMarginRight10: {
    marginRight: '10px',
  } satisfies CSSProperties,
  statusText14: {
    fontSize: '14px',
    color: lightTheme.colors.textSecondary,
  } satisfies CSSProperties,
  arrowsVariantsRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    padding: '40px',
  } satisfies CSSProperties,
  arrowsCornersRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    padding: '100px',
  } satisfies CSSProperties,
  closeOnScrollRoot: {
    padding: '40px',
    height: '200vh',
  } satisfies CSSProperties,
  marginBottom20: {
    marginBottom: '20px',
  } satisfies CSSProperties,
  marginTop100vh: {
    marginTop: '100vh',
  } satisfies CSSProperties,
  helperTextWithMarginTop20: {
    marginTop: '20px',
    fontSize: '14px',
    color: lightTheme.colors.textSecondary,
  } satisfies CSSProperties,
  tourRoot: {
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    alignItems: 'center',
  } satisfies CSSProperties,
  tourFooter: {
    marginTop: '20px',
    textAlign: 'center',
  } satisfies CSSProperties,
  tourStatusText: {
    fontSize: '14px',
    color: lightTheme.colors.textSecondary,
    marginBottom: '10px',
  } satisfies CSSProperties,
  tourControlsRow: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  } satisfies CSSProperties,
};
