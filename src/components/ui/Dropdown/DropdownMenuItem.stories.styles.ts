import type { CSSProperties } from 'react';
import type { ThemeType } from '@/types/theme';

export const dropdownMenuItemStoriesStyles = {
  menuDecoratorRoot: {
    maxWidth: 320,
  } satisfies CSSProperties,
  customContentRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  } satisfies CSSProperties,
  customContentColumn: {
    display: 'flex',
    flexDirection: 'column',
  } satisfies CSSProperties,
  customContentTitle: {
    fontWeight: 600,
  } satisfies CSSProperties,
  customContentMeta: {
    fontSize: 12,
  } satisfies CSSProperties,
};

export const createDropdownMenuItemStoryThemeStyles = (theme: ThemeType) => ({
  customContentMeta: {
    color: theme.colors.textSecondary,
  } satisfies CSSProperties,
});
