import type { CSSProperties } from 'react';
import type { ThemeType } from '@/types/theme';

export const calendarStoriesStyles = {
  fullWidthStoryRoot: {
    boxSizing: 'border-box',
    width: '100%',
    minHeight: '100vh',
    padding: 24,
  } satisfies CSSProperties,
  darkSurfaceRoot: {
    padding: 24,
    borderRadius: 12,
  } satisfies CSSProperties,
};

export const createCalendarStoryThemeStyles = (theme: ThemeType) => ({
  darkSurfaceRoot: {
    background: theme.colors.background,
  } satisfies CSSProperties,
});
