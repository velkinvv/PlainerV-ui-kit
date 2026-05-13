import type { CSSProperties } from 'react';

export const dividerStoriesStyles = {
  width300: {
    width: '300px',
  } satisfies CSSProperties,
  verticalWithContentContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    height: '100px',
  } satisfies CSSProperties,
  allSizesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '300px',
  } satisfies CSSProperties,
  captionSmall: {
    marginBottom: '8px',
    fontSize: '12px',
  } satisfies CSSProperties,
  captionMedium: {
    marginBottom: '8px',
    fontSize: '14px',
  } satisfies CSSProperties,
  captionLarge: {
    marginBottom: '8px',
    fontSize: '16px',
  } satisfies CSSProperties,
  allOrientationsRoot: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
  } satisfies CSSProperties,
  horizontalSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '200px',
  } satisfies CSSProperties,
  verticalSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    height: '100px',
  } satisfies CSSProperties,
  verticalRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  } satisfies CSSProperties,
  listReset: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  } satisfies CSSProperties,
  listItem: {
    padding: '12px 0',
  } satisfies CSSProperties,
};
