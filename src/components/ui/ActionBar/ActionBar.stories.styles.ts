import type { CSSProperties } from 'react';

/** Стили декораторов сторис ActionBar */
export const actionBarStoriesStyles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    maxWidth: '760px',
  } satisfies CSSProperties,

  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
  } satisfies CSSProperties,

  sectionTitle: {
    margin: 0,
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--storybook-text-primary, inherit)',
  } satisfies CSSProperties,

  hint: {
    margin: 0,
    fontSize: '13px',
    color: 'var(--storybook-text-secondary, #757575)',
    lineHeight: 1.45,
  } satisfies CSSProperties,

  resizableShell: {
    resize: 'horizontal',
    overflow: 'auto',
    width: '100%',
    minWidth: '160px',
    maxWidth: '100%',
    padding: '10px 12px',
    border: '1px dashed rgba(127, 127, 127, 0.35)',
    borderRadius: '8px',
    boxSizing: 'border-box',
  } satisfies CSSProperties,

  narrowShell: {
    width: '220px',
    maxWidth: '100%',
    padding: '8px 0',
    boxSizing: 'border-box',
  } satisfies CSSProperties,

  statusPanel: {
    margin: 0,
    padding: '10px 12px',
    fontSize: '13px',
    lineHeight: 1.45,
    borderRadius: '8px',
    background: 'rgba(127, 127, 127, 0.12)',
  } satisfies CSSProperties,

  sizeRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
  } satisfies CSSProperties,

  sizeLabel: {
    margin: 0,
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--storybook-text-secondary, #757575)',
  } satisfies CSSProperties,
} as const;
