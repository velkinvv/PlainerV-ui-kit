import type {
  DropdownMenuGroup,
  DropdownMenuItemProps,
  DropdownMenuItemValue,
  SelectOption,
} from '../types/ui';

/**
 * Собирает стабильный ключ ветки для раскрытия дерева.
 * @param parentKey - Префикс предка (`''` для корня) или путь вида `a/b`.
 * @param item - Пункт меню (`id` или `value`, иначе индекс).
 * @param siblingIndex - Индекс среди соседей (fallback, если нет `id` и `value`).
 */
export const buildDropdownTreeBranchKey = (
  parentKey: string,
  item: DropdownMenuItemProps,
  siblingIndex: number,
): string => {
  const segment =
    item.id !== undefined && item.id !== ''
      ? item.id
      : item.value !== undefined && item.value !== null
        ? String(item.value)
        : `n-${siblingIndex}`;
  return parentKey ? `${parentKey}/${segment}` : segment;
};

/**
 * Рекурсивно проверяет, есть ли у определений вложенные `nestedItems`.
 * @param definitions - Плоский список пунктов и групп (`items` у группы).
 */
export const definitionsContainNestedTree = (
  definitions: (DropdownMenuItemProps | DropdownMenuGroup)[],
): boolean => {
  for (const entry of definitions) {
    if ('items' in entry && Array.isArray(entry.items)) {
      if (definitionsContainNestedTree(entry.items)) {
        return true;
      }
      continue;
    }
    const item = entry as DropdownMenuItemProps;
    if (item.nestedItems?.length) {
      return true;
    }
  }
  return false;
};

/**
 * Собирает ключи всех узлов, у которых есть дочерние `nestedItems` (для режима «всё развёрнуто»).
 * @param definitions - Корневые пункты и группы.
 */
const walkNestedBranches = (items: DropdownMenuItemProps[], parentKey: string, keys: string[]) => {
  items.forEach((item, siblingIndex) => {
    const key = buildDropdownTreeBranchKey(parentKey, item, siblingIndex);
    if (item.nestedItems?.length) {
      keys.push(key);
      walkNestedBranches(item.nestedItems, key, keys);
    }
  });
};

/**
 * Собирает ключи раскрытых по умолчанию веток в том же порядке секций, что и `DropdownMenuFromDefinitions`.
 * @param pinnedTop - Закреплённые сверху
 * @param middle - Основная секция
 * @param pinnedBottom - Закреплённые снизу
 */
export const collectTreeBranchKeysFromSections = (
  pinnedTop: (DropdownMenuItemProps | DropdownMenuGroup)[],
  middle: (DropdownMenuItemProps | DropdownMenuGroup)[],
  pinnedBottom: (DropdownMenuItemProps | DropdownMenuGroup)[],
): string[] => {
  const keys: string[] = [];
  let groupSequence = 0;

  const scanSection = (
    section: (DropdownMenuItemProps | DropdownMenuGroup)[],
    sectionPrefix: string,
  ) => {
    section.forEach((entry, entryIndex) => {
      if ('items' in entry && Array.isArray(entry.items)) {
        const groupPrefix = `g${groupSequence}`;
        groupSequence += 1;
        walkNestedBranches(entry.items, groupPrefix, keys);
        return;
      }
      const item = entry as DropdownMenuItemProps;
      const key = buildDropdownTreeBranchKey(sectionPrefix, item, entryIndex);
      if (item.nestedItems?.length) {
        keys.push(key);
        walkNestedBranches(item.nestedItems, key, keys);
      }
    });
  };

  scanSection(pinnedTop, 'pt');
  scanSection(middle, 'm');
  scanSection(pinnedBottom, 'pb');
  return keys;
};

/** @deprecated Используйте `collectTreeBranchKeysFromSections` с разбиением по секциям */
export const collectTreeBranchKeysWithChildren = (
  definitions: (DropdownMenuItemProps | DropdownMenuGroup)[],
): string[] => {
  return collectTreeBranchKeysFromSections(definitions, [], []);
};

/**
 * Все выбираемые `value` в поддереве (узел и потомки), пропуская `disabled`.
 * @param item - Корень поддерева.
 */
export const collectSelectableValuesFromTreeItem = (item: DropdownMenuItemProps): string[] => {
  const out: string[] = [];
  const walk = (node: DropdownMenuItemProps) => {
    if (node.disabled) {
      return;
    }
    if (node.value !== undefined && node.value !== null) {
      out.push(String(node.value));
    }
    node.nestedItems?.forEach(walk);
  };
  walk(item);
  return out;
};

/**
 * Ищет пункт по `value` в дереве опций селекта.
 * @param options - Корневые опции.
 * @param value - Искомое значение.
 */
export const findSelectOptionNodeByValue = (
  options: SelectOption[],
  value: string,
): SelectOption | null => {
  for (const option of options) {
    if (option.value === value) {
      return option;
    }
    if (option.options?.length) {
      const found = findSelectOptionNodeByValue(option.options, value);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

/**
 * Ищет пункт меню по `value` в лесу определений (включая `nestedItems` и `items` групп).
 * @param definitions - Список как у `Dropdown.items`.
 * @param value - Искомое значение.
 */
export const findDropdownMenuItemByValueInDefinitions = (
  definitions: (DropdownMenuItemProps | DropdownMenuGroup)[],
  value: string,
): DropdownMenuItemProps | null => {
  for (const entry of definitions) {
    if ('items' in entry && Array.isArray(entry.items)) {
      const found = findDropdownMenuItemByValueInDefinitions(entry.items, value);
      if (found) {
        return found;
      }
      continue;
    }
    const item = entry as DropdownMenuItemProps;
    if (String(item.value ?? '') === value) {
      return item;
    }
    if (item.nestedItems?.length) {
      const found = findDropdownMenuItemByValueInDefinitions(item.nestedItems, value);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

/**
 * Каскадный мультивыбор по дереву: клик по строке родителя — если в поддереве никого нет в выборе, выбрать всё поддерево;
 * если выбрано хотя бы одно значение (включая частичный выбор), снять всё поддерево. Чекбокс родителя передаёт явный `checked`.
 * Лист — по одному.
 * @param current - Текущий массив выбранных строк.
 * @param toggledValue - `value` узла, по которому кликнули.
 * @param definitions - Дерево пунктов (`nestedItems` / группы), как в открытой панели.
 * @param checkedFromCheckbox - Если пришло из чекбокса: целевое `checked` (в т.ч. indeterminate → снять ветку через `false`).
 * @param lookupDefinitions - Полное дерево для поиска узла и сбора поддерева (например, селект: `mapSelectOptionsToDropdownItems(options)`, а в панели — после `filterSelectItemsByQuery`). Если не задано, используется `definitions`.
 */
export const applyTreeMultiSelectionToValues = (
  current: string[],
  toggledValue: string,
  definitions: (DropdownMenuItemProps | DropdownMenuGroup)[],
  checkedFromCheckbox?: boolean,
  lookupDefinitions?: (DropdownMenuItemProps | DropdownMenuGroup)[] | null,
): string[] => {
  const lookupList = lookupDefinitions?.length ? lookupDefinitions : definitions;
  const node = findDropdownMenuItemByValueInDefinitions(lookupList, toggledValue);
  if (!node) {
    const set = new Set(current);
    if (set.has(toggledValue)) {
      set.delete(toggledValue);
    } else {
      set.add(toggledValue);
    }
    return [...set];
  }

  const subtreeValues = collectSelectableValuesFromTreeItem(node);
  const selectedSet = new Set(current);

  if (node.nestedItems?.length) {
    /** Хотя бы одно выбираемое значение поддерева уже в `current` (частичный или полный выбор). */
    const someInSubtreeSelected = subtreeValues.some((valueKey) => selectedSet.has(valueKey));

    if (checkedFromCheckbox === true) {
      subtreeValues.forEach((valueKey) => selectedSet.add(valueKey));
      return [...selectedSet];
    }
    if (checkedFromCheckbox === false) {
      subtreeValues.forEach((valueKey) => selectedSet.delete(valueKey));
      return [...selectedSet];
    }

    // Клик по строке (не по чекбоксу): «пусто» → выбрать ветку целиком; иначе — очистить ветку (частичный выбор тоже снимается).
    if (someInSubtreeSelected) {
      subtreeValues.forEach((valueKey) => selectedSet.delete(valueKey));
    } else {
      subtreeValues.forEach((valueKey) => selectedSet.add(valueKey));
    }
    return [...selectedSet];
  }

  if (checkedFromCheckbox === true) {
    selectedSet.add(toggledValue);
    return [...selectedSet];
  }
  if (checkedFromCheckbox === false) {
    selectedSet.delete(toggledValue);
    return [...selectedSet];
  }

  if (selectedSet.has(toggledValue)) {
    selectedSet.delete(toggledValue);
  } else {
    selectedSet.add(toggledValue);
  }
  return [...selectedSet];
};

/**
 * Состояние чекбокса родителя: все выбраны / частично / нет.
 * @param item - Узел с возможными `nestedItems`.
 * @param selectedValues - Текущий набор выбранных значений.
 */
export const getTreeParentCheckboxVisualState = (
  item: DropdownMenuItemProps,
  selectedValues: DropdownMenuItemValue[],
): { checked: boolean; indeterminate: boolean } => {
  const subtree = collectSelectableValuesFromTreeItem(item);
  if (subtree.length === 0) {
    return { checked: false, indeterminate: false };
  }
  const set = new Set(selectedValues.map((valueEntry) => String(valueEntry)));
  const selectedCount = subtree.filter((valueKey) => set.has(valueKey)).length;
  if (selectedCount === 0) {
    return { checked: false, indeterminate: false };
  }
  if (selectedCount === subtree.length) {
    return { checked: true, indeterminate: false };
  }
  return { checked: false, indeterminate: true };
};
