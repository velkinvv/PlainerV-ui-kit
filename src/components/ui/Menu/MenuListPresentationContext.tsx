import { createContext, useContext } from 'react';

/** Параметры оформления списка меню, общие для всех `MenuItem` внутри `Menu` */
export interface MenuListPresentationContextValue {
  /** Компактные вертикальные отступы */
  dense: boolean;
}

export const MenuListPresentationContext = createContext<
  MenuListPresentationContextValue | undefined
>(undefined);

/**
 * Плотность и прочие параметры списка из родительского `Menu`.
 * @throws если вызван вне `Menu`
 */
export const useMenuListPresentationContext = (): MenuListPresentationContextValue => {
  const value = useContext(MenuListPresentationContext);
  if (!value) {
    throw new Error('MenuItem должен находиться внутри компонента Menu');
  }
  return value;
};
