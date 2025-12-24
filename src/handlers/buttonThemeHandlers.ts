import type { ButtonTheme } from '../types/theme';
import type { Size } from '../types/sizes';
import type { ButtonVariant } from '../types/ui';

/**
 * Хендлеры для работы с темой кнопок
 * Предоставляют удобные функции для получения стилей из темы
 */

/**
 * Получает размеры кнопки из темы
 */
export const getButtonSize = (theme: ButtonTheme, size: Size) => {
  return theme.sizes[size];
};

/**
 * Получает стили варианта кнопки из темы
 */
export const getButtonVariant = (theme: ButtonTheme, variant: ButtonVariant) => {
  return theme.variants[variant];
};

/**
 * Получает анимации кнопки из темы
 */
export const getButtonAnimations = (theme: ButtonTheme) => {
  return theme.animations;
};

/**
 * Получает настройки кнопки из темы
 */
export const getButtonSettings = (theme: ButtonTheme) => {
  return theme.settings;
};

/**
 * Получает стили для состояния disabled
 */
export const getButtonDisabledStyles = (theme: ButtonTheme, variant: ButtonVariant) => {
  const variantStyles = theme.variants[variant];
  return variantStyles.disabled;
};

/**
 * Получает стили для состояния hover
 */
export const getButtonHoverStyles = (theme: ButtonTheme, variant: ButtonVariant) => {
  const variantStyles = theme.variants[variant];
  return variantStyles.hover;
};

/**
 * Получает стили для состояния active
 */
export const getButtonActiveStyles = (theme: ButtonTheme, variant: ButtonVariant) => {
  const variantStyles = theme.variants[variant];
  return variantStyles.active;
};

/**
 * Получает стили для состояния focus
 */
export const getButtonFocusStyles = (theme: ButtonTheme, variant: ButtonVariant) => {
  const variantStyles = theme.variants[variant];
  return variantStyles.focus;
};
