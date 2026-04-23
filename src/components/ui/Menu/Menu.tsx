import React, { useCallback, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { MenuActiveAppearance, type MenuProps } from '@/types/ui';
import { MenuContext, type MenuContextValue } from './MenuContext';
import { MenuNav, MenuList } from './Menu.style';
import { MenuItem } from './MenuItem';

/**
 * Вертикальное меню навигации (макет Figma: expanded / collapsed, состояния пунктов).
 * @property collapsed — только иконки; подписи скрыты визуально, остаются для скринридеров
 * @property activeId — контролируемый выбранный пункт (если передан, внешний источник истины)
 * @property defaultActiveId — начальный выбор в неконтролируемом режиме
 * @property onActiveChange — вызывается при выборе пункта (и в controlled, и в uncontrolled)
 * @property activeAppearance — BAR | HIGHLIGHTED | SOLID
 * @property aria-label — рекомендуется для `<nav>`
 * @property className — доп. класс на `<nav>`
 * @property children — только `MenuItem` / `Menu.Item`
 */
export const Menu: React.FC<MenuProps> & { Item: typeof MenuItem } = ({
  collapsed = false,
  activeId: activeIdProp,
  defaultActiveId = null,
  onActiveChange,
  activeAppearance = MenuActiveAppearance.BAR,
  className,
  children,
  'aria-label': ariaLabel,
}) => {
  const isControlled = activeIdProp !== undefined;
  const [internalActiveId, setInternalActiveId] = useState<string | null>(defaultActiveId ?? null);

  const activeId = isControlled ? activeIdProp ?? null : internalActiveId;

  const setActiveId = useCallback(
    (id: string) => {
      if (!isControlled) {
        setInternalActiveId(id);
      }
      onActiveChange?.(id);
    },
    [isControlled, onActiveChange],
  );

  const contextValue = useMemo<MenuContextValue>(
    () => ({
      collapsed,
      activeId,
      setActiveId,
      activeAppearance,
    }),
    [collapsed, activeId, setActiveId, activeAppearance],
  );

  return (
    <MenuContext.Provider value={contextValue}>
      <MenuNav className={clsx('ui-menu', className)} aria-label={ariaLabel}>
        <MenuList>{children}</MenuList>
      </MenuNav>
    </MenuContext.Provider>
  );
};

Menu.displayName = 'Menu';
Menu.Item = MenuItem;
