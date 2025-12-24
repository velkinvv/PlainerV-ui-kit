import React, { useMemo } from 'react';
import styled from 'styled-components';
import { clsx } from 'clsx';
import type { RadioButtonGroupProps } from '../../../types/ui';
import { RadioButtonGroupOrientation, TooltipPosition } from '../../../types/ui';
import { RadioButton } from './RadioButton';
import { Tooltip } from '../Tooltip/Tooltip';
import {
  RadioErrorText,
  RadioHelperText,
  RadioRequiredIndicator,
} from './RadioButton.style';

/**
 * Контейнер для группы радиокнопок
 */
const GroupContainer = styled.div<{
  'data-orientation'?: RadioButtonGroupOrientation;
  'data-full-width'?: boolean;
}>`
  display: flex;
  flex-direction: ${props => {
    const orientation = props['data-orientation'];
    return orientation === RadioButtonGroupOrientation.VERTICAL ? 'column' : 'row';
  }};
  gap: ${props => {
    const orientation = props['data-orientation'];
    const theme = props.theme;
    return orientation === RadioButtonGroupOrientation.VERTICAL
      ? theme.radioButton.spacing.groupVertical
      : theme.radioButton.spacing.groupHorizontal;
  }};
  flex-wrap: wrap;
  width: ${props => {
    const fullWidth = props['data-full-width'];
    return fullWidth ? '100%' : 'auto';
  }};
`;

const GroupWrapper = styled.div<{ 'data-full-width'?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${props => {
    const fullWidth = props['data-full-width'];
    return fullWidth ? '100%' : 'auto';
  }};
`;

/**
 * Лейбл для группы радиокнопок
 */
const GroupLabel = styled.label`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.radioButton.typography.label.fontFamily};
  font-size: ${({ theme }) => theme.radioButton.typography.label.fontSize};
  font-weight: 500;
  color: ${({ theme }) => theme.radioButton.typography.label.color};
  margin-bottom: ${({ theme }) => theme.radioButton.spacing.groupLabel};
`;

const GroupErrorText = styled(RadioErrorText)`
  margin-top: ${({ theme }) => theme.radioButton.spacing.errorText};
`;

const GroupHelperText = styled(RadioHelperText)`
  margin-top: ${({ theme }) => theme.radioButton.spacing.helperText};
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
    disabled = false,
    readOnly = false,
    orientation = RadioButtonGroupOrientation.HORIZONTAL,
    name: groupName,
    size,
    variant,
    labelPosition,
    error,
    helperText,
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

    // Генерируем уникальные ID для ошибок и подсказок
    const groupErrorId = useMemo(() => `radio-group-error-${Math.random().toString(36).substr(2, 9)}`, []);
    const groupHelperId = useMemo(() => `radio-group-helper-${Math.random().toString(36).substr(2, 9)}`, []);
    const groupLabelId = useMemo(() => `radio-group-label-${Math.random().toString(36).substr(2, 9)}`, []);

    // Определяем, является ли error массивом или строкой
    const isErrorArray = Array.isArray(error);
    const groupError = isErrorArray ? undefined : error;
    const errorsArray = isErrorArray ? error : undefined;

    // Формируем aria-describedby для группы
    const ariaDescribedBy = useMemo(() => {
      const ids: string[] = [];
      if (groupError) ids.push(groupErrorId);
      if (helperText && !groupError) ids.push(groupHelperId);
      return ids.length > 0 ? ids.join(' ') : undefined;
    }, [groupError, helperText, groupErrorId, groupHelperId]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled && !readOnly && onChange) {
        onChange(event);
      }
    };

    const handleClick = (event: React.MouseEvent<HTMLLabelElement>, optionValue: string, option: typeof options[0]) => {
      if (!disabled && !readOnly && onClick) {
        onClick(optionValue, option);
      }
    };

    const labelContent = label && (
      <GroupLabel id={groupLabelId}>
        {label}
        {required && <RadioRequiredIndicator>*</RadioRequiredIndicator>}
      </GroupLabel>
    );

    return (
      <GroupWrapper
        data-full-width={fullWidth}
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
        <GroupContainer
          data-orientation={orientation}
          data-full-width={fullWidth}
          role="radiogroup"
          aria-labelledby={label ? groupLabelId : undefined}
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
                onClick={e => handleClick(e, optionValue, option)}
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
        {groupError && <GroupErrorText id={groupErrorId}>{groupError}</GroupErrorText>}
        {helperText && !groupError && <GroupHelperText id={groupHelperId}>{helperText}</GroupHelperText>}
      </GroupWrapper>
    );
  },
);

RadioButtonGroup.displayName = 'RadioButtonGroup';
