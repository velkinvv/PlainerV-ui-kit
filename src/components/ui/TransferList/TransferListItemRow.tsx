import React from 'react';
import { clsx } from 'clsx';
import type { ControlColor, TransferListItem, TransferListSide } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { Checkbox } from '../Checkbox/Checkbox';
import {
  TransferListItemContent,
  TransferListItemDescription,
  TransferListItemLabel,
  TransferListItemRowRoot,
} from './TransferList.style';

/**
 * Пропсы строки пункта TransferList.
 * @property item - Пункт каталога
 * @property side - Сторона панели
 * @property checked - Выбран для переноса
 * @property disabled - Блокировка строки
 * @property size - Размер checkbox
 * @property color - Акцент checkbox
 * @property draggable - Разрешён DnD
 * @property showDropIndicatorBefore - Линия вставки перед строкой
 * @property isDragging - Строка в процессе drag
 * @property renderItem - Кастомный контент
 * @property onCheckedChange - Смена checked
 * @property onDragStart / onDragOver / onDrop / onDragEnd - DnD
 */
export type TransferListItemRowProps = {
  item: TransferListItem;
  side: TransferListSide;
  checked: boolean;
  disabled: boolean;
  size: Size;
  color?: ControlColor | string;
  draggable: boolean;
  showDropIndicatorBefore?: boolean;
  isDragging?: boolean;
  renderItem?: (
    item: TransferListItem,
    context: { checked: boolean; side: TransferListSide },
  ) => React.ReactNode;
  onCheckedChange: (checked: boolean) => void;
  onDragStart: (event: React.DragEvent<HTMLLIElement>, itemValue: string) => void;
  onDragOver: (event: React.DragEvent<HTMLLIElement>, itemValue: string) => void;
  onDrop: (event: React.DragEvent<HTMLLIElement>, itemValue: string) => void;
  onDragEnd: () => void;
};

/**
 * Строка пункта: checkbox + label/description (или renderItem).
 * @param props - См. TransferListItemRowProps
 */
export const TransferListItemRow: React.FC<TransferListItemRowProps> = ({
  item,
  side,
  checked,
  disabled,
  size,
  color,
  draggable,
  showDropIndicatorBefore = false,
  isDragging = false,
  renderItem,
  onCheckedChange,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}) => {
  const isItemDisabled = Boolean(disabled || item.disabled);
  const canDrag = draggable && !isItemDisabled;

  return (
    <TransferListItemRowRoot
      className={clsx('ui-transfer-list__item')}
      data-value={item.value}
      data-side={side}
      $dragging={isDragging}
      $dropBefore={showDropIndicatorBefore}
      $disabled={isItemDisabled}
      draggable={canDrag}
      onDragStart={(event) => {
        if (!canDrag) {
          event.preventDefault();
          return;
        }
        onDragStart(event, item.value);
      }}
      onDragOver={(event) => {
        if (!draggable) {
          return;
        }
        onDragOver(event, item.value);
      }}
      onDrop={(event) => {
        if (!draggable) {
          return;
        }
        onDrop(event, item.value);
      }}
      onDragEnd={onDragEnd}
    >
      <Checkbox
        checked={checked}
        disabled={isItemDisabled}
        size={size}
        color={color}
        onChange={(event) => onCheckedChange(event.target.checked)}
        aria-label={
          typeof item.label === 'string' || typeof item.label === 'number'
            ? String(item.label)
            : `Пункт ${item.value}`
        }
      />
      <TransferListItemContent>
        {renderItem ? (
          renderItem(item, { checked, side })
        ) : (
          <>
            <TransferListItemLabel>{item.label}</TransferListItemLabel>
            {item.description != null && item.description !== false ? (
              <TransferListItemDescription>{item.description}</TransferListItemDescription>
            ) : null}
          </>
        )}
      </TransferListItemContent>
    </TransferListItemRowRoot>
  );
};
