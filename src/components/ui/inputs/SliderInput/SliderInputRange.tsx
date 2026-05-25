import React, { forwardRef, useCallback, useEffect, useId, useMemo, useState } from 'react';
import { InputVariant, type SliderInputRangeProps, type SliderRangeValue, type TooltipPosition } from '../../../../types/ui';
import { getClearIconSizeForInputField } from '../../../../handlers/iconHandlers';
import { sanitizeNumericInput } from '../NumberInput/handlers';
import {
  formatSliderInputValueRuDefault,
  getSliderInputRangeClearButtonPseudoValue,
  getSliderInputRangeDefaultPair,
  getSliderInputRangeNumericDraftSeeds,
  normalizeSliderInputScale,
  resolveSliderInputNumericDraftOnCommit,
  resolveSliderInputNumericSanitizeFlags,
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
  CharacterCounter,
  RequiredIndicator,
  shouldShowInputClearButton,
} from '../shared';
import { RangeSlider } from '../../Slider/RangeSlider';
import { SliderScaleLabel } from '../../Slider/Slider.style';
import { formatSliderNumberRu, mergeRangeAfterThumbMove } from '../../Slider/handlers';
import {
  SliderInputBody,
  SliderInputClearButton,
  SliderInputCompositeTopRow,
  SliderInputFieldShell,
  SliderInputMain,
  SliderInputNumberSlot,
  SliderInputRangeFieldLabel,
  SliderInputRangeNumberGroup,
  SliderInputRangeNumberHalf,
  SliderInputRangeNumbersRow,
  SliderInputRangeSeparator,
  SliderInputScaleRow,
  SliderInputValueDisplay,
} from './SliderInput.style';
import { InputCompositeAddon, InputCompositeFieldSegment } from '../Input/InputComposite.style';
import {
  hasInputCompositeAddons,
  prepareInputCompositeAddon,
} from '../Input/inputCompositeHandlers';

/**
 * `SliderInput` в режиме диапазона (`range={true}`): два бегунка, два поля «от» / «до».
 *
 * @param value - Контролируемая пара `[от, до]`.
 * @param defaultValue - Начальная пара.
 * @param onChange - Новая пара после слайдера, ввода или сброса.
 * @param rangeFromLabel / rangeToLabel - Подписи перед полями (по умолчанию «От:» / «До:»).
 * @param numberFromPlaceholder / numberToPlaceholder - Плейсхолдеры полей.
 * @param nameFrom / nameTo - Скрытые поля формы.
 * @param ref - Ref на поле «от» (`HTMLInputElement`).
 */
export const SliderInputRange = forwardRef<HTMLInputElement, SliderInputRangeProps>(
  (
    {
      label,
      numberPlaceholder: _numberPlaceholder,
      numberFromPlaceholder,
      numberToPlaceholder,
      rangeFromLabel = 'От:',
      rangeToLabel = 'До:',
      value: valueProp,
      defaultValue,
      onChange,
      min: minProp = 0,
      max: maxProp = 100,
      step: stepProp = 1,
      showValueLabel = true,
      showScaleLabels = true,
      showNumberField = true,
      numberFieldWidth = '72px',
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
      textAlign = 'left',
      displayClearIcon = false,
      onClearIconClick,
      clearIconProps,
      leftIcon,
      rightIcon,
      prefix,
      suffix,
      className,
      id,
      nameFrom,
      nameTo,
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
    const fromInputId = id ?? `${reactId}-from`;
    const toInputId = `${reactId}-to`;

    const defaultPair = useMemo(
      () => getSliderInputRangeDefaultPair(defaultValue, min, max, step),
      [defaultValue, min, max, step],
    );

    const [internal, setInternal] = useState<SliderRangeValue>(() =>
      getSliderInputRangeDefaultPair(defaultValue, min, max, step),
    );

    const isControlled = valueProp !== undefined;
    const pair = isControlled
      ? getSliderInputRangeDefaultPair(valueProp, min, max, step)
      : internal;
    const [low, high] = pair;

    const setCommittedPair = useCallback(
      (next: SliderRangeValue) => {
        const ordered = getSliderInputRangeDefaultPair(next, min, max, step);
        if (!isControlled) {
          setInternal(ordered);
        }
        onChange?.(ordered);
      },
      [isControlled, max, min, onChange, step],
    );

    const currentStatus = status || (error ? 'error' : success ? 'success' : undefined);

    const [fieldFocused, setFieldFocused] = useState(false);
    const [thumbFocused, setThumbFocused] = useState(false);
    const [numericFocused, setNumericFocused] = useState(false);
    const focused = fieldFocused || thumbFocused || numericFocused;

    const { allowDecimal, allowNegative } = resolveSliderInputNumericSanitizeFlags(step, min);

    const draftSeeds = useMemo(
      () =>
        getSliderInputRangeNumericDraftSeeds({
          valueProp,
          defaultValue,
          min,
          max,
          step,
        }),
      [defaultValue, valueProp, min, max, step],
    );

    const [fromDraft, setFromDraft] = useState(() => draftSeeds.fromDraft);
    const [toDraft, setToDraft] = useState(() => draftSeeds.toDraft);

    useEffect(() => {
      if (!numericFocused) {
        setFromDraft(String(low));
        setToDraft(String(high));
      }
    }, [high, low, numericFocused]);

    const handleNumericChange = useCallback(
      (target: 'from' | 'to') => (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement = changeEvent.target;
        const newValue = inputElement.value;
        const cursorPosition = inputElement.selectionStart ?? newValue.length;
        const result = sanitizeNumericInput({
          rawInput: newValue,
          caretIndex: cursorPosition,
          allowDecimal,
          allowNegative,
        });
        if (target === 'from') {
          setFromDraft(result.sanitizedValue);
        } else {
          setToDraft(result.sanitizedValue);
        }
        window.setTimeout(() => {
          inputElement.setSelectionRange(result.caretIndex, result.caretIndex);
        }, 0);
      },
      [allowDecimal, allowNegative],
    );

    const commitFromDraft = useCallback(() => {
      const resolution = resolveSliderInputNumericDraftOnCommit(fromDraft);
      if (resolution.outcome === 'revert') {
        setFromDraft(String(low));
        return;
      }
      setCommittedPair(mergeRangeAfterThumbMove(0, resolution.nextValue, low, high, min, max, step));
    }, [fromDraft, high, low, max, min, setCommittedPair, step]);

    const commitToDraft = useCallback(() => {
      const resolution = resolveSliderInputNumericDraftOnCommit(toDraft);
      if (resolution.outcome === 'revert') {
        setToDraft(String(high));
        return;
      }
      setCommittedPair(mergeRangeAfterThumbMove(1, resolution.nextValue, low, high, min, max, step));
    }, [toDraft, high, low, max, min, setCommittedPair, step]);

    const handleNumericBlur = useCallback(
      (target: 'from' | 'to') => (blurEvent: React.FocusEvent<HTMLInputElement>) => {
        if (target === 'from') {
          commitFromDraft();
        } else {
          commitToDraft();
        }
        const related = blurEvent.relatedTarget as Node | null;
        const stillInsideField = blurEvent.currentTarget
          .closest('[data-slider-input-field]')
          ?.contains(related);
        if (!stillInsideField) {
          setNumericFocused(false);
          setFieldFocused(false);
          onBlurProp?.(blurEvent);
        }
      },
      [commitFromDraft, commitToDraft, onBlurProp],
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
      setCommittedPair(defaultPair);
      setFromDraft(String(defaultPair[0]));
      setToDraft(String(defaultPair[1]));
      onClearIconClick?.();
    }, [defaultPair, onClearIconClick, setCommittedPair]);

    const showClearButton = shouldShowInputClearButton({
      displayClearIcon,
      currentValue: getSliderInputRangeClearButtonPseudoValue(
        low,
        high,
        defaultPair[0],
        defaultPair[1],
      ),
      disabled,
      readOnly,
    });

    const draftLength = fromDraft.length + toDraft.length;
    const showCounter = useMemo(
      () =>
        shouldShowSliderInputCharacterCounter({
          displayCharacterCounter,
          maxLength,
          draftLength,
          visibilityThreshold: characterCounterVisibilityThreshold,
        }),
      [characterCounterVisibilityThreshold, draftLength, displayCharacterCounter, maxLength],
    );

    const formContext = useFormContext();

    const placeholderFrom =
      numberFromPlaceholder ?? `От ${formatSliderNumberRu(min)}`;
    const placeholderTo = numberToPlaceholder ?? `До ${formatSliderNumberRu(max)}`;

    if (skeleton) {
      return (
        <InputContainer fullWidth={fullWidth} aria-busy="true">
          {label ? (
            <Label as="span">
              {label}
              {required && <RequiredIndicator>*</RequiredIndicator>}
            </Label>
          ) : null}
          {additionalLabel ? <AdditionalLabel>{additionalLabel}</AdditionalLabel> : null}
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
              {`${formatValue(low)} — ${formatValue(high)}`}
            </SliderInputValueDisplay>
          </SliderInputMain>
        ) : null}

        {showNumberField ? (
          <SliderInputRangeNumbersRow>
            <SliderInputRangeNumberHalf>
              <SliderInputRangeNumberGroup>
                <SliderInputRangeFieldLabel $fieldSize={size}>
                  {rangeFromLabel}
                </SliderInputRangeFieldLabel>
                <SliderInputNumberSlot
                  $width={numberFieldWidth}
                  $grow={false}
                  $reserveClearSpace={false}
                >
                  <StyledInput
                    ref={ref}
                    id={fromInputId}
                    type="text"
                    inputMode={allowDecimal ? 'decimal' : 'numeric'}
                    value={fromDraft}
                    onChange={handleNumericChange('from')}
                    onFocus={handleNumericFocus}
                    onBlur={handleNumericBlur('from')}
                    placeholder={placeholderFrom}
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
              </SliderInputRangeNumberGroup>
            </SliderInputRangeNumberHalf>
            <SliderInputRangeSeparator aria-hidden>—</SliderInputRangeSeparator>
            <SliderInputRangeNumberHalf>
              <SliderInputRangeNumberGroup>
                <SliderInputRangeFieldLabel $fieldSize={size}>
                  {rangeToLabel}
                </SliderInputRangeFieldLabel>
                <SliderInputNumberSlot
                  $width={numberFieldWidth}
                  $grow={false}
                  $reserveClearSpace={showClearButton}
                >
                  <StyledInput
                    id={toInputId}
                    type="text"
                    inputMode={allowDecimal ? 'decimal' : 'numeric'}
                    value={toDraft}
                    onChange={handleNumericChange('to')}
                    onFocus={handleNumericFocus}
                    onBlur={handleNumericBlur('to')}
                    placeholder={placeholderTo}
                    disabled={disabled}
                    readOnly={readOnly}
                    textAlign={textAlign}
                    onCopy={handleNumericCopy}
                    onPaste={handleNumericPaste}
                    form={formContext?.formId}
                    autoComplete="off"
                    maxLength={maxLength}
                  />
                </SliderInputNumberSlot>
              </SliderInputRangeNumberGroup>
            </SliderInputRangeNumberHalf>
          </SliderInputRangeNumbersRow>
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
        data-slider-input-field
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
        <RangeSlider
          embeddedInInput
          showScaleRow={false}
          showValueLabel={false}
          value={pair}
          onChange={setCommittedPair}
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
          nameFrom={nameFrom}
          nameTo={nameTo}
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
            htmlFor={showNumberField ? fromInputId : undefined}
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

        {showCounter && maxLength ? (
          <CharacterCounter $isOverLimit={draftLength > maxLength}>
            {draftLength}/{maxLength}
          </CharacterCounter>
        ) : null}
      </InputContainer>
    );
  },
);

SliderInputRange.displayName = 'SliderInputRange';
