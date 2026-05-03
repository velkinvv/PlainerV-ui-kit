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
  BadgeVariant,
  InputVariant,
  type DropdownMenuItemProps,
  type DropdownMenuItemValue,
  type DropdownTopPanelProps,
  type SelectProps,
  type TooltipPosition,
} from '../../../../types/ui';
import { IconSize, Size } from '../../../../types/sizes';
import { getClearIconSizeForInputField } from '../../../../handlers/iconHandlers';
import { Badge } from '../../Badge/Badge';
import { Icon } from '../../Icon/Icon';
import { Tooltip } from '../../Tooltip/Tooltip';
import { Hint, HintVariant, type HintPosition } from '../../Hint/Hint';
import { useFormContext } from '../../../../contexts/FormContext';
import {
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
import { Dropdown, DropdownMenuFromDefinitions } from '../../Dropdown';
import { normalizeDropdownValue } from '../../Dropdown/handlers';
import { findDropdownMenuItemByValueInDefinitions } from '../../../../handlers/dropdownTreeSelectionHandlers';
import {
  SelectChevronFlip,
  SelectChevronSlot,
  SelectDropdownAnchor,
  SelectMultiChip,
  SelectMultiChipLabel,
  SelectMultiChipRemove,
  SelectMultiClearAllBtn,
  SelectMultiCountBadgeSlot,
  SelectMultiPlaceholder,
  SelectMultiSelectAllFooterBtn,
  SelectMultiTriggerRoot,
  SelectPanelRoot,
  SelectTriggerButton,
  SelectTriggerInput,
  VisuallyHiddenSelect,
} from './Select.style';
import {
  applySelectPanelSelection,
  applySelectPanelTreeSelection,
  filterSelectItemsByQuery,
  flattenNativeSelectOptions,
  getSelectPanelMinMenuWidthPx,
  getMultiSelectChipEntries,
  getSelectableEnabledOptionValues,
  getSelectChevronIconSize,
  getSelectMultiClearAllIconSize,
  getSelectMultiSelectedCount,
  getSelectPanelInitialValue,
  getSelectPanelTriggerText,
  getSelectStatus,
  getSelectTriggerShowsPlaceholder,
  hasNestedSelectOptions,
  mapSelectOptionsToDropdownItems,
  reorderSelectDropdownItemsSelectedFirst,
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
      searchable,
      searchPlaceholder = 'Поиск...',
      searchValue,
      defaultSearchValue,
      onSearch,
      onInputChange,
      searchFilter,
      searchFormat,
      clearInputValueAfterSelect = false,
      dropdownVariant = 'default',
      menuMaxHeight = 320,
      virtualScroll,
      // Портал в `document.body` + `position: fixed`, как у выпадающих в Calendar — корректная позиция у триггера
      dropdownInline = false,
      renderTopPanel,
      renderBottomPanel,
      showMultiSelectionCountBadge,
      showMultiSelectAll,
      showCheckbox,
      treeExpandable,
      treeDefaultExpanded,
      treeExpandedKeys,
      onTreeExpandedKeysChange,
      moveSelectedOnTop,
      displayClearIcon = false,
      onClearIconClick,
      isMenuOpen,
      onMenuOpenChange,
      onOpenMenu,
      onCloseMenu,
      onScrollMenu,
      onMenuLoadMore,
      menuLoadMoreThresholdPx,
      menuHasMore,
      menuIsLoadingMore,
      openMenuIconProps,
      clearIconProps,
      mode = 'select',
      ...rest
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const [internalMenuOpen, setInternalMenuOpen] = useState(false);
    const isMenuOpenControlled = isMenuOpen !== undefined;
    const menuOpen = isMenuOpenControlled ? Boolean(isMenuOpen) : internalMenuOpen;

    /** Открытие/закрытие панели: контролируемый режим (`isMenuOpen` + `onMenuOpenChange`) или внутренний state. */
    const handleMenuOpenChange = useCallback(
      (open: boolean) => {
        if (isMenuOpenControlled) {
          if (isMenuOpen === open) {
            return;
          }
          onMenuOpenChange?.(open);
          if (open) {
            onOpenMenu?.();
          } else {
            onCloseMenu?.();
          }
          return;
        }
        setInternalMenuOpen((prev) => {
          if (prev === open) {
            return prev;
          }
          if (open) {
            onOpenMenu?.();
          } else {
            onCloseMenu?.();
          }
          return open;
        });
      },
      [isMenuOpenControlled, isMenuOpen, onMenuOpenChange, onOpenMenu, onCloseMenu],
    );

    /** Переключение открытости меню (контролируемый и неконтролируемый режимы). */
    const toggleMenuOpen = useCallback(() => {
      handleMenuOpenChange(!menuOpen);
    }, [menuOpen, handleMenuOpenChange]);
    const hasNestedTreeOptions = useMemo(() => hasNestedSelectOptions(options), [options]);

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
    /** Режим «поиск в триггере» (`searchSelect`): фильтр в поле; при `multiple` при открытом меню — то же поле, при закрытом — чипы как в `select` */
    const isSearchSelectMode = mode === 'searchSelect';
    const effectiveSearchable = isSearchSelectMode ? false : searchable !== false;

    const [searchSelectDraft, setSearchSelectDraft] = useState('');
    const isSearchQueryControlled = searchValue !== undefined;
    const effectiveSearchQuery = isSearchQueryControlled ? (searchValue ?? '') : searchSelectDraft;

    const setEffectiveSearchQuery = useCallback(
      (next: string) => {
        if (!isSearchQueryControlled) {
          setSearchSelectDraft(next);
        }
        onSearch?.(next, searchFormat);
      },
      [isSearchQueryControlled, onSearch, searchFormat],
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

    /**
     * Полный узел дерева по `value` для чекбокса родителя (панель может отдавать урезанные `nestedItems`).
     * TODO(tree-multiselect): снятие по чекбоксу родителя при частичном выборе детей — доработать вместе с `DropdownMenuItem`;
     * пока оставлена пометка, что это надо исправить позже.
     */
    const lookupTreeMenuItemByValue = useCallback(
      (itemValue: string) => findDropdownMenuItemByValueInDefinitions(dropdownItems, itemValue),
      [dropdownItems],
    );

    const dropdownItemsForMenu = useMemo(() => {
      if (!isSearchSelectMode || !menuOpen) {
        return dropdownItems;
      }
      return filterSelectItemsByQuery(
        effectiveSearchQuery,
        dropdownItems,
        searchFilter,
        searchFormat,
      );
    }, [
      isSearchSelectMode,
      menuOpen,
      effectiveSearchQuery,
      dropdownItems,
      searchFilter,
      searchFormat,
    ]);

    /** Порядок выбранных значений в мультиселекте (для чипов и сортировки списка). */
    const selectedValuesArray = useMemo((): string[] => {
      if (!isMultiple) {
        return [];
      }
      return Array.isArray(effectiveValue)
        ? effectiveValue
        : effectiveValue
          ? [String(effectiveValue)]
          : [];
    }, [isMultiple, effectiveValue]);

    const multiChipEntries = useMemo(
      () => (isMultiple ? getMultiSelectChipEntries(options, selectedValuesArray) : []),
      [isMultiple, options, selectedValuesArray],
    );

    const selectableEnabledValues = useMemo(
      () => (isMultiple ? getSelectableEnabledOptionValues(options) : []),
      [isMultiple, options],
    );

    const allSelectableSelected = useMemo(() => {
      if (!isMultiple || selectableEnabledValues.length === 0) {
        return false;
      }
      return selectableEnabledValues.every((v) => selectedValuesArray.includes(v));
    }, [isMultiple, selectableEnabledValues, selectedValuesArray]);

    /** Поднятие выбранных вверх: для `multiple` по умолчанию включено (как раньше); для single — только если явно `moveSelectedOnTop`. Для дерева отключено. */
    const effectiveMoveSelectedOnTop = (moveSelectedOnTop ?? isMultiple) && !hasNestedTreeOptions;

    const dropdownItemsForDropdown = useMemo(() => {
      const singleValueRaw = Array.isArray(effectiveValue) ? effectiveValue[0] : effectiveValue;
      const selectedOrderForReorder: string[] = isMultiple
        ? selectedValuesArray
        : singleValueRaw !== undefined && singleValueRaw !== null && String(singleValueRaw) !== ''
          ? [String(singleValueRaw)]
          : [];

      const maybeMoveSelectedFirst = (items: DropdownMenuItemProps[]) => {
        if (!effectiveMoveSelectedOnTop || selectedOrderForReorder.length === 0) {
          return items;
        }
        return reorderSelectDropdownItemsSelectedFirst(items, selectedOrderForReorder);
      };

      if (isSearchSelectMode && menuOpen) {
        return maybeMoveSelectedFirst(dropdownItemsForMenu);
      }
      if (isMultiple) {
        return maybeMoveSelectedFirst(dropdownItems);
      }
      return maybeMoveSelectedFirst(dropdownItemsForMenu);
    }, [
      effectiveMoveSelectedOnTop,
      isSearchSelectMode,
      menuOpen,
      dropdownItemsForMenu,
      isMultiple,
      dropdownItems,
      selectedValuesArray,
      effectiveValue,
    ]);

    const triggerText = useMemo(
      () => getSelectPanelTriggerText(options, effectiveValue, isMultiple, placeholder),
      [options, effectiveValue, isMultiple, placeholder],
    );

    const triggerShowsPlaceholder = useMemo(
      () => getSelectTriggerShowsPlaceholder(effectiveValue, isMultiple, placeholder),
      [effectiveValue, isMultiple, placeholder],
    );

    /** Текст в поле-триггере searchSelect: при открытом меню — строка фильтра, при закрытом (только single) — выбранная подпись */
    const searchSelectInputDisplay = useMemo(
      () => (menuOpen ? effectiveSearchQuery : triggerText),
      [menuOpen, effectiveSearchQuery, triggerText],
    );

    /** В поле фильтра searchSelect стиль плейсхолдера: вне меню — пустой выбор; в меню — пустая строка поиска */
    const searchSelectInputPlaceholderStyle = useMemo(() => {
      if (!menuOpen) {
        return Boolean(triggerShowsPlaceholder);
      }
      return !effectiveSearchQuery.trim();
    }, [menuOpen, triggerShowsPlaceholder, effectiveSearchQuery]);

    /** Показывать `SelectTriggerInput` (single всегда; multiple + searchSelect — только при открытом меню). */
    const isSearchSelectInputTrigger = isSearchSelectMode && (!isMultiple || menuOpen);

    const chevronIconSize = useMemo(() => getSelectChevronIconSize(size), [size]);

    const multiSelectedCount = useMemo(
      () => (isMultiple ? getSelectMultiSelectedCount(effectiveValue) : 0),
      [isMultiple, effectiveValue],
    );

    const showMultiCountBadge =
      isMultiple && showMultiSelectionCountBadge !== false && multiSelectedCount > 0;

    const dropdownValue = useMemo(
      () => normalizeDropdownValue(effectiveValue, isMultiple),
      [effectiveValue, isMultiple],
    );

    useLayoutEffect(() => {
      if (menuOpen && containerRef.current) {
        const measuredTriggerWidthPx = Math.round(
          containerRef.current.getBoundingClientRect().width,
        );
        const minimumMenuWidthFromOptionsPx = getSelectPanelMinMenuWidthPx(options);
        setMenuWidth(Math.max(measuredTriggerWidthPx, minimumMenuWidthFromOptionsPx));
      }
    }, [menuOpen, fullWidth, options]);

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

    /** Синхронизация состояния, скрытого `select` и колбэков формы после смены значения. */
    const commitPanelValue = useCallback(
      (next: string | string[]) => {
        if (!isControlled) {
          setInternalValue(next);
        }
        onValueChange?.(next as string | string[]);
        onSelectedChange?.(next as string | string[]);
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
      [isControlled, onChange, onValueChange, onSelectedChange],
    );

    const handleDropdownSelect = useCallback(
      (selected?: DropdownMenuItemValue, event?: React.MouseEvent<HTMLElement>) => {
        const toggledValue =
          selected === undefined || selected === null ? undefined : String(selected);
        const checkboxChecked = (event as { dropdownTreeCheckboxChecked?: boolean } | undefined)
          ?.dropdownTreeCheckboxChecked;

        if (isMultiple && hasNestedTreeOptions) {
          const nextTree = applySelectPanelTreeSelection(
            effectiveValue,
            toggledValue,
            dropdownItemsForDropdown,
            checkboxChecked,
            dropdownItems,
          );
          commitPanelValue(nextTree);
        } else {
          const next = applySelectPanelSelection(effectiveValue, toggledValue, isMultiple);
          commitPanelValue(next);
        }
        // Очистка строки фильтра в триггере после выбора (только searchSelect)
        if (isSearchSelectMode && clearInputValueAfterSelect) {
          setEffectiveSearchQuery('');
        }
      },
      [
        effectiveValue,
        isMultiple,
        hasNestedTreeOptions,
        dropdownItemsForDropdown,
        dropdownItems,
        commitPanelValue,
        isSearchSelectMode,
        clearInputValueAfterSelect,
        setEffectiveSearchQuery,
      ],
    );

    const handleMultiClearClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (selectDisabled) {
          return;
        }
        commitPanelValue([]);
      },
      [selectDisabled, commitPanelValue],
    );

    /** Есть ли что сбрасывать (значение или строка фильтра в открытом searchSelect). */
    const canClearPanelValue = useMemo(() => {
      if (isMultiple) {
        return multiSelectedCount > 0;
      }
      if (isSearchSelectMode) {
        if (menuOpen) {
          return effectiveSearchQuery.trim().length > 0 || !triggerShowsPlaceholder;
        }
        return !triggerShowsPlaceholder;
      }
      return !triggerShowsPlaceholder;
    }, [
      isMultiple,
      multiSelectedCount,
      isSearchSelectMode,
      menuOpen,
      effectiveSearchQuery,
      triggerShowsPlaceholder,
    ]);

    /** Чипы в триггере: `select` + multiple или `searchSelect` + multiple при закрытом меню */
    const isMultiChipTrigger = isMultiple && (!isSearchSelectMode || !menuOpen);

    /** Кнопка очистки в триггере: не дублируем «очистить всё» у чипов при multiple. */
    const showDisplayClearIconControl =
      displayClearIcon &&
      !selectDisabled &&
      !readOnly &&
      canClearPanelValue &&
      !(isMultiChipTrigger && multiSelectedCount > 0);

    const handleDisplayClearClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (selectDisabled || readOnly) {
          return;
        }
        if (isMultiple) {
          commitPanelValue([]);
        } else {
          commitPanelValue('');
        }
        if (isSearchSelectMode) {
          setEffectiveSearchQuery('');
        }
        onClearIconClick?.();
      },
      [
        selectDisabled,
        readOnly,
        onClearIconClick,
        isMultiple,
        isSearchSelectMode,
        commitPanelValue,
        setEffectiveSearchQuery,
      ],
    );

    const handleMultiSelectAllClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (selectDisabled || allSelectableSelected) {
          return;
        }
        commitPanelValue([...selectableEnabledValues]);
      },
      [selectDisabled, allSelectableSelected, selectableEnabledValues, commitPanelValue],
    );

    /** Нижняя зона панели: кастомный `renderBottomPanel`, затем встроенная кнопка «Выбрать все» при `multiple`. */
    const mergedRenderBottomPanel = useMemo(() => {
      const internalSelectAllFooter =
        isMultiple && showMultiSelectAll !== false
          ? ({ disabled: panelDisabled }: DropdownTopPanelProps) => {
              const footerDisabled =
                panelDisabled || allSelectableSelected || selectableEnabledValues.length === 0;
              return (
                <SelectMultiSelectAllFooterBtn
                  type="button"
                  disabled={footerDisabled}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleMultiSelectAllClick}
                >
                  Выбрать все
                </SelectMultiSelectAllFooterBtn>
              );
            }
          : undefined;

      if (!renderBottomPanel && !internalSelectAllFooter) {
        return undefined;
      }
      if (!renderBottomPanel) {
        return internalSelectAllFooter;
      }
      if (!internalSelectAllFooter) {
        return renderBottomPanel;
      }
      const userBottom = renderBottomPanel;
      const builtInBottom = internalSelectAllFooter;
      /** Render prop для `Dropdown`, не отдельный React-компонент */
      function selectMergedBottomPanel(panelProps: DropdownTopPanelProps) {
        return (
          <>
            {userBottom(panelProps)}
            {builtInBottom(panelProps)}
          </>
        );
      }
      return selectMergedBottomPanel;
    }, [
      isMultiple,
      showMultiSelectAll,
      renderBottomPanel,
      allSelectableSelected,
      selectableEnabledValues,
      handleMultiSelectAllClick,
    ]);

    const handleMultiChipRemoveClick = useCallback(
      (valueToRemove: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (selectDisabled) {
          return;
        }
        const next = applySelectPanelSelection(effectiveValue, valueToRemove, true);
        commitPanelValue(next);
      },
      [selectDisabled, effectiveValue, commitPanelValue],
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

    // Скелетон только у триггера; подписи остаются текстом (нет контрола для `htmlFor`)
    if (skeleton) {
      return (
        <SelectPanelRoot fullWidth={fullWidth} aria-busy="true">
          {label ? (
            <Label as="span">
              {label}
              {required ? <RequiredIndicator>*</RequiredIndicator> : null}
            </Label>
          ) : null}
          {additionalLabel ? <AdditionalLabel>{additionalLabel}</AdditionalLabel> : null}
          <SkeletonEffect size={size} fullWidth={fullWidth} role="presentation" />
        </SelectPanelRoot>
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
        {isSearchSelectInputTrigger ? (
          <SelectTriggerInput
            type="text"
            id={triggerId}
            disabled={selectDisabled}
            value={searchSelectInputDisplay}
            placeholder={placeholder ?? searchPlaceholder}
            $isPlaceholder={searchSelectInputPlaceholderStyle}
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
                handleMenuOpenChange(true);
              }
            }}
            onFocus={() => {
              setFocused(true);
              handleMenuOpenChange(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
          />
        ) : isMultiChipTrigger ? (
          <>
            <SelectMultiTriggerRoot
              id={triggerId}
              role="combobox"
              tabIndex={selectDisabled ? -1 : 0}
              $disabled={selectDisabled}
              $textAlign={textAlign}
              aria-haspopup="listbox"
              aria-expanded={menuOpen}
              aria-invalid={error ? true : undefined}
              aria-required={required ? true : undefined}
              aria-label={
                multiChipEntries.length > 0
                  ? `Выбрано: ${multiChipEntries.map((c) => c.label).join(', ')}`
                  : (placeholder ?? undefined)
              }
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
              }}
              onKeyDown={(e) => {
                if (selectDisabled) {
                  return;
                }
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleMenuOpen();
                }
              }}
            >
              {multiChipEntries.length === 0 ? (
                <SelectMultiPlaceholder $isPlaceholder={triggerShowsPlaceholder}>
                  {placeholder ?? ''}
                </SelectMultiPlaceholder>
              ) : (
                multiChipEntries.map((chip) => (
                  <SelectMultiChip key={chip.value}>
                    <SelectMultiChipLabel title={chip.label}>{chip.label}</SelectMultiChipLabel>
                    <SelectMultiChipRemove
                      type="button"
                      disabled={selectDisabled}
                      aria-label={`Удалить «${chip.label}»`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={handleMultiChipRemoveClick(chip.value)}
                    >
                      <Icon
                        name="IconExClose"
                        size={IconSize.XS}
                        color="currentColor"
                        {...clearIconProps}
                      />
                    </SelectMultiChipRemove>
                  </SelectMultiChip>
                ))
              )}
            </SelectMultiTriggerRoot>
          </>
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
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
          >
            {triggerText}
          </SelectTriggerButton>
        )}
        {isLoading ? <LoadingSpinner size={size} /> : null}
        {showMultiCountBadge ? (
          <SelectMultiCountBadgeSlot aria-hidden>
            <Badge variant={BadgeVariant.DEFAULT_MAIN} size={size}>
              {multiSelectedCount}
            </Badge>
          </SelectMultiCountBadgeSlot>
        ) : null}
        {isMultiChipTrigger && multiSelectedCount > 0 ? (
          <SelectMultiClearAllBtn
            type="button"
            $compact
            disabled={selectDisabled}
            aria-label="Очистить выбор"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={handleMultiClearClick}
          >
            <Icon
              name="IconExClose"
              size={getSelectMultiClearAllIconSize(size)}
              color="currentColor"
              {...clearIconProps}
            />
          </SelectMultiClearAllBtn>
        ) : null}
        {showDisplayClearIconControl ? (
          <SelectMultiClearAllBtn
            type="button"
            disabled={selectDisabled}
            aria-label="Очистить"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={handleDisplayClearClick}
          >
            <Icon
              name="IconExClose"
              size={getClearIconSizeForInputField(size)}
              color="currentColor"
              {...clearIconProps}
            />
          </SelectMultiClearAllBtn>
        ) : null}
        <SelectChevronSlot
          aria-hidden
          onMouseDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
            if (!selectDisabled) {
              toggleMenuOpen();
            }
          }}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <SelectChevronFlip $isOpen={menuOpen}>
            <Icon
              name="IconPlainerChevronDown"
              size={chevronIconSize}
              color="currentColor"
              {...openMenuIconProps}
            />
          </SelectChevronFlip>
        </SelectChevronSlot>
      </InputWrapper>
    );

    /** Подсказка только вокруг видимого поля — иначе `getBoundingClientRect` якоря включает оболочку `Dropdown` и тултип уезжает в сторону. */
    const triggerForDropdown =
      tooltip && tooltipType === 'hint' ? (
        <Hint
          content={tooltip}
          placement={tooltipPosition as HintPosition}
          variant={HintVariant.DEFAULT}
        >
          {triggerControl}
        </Hint>
      ) : tooltip ? (
        <Tooltip content={tooltip} position={tooltipPosition as TooltipPosition}>
          {triggerControl}
        </Tooltip>
      ) : (
        triggerControl
      );

    const dropdownBlock = (
      <SelectDropdownAnchor ref={containerRef} $fullWidth={fullWidth}>
        <Dropdown
          trigger={triggerForDropdown}
          value={dropdownValue}
          onSelect={handleDropdownSelect}
          disabled={selectDisabled}
          fullWidth={fullWidth}
          openMenuIconProps={openMenuIconProps}
          size={size}
          variant={dropdownVariant}
          multiSelection={isMultiple}
          showCheckbox={showCheckbox}
          disableSelectedOptionHighlight={isMultiple}
          searchable={effectiveSearchable}
          searchPlaceholder={searchPlaceholder}
          searchValue={searchValue}
          defaultSearchValue={defaultSearchValue}
          onSearch={onSearch}
          onSearchInputChange={onInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          searchFilter={searchFilter}
          searchFormat={searchFormat}
          menuMaxHeight={menuMaxHeight}
          virtualScroll={virtualScroll}
          menuWidth={menuWidth}
          inline={dropdownInline}
          isMenuOpen={menuOpen}
          onMenuOpenChange={handleMenuOpenChange}
          onMenuScroll={onScrollMenu}
          onMenuLoadMore={onMenuLoadMore}
          menuLoadMoreThresholdPx={menuLoadMoreThresholdPx}
          menuHasMore={menuHasMore}
          menuIsLoadingMore={menuIsLoadingMore}
          disableAutoFocus
          positioningMode="autoFlip"
          triggerWrapClickToggle={!isSearchSelectInputTrigger}
          renderTopPanel={renderTopPanel}
          renderBottomPanel={mergedRenderBottomPanel}
          treeExpandable={treeExpandable}
          treeDefaultExpanded={treeDefaultExpanded}
          treeExpandedKeys={treeExpandedKeys}
          onTreeExpandedKeysChange={onTreeExpandedKeysChange}
          lookupTreeMenuItemByValue={hasNestedTreeOptions ? lookupTreeMenuItemByValue : undefined}
        >
          {/* Список опций — общий `DropdownMenu` через `DropdownMenuFromDefinitions` (см. модуль Dropdown). */}
          <DropdownMenuFromDefinitions definitions={dropdownItemsForDropdown} />
        </Dropdown>
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
        {flattenNativeSelectOptions(options).map((opt, index) => (
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

        {dropdownBlock}

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
