import type { MouseEvent } from 'react';
import type { SliderSideIconsWhenDisabled } from '../../../types/ui';

export type SliderSideIconSide = 'left' | 'right';

export type SliderSideIconVisibility = 'show' | 'hide';

/**
 * Нужно ли показывать боковой слот иконки.
 * @param options.disabled - Слайдер отключён
 * @param options.sideIconsWhenDisabled - Режим при disabled (`disable` | `hide`)
 * @param options.hasIcon - Есть ли контент слота
 */
export const resolveSliderSideIconVisibility = (options: {
  disabled?: boolean;
  sideIconsWhenDisabled?: SliderSideIconsWhenDisabled;
  hasIcon?: boolean;
}): SliderSideIconVisibility => {
  if (!options?.hasIcon) {
    return 'hide';
  }
  if (options?.disabled && options?.sideIconsWhenDisabled === 'hide') {
    return 'hide';
  }
  return 'show';
};

/**
 * Нужно ли оборачивать слот в кнопку (есть обработчик клика).
 * @param onClick - Колбэк клика или undefined
 */
export const shouldWrapSliderSideIconAsButton = (
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void,
): boolean => typeof onClick === 'function';

/**
 * aria-label для кнопки бокового слота.
 * @param options.side - Сторона слота
 * @param options.ariaLabel - Явный label; иначе дефолт по стороне
 */
export const resolveSliderSideIconAriaLabel = (options: {
  side: SliderSideIconSide;
  ariaLabel?: string;
}): string => {
  if (options?.ariaLabel) {
    return options.ariaLabel;
  }
  return options?.side === 'right' ? 'Действие справа' : 'Действие слева';
};

/**
 * Кнопка слота disabled, когда слайдер disabled и режим `'disable'`.
 * @param options.disabled - Слайдер отключён
 * @param options.sideIconsWhenDisabled - Режим при disabled
 * @param options.wrappedAsButton - Слот обёрнут в кнопку
 */
export const isSliderSideIconButtonDisabled = (options: {
  disabled?: boolean;
  sideIconsWhenDisabled?: SliderSideIconsWhenDisabled;
  wrappedAsButton?: boolean;
}): boolean => {
  if (!options?.wrappedAsButton) {
    return false;
  }
  if (!options?.disabled) {
    return false;
  }
  return (options?.sideIconsWhenDisabled ?? 'disable') === 'disable';
};
