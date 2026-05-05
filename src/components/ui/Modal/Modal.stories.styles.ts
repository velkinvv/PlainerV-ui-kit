import type { CSSProperties } from 'react';
import { lightTheme } from '@/themes/themes';

export const modalStoriesStyles = {
  lifecycleRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    maxWidth: 760,
  } satisfies CSSProperties,
  paragraphNoMargin: {
    margin: 0,
  } satisfies CSSProperties,
  controlsRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  } satisfies CSSProperties,
  mutedParagraph: {
    margin: 0,
    color: lightTheme.colors.textSecondary,
  } satisfies CSSProperties,
  overlayBorderStyle: {
    border: `2px solid color-mix(in srgb, ${lightTheme.colors.backgroundSecondary} 45%, transparent)`,
  } satisfies CSSProperties,
  customOverlayCss: `
    background: color-mix(in srgb, ${lightTheme.colors.background} 82%, transparent);
    backdrop-filter: blur(12px);
    padding: 48px;
  `,
};
