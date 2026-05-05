import type { CSSProperties } from 'react';
import type { ThemeType } from '@/types/theme';

export const sidemenuStoriesStyles = {
  edgeAttachedPageRoot: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    margin: 0,
  } satisfies CSSProperties,
  edgeAttachedStatus: {
    margin: '12px 16px',
    fontSize: 13,
    fontFamily: 'system-ui, sans-serif',
  } satisfies CSSProperties,
  edgeAttachedStatusMuted: {
    opacity: 0.75,
  } satisfies CSSProperties,
  edgeAttachedContentRow: {
    display: 'flex',
    flex: 1,
    minHeight: 0,
    alignItems: 'stretch',
  } satisfies CSSProperties,
  edgeAttachedMain: {
    flex: 1,
    padding: 24,
    fontFamily: 'system-ui, sans-serif',
    fontSize: 14,
  } satisfies CSSProperties,
  interactiveRoot: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
  } satisfies CSSProperties,
  interactiveControlsPanel: {
    padding: '20px',
    borderRadius: '8px',
    minWidth: '200px',
  } satisfies CSSProperties,
  interactiveCheckboxWrap: {
    marginBottom: '16px',
  } satisfies CSSProperties,
  interactiveHelperText: {
    margin: 0,
    fontSize: 14,
  } satisfies CSSProperties,
  offScreenSurface: {
    position: 'relative',
    minHeight: '100vh',
    paddingLeft: 120,
    paddingTop: 24,
    boxSizing: 'border-box',
  } satisfies CSSProperties,
  offScreenSummary: {
    margin: 0,
    maxWidth: 560,
  } satisfies CSSProperties,
  customToggleButton: {
    padding: '6px 8px',
    borderRadius: 8,
    cursor: 'pointer',
    font: 'inherit',
    fontSize: 12,
    maxWidth: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } satisfies CSSProperties,
};

export const createSidemenuStoryThemeStyles = (theme: ThemeType) => ({
  edgeAttachedPageRoot: {
    background: theme.colors.backgroundTertiary,
  } satisfies CSSProperties,
  edgeAttachedMain: {
    background: theme.colors.backgroundSecondary,
  } satisfies CSSProperties,
  interactiveControlsPanel: {
    background: theme.colors.backgroundSecondary,
  } satisfies CSSProperties,
  offScreenSurface: {
    background: theme.colors.backgroundTertiary,
  } satisfies CSSProperties,
  customToggleButton: {
    border: `1px solid ${theme.colors.border}`,
    background: theme.colors.backgroundSecondary,
    color: theme.colors.text,
  } satisfies CSSProperties,
});
