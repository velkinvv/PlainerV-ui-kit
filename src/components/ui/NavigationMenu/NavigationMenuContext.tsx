import { createContext, useContext } from 'react';
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
