import React, { forwardRef, useCallback, useMemo } from 'react';
import type { TextAreaProps, TooltipPosition } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';
import { Tooltip } from '../../Tooltip/Tooltip';
import { Hint, HintVariant, type HintPosition } from '../../Hint/Hint';
import { useFormContext } from '../../../../contexts/FormContext';
import {
  InputContainer,
  Label,
  HelperText,
  ErrorText,
  SuccessText,
  SkeletonEffect,
  AdditionalLabel,
  ExtraText,
  CharacterCounter,
  RequiredIndicator,
} from '../shared';
import { StyledTextArea, TextAreaWrapper } from './TextArea.style';
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
      className,
      resize = 'vertical',
      rows = 4,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(value?.toString() || '');
    const formContext = useFormContext();

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

    const displayValue = value !== undefined ? value : internalValue;
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

    if (skeleton) {
      return (
        <InputContainer fullWidth={fullWidth}>
          {label && <SkeletonEffect size={Size.MD} />}
          <SkeletonEffect size={Size.LG} />
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

        {tooltip && tooltipType === 'tooltip' ? (
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
                value={displayValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                textAlign={textAlign}
                onCopy={handleCopy}
                onPaste={handlePaste}
                form={formContext?.formId}
                resize={resize}
                rows={rows}
                {...props}
              />
            </TextAreaWrapper>
          </Tooltip>
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
              value={displayValue}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              textAlign={textAlign}
              onCopy={handleCopy}
              onPaste={handlePaste}
              form={formContext?.formId}
              resize={resize}
              rows={rows}
              {...props}
            />
          </TextAreaWrapper>
        )}

        {tooltip && tooltipType === 'hint' && (
          <Hint
            content={tooltip}
            placement={tooltipPosition as HintPosition}
            variant={HintVariant.DEFAULT}
          >
            {tooltip}
          </Hint>
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
