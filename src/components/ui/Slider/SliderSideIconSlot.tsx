import React from 'react';
import type { SliderSideIconsWhenDisabled } from '../../../types/ui';
import {
  isSliderSideIconButtonDisabled,
  resolveSliderSideIconAriaLabel,
  resolveSliderSideIconVisibility,
  shouldWrapSliderSideIconAsButton,
  type SliderSideIconSide,
} from './sliderSideIconHandlers';
import { SliderSideIconButton, SliderSideIconStatic } from './Slider.style';

/**
 * Пропсы бокового слота иконки у трека слайдера.
 * @property side - Сторона слота (`left` | `right`)
 * @property icon - Контент слота
 * @property onClick - Клик; при наличии слот — кнопка
 * @property disabled - Слайдер отключён
 * @property sideIconsWhenDisabled - Режим при disabled
 * @property ariaLabel - Явный aria-label кнопки
 */
export type SliderSideIconSlotProps = {
  side: SliderSideIconSide;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  sideIconsWhenDisabled?: SliderSideIconsWhenDisabled;
  ariaLabel?: string;
};

/**
 * Боковая иконка слева/справа от трека: raw node или кнопка с `onClick`.
 * @param props - См. {@link SliderSideIconSlotProps}
 */
export const SliderSideIconSlot: React.FC<SliderSideIconSlotProps> = ({
  side,
  icon,
  onClick,
  disabled = false,
  sideIconsWhenDisabled = 'disable',
  ariaLabel,
}) => {
  const visibility = resolveSliderSideIconVisibility({
    disabled,
    sideIconsWhenDisabled,
    hasIcon: Boolean(icon),
  });

  if (visibility === 'hide' || icon == null) {
    return null;
  }

  const wrapAsButton = shouldWrapSliderSideIconAsButton(onClick);
  const buttonDisabled = isSliderSideIconButtonDisabled({
    disabled,
    sideIconsWhenDisabled,
    wrappedAsButton: wrapAsButton,
  });

  if (wrapAsButton) {
    return (
      <SliderSideIconButton
        $disabled={buttonDisabled}
        disabled={buttonDisabled}
        aria-label={resolveSliderSideIconAriaLabel({ side, ariaLabel })}
        onClick={onClick}
      >
        {icon}
      </SliderSideIconButton>
    );
  }

  return <SliderSideIconStatic>{icon}</SliderSideIconStatic>;
};

SliderSideIconSlot.displayName = 'SliderSideIconSlot';
