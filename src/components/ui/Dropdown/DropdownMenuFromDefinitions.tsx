import React, { useMemo } from 'react';
import type {
  DropdownMenuGroup,
  DropdownMenuItemProps,
  DropdownMenuItemValue,
  DropdownVirtualScrollConfig,
} from '../../../types/ui';
import { Size } from '../../../types/sizes';
import {
  DropdownGroupDescription,
  DropdownGroupHeader,
  DropdownGroupTitle,
} from './Dropdown.style';
import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuItem } from './DropdownMenuItem';
import { getMenuItemKey, isDropdownGroup } from './handlers';
import {
  collectTreeBranchKeysFromSections,
  definitionsContainNestedTree,
} from '../../../handlers/dropdownTreeSelectionHandlers';

/**
 * Пропсы дерева меню, собранного из плоского списка и групп (`DropdownMenuGroup`).
 * Колбэки выбора и `value` при использовании внутри `Dropdown` подставляются через `cloneElement`.
 */
export type DropdownMenuFromDefinitionsProps = {
  /** Плоский список пунктов и/или групп с `items` (как у пропса `items` у `Dropdown`) */
  definitions: (DropdownMenuItemProps | DropdownMenuGroup)[];
  /** Текущее значение (одно или массив при `multiSelection`) */
  value?: DropdownMenuItemValue | DropdownMenuItemValue[];
  /** Выбор пункта: внутри `Dropdown` заменяется на обработчик с закрытием панели */
  onItemSelect?: (value?: DropdownMenuItemValue, event?: React.MouseEvent<HTMLElement>) => void;
  /** Подсветка / навигация по наведению */
  onActivateItem?: (value?: DropdownMenuItemValue) => void;
  /** Множественный выбор */
  multiSelection?: boolean;
  /** При мультивыборе: показывать чекбоксы в строках */
  showCheckbox?: boolean;
  /** Не подсвечивать выбранную строку в одиночном режиме */
  disableSelectedOptionHighlight?: boolean;
  /** Виртуальный скролл (отключается при группах или дереве `nestedItems`) */
  virtualScroll?: DropdownVirtualScrollConfig;
  /** Размер строки меню */
  size?: Size;
  /** Плотность контейнера меню */
  menuDensity?: 'default' | 'compact';
  /** Доп. класс на корневом `DropdownMenu` */
  className?: string;
  /** Разрешить сворачивание веток с `nestedItems` */
  treeExpandable?: boolean;
  /** Начальное раскрытие веток: все развёрнуты (по умолчанию), все свёрнуты или явные ключи */
  treeDefaultExpanded?: 'expanded' | 'collapsed' | string[];
  /** Контролируемые ключи раскрытых веток */
  treeExpandedKeys?: string[];
  /** Смена раскрытых веток (контролируемый режим) */
  onTreeExpandedKeysChange?: (keys: string[]) => void;
  /** Полный узел по `value` для чекбокса родителя при урезанном дереве (прокидывает `Dropdown`) */
  lookupTreeMenuItemByValue?: (itemValue: string) => DropdownMenuItemProps | null;
};

/**
 * Рендер `DropdownMenu` + `DropdownMenuItem` из массива определений (как при `items` у `Dropdown`).
 * Общая реализация для селекта и любых других потребителей, чтобы список менялся в одном месте.
 */
export const DropdownMenuFromDefinitions: React.FC<DropdownMenuFromDefinitionsProps> = ({
  definitions,
  value,
  onItemSelect,
  onActivateItem,
  multiSelection,
  showCheckbox,
  disableSelectedOptionHighlight,
  virtualScroll,
  size = Size.MD,
  menuDensity = 'default',
  className,
  treeExpandable = true,
  treeDefaultExpanded = 'expanded',
  treeExpandedKeys,
  onTreeExpandedKeysChange,
  lookupTreeMenuItemByValue,
}) => {
  if (!definitions?.length) {
    return null;
  }

  const hasGroups = definitions.some(isDropdownGroup);
  const hasNestedTree = definitionsContainNestedTree(definitions);
  const effectiveVirtualScroll =
    hasGroups || hasNestedTree ? undefined : virtualScroll;

  const pinnedTop = definitions.filter(
    (definition) => isDropdownGroup(definition) && definition.pinned === 'top',
  );
  const pinnedBottom = definitions.filter(
    (definition) => isDropdownGroup(definition) && definition.pinned === 'bottom',
  );
  const middle = definitions.filter(
    (definition) => !isDropdownGroup(definition) || !definition.pinned,
  );

  const defaultExpandedTreeKeys = useMemo(() => {
    if (!hasNestedTree) {
      return [] as string[];
    }
    if (treeDefaultExpanded === 'collapsed') {
      return [];
    }
    if (Array.isArray(treeDefaultExpanded)) {
      return treeDefaultExpanded;
    }
    return collectTreeBranchKeysFromSections(pinnedTop, middle, pinnedBottom);
  }, [hasNestedTree, treeDefaultExpanded, pinnedTop, middle, pinnedBottom]);

  let itemIndex = 0;

  const renderMenuItem = (
    item: DropdownMenuItemProps,
    sectionAncestorKey: string,
    siblingIndex: number,
  ) => {
    const globalIndex = itemIndex;
    itemIndex += 1;
    return (
      <DropdownMenuItem
        key={getMenuItemKey(item, globalIndex)}
        {...item}
        treeAncestorKey={sectionAncestorKey}
        treeIndex={siblingIndex}
      />
    );
  };

  const renderGroup = (group: DropdownMenuGroup, fragmentKey: string, groupSequence: number) => {
    const groupAncestorKey = `g${groupSequence}`;
    return (
      <React.Fragment key={fragmentKey}>
        {(group.title || group.description) && (
          <DropdownGroupHeader>
            {group.title ? <DropdownGroupTitle>{group.title}</DropdownGroupTitle> : null}
            {group.description ? (
              <DropdownGroupDescription>{group.description}</DropdownGroupDescription>
            ) : null}
          </DropdownGroupHeader>
        )}
        {group.items.map((groupItem, groupItemIndex) =>
          renderMenuItem(groupItem, groupAncestorKey, groupItemIndex),
        )}
      </React.Fragment>
    );
  };

  let groupSequenceCounter = 0;

  const renderDefinitions = (
    sectionDefinitions: (DropdownMenuItemProps | DropdownMenuGroup)[],
    sectionKey: string,
    sectionAncestorKey: string,
  ) =>
    sectionDefinitions.map((definition, index) => {
      if (isDropdownGroup(definition)) {
        const sequence = groupSequenceCounter;
        groupSequenceCounter += 1;
        return renderGroup(definition, `group-${sectionKey}-${index}`, sequence);
      }
      return renderMenuItem(definition as DropdownMenuItemProps, sectionAncestorKey, index);
    });

  return (
    <DropdownMenu
      className={className}
      value={value}
      onItemSelect={onItemSelect}
      onActivateItem={onActivateItem}
      multiSelection={multiSelection}
      showCheckbox={showCheckbox}
      disableSelectedOptionHighlight={disableSelectedOptionHighlight}
      virtualScroll={effectiveVirtualScroll}
      size={size}
      menuDensity={menuDensity}
      treeExpandable={hasNestedTree ? treeExpandable !== false : false}
      defaultExpandedTreeKeys={defaultExpandedTreeKeys}
      treeExpandedKeys={treeExpandedKeys}
      onTreeExpandedKeysChange={onTreeExpandedKeysChange}
      lookupTreeMenuItemByValue={lookupTreeMenuItemByValue}
    >
      {renderDefinitions(pinnedTop, 'pinned-top', 'pt')}
      {renderDefinitions(middle, 'regular', 'm')}
      {renderDefinitions(pinnedBottom, 'pinned-bottom', 'pb')}
    </DropdownMenu>
  );
};

DropdownMenuFromDefinitions.displayName = 'DropdownMenuFromDefinitions';
