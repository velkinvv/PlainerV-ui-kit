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
  DropdownGroupHeader,
  DropdownGroupTitle,
  DropdownGroupDescription,
} from './Dropdown.style';
import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuItem } from './DropdownMenuItem';
import { Button } from '../buttons/Button/Button';
import {
  calculateDropdownPosition,
  normalizeDropdownValue,
  getMenuItemKey,
  handleClickOutsideEvent,
  findScrollableParents,
  removeScrollListeners,
  getFocusableElements,
  getFocusableElementIndex,
} from './handlers';

const isDropdownGroup = (
  entry: DropdownMenuItemProps | DropdownMenuGroup,
): entry is DropdownMenuGroup => {
  return Array.isArray((entry as DropdownMenuGroup)?.items);
};

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
      disabled = false,
      targetElement,
      className,
      size = Size.MD,
      variant = 'default',
      multiSelection = false,
      disableSelectedOptionHighlight = false,
      virtualScroll,
      onSelect,
      onActivateItem,
      renderTopPanel,
      renderBottomPanel,
      disableAutoFocus = false,
      onClickOutside,
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
      searchFilter,
      enableKeyboardNavigation = true,
      loadItems,
      onLoadItemsError,
      renderEmptyState,
      emptyMessage = 'Нет данных',
      renderErrorState,
      inline = false,
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
        onMenuOpenChange?.(newIsOpen);
      },
      [isControlled, onMenuOpenChange],
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

      // Обрабатываем скролл window, document и body
      window.addEventListener('scroll', handleScroll, true);
      document.addEventListener('scroll', handleScroll, true);

      // Также обрабатываем скролл всех прокручиваемых родительских элементов
      const scrollableElements = findScrollableParents(dropdownRef.current);
      scrollableElements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.addEventListener('scroll', handleScroll, true);
        }
      });

      return () => {
        // Удаляем обработчики со всех элементов
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
        onSearch?.(value);
      },
      [isSearchControlled, onSearch],
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

    const resolvedDefinitions = React.useMemo<
      (DropdownMenuItemProps | DropdownMenuGroup)[] | null
    >(() => {
      if (items) {
        return items;
      }
      if (asyncItems) {
        return [...asyncItems];
      }
      return null;
    }, [items, asyncItems]);

    const doesItemMatchSearch = React.useCallback(
      (item: DropdownMenuItemProps) => {
        if (!searchable || !normalizedSearchQuery) return true;
        if (searchFilter) {
          return searchFilter(currentSearchValue, item);
        }
        // Дефолтный поиск: строковый `label` сравнивается по тексту; для `ReactNode` — только `description`
        const description = item.description?.toLowerCase() ?? '';
        const descriptionMatches = description.includes(normalizedSearchQuery);
        if (typeof item.label === 'string') {
          return item.label.toLowerCase().includes(normalizedSearchQuery) || descriptionMatches;
        }
        return descriptionMatches;
      },
      [searchable, normalizedSearchQuery, searchFilter, currentSearchValue],
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

    const menuFromItems = React.useMemo(() => {
      const sourceDefinitions = filteredDefinitions ?? resolvedDefinitions;
      if (!sourceDefinitions || sourceDefinitions.length === 0) {
        return null;
      }

      const hasGroups = sourceDefinitions.some(isDropdownGroup);
      const effectiveVirtualScroll = hasGroups ? undefined : virtualScroll;
      const pinnedTop = sourceDefinitions.filter(
        definition => isDropdownGroup(definition) && definition.pinned === 'top',
      );
      const pinnedBottom = sourceDefinitions.filter(
        definition => isDropdownGroup(definition) && definition.pinned === 'bottom',
      );
      const middle = sourceDefinitions.filter(
        definition => !isDropdownGroup(definition) || !definition.pinned,
      );

      let itemIndex = 0;
      const renderMenuItem = (item: DropdownMenuItemProps) => {
        const key = getMenuItemKey(item, itemIndex);
        itemIndex += 1;
        return <DropdownMenuItem key={key} {...item} />;
      };

      const renderGroup = (group: DropdownMenuGroup, key: string) => (
        <React.Fragment key={key}>
          {(group.title || group.description) && (
            <DropdownGroupHeader>
              {group.title && <DropdownGroupTitle>{group.title}</DropdownGroupTitle>}
              {group.description && (
                <DropdownGroupDescription>{group.description}</DropdownGroupDescription>
              )}
            </DropdownGroupHeader>
          )}
          {group.items.map(renderMenuItem)}
        </React.Fragment>
      );

      const renderDefinitions = (
        definitions: (DropdownMenuItemProps | DropdownMenuGroup)[],
        section: string,
      ) =>
        definitions.map((definition, index) =>
          isDropdownGroup(definition)
            ? renderGroup(definition, `group-${section}-${index}`)
            : renderMenuItem(definition),
        );

      return (
        <DropdownMenu
          value={normalizedValue}
          onActivateItem={onActivateItem}
          multiSelection={multiSelection}
          disableSelectedOptionHighlight={disableSelectedOptionHighlight}
          virtualScroll={effectiveVirtualScroll}
          size={size}
        >
          {renderDefinitions(pinnedTop, 'pinned-top')}
          {renderDefinitions(middle, 'regular')}
          {renderDefinitions(pinnedBottom, 'pinned-bottom')}
        </DropdownMenu>
      );
    }, [
      filteredDefinitions,
      resolvedDefinitions,
      normalizedValue,
      onActivateItem,
      multiSelection,
      disableSelectedOptionHighlight,
      virtualScroll,
      size,
    ]);

    const renderChildren = React.useMemo(() => {
      const content = menuFromItems ?? children;
      if (!content) return null;

      return React.Children.map(content as React.ReactNode, child => {
        if (!React.isValidElement(child)) {
          return child;
        }

        if ((child.type as React.ComponentType) === DropdownMenu) {
          return React.cloneElement(child as React.ReactElement<DropdownMenuProps>, {
            onItemSelect: handleItemSelect,
            value: normalizedValue,
            onActivateItem,
            multiSelection,
            disableSelectedOptionHighlight,
            virtualScroll,
            size,
          });
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
    }, [
      children,
      menuFromItems,
      handleItemSelect,
      normalizedValue,
      onActivateItem,
      multiSelection,
      disableSelectedOptionHighlight,
      virtualScroll,
      size,
    ]);

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
    const hasDeclarativeItems = Boolean(items || asyncItems);

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
        style={dropContainerStyle}
      >
        {topPanel && <DropdownTopPanel>{topPanel}</DropdownTopPanel>}
        {searchable && !combinedLoading && (
          <DropdownSearchContainer>
            <DropdownSearchInput
              type="search"
              value={currentSearchValue}
              placeholder={searchPlaceholder}
              onChange={event => handleSearchChange(event.target.value)}
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
          className={clsx('ui-dropdown', className, { 'ui-dropdown--disabled': disabled })}
        >
          {trigger ? (
            <div
              onClick={handleTriggerClick}
              style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1 }}
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
}

const DefaultTriggerButton = React.forwardRef<HTMLButtonElement, DefaultTriggerButtonProps>(
  ({ onToggle, buttonProps, skeleton = false, disabled = false }, ref) => {
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

    return (
      <Button
        {...(restButtonProps as React.ComponentProps<typeof Button>)}
        ref={ref}
        onClick={handleButtonClick}
        variant={skeleton ? ButtonVariant.SKELETON : variant}
        size={size}
        fullWidth={fullWidth}
        disabled={isDisabled}
      >
        {children ?? 'Открыть меню'}
      </Button>
    );
  },
);

DefaultTriggerButton.displayName = 'DefaultTriggerButton';
