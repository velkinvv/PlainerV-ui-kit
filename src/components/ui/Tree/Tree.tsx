import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';
import { clsx } from 'clsx';
import type {
  TreeCanDropArgs,
  TreeDropPosition,
  TreeItemData,
  TreeProps,
} from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { TreeProvider, type TreeContextValue } from './TreeContext';
import { TreeRoot } from './Tree.style';
import { TreeItem, TreeItemView } from './TreeItem';
import {
  applyTreeDrop,
  canDropOnTreeTarget,
  findTreeItemById,
  flattenVisibleTreeItems,
  getIndeterminateIds,
  getNextCheckedIds,
  getNextExpandedIds,
  getNextSelectedIds,
  resolveTreeDropPosition,
  resolveTreeItems,
  resolveTreeSelectionControl,
} from './handlers';

const TREE_DRAG_MIME = 'application/x-plainerv-tree-id';

type TreeComponent = React.ForwardRefExoticComponent<
  TreeProps & React.RefAttributes<HTMLUListElement>
> & {
  Item: typeof TreeItem;
};

/**
 * Иерархическое дерево: expand, select, checkbox/radio, DnD.
 *
 * @param props.size - SM | MD
 * @param props.selectionControl - none | checkbox | radio
 * @param props.checkable - Алиас checkbox, если selectionControl не задан
 * @param props.checkStrictly - Без cascade parent↔children (только checkbox)
 * @param props.checkOnRowClick - Клик по строке также check / radio-select
 * @param props.selectionMode - single | multiple (в radio всегда single)
 * @param props.expandedIds / defaultExpandedIds / onExpandedChange - Раскрытие
 * @param props.selectedIds / defaultSelectedIds / onSelectedChange - Выбор (и radio)
 * @param props.checkedIds / defaultCheckedIds / onCheckedChange - Чекбоксы
 * @param props.items - Data-driven модель
 * @param props.draggable - Включить DnD
 * @param props.canDrop - Правило drop
 * @param props.onDrop - Внутренний drop
 * @param props.onExternalDragOver / onExternalDrop - Внешний drag
 * @param props.onDragStart - Старт drag
 * @param props.children - Tree.Item
 * @param props.aria-label - Подпись дерева
 * @param ref - Ref на корневой ul
 */
const TreeBase = forwardRef<HTMLUListElement, TreeProps>(
  (
    {
      size = Size.MD,
      selectionControl: selectionControlProp,
      checkable = false,
      checkStrictly = false,
      checkOnRowClick = false,
      selectionMode: selectionModeProp = 'single',
      expandedIds: expandedIdsProp,
      defaultExpandedIds = [],
      onExpandedChange,
      selectedIds: selectedIdsProp,
      defaultSelectedIds = [],
      onSelectedChange,
      checkedIds: checkedIdsProp,
      defaultCheckedIds = [],
      onCheckedChange,
      onItemClick,
      onItemSelect,
      items: itemsProp,
      draggable: treeDraggable = false,
      canDrop,
      onDrop,
      onExternalDragOver,
      onExternalDrop,
      onDragStart,
      children,
      className,
      'aria-label': ariaLabel,
      ...rest
    },
    ref,
  ) => {
    const radioGroupName = useId();
    const selectionControl = resolveTreeSelectionControl(selectionControlProp, checkable);
    const selectionMode =
      selectionControl === 'radio' ? 'single' : selectionModeProp;

    const resolvedFromProps = useMemo(
      () => resolveTreeItems(itemsProp, children),
      [itemsProp, children],
    );

    const isItemsControlled = itemsProp !== undefined;
    const [internalItems, setInternalItems] = useState<TreeItemData[]>(resolvedFromProps);

    useEffect(() => {
      if (isItemsControlled) {
        setInternalItems(resolvedFromProps);
      } else {
        // При смене compound children синхронизируем локальный snapshot
        setInternalItems(resolvedFromProps);
      }
    }, [isItemsControlled, resolvedFromProps]);

    const items = isItemsControlled ? resolvedFromProps : internalItems;

    const isExpandedControlled = expandedIdsProp !== undefined;
    const [internalExpandedIds, setInternalExpandedIds] =
      useState<string[]>(defaultExpandedIds);
    const expandedIds = isExpandedControlled ? expandedIdsProp : internalExpandedIds;

    const isSelectedControlled = selectedIdsProp !== undefined;
    const [internalSelectedIds, setInternalSelectedIds] =
      useState<string[]>(defaultSelectedIds);
    const selectedIds = isSelectedControlled ? selectedIdsProp : internalSelectedIds;

    const isCheckedControlled = checkedIdsProp !== undefined;
    const [internalCheckedIds, setInternalCheckedIds] = useState<string[]>(defaultCheckedIds);
    const checkedIds = isCheckedControlled ? checkedIdsProp : internalCheckedIds;

    const indeterminateIds = useMemo(
      () =>
        selectionControl === 'checkbox'
          ? getIndeterminateIds(items, checkedIds, checkStrictly)
          : [],
      [selectionControl, items, checkedIds, checkStrictly],
    );

    const [focusedId, setFocusedId] = useState<string | null>(null);
    const [dropTargetId, setDropTargetId] = useState<string | null>(null);
    const [dropPosition, setDropPosition] = useState<TreeDropPosition | null>(null);
    const [draggingIds, setDraggingIds] = useState<string[]>([]);

    const visibleItems = useMemo(
      () => flattenVisibleTreeItems(items, expandedIds),
      [items, expandedIds],
    );

    const toggleExpand = useCallback(
      (itemId: string) => {
        const nextExpandedIds = getNextExpandedIds(expandedIds, itemId);
        if (!isExpandedControlled) {
          setInternalExpandedIds(nextExpandedIds);
        }
        onExpandedChange?.(nextExpandedIds);
      },
      [expandedIds, isExpandedControlled, onExpandedChange],
    );

    const selectItem = useCallback(
      (itemId: string) => {
        const nextSelectedIds = getNextSelectedIds(selectionMode, selectedIds, itemId);
        if (!isSelectedControlled) {
          setInternalSelectedIds(nextSelectedIds);
        }
        onSelectedChange?.(nextSelectedIds);
        const selectedItem = findTreeItemById(items, itemId);
        if (selectedItem) {
          onItemSelect?.({
            itemId,
            item: selectedItem,
            selectedIds: nextSelectedIds,
          });
        }
      },
      [
        isSelectedControlled,
        items,
        onItemSelect,
        onSelectedChange,
        selectedIds,
        selectionMode,
      ],
    );

    const checkItem = useCallback(
      (itemId: string, nextChecked: boolean) => {
        if (selectionControl !== 'checkbox') {
          return;
        }
        const nextCheckedIds = getNextCheckedIds({
          items,
          currentCheckedIds: checkedIds,
          itemId,
          nextChecked,
          checkStrictly,
        });
        if (!isCheckedControlled) {
          setInternalCheckedIds(nextCheckedIds);
        }
        onCheckedChange?.(nextCheckedIds);
      },
      [
        checkedIds,
        checkStrictly,
        isCheckedControlled,
        items,
        onCheckedChange,
        selectionControl,
      ],
    );

    const handleRowActivate = useCallback(
      (
        itemId: string,
        _event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
      ) => {
        selectItem(itemId);
        if (selectionControl === 'checkbox' && checkOnRowClick) {
          const isCurrentlyChecked = checkedIds.includes(itemId);
          checkItem(itemId, !isCurrentlyChecked);
        }
      },
      [checkItem, checkOnRowClick, checkedIds, selectItem, selectionControl],
    );

    const notifyItemClick = useCallback(
      (
        itemId: string,
        event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
      ) => {
        const clickedItem = findTreeItemById(items, itemId);
        if (!clickedItem) {
          return;
        }
        const eventArgs = { itemId, item: clickedItem, event };
        clickedItem.onClick?.(eventArgs);
        onItemClick?.(eventArgs);
      },
      [items, onItemClick],
    );

    const canDropItem = useCallback(
      (args: TreeCanDropArgs) => {
        const baseAllowed = canDropOnTreeTarget({
          items,
          dragIds: args.dragIds,
          targetId: args.targetId,
          position: args.position,
        });
        if (!baseAllowed) {
          return false;
        }
        return canDrop?.(args) ?? true;
      },
      [canDrop, items],
    );

    const beginDrag = useCallback(
      (event: React.DragEvent<HTMLElement>, itemId: string) => {
        if (!treeDraggable) {
          event.preventDefault();
          return;
        }
        const dragIds =
          selectionMode === 'multiple' && selectedIds.includes(itemId) && selectedIds.length > 1
            ? selectedIds
            : [itemId];
        setDraggingIds(dragIds);
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData(TREE_DRAG_MIME, JSON.stringify(dragIds));
        event.dataTransfer.setData('text/plain', itemId);
        onDragStart?.(event, itemId);
      },
      [onDragStart, selectedIds, selectionMode, treeDraggable],
    );

    const updateDropTarget = useCallback(
      (event: React.DragEvent<HTMLElement>, targetId: string) => {
        if (!treeDraggable && !onExternalDragOver && !onExternalDrop) {
          return;
        }
        const isInternal = event.dataTransfer.types.includes(TREE_DRAG_MIME);
        if (!isInternal && !onExternalDragOver && !onExternalDrop) {
          return;
        }

        const position = resolveTreeDropPosition(
          event.nativeEvent.offsetY,
          (event.currentTarget as HTMLElement).offsetHeight,
        );
        const dragIds =
          draggingIds.length > 0
            ? draggingIds
            : (() => {
                try {
                  const raw = event.dataTransfer.getData(TREE_DRAG_MIME);
                  return raw ? (JSON.parse(raw) as string[]) : [];
                } catch {
                  return [];
                }
              })();

        if (isInternal && dragIds.length) {
          const allowed = canDropItem({ dragIds, targetId, position });
          if (!allowed) {
            setDropTargetId(null);
            setDropPosition(null);
            return;
          }
          event.preventDefault();
          event.dataTransfer.dropEffect = 'move';
          setDropTargetId(targetId);
          setDropPosition(position);
          return;
        }

        if (!isInternal) {
          event.preventDefault();
          setDropTargetId(targetId);
          setDropPosition(position);
          onExternalDragOver?.(event);
        }
      },
      [
        canDropItem,
        draggingIds,
        onExternalDragOver,
        onExternalDrop,
        treeDraggable,
      ],
    );

    const clearDropTarget = useCallback(() => {
      setDropTargetId(null);
      setDropPosition(null);
    }, []);

    const completeDrop = useCallback(
      (event: React.DragEvent<HTMLElement>, targetId: string) => {
        event.preventDefault();
        event.stopPropagation();

        let dragIds = draggingIds;
        try {
          const raw = event.dataTransfer.getData(TREE_DRAG_MIME);
          if (raw) {
            dragIds = JSON.parse(raw) as string[];
          }
        } catch {
          // оставляем draggingIds
        }

        const position =
          dropPosition ??
          resolveTreeDropPosition(
            event.nativeEvent.offsetY,
            (event.currentTarget as HTMLElement).offsetHeight,
          );

        const dropArgs = { dragIds, targetId, position };
        if (!canDropItem(dropArgs)) {
          clearDropTarget();
          setDraggingIds([]);
          return;
        }

        if (!isItemsControlled) {
          setInternalItems((previousItems) => applyTreeDrop(previousItems, dropArgs));
        }
        onDrop?.(dropArgs);
        clearDropTarget();
        setDraggingIds([]);
      },
      [
        canDropItem,
        clearDropTarget,
        draggingIds,
        dropPosition,
        isItemsControlled,
        onDrop,
      ],
    );

    const handleExternalDragOver = useCallback(
      (event: React.DragEvent<HTMLElement>) => {
        if (event.dataTransfer.types.includes(TREE_DRAG_MIME)) {
          return;
        }
        onExternalDragOver?.(event);
      },
      [onExternalDragOver],
    );

    const handleExternalDrop = useCallback(
      (event: React.DragEvent<HTMLElement>, targetId: string | null) => {
        if (event.dataTransfer.types.includes(TREE_DRAG_MIME)) {
          return;
        }
        event.preventDefault();
        onExternalDrop?.(event, targetId);
        clearDropTarget();
      },
      [clearDropTarget, onExternalDrop],
    );

    const handleTreeKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLUListElement>) => {
        if (!visibleItems.length) {
          return;
        }

        const currentIndex = focusedId
          ? visibleItems.findIndex((entry) => entry.item.id === focusedId)
          : -1;

        if (event.key === 'ArrowDown') {
          event.preventDefault();
          const nextIndex =
            currentIndex < 0 ? 0 : Math.min(visibleItems.length - 1, currentIndex + 1);
          setFocusedId(visibleItems[nextIndex]?.item.id ?? null);
          return;
        }

        if (event.key === 'ArrowUp') {
          event.preventDefault();
          const nextIndex =
            currentIndex < 0 ? 0 : Math.max(0, currentIndex - 1);
          setFocusedId(visibleItems[nextIndex]?.item.id ?? null);
          return;
        }

        if (event.key === 'ArrowRight' && focusedId) {
          const focusedEntry = visibleItems.find((entry) => entry.item.id === focusedId);
          if (focusedEntry?.item.children?.length && !expandedIds.includes(focusedId)) {
            event.preventDefault();
            toggleExpand(focusedId);
          }
          return;
        }

        if (event.key === 'ArrowLeft' && focusedId) {
          if (expandedIds.includes(focusedId)) {
            event.preventDefault();
            toggleExpand(focusedId);
          }
        }
      },
      [expandedIds, focusedId, toggleExpand, visibleItems],
    );

    const contextValue = useMemo<TreeContextValue>(
      () => ({
        size,
        selectionControl,
        checkStrictly,
        checkOnRowClick,
        selectionMode,
        radioGroupName,
        expandedIds,
        selectedIds,
        checkedIds,
        indeterminateIds,
        items,
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
        canDropItem,
        beginDrag,
        updateDropTarget,
        clearDropTarget,
        completeDrop,
        handleExternalDragOver,
        handleExternalDrop,
      }),
      [
        beginDrag,
        canDropItem,
        checkItem,
        checkOnRowClick,
        checkStrictly,
        checkedIds,
        clearDropTarget,
        completeDrop,
        dropPosition,
        dropTargetId,
        expandedIds,
        focusedId,
        handleExternalDragOver,
        handleExternalDrop,
        handleRowActivate,
        indeterminateIds,
        items,
        notifyItemClick,
        radioGroupName,
        selectItem,
        selectedIds,
        selectionControl,
        selectionMode,
        size,
        toggleExpand,
        treeDraggable,
        updateDropTarget,
      ],
    );

    return (
      <TreeProvider value={contextValue}>
        <TreeRoot
          ref={ref}
          role="tree"
          aria-label={ariaLabel}
          aria-multiselectable={selectionMode === 'multiple' || undefined}
          className={clsx('ui-tree', className)}
          $gap="2px"
          onKeyDown={handleTreeKeyDown}
          onDragOver={(event) => {
            if (!event.dataTransfer.types.includes(TREE_DRAG_MIME)) {
              event.preventDefault();
              onExternalDragOver?.(event);
            }
          }}
          onDrop={(event) => {
            if (!event.dataTransfer.types.includes(TREE_DRAG_MIME)) {
              handleExternalDrop(event, null);
            }
          }}
          {...rest}
        >
          {items.map((item) => (
            <TreeItemView key={item.id} item={item} level={0} />
          ))}
        </TreeRoot>
      </TreeProvider>
    );
  },
);

TreeBase.displayName = 'Tree';

export const Tree = TreeBase as TreeComponent;
Tree.Item = TreeItem;
