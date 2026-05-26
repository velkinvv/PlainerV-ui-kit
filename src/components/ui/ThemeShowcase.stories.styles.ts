import type { CSSProperties } from 'react';

/**
 * Внешние отступы и сетки для полноэкранного обзора темы в Storybook.
 * Фон страницы задаётся в {@link ThemeShowcasePage} через `useTheme()`.
 */
export const themeShowcaseStoriesStyles = {
  pageShell: {
    padding: '40px',
    minHeight: '100vh',
    boxSizing: 'border-box',
  } satisfies CSSProperties,

  contentShell: {
    maxWidth: '1200px',
    margin: '0 auto',
  } satisfies CSSProperties,

  pageHeading: {
    marginBottom: '40px',
    textAlign: 'center',
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

  /** Вертикальные группы: Tag, Badge, Avatar */
  badgeAvatarSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
  } satisfies CSSProperties,

  badgeAvatarGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
  } satisfies CSSProperties,

  badgeAvatarGroupLabel: {
    fontSize: '12px',
    lineHeight: 1.4,
    opacity: 0.72,
    fontWeight: 500,
  } satisfies CSSProperties,

  badgeAvatarRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
    width: '100%',
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

  /** Панель контента вкладки в Theme Showcase */
  showcasePanelContent: {
    padding: '12px 4px 4px',
    fontSize: '14px',
    lineHeight: 1.5,
  } satisfies CSSProperties,

  /** Абзац внутри Accordion.Content */
  showcaseAccordionParagraph: {
    margin: 0,
    fontSize: '14px',
    lineHeight: 1.5,
  } satisfies CSSProperties,

  calendarWrap: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  } satisfies CSSProperties,

  popoverPanel: {
    padding: '12px',
    fontSize: '14px',
    lineHeight: 1.5,
  } satisfies CSSProperties,

  overlayActionsSection: {
    marginTop: '40px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'center',
  } satisfies CSSProperties,
};
