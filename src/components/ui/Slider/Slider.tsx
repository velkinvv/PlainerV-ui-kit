import React, { useCallback, useId, useMemo, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { useTheme } from 'styled-components';
import type { SliderProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { BorderRadiusHandler } from '../../../handlers/uiHandlers';
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
  SliderHiddenInput,
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
  resolveSliderAccentKind,
  sliderThumbLeftCalcCss,
  getSliderEmbeddedFooterHeightPx,
  getSliderEmbeddedThumbBottomCss,
  isSliderEmbeddedTrackFilledToEnd,
  parseThemeBorderRadiusPx,
} from './handlers';
import {
  SliderEmbeddedFooter,
  SliderEmbeddedRingWrap,
  SliderEmbeddedTrackActive,
  SliderEmbeddedTrackHit,
  SliderEmbeddedTrackRail,
  SliderEmbeddedTrackStrip,
  SliderEmbeddedTrackWrap,
  SliderEmbeddedThumb,
} from './SliderEmbeddedInInput.style';
import { SliderFieldShell } from './SliderFieldShell';
import { SliderSkeletonSingle } from './SliderSkeleton';

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
 * @param props.trackRailHeightPx / trackActiveHeightPx — опциональная толщина линий (см. типы)
 * @param props.label / additionalLabel / helperText / extraText / error / success / required — как у инпутов
 * @param props.skeleton / status — скелетон и визуальный акцент (см. типы)
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
  name,
  embeddedInInput = false,
  showScaleRow = true,
  onSliderFocus,
  onSliderBlur,
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
  const value = isControlled
    ? snapSliderToStep(clampSliderValue(valueProp ?? min, min, max), min, max, step)
    : internal;

  const thumbPx = getSliderThumbSizePx(size);
  const thumbInsetPx = thumbPx / 2;
  const track = useMemo(
    () => resolveSliderTrackMetrics(size, { trackRailHeightPx, trackActiveHeightPx }),
    [size, trackRailHeightPx, trackActiveHeightPx],
  );
  const valueLabelRootPadPx = showValueLabel
    ? getSliderValueLabelRootPaddingHorizontalPx(thumbPx)
    : 0;

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
      setCommittedValue(clientXToSliderValue(clientX, rect, min, max, step, thumbPx));
    },
    [max, min, setCommittedValue, step, thumbPx],
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

  const hasFieldChrome = useMemo(
    () =>
      !embeddedInInput &&
      (label != null ||
        Boolean(additionalLabel) ||
        Boolean(error) ||
        success === true ||
        Boolean(helperText) ||
        Boolean(extraText) ||
        required === true),
    [additionalLabel, embeddedInInput, error, extraText, helperText, label, required, success],
  );

  /** С лейблом/подписями трек на всю ширину колонки поля (Theme Showcase, формы). */
  const resolvedFullWidth = fullWidth || hasFieldChrome;

  const theme = useTheme();
  const fieldBorderRadiusPx = parseThemeBorderRadiusPx(
    BorderRadiusHandler(theme.borderRadius),
  );
  const trackLineHeightPx = Math.max(track.railHeightPx, track.activeHeightPx);
  const embeddedFooterHeightPx = getSliderEmbeddedFooterHeightPx(
    thumbPx,
    track.railHeightPx,
    track.activeHeightPx,
    fieldBorderRadiusPx,
  );
  const embeddedThumbBottomCss = getSliderEmbeddedThumbBottomCss(trackLineHeightPx);

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
        fullWidth={resolvedFullWidth}
        skeleton
        helperStatus={helperTextStatus}
      >
        <SliderSkeletonSingle size={size} fullWidth={resolvedFullWidth} showValueLabel={showValueLabel} />
      </SliderFieldShell>
    );
  }

  const ThumbComponent = embeddedInInput ? SliderEmbeddedThumb : SliderThumb;

  const thumbNode = (
    <ThumbComponent
      type="button"
      id={thumbId}
      $thumbPx={thumbPx}
      $accent={accentKind}
      $disabled={disabled}
      disabled={disabled}
      style={
        embeddedInInput
          ? { left: sliderThumbLeftCalcCss(thumbPx, pct), bottom: embeddedThumbBottomCss }
          : { left: sliderThumbLeftCalcCss(thumbPx, pct) }
      }
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
      onFocus={onSliderFocus}
      onBlur={onSliderBlur}
    />
  );

  const trackNode = embeddedInInput ? (
    <SliderEmbeddedFooter>
      {name ? (
        <SliderHiddenInput name={name} value={String(value)} readOnly aria-hidden tabIndex={-1} />
      ) : null}
      <SliderEmbeddedRingWrap $accent={accentKind}>
        <SliderEmbeddedTrackWrap ref={trackRef} $trackWrapHeightPx={embeddedFooterHeightPx}>
          <SliderEmbeddedTrackHit
            $thumbInsetPx={thumbInsetPx}
            $hitHeightPx={track.hitHeightPx}
            onPointerDown={onTrackPointerDown}
          />
          <SliderEmbeddedTrackStrip $lineHeightPx={trackLineHeightPx}>
            <SliderEmbeddedTrackRail
              $thumbInsetPx={thumbInsetPx}
              $railHeightPx={track.railHeightPx}
              aria-hidden
            />
            <SliderEmbeddedTrackActive
              $leftPct={0}
              $widthPct={pct}
              $thumbInsetPx={thumbInsetPx}
              $thumbSizePx={thumbPx}
              $activeHeightPx={track.activeHeightPx}
              $accent={accentKind}
              $fillToEnd={isSliderEmbeddedTrackFilledToEnd(pct)}
              aria-hidden
            />
          </SliderEmbeddedTrackStrip>
          {thumbNode}
        </SliderEmbeddedTrackWrap>
      </SliderEmbeddedRingWrap>
    </SliderEmbeddedFooter>
  ) : (
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
          $leftPct={0}
          $widthPct={pct}
          $thumbInsetPx={thumbInsetPx}
          $thumbSizePx={thumbPx}
          $activeHeightPx={track.activeHeightPx}
          $accent={accentKind}
          aria-hidden
        />
        {thumbNode}
      </SliderTrackWrap>
    </SliderTrackRingWrap>
  );

  const sliderBody = embeddedInInput ? (
    trackNode
  ) : (
    <SliderRoot
      className={clsx('ui-slider', !hasFieldChrome && className)}
      $fullWidth={resolvedFullWidth}
      $valueLabelPadPx={valueLabelRootPadPx}
    >
      {name ? (
        <SliderHiddenInput name={name} value={String(value)} readOnly aria-hidden tabIndex={-1} />
      ) : null}
      {showScaleRow ? (
        <SliderScaleRow>
          <SliderScaleLabel>{formatMinLabel(min)}</SliderScaleLabel>
          <SliderScaleLabel>{formatMaxLabel(max)}</SliderScaleLabel>
        </SliderScaleRow>
      ) : null}
      {trackNode}
      {showValueLabel ? (
        <SliderValuesRow aria-hidden={false}>
          <SliderValueLabel
            style={{ left: sliderThumbLeftCalcCss(thumbPx, pct) }}
            $disabled={disabled}
          >
            {formatValue(value)}
          </SliderValueLabel>
        </SliderValuesRow>
      ) : null}
    </SliderRoot>
  );

  if (embeddedInInput) {
    return sliderBody;
  }

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
      fullWidth={resolvedFullWidth}
      helperStatus={helperTextStatus}
    >
      {sliderBody}
    </SliderFieldShell>
  );
};

Slider.displayName = 'Slider';
