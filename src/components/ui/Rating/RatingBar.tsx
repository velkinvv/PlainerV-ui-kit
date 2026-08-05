import React, { useCallback, useRef } from 'react';
import {
  ratingValueFromTrackPointer,
  ratingValueToPercent,
  roundToPrecision,
  clampRatingValue,
} from '@/handlers/ratingHandlers';
import type { RatingVisualSlotProps } from './Rating.types';
import { RatingBarFill, RatingBarTrack } from './Rating.style';

/**
 * Вариант Rating: полоска с цветом по шкале (slider a11y).
 * @param props — {@link RatingVisualSlotProps}
 */
export const RatingBar: React.FC<RatingVisualSlotProps> = ({
  displayValue,
  max,
  precision,
  size,
  readOnly,
  disabled,
  clearable,
  fillColor,
  getLabelText,
  onSelect,
  onHover,
}) => {
  const interactive = !readOnly && !disabled;
  const trackRef = useRef<HTMLDivElement>(null);
  const fillPercent = ratingValueToPercent(displayValue, max);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      if (!interactive || trackRef.current == null) {
        return;
      }
      const trackRect = trackRef.current.getBoundingClientRect();
      const nextValue = ratingValueFromTrackPointer(clientX, trackRect, max, precision);
      onSelect(nextValue);
    },
    [interactive, max, onSelect, precision],
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || trackRef.current == null) {
      return;
    }
    const trackRect = trackRef.current.getBoundingClientRect();
    const preview = ratingValueFromTrackPointer(event.clientX, trackRect, max, precision);
    onHover(preview);
    if (event.buttons === 1) {
      updateFromClientX(event.clientX);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!interactive) {
      return;
    }
    const current = displayValue ?? 0;
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      onSelect(clampRatingValue(roundToPrecision(current + precision, precision), max));
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      const next = roundToPrecision(current - precision, precision);
      if (clearable && next <= 0) {
        onSelect(null);
      } else {
        onSelect(clampRatingValue(next, max));
      }
    } else if (event.key === 'Home') {
      event.preventDefault();
      onSelect(clearable ? null : 0);
    } else if (event.key === 'End') {
      event.preventDefault();
      onSelect(max);
    }
  };

  if (readOnly) {
    return (
      <RatingBarTrack
        ref={trackRef}
        $size={size}
        $interactive={false}
        role="img"
        aria-label={getLabelText(displayValue ?? 0)}
      >
        <RatingBarFill $fillPercent={fillPercent} $fillColor={fillColor} />
      </RatingBarTrack>
    );
  }

  return (
    <RatingBarTrack
      ref={trackRef}
      $size={size}
      $interactive={interactive}
      role="slider"
      tabIndex={interactive ? 0 : -1}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={displayValue ?? 0}
      aria-label={getLabelText(displayValue ?? 0)}
      aria-disabled={disabled || undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => onHover(null)}
      onKeyDown={handleKeyDown}
    >
      <RatingBarFill $fillPercent={fillPercent} $fillColor={fillColor} />
    </RatingBarTrack>
  );
};
