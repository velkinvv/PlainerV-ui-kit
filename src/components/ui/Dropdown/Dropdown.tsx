import React, { useState, useRef, useEffect, useLayoutEffect, forwardRef } from 'react';
import { createPortal, flushSync } from 'react-dom';
import { clsx } from 'clsx';
import {
  ButtonVariant,
  type DropdownMenuItemValue,
  type DropdownMenuProps,
  type DropdownProps,
  type DropdownMenuItemProps,
  type DropdownMenuGroup,
} from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { getChevronIconSizeForField } from '../../../handlers/iconHandlers';
import { Icon } from '../Icon/Icon';
import {
  DropdownContainer,
  DropdownContent,
  DropdownLoadingSpinner,
  DropdownLoadingState,
  DropdownEmptyState,
  DropdownTopPanel,
  DropdownBottomPanel,
  DropdownSearchContainer,
  DropdownSearchInput,
} from './Dropdown.style';
import { DropdownMenu } from './DropdownMenu';
import { Button } from '../buttons/Button/Button';
import {
  calculateDropdownPosition,
  normalizeDropdownValue,
  handleClickOutsideEvent,
  findScrollableParents,
  removeScrollListeners,
  getFocusableElements,
  getFocusableElementIndex,
  flattenDropdownDefinitions,
  isDropdownGroup,
} from './handlers';
import {
  DropdownMenuFromDefinitions,
  type DropdownMenuFromDefinitionsProps,
} from './DropdownMenuFromDefinitions';
import {
  defaultDropdownSearchMatches,
  getDropdownItemSearchHaystackParts,
} from '../../../handlers/dropdownSearchMatchHandlers';

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      trigger,
      buttonProps,
      items,
      children,
      loading = false,
      skeleton = false,
      defaultOpen = false,
      value,
      isMenuOpen,
      onMenuOpenChange,
      onMenuOpened,
      onMenuClosed,
      onMenuScroll,
      onMenuLoadMore,
      menuLoadMoreThresholdPx = 80,
      menuHasMore,
      menuIsLoadingMore,
      disabled = false,
      targetElement,
      className,
      size = Size.MD,
      variant = 'default',
      multiSelection = false,
      showCheckbox,
      disableSelectedOptionHighlight = false,
      virtualScroll,
      onSelect,
      onActivateItem,
      renderTopPanel,
      renderBottomPanel,
      disableAutoFocus = false,
      onClickOutside,
      onFocus,
      onBlur,
      menuWidth,
      menuMaxHeight,
      alignSelf,
      dropContainerStyle,
      dropContainerCssMixin,
      positioningMode = 'default',
      portalContainer,
      searchable = false,
      searchPlaceholder = 'Поиск...',
      searchValue,
      defaultSearchValue = '',
      onSearch,
      onSearchInputChange,
      searchFilter,
      searchFormat,
      enableKeyboardNavigation = true,
      loadItems,
      onLoadItemsError,
      renderEmptyState,
      emptyMessage = 'Нет данных',
      renderErrorState,
      inline = false,
      menuDensity = 'default',
      triggerWrapClickToggle = true,
      fullWidth = false,
      openMenuIconProps,
      treeExpandable,
      treeDefaultExpanded,
      treeExpandedKeys,
      onTreeExpandedKeysChange,
      lookupTreeMenuItemByValue,
    },
    _ref,
  ) => {
    // Контролируемый или неконтролируемый режим
    const isControlled = isMenuOpen !== undefined;
    const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
    const isOpen = isControlled ? isMenuOpen : internalIsOpen;

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [shouldRender, setShouldRender] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    /** Восстановление скролла после догрузки пунктов (элемент, который реально скроллился). */
    const scrollRestoreRef = useRef<{
      el: HTMLElement;
      prevScrollHeight: number;
      prevScrollTop: number;
    } | null>(null);
    /** Длина плоского списка при последнем вызове `onMenuLoadMore` (сброс при отходе от низа). */
    const loadMoreLastFiredAtLengthRef = useRef(-1);
    const defaultTriggerRef = useRef<HTMLButtonElement>(null);
    const isSearchControlled = searchValue !== undefined;
    const [internalSearchValue, setInternalSearchValue] = useState(defaultSearchValue ?? '');
    const [asyncItems, setAsyncItems] = useState<DropdownMenuItemProps[] | null>(null);
    const [asyncStatus, setAsyncStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
      'idle',
    );
    const [asyncError, setAsyncError] = useState<unknown>(null);
    const shouldUseAsyncItems = Boolean(loadItems) && !items;

    useEffect(() => {
      if (!searchable) return;
      if (defaultSearchValue !== undefined && !isSearchControlled) {
        setInternalSearchValue(defaultSearchValue);
      }
    }, [defaultSearchValue, isSearchControlled, searchable]);

    useEffect(() => {
      if (!searchable || isSearchControlled) return;
      if (!isOpen) {
        setInternalSearchValue(defaultSearchValue ?? '');
      }
    }, [isOpen, searchable, isSearchControlled, defaultSearchValue]);

    useEffect(() => {
      if (!shouldUseAsyncItems) {
        setAsyncItems(null);
        setAsyncStatus('idle');
        setAsyncError(null);
        return;
      }
      if (!isOpen) return;
      if (!loadItems) return;
      if (asyncStatus === 'loading') return;
      if (asyncStatus === 'success' && asyncItems && asyncItems.length > 0) return;

      let isCancelled = false;
      setAsyncStatus('loading');
      setAsyncError(null);

      loadItems()
        ?.then(result => {
          if (isCancelled) return;
          setAsyncItems(result);
          setAsyncStatus('success');
        })
        .catch(error => {
          if (isCancelled) return;
          setAsyncError(error);
          setAsyncStatus('error');
          onLoadItemsError?.(error);
        });

      return () => {
        isCancelled = true;
      };
    }, [shouldUseAsyncItems, isOpen, loadItems, asyncStatus, asyncItems, onLoadItemsError]);

    // Функция для изменения состояния открытия
    const handleOpenChange = React.useCallback(
      (newIsOpen: boolean) => {
        if (!isControlled) {
          setInternalIsOpen(newIsOpen);
        }
        if (newIsOpen) {
          onMenuOpened?.();
        } else {
          onMenuClosed?.();
        }
        onMenuOpenChange?.(newIsOpen);
      },
      [isControlled, onMenuOpenChange, onMenuOpened, onMenuClosed],
    );

    // Функция для вычисления позиции dropdown
    // Для position: fixed координаты должны быть относительно viewport
    const calculatePosition = React.useCallback(() => {
      return calculateDropdownPosition({
        triggerElement: targetElement || dropdownRef.current,
        menuElement: menuRef.current,
        boundaryElement: inline ? dropdownRef.current : undefined,
        mode: positioningMode,
      });
    }, [targetElement, positioningMode, inline]);

    // Закрыть меню при disabled
    useEffect(() => {
      if (disabled && isOpen) {
        handleOpenChange(false);
        setShouldRender(false);
      }
    }, [disabled, isOpen, handleOpenChange]);

    // Инициализация при defaultOpen
    useEffect(() => {
      if (defaultOpen && isOpen && !disabled) {
        const newPosition = calculatePosition();
        setPosition(newPosition);
        setShouldRender(true);
      }
    }, [defaultOpen, isOpen, disabled, calculatePosition]);

    // Закрыть dropdown при клике вне его
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        // Проверяем, был ли клик вне компонента, и вызываем обработчик onClickOutside если он передан
        const isOutside = handleClickOutsideEvent(event, dropdownRef, menuRef, onClickOutside);

        // Если клик не внутри триггера и не внутри меню, закрываем меню
        // В режиме multiSelection меню не закрывается при клике на элемент меню
        if (isOutside) {
          handleOpenChange(false);
          setShouldRender(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        // Сначала вычисляем позицию
        const newPosition = calculatePosition();
        setPosition(newPosition);
        // Затем разрешаем рендер
        setShouldRender(true);
      } else {
        setShouldRender(false);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen, calculatePosition, handleOpenChange, onClickOutside]);

    useLayoutEffect(() => {
      if (!isOpen || !shouldRender) return;
      setPosition(calculatePosition());
    }, [isOpen, shouldRender, calculatePosition]);

    useEffect(() => {
      if (!isOpen) return;
      const menu = menuRef.current;
      if (!menu || typeof ResizeObserver === 'undefined') return;

      const observer = new ResizeObserver(() => {
        setPosition(calculatePosition());
      });
      observer.observe(menu);

      return () => observer.disconnect();
    }, [isOpen, calculatePosition]);

    useEffect(() => {
      if (!isOpen || !enableKeyboardNavigation) return;
      const menu = menuRef.current;
      if (!menu) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        const focusableElements = getFocusableElements(menu);
        if (!focusableElements.length) return;

        const currentIndex = getFocusableElementIndex(focusableElements, document.activeElement);
        const lastIndex = focusableElements.length - 1;

        const focusByIndex = (index: number) => {
          event.preventDefault();
          focusableElements[index]?.focus();
        };

        switch (event.key) {
          case 'ArrowDown':
            focusByIndex((currentIndex + 1) % focusableElements.length);
            break;
          case 'ArrowUp':
            focusByIndex((currentIndex - 1 + focusableElements.length) % focusableElements.length);
            break;
          case 'Home':
            focusByIndex(0);
            break;
          case 'End':
            focusByIndex(lastIndex);
            break;
          case 'Tab':
            focusByIndex(
              event.shiftKey
                ? (currentIndex - 1 + focusableElements.length) % focusableElements.length
                : (currentIndex + 1) % focusableElements.length,
            );
            break;
          default:
            break;
        }
      };

      menu.addEventListener('keydown', handleKeyDown);
      return () => menu.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, enableKeyboardNavigation]);

    // Закрыть dropdown при нажатии Escape
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleOpenChange(false);
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen, handleOpenChange]);

    // Обновляем позицию при изменении targetElement
    useEffect(() => {
      if (isOpen) {
        setPosition(calculatePosition());
      }
    }, [targetElement, isOpen, calculatePosition]);

    // Обновляем позицию при изменении размера окна
    useEffect(() => {
      const handleResize = () => {
        if (isOpen) {
          setPosition(calculatePosition());
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [isOpen, calculatePosition]);

    // Обновляем позицию при скролле страницы
    useEffect(() => {
      if (!isOpen) return;

      const handleScroll = () => {
        // Используем flushSync для синхронного обновления позиции без задержки
        flushSync(() => {
          setPosition(calculatePosition());
        });
      };

      window.addEventListener('scroll', handleScroll, true);
      document.addEventListener('scroll', handleScroll, true);

      const scrollableElements = findScrollableParents(dropdownRef.current);
      scrollableElements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.addEventListener('scroll', handleScroll, true);
        }
      });

      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        document.removeEventListener('scroll', handleScroll, true);
        removeScrollListeners(scrollableElements, handleScroll);
      };
    }, [isOpen, calculatePosition]);

    // Автоматически фокусируем стандартный триггер при монтировании
    useEffect(() => {
      if (disableAutoFocus || disabled || skeleton) return;
      if (trigger) return;

      const element = defaultTriggerRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const isHorizontallyVisible = rect.left >= 0 && rect.left <= window.innerWidth;
      const isVerticallyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (!isHorizontallyVisible || !isVerticallyVisible) {
        return;
      }

      element.focus();
    }, [disableAutoFocus, disabled, skeleton, trigger]);

    const currentSearchValue = searchable
      ? isSearchControlled
        ? (searchValue ?? '')
        : internalSearchValue
      : '';

    const handleSearchChange = React.useCallback(
      (value: string) => {
        if (!isSearchControlled) {
          setInternalSearchValue(value);
        }
        onSearch?.(value, searchFormat);
      },
      [isSearchControlled, onSearch, searchFormat],
    );

    const handleRetryLoadItems = React.useCallback(() => {
      if (!shouldUseAsyncItems) return;
      setAsyncItems(null);
      setAsyncStatus('idle');
      setAsyncError(null);
    }, [shouldUseAsyncItems]);

    const handleTriggerClick = () => {
      if (disabled) return;
      handleOpenChange(!isOpen);
    };

    const handleItemSelect = React.useCallback(
      (value?: DropdownMenuItemValue, event?: React.MouseEvent<HTMLElement>) => {
        // В режиме multiSelection меню не закрывается при выборе
        if (!multiSelection) {
          handleOpenChange(false);
          setShouldRender(false);
        }
        if (onSelect) {
          onSelect(value, event);
        }
      },
      [onSelect, handleOpenChange, multiSelection],
    );

    // В режиме multiSelection value должен быть массивом
    const normalizedValue = React.useMemo(
      () => normalizeDropdownValue(value, multiSelection),
      [multiSelection, value],
    );

    const normalizedSearchQuery = currentSearchValue.trim().toLowerCase();

    /** Список из `<DropdownMenuFromDefinitions definitions={...} />` — тот же источник, что и `items`, для поиска и догрузки. */
    const definitionsFromMenuChild = React.useMemo(() => {
      const nodes = React.Children.toArray(children);
      for (const node of nodes) {
        if (
          React.isValidElement(node) &&
          (node.type as React.ComponentType) === DropdownMenuFromDefinitions
        ) {
          return (node.props as DropdownMenuFromDefinitionsProps).definitions;
        }
      }
      return undefined;
    }, [children]);

    /** Откуда берётся список: проп `items` / `asyncItems` или дочерний `DropdownMenuFromDefinitions`. */
    const itemListSourceKind = React.useMemo<'props' | 'child' | 'none'>(() => {
      if (items) {
        return 'props';
      }
      if (asyncItems) {
        return 'props';
      }
      if (definitionsFromMenuChild !== undefined) {
        return 'child';
      }
      return 'none';
    }, [items, asyncItems, definitionsFromMenuChild]);

    const resolvedDefinitions = React.useMemo<
      (DropdownMenuItemProps | DropdownMenuGroup)[] | null
    >(() => {
      if (items) {
        return items;
      }
      if (asyncItems) {
        return [...asyncItems];
      }
      if (definitionsFromMenuChild !== undefined) {
        return definitionsFromMenuChild;
      }
      return null;
    }, [items, asyncItems, definitionsFromMenuChild]);

    const doesItemMatchSearch = React.useCallback(
      (item: DropdownMenuItemProps) => {
        if (!searchable || !normalizedSearchQuery) return true;
        if (searchFilter) {
          return searchFilter(currentSearchValue, item);
        }
        const parts = getDropdownItemSearchHaystackParts(item);
        return defaultDropdownSearchMatches(currentSearchValue, searchFormat, parts);
      },
      [searchable, normalizedSearchQuery, searchFilter, currentSearchValue, searchFormat],
    );

    const filteredDefinitions = React.useMemo(() => {
      if (!resolvedDefinitions) return null;
      if (!searchable || !normalizedSearchQuery) return resolvedDefinitions;

      const next: (DropdownMenuItemProps | DropdownMenuGroup)[] = [];
      resolvedDefinitions.forEach(definition => {
        if (isDropdownGroup(definition)) {
          const matchedItems = definition.items.filter(item => doesItemMatchSearch(item));
          if (matchedItems.length > 0) {
            next.push({ ...definition, items: matchedItems });
          }
        } else if (doesItemMatchSearch(definition)) {
          next.push(definition);
        }
      });
      return next;
    }, [resolvedDefinitions, searchable, normalizedSearchQuery, doesItemMatchSearch]);

    /** Скролл списка (в т.ч. вложенного при virtual scroll) + опциональная догрузка у нижней границы. */
    const handleMenuScrollCapture = React.useCallback(
      (event: React.UIEvent<HTMLDivElement>) => {
        const raw = event.target;
        if (!(raw instanceof HTMLElement)) {
          return;
        }
        if (raw.scrollHeight <= raw.clientHeight + 1) {
          return;
        }

        onMenuScroll?.({
          scrollTop: raw.scrollTop,
          scrollHeight: raw.scrollHeight,
          clientHeight: raw.clientHeight,
        });

        if (!onMenuLoadMore || menuHasMore === false || menuIsLoadingMore) {
          return;
        }

        const threshold = menuLoadMoreThresholdPx ?? 80;
        const distance = raw.scrollHeight - raw.scrollTop - raw.clientHeight;

        if (distance > threshold * 3) {
          loadMoreLastFiredAtLengthRef.current = -1;
        }
        if (distance >= threshold) {
          return;
        }

        const definitionsList = filteredDefinitions ?? resolvedDefinitions;
        if (!definitionsList?.length) {
          return;
        }
        const flat = flattenDropdownDefinitions(definitionsList);
        if (flat.length === 0) {
          return;
        }

        if (loadMoreLastFiredAtLengthRef.current === flat.length) {
          return;
        }

        const last = flat[flat.length - 1];
        const anchorValue =
          last.value !== undefined && last.value !== null ? String(last.value) : '';
        if (!anchorValue) {
          return;
        }

        loadMoreLastFiredAtLengthRef.current = flat.length;
        scrollRestoreRef.current = {
          el: raw,
          prevScrollHeight: raw.scrollHeight,
          prevScrollTop: raw.scrollTop,
        };

        void Promise.resolve(
          onMenuLoadMore({
            direction: 'end',
            anchorFlatIndex: flat.length - 1,
            anchorValue,
            anchorId: last.id,
            scrollTop: raw.scrollTop,
            scrollHeight: raw.scrollHeight,
            clientHeight: raw.clientHeight,
          }),
        ).catch(() => {
          loadMoreLastFiredAtLengthRef.current = -1;
          scrollRestoreRef.current = null;
        });
      },
      [
        onMenuScroll,
        onMenuLoadMore,
        menuHasMore,
        menuIsLoadingMore,
        menuLoadMoreThresholdPx,
        filteredDefinitions,
        resolvedDefinitions,
      ],
    );

    useLayoutEffect(() => {
      const pending = scrollRestoreRef.current;
      if (!pending?.el.isConnected) {
        scrollRestoreRef.current = null;
        return;
      }
      const { el, prevScrollHeight, prevScrollTop } = pending;
      const delta = el.scrollHeight - prevScrollHeight;
      if (delta !== 0) {
        el.scrollTop = prevScrollTop + delta;
      }
      scrollRestoreRef.current = null;
    }, [filteredDefinitions, resolvedDefinitions, items, asyncItems, definitionsFromMenuChild]);

    useEffect(() => {
      if (!isOpen) {
        loadMoreLastFiredAtLengthRef.current = -1;
        scrollRestoreRef.current = null;
      }
    }, [isOpen]);

    /** Сборка меню из `items` / `asyncItems`; при списке только из `children` рендер идёт через `cloneElement` ниже. */
    const menuBodyFromItems = React.useMemo(() => {
      if (itemListSourceKind !== 'props') {
        return null;
      }
      const sourceDefinitions = filteredDefinitions ?? resolvedDefinitions;
      if (!sourceDefinitions?.length) {
        return null;
      }
      return (
        <DropdownMenuFromDefinitions
          definitions={sourceDefinitions}
          onItemSelect={handleItemSelect}
          value={normalizedValue}
          onActivateItem={onActivateItem}
          multiSelection={multiSelection}
          showCheckbox={showCheckbox}
          disableSelectedOptionHighlight={disableSelectedOptionHighlight}
          virtualScroll={virtualScroll}
          size={size}
          menuDensity={menuDensity}
          treeExpandable={treeExpandable}
          treeDefaultExpanded={treeDefaultExpanded}
          treeExpandedKeys={treeExpandedKeys}
          onTreeExpandedKeysChange={onTreeExpandedKeysChange}
          lookupTreeMenuItemByValue={lookupTreeMenuItemByValue}
        />
      );
    }, [
      itemListSourceKind,
      filteredDefinitions,
      resolvedDefinitions,
      handleItemSelect,
      normalizedValue,
      onActivateItem,
      multiSelection,
      showCheckbox,
      disableSelectedOptionHighlight,
      virtualScroll,
      size,
      menuDensity,
      treeExpandable,
      treeDefaultExpanded,
      treeExpandedKeys,
      onTreeExpandedKeysChange,
      lookupTreeMenuItemByValue,
    ]);

    const injectDropdownMenuShellProps = React.useCallback(
      (
        child: React.ReactElement<DropdownMenuProps | DropdownMenuFromDefinitionsProps>,
      ): React.ReactElement => {
        const isFromDefinitionsMenu =
          (child.type as React.ComponentType) === DropdownMenuFromDefinitions;
        return React.cloneElement(child, {
          onItemSelect: handleItemSelect,
          value: normalizedValue,
          onActivateItem,
          multiSelection,
          showCheckbox,
          disableSelectedOptionHighlight,
          virtualScroll,
          size,
          menuDensity,
          treeExpandable,
          ...(isFromDefinitionsMenu ? { treeDefaultExpanded } : {}),
          treeExpandedKeys,
          onTreeExpandedKeysChange,
          lookupTreeMenuItemByValue,
        } as Record<string, unknown>);
      },
      [
        handleItemSelect,
        normalizedValue,
        onActivateItem,
        multiSelection,
        showCheckbox,
        disableSelectedOptionHighlight,
        virtualScroll,
        size,
        menuDensity,
        treeExpandable,
        treeDefaultExpanded,
        treeExpandedKeys,
        onTreeExpandedKeysChange,
        lookupTreeMenuItemByValue,
      ],
    );

    const renderChildren = React.useMemo(() => {
      if (menuBodyFromItems) {
        return menuBodyFromItems;
      }
      if (!children) {
        return null;
      }
      return React.Children.map(children as React.ReactNode, child => {
        if (!React.isValidElement(child)) {
          return child;
        }

        if ((child.type as React.ComponentType) === DropdownMenu) {
          return injectDropdownMenuShellProps(
            child as React.ReactElement<DropdownMenuProps>,
          ) as React.ReactElement<DropdownMenuProps>;
        }

        if ((child.type as React.ComponentType) === DropdownMenuFromDefinitions) {
          const sourceDefinitions = filteredDefinitions ?? resolvedDefinitions ?? [];
          const withFilteredDefinitions = React.cloneElement(
            child as React.ReactElement<DropdownMenuFromDefinitionsProps>,
            { definitions: sourceDefinitions },
          );
          return injectDropdownMenuShellProps(withFilteredDefinitions);
        }

        type GenericElementProps = Record<string, unknown> & {
          onClick?: (event: React.MouseEvent<HTMLElement>) => void;
        };

        const element = child as React.ReactElement<GenericElementProps>;

        return React.cloneElement(element, {
          onClick: (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            handleItemSelect(undefined, e);
            element.props.onClick?.(e);
          },
        });
      });
    }, [menuBodyFromItems, children, handleItemSelect, injectDropdownMenuShellProps]);

    const isAsyncLoading = shouldUseAsyncItems && asyncStatus === 'loading';
    const isAsyncError = shouldUseAsyncItems && asyncStatus === 'error';
    const combinedLoading = loading || isAsyncLoading;

    const errorMessage =
      asyncError instanceof Error ? asyncError.message : 'Не удалось загрузить список';

    const asyncErrorView = (
      <DropdownLoadingState role="alert" aria-live="assertive">
        <span>{errorMessage}</span>
        <Button variant={ButtonVariant.SECONDARY} size={Size.SM} onClick={handleRetryLoadItems}>
          Повторить
        </Button>
      </DropdownLoadingState>
    );

    const errorContent = renderErrorState?.(asyncError, handleRetryLoadItems) ?? asyncErrorView;
    const emptyStateView = renderEmptyState?.() ?? (
      <DropdownEmptyState>{emptyMessage}</DropdownEmptyState>
    );
    const hasDefinitionsMenuChild = React.useMemo(
      () =>
        React.Children.toArray(children).some(
          node =>
            React.isValidElement(node) &&
            (node.type as React.ComponentType) === DropdownMenuFromDefinitions,
        ),
      [children],
    );

    const hasDeclarativeItems = Boolean(items || asyncItems || hasDefinitionsMenuChild);

    const dropdownBody = combinedLoading ? (
      <DropdownLoadingState role="status" aria-live="polite">
        <DropdownLoadingSpinner aria-hidden="true" />
        <span>Загрузка...</span>
      </DropdownLoadingState>
    ) : isAsyncError ? (
      errorContent
    ) : (
      (renderChildren ?? (hasDeclarativeItems ? emptyStateView : null))
    );

    const topPanel = renderTopPanel
      ? renderTopPanel({
          size,
          variant,
          disabled,
        })
      : null;

    const bottomPanel = renderBottomPanel
      ? renderBottomPanel({
          size,
          variant,
          disabled,
        })
      : null;

    /** В `inline` меню внутри контейнера — колбэки только на корне; в портале панель вне DOM-дерева триггера — дублируем на `DropdownContent`. */
    const dropdownContentFocusProps: Pick<DropdownProps, 'onFocus' | 'onBlur'> | Record<string, never> =
      inline ? {} : { onFocus, onBlur };

    const dropdownContent = (
      <DropdownContent
        ref={menuRef}
        $isOpen={isOpen}
        $position={position}
        $size={size}
        $variant={variant}
        $menuWidth={menuWidth}
        $menuMaxHeight={menuMaxHeight}
        $dropContainerCssMixin={dropContainerCssMixin}
        $inline={inline}
        $menuDensity={menuDensity}
        style={dropContainerStyle}
        onScrollCapture={onMenuScroll || onMenuLoadMore ? handleMenuScrollCapture : undefined}
        {...dropdownContentFocusProps}
      >
        {topPanel && <DropdownTopPanel>{topPanel}</DropdownTopPanel>}
        {searchable && !combinedLoading && (
          <DropdownSearchContainer>
            <DropdownSearchInput
              type="search"
              value={currentSearchValue}
              placeholder={searchPlaceholder}
              onChange={(event) => {
                handleSearchChange(event.target.value);
                onSearchInputChange?.(event);
              }}
            />
          </DropdownSearchContainer>
        )}
        {dropdownBody}
        {bottomPanel && <DropdownBottomPanel>{bottomPanel}</DropdownBottomPanel>}
      </DropdownContent>
    );

    return (
      <>
        <DropdownContainer
          ref={dropdownRef}
          $alignSelf={alignSelf}
          $fullWidth={fullWidth}
          className={clsx('ui-dropdown', className, { 'ui-dropdown--disabled': disabled })}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {trigger ? (
            <div
              onClick={triggerWrapClickToggle ? handleTriggerClick : undefined}
              style={{
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
                ...(fullWidth ? { width: '100%', display: 'block', boxSizing: 'border-box' as const } : {}),
              }}
            >
              {trigger}
            </div>
          ) : (
            <DefaultTriggerButton
              ref={defaultTriggerRef}
              onToggle={handleTriggerClick}
              buttonProps={buttonProps}
              skeleton={skeleton}
              disabled={disabled}
              fieldSize={size}
              openMenuIconProps={openMenuIconProps}
            />
          )}
          {shouldRender && inline && dropdownContent}
        </DropdownContainer>

        {shouldRender &&
          !inline &&
          typeof document !== 'undefined' &&
          createPortal(dropdownContent, portalContainer ?? document.body)}
      </>
    );
  },
);

Dropdown.displayName = 'Dropdown';

interface DefaultTriggerButtonProps {
  onToggle: () => void;
  buttonProps?: DropdownProps['buttonProps'];
  skeleton?: boolean;
  disabled?: boolean;
  /** Размер строки `Dropdown` — для шеврона рядом с дефолтной кнопкой */
  fieldSize?: Size;
  openMenuIconProps?: DropdownProps['openMenuIconProps'];
}

const DefaultTriggerButton = React.forwardRef<HTMLButtonElement, DefaultTriggerButtonProps>(
  (
    { onToggle, buttonProps, skeleton = false, disabled = false, fieldSize = Size.MD, openMenuIconProps },
    ref,
  ) => {
    const {
      children,
      onClick,
      variant,
      fullWidth,
      size,
      disabled: buttonDisabled,
      ...restButtonProps
    } = buttonProps || {};

    // disabled из Dropdown имеет приоритет над disabled из buttonProps
    const isDisabled = disabled || buttonDisabled;

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (skeleton) return;
      onToggle();
      onClick?.(event);
    };

    const openMenuIcon = (
      <Icon
        name="IconPlainerChevronDown"
        size={getChevronIconSizeForField(fieldSize)}
        color="currentColor"
        {...openMenuIconProps}
      />
    );

    return (
      <Button
        {...(restButtonProps as React.ComponentProps<typeof Button>)}
        ref={ref}
        onClick={handleButtonClick}
        variant={skeleton ? ButtonVariant.SKELETON : variant}
        size={size}
        fullWidth={fullWidth}
        disabled={isDisabled}
        iconEnd={openMenuIcon}
      >
        {children ?? 'Открыть меню'}
      </Button>
    );
  },
);

DefaultTriggerButton.displayName = 'DefaultTriggerButton';
