import React, { forwardRef, useCallback, useMemo } from 'react';
import type { TextAreaProps, TooltipPosition } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';
import { getClearIconSizeForInputField } from '../../../../handlers/iconHandlers';
import { Icon } from '../../Icon/Icon';
import { Tooltip } from '../../Tooltip/Tooltip';
import { Hint, HintVariant, type HintPosition } from '../../Hint/Hint';
import { useFormContext } from '../../../../contexts/FormContext';
import {
  InputContainer,
  Label,
  HelperText,
  ErrorText,
  SuccessText,
  AdditionalLabel,
  ExtraText,
  CharacterCounter,
  RequiredIndicator,
  LoadingSpinner,
  getInputDisplayValue,
  shouldShowInputClearButton,
  hasInputRightControls,
} from '../shared';
import {
  StyledTextArea,
  TextAreaWrapper,
  TextAreaClearButton,
  TextAreaSkeleton,
} from './TextArea.style';
import { getTextAreaCurrentLength, getTextAreaStatus, shouldShowTextAreaCounter } from './handlers';

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      placeholder,
      value,
      onChange,
      onFocus,
      onBlur,
      error,
      success,
      status,
      skeleton = false,
      isLoading = false,
      disableCopying = false,
      extraText,
      tooltip,
      tooltipType = 'tooltip',
      tooltipPosition = 'top',
      displayCharacterCounter = true,
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
      className,
      id,
      resize = 'vertical',
      rows = 4,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(value?.toString() || '');
    const formContext = useFormContext();
    const textAreaId = useMemo(
      () => id ?? `textarea-${Math.random().toString(36).slice(2, 10)}`,
      [id],
    );

    const currentStatus = useMemo(
      () => getTextAreaStatus(status, error, success),
      [status, error, success],
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setInternalValue(newValue);
        onChange?.(e);
      },
      [onChange],
    );

    const handleCopy = useCallback(
      (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        if (disableCopying) {
          e.preventDefault();
        }
      },
      [disableCopying],
    );

    const handlePaste = useCallback(
      (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        if (disableCopying) {
          e.preventDefault();
        }
      },
      [disableCopying],
    );

    /** Сброс значения и уведомление родителя (контролируемый режим обновляет `value` в `onClearIconClick`). */
    const handleClear = useCallback(() => {
      setInternalValue('');
      onClearIconClick?.();
    }, [onClearIconClick]);

    const displayValue = getInputDisplayValue(value, internalValue);
    const showClearButton = shouldShowInputClearButton({
      displayClearIcon,
      currentValue: displayValue,
      disabled,
      readOnly,
    });
    const hasRightControls = hasInputRightControls({
      isLoading,
      showClearButton,
    });
    const maxLength = useMemo(() => props.maxLength || 0, [props.maxLength]);
    const currentLength = useMemo(
      () => getTextAreaCurrentLength(value, internalValue),
      [value, internalValue],
    );
    const showCounter = useMemo(
      () =>
        shouldShowTextAreaCounter(
          displayCharacterCounter,
          maxLength,
          currentLength,
          characterCounterVisibilityThreshold,
        ),
      [displayCharacterCounter, maxLength, currentLength, characterCounterVisibilityThreshold],
    );

    // Скелетон только у области поля; подписи остаются текстом (нет `<textarea>` для `htmlFor`)
    if (skeleton) {
      return (
        <InputContainer fullWidth={fullWidth} aria-busy="true">
          {label ? (
            <Label as="span">
              {label}
              {required ? <RequiredIndicator>*</RequiredIndicator> : null}
            </Label>
          ) : null}
          {additionalLabel ? <AdditionalLabel>{additionalLabel}</AdditionalLabel> : null}
          <TextAreaSkeleton fullWidth={fullWidth} $rows={rows} role="presentation" />
        </InputContainer>
      );
    }

    return (
      <InputContainer fullWidth={fullWidth}>
        {label && (
          <Label>
            {label}
            {required && <RequiredIndicator>*</RequiredIndicator>}
          </Label>
        )}

        {additionalLabel && <AdditionalLabel>{additionalLabel}</AdditionalLabel>}

        {tooltip ? (
          tooltipType === 'tooltip' ? (
            <Tooltip content={tooltip} position={tooltipPosition as TooltipPosition}>
              <TextAreaWrapper
                size={Size.LG}
                error={error}
                success={success}
                status={currentStatus}
                fullWidth={fullWidth}
                focused={focused}
                readOnly={readOnly}
                className={className}
              >
                <StyledTextArea
                  ref={ref}
                  id={textAreaId}
                  value={displayValue}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder={placeholder}
                  disabled={disabled}
                  readOnly={readOnly}
                  required={required}
                  textAlign={textAlign}
                  onCopy={handleCopy}
                  onPaste={handlePaste}
                  form={formContext?.formId}
                  resize={resize}
                  rows={rows}
                  $hasRightControls={hasRightControls}
                  {...props}
                />
                {isLoading && <LoadingSpinner size={Size.LG} />}
                {showClearButton && (
                  <TextAreaClearButton onClick={handleClear} type="button">
                    <Icon
                      name="IconExClose"
                      size={getClearIconSizeForInputField(Size.SM)}
                      {...clearIconProps}
                    />
                  </TextAreaClearButton>
                )}
              </TextAreaWrapper>
            </Tooltip>
          ) : (
            <Hint
              content={tooltip}
              placement={tooltipPosition as HintPosition}
              variant={HintVariant.DEFAULT}
            >
              <TextAreaWrapper
                size={Size.LG}
                error={error}
                success={success}
                status={currentStatus}
                fullWidth={fullWidth}
                focused={focused}
                readOnly={readOnly}
                className={className}
              >
                <StyledTextArea
                  ref={ref}
                  id={textAreaId}
                  value={displayValue}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder={placeholder}
                  disabled={disabled}
                  readOnly={readOnly}
                  required={required}
                  textAlign={textAlign}
                  onCopy={handleCopy}
                  onPaste={handlePaste}
                  form={formContext?.formId}
                  resize={resize}
                  rows={rows}
                  $hasRightControls={hasRightControls}
                  {...props}
                />
                {isLoading && <LoadingSpinner size={Size.LG} />}
                {showClearButton ? (
                  <TextAreaClearButton onClick={handleClear} type="button">
                    <Icon
                      name="IconExClose"
                      size={getClearIconSizeForInputField(Size.LG)}
                      {...clearIconProps}
                    />
                  </TextAreaClearButton>
                ) : null}
              </TextAreaWrapper>
            </Hint>
          )
        ) : (
          <TextAreaWrapper
            size={Size.LG}
            error={error}
            success={success}
            status={currentStatus}
            fullWidth={fullWidth}
            focused={focused}
            readOnly={readOnly}
            className={className}
          >
            <StyledTextArea
              ref={ref}
              id={textAreaId}
              value={displayValue}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              textAlign={textAlign}
              onCopy={handleCopy}
              onPaste={handlePaste}
              form={formContext?.formId}
              resize={resize}
              rows={rows}
              $hasRightControls={hasRightControls}
              {...props}
            />
            {isLoading && <LoadingSpinner size={Size.LG} />}
            {showClearButton && (
              <TextAreaClearButton onClick={handleClear} type="button">
                <Icon
                  name="IconExClose"
                  size={getClearIconSizeForInputField(Size.SM)}
                  {...clearIconProps}
                />
              </TextAreaClearButton>
            )}
          </TextAreaWrapper>
        )}

        {error && <ErrorText>{error}</ErrorText>}
        {success && <SuccessText>Успешно</SuccessText>}
        {helperText && !error && !success && <HelperText>{helperText}</HelperText>}
        {extraText && <ExtraText>{extraText}</ExtraText>}

        {showCounter && (
          <CharacterCounter $isOverLimit={currentLength > maxLength}>
            {currentLength}/{maxLength}
          </CharacterCounter>
        )}
      </InputContainer>
    );
  },
);

TextArea.displayName = 'TextArea';
