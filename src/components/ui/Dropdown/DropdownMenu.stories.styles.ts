import type { CSSProperties } from 'react';
import type { ThemeType } from '@/types/theme';

export const dropdownMenuStoriesStyles = {
  storyDecoratorRoot: {
    maxWidth: 320,
  } satisfies CSSProperties,
  customContentColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  } satisfies CSSProperties,
  customContentTitle: {
    fontWeight: 600,
  } satisfies CSSProperties,
  customContentMeta: {
    fontSize: 12,
  } satisfies CSSProperties,
  customContentRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  } satisfies CSSProperties,
};

export const createDropdownMenuStoryThemeStyles = (theme: ThemeType) => ({
  customContentMeta: {
    color: theme.colors.textSecondary,
  } satisfies CSSProperties,
});
