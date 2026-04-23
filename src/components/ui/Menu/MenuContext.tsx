import { createContext, useContext } from 'react';
import type { MenuActiveAppearance } from '@/types/ui';

/** Значение контекста меню навигации */
export interface MenuContextValue {
  /** Компактный режим (только иконки) */
  collapsed: boolean;
  /** Текущий выбранный id */
  activeId: string | null;
  /** Установить активный пункт */
  setActiveId: (id: string) => void;
  /** Вариант подсветки активного пункта */
  activeAppearance: MenuActiveAppearance;
}

export const MenuContext = createContext<MenuContextValue | undefined>(undefined);

/**
 * Доступ к настройкам меню из `MenuItem`.
 * @throws если вызван вне `Menu`
 */
export const useMenuContext = (): MenuContextValue => {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw new Error('MenuItem должен находиться внутри компонента Menu');
  }
  return ctx;
};
