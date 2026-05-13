import type { NavigationMenuItemProps, SidemenuItem } from '@/types/ui';

/**
 * Есть ли среди потомков пункт с данным activeId (для подсветки родителя и авто-раскрытия ветки).
 * @param nestedItems — дерево вложенных пунктов
 * @param activeId — текущий активный id или null
 */
export function navigationMenuSubtreeContainsActiveId(
  nestedItems: NavigationMenuItemProps[] | undefined,
  activeId: string | null,
): boolean {
  if (nestedItems == null || nestedItems.length === 0 || activeId == null) {
    return false;
  }
  for (const entry of nestedItems) {
    if (entry.id === activeId) {
      return true;
    }
    if (navigationMenuSubtreeContainsActiveId(entry.items, activeId)) {
      return true;
    }
  }
  return false;
}

/**
 * Первый активный id в дереве Sidemenu (глубина-first).
 * @param entries — корневые пункты
 */
export function resolveSidemenuActiveId(entries: SidemenuItem[]): string | null {
  for (const entry of entries) {
    if (entry.active === true) {
      return entry.id;
    }
    if (entry.items != null && entry.items.length > 0) {
      const nestedId = resolveSidemenuActiveId(entry.items);
      if (nestedId != null) {
        return nestedId;
      }
    }
  }
  return null;
}

/**
 * Поиск пункта по id в дереве Sidemenu.
 * @param entries — корневые пункты
 * @param itemId — искомый id
 */
export function findSidemenuItemById(
  entries: SidemenuItem[],
  itemId: string,
): SidemenuItem | undefined {
  for (const entry of entries) {
    if (entry.id === itemId) {
      return entry;
    }
    if (entry.items != null && entry.items.length > 0) {
      const found = findSidemenuItemById(entry.items, itemId);
      if (found != null) {
        return found;
      }
    }
  }
  return undefined;
}

/**
 * Плоское преобразование {@link SidemenuItem} → пропсы {@link NavigationMenuItemProps}.
 * @param entry — элемент дерева сайдменю
 */
export function mapSidemenuItemToNavigationProps(entry: SidemenuItem): NavigationMenuItemProps {
  return {
    id: entry.id,
    label: entry.label,
    icon: entry.icon,
    badge:
      entry.notificationCount != null && entry.notificationCount > 0
        ? entry.notificationCount
        : undefined,
    status: entry.status,
    loading: entry.loading,
    skeleton: entry.skeleton,
    isVisible: entry.isVisible,
    items: entry.items?.map(mapSidemenuItemToNavigationProps),
    hint: entry.hint,
    tooltip: entry.tooltip,
    popover: entry.popover,
    popoverActivateNavigation: entry.popoverActivateNavigation,
  };
}
