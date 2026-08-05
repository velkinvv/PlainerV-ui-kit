import type { ReactNode } from 'react';
import type { TransferListItem, TransferListSide } from '../../../types/ui';

/** MIME для payload DnD TransferList */
export const TRANSFER_LIST_DND_MIME = 'application/x-transfer-list';

/**
 * Карта пунктов по value.
 * @param items - Каталог
 */
export const buildTransferListItemMap = (
  items: TransferListItem[],
): Map<string, TransferListItem> => {
  const itemMap = new Map<string, TransferListItem>();
  items.forEach((item) => {
    itemMap.set(item.value, item);
  });
  return itemMap;
};

/**
 * Уникальные value в порядке первого появления; отбрасывает неизвестные и дубликаты.
 * @param values - Кандидаты
 * @param knownValues - Допустимые value
 */
export const sanitizeTransferListValues = (
  values: string[] | undefined,
  knownValues: Set<string>,
): string[] => {
  if (!values?.length) {
    return [];
  }
  const seen = new Set<string>();
  const result: string[] = [];
  values.forEach((value) => {
    if (!knownValues.has(value) || seen.has(value)) {
      return;
    }
    seen.add(value);
    result.push(value);
  });
  return result;
};

/**
 * Раскладка панелей: явные left/right или правая = value и левая = остаток в порядке items.
 * @param options.items - Каталог
 * @param options.rightValue - Правая панель
 * @param options.leftValue - Левая панель (если задана вместе с логикой explicit)
 * @param options.explicitPanels - Использовать оба массива как есть (дополняя недостающее)
 */
export const resolveTransferListPanels = (options: {
  items: TransferListItem[];
  rightValue?: string[];
  leftValue?: string[];
  explicitPanels?: boolean;
}): { leftValue: string[]; rightValue: string[] } => {
  const knownValues = new Set(options.items.map((item) => item.value));
  const itemsOrder = options.items.map((item) => item.value);

  if (options.explicitPanels) {
    const rightValue = sanitizeTransferListValues(options.rightValue, knownValues);
    const rightSet = new Set(rightValue);
    const leftFromProp = sanitizeTransferListValues(options.leftValue, knownValues).filter(
      (value) => !rightSet.has(value),
    );
    const leftSet = new Set(leftFromProp);
    // Пункты каталога, не попавшие никуда — влево в порядке items
    const leftovers = itemsOrder.filter(
      (value) => !rightSet.has(value) && !leftSet.has(value),
    );
    return {
      leftValue: [...leftFromProp, ...leftovers],
      rightValue,
    };
  }

  const rightValue = sanitizeTransferListValues(options.rightValue, knownValues);
  const rightSet = new Set(rightValue);
  const leftValue = itemsOrder.filter((value) => !rightSet.has(value));
  return { leftValue, rightValue };
};

/**
 * Перенос выбранных значений между панелями.
 * @param options.leftValue - Левая панель
 * @param options.rightValue - Правая панель
 * @param options.movingValues - Что переносим
 * @param options.direction - Направление
 * @param options.insertIndex - Индекс вставки в целевой панели; иначе в конец
 */
export const moveTransferListValues = (options: {
  leftValue: string[];
  rightValue: string[];
  movingValues: string[];
  direction: 'to-right' | 'to-left';
  insertIndex?: number;
}): { leftValue: string[]; rightValue: string[] } => {
  const movingSet = new Set(options.movingValues);
  if (movingSet.size === 0) {
    return { leftValue: options.leftValue, rightValue: options.rightValue };
  }

  if (options.direction === 'to-right') {
    const leftValue = options.leftValue.filter((value) => !movingSet.has(value));
    const movingOrdered = options.leftValue.filter((value) => movingSet.has(value));
    const rightWithout = options.rightValue.filter((value) => !movingSet.has(value));
    const insertIndex =
      options.insertIndex == null
        ? rightWithout.length
        : Math.max(0, Math.min(options.insertIndex, rightWithout.length));
    const rightValue = [
      ...rightWithout.slice(0, insertIndex),
      ...movingOrdered,
      ...rightWithout.slice(insertIndex),
    ];
    return { leftValue, rightValue };
  }

  const rightValue = options.rightValue.filter((value) => !movingSet.has(value));
  const movingOrdered = options.rightValue.filter((value) => movingSet.has(value));
  const leftWithout = options.leftValue.filter((value) => !movingSet.has(value));
  const insertIndex =
    options.insertIndex == null
      ? leftWithout.length
      : Math.max(0, Math.min(options.insertIndex, leftWithout.length));
  const leftValue = [
    ...leftWithout.slice(0, insertIndex),
    ...movingOrdered,
    ...leftWithout.slice(insertIndex),
  ];
  return { leftValue, rightValue };
};

/**
 * Перенос всех доступных (не disabled) пунктов с одной панели на другую.
 * @param options.leftValue - Левая панель
 * @param options.rightValue - Правая панель
 * @param options.itemsByValue - Карта пунктов
 * @param options.direction - Направление
 */
export const moveAllTransferListValues = (options: {
  leftValue: string[];
  rightValue: string[];
  itemsByValue: Map<string, TransferListItem>;
  direction: 'to-right' | 'to-left';
}): { leftValue: string[]; rightValue: string[] } => {
  const source = options.direction === 'to-right' ? options.leftValue : options.rightValue;
  const movingValues = source.filter((value) => !options.itemsByValue.get(value)?.disabled);
  return moveTransferListValues({
    leftValue: options.leftValue,
    rightValue: options.rightValue,
    movingValues,
    direction: options.direction,
  });
};

/**
 * Строковое представление ReactNode для поиска (только string/number).
 * @param node - Label или description
 */
export const transferListNodeToSearchText = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  return '';
};

/**
 * Локальный фильтр по label/description.
 * @param items - Пункты панели (уже разрешённые объекты)
 * @param query - Строка поиска
 */
export const filterTransferListItems = (
  items: TransferListItem[],
  query: string,
): TransferListItem[] => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return items;
  }
  return items.filter((item) => {
    const labelText = transferListNodeToSearchText(item.label).toLowerCase();
    const descriptionText = transferListNodeToSearchText(item.description).toLowerCase();
    return labelText.includes(normalizedQuery) || descriptionText.includes(normalizedQuery);
  });
};

/**
 * Состояние checkbox «выбрать все» по видимым пунктам.
 * @param options.visibleItems - Отфильтрованные пункты
 * @param options.checkedValues - Текущий выбор
 */
export const resolveTransferListSelectAllState = (options: {
  visibleItems: TransferListItem[];
  checkedValues: Set<string> | string[];
}): { checked: boolean; indeterminate: boolean } => {
  const checkedSet =
    options.checkedValues instanceof Set
      ? options.checkedValues
      : new Set(options.checkedValues);
  const selectable = options.visibleItems.filter((item) => !item.disabled);
  if (selectable.length === 0) {
    return { checked: false, indeterminate: false };
  }
  const selectedCount = selectable.filter((item) => checkedSet.has(item.value)).length;
  if (selectedCount === 0) {
    return { checked: false, indeterminate: false };
  }
  if (selectedCount === selectable.length) {
    return { checked: true, indeterminate: false };
  }
  return { checked: false, indeterminate: true };
};

/**
 * Включает или снимает выбор со всех видимых (не disabled) пунктов.
 * @param options.visibleItems - Видимые пункты
 * @param options.checkedValues - Текущий выбор панели
 * @param options.selectAll - true = отметить все видимые
 */
export const toggleTransferListSelectAllChecked = (options: {
  visibleItems: TransferListItem[];
  checkedValues: string[];
  selectAll: boolean;
}): string[] => {
  const visibleSelectable = new Set(
    options.visibleItems.filter((item) => !item.disabled).map((item) => item.value),
  );
  if (options.selectAll) {
    const next = new Set(options.checkedValues);
    visibleSelectable.forEach((value) => next.add(value));
    return Array.from(next);
  }
  return options.checkedValues.filter((value) => !visibleSelectable.has(value));
};

/**
 * Reorder внутри одной панели: вырезает moving и вставляет с insertIndex по массиву без них.
 * @param panelValues - Текущий порядок
 * @param movingValues - Перемещаемые (порядок исходной панели)
 * @param insertIndex - Индекс среди оставшихся
 */
export const reorderTransferListValues = (
  panelValues: string[],
  movingValues: string[],
  insertIndex: number,
): string[] => {
  const movingSet = new Set(movingValues);
  const movingOrdered = panelValues.filter((value) => movingSet.has(value));
  const withoutMoving = panelValues.filter((value) => !movingSet.has(value));
  const clampedIndex = Math.max(0, Math.min(insertIndex, withoutMoving.length));
  return [
    ...withoutMoving.slice(0, clampedIndex),
    ...movingOrdered,
    ...withoutMoving.slice(clampedIndex),
  ];
};

/**
 * Какие value участвуют в DnD: если тащим выбранный — все checked с панели в её порядке; иначе один пункт.
 * @param options.itemValue - Пункт под курсором
 * @param options.checkedValues - Выбранные на панели
 * @param options.panelValues - Порядок панели
 */
export const getTransferListDragValues = (options: {
  itemValue: string;
  checkedValues: string[];
  panelValues: string[];
}): string[] => {
  const checkedSet = new Set(options.checkedValues);
  if (checkedSet.has(options.itemValue)) {
    return options.panelValues.filter((value) => checkedSet.has(value));
  }
  return [options.itemValue];
};

/**
 * Payload DnD.
 */
export type TransferListDragPayload = {
  side: TransferListSide;
  values: string[];
};

/**
 * Сериализация DnD payload.
 * @param payload - Сторона и values
 */
export const serializeTransferListDragPayload = (payload: TransferListDragPayload): string =>
  JSON.stringify(payload);

/**
 * Парсинг DnD payload.
 * @param raw - Строка из dataTransfer
 */
export const parseTransferListDragPayload = (raw: string): TransferListDragPayload | null => {
  try {
    const parsed = JSON.parse(raw) as TransferListDragPayload;
    if (
      (parsed?.side === 'left' || parsed?.side === 'right') &&
      Array.isArray(parsed?.values)
    ) {
      return {
        side: parsed.side,
        values: parsed.values.filter((value): value is string => typeof value === 'string'),
      };
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Индекс вставки при drop на пункт (before = индекс пункта, after = индекс+1) в массиве без moving.
 * @param panelValues - Панель до drop
 * @param targetValue - Пункт под курсором
 * @param placeBefore - Вставить перед target
 * @param movingValues - Что переносим
 */
export const resolveTransferListDropInsertIndex = (options: {
  panelValues: string[];
  targetValue: string;
  placeBefore: boolean;
  movingValues: string[];
}): number => {
  const movingSet = new Set(options.movingValues);
  const withoutMoving = options.panelValues.filter((value) => !movingSet.has(value));
  const targetIndex = withoutMoving.indexOf(options.targetValue);
  if (targetIndex < 0) {
    return withoutMoving.length;
  }
  return options.placeBefore ? targetIndex : targetIndex + 1;
};

/**
 * Высота списка в CSS.
 * @param height - px или строка
 */
export const transferListHeightToCss = (height?: number | string): string => {
  if (height == null) {
    return '240px';
  }
  if (typeof height === 'number') {
    return `${height}px`;
  }
  return height;
};
