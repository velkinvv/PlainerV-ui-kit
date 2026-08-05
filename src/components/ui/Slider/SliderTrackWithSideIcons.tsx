import React, { useMemo } from 'react';
import type { SliderSideIconsWhenDisabled } from '../../../types/ui';
import {
  resolveSliderSideIconVisibility,
  type SliderSideIconSide,
} from './sliderSideIconHandlers';
import { SliderSideIconSlot } from './SliderSideIconSlot';
import { SliderTrackSideIconsRow, SliderTrackSideIconsTrack } from './Slider.style';

/**
 * Пропсы ряда трека с опциональными боковыми иконками.
 * @property track - Узел трека (standalone или embedded)
 * @property embedded - Режим `embeddedInInput`
 * @property leftIcon / rightIcon - Слоты
 * @property onLeftIconClick / onRightIconClick - Клики
 * @property disabled - Слайдер отключён
 * @property sideIconsWhenDisabled - Режим при disabled
 * @property leftIconAriaLabel / rightIconAriaLabel - aria-label кнопок
 */
export type SliderTrackWithSideIconsProps = {
  track: React.ReactNode;
  embedded?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftIconClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onRightIconClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  sideIconsWhenDisabled?: SliderSideIconsWhenDisabled;
  leftIconAriaLabel?: string;
  rightIconAriaLabel?: string;
};

/**
 * Оборачивает трек в ряд с боковыми иконками, если хотя бы один слот видим.
 * @param props - См. {@link SliderTrackWithSideIconsProps}
 */
export const SliderTrackWithSideIcons: React.FC<SliderTrackWithSideIconsProps> = ({
  track,
  embedded = false,
  leftIcon,
  rightIcon,
  onLeftIconClick,
  onRightIconClick,
  disabled = false,
  sideIconsWhenDisabled = 'disable',
  leftIconAriaLabel,
  rightIconAriaLabel,
}) => {
  const showLeft = useMemo(
    () =>
      resolveSliderSideIconVisibility({
        disabled,
        sideIconsWhenDisabled,
        hasIcon: Boolean(leftIcon),
      }) === 'show',
    [disabled, leftIcon, sideIconsWhenDisabled],
  );
  const showRight = useMemo(
    () =>
      resolveSliderSideIconVisibility({
        disabled,
        sideIconsWhenDisabled,
        hasIcon: Boolean(rightIcon),
      }) === 'show',
    [disabled, rightIcon, sideIconsWhenDisabled],
  );

  if (!showLeft && !showRight) {
    return <>{track}</>;
  }

  const renderSlot = (side: SliderSideIconSide) => (
    <SliderSideIconSlot
      side={side}
      icon={side === 'left' ? leftIcon : rightIcon}
      onClick={side === 'left' ? onLeftIconClick : onRightIconClick}
      disabled={disabled}
      sideIconsWhenDisabled={sideIconsWhenDisabled}
      ariaLabel={side === 'left' ? leftIconAriaLabel : rightIconAriaLabel}
    />
  );

  return (
    <SliderTrackSideIconsRow $embedded={embedded}>
      {renderSlot('left')}
      <SliderTrackSideIconsTrack>{track}</SliderTrackSideIconsTrack>
      {renderSlot('right')}
    </SliderTrackSideIconsRow>
  );
};

SliderTrackWithSideIcons.displayName = 'SliderTrackWithSideIcons';
