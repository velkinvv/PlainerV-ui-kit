import type { CSSProperties } from 'react';
import { lightTheme } from '@/themes/themes';

/**
 * Общие CSS-объекты для storybook-историй полей ввода даты/времени (верстка демо, инфо-блоки, нативные кнопки).
 * Токены из `lightTheme.colors`, без хардкода hex.
 */
export const inputFieldStoriesStyles = {
  maxWidth420: {
    maxWidth: 420,
  } satisfies CSSProperties,

  maxWidth500: {
    maxWidth: '500px',
  } satisfies CSSProperties,

  maxWidth360: {
    maxWidth: 360,
  } satisfies CSSProperties,

  maxWidth400: {
    maxWidth: 400,
  } satisfies CSSProperties,

  maxWidth440: {
    maxWidth: 440,
  } satisfies CSSProperties,

  maxWidth460: {
    maxWidth: 460,
  } satisfies CSSProperties,

  maxWidth480: {
    maxWidth: 480,
  } satisfies CSSProperties,

  /** Вертикальный стек с шагом 24px и max-width 480px (демо нескольких полей подряд). */
  columnGap24MaxWidth480: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '480px',
  } satisfies CSSProperties,

  marginTop12: {
    marginTop: '12px',
  } satisfies CSSProperties,

  /** Подпись к демо-секции (мелкий текст вторичного цвета). */
  storyCaption13Secondary: {
    margin: '0 0 8px 0',
    fontSize: '13px',
    color: lightTheme.colors.textSecondary,
  } satisfies CSSProperties,

  /** Блок с JSON/debug выводом под полем. */
  storyPreviewPreJson: {
    marginTop: '12px',
    padding: '12px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    borderRadius: '8px',
    fontSize: '12px',
    overflow: 'auto',
  } satisfies CSSProperties,

  /** Компактный лог событий (ленивая подгрузка и т.п.). */
  storyEventLogPre: {
    marginTop: '12px',
    fontSize: '11px',
    lineHeight: 1.4,
    maxHeight: 120,
    overflow: 'auto',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    padding: '8px',
    borderRadius: '8px',
  } satisfies CSSProperties,

  columnGap16: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  } satisfies CSSProperties,

  columnGap16Width400: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '400px',
  } satisfies CSSProperties,

  columnGap16Width600: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '600px',
  } satisfies CSSProperties,

  columnGap24: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  } satisfies CSSProperties,

  columnGap32: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  } satisfies CSSProperties,

  /** Вертикальный стек с шагом 24px и ограничением ширины (сравнение режимов ввода и т.п.). */
  columnGap24Width400: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '400px',
  } satisfies CSSProperties,

  rowGap8Centered: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    alignItems: 'center',
  } satisfies CSSProperties,

  /** Горизонтальный ряд с выравниванием по центру по поперечной оси (иконка + текст в тултипе). */
  rowAlignCenterGap8: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  } satisfies CSSProperties,

  /** Горизонтальный ряд с переносом и шагом 8px (группа кнопок у формы). */
  rowWrapGap8: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  } satisfies CSSProperties,

  infoBox: {
    padding: '12px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    borderRadius: '4px',
  } satisfies CSSProperties,

  infoBoxWithTopMargin: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    borderRadius: '4px',
  } satisfies CSSProperties,

  titleMarginBottom20: {
    marginBottom: '20px',
  } satisfies CSSProperties,

  smallNoteText: {
    fontSize: '12px',
    color: lightTheme.colors.textSecondary,
  } satisfies CSSProperties,

  extraSmallNoteText: {
    fontSize: '11px',
    color: lightTheme.colors.textTertiary,
  } satisfies CSSProperties,

  centerText: {
    textAlign: 'center',
  } satisfies CSSProperties,

  smallNoteTextCentered: {
    fontSize: '12px',
    color: lightTheme.colors.textSecondary,
    textAlign: 'center',
  } satisfies CSSProperties,

  heading14: {
    margin: '0 0 8px 0',
    fontSize: '14px',
  } satisfies CSSProperties,

  list12: {
    margin: 0,
    paddingLeft: '20px',
    fontSize: '12px',
  } satisfies CSSProperties,

  paragraph11Muted: {
    margin: '8px 0 0 0',
    fontSize: '11px',
    color: lightTheme.colors.textSecondary,
  } satisfies CSSProperties,

  actionButtonCompact: {
    padding: '4px 8px',
    fontSize: '12px',
    border: `1px solid ${lightTheme.colors.borderSecondary}`,
    borderRadius: '4px',
    background: lightTheme.colors.backgroundSecondary,
    cursor: 'pointer',
  } satisfies CSSProperties,

  actionButtonMedium: {
    padding: '8px 16px',
    border: `1px solid ${lightTheme.colors.borderSecondary}`,
    borderRadius: '4px',
    background: lightTheme.colors.backgroundSecondary,
    cursor: 'pointer',
  } satisfies CSSProperties,

  submitButtonPrimary: {
    padding: '12px 24px',
    backgroundColor: lightTheme.colors.primary,
    color: lightTheme.colors.backgroundSecondary,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  } satisfies CSSProperties,

  /** Кнопка отправки формы в сторис: primary + отступ сверху от поля. */
  submitButtonPrimaryMarginTop12: {
    padding: '12px 24px',
    marginTop: '12px',
    backgroundColor: lightTheme.colors.primary,
    color: lightTheme.colors.backgroundSecondary,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  } satisfies CSSProperties,

  /** Заголовок в кастомной панели календаря/оверлея (не путать с UI Heading компонента). */
  panelTitleBold: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '4px',
  } satisfies CSSProperties,
};
