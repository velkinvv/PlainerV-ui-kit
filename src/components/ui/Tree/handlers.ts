import React, { Children, isValidElement } from 'react';
import type {
  TreeDropArgs,
  TreeDropPosition,
  TreeItemData,
  TreeSelectionControl,
  TreeSelectionMode,
} from '../../../types/ui';
import { Size } from '../../../types/sizes';

/**
 * Резолвит тип контрола узлов.
 * `selectionControl` приоритетнее; `checkable` — алиас checkbox.
 * @param selectionControl - Явный режим
 * @param checkable - Legacy-флаг чекбоксов
 */
export const resolveTreeSelectionControl = (
  selectionControl: TreeSelectionControl | undefined,
  checkable: boolean,
): TreeSelectionControl => {
  if (selectionControl !== undefined) {
    return selectionControl;
  }
  return checkable ? 'checkbox' : 'none';
};

/** Геометрия строки дерева */
export type TreeGeometry = {
  /** Минимальная высота строки */
  rowMinHeight: string;
  /** Горизонтальный padding */
  paddingInline: string;
  /** Вертикальный padding */
  paddingBlock: string;
  /** Размер шрифта */
  fontSize: string;
  /** Шаг отступа на уровень */
  indentStep: number;
  /** Размер слота chevron / иконки */
  iconSlotSize: number;
};

/**
 * Геометрия Tree по размеру.
 * @param size - Размер из дизайн-системы
 */
export const getTreeGeometry = (size: Size = Size.MD): TreeGeometry => {
  if (size === Size.SM || size === Size.XS) {
    return {
      rowMinHeight: '32px',
      paddingInline: '8px',
      paddingBlock: '4px',
      fontSize: '12px',
      indentStep: 20,
      iconSlotSize: 20,
    };
  }
  return {
    rowMinHeight: '40px',
    paddingInline: '12px',
    paddingBlock: '6px',
    fontSize: '14px',
    indentStep: 24,
    iconSlotSize: 24,
  };
};

/**
 * Находит узел по id в дереве.
 * @param items - Корневые узлы
 * @param itemId - Искомый id
 */
export const findTreeItemById = (
  items: TreeItemData[],
  itemId: string,
): TreeItemData | undefined => {
  for (const item of items) {
    if (item.id === itemId) {
      return item;
    }
    const nested = item.children?.length
      ? findTreeItemById(item.children, itemId)
      : undefined;
    if (nested) {
      return nested;
    }
  }
  return undefined;
};

/**
 * Собирает id всех потомков узла (без самого узла).
 * @param items - Корневые узлы
 * @param itemId - Id родителя
 */
export const collectDescendantIds = (items: TreeItemData[], itemId: string): string[] => {
  const node = findTreeItemById(items, itemId);
  if (!node?.children?.length) {
    return [];
  }
  const result: string[] = [];
  const walk = (nodes: TreeItemData[]) => {
    for (const child of nodes) {
      result.push(child.id);
      if (child.children?.length) {
        walk(child.children);
      }
    }
  };
  walk(node.children);
  return result;
};

/**
 * Проверяет, является ли possibleAncestor предком descendantId.
 * @param items - Корневые узлы
 * @param possibleAncestorId - Кандидат в предки
 * @param descendantId - Потомок
 */
export const isAncestorOf = (
  items: TreeItemData[],
  possibleAncestorId: string,
  descendantId: string,
): boolean => collectDescendantIds(items, possibleAncestorId).includes(descendantId);

/**
 * Toggle id в списке без мутации.
 * @param ids - Текущий список
 * @param itemId - Id для переключения
 */
export const toggleIdInList = (ids: string[], itemId: string): string[] =>
  ids.includes(itemId) ? ids.filter((entry) => entry !== itemId) : [...ids, itemId];

/**
 * Следующий набор selectedIds.
 * @param selectionMode - single | multiple
 * @param currentSelectedIds - Текущий выбор
 * @param itemId - Узел
 */
export const getNextSelectedIds = (
  selectionMode: TreeSelectionMode,
  currentSelectedIds: string[],
  itemId: string,
): string[] => {
  if (selectionMode === 'single') {
    return [itemId];
  }
  return toggleIdInList(currentSelectedIds, itemId);
};

/**
 * Toggle expanded id.
 * @param expandedIds - Текущие раскрытые
 * @param itemId - Узел
 */
export const getNextExpandedIds = (expandedIds: string[], itemId: string): string[] =>
  toggleIdInList(expandedIds, itemId);

/** Параметры пересчёта checked */
export type GetNextCheckedIdsParams = {
  items: TreeItemData[];
  currentCheckedIds: string[];
  itemId: string;
  nextChecked: boolean;
  checkStrictly: boolean;
};

/**
 * Собирает карту parentId по id узла.
 * @param items - Дерево
 * @param parentId - Id родителя текущего уровня
 */
const buildParentMap = (
  items: TreeItemData[],
  parentId: string | null = null,
  map: Map<string, string | null> = new Map(),
): Map<string, string | null> => {
  for (const item of items) {
    map.set(item.id, parentId);
    if (item.children?.length) {
      buildParentMap(item.children, item.id, map);
    }
  }
  return map;
};

/**
 * Enabled-потомки первого уровня (рекурсивно все leaf-capable для cascade).
 * @param items - Дерево
 * @param itemId - Узел
 */
const collectEnabledDescendantIds = (items: TreeItemData[], itemId: string): string[] => {
  const descendants = collectDescendantIds(items, itemId);
  return descendants.filter((descendantId) => {
    const node = findTreeItemById(items, descendantId);
    return !node?.disabled;
  });
};

/**
 * Пересчитывает checked родителей снизу вверх после изменения узла.
 * @param items - Дерево
 * @param checkedSet - Множество checked
 * @param startItemId - Узел, с которого идём к корню
 */
const recalculateAncestorsChecked = (
  items: TreeItemData[],
  checkedSet: Set<string>,
  startItemId: string,
): void => {
  const parentMap = buildParentMap(items);
  let currentParentId = parentMap.get(startItemId) ?? null;

  while (currentParentId) {
    const parentNode = findTreeItemById(items, currentParentId);
    if (!parentNode || parentNode.disabled) {
      break;
    }

    const enabledDescendants = collectEnabledDescendantIds(items, currentParentId);
    const allChecked =
      enabledDescendants.length > 0 &&
      enabledDescendants.every((descendantId) => checkedSet.has(descendantId));

    if (allChecked) {
      checkedSet.add(currentParentId);
    } else {
      checkedSet.delete(currentParentId);
    }

    currentParentId = parentMap.get(currentParentId) ?? null;
  }
};

/**
 * Следующий набор checkedIds с учётом cascade / strict.
 * @param params - Параметры переключения
 */
export const getNextCheckedIds = (params: GetNextCheckedIdsParams): string[] => {
  const { items, currentCheckedIds, itemId, nextChecked, checkStrictly } = params;
  const target = findTreeItemById(items, itemId);
  if (!target || target.disabled) {
    return currentCheckedIds;
  }

  const checkedSet = new Set(currentCheckedIds);

  if (checkStrictly) {
    if (nextChecked) {
      checkedSet.add(itemId);
    } else {
      checkedSet.delete(itemId);
    }
    return Array.from(checkedSet);
  }

  const affectedIds = [itemId, ...collectDescendantIds(items, itemId)];
  for (const affectedId of affectedIds) {
    const node = findTreeItemById(items, affectedId);
    if (node?.disabled) {
      continue;
    }
    if (nextChecked) {
      checkedSet.add(affectedId);
    } else {
      checkedSet.delete(affectedId);
    }
  }

  recalculateAncestorsChecked(items, checkedSet, itemId);
  return Array.from(checkedSet);
};

/**
 * Id узлов в indeterminate (только при !checkStrictly).
 * @param items - Дерево
 * @param checkedIds - Отмеченные
 * @param checkStrictly - Строгий режим
 */
export const getIndeterminateIds = (
  items: TreeItemData[],
  checkedIds: string[],
  checkStrictly: boolean,
): string[] => {
  if (checkStrictly) {
    return [];
  }

  const checkedSet = new Set(checkedIds);
  const indeterminateIds: string[] = [];

  const walk = (nodes: TreeItemData[]) => {
    for (const node of nodes) {
      if (node.children?.length) {
        const enabledDescendants = collectEnabledDescendantIds(items, node.id);
        const checkedCount = enabledDescendants.filter((descendantId) =>
          checkedSet.has(descendantId),
        ).length;
        const isPartial =
          enabledDescendants.length > 0 &&
          checkedCount > 0 &&
          checkedCount < enabledDescendants.length;

        if (isPartial && !checkedSet.has(node.id)) {
          indeterminateIds.push(node.id);
        }
        walk(node.children);
      }
    }
  };

  walk(items);
  return indeterminateIds;
};

/** Плоский видимый узел */
export type FlatVisibleTreeItem = {
  item: TreeItemData;
  level: number;
};

/**
 * Плоский список видимых узлов с level (для клавиатуры / a11y).
 * @param items - Корневые узлы
 * @param expandedIds - Раскрытые id
 * @param level - Текущий уровень
 */
export const flattenVisibleTreeItems = (
  items: TreeItemData[],
  expandedIds: string[],
  level = 0,
): FlatVisibleTreeItem[] => {
  const result: FlatVisibleTreeItem[] = [];
  for (const item of items) {
    result.push({ item, level });
    if (item.children?.length && expandedIds.includes(item.id)) {
      result.push(...flattenVisibleTreeItems(item.children, expandedIds, level + 1));
    }
  }
  return result;
};

/**
 * Базовая проверка drop (себя/потомка/отсутствия цели).
 * @param args.items - Дерево
 * @param args.dragIds - Перетаскиваемые
 * @param args.targetId - Цель
 * @param args.position - Позиция
 */
export const canDropOnTreeTarget = (args: {
  items: TreeItemData[];
  dragIds: string[];
  targetId: string;
  position: TreeDropPosition;
}): boolean => {
  const { items, dragIds, targetId, position } = args;
  if (!dragIds.length || !targetId) {
    return false;
  }

  const target = findTreeItemById(items, targetId);
  if (!target) {
    return false;
  }
  if (target.droppable === false && position === 'into') {
    return false;
  }
  if (target.disabled) {
    return false;
  }

  for (const dragId of dragIds) {
    if (dragId === targetId) {
      return false;
    }
    if (isAncestorOf(items, dragId, targetId)) {
      return false;
    }
    const dragNode = findTreeItemById(items, dragId);
    if (!dragNode || dragNode.disabled || dragNode.draggable === false) {
      return false;
    }
  }

  return true;
};

/**
 * Удаляет узлы по id из дерева и возвращает вырезанные.
 * @param items - Дерево
 * @param idsToRemove - Id для удаления
 */
const extractNodesByIds = (
  items: TreeItemData[],
  idsToRemove: Set<string>,
): { nextItems: TreeItemData[]; extracted: TreeItemData[] } => {
  const extracted: TreeItemData[] = [];

  const walk = (nodes: TreeItemData[]): TreeItemData[] => {
    const result: TreeItemData[] = [];
    for (const node of nodes) {
      if (idsToRemove.has(node.id)) {
        extracted.push(node);
        continue;
      }
      const nextChildren = node.children?.length ? walk(node.children) : undefined;
      result.push(
        nextChildren
          ? { ...node, children: nextChildren.length ? nextChildren : undefined }
          : { ...node },
      );
    }
    return result;
  };

  return { nextItems: walk(items), extracted };
};

/**
 * Вставляет узлы относительно цели.
 * @param items - Дерево без извлечённых
 * @param targetId - Цель
 * @param position - Позиция
 * @param nodesToInsert - Вставляемые узлы
 */
const insertNodesAtTarget = (
  items: TreeItemData[],
  targetId: string,
  position: TreeDropPosition,
  nodesToInsert: TreeItemData[],
): TreeItemData[] => {
  const walk = (nodes: TreeItemData[]): TreeItemData[] => {
    const result: TreeItemData[] = [];

    for (const node of nodes) {
      if (node.id === targetId) {
        if (position === 'before') {
          result.push(...nodesToInsert, { ...node, children: node.children });
          continue;
        }
        if (position === 'after') {
          result.push({ ...node, children: node.children }, ...nodesToInsert);
          continue;
        }
        // into
        const existingChildren = node.children ? [...node.children] : [];
        result.push({
          ...node,
          children: [...existingChildren, ...nodesToInsert],
        });
        continue;
      }

      result.push({
        ...node,
        children: node.children?.length ? walk(node.children) : node.children,
      });
    }

    return result;
  };

  return walk(items);
};

/**
 * Иммутабельно применяет drop к дереву items.
 * @param items - Исходное дерево
 * @param drop - Параметры drop
 */
export const applyTreeDrop = (items: TreeItemData[], drop: TreeDropArgs): TreeItemData[] => {
  const { dragIds, targetId, position } = drop;
  if (
    !canDropOnTreeTarget({
      items,
      dragIds,
      targetId,
      position,
    })
  ) {
    return items;
  }

  const idsToRemove = new Set(dragIds);
  const { nextItems, extracted } = extractNodesByIds(items, idsToRemove);
  if (!extracted.length) {
    return items;
  }

  // Сохраняем порядок dragIds
  const extractedById = new Map(extracted.map((node) => [node.id, node]));
  const orderedExtracted = dragIds
    .map((dragId) => extractedById.get(dragId))
    .filter((node): node is TreeItemData => Boolean(node));

  return insertNodesAtTarget(nextItems, targetId, position, orderedExtracted);
};

/**
 * Определяет позицию drop по относительной Y-координате в строке.
 * @param offsetY - Y относительно элемента
 * @param elementHeight - Высота элемента
 */
export const resolveTreeDropPosition = (
  offsetY: number,
  elementHeight: number,
): TreeDropPosition => {
  if (elementHeight <= 0) {
    return 'into';
  }
  const ratio = offsetY / elementHeight;
  if (ratio < 0.25) {
    return 'before';
  }
  if (ratio > 0.75) {
    return 'after';
  }
  return 'into';
};

const TREE_ITEM_DISPLAY_NAME = 'Tree.Item';

/**
 * Проверяет, является ли элемент Tree.Item.
 * @param child - React-элемент
 */
const isTreeItemElement = (
  child: React.ReactElement,
): child is React.ReactElement<{
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  draggable?: boolean;
  droppable?: boolean;
  data?: unknown;
  tooltip?: TreeItemData['tooltip'];
  hint?: TreeItemData['hint'];
  onClick?: TreeItemData['onClick'];
  children?: React.ReactNode;
}> => {
  const elementType = child.type;
  if (typeof elementType !== 'function' && (typeof elementType !== 'object' || elementType == null)) {
    return false;
  }
  const displayName = (elementType as { displayName?: string }).displayName;
  return displayName === TREE_ITEM_DISPLAY_NAME || displayName === 'TreeItem';
};

/**
 * Преобразует React children Tree.Item в TreeItemData[].
 * @param children - ReactNode
 */
export const treeChildrenToItems = (children: React.ReactNode): TreeItemData[] => {
  const result: TreeItemData[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child) || !isTreeItemElement(child)) {
      return;
    }

    const {
      id,
      label,
      icon,
      disabled,
      draggable,
      droppable,
      data,
      tooltip,
      hint,
      onClick,
      children: nestedChildren,
    } = child.props;

    if (!id) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('Tree.Item: отсутствует обязательный проп id');
      }
      return;
    }

    result.push({
      id,
      label,
      icon,
      disabled,
      draggable,
      droppable,
      data,
      tooltip,
      hint,
      onClick,
      children: nestedChildren ? treeChildrenToItems(nestedChildren) : undefined,
    });
  });

  return result;
};

/**
 * Выбирает источник данных: непустой items иначе children.
 * Пустой `items={[]}` даёт пустое дерево (без fallback на children).
 * @param items - Data-driven модель
 * @param children - Compound children
 */
export const resolveTreeItems = (
  items: TreeItemData[] | undefined,
  children: React.ReactNode,
): TreeItemData[] => {
  if (items !== undefined) {
    return items;
  }
  return treeChildrenToItems(children);
};
