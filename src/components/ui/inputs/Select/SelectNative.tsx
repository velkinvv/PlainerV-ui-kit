import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { InputVariant, type SelectProps, type TooltipPosition } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';
import { Icon } from '../../Icon/Icon';
import { Tooltip } from '../../Tooltip/Tooltip';
import { Hint, HintVariant, type HintPosition } from '../../Hint/Hint';
import { useFormContext } from '../../../../contexts/FormContext';
import {
  InputContainer,
  Label,
  InputWrapper,
  HelperText,
  ErrorText,
  SuccessText,
  LoadingSpinner,
  SkeletonEffect,
  AdditionalLabel,
  ExtraText,
  RequiredIndicator,
} from '../shared';
import { StyledSelect, SelectChevronSlot } from './Select.style';
import { getSelectChevronIconSize, getSelectStatus, getSelectUncontrolledDefaultValue } from './handlers';

/**
 * Нативный `select` в оболочке полей ввода (`mode="native"`).
 * @param props - Пропсы `SelectProps` без `mode` (режим задаётся снаружи в `Select`).
 * @param ref - Ref на элемент `HTMLSelectElement`.
 */
export const SelectNative = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      placeholder,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      error,
      success,
      status,
      helperText,
      required = false,
      fullWidth = false,
      readOnly = false,
      disabled = false,
      skeleton = false,
      size = Size.SM,
      textAlign = 'left',
      isLoading = false,
      tooltip,
      tooltipType = 'tooltip',
      tooltipPosition = 'top',
      additionalLabel,
      extraText,
      className,
      name,
      id,
      multiple,
      mode: _mode,
      onValueChange: _onValueChange,
      searchable: _searchable,
      searchPlaceholder: _searchPlaceholder,
      searchValue: _searchValue,
      defaultSearchValue: _defaultSearchValue,
      onSearch: _onSearch,
      searchFilter: _searchFilter,
      dropdownVariant: _dropdownVariant,
      menuMaxHeight: _menuMaxHeight,
      dropdownInline: _dropdownInline,
      showMultiSelectionCountBadge: _showMultiSelectionCountBadge,
      ...rest
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const formContext = useFormContext();

    const currentStatus = useMemo(
      () => getSelectStatus(status, error, success),
      [status, error, success],
    );

    const chevronIconSize = useMemo(() => getSelectChevronIconSize(size), [size]);

    const isControlled = value !== undefined;
    const uncontrolledDefault = useMemo(
      () => getSelectUncontrolledDefaultValue(placeholder, defaultValue, multiple),
      [placeholder, defaultValue, multiple],
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLSelectElement>) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLSelectElement>) => {
        setFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e);
      },
      [onChange],
    );

    const selectDisabled = disabled || readOnly || isLoading;
    const isMultiple = Boolean(multiple);

    const controlledValueProps = isControlled
      ? multiple
        ? {
            value: Array.isArray(value) ? value : value != null ? [String(value)] : [],
          }
        : { value: String(value ?? '') }
      : uncontrolledDefault !== undefined
        ? { defaultValue: uncontrolledDefault }
        : {};

    const selectElement = (
      <StyledSelect
        ref={ref}
        id={id}
        name={name}
        multiple={isMultiple}
        disabled={selectDisabled}
        required={required}
        textAlign={textAlign}
        form={formContext?.formId}
        aria-invalid={error ? true : undefined}
        aria-required={required ? true : undefined}
        {...controlledValueProps}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      >
        {placeholder && !isMultiple ? (
          <option value="" disabled={required}>
            {placeholder}
          </option>
        ) : null}
        {options.map((opt, index) => (
          <option key={`${opt.value}-${index}`} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </StyledSelect>
    );

    if (skeleton) {
      return (
        <InputContainer fullWidth={fullWidth}>
          {label ? <SkeletonEffect size={size} $layout="compact" /> : null}
          <SkeletonEffect size={size} fullWidth={fullWidth} />
        </InputContainer>
      );
    }

    const inner = (
      <>
        {selectElement}
        {isLoading ? <LoadingSpinner size={size} /> : null}
        <SelectChevronSlot aria-hidden>
          <Icon name="IconPlainerChevronDown" size={chevronIconSize} color="currentColor" />
        </SelectChevronSlot>
      </>
    );

    return (
      <InputContainer fullWidth={fullWidth}>
        {label ? (
          <Label htmlFor={id}>
            {label}
            {required ? <RequiredIndicator>*</RequiredIndicator> : null}
          </Label>
        ) : null}

        {additionalLabel ? <AdditionalLabel>{additionalLabel}</AdditionalLabel> : null}

        {tooltip && tooltipType === 'tooltip' ? (
          <Tooltip content={tooltip} position={tooltipPosition as TooltipPosition}>
            <InputWrapper
              variant={InputVariant.SELECTOR}
              size={size}
              error={error}
              success={success}
              status={currentStatus}
              fullWidth={fullWidth}
              focused={focused}
              readOnly={readOnly}
              className={className}
            >
              {inner}
            </InputWrapper>
          </Tooltip>
        ) : (
          <InputWrapper
            variant={InputVariant.SELECTOR}
            size={size}
            error={error}
            success={success}
            status={currentStatus}
            fullWidth={fullWidth}
            focused={focused}
            readOnly={readOnly}
            className={className}
          >
            {inner}
          </InputWrapper>
        )}

        {tooltip && tooltipType === 'hint' ? (
          <Hint
            content={tooltip}
            placement={tooltipPosition as HintPosition}
            variant={HintVariant.DEFAULT}
          >
            {tooltip}
          </Hint>
        ) : null}

        {error ? <ErrorText>{error}</ErrorText> : null}
        {success ? <SuccessText>Успешно</SuccessText> : null}
        {helperText && !error && !success ? <HelperText>{helperText}</HelperText> : null}
        {extraText ? <ExtraText>{extraText}</ExtraText> : null}
      </InputContainer>
    );
  },
);

SelectNative.displayName = 'SelectNative';
