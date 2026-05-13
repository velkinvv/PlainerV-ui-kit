import type { CSSProperties } from 'react';
import { lightTheme } from '@/themes/themes';
import { inputFieldStoriesStyles } from '@/handlers/inputFieldStories.styles';

/**
 * Стили для историй `Input` в Storybook: общие паттерны из `inputFieldStoriesStyles` и специфичные для демо-форм.
 */
export const inputStoriesStyles = {
  ...inputFieldStoriesStyles,

  /** Вторичная кнопка «Очистить» в интерактивных примерах форм (не основной CTA). */
  formResetButton: {
    padding: '8px 16px',
    marginTop: '12px',
    border: `1px solid ${lightTheme.colors.borderSecondary}`,
    borderRadius: '4px',
    background: lightTheme.colors.backgroundSecondary,
    cursor: 'pointer',
  } satisfies CSSProperties,

  /** Заголовок секции в сравнении форм пароля (регистрация — токен успеха). */
  sectionTitleRegistration: {
    marginBottom: '16px',
    color: lightTheme.colors.success,
  } satisfies CSSProperties,

  /** Заголовок секции в сравнении форм пароля (вход — основной акцент). */
  sectionTitleLogin: {
    marginBottom: '16px',
    color: lightTheme.colors.primary,
  } satisfies CSSProperties,

  /** Заголовок блока демо autocomplete без цветового акцента. */
  autocompleteDemoHeading: {
    marginBottom: '8px',
  } satisfies CSSProperties,
};
