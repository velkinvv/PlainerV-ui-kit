import React, { createContext, useContext, useMemo } from 'react';
import type { NavigationMenuActiveAppearance } from '@/types/ui';

/** Значение контекста меню навигации */
export interface NavigationMenuContextValue {
  /** Компактный режим (только иконки) */
  collapsed: boolean;
  /** Текущий выбранный id */
  activeId: string | null;
  /** Установить активный пункт */
  setActiveId: (id: string) => void;
  /** Вариант подсветки активного пункта */
  activeAppearance: NavigationMenuActiveAppearance;
  /** В compact: вложенные уровни показывать в панели при hover, а не в колонке */
  collapsedNestedFlyout: boolean;
}

/**
 * Внутри всплывающего подменю — визуально развёрнутый вид (подписи видны), без смены корня **NavigationMenu**.
 */
export function NavigationMenuFlyoutBranchProvider({ children }: { children: React.ReactNode }) {
  const parent = useNavigationMenuContext();
  const value = useMemo<NavigationMenuContextValue>(
    () => ({ ...parent, collapsed: false }),
    [parent],
  );
  return <NavigationMenuContext.Provider value={value}>{children}</NavigationMenuContext.Provider>;
}

export const NavigationMenuContext = createContext<NavigationMenuContextValue | undefined>(
  undefined,
);

/**
 * Доступ к настройкам меню из `NavigationMenuItem`.
 * @throws если вызван вне `NavigationMenu`
 */
export const useNavigationMenuContext = (): NavigationMenuContextValue => {
  const contextValue = useContext(NavigationMenuContext);
  if (!contextValue) {
    throw new Error('NavigationMenuItem должен находиться внутри компонента NavigationMenu');
  }
  return contextValue;
};
