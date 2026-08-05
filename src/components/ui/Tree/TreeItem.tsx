import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import type { TreeItemData, TreeItemProps } from '../../../types/ui';
import { IconSize } from '../../../types/sizes';
import { Icon } from '../Icon/Icon';
import { useTreeContext } from './TreeContext';
import { TreeNodeControl } from './TreeNodeControl';
import { wrapTreeItemOverlays } from './TreeItemOverlays';
import {
  TreeChevronButton,
  TreeIconSlot,
  TreeLabel,
  TreeNodeList,
  TreeRow,
} from './Tree.style';
import { getTreeGeometry } from './handlers';

type TreeItemViewProps = {
  /** Данные узла */
  item: TreeItemData;
  /** Уровень вложенности (0 = корень) */
  level: number;
};

/**
 * Визуальный узел дерева (из data-модели).
 * @param props.item - Данные узла
 * @param props.level - Уровень
 */
const TreeItemView = ({ item, level }: TreeItemViewProps) => {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const {
    size,
    selectionControl,
    radioGroupName,
    expandedIds,
    selectedIds,
    checkedIds,
    indeterminateIds,
    treeDraggable,
    focusedId,
    setFocusedId,
    dropTargetId,
    dropPosition,
    toggleExpand,
    selectItem,
    checkItem,
    handleRowActivate,
    notifyItemClick,
    beginDrag,
    updateDropTarget,
    clearDropTarget,
    completeDrop,
    handleExternalDragOver,
    handleExternalDrop,
  } = useTreeContext();

  const geometry = getTreeGeometry(size);
  const hasChildren = Boolean(item.children?.length);
  const isExpanded = expandedIds.includes(item.id);
  const isSelected = selectedIds.includes(item.id);
  const isChecked = checkedIds.includes(item.id);
  const isIndeterminate = indeterminateIds.includes(item.id);
  const isDisabled = Boolean(item.disabled);
  const isFocused = focusedId === item.id;
  const isDropTarget = dropTargetId === item.id;
  const itemDraggable = treeDraggable && item.draggable !== false && !isDisabled;
  const controlAriaLabel =
    typeof item.label === 'string' ? item.label : `Узел ${item.id}`;

  useEffect(() => {
    if (isFocused) {
      rowRef.current?.focus();
    }
  }, [isFocused]);

  const handleChevronClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (!hasChildren || isDisabled) {
        return;
      }
      toggleExpand(item.id);
    },
    [hasChildren, isDisabled, item.id, toggleExpand],
  );

  const handleRowClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (isDisabled) {
        return;
      }
      setFocusedId(item.id);
      handleRowActivate(item.id, event);
      notifyItemClick(item.id, event);
    },
    [handleRowActivate, isDisabled, item.id, notifyItemClick, setFocusedId],
  );

  const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      if (isDisabled) {
        return;
      }
      checkItem(item.id, event.target.checked);
    },
    [checkItem, isDisabled, item.id],
  );

  const handleRadioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      if (isDisabled || !event.target.checked) {
        return;
      }
      setFocusedId(item.id);
      selectItem(item.id);
    },
    [isDisabled, item.id, selectItem, setFocusedId],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (isDisabled) {
        return;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleRowActivate(item.id, event);
        notifyItemClick(item.id, event);
      }
    },
    [handleRowActivate, isDisabled, item.id, notifyItemClick],
  );

  const rowElement = (
    <TreeRow
      ref={rowRef}
      role="treeitem"
      tabIndex={isFocused || (!focusedId && level === 0 && !isDisabled) ? 0 : -1}
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-selected={isSelected}
      aria-disabled={isDisabled || undefined}
      aria-level={level + 1}
      className={clsx('ui-tree-row', {
        'ui-tree-row--selected': isSelected,
        'ui-tree-row--disabled': isDisabled,
      })}
      $level={level}
      $indentStep={geometry.indentStep}
      $minHeight={geometry.rowMinHeight}
      $paddingInline={geometry.paddingInline}
      $paddingBlock={geometry.paddingBlock}
      $fontSize={geometry.fontSize}
      $selected={isSelected}
      $disabled={isDisabled}
      $dropPosition={isDropTarget ? dropPosition : null}
      $isDropTarget={isDropTarget}
      draggable={itemDraggable}
      onClick={handleRowClick}
      onKeyDown={handleKeyDown}
      onFocus={() => setFocusedId(item.id)}
      onDragStart={(event) => beginDrag(event, item.id)}
      onDragOver={(event) => {
        handleExternalDragOver(event);
        updateDropTarget(event, item.id);
      }}
      onDragLeave={clearDropTarget}
      onDrop={(event) => {
        if (event.dataTransfer?.types?.includes('application/x-plainerv-tree-id')) {
          completeDrop(event, item.id);
        } else {
          handleExternalDrop(event, item.id);
        }
      }}
      onDragEnd={clearDropTarget}
    >
      <TreeChevronButton
        type="button"
        tabIndex={-1}
        aria-hidden={!hasChildren}
        aria-label={isExpanded ? 'Свернуть' : 'Развернуть'}
        $expanded={isExpanded}
        $slotSize={geometry.iconSlotSize}
        $hidden={!hasChildren}
        onClick={handleChevronClick}
      >
        <span className="ui-tree-chevron-icon">
          <Icon name="IconPlainerArrowLeft" size={IconSize.SM} />
        </span>
      </TreeChevronButton>

      <TreeNodeControl
        selectionControl={selectionControl}
        size={size}
        itemId={item.id}
        ariaLabel={controlAriaLabel}
        radioGroupName={radioGroupName}
        checked={isChecked}
        indeterminate={isIndeterminate}
        selected={isSelected}
        disabled={isDisabled}
        onCheckboxChange={handleCheckboxChange}
        onRadioChange={handleRadioChange}
      />

      {item.icon ? (
        <TreeIconSlot $slotSize={geometry.iconSlotSize}>{item.icon}</TreeIconSlot>
      ) : null}

      <TreeLabel className="ui-tree-label">{item.label}</TreeLabel>
    </TreeRow>
  );

  return (
    <li role="none" className="ui-tree-node" data-id={item.id}>
      {wrapTreeItemOverlays(rowElement, item.hint, item.tooltip)}

      {hasChildren && isExpanded ? (
        <TreeNodeList role="group" $gap="2px">
          {item.children?.map((child) => (
            <TreeItemView key={child.id} item={child} level={level + 1} />
          ))}
        </TreeNodeList>
      ) : null}
    </li>
  );
};

/**
 * Узел дерева (compound API). Используется как декларация данных —
 * рендер выполняет корневой Tree через модель items.
 *
 * @param props.id - Уникальный ключ
 * @param props.label - Подпись
 * @param props.icon - Иконка
 * @param props.disabled - Блокировка
 * @param props.draggable - Можно ли тащить
 * @param props.droppable - Можно ли бросать на узел
 * @param props.data - Метаданные
 * @param props.tooltip - Конфиг Tooltip
 * @param props.hint - Конфиг Hint (приоритетнее tooltip)
 * @param props.onClick - Клик по строке
 * @param props.children - Вложенные Tree.Item
 */
export const TreeItem = forwardRef<HTMLLIElement, TreeItemProps>(
  // Компонент-маркер для children API; рендер выполняет Tree через resolveTreeItems
  (_props, _ref) => null,
);

TreeItem.displayName = 'Tree.Item';

export { TreeItemView };
