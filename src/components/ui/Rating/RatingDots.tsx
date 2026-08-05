import React, { useCallback } from 'react';
import type { RatingVisualSlotProps } from './Rating.types';
import { RatingDot, RatingItemsList, RatingVisuallyHiddenInput } from './Rating.style';

/**
 * Вариант Rating: точки/сегменты.
 * @param props — {@link RatingVisualSlotProps}
 */
export const RatingDots: React.FC<RatingVisualSlotProps> = ({
  displayValue,
  max,
  size,
  readOnly,
  disabled,
  name,
  getLabelText,
  clearable,
  fillColor,
  emptyColor,
  onSelect,
  onHover,
}) => {
  const interactive = !readOnly && !disabled;
  const slots = Array.from({ length: max }, (_, index) => index + 1);

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

  return (
    <RatingItemsList
      $size={size}
      role={interactive ? 'radiogroup' : undefined}
      aria-label={interactive ? 'Рейтинг' : undefined}
    >
      {slots.map((slotIndex) => {
        const isActive = displayValue != null && slotIndex <= displayValue + 1e-9;
        return (
          <RatingDot
            key={slotIndex}
            $size={size}
            $active={isActive}
            $color={fillColor}
            $emptyColor={emptyColor}
            $interactive={interactive}
            onMouseEnter={() => {
              if (interactive) {
                onHover(slotIndex);
              }
            }}
            onMouseLeave={() => {
              if (interactive) {
                onHover(null);
              }
            }}
          >
            {interactive ? (
              <RatingVisuallyHiddenInput
                type="radio"
                name={name}
                value={slotIndex}
                checked={displayValue != null && Math.abs(displayValue - slotIndex) < 1e-9}
                onChange={() => handleSelect(slotIndex)}
                onClick={() => {
                  if (
                    clearable &&
                    displayValue != null &&
                    Math.abs(displayValue - slotIndex) < 1e-9
                  ) {
                    handleSelect(slotIndex);
                  }
                }}
                aria-label={getLabelText(slotIndex)}
              />
            ) : null}
          </RatingDot>
        );
      })}
    </RatingItemsList>
  );
};
