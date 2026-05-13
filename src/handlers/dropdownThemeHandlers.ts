import type { Size } from '../types/sizes';
import type { DropdownTheme } from '../types/theme';

/**
 * Получить размер dropdown
 * @param theme - тема dropdown
 * @param size - размер
 * @returns объект с размерами для указанного размера
 */
export const getDropdownSize = (theme: DropdownTheme, size: Size) => {
  return theme.sizes[size];
};

/**
 * Получить вариант dropdown
 * @param theme - тема dropdown
 * @param variant - вариант (default, elevated, outlined)
 * @returns объект с стилями для указанного варианта
 */
export const getDropdownVariant = (
  theme: DropdownTheme,
  variant: 'default' | 'elevated' | 'outlined' = 'default',
) => {
  return theme.variants[variant];
};

/**
 * Получить состояние dropdown
 * @param theme - тема dropdown
 * @param state - состояние (hover, active, disabled, selected, focus)
 * @returns объект с стилями для указанного состояния
 */
export const getDropdownState = (
  theme: DropdownTheme,
  state: 'hover' | 'active' | 'disabled' | 'selected' | 'focus',
) => {
  return theme.states[state];
};

/**
 * Получить анимации dropdown
 * @param theme - тема dropdown
 * @returns объект с настройками анимаций
 */
export const getDropdownAnimations = (theme: DropdownTheme) => {
  return theme.animations;
};

/**
 * Получить настройки dropdown
 * @param theme - тема dropdown
 * @returns объект с дополнительными настройками
 */
export const getDropdownSettings = (theme: DropdownTheme) => {
  return theme.settings;
};

/**
 * Получить стили для открытия dropdown
 * @param theme - тема dropdown
 * @returns CSS стили для анимации открытия
 */
export const getDropdownOpenStyles = (theme: DropdownTheme) => {
  const { openAnimation } = theme.animations;
  return {
    transform: openAnimation.transform,
    transition: `${openAnimation.duration} ${openAnimation.easing}`,
  };
};

/**
 * Получить стили для закрытия dropdown
 * @param theme - тема dropdown
 * @returns CSS стили для анимации закрытия
 */
export const getDropdownCloseStyles = (theme: DropdownTheme) => {
  const { closeAnimation } = theme.animations;
  return {
    transform: closeAnimation.transform,
    transition: `${closeAnimation.duration} ${closeAnimation.easing}`,
  };
};

/**
 * Получить стили для элемента dropdown
 * @param theme - тема dropdown
 * @param size - размер
 * @param state - состояние элемента
 * @returns объект с CSS стилями для элемента
 */
export const getDropdownItemStyles = (
  theme: DropdownTheme,
  size: Size,
  state?: 'hover' | 'active' | 'disabled' | 'selected' | 'focus',
) => {
  const sizeStyles = getDropdownSize(theme, size);
  const stateStyles = state ? getDropdownState(theme, state) : {};

  // Используем fontWeight из состояния, если он есть, иначе из настроек
  const fontWeight =
    stateStyles && 'fontWeight' in stateStyles ? stateStyles.fontWeight : theme.settings.fontWeight;

  return {
    ...sizeStyles,
    ...stateStyles,
    transition: theme.animations.transition,
    fontFamily: theme.settings.fontFamily,
    fontWeight,
    lineHeight: theme.settings.lineHeight,
    textAlign: theme.settings.textAlign,
    userSelect: theme.settings.userSelect,
    whiteSpace: theme.settings.whiteSpace,
    cursor: state === 'disabled' ? theme.settings.cursor.disabled : theme.settings.cursor.default,
  };
};

/**
 * Получить стили для контейнера dropdown
 * @param theme - тема dropdown
 * @param size - размер
 * @param variant - вариант
 * @returns объект с CSS стилями для контейнера
 */
export const getDropdownContainerStyles = (
  theme: DropdownTheme,
  size: Size,
  variant: 'default' | 'elevated' | 'outlined' = 'default',
) => {
  const sizeStyles = getDropdownSize(theme, size);
  const variantStyles = getDropdownVariant(theme, variant);

  return {
    ...sizeStyles,
    ...variantStyles,
    zIndex: theme.settings.zIndex,
    backdropFilter: theme.settings.backdropFilter,
    fontFamily: theme.settings.fontFamily,
    fontWeight: theme.settings.fontWeight,
    lineHeight: theme.settings.lineHeight,
    textAlign: theme.settings.textAlign,
    userSelect: theme.settings.userSelect,
    whiteSpace: theme.settings.whiteSpace,
  };
};
