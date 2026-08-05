import React, { useId, useMemo } from 'react';
import { clsx } from 'clsx';
import type {
  ControlColor,
  TransferListItem,
  TransferListSide,
  TransferListVariant,
} from '../../../types/ui';
import { InputVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { Checkbox } from '../Checkbox/Checkbox';
import { Input } from '../inputs/Input/Input';
import {
  resolveTransferListSelectAllState,
  transferListHeightToCss,
} from './handlers';
import { TransferListItemRow } from './TransferListItemRow';
import {
  TransferListCounter,
  TransferListEmpty,
  TransferListList,
  TransferListPanelHeader,
  TransferListPanelRoot,
  TransferListPanelTitle,
  TransferListPanelTitleRow,
  TransferListSearchWrap,
  TransferListSelectAllRow,
} from './TransferList.style';

/**
 * Пропсы панели TransferList.
 * @property side - left | right
 * @property title - Заголовок
 * @property visibleItems - Отфильтрованные пункты для отображения
 * @property checkedValues - Выбранные value на панели
 * @property variant - basic | enhanced
 * @property searchable - Показывать поиск
 * @property searchQuery - Текст поиска
 * @property onSearchChange - Смена поиска
 * @property height - Высота списка
 * @property emptyText - Пустое состояние
 * @property isDropTarget - Подсветка drop на список
 * @property dropIndicatorValue - value строки с индикатором «перед»
 * @property draggingValues - value, которые сейчас тащат
 * @property renderItem - Кастомная отрисовка строки
 */
export type TransferListPanelProps = {
  side: TransferListSide;
  title?: React.ReactNode;
  visibleItems: TransferListItem[];
  checkedValues: string[];
  variant: TransferListVariant;
  searchable: boolean;
  searchQuery: string;
  searchPlaceholder?: string;
  onSearchChange: (query: string) => void;
  disabled: boolean;
  size: Size;
  color?: ControlColor | string;
  draggable: boolean;
  height?: number | string;
  emptyText?: React.ReactNode;
  isDropTarget?: boolean;
  dropIndicatorValue?: string | null;
  draggingValues?: string[];
  renderItem?: (
    item: TransferListItem,
    context: { checked: boolean; side: TransferListSide },
  ) => React.ReactNode;
  onToggleChecked: (itemValue: string, checked: boolean) => void;
  onSelectAllChange: (selectAll: boolean) => void;
  onListDragOver: (event: React.DragEvent<HTMLUListElement>) => void;
  onListDrop: (event: React.DragEvent<HTMLUListElement>) => void;
  onListDragLeave: (event: React.DragEvent<HTMLUListElement>) => void;
  onItemDragStart: (event: React.DragEvent<HTMLLIElement>, itemValue: string) => void;
  onItemDragOver: (event: React.DragEvent<HTMLLIElement>, itemValue: string) => void;
  onItemDrop: (event: React.DragEvent<HTMLLIElement>, itemValue: string) => void;
  onItemDragEnd: () => void;
};

/**
 * Панель TransferList: заголовок, поиск, select-all, список.
 * @param props - См. TransferListPanelProps
 */
export const TransferListPanel: React.FC<TransferListPanelProps> = ({
  side,
  title,
  visibleItems,
  checkedValues,
  variant,
  searchable,
  searchQuery,
  searchPlaceholder,
  onSearchChange,
  disabled,
  size,
  color,
  draggable,
  height,
  emptyText,
  isDropTarget = false,
  dropIndicatorValue = null,
  draggingValues = [],
  renderItem,
  onToggleChecked,
  onSelectAllChange,
  onListDragOver,
  onListDrop,
  onListDragLeave,
  onItemDragStart,
  onItemDragOver,
  onItemDrop,
  onItemDragEnd,
}) => {
  const reactId = useId();
  const titleId = `${reactId}-title`;
  const listId = `${reactId}-list`;
  const checkedSet = useMemo(() => new Set(checkedValues), [checkedValues]);
  const draggingSet = useMemo(() => new Set(draggingValues), [draggingValues]);
  const heightCss = transferListHeightToCss(height);

  const selectAllState = useMemo(
    () =>
      resolveTransferListSelectAllState({
        visibleItems,
        checkedValues: checkedSet,
      }),
    [checkedSet, visibleItems],
  );

  const selectableVisibleCount = visibleItems.filter((item) => !item.disabled).length;
  const selectedVisibleCount = visibleItems.filter(
    (item) => !item.disabled && checkedSet.has(item.value),
  ).length;

  const defaultTitle = side === 'left' ? 'Доступные' : 'Выбранные';
  const resolvedEmpty =
    emptyText ?? (side === 'left' ? 'Нет доступных пунктов' : 'Нет выбранных пунктов');

  return (
    <TransferListPanelRoot
      className={clsx('ui-transfer-list__panel', `ui-transfer-list__panel--${side}`)}
      data-side={side}
      aria-labelledby={titleId}
    >
      <TransferListPanelHeader>
        <TransferListPanelTitleRow>
          <TransferListPanelTitle id={titleId}>{title ?? defaultTitle}</TransferListPanelTitle>
          {variant === 'enhanced' ? (
            <TransferListCounter aria-live="polite">
              {selectedVisibleCount}/{selectableVisibleCount}
            </TransferListCounter>
          ) : null}
        </TransferListPanelTitleRow>
        {variant === 'enhanced' ? (
          <TransferListSelectAllRow>
            <Checkbox
              checked={selectAllState.checked}
              indeterminate={selectAllState.indeterminate}
              disabled={disabled || selectableVisibleCount === 0}
              size={size}
              color={color}
              label="Выбрать все"
              onChange={(event) => onSelectAllChange(event.target.checked)}
            />
          </TransferListSelectAllRow>
        ) : null}
      </TransferListPanelHeader>

      {searchable ? (
        <TransferListSearchWrap>
          <Input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder ?? 'Поиск'}
            size={size}
            variant={InputVariant.DEFAULT}
            disabled={disabled}
            fullWidth
            displayClearIcon={Boolean(searchQuery)}
            onClearIconClick={() => onSearchChange('')}
            aria-label={
              side === 'left' ? 'Поиск в левой панели' : 'Поиск в правой панели'
            }
          />
        </TransferListSearchWrap>
      ) : null}

      <TransferListList
        id={listId}
        role="list"
        $heightCss={heightCss}
        $isDropTarget={isDropTarget}
        onDragOver={onListDragOver}
        onDrop={onListDrop}
        onDragLeave={onListDragLeave}
      >
        {visibleItems.length === 0 ? (
          <TransferListEmpty>{resolvedEmpty}</TransferListEmpty>
        ) : (
          visibleItems.map((item) => (
            <TransferListItemRow
              key={item.value}
              item={item}
              side={side}
              checked={checkedSet.has(item.value)}
              disabled={disabled}
              size={size}
              color={color}
              draggable={draggable}
              showDropIndicatorBefore={dropIndicatorValue === item.value}
              isDragging={draggingSet.has(item.value)}
              renderItem={renderItem}
              onCheckedChange={(nextChecked) => onToggleChecked(item.value, nextChecked)}
              onDragStart={onItemDragStart}
              onDragOver={onItemDragOver}
              onDrop={onItemDrop}
              onDragEnd={onItemDragEnd}
            />
          ))
        )}
      </TransferListList>
    </TransferListPanelRoot>
  );
};
