import type { ButtonTheme } from '../types/theme';
import { Size } from '../types/sizes';
import { ButtonVariant } from '../types/ui';
import { lightButtonTheme } from '../themes/buttons/light';

/**
 * Хендлеры для работы с темой кнопок
 * Предоставляют удобные функции для получения стилей из темы
 */

/**
 * Получает размеры кнопки из темы
 * @param theme - тема кнопок
 * @param size - размер кнопки (`Size` или строка из сторис, например `sm`)
 */
const resolveButtonTheme = (theme: ButtonTheme | undefined): ButtonTheme => {
  return theme ?? lightButtonTheme;
};

/**
 * Получает размеры кнопки из темы
 * @param theme - тема кнопок
 * @param size - размер кнопки (`Size` или строка из сторис, например `sm`)
 */
export const getButtonSize = (
  theme: ButtonTheme | undefined,
  size: Size | string,
): ButtonTheme['sizes'][Size] => {
  const resolvedTheme = resolveButtonTheme(theme);
  const fallbackSize = Size.MD;
  const buttonSizes = resolvedTheme.sizes;

  if (typeof size !== 'string' || size.length === 0) {
    return buttonSizes[fallbackSize];
  }

  const normalizedSizeKey = size.toUpperCase() as keyof typeof Size;
  const resolvedSize = Size[normalizedSizeKey] ?? fallbackSize;
  return buttonSizes[resolvedSize] ?? buttonSizes[fallbackSize];
};

/**
 * Получает стили варианта кнопки из темы
 * @param theme - тема кнопок
 * @param variant - вариант кнопки (`ButtonVariant` или строка из сторис, например `outlined`)
 */
const resolveButtonVariant = (variant: ButtonVariant | string): ButtonVariant => {
  const fallbackVariant = ButtonVariant.PRIMARY;

  if (typeof variant !== 'string' || variant.length === 0) {
    return fallbackVariant;
  }

  const normalizedVariant = variant.toLowerCase();
  const legacyVariantAliases: Record<string, ButtonVariant> = {
    outlined: ButtonVariant.OUTLINE,
  };

  if (legacyVariantAliases[normalizedVariant]) {
    return legacyVariantAliases[normalizedVariant];
  }

  const resolvedVariant = Object.values(ButtonVariant).find(
    (buttonVariantValue) => buttonVariantValue === normalizedVariant,
  );

  return resolvedVariant ?? fallbackVariant;
};

export const getButtonVariant = (
  theme: ButtonTheme | undefined,
  variant: ButtonVariant | string,
): ButtonTheme['variants'][ButtonVariant] => {
  const resolvedTheme = resolveButtonTheme(theme);
  const resolvedVariant = resolveButtonVariant(variant);
  const buttonVariants = resolvedTheme.variants;

  return buttonVariants[resolvedVariant] ?? buttonVariants[ButtonVariant.PRIMARY];
};

/**
 * Получает анимации кнопки из темы
 */
export const getButtonAnimations = (theme: ButtonTheme | undefined): ButtonTheme['animations'] => {
  return resolveButtonTheme(theme).animations;
};

/**
 * Получает настройки кнопки из темы
 */
export const getButtonSettings = (theme: ButtonTheme | undefined): ButtonTheme['settings'] => {
  return resolveButtonTheme(theme).settings;
};

/**
 * Получает стили для состояния disabled
 */
export const getButtonDisabledStyles = (
  theme: ButtonTheme | undefined,
  variant: ButtonVariant | string,
): ButtonTheme['variants'][ButtonVariant]['disabled'] => {
  const variantStyles = getButtonVariant(theme, variant);
  return variantStyles.disabled;
};

/**
 * Получает стили для состояния hover
 */
export const getButtonHoverStyles = (
  theme: ButtonTheme | undefined,
  variant: ButtonVariant | string,
): ButtonTheme['variants'][ButtonVariant]['hover'] => {
  const variantStyles = getButtonVariant(theme, variant);
  return variantStyles.hover;
};

/**
 * Получает стили для состояния active
 */
export const getButtonActiveStyles = (
  theme: ButtonTheme | undefined,
  variant: ButtonVariant | string,
): ButtonTheme['variants'][ButtonVariant]['active'] => {
  const variantStyles = getButtonVariant(theme, variant);
  return variantStyles.active;
};

/**
 * Получает стили для состояния focus
 */
export const getButtonFocusStyles = (
  theme: ButtonTheme | undefined,
  variant: ButtonVariant | string,
): ButtonTheme['variants'][ButtonVariant]['focus'] => {
  const variantStyles = getButtonVariant(theme, variant);
  return variantStyles.focus;
};
