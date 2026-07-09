import React, { forwardRef, useCallback, useEffect, useId, useMemo, useState } from 'react';
import {
  InputVariant,
  type SliderInputSingleProps,
  type TooltipPosition,
} from '../../../../types/ui';
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
  StyledInput,
  HelperText,
  ErrorText,
  SuccessText,
  IconContainer,
  LoadingSpinner,
  SkeletonEffect,
  AdditionalLabel,
  ExtraText,
  CharacterCounterMotion,
  RequiredIndicator,
  shouldShowInputClearButton,
} from '../shared';
import { Slider } from '../../Slider/Slider';
import { SliderScaleLabel } from '../../Slider/Slider.style';
import {
  SliderInputBody,
  SliderInputClearButton,
  SliderInputCompositeTopRow,
  SliderInputFieldShell,
  SliderInputMain,
  SliderInputNumberSlot,
  SliderInputScaleRow,
  SliderInputValueDisplay,
} from './SliderInput.style';
import { InputCompositeAddon, InputCompositeFieldSegment } from '../Input/InputComposite.style';
import {
  hasInputCompositeAddons,
  prepareInputCompositeAddon,
} from '../Input/inputCompositeHandlers';

/**
 * Слайдер с числовым полем в оболочке `Input`: те же лейблы, рамка, `status`, иконки, тултип, что у текстового поля;
 * шкала и бегунок используют разметку и расчёты `Slider`.
 *
 * @param value - Значение шкалы (контролируемый режим).
 * @param defaultValue - Начальное значение.
 * @param onChange - Как у `Slider`: новое число после слайдера, ввода или сброса.
 * @param min / max / step - Диапазон и шаг.
 * @param showValueLabel - Подпись под бегунком.
 * @param showScaleLabels - Подписи min / max под рамкой поля.
 * @param showNumberField - Поле ввода справа.
 * @param numberFieldWidth - Ширина колонки числа.
 * @param numberPlaceholder - Плейсхолдер числового поля.
 * @param formatValue / formatMinLabel / formatMaxLabel - Формат отображения.
 * @param trackRailHeightPx / trackActiveHeightPx - Геометрия трека.
 * @param sliderSize - Размер бегунка (по умолчанию как `size` поля).
 * @param name - Скрытое поле для формы.
 * @param ref - Ref на `HTMLInputElement` поля числа (только при `showNumberField`).
 */
/** Одиночное значение (`range` не задан или `false`). */
export const SliderInputSingle = forwardRef<HTMLInputElement, SliderInputSingleProps>(
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
      prefix,
      suffix,
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
    const reactId = useId();
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

    const currentStatus = status || (error ? 'error' : success ? 'success' : undefined);
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

    const hasSliderCompositeAddons = hasInputCompositeAddons(prefix, suffix);
    const preparedSliderPrefix = hasSliderCompositeAddons
      ? prepareInputCompositeAddon(prefix, { fieldSize: size, fieldDisabled: disabled })
      : null;
    const preparedSliderSuffix = hasSliderCompositeAddons
      ? prepareInputCompositeAddon(suffix, { fieldSize: size, fieldDisabled: disabled })
      : null;

    const sliderInputBody = (
      <SliderInputBody $fieldSize={size} $omitOuterPadding={hasSliderCompositeAddons}>
        {leftIcon ? (
          <IconContainer $position="left" size={size}>
            {leftIcon}
          </IconContainer>
        ) : null}

        {!showNumberField && showValueLabel ? (
          <SliderInputMain>
            <SliderInputValueDisplay $fieldSize={size} $disabled={disabled}>
              {formatValue(value)}
            </SliderInputValueDisplay>
          </SliderInputMain>
        ) : null}

        {showNumberField ? (
          <SliderInputNumberSlot
            $width={numberFieldWidth}
            $grow={fullWidth}
            $reserveClearSpace={showClearButton}
          >
            <StyledInput
              ref={ref}
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

        {rightIcon ? (
          <IconContainer $position="right" size={size}>
            {rightIcon}
          </IconContainer>
        ) : null}

        {isLoading ? <LoadingSpinner size={size} /> : null}

        {showClearButton ? (
          <SliderInputClearButton onClick={handleClear} type="button">
            <Icon
              name="IconExClose"
              size={getClearIconSizeForInputField(size)}
              {...clearIconProps}
            />
          </SliderInputClearButton>
        ) : null}
      </SliderInputBody>
    );

    const sliderTopRow = hasSliderCompositeAddons ? (
      <SliderInputCompositeTopRow>
        {preparedSliderPrefix ? (
          <InputCompositeAddon $position="prefix" size={size}>
            {preparedSliderPrefix}
          </InputCompositeAddon>
        ) : null}
        <InputCompositeFieldSegment size={size}>{sliderInputBody}</InputCompositeFieldSegment>
        {preparedSliderSuffix ? (
          <InputCompositeAddon $position="suffix" size={size}>
            {preparedSliderSuffix}
          </InputCompositeAddon>
        ) : null}
      </SliderInputCompositeTopRow>
    ) : (
      sliderInputBody
    );

    const inputSection = (
      <SliderInputFieldShell
        variant={variant}
        size={size}
        $fieldSize={size}
        error={error}
        success={success}
        status={currentStatus}
        fullWidth={fullWidth}
        focused={focused}
        readOnly={readOnly}
        className={className}
        onFocus={() => setFieldFocused(true)}
        onBlur={(blurEvent: React.FocusEvent<HTMLDivElement>) => {
          if (!blurEvent.currentTarget.contains(blurEvent.relatedTarget as Node)) {
            setFieldFocused(false);
          }
        }}
      >
        {sliderTopRow}
        <Slider
          embeddedInInput
          showScaleRow={false}
          showValueLabel={false}
          value={value}
          onChange={setCommittedValue}
          min={min}
          max={max}
          step={step}
          disabled={disabled || readOnly}
          size={sliderSize}
          error={error}
          success={success}
          status={currentStatus}
          formatValue={formatValue}
          trackRailHeightPx={trackRailHeightPx}
          trackActiveHeightPx={trackActiveHeightPx}
          name={name}
          onSliderFocus={() => {
            setThumbFocused(true);
            setFieldFocused(true);
          }}
          onSliderBlur={() => {
            setThumbFocused(false);
            setFieldFocused(false);
          }}
        />
      </SliderInputFieldShell>
    );

    const scaleLabelsRow = showScaleLabels ? (
      <SliderInputScaleRow>
        <SliderScaleLabel>{formatMinLabel(min)}</SliderScaleLabel>
        <SliderScaleLabel>{formatMaxLabel(max)}</SliderScaleLabel>
      </SliderInputScaleRow>
    ) : null;

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
          <Label
            htmlFor={showNumberField ? numberInputId : undefined}
            as={showNumberField ? 'label' : 'span'}
          >
            {label}
            {required ? <RequiredIndicator>*</RequiredIndicator> : null}
          </Label>
        ) : null}

        {additionalLabel ? <AdditionalLabel>{additionalLabel}</AdditionalLabel> : null}

        {withOptionalTooltip}

        {scaleLabelsRow}

        {error ? <ErrorText>{error}</ErrorText> : null}
        {success ? <SuccessText>Успешно</SuccessText> : null}
        {helperText && !error && !success ? <HelperText>{helperText}</HelperText> : null}
        {extraText ? <ExtraText>{extraText}</ExtraText> : null}

        <CharacterCounterMotion
          visible={Boolean(showCounter && maxLength)}
          currentLength={currentLength}
          maxLength={maxLength ?? 0}
        />
      </InputContainer>
    );
  },
);

SliderInputSingle.displayName = 'SliderInputSingle';
