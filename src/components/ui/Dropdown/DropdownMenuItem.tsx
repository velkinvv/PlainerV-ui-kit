import React from 'react';
import { clsx } from 'clsx';
import type { DropdownMenuItemProps } from '../../../types/ui';
import {
  DropdownItem,
  DropdownItemContent,
  DropdownItemDescription,
  DropdownItemIconSlot,
  DropdownItemLabel,
  DropdownItemLoadingSpinner,
  DropdownItemRightSlot,
  DropdownItemShortcut,
} from './Dropdown.style';
import { Skeleton } from '../Skeleton/Skeleton';
import { Checkbox } from '../Checkbox/Checkbox';
import { Size } from '../../../types/sizes';
import {
  isSelectedInMultiSelection as checkIsSelectedInMultiSelection,
  calculateMenuItemState,
} from './handlers';
import { useDropdownMenuContext } from './DropdownMenu';
import { Tooltip } from '../Tooltip/Tooltip';

/**
 * Элемент выпадающего меню с поддержкой иконок, описания и шорткатов
 */
export const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  (
    {
      label,
      description,
      value,
      icon,
      rightSlot,
      shortcut,
      disabled = false,
      loading = false,
      skeleton = false,
      tone = 'default',
      state,
      selected: propSelected,
      onSelect,
      children,
      className,
      showTooltip = false,
      tooltipText,
      ...rest
    },
    ref,
  ) => {
    const {
      onItemSelect,
      value: selectedValue,
      onActivateItem,
      multiSelection,
      disableSelectedOptionHighlight,
      menuDensity,
      size: menuSize,
    } = useDropdownMenuContext();

    /** Плотные строки для календаря и др. */
    const itemDensity = menuDensity === 'compact' ? 'compact' : undefined;
    const itemSize = menuSize ?? Size.MD;

    const isDisabled = disabled || loading || skeleton;

    // Определяем выбранное состояние для multiSelection
    const isSelectedInMultiSelection = React.useMemo(
      () => checkIsSelectedInMultiSelection(multiSelection, propSelected, selectedValue, value),
      [multiSelection, propSelected, selectedValue, value],
    );

    // Определяем финальное состояние: state имеет приоритет над сравнением value с selectedValue
    const finalState = React.useMemo(
      () =>
        calculateMenuItemState(
          disableSelectedOptionHighlight ?? false,
          state,
          multiSelection ?? false,
          selectedValue,
          value,
        ),
      [disableSelectedOptionHighlight, state, multiSelection, selectedValue, value],
    );

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      event.stopPropagation();

      // В режиме multiSelection клик на элемент меню также вызывает выбор
      // но меню не должно закрываться (это обрабатывается в handleItemSelect)
      onSelect?.(value, event);
      onItemSelect?.(value, event);
    };

    const handleCheckboxChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isDisabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        event.stopPropagation();
        // В режиме multiSelection клик по чекбоксу также вызывает onItemSelect
        onSelect?.(value, event as unknown as React.MouseEvent<HTMLDivElement>);
        onItemSelect?.(value, event as unknown as React.MouseEvent<HTMLElement>);
      },
      [isDisabled, onSelect, onItemSelect, value],
    );

    const handleMouseEnter = () => {
      if (!isDisabled) {
        onActivateItem?.(value);
      }
    };

    const trailingSlot =
      !loading &&
      !skeleton &&
      (rightSlot ?? (shortcut ? <DropdownItemShortcut>{shortcut}</DropdownItemShortcut> : null));

    const hasStructuredContent = Boolean(label || description);

    const structuredContent = hasStructuredContent ? (
      <>
        {label && <DropdownItemLabel $tone={tone}>{label}</DropdownItemLabel>}
        {description && <DropdownItemDescription>{description}</DropdownItemDescription>}
        {children}
      </>
    ) : (
      children
    );

    const resolvedContent =
      structuredContent ??
      (loading ? (
        <DropdownItemLabel $tone={tone}>Загрузка...</DropdownItemLabel>
      ) : (
        <DropdownItemLabel $tone={tone}>—</DropdownItemLabel>
      ));

    // В режиме multiSelection показываем чекбокс вместо иконки или вместе с иконкой
    const leftSlot = React.useMemo(() => {
      if (loading) {
        return <DropdownItemLoadingSpinner role="progressbar" aria-label="Загрузка" />;
      }

      if (multiSelection) {
        return (
          <DropdownItemIconSlot>
            <Checkbox
              checked={isSelectedInMultiSelection}
              onChange={handleCheckboxChange}
              disabled={isDisabled}
              size={Size.SM}
            />
          </DropdownItemIconSlot>
        );
      }

      if (icon) {
        return <DropdownItemIconSlot>{icon}</DropdownItemIconSlot>;
      }

      return null;
    }, [
      loading,
      multiSelection,
      isSelectedInMultiSelection,
      handleCheckboxChange,
      isDisabled,
      icon,
    ]);

    const skeletonNode = (
      <DropdownItem
        ref={ref}
        role="menuitem"
        aria-disabled={true}
        tabIndex={-1}
        data-tone={tone}
        data-skeleton={true}
        $state={finalState}
        $size={itemSize}
        $density={itemDensity}
        className={clsx('ui-dropdown-menu-item', className)}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        style={{ padding: 0 }}
        {...(rest as Omit<typeof rest, 'style'>)}
      >
        <Skeleton
          width="100%"
          height="32px"
          style={{
            borderRadius: 'inherit',
          }}
        />
      </DropdownItem>
    );

    const regularNode = (
      <DropdownItem
        ref={ref}
        role="menuitem"
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        data-tone={tone}
        data-loading={loading}
        $state={finalState}
        $size={itemSize}
        $density={itemDensity}
        className={clsx('ui-dropdown-menu-item', className)}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        {...rest}
      >
        {leftSlot}
        <DropdownItemContent>{resolvedContent}</DropdownItemContent>
        {trailingSlot && <DropdownItemRightSlot>{trailingSlot}</DropdownItemRightSlot>}
      </DropdownItem>
    );

    const itemNode = skeleton ? skeletonNode : regularNode;

    if (showTooltip) {
      const content = tooltipText ?? label ?? description;
      if (!content) {
        return itemNode;
      }
      return (
        <Tooltip content={content} disabled={isDisabled || skeleton || loading}>
          {itemNode}
        </Tooltip>
      );
    }

    return itemNode;
  },
);

DropdownMenuItem.displayName = 'DropdownMenuItem';
