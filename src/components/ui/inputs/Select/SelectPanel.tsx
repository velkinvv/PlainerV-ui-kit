import React, {
  forwardRef,
  useCallback,
  useEffect,
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
  SelectTriggerInput,
  VisuallyHiddenSelect,
} from './Select.style';
import {
  applySelectPanelSelection,
  filterSelectItemsByQuery,
  getSelectChevronIconSize,
  getSelectMultiSelectedCount,
  getSelectPanelInitialValue,
  getSelectPanelTriggerText,
  getSelectStatus,
  getSelectTriggerShowsPlaceholder,
  mapSelectOptionsToDropdownItems,
} from './handlers';

/**
 * Селект с панелью как у `Dropdown` (`mode="select"` | `searchSelect`): скрытый нативный `select` для форм.
 * @param props - Пропсы панельного режима, включая `mode`.
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
      searchable,
      searchPlaceholder = 'Поиск...',
      searchValue,
      defaultSearchValue,
      onSearch,
      searchFilter,
      dropdownVariant = 'default',
      menuMaxHeight = 320,
      // Портал в `document.body` + `position: fixed`, как у выпадающих в Calendar — корректная позиция у триггера
      dropdownInline = false,
      showMultiSelectionCountBadge,
      mode = 'select',
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
    /** Режим «поиск в триггере» только для одиночного выбора; при `multiple` ведём себя как обычный `select` */
    const isSearchSelectMode = mode === 'searchSelect' && !isMultiple;
    const effectiveSearchable = isSearchSelectMode ? false : searchable !== false;

    const [searchSelectDraft, setSearchSelectDraft] = useState('');
    const isSearchQueryControlled = searchValue !== undefined;
    const effectiveSearchQuery = isSearchQueryControlled ? (searchValue ?? '') : searchSelectDraft;

    const setEffectiveSearchQuery = useCallback(
      (next: string) => {
        if (!isSearchQueryControlled) {
          setSearchSelectDraft(next);
        }
        onSearch?.(next);
      },
      [isSearchQueryControlled, onSearch],
    );

    // При открытии меню в searchSelect сбрасываем черновик (неконтролируемый режим), чтобы список начинался полным
    useEffect(() => {
      if (!isSearchSelectMode || !menuOpen || isSearchQueryControlled) {
        return;
      }
      setSearchSelectDraft('');
    }, [isSearchSelectMode, menuOpen, isSearchQueryControlled]);

    const [internalValue, setInternalValue] = useState<string | string[]>(() =>
      getSelectPanelInitialValue(options, defaultValue, isMultiple, placeholder),
    );

    const effectiveValue = isControlled ? (value as string | string[]) : internalValue;

    const currentStatus = useMemo(
      () => getSelectStatus(status, error, success),
      [status, error, success],
    );

    const dropdownItems = useMemo(() => mapSelectOptionsToDropdownItems(options), [options]);

    const dropdownItemsForMenu = useMemo(() => {
      if (!isSearchSelectMode || !menuOpen) {
        return dropdownItems;
      }
      return filterSelectItemsByQuery(effectiveSearchQuery, dropdownItems, searchFilter);
    }, [isSearchSelectMode, menuOpen, effectiveSearchQuery, dropdownItems, searchFilter]);

    const triggerText = useMemo(
      () => getSelectPanelTriggerText(options, effectiveValue, isMultiple, placeholder),
      [options, effectiveValue, isMultiple, placeholder],
    );

    const triggerShowsPlaceholder = useMemo(
      () => getSelectTriggerShowsPlaceholder(effectiveValue, isMultiple, placeholder),
      [effectiveValue, isMultiple, placeholder],
    );

    /** Текст в поле-триггере: при открытом меню — строка поиска, при закрытом — выбранная подпись */
    const searchSelectInputDisplay = useMemo(
      () => (menuOpen ? effectiveSearchQuery : triggerText),
      [menuOpen, effectiveSearchQuery, triggerText],
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
          {label ? <SkeletonEffect size={size} $layout="compact" /> : null}
          <SkeletonEffect size={size} fullWidth={fullWidth} />
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
        {isSearchSelectMode ? (
          <SelectTriggerInput
            type="text"
            id={triggerId}
            disabled={selectDisabled}
            value={searchSelectInputDisplay}
            placeholder={placeholder ?? searchPlaceholder}
            $isPlaceholder={Boolean(triggerShowsPlaceholder && !menuOpen)}
            textAlign={textAlign}
            aria-haspopup="listbox"
            aria-expanded={menuOpen}
            aria-autocomplete="list"
            aria-invalid={error ? true : undefined}
            aria-required={required ? true : undefined}
            autoComplete="off"
            onChange={(e) => {
              const v = e.target.value;
              setEffectiveSearchQuery(v);
              if (!menuOpen) {
                setMenuOpen(true);
              }
            }}
            onFocus={(e) => {
              setFocused(true);
              setMenuOpen(true);
              onFocus?.(e as unknown as React.FocusEvent<HTMLSelectElement>);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e as unknown as React.FocusEvent<HTMLSelectElement>);
            }}
          />
        ) : (
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
        )}
        {isLoading ? <LoadingSpinner size={size} /> : null}
        {showMultiCountBadge ? (
          <SelectMultiCountBadge $fieldSize={size} aria-hidden>
            {multiSelectedCount}
          </SelectMultiCountBadge>
        ) : null}
        <SelectChevronSlot
          aria-hidden
          onMouseDown={
            isSearchSelectMode
              ? (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!selectDisabled) {
                    setMenuOpen((open) => !open);
                  }
                }
              : undefined
          }
        >
          <SelectChevronFlip $isOpen={menuOpen}>
            <Icon name="IconPlainerChevronDown" size={chevronIconSize} color="currentColor" />
          </SelectChevronFlip>
        </SelectChevronSlot>
      </InputWrapper>
    );

    const dropdownBlock = (
      <SelectDropdownAnchor ref={containerRef} $fullWidth={fullWidth}>
        <Dropdown
          trigger={triggerControl}
          items={dropdownItemsForMenu}
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
          triggerWrapClickToggle={!isSearchSelectMode}
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
