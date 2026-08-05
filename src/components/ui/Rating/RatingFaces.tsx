import React, { useCallback, useMemo } from 'react';
import type { RatingVisualSlotProps } from './Rating.types';
import { pickRatingFaceComponents } from './RatingFacesIcons';
import { RatingFaceButton, RatingItemsList, RatingVisuallyHiddenInput } from './Rating.style';

/**
 * Вариант Rating: лица настроения.
 * @param props — {@link RatingVisualSlotProps}
 */
export const RatingFaces: React.FC<RatingVisualSlotProps> = ({
  displayValue,
  max,
  size,
  readOnly,
  disabled,
  name,
  getLabelText,
  clearable,
  highlightSelectedOnly,
  fillColor,
  emptyColor,
  onSelect,
  onHover,
}) => {
  const interactive = !readOnly && !disabled;
  const faceComponents = useMemo(() => pickRatingFaceComponents(max), [max]);

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
      {faceComponents.map((FaceComponent, index) => {
        const stepValue = index + 1;
        const isExact =
          displayValue != null && Math.round(displayValue) === stepValue;
        const isInRange =
          displayValue != null && stepValue <= displayValue + 1e-9;
        const isActive = highlightSelectedOnly ? isExact : isInRange;
        const isMuted =
          highlightSelectedOnly && displayValue != null && !isExact;

        return (
          <RatingFaceButton
            key={stepValue}
            $size={size}
            $active={isActive}
            $muted={Boolean(isMuted)}
            $interactive={interactive}
            $activeColor={fillColor}
            $emptyColor={emptyColor}
            onMouseEnter={() => {
              if (interactive) {
                onHover(stepValue);
              }
            }}
            onMouseLeave={() => {
              if (interactive) {
                onHover(null);
              }
            }}
          >
            <FaceComponent size="100%" />
            {interactive ? (
              <RatingVisuallyHiddenInput
                type="radio"
                name={name}
                value={stepValue}
                checked={isExact}
                onChange={() => handleSelect(stepValue)}
                onClick={() => {
                  if (clearable && isExact) {
                    handleSelect(stepValue);
                  }
                }}
                aria-label={getLabelText(stepValue)}
              />
            ) : null}
          </RatingFaceButton>
        );
      })}
    </RatingItemsList>
  );
};
