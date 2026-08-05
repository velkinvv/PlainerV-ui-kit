import React, { useCallback, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import type {
  TransferListChangePayload,
  TransferListItem,
  TransferListProps,
  TransferListSide,
} from '../../../types/ui';
import { Size } from '../../../types/sizes';
import {
  TRANSFER_LIST_DND_MIME,
  buildTransferListItemMap,
  filterTransferListItems,
  getTransferListDragValues,
  moveAllTransferListValues,
  moveTransferListValues,
  parseTransferListDragPayload,
  reorderTransferListValues,
  resolveTransferListDropInsertIndex,
  resolveTransferListPanels,
  serializeTransferListDragPayload,
  toggleTransferListSelectAllChecked,
} from './handlers';
import { TransferListActions } from './TransferListActions';
import { TransferListPanel } from './TransferListPanel';
import { TransferListRoot } from './TransferList.style';

/**
 * TransferList — две панели с переносом пунктов (basic / enhanced), поиск и DnD.
 *
 * @param props.items - Каталог пунктов
 * @param props.value / defaultValue - Правая панель (простой режим)
 * @param props.leftValue / rightValue - Явный контроль панелей
 * @param props.onChange - Смена состава
 * @param props.variant - basic | enhanced
 * @param props.showMoveAll - Кнопки «перенести всё» (basic)
 * @param props.searchable - Поиск в шапках
 * @param props.draggable - HTML5 DnD
 * @param props.color - Акцент checkbox
 */
export const TransferList: React.FC<TransferListProps> = ({
  items,
  value: valueProp,
  defaultValue,
  leftValue: leftValueProp,
  defaultLeftValue,
  rightValue: rightValueProp,
  defaultRightValue,
  onChange,
  variant = 'basic',
  showMoveAll = true,
  searchable = true,
  draggable = true,
  leftTitle,
  rightTitle,
  leftSearchPlaceholder,
  rightSearchPlaceholder,
  leftSearch: leftSearchProp,
  rightSearch: rightSearchProp,
  onLeftSearchChange,
  onRightSearchChange,
  disabled = false,
  size = Size.SM,
  color = 'primary',
  fullWidth = false,
  height,
  renderItem,
  emptyLeftText,
  emptyRightText,
  ariaLabel = 'Список переноса',
  moveSelectedRightAriaLabel = 'Перенести выбранные вправо',
  moveSelectedLeftAriaLabel = 'Перенести выбранные влево',
  moveAllRightAriaLabel = 'Перенести все вправо',
  moveAllLeftAriaLabel = 'Перенести все влево',
  className,
}) => {
  const itemsByValue = useMemo(() => buildTransferListItemMap(items), [items]);
  const isExplicitPanels =
    leftValueProp !== undefined ||
    rightValueProp !== undefined ||
    defaultLeftValue !== undefined ||
    defaultRightValue !== undefined;

  const initialPanels = useMemo(() => {
    if (isExplicitPanels) {
      return resolveTransferListPanels({
        items,
        leftValue: leftValueProp ?? defaultLeftValue,
        rightValue: rightValueProp ?? defaultRightValue ?? valueProp ?? defaultValue,
        explicitPanels: true,
      });
    }
    return resolveTransferListPanels({
      items,
      rightValue: valueProp ?? defaultValue ?? [],
    });
  }, [
    defaultLeftValue,
    defaultRightValue,
    defaultValue,
    isExplicitPanels,
    items,
    leftValueProp,
    rightValueProp,
    valueProp,
  ]);

  const [internalLeft, setInternalLeft] = useState(initialPanels.leftValue);
  const [internalRight, setInternalRight] = useState(initialPanels.rightValue);

  const isLeftControlled = leftValueProp !== undefined;
  const isRightControlled =
    rightValueProp !== undefined || (!isExplicitPanels && valueProp !== undefined);

  const resolvedPanels = useMemo(() => {
    if (isExplicitPanels) {
      return resolveTransferListPanels({
        items,
        leftValue: isLeftControlled ? leftValueProp : internalLeft,
        rightValue: rightValueProp !== undefined ? rightValueProp : internalRight,
        explicitPanels: true,
      });
    }
    const rightValue = isRightControlled ? (valueProp ?? []) : internalRight;
    return resolveTransferListPanels({ items, rightValue });
  }, [
    internalLeft,
    internalRight,
    isExplicitPanels,
    isLeftControlled,
    isRightControlled,
    items,
    leftValueProp,
    rightValueProp,
    valueProp,
  ]);

  const leftValue = resolvedPanels.leftValue;
  const rightValue = resolvedPanels.rightValue;

  const [checkedLeft, setCheckedLeft] = useState<string[]>([]);
  const [checkedRight, setCheckedRight] = useState<string[]>([]);

  const [internalLeftSearch, setInternalLeftSearch] = useState('');
  const [internalRightSearch, setInternalRightSearch] = useState('');
  const isLeftSearchControlled = leftSearchProp !== undefined;
  const isRightSearchControlled = rightSearchProp !== undefined;
  const leftSearch = isLeftSearchControlled ? (leftSearchProp ?? '') : internalLeftSearch;
  const rightSearch = isRightSearchControlled ? (rightSearchProp ?? '') : internalRightSearch;

  const [draggingValues, setDraggingValues] = useState<string[]>([]);
  const [dropTargetSide, setDropTargetSide] = useState<TransferListSide | null>(null);
  const [dropIndicatorValue, setDropIndicatorValue] = useState<string | null>(null);

  const commitPanels = useCallback(
    (next: { leftValue: string[]; rightValue: string[] }, reason: TransferListChangePayload['reason']) => {
      if (!isLeftControlled && isExplicitPanels) {
        setInternalLeft(next.leftValue);
      }
      if (!isRightControlled) {
        setInternalRight(next.rightValue);
      }
      onChange?.({
        leftValue: next.leftValue,
        rightValue: next.rightValue,
        reason,
      });
    },
    [isExplicitPanels, isLeftControlled, isRightControlled, onChange],
  );

  const leftItems = useMemo(
    () =>
      leftValue
        .map((value) => itemsByValue.get(value))
        .filter((item): item is TransferListItem => item != null),
    [itemsByValue, leftValue],
  );
  const rightItems = useMemo(
    () =>
      rightValue
        .map((value) => itemsByValue.get(value))
        .filter((item): item is TransferListItem => item != null),
    [itemsByValue, rightValue],
  );

  const visibleLeftItems = useMemo(
    () => filterTransferListItems(leftItems, leftSearch),
    [leftItems, leftSearch],
  );
  const visibleRightItems = useMemo(
    () => filterTransferListItems(rightItems, rightSearch),
    [rightItems, rightSearch],
  );

  const setLeftSearch = useCallback(
    (query: string) => {
      if (!isLeftSearchControlled) {
        setInternalLeftSearch(query);
      }
      onLeftSearchChange?.(query);
    },
    [isLeftSearchControlled, onLeftSearchChange],
  );

  const setRightSearch = useCallback(
    (query: string) => {
      if (!isRightSearchControlled) {
        setInternalRightSearch(query);
      }
      onRightSearchChange?.(query);
    },
    [isRightSearchControlled, onRightSearchChange],
  );

  const clearMovedChecked = useCallback((movingValues: string[]) => {
    const movingSet = new Set(movingValues);
    setCheckedLeft((prev) => prev.filter((value) => !movingSet.has(value)));
    setCheckedRight((prev) => prev.filter((value) => !movingSet.has(value)));
  }, []);

  const handleMove = useCallback(
    (direction: 'to-right' | 'to-left') => {
      if (disabled) {
        return;
      }
      const movingValues =
        direction === 'to-right'
          ? checkedLeft.filter((value) => !itemsByValue.get(value)?.disabled)
          : checkedRight.filter((value) => !itemsByValue.get(value)?.disabled);
      if (movingValues.length === 0) {
        return;
      }
      const next = moveTransferListValues({
        leftValue,
        rightValue,
        movingValues,
        direction,
      });
      clearMovedChecked(movingValues);
      commitPanels(next, 'move');
    },
    [
      checkedLeft,
      checkedRight,
      clearMovedChecked,
      commitPanels,
      disabled,
      itemsByValue,
      leftValue,
      rightValue,
    ],
  );

  const handleMoveAll = useCallback(
    (direction: 'to-right' | 'to-left') => {
      if (disabled) {
        return;
      }
      const next = moveAllTransferListValues({
        leftValue,
        rightValue,
        itemsByValue,
        direction,
      });
      setCheckedLeft([]);
      setCheckedRight([]);
      commitPanels(next, 'move-all');
    },
    [commitPanels, disabled, itemsByValue, leftValue, rightValue],
  );

  const handleToggleChecked = useCallback(
    (side: TransferListSide, itemValue: string, checked: boolean) => {
      const setter = side === 'left' ? setCheckedLeft : setCheckedRight;
      setter((prev) => {
        if (checked) {
          return prev.includes(itemValue) ? prev : [...prev, itemValue];
        }
        return prev.filter((value) => value !== itemValue);
      });
    },
    [],
  );

  const handleSelectAll = useCallback(
    (side: TransferListSide, selectAll: boolean) => {
      const visibleItems = side === 'left' ? visibleLeftItems : visibleRightItems;
      const checkedValues = side === 'left' ? checkedLeft : checkedRight;
      const next = toggleTransferListSelectAllChecked({
        visibleItems,
        checkedValues,
        selectAll,
      });
      if (side === 'left') {
        setCheckedLeft(next);
      } else {
        setCheckedRight(next);
      }
    },
    [checkedLeft, checkedRight, visibleLeftItems, visibleRightItems],
  );

  const resetDragUi = useCallback(() => {
    setDraggingValues([]);
    setDropTargetSide(null);
    setDropIndicatorValue(null);
  }, []);

  const handleItemDragStart = useCallback(
    (side: TransferListSide, event: React.DragEvent<HTMLLIElement>, itemValue: string) => {
      if (disabled || !draggable) {
        event.preventDefault();
        return;
      }
      const panelValues = side === 'left' ? leftValue : rightValue;
      const checkedValues = side === 'left' ? checkedLeft : checkedRight;
      const values = getTransferListDragValues({
        itemValue,
        checkedValues,
        panelValues,
      }).filter((value) => !itemsByValue.get(value)?.disabled);
      if (values.length === 0) {
        event.preventDefault();
        return;
      }
      const payload = serializeTransferListDragPayload({ side, values });
      event.dataTransfer.setData(TRANSFER_LIST_DND_MIME, payload);
      event.dataTransfer.setData('text/plain', payload);
      event.dataTransfer.effectAllowed = 'move';
      setDraggingValues(values);
    },
    [
      checkedLeft,
      checkedRight,
      disabled,
      draggable,
      itemsByValue,
      leftValue,
      rightValue,
    ],
  );

  const handleItemDragOver = useCallback(
    (side: TransferListSide, event: React.DragEvent<HTMLLIElement>, itemValue: string) => {
      if (!draggable || disabled) {
        return;
      }
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      setDropTargetSide(side);
      const rect = event.currentTarget.getBoundingClientRect();
      const placeBefore = event.clientY < rect.top + rect.height / 2;
      setDropIndicatorValue(placeBefore ? itemValue : null);
      if (!placeBefore) {
        const panelValues = side === 'left' ? leftValue : rightValue;
        const index = panelValues.indexOf(itemValue);
        const nextValue = index >= 0 ? panelValues[index + 1] : undefined;
        setDropIndicatorValue(nextValue ?? `__end__:${side}`);
      }
    },
    [disabled, draggable, leftValue, rightValue],
  );

  const applyDrop = useCallback(
    (
      targetSide: TransferListSide,
      rawPayload: string,
      insertIndex: number | undefined,
    ) => {
      const payload = parseTransferListDragPayload(rawPayload);
      if (!payload?.values?.length) {
        resetDragUi();
        return;
      }
      const movingValues = payload.values.filter(
        (value) => !itemsByValue.get(value)?.disabled,
      );
      if (movingValues.length === 0) {
        resetDragUi();
        return;
      }

      if (payload.side === targetSide) {
        const panelValues = targetSide === 'left' ? leftValue : rightValue;
        const nextPanel = reorderTransferListValues(
          panelValues,
          movingValues,
          insertIndex ?? panelValues.length,
        );
        const next =
          targetSide === 'left'
            ? { leftValue: nextPanel, rightValue }
            : { leftValue, rightValue: nextPanel };
        clearMovedChecked([]);
        commitPanels(next, 'reorder');
        resetDragUi();
        return;
      }

      const direction = targetSide === 'right' ? 'to-right' : 'to-left';
      const next = moveTransferListValues({
        leftValue,
        rightValue,
        movingValues,
        direction,
        insertIndex,
      });
      clearMovedChecked(movingValues);
      commitPanels(next, 'dnd');
      resetDragUi();
    },
    [
      clearMovedChecked,
      commitPanels,
      itemsByValue,
      leftValue,
      resetDragUi,
      rightValue,
    ],
  );

  const handleItemDrop = useCallback(
    (side: TransferListSide, event: React.DragEvent<HTMLLIElement>, itemValue: string) => {
      if (!draggable || disabled) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      const raw =
        event.dataTransfer.getData(TRANSFER_LIST_DND_MIME) ||
        event.dataTransfer.getData('text/plain');
      const payload = parseTransferListDragPayload(raw);
      if (!payload) {
        resetDragUi();
        return;
      }
      const rect = event.currentTarget.getBoundingClientRect();
      const placeBefore = event.clientY < rect.top + rect.height / 2;
      const panelValues = side === 'left' ? leftValue : rightValue;
      const insertIndex = resolveTransferListDropInsertIndex({
        panelValues,
        targetValue: itemValue,
        placeBefore,
        movingValues: payload.values,
      });
      applyDrop(side, raw, insertIndex);
    },
    [applyDrop, disabled, draggable, leftValue, resetDragUi, rightValue],
  );

  const handleListDragOver = useCallback(
    (side: TransferListSide, event: React.DragEvent<HTMLUListElement>) => {
      if (!draggable || disabled) {
        return;
      }
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      setDropTargetSide(side);
      setDropIndicatorValue(`__end__:${side}`);
    },
    [disabled, draggable],
  );

  const handleListDrop = useCallback(
    (side: TransferListSide, event: React.DragEvent<HTMLUListElement>) => {
      if (!draggable || disabled) {
        return;
      }
      event.preventDefault();
      const raw =
        event.dataTransfer.getData(TRANSFER_LIST_DND_MIME) ||
        event.dataTransfer.getData('text/plain');
      const panelValues = side === 'left' ? leftValue : rightValue;
      applyDrop(side, raw, panelValues.length);
    },
    [applyDrop, disabled, draggable, leftValue, rightValue],
  );

  const handleListDragLeave = useCallback(
    (side: TransferListSide, event: React.DragEvent<HTMLUListElement>) => {
      const related = event.relatedTarget as Node | null;
      if (related && event.currentTarget.contains(related)) {
        return;
      }
      if (dropTargetSide === side) {
        setDropTargetSide(null);
        setDropIndicatorValue(null);
      }
    },
    [dropTargetSide],
  );

  const canMoveRight = checkedLeft.some((value) => !itemsByValue.get(value)?.disabled);
  const canMoveLeft = checkedRight.some((value) => !itemsByValue.get(value)?.disabled);
  const canMoveAllRight = leftValue.some((value) => !itemsByValue.get(value)?.disabled);
  const canMoveAllLeft = rightValue.some((value) => !itemsByValue.get(value)?.disabled);

  const leftDropIndicator =
    dropIndicatorValue && !dropIndicatorValue.startsWith('__end__:')
      ? dropIndicatorValue
      : null;

  return (
    <TransferListRoot
      className={clsx('ui-transfer-list', className)}
      $fullWidth={fullWidth}
      role="group"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
    >
      <TransferListPanel
        side="left"
        title={leftTitle}
        visibleItems={visibleLeftItems}
        checkedValues={checkedLeft}
        variant={variant}
        searchable={searchable}
        searchQuery={leftSearch}
        searchPlaceholder={leftSearchPlaceholder}
        onSearchChange={setLeftSearch}
        disabled={disabled}
        size={size}
        color={color}
        draggable={draggable}
        height={height}
        emptyText={emptyLeftText}
        isDropTarget={dropTargetSide === 'left'}
        dropIndicatorValue={dropTargetSide === 'left' ? leftDropIndicator : null}
        draggingValues={draggingValues}
        renderItem={renderItem}
        onToggleChecked={(itemValue, checked) =>
          handleToggleChecked('left', itemValue, checked)
        }
        onSelectAllChange={(selectAll) => handleSelectAll('left', selectAll)}
        onListDragOver={(event) => handleListDragOver('left', event)}
        onListDrop={(event) => handleListDrop('left', event)}
        onListDragLeave={(event) => handleListDragLeave('left', event)}
        onItemDragStart={(event, itemValue) => handleItemDragStart('left', event, itemValue)}
        onItemDragOver={(event, itemValue) => handleItemDragOver('left', event, itemValue)}
        onItemDrop={(event, itemValue) => handleItemDrop('left', event, itemValue)}
        onItemDragEnd={resetDragUi}
      />

      <TransferListActions
        variant={variant}
        showMoveAll={showMoveAll}
        size={size}
        disabled={disabled}
        canMoveRight={canMoveRight}
        canMoveLeft={canMoveLeft}
        canMoveAllRight={canMoveAllRight}
        canMoveAllLeft={canMoveAllLeft}
        moveSelectedRightAriaLabel={moveSelectedRightAriaLabel}
        moveSelectedLeftAriaLabel={moveSelectedLeftAriaLabel}
        moveAllRightAriaLabel={moveAllRightAriaLabel}
        moveAllLeftAriaLabel={moveAllLeftAriaLabel}
        onMoveRight={() => handleMove('to-right')}
        onMoveLeft={() => handleMove('to-left')}
        onMoveAllRight={() => handleMoveAll('to-right')}
        onMoveAllLeft={() => handleMoveAll('to-left')}
      />

      <TransferListPanel
        side="right"
        title={rightTitle}
        visibleItems={visibleRightItems}
        checkedValues={checkedRight}
        variant={variant}
        searchable={searchable}
        searchQuery={rightSearch}
        searchPlaceholder={rightSearchPlaceholder}
        onSearchChange={setRightSearch}
        disabled={disabled}
        size={size}
        color={color}
        draggable={draggable}
        height={height}
        emptyText={emptyRightText}
        isDropTarget={dropTargetSide === 'right'}
        dropIndicatorValue={
          dropTargetSide === 'right'
            ? dropIndicatorValue && !dropIndicatorValue.startsWith('__end__:')
              ? dropIndicatorValue
              : null
            : null
        }
        draggingValues={draggingValues}
        renderItem={renderItem}
        onToggleChecked={(itemValue, checked) =>
          handleToggleChecked('right', itemValue, checked)
        }
        onSelectAllChange={(selectAll) => handleSelectAll('right', selectAll)}
        onListDragOver={(event) => handleListDragOver('right', event)}
        onListDrop={(event) => handleListDrop('right', event)}
        onListDragLeave={(event) => handleListDragLeave('right', event)}
        onItemDragStart={(event, itemValue) => handleItemDragStart('right', event, itemValue)}
        onItemDragOver={(event, itemValue) => handleItemDragOver('right', event, itemValue)}
        onItemDrop={(event, itemValue) => handleItemDrop('right', event, itemValue)}
        onItemDragEnd={resetDragUi}
      />
    </TransferListRoot>
  );
};
