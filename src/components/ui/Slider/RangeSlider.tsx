import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { clsx } from 'clsx';
import type { RangeSliderProps, SliderRangeValue } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { Input } from '../inputs/Input/Input';
import {
  SliderRoot,
  SliderScaleRow,
  SliderScaleLabel,
  SliderTrackWrap,
  SliderTrackHit,
  SliderTrackRail,
  SliderTrackRingWrap,
  SliderTrackActive,
  SliderThumb,
  SliderValuesRow,
  SliderValueLabel,
  RangeSliderInputsRow,
} from './Slider.style';
import {
  clampSliderValue,
  snapSliderToStep,
  valueToPercent,
  clientXToSliderValue,
  formatSliderNumberRu,
  getSliderThumbSizePx,
  getSliderValueLabelRootPaddingHorizontalPx,
  resolveSliderTrackMetrics,
  sortAndClampRange,
  mergeRangeAfterThumbMove,
  pickCloserThumbIndex,
  parseManualSliderNumber,
  resolveSliderAccentKind,
  sliderThumbLeftCalcCss,
} from './handlers';
import { SliderFieldShell } from './SliderFieldShell';
import { SliderSkeletonRange } from './SliderSkeleton';

const defaultFormat = (n: number) => formatSliderNumberRu(n);

/**
 * Слайдер диапазона: два бегунка, синий сегмент между ними; опционально поля «От» / «До».
 *
 * @param props.value - Контролируемая пара `[от, до]`
 * @param props.defaultValue - Неконтролируемая начальная пара
 * @param props.onChange - Новая пара значений
 * @param props.showManualInputs - Показать два `Input` под шкалой
 * @param props.fromInputPlaceholder / toInputPlaceholder / currencySuffix / nameFrom / nameTo — см. типы
 * @param props.trackRailHeightPx / trackActiveHeightPx — опциональная толщина линий трека
 * @param props.label / additionalLabel / helperText / extraText / error / success / required — как у инпутов
 * @param props.skeleton / status — скелетон и акцент (см. типы)
 */
export const RangeSlider: React.FC<RangeSliderProps> = ({
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
  trackRailHeightPx,
  trackActiveHeightPx,
  label,
  additionalLabel,
  error,
  success,
  helperText,
  extraText,
  required,
  skeleton = false,
  status,
  className,
  showManualInputs = false,
  fromInputPlaceholder,
  toInputPlaceholder,
  currencySuffix = '₽',
  nameFrom,
  nameTo,
}) => {
  const min = minProp;
  const max = Math.max(min, maxProp);
  const step = stepProp > 0 ? stepProp : 1;
  const trackRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const dragThumbRef = useRef<0 | 1 | null>(null);

  const normalizedDefault = useMemo((): [number, number] => {
    const raw = defaultValue ?? ([min, min + (max - min) * 0.5] as const);
    const a = snapSliderToStep(clampSliderValue(raw?.[0] ?? min, min, max), min, max, step);
    const b = snapSliderToStep(clampSliderValue(raw?.[1] ?? max, min, max), min, max, step);
    return sortAndClampRange(a, b, min, max);
  }, [defaultValue, min, max, step]);

  const [internal, setInternal] = useState<[number, number]>(normalizedDefault);
  const isControlled = valueProp !== undefined;
  const pair = isControlled
    ? sortAndClampRange(
        snapSliderToStep(clampSliderValue(valueProp?.[0] ?? min, min, max), min, max, step),
        snapSliderToStep(clampSliderValue(valueProp?.[1] ?? max, min, max), min, max, step),
        min,
        max,
      )
    : internal;
  const [low, high] = pair;

  const setCommittedPair = useCallback(
    (next: SliderRangeValue) => {
      const ordered = sortAndClampRange(
        snapSliderToStep(clampSliderValue(next[0], min, max), min, max, step),
        snapSliderToStep(clampSliderValue(next[1], min, max), min, max, step),
        min,
        max,
      );
      if (!isControlled) {
        setInternal(ordered);
      }
      onChange?.(ordered);
    },
    [isControlled, max, min, onChange, step],
  );

  const [fromText, setFromText] = useState(() => formatValue(low));
  const [toText, setToText] = useState(() => formatValue(high));

  useEffect(() => {
    setFromText(formatValue(low));
    setToText(formatValue(high));
  }, [formatValue, low, high]);

  const phFrom = fromInputPlaceholder ?? `От ${formatSliderNumberRu(min)}`;
  const phTo = toInputPlaceholder ?? `До ${formatSliderNumberRu(max)} ₽`;

  /** Диаметр бегунка — нужен для инсета трека и координат pointer (см. `sliderThumbLeftCalcCss`). */
  const thumbPx = getSliderThumbSizePx(size);
  const thumbInsetPx = thumbPx / 2;
  const track = useMemo(
    () => resolveSliderTrackMetrics(size, { trackRailHeightPx, trackActiveHeightPx }),
    [size, trackRailHeightPx, trackActiveHeightPx],
  );
  const valueLabelRootPadPx = showValueLabel
    ? getSliderValueLabelRootPaddingHorizontalPx(thumbPx)
    : 0;

  const updateFromClientX = useCallback(
    (clientX: number, thumbIndex: 0 | 1) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect?.width) {
        return;
      }
      const raw = clientXToSliderValue(clientX, rect, min, max, step, thumbPx);
      setCommittedPair(mergeRangeAfterThumbMove(thumbIndex, raw, low, high, min, max, step));
    },
    [high, low, max, min, setCommittedPair, step, thumbPx],
  );

  const onTrackPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect?.width) {
        return;
      }
      const idx = pickCloserThumbIndex(e.clientX, rect, low, high, min, max, step, thumbPx);
      const raw = clientXToSliderValue(e.clientX, rect, min, max, step, thumbPx);
      setCommittedPair(mergeRangeAfterThumbMove(idx, raw, low, high, min, max, step));
    },
    [disabled, high, low, max, min, setCommittedPair, step, thumbPx],
  );

  const makeThumbDown = useCallback(
    (index: 0 | 1) => (e: React.PointerEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }
      e.stopPropagation();
      dragThumbRef.current = index;
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
      const idx = dragThumbRef.current;
      if (idx == null) {
        return;
      }
      updateFromClientX(e.clientX, idx);
    },
    [disabled, updateFromClientX],
  );

  const onThumbPointerUp = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    const el = e.currentTarget as HTMLButtonElement;
    if (el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    dragThumbRef.current = null;
  }, []);

  const makeThumbKeyDown = useCallback(
    (index: 0 | 1) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }
      let delta = 0;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        delta = -step;
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        delta = step;
      } else if (e.key === 'Home') {
        const next =
          index === 0
            ? mergeRangeAfterThumbMove(0, min, low, high, min, max, step)
            : mergeRangeAfterThumbMove(1, low, low, high, min, max, step);
        setCommittedPair(next);
        e.preventDefault();
        return;
      } else if (e.key === 'End') {
        const next =
          index === 0
            ? mergeRangeAfterThumbMove(0, high, low, high, min, max, step)
            : mergeRangeAfterThumbMove(1, max, low, high, min, max, step);
        setCommittedPair(next);
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
      const base = index === 0 ? low : high;
      setCommittedPair(mergeRangeAfterThumbMove(index, base + delta, low, high, min, max, step));
    },
    [disabled, high, low, max, min, setCommittedPair, step],
  );

  const pctLow = valueToPercent(low, min, max);
  const pctHigh = valueToPercent(high, min, max);
  const activeLeft = pctLow;
  const activeWidth = Math.max(0, pctHigh - pctLow);

  const currencyIcon = useMemo(
    () => <span aria-hidden="true">{currencySuffix}</span>,
    [currencySuffix],
  );

  const commitFromInput = useCallback(() => {
    const n = parseManualSliderNumber(fromText);
    if (n == null) {
      setFromText(formatValue(low));
      return;
    }
    setCommittedPair(mergeRangeAfterThumbMove(0, n, low, high, min, max, step));
  }, [fromText, formatValue, high, low, max, min, setCommittedPair, step]);

  const commitToInput = useCallback(() => {
    const n = parseManualSliderNumber(toText);
    if (n == null) {
      setToText(formatValue(high));
      return;
    }
    setCommittedPair(mergeRangeAfterThumbMove(1, n, low, high, min, max, step));
  }, [formatValue, high, low, max, min, setCommittedPair, step, toText]);

  const hasFieldChrome = useMemo(
    () =>
      label != null ||
      Boolean(additionalLabel) ||
      Boolean(error) ||
      success === true ||
      Boolean(helperText) ||
      Boolean(extraText) ||
      required === true,
    [additionalLabel, error, extraText, helperText, label, required, success],
  );

  const accentKind = useMemo(
    () => resolveSliderAccentKind(error, success, status),
    [error, success, status],
  );

  const helperTextStatus = useMemo(() => {
    if (error || success) {
      return undefined;
    }
    if (status === 'warning' || status === 'success' || status === 'error') {
      return status;
    }
    return undefined;
  }, [error, success, status]);

  if (skeleton) {
    return (
      <SliderFieldShell
        enabled={hasFieldChrome}
        className={hasFieldChrome ? className : undefined}
        label={label}
        additionalLabel={additionalLabel}
        error={error}
        success={success}
        helperText={helperText}
        extraText={extraText}
        required={required}
        fullWidth={fullWidth}
        skeleton
        helperStatus={helperTextStatus}
      >
        <SliderSkeletonRange size={size} fullWidth={fullWidth} showValueLabel={showValueLabel} />
      </SliderFieldShell>
    );
  }

  const sliderBody = (
    <SliderRoot
      className={clsx('ui-range-slider', !hasFieldChrome && className)}
      $fullWidth={fullWidth}
      $valueLabelPadPx={valueLabelRootPadPx}
    >
      <SliderScaleRow>
        <SliderScaleLabel>{formatMinLabel(min)}</SliderScaleLabel>
        <SliderScaleLabel>{formatMaxLabel(max)}</SliderScaleLabel>
      </SliderScaleRow>
      <SliderTrackRingWrap $accent={accentKind}>
        <SliderTrackWrap ref={trackRef} $trackWrapHeightPx={track.trackWrapHeightPx}>
          <SliderTrackHit
            $thumbInsetPx={thumbInsetPx}
            $hitHeightPx={track.hitHeightPx}
            onPointerDown={onTrackPointerDown}
          />
          <SliderTrackRail
            $thumbInsetPx={thumbInsetPx}
            $railHeightPx={track.railHeightPx}
            aria-hidden
          />
          <SliderTrackActive
            $leftPct={activeLeft}
            $widthPct={activeWidth}
            $thumbInsetPx={thumbInsetPx}
            $thumbSizePx={thumbPx}
            $activeHeightPx={track.activeHeightPx}
            $accent={accentKind}
            aria-hidden
          />
          <SliderThumb
            type="button"
            id={`${reactId}-t0`}
            $thumbPx={thumbPx}
            $accent={accentKind}
            $disabled={disabled}
            disabled={disabled}
            style={{ left: sliderThumbLeftCalcCss(thumbPx, pctLow), zIndex: 2 }}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={low}
            aria-valuetext={formatValue(low)}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            onPointerDown={makeThumbDown(0)}
            onPointerMove={onThumbPointerMove}
            onPointerUp={onThumbPointerUp}
            onPointerCancel={onThumbPointerUp}
            onKeyDown={makeThumbKeyDown(0)}
          />
          <SliderThumb
            type="button"
            id={`${reactId}-t1`}
            $thumbPx={thumbPx}
            $accent={accentKind}
            $disabled={disabled}
            disabled={disabled}
            style={{ left: sliderThumbLeftCalcCss(thumbPx, pctHigh), zIndex: 2 }}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={high}
            aria-valuetext={formatValue(high)}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            onPointerDown={makeThumbDown(1)}
            onPointerMove={onThumbPointerMove}
            onPointerUp={onThumbPointerUp}
            onPointerCancel={onThumbPointerUp}
            onKeyDown={makeThumbKeyDown(1)}
          />
        </SliderTrackWrap>
      </SliderTrackRingWrap>
      {showValueLabel ? (
        <SliderValuesRow>
          <SliderValueLabel
            style={{ left: sliderThumbLeftCalcCss(thumbPx, pctLow) }}
            $disabled={disabled}
          >
            {formatValue(low)}
          </SliderValueLabel>
          <SliderValueLabel
            style={{ left: sliderThumbLeftCalcCss(thumbPx, pctHigh) }}
            $disabled={disabled}
          >
            {formatValue(high)}
          </SliderValueLabel>
        </SliderValuesRow>
      ) : null}
      {showManualInputs ? (
        <RangeSliderInputsRow>
          <Input
            name={nameFrom}
            fullWidth
            disabled={disabled}
            placeholder={phFrom}
            value={fromText}
            onChange={(e) => setFromText(e.target?.value ?? '')}
            onBlur={commitFromInput}
            rightIcon={currencyIcon}
          />
          <Input
            name={nameTo}
            fullWidth
            disabled={disabled}
            placeholder={phTo}
            value={toText}
            onChange={(e) => setToText(e.target?.value ?? '')}
            onBlur={commitToInput}
            rightIcon={currencyIcon}
          />
        </RangeSliderInputsRow>
      ) : null}
    </SliderRoot>
  );

  return (
    <SliderFieldShell
      enabled={hasFieldChrome}
      className={hasFieldChrome ? className : undefined}
      label={label}
      additionalLabel={additionalLabel}
      error={error}
      success={success}
      helperText={helperText}
      extraText={extraText}
      required={required}
      fullWidth={fullWidth}
      helperStatus={helperTextStatus}
    >
      {sliderBody}
    </SliderFieldShell>
  );
};

RangeSlider.displayName = 'RangeSlider';
