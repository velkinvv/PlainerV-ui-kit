import React, {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useId,
} from 'react';
import {
  InputVariant,
  type DropdownMenuItemValue,
  type SelectProps,
  type TooltipPosition,
} from '../../../../types/ui';
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
import { Dropdown } from '../../Dropdown/Dropdown';
import { normalizeDropdownValue } from '../../Dropdown/handlers';
import {
  SelectChevronFlip,
  SelectChevronSlot,
  SelectDropdownAnchor,
  SelectMultiCountBadge,
  SelectPanelRoot,
  SelectTriggerButton,
  VisuallyHiddenSelect,
} from './Select.style';
import {
  applySelectPanelSelection,
  getSelectChevronIconSize,
  getSelectMultiSelectedCount,
  getSelectPanelInitialValue,
  getSelectPanelTriggerText,
  getSelectStatus,
  getSelectTriggerShowsPlaceholder,
  mapSelectOptionsToDropdownItems,
} from './handlers';

/**
 * Селект с панелью как у `Dropdown` (`mode="select"`): поиск, мультивыбор, скрытый нативный `select` для форм.
 * @param props - Пропсы `SelectProps` без `mode`.
 * @param ref - Ref на скрытый `HTMLSelectElement` для форм и тестов.
 */
export const SelectPanel = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      placeholder,
      value,
      defaultValue,
      onChange,
      onValueChange,
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
      size = Size.MD,
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
      searchable,
      searchPlaceholder = 'Поиск...',
      searchValue,
      defaultSearchValue,
      onSearch,
      searchFilter,
      dropdownVariant = 'default',
      menuMaxHeight = 320,
      dropdownInline = true,
      showMultiSelectionCountBadge,
      mode: _mode,
      ...rest
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const formContext = useFormContext();
    const containerRef = useRef<HTMLDivElement>(null);
    const hiddenSelectRef = useRef<HTMLSelectElement | null>(
      null,
    ) as React.MutableRefObject<HTMLSelectElement | null>;
    const [menuWidth, setMenuWidth] = useState<number | undefined>(undefined);
    const autoTriggerId = useId();
    const triggerId = id ?? autoTriggerId;
    const isMultiple = Boolean(multiple);
    const isControlled = value !== undefined;
    const effectiveSearchable = searchable !== false;

    const [internalValue, setInternalValue] = useState<string | string[]>(() =>
      getSelectPanelInitialValue(options, defaultValue, isMultiple, placeholder),
    );

    const effectiveValue = isControlled ? (value as string | string[]) : internalValue;

    const currentStatus = useMemo(
      () => getSelectStatus(status, error, success),
      [status, error, success],
    );

    const dropdownItems = useMemo(() => mapSelectOptionsToDropdownItems(options), [options]);

    const triggerText = useMemo(
      () => getSelectPanelTriggerText(options, effectiveValue, isMultiple, placeholder),
      [options, effectiveValue, isMultiple, placeholder],
    );

    const triggerShowsPlaceholder = useMemo(
      () => getSelectTriggerShowsPlaceholder(effectiveValue, isMultiple, placeholder),
      [effectiveValue, isMultiple, placeholder],
    );

    const chevronIconSize = useMemo(() => getSelectChevronIconSize(size), [size]);

    const multiSelectedCount = useMemo(
      () => (isMultiple ? getSelectMultiSelectedCount(effectiveValue) : 0),
      [isMultiple, effectiveValue],
    );

    const showMultiCountBadge =
      isMultiple &&
      showMultiSelectionCountBadge !== false &&
      multiSelectedCount > 0;

    const dropdownValue = useMemo(
      () => normalizeDropdownValue(effectiveValue, isMultiple),
      [effectiveValue, isMultiple],
    );

    useLayoutEffect(() => {
      if (menuOpen && containerRef.current) {
        setMenuWidth(Math.round(containerRef.current.getBoundingClientRect().width));
      }
    }, [menuOpen, fullWidth]);

    const setRefs = useCallback(
      (el: HTMLSelectElement | null) => {
        hiddenSelectRef.current = el;
        if (typeof ref === 'function') {
          ref(el);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLSelectElement | null>).current = el;
        }
      },
      [ref],
    );

    const selectDisabled = disabled || readOnly || isLoading;

    const handleDropdownSelect = useCallback(
      (selected?: DropdownMenuItemValue) => {
        const next = applySelectPanelSelection(
          effectiveValue,
          selected === undefined || selected === null ? undefined : String(selected),
          isMultiple,
        );
        if (!isControlled) {
          setInternalValue(next);
        }
        onValueChange?.(next as string | string[]);
        queueMicrotask(() => {
          const el = hiddenSelectRef.current;
          if (el && onChange) {
            onChange({
              target: el,
              currentTarget: el,
            } as React.ChangeEvent<HTMLSelectElement>);
          }
        });
      },
      [effectiveValue, isControlled, isMultiple, onChange, onValueChange],
    );

    const hiddenSelectValue = useMemo(() => {
      if (isMultiple) {
        return Array.isArray(effectiveValue)
          ? effectiveValue
          : effectiveValue
            ? [String(effectiveValue)]
            : [];
      }
      return Array.isArray(effectiveValue) ? '' : String(effectiveValue ?? '');
    }, [effectiveValue, isMultiple]);

    if (skeleton) {
      return (
        <InputContainer fullWidth={fullWidth}>
          {label ? <SkeletonEffect size={size} /> : null}
          <SkeletonEffect size={size} />
        </InputContainer>
      );
    }

    const triggerControl = (
      <InputWrapper
        variant={InputVariant.SELECTOR}
        size={size}
        error={error}
        success={success}
        status={currentStatus}
        fullWidth={fullWidth}
        focused={focused || menuOpen}
        readOnly={readOnly}
        className={className}
      >
        <SelectTriggerButton
          type="button"
          id={triggerId}
          disabled={selectDisabled}
          $isPlaceholder={triggerShowsPlaceholder}
          textAlign={textAlign}
          aria-haspopup="listbox"
          aria-expanded={menuOpen}
          aria-invalid={error ? true : undefined}
          aria-required={required ? true : undefined}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e as unknown as React.FocusEvent<HTMLSelectElement>);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e as unknown as React.FocusEvent<HTMLSelectElement>);
          }}
        >
          {triggerText}
        </SelectTriggerButton>
        {isLoading ? <LoadingSpinner size={size} /> : null}
        {showMultiCountBadge ? (
          <SelectMultiCountBadge $fieldSize={size} aria-hidden>
            {multiSelectedCount}
          </SelectMultiCountBadge>
        ) : null}
        <SelectChevronSlot aria-hidden>
          <SelectChevronFlip $isOpen={menuOpen}>
            <Icon name="IconPlainerArrowDown" size={chevronIconSize} />
          </SelectChevronFlip>
        </SelectChevronSlot>
      </InputWrapper>
    );

    const dropdownBlock = (
      <SelectDropdownAnchor ref={containerRef} $fullWidth={fullWidth}>
        <Dropdown
          trigger={triggerControl}
          items={dropdownItems}
          value={dropdownValue}
          onSelect={handleDropdownSelect}
          disabled={selectDisabled}
          size={size}
          variant={dropdownVariant}
          multiSelection={isMultiple}
          disableSelectedOptionHighlight={isMultiple}
          searchable={effectiveSearchable}
          searchPlaceholder={searchPlaceholder}
          searchValue={searchValue}
          defaultSearchValue={defaultSearchValue}
          onSearch={onSearch}
          searchFilter={searchFilter}
          menuMaxHeight={menuMaxHeight}
          menuWidth={menuWidth}
          inline={dropdownInline}
          isMenuOpen={menuOpen}
          onMenuOpenChange={setMenuOpen}
          disableAutoFocus
          positioningMode="autoFlip"
        />
      </SelectDropdownAnchor>
    );

    const hiddenNative = (
      <VisuallyHiddenSelect
        ref={setRefs}
        id={id ? `${id}-native` : undefined}
        name={name}
        form={formContext?.formId}
        multiple={isMultiple}
        required={required}
        disabled={selectDisabled}
        onChange={onChange}
        {...rest}
        value={hiddenSelectValue as string | string[]}
        tabIndex={-1}
        aria-hidden
      >
        {placeholder && !isMultiple ? (
          <option value="" disabled={required}>
            {placeholder}
          </option>
        ) : null}
        {options.map((opt, index) => (
          <option key={`${opt.value}-${index}`} value={opt.value} disabled={opt.disabled}>
            {typeof opt.label === 'string' || typeof opt.label === 'number' ? opt.label : opt.value}
          </option>
        ))}
      </VisuallyHiddenSelect>
    );

    return (
      <SelectPanelRoot fullWidth={fullWidth}>
        {label ? (
          <Label htmlFor={triggerId}>
            {label}
            {required ? <RequiredIndicator>*</RequiredIndicator> : null}
          </Label>
        ) : null}

        {additionalLabel ? <AdditionalLabel>{additionalLabel}</AdditionalLabel> : null}

        {tooltip && tooltipType === 'tooltip' ? (
          <Tooltip content={tooltip} position={tooltipPosition as TooltipPosition}>
            {dropdownBlock}
          </Tooltip>
        ) : (
          dropdownBlock
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

        {hiddenNative}
      </SelectPanelRoot>
    );
  },
);

SelectPanel.displayName = 'SelectPanel';
