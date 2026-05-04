import React, { forwardRef, useId, useMemo, useRef } from 'react';
import styled from 'styled-components';
import {
  RadioContainerWrapper,
  RadioContainer,
  RadioCircle,
  RadioDot,
  RadioLabel,
  RadioTextContainer,
  RadioExtraText,
  RadioIconContainer,
  RadioRequiredIndicator,
  RadioWrapper,
} from './RadioButton.style';

import { clsx } from 'clsx';
import {
  RadioButtonVariant,
  RadioButtonLabelPosition,
  TooltipPosition,
  type RadioButtonProps,
} from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { Tooltip } from '../Tooltip/Tooltip';
import {
  AdditionalLabel,
  ErrorText,
  ExtraText,
  HelperText,
  InputContainer,
  Label,
  RequiredIndicator,
  SuccessText,
} from '../inputs/shared';

const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
`;

/**
 * Компонент радиокнопки для выбора одной опции из группы
 *
 * @example
 * ```tsx
 * const [value, setValue] = useState('option1');
 *
 * <RadioButton
 *   checked={value === 'option1'}
 *   onChange={e => setValue(e.target.value)}
 *   label="Опция 1"
 *   name="options"
 *   value="option1"
 * />
 * ```
 *
 * @example С ошибкой и вспомогательным текстом
 * ```tsx
 * <RadioButton
 *   checked={value === 'option1'}
 *   onChange={e => setValue(e.target.value)}
 *   label="Опция 1"
 *   name="options"
 *   value="option1"
 *   error="Это поле обязательно"
 *   helperText="Вспомогательный текст"
 * />
 * ```
 *
 * @example С tooltip и индикатором обязательности
 * ```tsx
 * <RadioButton
 *   checked={value === 'option1'}
 *   onChange={e => setValue(e.target.value)}
 *   label="Обязательная опция"
 *   name="options"
 *   value="option1"
 *   required
 *   tooltip="Подсказка при наведении"
 * />
 * ```
 *
 * @example С иконками и статусом
 * ```tsx
 * <RadioButton
 *   checked={value === 'option1'}
 *   onChange={e => setValue(e.target.value)}
 *   label="Опция с иконкой"
 *   name="options"
 *   value="option1"
 *   leftIcon={<Icon name="IconExHome" size={IconSize.SM} />}
 *   status="success"
 * />
 * ```
 */
export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      checked = false,
      onChange,
      onClick,
      label,
      disabled = false,
      size = Size.MD,
      name,
      value,
      variant = RadioButtonVariant.FILLED, // По умолчанию filled вариант
      extraText,
      fieldLabel,
      additionalLabel,
      formRequired = false,
      readOnly = false,
      labelPosition = RadioButtonLabelPosition.RIGHT, // По умолчанию справа
      error,
      helperText,
      success = false,
      extraFooterText,
      tooltip,
      tooltipPosition = TooltipPosition.TOP,
      required = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      status,
      className,
      id: idProp,
      ...props
    },
    ref,
  ) => {
    /** Подавляет второй click по input после клика по подписи (label → программный click на radio). */
    const suppressNextInputClickRef = useRef(false);
    const stableRadioUid = useId();
    const radioDomId = idProp ?? stableRadioUid;
    const radioFooterErrorIdentifier = useId();
    const radioFooterHelperIdentifier = useId();
    const radioFooterSuccessIdentifier = useId();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled && !readOnly && onChange) {
        onChange(event);
      }
    };

    const handleLabelClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || readOnly) return;

      const target = event.target as HTMLElement | null;

      if (target instanceof HTMLInputElement && target.type === 'radio') {
        if (suppressNextInputClickRef.current) {
          suppressNextInputClickRef.current = false;
          return;
        }
        if (onClick) {
          onClick(event as unknown as React.MouseEvent<HTMLLabelElement>);
        }
        return;
      }

      suppressNextInputClickRef.current = true;
      requestAnimationFrame(() => {
        suppressNextInputClickRef.current = false;
      });

      if (onClick) {
        onClick(event as unknown as React.MouseEvent<HTMLLabelElement>);
      }
      // onChange при клике мышью не дублируем: срабатывает нативно через <label htmlFor>
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (readOnly || !(event.key === 'Enter' || event.key === ' ')) return;
      event.preventDefault();
      if (disabled || readOnly) return;
      if (onClick) {
        onClick(event as unknown as React.MouseEvent<HTMLLabelElement>);
      }
      if (onChange) {
        const syntheticEvent = {
          target: { checked: true, value },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

    // Определяем, нужно ли показывать лейбл и дополнительный текст
    const shouldShowLabel = labelPosition !== RadioButtonLabelPosition.NONE && (label || extraText);

    // Формируем aria-describedby
    const ariaDescribedBy = useMemo(() => {
      const ids: string[] = [];
      if (error) {
        ids.push(radioFooterErrorIdentifier);
      }
      if (success) {
        ids.push(radioFooterSuccessIdentifier);
      }
      if (helperText && !error && !success) {
        ids.push(radioFooterHelperIdentifier);
      }
      return ids.length > 0 ? ids.join(' ') : undefined;
    }, [
      error,
      helperText,
      radioFooterErrorIdentifier,
      radioFooterHelperIdentifier,
      radioFooterSuccessIdentifier,
      success,
    ]);

    // Определяем, где показывать иконки
    const showLeftIcon =
      leftIcon &&
      (labelPosition === RadioButtonLabelPosition.RIGHT ||
        labelPosition === RadioButtonLabelPosition.NONE);
    const showRightIcon = rightIcon && labelPosition === RadioButtonLabelPosition.LEFT;

    const hasFooterMessages = Boolean(error || success || helperText || extraFooterText);

    const useFieldShell =
      Boolean(fieldLabel) ||
      Boolean(additionalLabel) ||
      Boolean(fullWidth) ||
      hasFooterMessages;

    const radioContent = (
      <RadioContainerWrapper
        data-label-position={labelPosition}
        data-full-width={fullWidth}
        disabled={disabled}
        readOnly={readOnly}
        className={clsx('ui-radio-button', useFieldShell ? undefined : className)}
        onKeyDown={handleKeyDown}
        onClick={handleLabelClick}
        tabIndex={disabled || readOnly ? -1 : 0}
      >
        <RadioContainer htmlFor={radioDomId} disabled={disabled} readOnly={readOnly}>
        <RadioInput
          ref={ref}
          id={radioDomId}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
            readOnly={readOnly}
            required={required || Boolean(formRequired)}
            aria-invalid={error ? true : undefined}
            aria-required={required || Boolean(formRequired) ? 'true' : undefined}
            aria-disabled={disabled ? 'true' : undefined}
            aria-describedby={ariaDescribedBy}
          {...props}
        />
          {showLeftIcon && <RadioIconContainer data-position="left">{leftIcon}</RadioIconContainer>}
          <RadioCircle
            checked={checked}
            disabled={disabled}
            readOnly={readOnly}
            size={size}
            variant={variant}
            error={error}
            status={status}
          >
            <RadioDot checked={checked} size={size} variant={variant} />
        </RadioCircle>
          {shouldShowLabel && (
            <RadioTextContainer data-label-position={labelPosition}>
              {label && (
                <RadioLabel disabled={disabled} readOnly={readOnly}>
                  {label}
                  {required && <RadioRequiredIndicator>*</RadioRequiredIndicator>}
                </RadioLabel>
              )}
              {extraText && (
                <RadioExtraText disabled={disabled} readOnly={readOnly}>
                  {extraText}
                </RadioExtraText>
              )}
            </RadioTextContainer>
          )}
          {showRightIcon && (
            <RadioIconContainer data-position="right">{rightIcon}</RadioIconContainer>
          )}
      </RadioContainer>
      </RadioContainerWrapper>
    );

    const radioChrome = (
      <RadioWrapper data-full-width={fullWidth}>
        {tooltip ? (
          <Tooltip content={tooltip} position={tooltipPosition}>
            {radioContent}
          </Tooltip>
        ) : (
          radioContent
        )}
        {error ? <ErrorText id={radioFooterErrorIdentifier}>{error}</ErrorText> : null}
        {success ? (
          <SuccessText id={radioFooterSuccessIdentifier}>Успешно</SuccessText>
        ) : null}
        {helperText && !error && !success ? (
          <HelperText id={radioFooterHelperIdentifier}>{helperText}</HelperText>
        ) : null}
        {extraFooterText ? <ExtraText>{extraFooterText}</ExtraText> : null}
      </RadioWrapper>
    );

    if (!useFieldShell) {
      return radioChrome;
    }

    return (
      <InputContainer fullWidth={fullWidth} className={clsx('ui-radio-button-field', className)}>
        {fieldLabel ? (
          <Label htmlFor={radioDomId}>
            {fieldLabel}
            {formRequired ? <RequiredIndicator>*</RequiredIndicator> : null}
          </Label>
        ) : null}

        {additionalLabel ? <AdditionalLabel>{additionalLabel}</AdditionalLabel> : null}

        {radioChrome}
      </InputContainer>
    );
  },
);

RadioButton.displayName = 'RadioButton';
