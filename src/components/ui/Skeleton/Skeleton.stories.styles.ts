import type { CSSProperties } from 'react';

export const skeletonStoriesStyles = {
  decoratorPadding24: {
    padding: 24,
  } satisfies CSSProperties,
  panelColumn24Width320: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    width: 320,
  } satisfies CSSProperties,
  panelColumn16Width320: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: 320,
  } satisfies CSSProperties,
  headingMarginBottom8: {
    marginBottom: 8,
  } satisfies CSSProperties,
  rowAlignCenterGap12: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  } satisfies CSSProperties,
  complexRoot: {
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  } satisfies CSSProperties,
  rowAlignCenterGap16: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  } satisfies CSSProperties,
  flexibleColumnGap8: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  } satisfies CSSProperties,
  rowEndGap12: {
    display: 'flex',
    gap: 12,
    justifyContent: 'flex-end',
  } satisfies CSSProperties,
};
