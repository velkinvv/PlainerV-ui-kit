import React, { forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { InputVariant, type SliderInputProps, type TooltipPosition } from '../../../../types/ui';
import { getClearIconSizeForInputField } from '../../../../handlers/iconHandlers';
import { sanitizeNumericInput } from '../NumberInput/handlers';
import {
  formatSliderInputValueRuDefault,
  getSliderInputClearButtonPseudoValue,
  getSliderInputNumericDraftSeed,
  getSliderInputSnappedMinimum,
  normalizeSliderInputScale,
  resolveSliderInputNumericDraftOnCommit,
  resolveSliderInputNumericSanitizeFlags,
  resolveSliderInputSnappedValue,
  resolveSliderInputThumbKeyboardIntent,
  shouldShowSliderInputCharacterCounter,
} from './handlers';
import { Size } from '../../../../types/sizes';
import { Icon } from '../../Icon/Icon';
import { Tooltip } from '../../Tooltip/Tooltip';
import { Hint, HintVariant, type HintPosition } from '../../Hint/Hint';
import { useFormContext } from '../../../../contexts/FormContext';
import {
  InputContainer,
  Label,
  InputWrapper,
  StyledInput,
  HelperText,
  ErrorText,
  SuccessText,
  IconContainer,
  ClearButton,
  LoadingSpinner,
  SkeletonEffect,
  AdditionalLabel,
  ExtraText,
  CharacterCounter,
  RequiredIndicator,
  shouldShowInputClearButton,
} from '../shared';
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
} from '../../Slider/Slider.style';
import {
  valueToPercent,
  clientXToSliderValue,
  getSliderThumbSizePx,
  getSliderValueLabelRootPaddingHorizontalPx,
  resolveSliderTrackMetrics,
  resolveSliderAccentKind,
  sliderThumbLeftCalcCss,
} from '../../Slider/handlers';
import { SliderInputNumberSlot, SliderInputRow, SliderInputTrackSlot } from './SliderInput.style';

/**
 * Слайдер с числовым полем в оболочке `Input`: те же лейблы, рамка, `status`, иконки, тултип, что у текстового поля;
 * шкала и бегунок используют разметку и расчёты `Slider`.
 *
 * @param value - Значение шкалы (контролируемый режим).
 * @param defaultValue - Начальное значение.
 * @param onChange - Как у `Slider`: новое число после слайдера, ввода или сброса.
 * @param min / max / step - Диапазон и шаг.
 * @param showValueLabel - Подпись под бегунком.
 * @param showScaleLabels - Подписи min / max над треком.
 * @param showNumberField - Поле ввода справа.
 * @param numberFieldWidth - Ширина колонки числа.
 * @param numberPlaceholder - Плейсхолдер числового поля.
 * @param formatValue / formatMinLabel / formatMaxLabel - Формат отображения.
 * @param trackRailHeightPx / trackActiveHeightPx - Геометрия трека.
 * @param sliderSize - Размер бегунка (по умолчанию как `size` поля).
 * @param name - Скрытое поле для формы.
 * @param ref - Ref на `HTMLInputElement` поля числа (только при `showNumberField`).
 */
export const SliderInput = forwardRef<HTMLInputElement, SliderInputProps>(
  (
    {
      label,
      numberPlaceholder,
      value: valueProp,
      defaultValue,
      onChange,
      min: minProp = 0,
      max: maxProp = 100,
      step: stepProp = 1,
      showValueLabel = true,
      showScaleLabels = true,
      showNumberField = true,
      numberFieldWidth = '88px',
      formatValue = formatSliderInputValueRuDefault,
      formatMinLabel = formatSliderInputValueRuDefault,
      formatMaxLabel = formatSliderInputValueRuDefault,
      trackRailHeightPx,
      trackActiveHeightPx,
      sliderSize: sliderSizeProp,
      variant = InputVariant.DEFAULT,
      size = Size.SM,
      error,
      success,
      status,
      isLoading = false,
      skeleton = false,
      disableCopying = false,
      extraText,
      tooltip,
      tooltipType = 'tooltip',
      tooltipPosition = 'top',
      displayCharacterCounter = false,
      characterCounterVisibilityThreshold = 0,
      additionalLabel,
      helperText,
      fullWidth = false,
      disabled = false,
      readOnly = false,
      required = false,
      textAlign = 'right',
      displayClearIcon = false,
      onClearIconClick,
      clearIconProps,
      leftIcon,
      rightIcon,
      className,
      id,
      name,
      maxLength,
      ignoreMaskCharacters: _ignoreMaskCharacters = false,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      ...rest
    },
    ref,
  ) => {
    const { min, max, step } = normalizeSliderInputScale({
      minProp,
      maxProp,
      stepProp,
    });
    const sliderSize = sliderSizeProp ?? size;
    const trackRef = useRef<HTMLDivElement>(null);
    const reactId = useId();
    const thumbId = `${reactId}-thumb`;
    const numberInputId = id ?? `${reactId}-value`;

    const [internal, setInternal] = useState(() =>
      resolveSliderInputSnappedValue(defaultValue ?? min, min, max, step),
    );
    const isControlled = valueProp !== undefined;
    const value = isControlled
      ? resolveSliderInputSnappedValue(valueProp ?? min, min, max, step)
      : internal;

    const snappedMin = useMemo(
      () => getSliderInputSnappedMinimum(min, max, step),
      [min, max, step],
    );

    const thumbPx = getSliderThumbSizePx(sliderSize);
    const thumbInsetPx = thumbPx / 2;
    const track = useMemo(
      () => resolveSliderTrackMetrics(sliderSize, { trackRailHeightPx, trackActiveHeightPx }),
      [sliderSize, trackRailHeightPx, trackActiveHeightPx],
    );
    const valueLabelRootPadPx = showValueLabel
      ? getSliderValueLabelRootPaddingHorizontalPx(thumbPx)
      : 0;

    const setCommittedValue = useCallback(
      (nextRaw: number) => {
        const next = resolveSliderInputSnappedValue(nextRaw, min, max, step);
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
      (pointerEvent: React.PointerEvent<HTMLDivElement>) => {
        if (disabled || readOnly) {
          return;
        }
        updateFromClientX(pointerEvent.clientX);
      },
      [disabled, readOnly, updateFromClientX],
    );

    const onThumbPointerDown = useCallback(
      (pointerEvent: React.PointerEvent<HTMLButtonElement>) => {
        if (disabled || readOnly) {
          return;
        }
        pointerEvent.stopPropagation();
        (pointerEvent.currentTarget as HTMLButtonElement).setPointerCapture(pointerEvent.pointerId);
      },
      [disabled, readOnly],
    );

    const onThumbPointerMove = useCallback(
      (pointerEvent: React.PointerEvent<HTMLButtonElement>) => {
        if (disabled || readOnly) {
          return;
        }
        const element = pointerEvent.currentTarget as HTMLButtonElement;
        if (!element.hasPointerCapture(pointerEvent.pointerId)) {
          return;
        }
        updateFromClientX(pointerEvent.clientX);
      },
      [disabled, readOnly, updateFromClientX],
    );

    const onThumbPointerUp = useCallback((pointerEvent: React.PointerEvent<HTMLButtonElement>) => {
      const element = pointerEvent.currentTarget as HTMLButtonElement;
      if (element.hasPointerCapture(pointerEvent.pointerId)) {
        element.releasePointerCapture(pointerEvent.pointerId);
      }
    }, []);

    const onThumbKeyDown = useCallback(
      (keyEvent: React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled || readOnly) {
          return;
        }
        const intent = resolveSliderInputThumbKeyboardIntent(keyEvent.key, step);
        if (intent.kind === 'none') {
          return;
        }
        if (intent.kind === 'toMin') {
          setCommittedValue(min);
          keyEvent.preventDefault();
          return;
        }
        if (intent.kind === 'toMax') {
          setCommittedValue(max);
          keyEvent.preventDefault();
          return;
        }
        keyEvent.preventDefault();
        setCommittedValue(value + intent.delta);
      },
      [disabled, max, min, readOnly, setCommittedValue, step, value],
    );

    const pct = valueToPercent(value, min, max);
    const currentStatus = status || (error ? 'error' : success ? 'success' : undefined);
    const accentKind = useMemo(
      () => resolveSliderAccentKind(error, success, status),
      [error, success, status],
    );

    const [fieldFocused, setFieldFocused] = useState(false);
    const [thumbFocused, setThumbFocused] = useState(false);
    const [numericFocused, setNumericFocused] = useState(false);
    const focused = fieldFocused || thumbFocused || numericFocused;

    const { allowDecimal, allowNegative } = resolveSliderInputNumericSanitizeFlags(step, min);

    const [numericDraft, setNumericDraft] = useState(() =>
      getSliderInputNumericDraftSeed({ valueProp, defaultValue, min, max, step }),
    );

    useEffect(() => {
      if (!numericFocused) {
        setNumericDraft(String(value));
      }
    }, [numericFocused, value]);

    const handleNumericChange = useCallback(
      (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
        const target = changeEvent.target;
        const newValue = target.value;
        const cursorPosition = target.selectionStart ?? newValue.length;
        const result = sanitizeNumericInput({
          rawInput: newValue,
          caretIndex: cursorPosition,
          allowDecimal,
          allowNegative,
        });
        setNumericDraft(result.sanitizedValue);
        window.setTimeout(() => {
          target.setSelectionRange(result.caretIndex, result.caretIndex);
        }, 0);
      },
      [allowDecimal, allowNegative],
    );

    const commitNumericDraft = useCallback(() => {
      const resolution = resolveSliderInputNumericDraftOnCommit(numericDraft);
      if (resolution.outcome === 'revert') {
        setNumericDraft(String(value));
        return;
      }
      setCommittedValue(resolution.nextValue);
    }, [numericDraft, setCommittedValue, value]);

    const handleNumericBlur = useCallback(
      (blurEvent: React.FocusEvent<HTMLInputElement>) => {
        setNumericFocused(false);
        setFieldFocused(false);
        commitNumericDraft();
        onBlurProp?.(blurEvent);
      },
      [commitNumericDraft, onBlurProp],
    );

    const handleNumericFocus = useCallback(
      (focusEvent: React.FocusEvent<HTMLInputElement>) => {
        setNumericFocused(true);
        setFieldFocused(true);
        onFocusProp?.(focusEvent);
      },
      [onFocusProp],
    );

    const handleNumericCopy = useCallback(
      (clipboardEvent: React.ClipboardEvent<HTMLInputElement>) => {
        if (disableCopying) {
          clipboardEvent.preventDefault();
        }
      },
      [disableCopying],
    );

    const handleNumericPaste = useCallback(
      (clipboardEvent: React.ClipboardEvent<HTMLInputElement>) => {
        if (disableCopying) {
          clipboardEvent.preventDefault();
        }
      },
      [disableCopying],
    );

    const handleClear = useCallback(() => {
      setCommittedValue(snappedMin);
      setNumericDraft(String(snappedMin));
      onClearIconClick?.();
    }, [onClearIconClick, setCommittedValue, snappedMin]);

    const showClearButton = shouldShowInputClearButton({
      displayClearIcon,
      currentValue: getSliderInputClearButtonPseudoValue(value, snappedMin),
      disabled,
      readOnly,
    });

    const currentLength = numericDraft.length;
    const showCounter = useMemo(
      () =>
        shouldShowSliderInputCharacterCounter({
          displayCharacterCounter,
          maxLength,
          draftLength: currentLength,
          visibilityThreshold: characterCounterVisibilityThreshold,
        }),
      [characterCounterVisibilityThreshold, currentLength, displayCharacterCounter, maxLength],
    );

    const formContext = useFormContext();

    if (skeleton) {
      return (
        <InputContainer fullWidth={fullWidth} aria-busy="true">
          {label && (
            <Label as="span">
              {label}
              {required && <RequiredIndicator>*</RequiredIndicator>}
            </Label>
          )}
          {additionalLabel && <AdditionalLabel>{additionalLabel}</AdditionalLabel>}
          <SkeletonEffect size={size} fullWidth={fullWidth} role="presentation" />
        </InputContainer>
      );
    }

    const sliderColumn = (
      <SliderRoot $fullWidth $valueLabelPadPx={valueLabelRootPadPx}>
        {name ? (
          <SliderHiddenInput name={name} value={String(value)} readOnly aria-hidden tabIndex={-1} />
        ) : null}
        {showScaleLabels ? (
          <SliderScaleRow>
            <SliderScaleLabel>{formatMinLabel(min)}</SliderScaleLabel>
            <SliderScaleLabel>{formatMaxLabel(max)}</SliderScaleLabel>
          </SliderScaleRow>
        ) : null}
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
            <SliderThumb
              type="button"
              id={thumbId}
              $thumbPx={thumbPx}
              $accent={accentKind}
              $disabled={disabled || readOnly}
              disabled={disabled || readOnly}
              style={{ left: sliderThumbLeftCalcCss(thumbPx, pct) }}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={value}
              aria-valuetext={formatValue(value)}
              role="slider"
              tabIndex={disabled || readOnly ? -1 : 0}
              onPointerDown={onThumbPointerDown}
              onPointerMove={onThumbPointerMove}
              onPointerUp={onThumbPointerUp}
              onPointerCancel={onThumbPointerUp}
              onKeyDown={onThumbKeyDown}
              onFocus={() => {
                setThumbFocused(true);
                setFieldFocused(true);
              }}
              onBlur={() => {
                setThumbFocused(false);
                setFieldFocused(false);
              }}
            />
          </SliderTrackWrap>
        </SliderTrackRingWrap>
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

    const controlsRow = (
      <SliderInputRow
        onFocus={() => setFieldFocused(true)}
        onBlur={(blurEvent) => {
          if (!blurEvent.currentTarget.contains(blurEvent.relatedTarget as Node)) {
            setFieldFocused(false);
          }
        }}
      >
        <SliderInputTrackSlot>{sliderColumn}</SliderInputTrackSlot>
        {showNumberField ? (
          <SliderInputNumberSlot $width={numberFieldWidth}>
            <StyledInput
              ref={showNumberField ? ref : undefined}
              id={numberInputId}
              type="text"
              inputMode={allowDecimal ? 'decimal' : 'numeric'}
              value={numericDraft}
              onChange={handleNumericChange}
              onFocus={handleNumericFocus}
              onBlur={handleNumericBlur}
              placeholder={numberPlaceholder}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              textAlign={textAlign}
              onCopy={handleNumericCopy}
              onPaste={handleNumericPaste}
              form={formContext?.formId}
              autoComplete="off"
              maxLength={maxLength}
              {...rest}
            />
          </SliderInputNumberSlot>
        ) : null}
      </SliderInputRow>
    );

    const inputSection = (
      <InputWrapper
        variant={variant}
        size={size}
        error={error}
        success={success}
        status={currentStatus}
        fullWidth={fullWidth}
        focused={focused}
        readOnly={readOnly}
        className={className}
      >
        {leftIcon && (
          <IconContainer $position="left" size={size}>
            {leftIcon}
          </IconContainer>
        )}

        {controlsRow}

        {rightIcon && (
          <IconContainer $position="right" size={size}>
            {rightIcon}
          </IconContainer>
        )}

        {isLoading ? <LoadingSpinner size={size} /> : null}

        {showClearButton ? (
          <ClearButton onClick={handleClear} type="button">
            <Icon
              name="IconExClose"
              size={getClearIconSizeForInputField(size)}
              {...clearIconProps}
            />
          </ClearButton>
        ) : null}
      </InputWrapper>
    );

    const withOptionalTooltip = tooltip ? (
      tooltipType === 'tooltip' ? (
        <Tooltip content={tooltip} position={tooltipPosition as TooltipPosition}>
          {inputSection}
        </Tooltip>
      ) : (
        <Hint
          content={tooltip}
          placement={tooltipPosition as HintPosition}
          variant={HintVariant.DEFAULT}
        >
          {inputSection}
        </Hint>
      )
    ) : (
      inputSection
    );

    return (
      <InputContainer fullWidth={fullWidth}>
        {label ? (
          <Label htmlFor={showNumberField ? numberInputId : thumbId}>
            {label}
            {required ? <RequiredIndicator>*</RequiredIndicator> : null}
          </Label>
        ) : null}

        {additionalLabel ? <AdditionalLabel>{additionalLabel}</AdditionalLabel> : null}

        {withOptionalTooltip}

        {error ? <ErrorText>{error}</ErrorText> : null}
        {success ? <SuccessText>Успешно</SuccessText> : null}
        {helperText && !error && !success ? <HelperText>{helperText}</HelperText> : null}
        {extraText ? <ExtraText>{extraText}</ExtraText> : null}

        {showCounter && maxLength ? (
          <CharacterCounter $isOverLimit={currentLength > maxLength}>
            {currentLength}/{maxLength}
          </CharacterCounter>
        ) : null}
      </InputContainer>
    );
  },
);

SliderInput.displayName = 'SliderInput';
