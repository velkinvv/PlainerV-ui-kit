import React, { forwardRef, useCallback, useMemo } from 'react';
import type { InputProps, TooltipPosition } from '../../../../types/ui';
import { InputVariant } from '../../../../types/ui';
import { Size, IconSize } from '../../../../types/sizes';
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
} from '../shared';

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
      size = Size.MD,
      error,
      success,
      status,
      isLoading = false,
      skeleton = false,
      handleInput: _handleInput,
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
      clearIcon: _clearIcon = false,
      onClearIconClick: _onClearIconClick,
      leftIcon,
      rightIcon,
      onClear,
      showClearButton,
      className,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(value || '');

    // Получаем контекст формы для группировки полей
    const formContext = useFormContext();

    // Определяем статус на основе пропсов
    const currentStatus = status || (error ? 'error' : success ? 'success' : undefined);

    // Автоматически определяем autocomplete для полей пароля
    const getAutocompleteValue = useCallback(() => {
      // Если autoComplete уже задан явно, используем его
      if (props.autoComplete) {
        return props.autoComplete;
      }

      // Для полей пароля автоматически определяем подходящий autocomplete
      if (type === 'password') {
        // Проверяем placeholder для определения типа поля
        const placeholderText = (placeholder || '').toLowerCase();

        if (
          placeholderText.includes('повторите') ||
          placeholderText.includes('подтвердите') ||
          placeholderText.includes('confirm')
        ) {
          return 'new-password';
        }

        if (
          placeholderText.includes('текущий') ||
          placeholderText.includes('старый') ||
          placeholderText.includes('current') ||
          placeholderText.includes('old')
        ) {
          return 'current-password';
        }

        // По умолчанию для новых паролей
        return 'new-password';
      }

      // Для email полей
      if (type === 'email') {
        return 'email';
      }

      // Для полей имени пользователя
      if (
        type === 'text' &&
        (placeholder?.toLowerCase().includes('пользователь') ||
          placeholder?.toLowerCase().includes('username'))
      ) {
        return 'username';
      }

      return undefined;
    }, [type, placeholder, props.autoComplete]);

    // Обработчики событий с оптимизацией производительности
    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInternalValue(newValue);
        onChange?.(e);
      },
      [onChange],
    );

    const handleClear = useCallback(() => {
      setInternalValue('');
      onClear?.();
    }, [onClear]);

    // Обработчики для отключения копирования/вставки
    const handleCopy = useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        if (disableCopying) {
          e.preventDefault();
        }
      },
      [disableCopying],
    );

    const handlePaste = useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        if (disableCopying) {
          e.preventDefault();
        }
      },
      [disableCopying],
    );

    // Подсчет символов с оптимизацией
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

    // Если это скелетон
    if (skeleton) {
      return (
        <InputContainer fullWidth={fullWidth}>
          {label && <SkeletonEffect size={size} />}
          <SkeletonEffect size={size} />
        </InputContainer>
      );
    }

    // Определяем содержимое для отображения
    const displayValue = value !== undefined ? value : internalValue;

    return (
      <InputContainer fullWidth={fullWidth}>
        {/* Лейбл */}
        {label && (
          <Label>
            {label}
            {required && <RequiredIndicator>*</RequiredIndicator>}
          </Label>
        )}

        {/* Дополнительный лейбл */}
        {additionalLabel && <AdditionalLabel>{additionalLabel}</AdditionalLabel>}

        {/* Обертка инпута с тултипом */}
        {tooltip && tooltipType === 'tooltip' ? (
          <Tooltip content={tooltip} position={tooltipPosition as TooltipPosition}>
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

              <StyledInput
                ref={ref}
                type={type}
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
                autoComplete={getAutocompleteValue()}
                {...props}
              />

              {rightIcon && (
                <IconContainer $position="right" size={size}>
                  {rightIcon}
                </IconContainer>
              )}

              {isLoading && <LoadingSpinner size={size} />}

              {showClearButton && displayValue && !disabled && !readOnly && (
                <ClearButton onClick={handleClear} type="button">
                  <Icon name="IconExClose" size={IconSize.SM} />
                </ClearButton>
              )}
            </InputWrapper>
          </Tooltip>
        ) : (
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

            <StyledInput
              ref={ref}
              type={type}
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
              autoComplete={getAutocompleteValue()}
              {...props}
            />

            {rightIcon && (
              <IconContainer $position="right" size={size}>
                {rightIcon}
              </IconContainer>
            )}

            {isLoading && <LoadingSpinner size={size} />}

            {showClearButton && displayValue && !disabled && !readOnly && (
              <ClearButton onClick={handleClear} type="button">
                <Icon name="IconExClose" size={IconSize.SM} />
              </ClearButton>
            )}
          </InputWrapper>
        )}

        {/* Хинт */}
        {tooltip && tooltipType === 'hint' && (
          <Hint
            content={tooltip}
            placement={tooltipPosition as HintPosition}
            variant={HintVariant.DEFAULT}
          >
            {tooltip}
          </Hint>
        )}

        {/* Вспомогательные тексты */}
        {error && <ErrorText>{error}</ErrorText>}
        {success && <SuccessText>Успешно</SuccessText>}
        {helperText && !error && !success && <HelperText>{helperText}</HelperText>}
        {extraText && <ExtraText>{extraText}</ExtraText>}

        {/* Счетчик символов */}
        {showCounter && (
          <CharacterCounter $isOverLimit={currentLength > maxLength}>
            {currentLength}/{maxLength}
          </CharacterCounter>
        )}
      </InputContainer>
    );
  },
);

Input.displayName = 'Input';
