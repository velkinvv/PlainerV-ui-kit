import React, { useCallback, useId, useMemo, useRef, useState } from 'react';
import { clsx } from 'clsx';
import type { SliderProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import {
  SliderRoot,
  SliderScaleRow,
  SliderScaleLabel,
  SliderTrackWrap,
  SliderTrackHit,
  SliderTrackRail,
  SliderTrackActive,
  SliderThumb,
  SliderValuesRow,
  SliderValueLabel,
  SliderHiddenInput,
} from './Slider.style';
import {
  clampSliderValue,
  snapSliderToStep,
  valueToPercent,
  clientXToSliderValue,
  formatSliderNumberRu,
  getSliderThumbSizePx,
} from './handlers';

const defaultFormat = (n: number) => formatSliderNumberRu(n);

/**
 * Одиночный слайдер: трек, активная часть слева до бегунка, подписи min/max и текущее значение.
 *
 * @param props.value - Контролируемое значение
 * @param props.defaultValue - Неконтролируемое начальное значение
 * @param props.onChange - Изменение значения
 * @param props.min / max / step - Шкала (по умолчанию 0 / 100 / 1)
 * @param props.formatValue / formatMinLabel / formatMaxLabel - Тексты подписей
 * @param props.showValueLabel - Показывать число под бегунком (по умолчанию true)
 * @param props.disabled / fullWidth / size / className / name — см. типы
 */
export const Slider: React.FC<SliderProps> = ({
  value: valueProp,
  defaultValue,
  onChange,
  min: minProp = 0,
  max: maxProp = 100,
  step: stepProp = 1,
  disabled = false,
  fullWidth = false,
  formatValue = defaultFormat,
  formatMinLabel = defaultFormat,
  formatMaxLabel = defaultFormat,
  showValueLabel = true,
  size = Size.MD,
  className,
  name,
}) => {
  const min = minProp;
  const max = Math.max(min, maxProp);
  const step = stepProp > 0 ? stepProp : 1;
  const trackRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const thumbId = `${reactId}-thumb`;

  const initial = useMemo(() => {
    const d = defaultValue ?? min;
    return snapSliderToStep(clampSliderValue(d, min, max), min, max, step);
  }, [defaultValue, min, max, step]);

  const [internal, setInternal] = useState(initial);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? snapSliderToStep(clampSliderValue(valueProp ?? min, min, max), min, max, step) : internal;

  const setCommittedValue = useCallback(
    (nextRaw: number) => {
      const next = snapSliderToStep(clampSliderValue(nextRaw, min, max), min, max, step);
      if (!isControlled) {
        setInternal(next);
      }
      onChange?.(next);
    },
    [isControlled, max, min, onChange, step],
  );

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect?.width) {
        return;
      }
      setCommittedValue(clientXToSliderValue(clientX, rect, min, max, step));
    },
    [max, min, setCommittedValue, step],
  );

  const onTrackPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }
      updateFromClientX(e.clientX);
    },
    [disabled, updateFromClientX],
  );

  const onThumbPointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }
      e.stopPropagation();
      (e.currentTarget as HTMLButtonElement).setPointerCapture(e.pointerId);
    },
    [disabled],
  );

  const onThumbPointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }
      const el = e.currentTarget as HTMLButtonElement;
      if (!el.hasPointerCapture(e.pointerId)) {
        return;
      }
      updateFromClientX(e.clientX);
    },
    [disabled, updateFromClientX],
  );

  const onThumbPointerUp = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    const el = e.currentTarget as HTMLButtonElement;
    if (el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
  }, []);

  const onThumbKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }
      let delta = 0;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        delta = -step;
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        delta = step;
      } else if (e.key === 'Home') {
        setCommittedValue(min);
        e.preventDefault();
        return;
      } else if (e.key === 'End') {
        setCommittedValue(max);
        e.preventDefault();
        return;
      } else if (e.key === 'PageDown') {
        delta = -step * 10;
      } else if (e.key === 'PageUp') {
        delta = step * 10;
      } else {
        return;
      }
      e.preventDefault();
      setCommittedValue(value + delta);
    },
    [disabled, max, min, setCommittedValue, step, value],
  );

  const pct = valueToPercent(value, min, max);
  const thumbPx = getSliderThumbSizePx(size);

  return (
    <SliderRoot className={clsx('ui-slider', className)} $fullWidth={fullWidth}>
      {name ? <SliderHiddenInput name={name} value={String(value)} readOnly aria-hidden tabIndex={-1} /> : null}
      <SliderScaleRow>
        <SliderScaleLabel>{formatMinLabel(min)}</SliderScaleLabel>
        <SliderScaleLabel>{formatMaxLabel(max)}</SliderScaleLabel>
      </SliderScaleRow>
      <SliderTrackWrap ref={trackRef}>
        <SliderTrackHit onPointerDown={onTrackPointerDown} />
        <SliderTrackRail aria-hidden />
        <SliderTrackActive $leftPct={0} $widthPct={pct} aria-hidden />
        <SliderThumb
          type="button"
          id={thumbId}
          $thumbPx={thumbPx}
          $disabled={disabled}
          disabled={disabled}
          style={{ left: `${pct}%` }}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={formatValue(value)}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          onPointerDown={onThumbPointerDown}
          onPointerMove={onThumbPointerMove}
          onPointerUp={onThumbPointerUp}
          onPointerCancel={onThumbPointerUp}
          onKeyDown={onThumbKeyDown}
        />
      </SliderTrackWrap>
      {showValueLabel ? (
        <SliderValuesRow aria-hidden={false}>
          <SliderValueLabel style={{ left: `${pct}%` }} $disabled={disabled}>
            {formatValue(value)}
          </SliderValueLabel>
        </SliderValuesRow>
      ) : null}
    </SliderRoot>
  );
};

Slider.displayName = 'Slider';
