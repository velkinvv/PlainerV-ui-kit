import type { CSSProperties } from 'react';

/** Стили декораторов сторис Carousel */
export const carouselStoriesStyles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    maxWidth: '720px',
  } satisfies CSSProperties,

  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
  } satisfies CSSProperties,

  hint: {
    margin: 0,
    fontSize: '13px',
    color: 'var(--storybook-text-secondary, #757575)',
    lineHeight: 1.45,
  } satisfies CSSProperties,

  statusPanel: {
    margin: 0,
    padding: '10px 12px',
    fontSize: '13px',
    lineHeight: 1.45,
    borderRadius: '8px',
    background: 'rgba(127, 127, 127, 0.12)',
  } satisfies CSSProperties,

  narrowShell: {
    width: '360px',
    maxWidth: '100%',
  } satisfies CSSProperties,

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px',
    width: '100%',
  } satisfies CSSProperties,

  gridItemTitle: {
    margin: '0 0 8px',
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--storybook-text-secondary, #757575)',
  } satisfies CSSProperties,

  glassDemoCanvas: {
    padding: '24px',
    borderRadius: '12px',
    minHeight: '320px',
    boxSizing: 'border-box',
  } satisfies CSSProperties,

  overlayDemoButton: {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  } satisfies CSSProperties,
} as const;
