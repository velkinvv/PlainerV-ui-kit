import React, { forwardRef, useCallback, useId, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { useTheme } from 'styled-components';
import { RatingColorScale, RatingVariant, type RatingProps } from '@/types/ui';
import { Size } from '@/types/sizes';
import {
  clampRatingValue,
  defaultGetRatingLabelText,
  resolveRatingScaleColor,
  roundToPrecision,
} from '@/handlers/ratingHandlers';
import { RatingRoot, RatingValueLabel } from './Rating.style';
import { RatingIcons } from './RatingIcons';
import { RatingBar } from './RatingBar';
import { RatingFaces } from './RatingFaces';
import { RatingDots } from './RatingDots';
import type { RatingVisualSlotProps } from './Rating.types';

/**
 * Рейтинг: выбор и отображение оценки (icons / bar / faces / dots).
 *
 * @param props.variant — визуальный вариант
 * @param props.value — controlled значение
 * @param props.defaultValue — uncontrolled старт
 * @param props.onChange — смена значения
 * @param props.onHoverChange — preview при наведении
 * @param props.max — верх шкалы (5)
 * @param props.precision — шаг (1)
 * @param props.size — Size
 * @param props.readOnly — только отображение
 * @param props.disabled — блок
 * @param props.name — имя radio-группы
 * @param props.getLabelText — подпись шага
 * @param props.showValueLabel — число рядом
 * @param props.clearable — сброс повторным кликом
 * @param props.icon / emptyIcon — кастом icons
 * @param props.highlightSelectedOnly — faces
 * @param props.colorScale — шкала цвета
 * @param ref — ref на корень
 */
export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      variant = RatingVariant.ICONS,
      value: valueProp,
      defaultValue = null,
      onChange,
      onHoverChange,
      max = 5,
      precision = 1,
      size = Size.MD,
      readOnly = false,
      disabled = false,
      name: nameProp,
      getLabelText = defaultGetRatingLabelText,
      showValueLabel = false,
      clearable = false,
      icon,
      emptyIcon,
      highlightSelectedOnly,
      colorScale: colorScaleProp,
      className,
      'aria-label': ariaLabel,
    },
    ref,
  ) => {
    const theme = useTheme();
    const generatedName = useId();
    const name = nameProp ?? generatedName;
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState<number | null>(defaultValue);
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const committedValue = isControlled ? (valueProp ?? null) : internalValue;
    const displayValue = hoverValue ?? committedValue;

    const resolvedVariant = typeof variant === 'string' ? variant : RatingVariant.ICONS;

    const defaultColorScale =
      resolvedVariant === RatingVariant.BAR
        ? RatingColorScale.TRAFFIC
        : RatingColorScale.DEFAULT;

    const colorScale = colorScaleProp ?? defaultColorScale;

    const effectiveHighlightSelectedOnly =
      highlightSelectedOnly ?? resolvedVariant === RatingVariant.FACES;

    const fillColor = useMemo(() => {
      const displayRatio =
        displayValue == null || max <= 0 ? 0 : Math.min(1, Math.max(0, displayValue / max));

      if (Array.isArray(colorScale)) {
        return resolveRatingScaleColor(displayRatio, 'custom', colorScale);
      }

      if (String(colorScale) === RatingColorScale.TRAFFIC) {
        return resolveRatingScaleColor(displayRatio, 'traffic', [...theme.ratings.trafficStops]);
      }

      return theme.ratings.colors.filled;
    }, [colorScale, displayValue, max, theme.ratings]);

    const emptyColor = disabled
      ? theme.ratings.colors.disabled
      : theme.ratings.colors.empty;

    const commitValue = useCallback(
      (nextValue: number | null) => {
        const normalized =
          nextValue == null
            ? null
            : clampRatingValue(roundToPrecision(nextValue, precision), max);
        if (!isControlled) {
          setInternalValue(normalized);
        }
        onChange?.(normalized);
      },
      [isControlled, max, onChange, precision],
    );

    const handleHover = useCallback(
      (nextHover: number | null) => {
        setHoverValue(nextHover);
        onHoverChange?.(nextHover);
      },
      [onHoverChange],
    );

    const slotProps: RatingVisualSlotProps = {
      displayValue,
      hoverValue,
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
      highlightSelectedOnly: effectiveHighlightSelectedOnly,
      fillColor,
      emptyColor,
      onSelect: commitValue,
      onHover: handleHover,
    };

    const visual =
      resolvedVariant === RatingVariant.BAR ? (
        <RatingBar {...slotProps} />
      ) : resolvedVariant === RatingVariant.FACES ? (
        <RatingFaces {...slotProps} />
      ) : resolvedVariant === RatingVariant.DOTS ? (
        <RatingDots {...slotProps} />
      ) : (
        <RatingIcons {...slotProps} />
      );

    const readOnlyLabel =
      ariaLabel ??
      (committedValue == null ? 'Без оценки' : `Оценка ${committedValue} из ${max}`);

    return (
      <RatingRoot
        ref={ref}
        className={clsx('ui-rating', className)}
        $size={size}
        $disabled={disabled}
        role={readOnly ? 'img' : undefined}
        aria-label={readOnly ? readOnlyLabel : ariaLabel}
        data-variant={resolvedVariant}
      >
        {visual}
        {showValueLabel ? (
          <RatingValueLabel $size={size}>
            {committedValue == null ? '—' : committedValue}
          </RatingValueLabel>
        ) : null}
      </RatingRoot>
    );
  },
);

Rating.displayName = 'Rating';
