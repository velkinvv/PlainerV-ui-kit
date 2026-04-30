import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
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
import {
  getSelectChevronIconSize,
  getSelectNativeValueFromElement,
  getSelectStatus,
  getSelectUncontrolledDefaultValue,
} from './handlers';

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
      onSelectedChange,
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
      onInputChange: _onInputChange,
      searchFilter: _searchFilter,
      searchFormat: _searchFormat,
      clearInputValueAfterSelect: _clearInputValueAfterSelect,
      dropdownVariant: _dropdownVariant,
      menuMaxHeight: _menuMaxHeight,
      virtualScroll: _virtualScroll,
      dropdownInline: _dropdownInline,
      showMultiSelectionCountBadge: _showMultiSelectionCountBadge,
      showMultiSelectAll: _showMultiSelectAll,
      showCheckbox: _showCheckbox,
      moveSelectedOnTop: _moveSelectedOnTop,
      displayClearIcon: _displayClearIcon,
      onClearIconClick: _onClearIconClick,
      isMenuOpen: _isMenuOpen,
      onMenuOpenChange: _onMenuOpenChange,
      onOpenMenu: _onOpenMenu,
      onCloseMenu: _onCloseMenu,
      onScrollMenu: _onScrollMenu,
      onMenuLoadMore: _onMenuLoadMore,
      menuLoadMoreThresholdPx: _menuLoadMoreThresholdPx,
      menuHasMore: _menuHasMore,
      menuIsLoadingMore: _menuIsLoadingMore,
      openMenuIconProps,
      clearIconProps: _clearIconProps,
      renderTopPanel: _renderTopPanel,
      renderBottomPanel: _renderBottomPanel,
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

    const handleSelectFocus = useCallback(() => {
      setFocused(true);
    }, []);

    const handleSelectBlur = useCallback(() => {
      setFocused(false);
    }, []);

    const selectDisabled = disabled || readOnly || isLoading;

    /** Ref на нативный `select`: клик по шеврону программно открывает список (область справа не входит в bbox `select`). */
    const selectDomRef = useRef<HTMLSelectElement | null>(null);

    const assignSelectRef = useCallback(
      (element: HTMLSelectElement | null) => {
        selectDomRef.current = element;
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLSelectElement | null>).current = element;
        }
      },
      [ref],
    );

    const handleNativeChevronMouseDown = useCallback(
      (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (selectDisabled) {
          return;
        }
        const element = selectDomRef.current;
        element?.focus();
        element?.click();
      },
      [selectDisabled],
    );
    const isMultiple = Boolean(multiple);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e);
        onSelectedChange?.(getSelectNativeValueFromElement(e.currentTarget, isMultiple));
      },
      [onChange, onSelectedChange, isMultiple],
    );

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
        ref={assignSelectRef}
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
        onFocus={handleSelectFocus}
        onBlur={handleSelectBlur}
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

    // Скелетон только у поля; подписи остаются текстом (нет `<select>` для `htmlFor`)
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
          <SkeletonEffect size={size} fullWidth={fullWidth} role="presentation" />
        </InputContainer>
      );
    }

    const inner = (
      <>
        {selectElement}
        {isLoading ? <LoadingSpinner size={size} /> : null}
        <SelectChevronSlot aria-hidden onMouseDown={handleNativeChevronMouseDown}>
          <Icon
            name="IconPlainerChevronDown"
            size={chevronIconSize}
            color="currentColor"
            {...openMenuIconProps}
          />
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

        {tooltip ? (
          tooltipType === 'hint' ? (
            <Hint
              content={tooltip}
              placement={tooltipPosition as HintPosition}
              variant={HintVariant.DEFAULT}
            >
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
                onFocus={onFocus}
                onBlur={onBlur}
              >
                {inner}
              </InputWrapper>
            </Hint>
          ) : (
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
                onFocus={onFocus}
                onBlur={onBlur}
              >
                {inner}
              </InputWrapper>
            </Tooltip>
          )
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
            onFocus={onFocus}
            onBlur={onBlur}
          >
            {inner}
          </InputWrapper>
        )}

        {error ? <ErrorText>{error}</ErrorText> : null}
        {success ? <SuccessText>Успешно</SuccessText> : null}
        {helperText && !error && !success ? <HelperText>{helperText}</HelperText> : null}
        {extraText ? <ExtraText>{extraText}</ExtraText> : null}
      </InputContainer>
    );
  },
);

SelectNative.displayName = 'SelectNative';
