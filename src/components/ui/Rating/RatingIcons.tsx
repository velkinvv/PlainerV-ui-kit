import React, { useCallback } from 'react';
import { Icon } from '../Icon/Icon';
import { IconSize } from '@/types/sizes';
import { getRatingIconSlotFill } from '@/handlers/ratingHandlers';
import type { RatingVisualSlotProps } from './Rating.types';
import {
  RatingIconButton,
  RatingIconLayer,
  RatingItemsList,
  RatingVisuallyHiddenInput,
} from './Rating.style';

const SIZE_TO_ICON: Record<string, IconSize> = {
  XS: IconSize.XS,
  SM: IconSize.SM,
  MD: IconSize.SM,
  LG: IconSize.MD,
  XL: IconSize.MD,
};

/**
 * Вариант Rating: ряд иконок с partial fill.
 * @param props — {@link RatingVisualSlotProps}
 */
export const RatingIcons: React.FC<RatingVisualSlotProps> = ({
  displayValue,
  max,
  precision,
  size,
  readOnly,
  disabled,
  name,
  getLabelText,
  clearable,
  icon,
  emptyIcon,
  fillColor,
  emptyColor,
  onSelect,
  onHover,
}) => {
  const interactive = !readOnly && !disabled;
  const iconSize = SIZE_TO_ICON[size] ?? IconSize.SM;
  const slots = Array.from({ length: max }, (_, index) => index + 1);

  const defaultFilled = icon ?? (
    <Icon name="IconExStar" size={iconSize} color="currentColor" />
  );
  const defaultEmpty = emptyIcon ?? (
    <Icon name="IconExStar" size={iconSize} color="currentColor" />
  );

  const handleSelect = useCallback(
    (stepValue: number) => {
      if (!interactive) {
        return;
      }
      if (clearable && displayValue != null && Math.abs(displayValue - stepValue) < 1e-9) {
        onSelect(null);
        return;
      }
      onSelect(stepValue);
    },
    [clearable, displayValue, interactive, onSelect],
  );

  /**
   * Значения шагов внутри одного слота (целый или половины).
   * @param slotIndex — 1-based индекс иконки
   */
  const stepsForSlot = (slotIndex: number): number[] => {
    if (precision >= 1) {
      return [slotIndex];
    }
    const halfStep = slotIndex - precision;
    if (halfStep > 0) {
      return [Number(halfStep.toFixed(6)), slotIndex];
    }
    return [slotIndex];
  };

  return (
    <RatingItemsList
      $size={size}
      role={interactive ? 'radiogroup' : undefined}
      aria-label={interactive ? 'Рейтинг' : undefined}
    >
      {slots.map((slotIndex) => {
        const fill = getRatingIconSlotFill(displayValue, slotIndex);
        const slotSteps = stepsForSlot(slotIndex);

        return (
          <RatingIconButton
            key={`slot-${slotIndex}`}
            $size={size}
            $interactive={interactive}
            onMouseLeave={() => {
              if (interactive) {
                onHover(null);
              }
            }}
          >
            <RatingIconLayer $fillPercent={100} $color={emptyColor} aria-hidden>
              {defaultEmpty}
            </RatingIconLayer>
            {fill > 0 ? (
              <RatingIconLayer $fillPercent={fill * 100} $color={fillColor} $clipped aria-hidden>
                {defaultFilled}
              </RatingIconLayer>
            ) : null}

            {interactive
              ? slotSteps.map((stepValue, stepIndex) => (
                  <label
                    key={stepValue}
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: `${(stepIndex / slotSteps.length) * 100}%`,
                      width: `${100 / slotSteps.length}%`,
                      margin: 0,
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => onHover(stepValue)}
                  >
                    <RatingVisuallyHiddenInput
                      type="radio"
                      name={name}
                      value={stepValue}
                      checked={
                        displayValue != null && Math.abs(displayValue - stepValue) < 1e-9
                      }
                      onChange={() => handleSelect(stepValue)}
                      onClick={(event) => {
                        if (
                          clearable &&
                          displayValue != null &&
                          Math.abs(displayValue - stepValue) < 1e-9
                        ) {
                          event.preventDefault();
                          handleSelect(stepValue);
                        }
                      }}
                      aria-label={getLabelText(stepValue)}
                    />
                  </label>
                ))
              : null}
          </RatingIconButton>
        );
      })}
    </RatingItemsList>
  );
};
