import React, { useId, useMemo } from 'react';
import styled from 'styled-components';
import { clsx } from 'clsx';
import type { RadioButtonGroupProps } from '../../../types/ui';
import { RadioButtonGroupOrientation, TooltipPosition } from '../../../types/ui';
import { RadioButton } from './RadioButton';
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

/**
 * Контейнер для группы радиокнопок
 */
const GroupContainer = styled.div<{
  'data-orientation'?: RadioButtonGroupOrientation;
  'data-full-width'?: boolean;
}>`
  display: flex;
  flex-direction: ${(props) => {
    const orientation = props['data-orientation'];
    return orientation === RadioButtonGroupOrientation.VERTICAL ? 'column' : 'row';
  }};
  gap: ${(props) => {
    const orientation = props['data-orientation'];
    const theme = props.theme;
    return orientation === RadioButtonGroupOrientation.VERTICAL
      ? theme.radioButton.spacing.groupVertical
      : theme.radioButton.spacing.groupHorizontal;
  }};
  flex-wrap: wrap;
  width: ${(props) => {
    const fullWidth = props['data-full-width'];
    return fullWidth ? '100%' : 'auto';
  }};
`;

/**
 * Компонент группы радиокнопок
 * Управляет группой радиокнопок с общими настройками
 *
 * @example Базовое использование
 * ```tsx
 * const [value, setValue] = useState('option1');
 *
 * const options = [
 *   { value: 'option1', label: 'Опция 1' },
 *   { value: 'option2', label: 'Опция 2' },
 *   { value: 'option3', label: 'Опция 3' },
 * ];
 *
 * <RadioButtonGroup
 *   options={options}
 *   value={value}
 *   onChange={e => setValue(e.target.value)}
 *   label="Выберите опцию"
 * />
 * ```
 *
 * @example С ошибкой и вспомогательным текстом
 * ```tsx
 * <RadioButtonGroup
 *   options={options}
 *   value={value}
 *   onChange={e => setValue(e.target.value)}
 *   label="Выберите опцию"
 *   error="Пожалуйста, выберите одну из опций"
 *   helperText="Вспомогательный текст для группы"
 *   required
 * />
 * ```
 *
 * @example С индивидуальными ошибками для каждой опции
 * ```tsx
 * <RadioButtonGroup
 *   options={options}
 *   value={value}
 *   onChange={e => setValue(e.target.value)}
 *   label="Выберите опцию"
 *   error={['Ошибка для опции 1', '', 'Ошибка для опции 3']}
 * />
 * ```
 *
 * Под блоком опций поддерживаются тексты как у `Input`: `error` → `success` («Успешно») →
 * `helperText` (скрывается при ошибке или успехе) → `extraText`.
 *
 * @example С tooltip и fullWidth
 * ```tsx
 * <RadioButtonGroup
 *   options={options}
 *   value={value}
 *   onChange={e => setValue(e.target.value)}
 *   label="Выберите опцию"
 *   tooltip="Подсказка для группы"
 *   tooltipPosition={TooltipPosition.TOP}
 *   fullWidth
 * />
 * ```
 */
export const RadioButtonGroup = React.memo<RadioButtonGroupProps>(
  ({
    options,
    value,
    onChange,
    onClick,
    label,
    additionalLabel,
    disabled = false,
    readOnly = false,
    orientation = RadioButtonGroupOrientation.HORIZONTAL,
    name: groupName,
    size,
    variant,
    labelPosition,
    error,
    helperText,
    success = false,
    extraText,
    required = false,
    tooltip,
    tooltipPosition = TooltipPosition.TOP,
    fullWidth = false,
    className,
    ...props
  }) => {
    // Генерируем уникальное имя для группы, если не указано
    const name = useMemo(() => {
      return groupName || `radio-group-${Math.random().toString(36).substr(2, 9)}`;
    }, [groupName]);

    // Стабильные id для связи radiogroup с подписью и нижними текстами (ошибка / успех / helper)
    const groupLabelHeadingId = useId();
    const groupSecondaryCaptionId = useId();
    const groupErrorDomId = useId();
    const groupSuccessDomId = useId();
    const groupHelperDomId = useId();

    // Определяем, является ли error массивом или строкой
    const isErrorArray = Array.isArray(error);
    const groupError = isErrorArray ? undefined : error;
    const errorsArray = isErrorArray ? error : undefined;

    // Формируем aria-describedby для группы
    const ariaDescribedBy = useMemo(() => {
      const ids: string[] = [];
      if (groupError) {
        ids.push(groupErrorDomId);
      }
      if (success) {
        ids.push(groupSuccessDomId);
      }
      if (helperText && !groupError && !success) {
        ids.push(groupHelperDomId);
      }
      return ids.length > 0 ? ids.join(' ') : undefined;
    }, [groupError, success, helperText, groupErrorDomId, groupHelperDomId, groupSuccessDomId]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled && !readOnly && onChange) {
        onChange(event);
      }
    };

    const handleClick = (
      event: React.MouseEvent<HTMLLabelElement>,
      optionValue: string,
      option: (typeof options)[0],
    ) => {
      if (!disabled && !readOnly && onClick) {
        onClick(optionValue, option);
      }
    };

    const labelledByTokensForRadiogroup: string[] = [];
    if (label) {
      labelledByTokensForRadiogroup.push(groupLabelHeadingId);
    }
    if (additionalLabel) {
      labelledByTokensForRadiogroup.push(groupSecondaryCaptionId);
    }
    const radiogroupAriaLabelledBy =
      labelledByTokensForRadiogroup.length > 0
        ? labelledByTokensForRadiogroup.join(' ')
        : undefined;

    const labelContent = label ? (
      <Label id={groupLabelHeadingId}>
        {label}
        {required ? <RequiredIndicator>*</RequiredIndicator> : null}
      </Label>
    ) : null;

    return (
      <InputContainer
        fullWidth={fullWidth}
        className={clsx('ui-radio-button-group', className)}
        {...props}
      >
        {tooltip && label ? (
          <Tooltip content={tooltip} position={tooltipPosition}>
            {labelContent}
          </Tooltip>
        ) : (
          labelContent
        )}
        {additionalLabel ? (
          <AdditionalLabel id={groupSecondaryCaptionId}>{additionalLabel}</AdditionalLabel>
        ) : null}
        <GroupContainer
          data-orientation={orientation}
          data-full-width={fullWidth}
          role="radiogroup"
          aria-labelledby={radiogroupAriaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-required={required ? 'true' : undefined}
          aria-disabled={disabled ? 'true' : undefined}
        >
          {options.map((option, index) => {
            const isChecked = value === option.value;
            const optionValue = option.value;
            // Получаем ошибку для конкретной опции, если error - массив
            const optionError = errorsArray ? errorsArray[index] : undefined;

            return (
              <RadioButton
                key={optionValue}
                checked={isChecked}
                onChange={handleChange}
                onClick={(e) => handleClick(e, optionValue, option)}
                name={name}
                value={optionValue}
                disabled={disabled || option.disabled}
                readOnly={readOnly || option.readOnly}
                size={size || option.size}
                variant={variant || option.variant}
                labelPosition={labelPosition || option.labelPosition}
                label={option.label}
                extraText={option.extraText}
                error={optionError}
                required={required}
                className={option.className}
              />
            );
          })}
        </GroupContainer>
        {groupError ? <ErrorText id={groupErrorDomId}>{groupError}</ErrorText> : null}

        {success ? <SuccessText id={groupSuccessDomId}>Успешно</SuccessText> : null}

        {helperText && !groupError && !success ? (
          <HelperText id={groupHelperDomId}>{helperText}</HelperText>
        ) : null}

        {extraText ? <ExtraText>{extraText}</ExtraText> : null}
      </InputContainer>
    );
  },
);

RadioButtonGroup.displayName = 'RadioButtonGroup';
