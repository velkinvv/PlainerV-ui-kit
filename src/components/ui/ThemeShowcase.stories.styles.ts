import type { CSSProperties } from 'react';
import { darkTheme, lightTheme } from '@/themes/themes';

/**
 * Внешние отступы и сетки для полноэкранного обзора темы в Storybook.
 * Фоны страниц — токены темы вместо хексов в JSX.
 */
export const themeShowcaseStoriesStyles = {
  lightPageShell: {
    padding: '40px',
    background: lightTheme.colors.backgroundTertiary,
    minHeight: '100vh',
  } satisfies CSSProperties,

  darkPageShell: {
    padding: '40px',
    background: darkTheme.colors.background,
    minHeight: '100vh',
  } satisfies CSSProperties,

  contentShell: {
    maxWidth: '1200px',
    margin: '0 auto',
  } satisfies CSSProperties,

  pageHeading: {
    marginBottom: '40px',
    textAlign: 'center',
  } satisfies CSSProperties,

  pageHeadingOnDark: {
    marginBottom: '40px',
    textAlign: 'center',
    color: darkTheme.colors.text,
  } satisfies CSSProperties,

  buttonRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  } satisfies CSSProperties,

  verticalStackGap16: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  } satisfies CSSProperties,

  badgeAvatarRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  } satisfies CSSProperties,

  horizontalGap16Center: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  } satisfies CSSProperties,

  modalActionsRow: {
    marginTop: '20px',
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
  } satisfies CSSProperties,

  modalOpenSection: {
    marginTop: '40px',
    textAlign: 'center',
  } satisfies CSSProperties,
};
