import { Size } from '../../../types/sizes';
import { ActionBarSize, type ActionBarItemDefinition } from '../../../types/ui';

/** Высота кнопки ActionBar по размеру панели (px) */
const ACTION_BAR_ITEM_HEIGHT: Record<ActionBarSize, number> = {
  [ActionBarSize.XL]: 56,
  [ActionBarSize.LG]: 48,
  [ActionBarSize.MD]: 40,
  [ActionBarSize.SM]: 32,
};

/** Высота линии разделителя (px) */
const ACTION_BAR_DIVIDER_HEIGHT: Record<ActionBarSize, number> = {
  [ActionBarSize.XL]: 20,
  [ActionBarSize.LG]: 20,
  [ActionBarSize.MD]: 20,
  [ActionBarSize.SM]: 16,
};

/** Ширина слота разделителя (px) */
const ACTION_BAR_DIVIDER_SLOT_WIDTH = 1;

/**
 * Высота кнопки ActionBar в пикселях.
 * @param barSize — размер панели
 */
export function getActionBarItemSizePx(barSize: ActionBarSize): number {
  return ACTION_BAR_ITEM_HEIGHT[barSize];
}

/**
 * Высота линии разделителя ActionBar.
 * @param barSize — размер панели
 */
export function getActionBarDividerHeightPx(barSize: ActionBarSize): number {
  return ACTION_BAR_DIVIDER_HEIGHT[barSize];
}

/**
 * Ширина слота разделителя ActionBar.
 */
export function getActionBarDividerSlotWidthPx(): number {
  return ACTION_BAR_DIVIDER_SLOT_WIDTH;
}

/**
 * Размер IconButton для ActionBar.
 * @param barSize — размер панели
 */
export function resolveActionBarIconButtonSize(barSize: ActionBarSize): Size {
  switch (barSize) {
    case ActionBarSize.SM:
      return Size.SM;
    case ActionBarSize.MD:
      return Size.MD;
    case ActionBarSize.LG:
    case ActionBarSize.XL:
      return Size.LG;
    default:
      return Size.MD;
  }
}

/**
 * Размер выпадающего меню overflow.
 * @param barSize — размер панели
 */
export function resolveActionBarDropdownSize(barSize: ActionBarSize): Size {
  if (barSize === ActionBarSize.SM || barSize === ActionBarSize.MD) {
    return Size.SM;
  }

  return Size.MD;
}

/**
 * Ширина одного элемента ActionBar (кнопка + опциональный разделитель).
 * @param item — конфигурация элемента
 * @param itemSizePx — ширина кнопки
 * @param dividerSlotWidthPx — ширина слота разделителя
 */
export function getActionBarItemOccupiedWidthPx(
  item: ActionBarItemDefinition,
  itemSizePx: number,
  dividerSlotWidthPx: number,
): number {
  return itemSizePx + (item.withDivider ? dividerSlotWidthPx : 0);
}

/**
 * Делит элементы на видимые на панели и скрытые в overflow-меню.
 * @param items — полный список действий
 * @param containerWidth — доступная ширина контейнера
 * @param itemSizePx — ширина кнопки
 * @param dividerSlotWidthPx — ширина слота разделителя
 */
export function splitActionBarItemsByContainerWidth(
  items: ActionBarItemDefinition[],
  containerWidth: number,
  itemSizePx: number,
  dividerSlotWidthPx: number,
): {
  visibleItems: ActionBarItemDefinition[];
  hiddenItems: ActionBarItemDefinition[];
} {
  if (containerWidth <= 0 || items.length === 0) {
    return { visibleItems: items, hiddenItems: [] };
  }

  const totalItemsWidth = items.reduce(
    (accumulatedWidth, item) =>
      accumulatedWidth + getActionBarItemOccupiedWidthPx(item, itemSizePx, dividerSlotWidthPx),
    0,
  );

  const needsOverflowMenu = totalItemsWidth > containerWidth;
  let availableWidth = containerWidth - (needsOverflowMenu ? itemSizePx : 0);

  const visibleItems: ActionBarItemDefinition[] = [];
  const hiddenItems: ActionBarItemDefinition[] = [];

  items.forEach((item) => {
    const itemWidth = getActionBarItemOccupiedWidthPx(item, itemSizePx, dividerSlotWidthPx);

    if (availableWidth >= itemWidth) {
      visibleItems.push(item);
      availableWidth -= itemWidth;
      return;
    }

    hiddenItems.push(item);
    availableWidth = 0;
  });

  return { visibleItems, hiddenItems };
}
