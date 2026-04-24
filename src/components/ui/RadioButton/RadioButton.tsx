import React, { forwardRef, useMemo, useRef } from 'react';
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
  RadioErrorText,
  RadioHelperText,
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
      readOnly = false,
      labelPosition = RadioButtonLabelPosition.RIGHT, // По умолчанию справа
      error,
      helperText,
      tooltip,
      tooltipPosition = TooltipPosition.TOP,
      required = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      status,
      className,
      ...props
    },
    ref,
  ) => {
    /** Подавляет второй click по input после клика по подписи (label → программный click на radio). */
    const suppressNextInputClickRef = useRef(false);
    const radioId = useMemo(() => `radio-${Math.random().toString(36).substr(2, 9)}`, []);
    const errorId = useMemo(() => `radio-error-${Math.random().toString(36).substr(2, 9)}`, []);
    const helperId = useMemo(() => `radio-helper-${Math.random().toString(36).substr(2, 9)}`, []);

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
      if (error) ids.push(errorId);
      if (helperText && !error) ids.push(helperId);
      return ids.length > 0 ? ids.join(' ') : undefined;
    }, [error, helperText, errorId, helperId]);

    // Определяем, где показывать иконки
    const showLeftIcon =
      leftIcon &&
      (labelPosition === RadioButtonLabelPosition.RIGHT ||
        labelPosition === RadioButtonLabelPosition.NONE);
    const showRightIcon = rightIcon && labelPosition === RadioButtonLabelPosition.LEFT;

    const radioContent = (
      <RadioContainerWrapper
        data-label-position={labelPosition}
        data-full-width={fullWidth}
        disabled={disabled}
        readOnly={readOnly}
        className={clsx('ui-radio-button', className)}
        onKeyDown={handleKeyDown}
        onClick={handleLabelClick}
        tabIndex={disabled || readOnly ? -1 : 0}
      >
        <RadioContainer htmlFor={radioId} disabled={disabled} readOnly={readOnly}>
        <RadioInput
          ref={ref}
          id={radioId}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
            readOnly={readOnly}
            aria-invalid={error ? 'true' : undefined}
            aria-required={required ? 'true' : undefined}
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

    return (
      <RadioWrapper data-full-width={fullWidth}>
        {tooltip ? (
          <Tooltip content={tooltip} position={tooltipPosition}>
            {radioContent}
          </Tooltip>
        ) : (
          radioContent
        )}
        {error && <RadioErrorText id={errorId}>{error}</RadioErrorText>}
        {helperText && !error && <RadioHelperText id={helperId}>{helperText}</RadioHelperText>}
      </RadioWrapper>
    );
  },
);

RadioButton.displayName = 'RadioButton';
