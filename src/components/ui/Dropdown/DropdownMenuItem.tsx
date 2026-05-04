import React from 'react';
import { clsx } from 'clsx';
import { TooltipPosition, type DropdownMenuItemProps } from '../../../types/ui';
import { Hint, HintVariant } from '../Hint/Hint';
import { mapTooltipPositionToHintPlacement } from './handlers';
import {
  DropdownItem,
  DropdownItemContent,
  DropdownItemDescription,
  DropdownItemIconSlot,
  DropdownItemLabel,
  DropdownItemLoadingSpinner,
  DropdownItemRightSlot,
  DropdownItemShortcut,
  DropdownMenuTreeChevronFrame,
  DropdownMenuTreeExpandButton,
  DropdownMenuTreeNestedList,
} from './Dropdown.style';
import { Skeleton } from '../Skeleton/Skeleton';
import { Checkbox } from '../Checkbox/Checkbox';
import { Size } from '../../../types/sizes';
import { Icon } from '../Icon/Icon';
import { getChevronIconSizeForField } from '../../../handlers/iconHandlers';
import {
  buildDropdownTreeBranchKey,
  collectSelectableValuesFromTreeItem,
  getTreeParentCheckboxVisualState,
} from '../../../handlers/dropdownTreeSelectionHandlers';
import {
  isSelectedInMultiSelection as checkIsSelectedInMultiSelection,
  calculateMenuItemState,
  getMenuItemKey,
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
      id,
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
      tooltip,
      tooltipType = 'tooltip',
      tooltipPosition = TooltipPosition.TOP,
      nestedItems,
      treeAncestorKey,
      treeIndex = 0,
      onClick: itemRowClick,
      ...rest
    },
    ref,
  ) => {
    const {
      onItemSelect,
      value: selectedValue,
      onActivateItem,
      multiSelection,
      showCheckbox: showCheckboxFromMenu,
      disableSelectedOptionHighlight,
      menuDensity,
      size: menuSize,
      treeExpandable: treeExpandableFromMenu = true,
      isTreeBranchExpanded,
      toggleTreeBranch,
      lookupTreeMenuItemByValue,
    } = useDropdownMenuContext();

    const hasNestedTree = Boolean(nestedItems?.length);
    const branchKey = React.useMemo(
      () => buildDropdownTreeBranchKey(treeAncestorKey ?? '', { id, value, label }, treeIndex),
      [treeAncestorKey, id, value, label, treeIndex],
    );
    const treeBranchExpanded =
      !hasNestedTree || (isTreeBranchExpanded?.(branchKey) ?? true);

    /** Чекбоксы в мультивыборе: по умолчанию показываем, пока родитель не передал `showCheckbox={false}` */
    const showMultiCheckbox = Boolean(multiSelection && showCheckboxFromMenu !== false);

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

    /** Сначала выбор строки, затем опциональный `onClick` с пропсов (`{...rest}` не должен перезаписывать выбор). */
    const handleRowClick = (event: React.MouseEvent<HTMLDivElement>) => {
      handleClick(event);
      itemRowClick?.(event);
    };

    const treeSelfItem = React.useMemo(
      () =>
        ({
          value,
          id,
          disabled,
          nestedItems,
          label,
        }) as DropdownMenuItemProps,
      [value, id, disabled, nestedItems, label],
    );

    /**
     * Полное поддерево для каскада чекбокса (селект с поиском режет `nestedItems` у пункта в панели).
     * TODO(tree-multiselect): снятие выбора по чекбоксу родителя после выбора только детей всё ещё может не
     * совпадать со строкой — разобрать цепочку событий / controlled Checkbox и добить поведение; пометка на доработку.
     */
    const resolvedTreeItemForCheckbox = React.useMemo(() => {
      if (!hasNestedTree || value === undefined || value === null) {
        return treeSelfItem;
      }
      const resolvedNode = lookupTreeMenuItemByValue?.(String(value));
      return resolvedNode ?? treeSelfItem;
    }, [hasNestedTree, value, lookupTreeMenuItemByValue, treeSelfItem]);

    const checkboxVisualState = React.useMemo(() => {
      if (!multiSelection || !hasNestedTree || !Array.isArray(selectedValue)) {
        return {
          checked: isSelectedInMultiSelection,
          indeterminate: false,
        };
      }
      return getTreeParentCheckboxVisualState(resolvedTreeItemForCheckbox, selectedValue);
    }, [
      multiSelection,
      hasNestedTree,
      selectedValue,
      resolvedTreeItemForCheckbox,
      isSelectedInMultiSelection,
    ]);

    const handleCheckboxChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isDisabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        event.stopPropagation();
        if (multiSelection && hasNestedTree) {
          /**
           * Совпадает с логикой строки: в поддереве (по полному узлу из lookup) уже есть выбранные значения — снять ветку (`false`);
           * иначе — ориентируемся на `target.checked` для включения.
           * TODO(tree-multiselect): см. комментарий у `resolvedTreeItemForCheckbox` — при необходимости пересмотреть всю ветку `handleCheckboxChange`.
           */
          const subtreeValueKeys = collectSelectableValuesFromTreeItem(resolvedTreeItemForCheckbox);
          const selectedStrings = Array.isArray(selectedValue)
            ? selectedValue.map((entry) => String(entry))
            : [];
          const selectedSetForSubtree = new Set(selectedStrings);
          const subtreeHasSelectedValue = subtreeValueKeys.some((subtreeKey) =>
            selectedSetForSubtree.has(subtreeKey),
          );
          const rawChecked = event.target.checked;
          const effectiveTreeCheckboxChecked = subtreeHasSelectedValue
            ? false
            : rawChecked !== false;
          /** Отдельный объект — не мутируем `ChangeEvent`, иначе на всплытии к строке меню можно прочитать «чужой» флаг. */
          const treeCheckboxEvent = {
            dropdownTreeCheckboxChecked: effectiveTreeCheckboxChecked,
          } as unknown as React.MouseEvent<HTMLDivElement>;
          onSelect?.(value, treeCheckboxEvent);
          onItemSelect?.(value, treeCheckboxEvent as unknown as React.MouseEvent<HTMLElement>);
          return;
        }
        onSelect?.(value, event as unknown as React.MouseEvent<HTMLDivElement>);
        onItemSelect?.(value, event as unknown as React.MouseEvent<HTMLElement>);
      },
      [
        isDisabled,
        onSelect,
        onItemSelect,
        value,
        multiSelection,
        hasNestedTree,
        resolvedTreeItemForCheckbox,
        selectedValue,
      ],
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

      if (showMultiCheckbox) {
        return (
          <DropdownItemIconSlot
            onClick={(iconSlotClick) => {
              // Клик по чекбоксу не должен всплывать к строке меню: второй onItemSelect с «чистым» MouseEvent ломает каскад дерева.
              iconSlotClick.stopPropagation();
            }}
          >
            <Checkbox
              checked={checkboxVisualState.checked}
              indeterminate={checkboxVisualState.indeterminate}
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
      showMultiCheckbox,
      checkboxVisualState.checked,
      checkboxVisualState.indeterminate,
      handleCheckboxChange,
      isDisabled,
      icon,
    ]);

    const expandControl =
      hasNestedTree && treeExpandableFromMenu ? (
        <DropdownMenuTreeExpandButton
          type="button"
          aria-expanded={treeBranchExpanded}
          aria-label={treeBranchExpanded ? 'Свернуть вложенный список' : 'Развернуть вложенный список'}
          onClick={(expandEvent) => {
            if (branchKey) {
              toggleTreeBranch?.(branchKey, expandEvent);
            }
          }}
        >
          <DropdownMenuTreeChevronFrame $expanded={treeBranchExpanded}>
            <Icon
              name="IconPlainerChevronDown"
              size={getChevronIconSizeForField(Size.SM)}
              color="currentColor"
            />
          </DropdownMenuTreeChevronFrame>
        </DropdownMenuTreeExpandButton>
      ) : null;

    const skeletonNode = (
      <DropdownItem
        ref={ref}
        role="menuitem"
        aria-disabled={true}
        tabIndex={-1}
        data-tone={tone}
        data-skeleton={true}
        data-dropdown-item-value={value !== undefined && value !== null ? String(value) : undefined}
        data-dropdown-item-id={id}
        $state={finalState}
        $size={itemSize}
        $density={itemDensity}
        className={clsx('ui-dropdown-menu-item', className)}
        onClick={handleRowClick}
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

    const regularRow = (
      <DropdownItem
        ref={ref}
        role="menuitem"
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        data-tone={tone}
        data-loading={loading}
        data-dropdown-item-value={value !== undefined && value !== null ? String(value) : undefined}
        data-dropdown-item-id={id}
        $state={finalState}
        $size={itemSize}
        $density={itemDensity}
        className={clsx('ui-dropdown-menu-item', className)}
        onClick={handleRowClick}
        onMouseEnter={handleMouseEnter}
        {...rest}
      >
        {expandControl}
        {leftSlot}
        <DropdownItemContent>{resolvedContent}</DropdownItemContent>
        {trailingSlot ? <DropdownItemRightSlot>{trailingSlot}</DropdownItemRightSlot> : null}
      </DropdownItem>
    );

    const nestedTreeBlock =
      hasNestedTree && treeBranchExpanded && nestedItems?.length ? (
        <DropdownMenuTreeNestedList role="group">
          {nestedItems.map((childItem, childIndex) => (
            <DropdownMenuItem
              key={getMenuItemKey(childItem, childIndex)}
              {...childItem}
              treeAncestorKey={branchKey}
              treeIndex={childIndex}
            />
          ))}
        </DropdownMenuTreeNestedList>
      ) : null;

    const regularNode = (
      <>
        {regularRow}
        {nestedTreeBlock}
      </>
    );

    const itemNode = skeleton ? skeletonNode : regularNode;

    const resolvedTooltipContent = tooltip ?? (showTooltip ? (tooltipText ?? label ?? description) : null);
    /** Для `disabled` / `loading` / `skeleton` подсказку у пункта не показываем (как у `Tooltip` с `disabled`). */
    const isItemHelpSuppressed = isDisabled || skeleton || loading;

    if (resolvedTooltipContent) {
      if (tooltipType === 'hint') {
        if (isItemHelpSuppressed) {
          return itemNode;
        }
        return (
          <Hint
            content={resolvedTooltipContent}
            placement={mapTooltipPositionToHintPlacement(tooltipPosition)}
            variant={HintVariant.DEFAULT}
          >
            {itemNode}
          </Hint>
        );
      }

      return (
        <Tooltip
          content={resolvedTooltipContent}
          position={tooltipPosition}
          disabled={isItemHelpSuppressed}
        >
          {itemNode}
        </Tooltip>
      );
    }

    return itemNode;
  },
);

DropdownMenuItem.displayName = 'DropdownMenuItem';
