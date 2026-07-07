import type { CSSProperties } from 'react';

/** Стили для сторис `DateTimeInput` */
export const dateTimeInputStoriesStyles = {
  storyStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '420px',
  } satisfies CSSProperties,

  valuePreview: {
    fontSize: '12px',
    color: '#666',
    marginTop: '8px',
  } satisfies CSSProperties,
} as const;
