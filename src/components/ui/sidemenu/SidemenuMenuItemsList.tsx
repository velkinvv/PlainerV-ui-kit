import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { NavigationMenu } from '../NavigationMenu';
import { NavigationMenuActiveAppearance } from '@/types/ui';
import type { SidemenuItem } from '../../../types/ui';
import {
  mapSidemenuItemToNavigationProps,
  resolveSidemenuActiveId,
  findSidemenuItemById,
} from '@/handlers/navigationMenuNestedHandlers';

/** Пропсы списка пунктов sidemenu */
export type SidemenuMenuItemsListProps = {
  /** Пункты меню */
  items: SidemenuItem[];
  /** Анимировать появление/удаление пунктов */
  animateItemPresence: boolean;
  /** Колбэк клика по пункту */
  onItemClick: (item: SidemenuItem) => void;
  /** Контролируемый activeId для NavigationMenu (приоритет над `items[].active`) */
  activeItemId?: string;
  /** collapsed режим NavigationMenu */
  collapsed: boolean;
  /** Колбэк: идёт mount/unmount анимация пунктов */
  onPresenceAnimatingChange?: (isAnimating: boolean) => void;
};

/**
 * Список пунктов {@link Sidemenu} с опциональной AnimatePresence-анимацией.
 *
 * @param animateItemPresence — включить mount/unmount анимацию пунктов
 * @param onPresenceAnimatingChange — уведомление о старте/завершении presence-анимации
 */
export const SidemenuMenuItemsList: React.FC<SidemenuMenuItemsListProps> = ({
  items,
  animateItemPresence,
  onItemClick,
  activeItemId,
  collapsed,
  onPresenceAnimatingChange,
}) => {
  const handleNavigationActiveChange = (nextActiveId: string) => {
    const selectedItem = findSidemenuItemById(items, nextActiveId);
    if (selectedItem) {
      onItemClick(selectedItem);
    }
  };

  const resolvedActiveId = activeItemId ?? resolveSidemenuActiveId(items);

  const menuItems = items.map((menuEntry, itemIndex) => (
    <NavigationMenu.Item
      key={menuEntry.id}
      presenceMotion={animateItemPresence}
      presenceMotionIsLastItem={animateItemPresence && itemIndex === items.length - 1}
      {...mapSidemenuItemToNavigationProps(menuEntry)}
    />
  ));

  return (
    <NavigationMenu
      collapsed={collapsed}
      activeId={resolvedActiveId}
      onActiveChange={handleNavigationActiveChange}
      activeAppearance={NavigationMenuActiveAppearance.HIGHLIGHTED}
      aria-label="Основная навигация приложения"
      className="ui-sidemenu__navigation"
    >
      {animateItemPresence ? (
        <AnimatePresence
          initial={false}
          mode="sync"
          onExitComplete={() => onPresenceAnimatingChange?.(false)}
        >
          {menuItems}
        </AnimatePresence>
      ) : (
        menuItems
      )}
    </NavigationMenu>
  );
};
