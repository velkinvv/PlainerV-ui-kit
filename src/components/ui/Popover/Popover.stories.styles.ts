import type { CSSProperties } from 'react';
import { lightTheme } from '@/themes/themes';

export const popoverStoriesStyles = {
  maxWidth280: {
    maxWidth: 280,
  } satisfies CSSProperties,
  variantsWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 24,
    alignItems: 'flex-start',
  } satisfies CSSProperties,
  width220: {
    width: 220,
  } satisfies CSSProperties,
  controlledStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    alignItems: 'flex-start',
  } satisfies CSSProperties,
  width260: {
    width: 260,
  } satisfies CSSProperties,
  scrollableList: {
    margin: 0,
    paddingLeft: 18,
  } satisfies CSSProperties,
  inlineCard: {
    padding: 24,
    border: `1px dashed color-mix(in srgb, ${lightTheme.colors.text} 20%, transparent)`,
    borderRadius: 12,
    maxWidth: 400,
  } satisfies CSSProperties,
  paragraphNoTopMargin: {
    marginTop: 0,
  } satisfies CSSProperties,
  width240: {
    width: 240,
  } satisfies CSSProperties,
};
