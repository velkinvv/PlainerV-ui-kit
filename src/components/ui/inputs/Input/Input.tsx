import React, { forwardRef, useCallback, useMemo } from 'react';
import { InputVariant, type InputProps, type TooltipPosition } from '../../../../types/ui';
import { getClearIconSizeForInputField } from '../../../../handlers/iconHandlers';
import { Size } from '../../../../types/sizes';
import { Icon } from '../../Icon/Icon';
import { Tooltip } from '../../Tooltip/Tooltip';
import { Hint, HintVariant, type HintPosition } from '../../Hint/Hint';
import { useFormContext } from '../../../../contexts/FormContext';
import {
  InputContainer,
  InputControlStack,
  Label,
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
  CharacterCounterMotion,
  RequiredIndicator,
  getInputDisplayValue,
  shouldShowInputClearButton,
} from '../shared';
import { resolveInputAutocompleteAttribute } from './handlers';
import { InputFieldShell } from './InputFieldShell';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      value,
      onChange,
      onFocus,
      onBlur,
      variant = InputVariant.DEFAULT,
      size = Size.SM,
      error,
      success,
      status,
      isLoading = false,
      skeleton = false,
      handleInput,
      disableCopying = false,
      extraText,
      tooltip,
      tooltipType = 'tooltip',
      tooltipPosition = 'top',
      displayCharacterCounter = true,
      ignoreMaskCharacters: _ignoreMaskCharacters = false,
      characterCounterVisibilityThreshold = 0,
      additionalLabel,
      helperText,
      fullWidth = false,
      disabled = false,
      readOnly = false,
      required = false,
      type = 'text',
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
      ...props
    },
    ref,
  ) => {
    const inputId = useMemo(() => id ?? `input-${Math.random().toString(36).slice(2, 10)}`, [id]);

    const [focused, setFocused] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(value || '');

    const formContext = useFormContext();

    const currentStatus = status || (error ? 'error' : success ? 'success' : undefined);

    const getAutocompleteValue = useCallback(
      () =>
        resolveInputAutocompleteAttribute({
          autoComplete: props.autoComplete,
          inputType: type,
          placeholder,
        }),
      [type, placeholder, props.autoComplete],
    );

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(event);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        onBlur?.(event);
      },
      [onBlur],
    );

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        let newValue = target.value;
        let cursorPosition = target.selectionStart ?? newValue.length;

        if (handleInput) {
          const result = handleInput(newValue, cursorPosition);
          newValue = result.value;
          cursorPosition = result.cursorPosition;

          setInternalValue(newValue);

          window.setTimeout(() => {
            if (target.setSelectionRange) {
              target.setSelectionRange(cursorPosition, cursorPosition);
            }
          }, 0);

          const syntheticEvent = {
            ...event,
            target: { ...target, value: newValue },
            currentTarget: { ...event.currentTarget, value: newValue },
          } as React.ChangeEvent<HTMLInputElement>;

          onChange?.(syntheticEvent);
          return;
        }

        setInternalValue(newValue);
        onChange?.(event);
      },
      [onChange, handleInput],
    );

    const handleClear = useCallback(() => {
      setInternalValue('');
      onClearIconClick?.();
    }, [onClearIconClick]);

    const handleCopy = useCallback(
      (event: React.ClipboardEvent<HTMLInputElement>) => {
        if (disableCopying) {
          event.preventDefault();
        }
      },
      [disableCopying],
    );

    const handlePaste = useCallback(
      (event: React.ClipboardEvent<HTMLInputElement>) => {
        if (disableCopying) {
          event.preventDefault();
        }
      },
      [disableCopying],
    );

    const currentLength = useMemo(
      () => (value || internalValue || '').toString().length,
      [value, internalValue],
    );

    const maxLength = useMemo(() => props.maxLength || 0, [props.maxLength]);

    const showCounter = useMemo(
      () =>
        displayCharacterCounter &&
        maxLength > 0 &&
        currentLength >= characterCounterVisibilityThreshold,
      [displayCharacterCounter, maxLength, currentLength, characterCounterVisibilityThreshold],
    );

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

    const displayValue = getInputDisplayValue(value, String(internalValue ?? ''));
    const showClearButton = shouldShowInputClearButton({
      displayClearIcon,
      currentValue: displayValue,
      disabled,
      readOnly,
    });

    const shellProps = {
      variant,
      size,
      error,
      success,
      status: currentStatus,
      fullWidth,
      focused,
      readOnly,
      className,
      prefix,
      suffix,
      disabled,
    };

    const fieldInner = (
      <>
        {leftIcon && (
          <IconContainer $position="left" size={size}>
            {leftIcon}
          </IconContainer>
        )}

        <StyledInput
          ref={ref}
          id={inputId}
          type={type}
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
          autoComplete={getAutocompleteValue()}
          {...props}
        />

        {rightIcon && (
          <IconContainer $position="right" size={size}>
            {rightIcon}
          </IconContainer>
        )}

        {isLoading && <LoadingSpinner size={size} />}

        {showClearButton && (
          <ClearButton onClick={handleClear} type="button">
            <Icon
              name="IconExClose"
              size={getClearIconSizeForInputField(size)}
              {...clearIconProps}
            />
          </ClearButton>
        )}
      </>
    );

    const fieldShell = <InputFieldShell {...shellProps}>{fieldInner}</InputFieldShell>;

    const fieldWithTooltip = tooltip ? (
      tooltipType === 'tooltip' ? (
        <Tooltip content={tooltip} position={tooltipPosition as TooltipPosition}>
          {fieldShell}
        </Tooltip>
      ) : (
        <Hint
          content={tooltip}
          placement={tooltipPosition as HintPosition}
          variant={HintVariant.DEFAULT}
        >
          {fieldShell}
        </Hint>
      )
    ) : (
      fieldShell
    );

    return (
      <InputContainer fullWidth={fullWidth}>
        <InputControlStack fullWidth={fullWidth}>
          {label && (
            <Label htmlFor={inputId}>
              {label}
              {required && <RequiredIndicator>*</RequiredIndicator>}
            </Label>
          )}

          {additionalLabel && <AdditionalLabel>{additionalLabel}</AdditionalLabel>}

          {fieldWithTooltip}

          {error && <ErrorText>{error}</ErrorText>}
          {success && <SuccessText>Успешно</SuccessText>}
          {helperText && !error && !success && <HelperText>{helperText}</HelperText>}
          {extraText && <ExtraText>{extraText}</ExtraText>}

          <CharacterCounterMotion
            visible={showCounter}
            currentLength={currentLength}
            maxLength={maxLength}
          />
        </InputControlStack>
      </InputContainer>
    );
  },
);

Input.displayName = 'Input';
