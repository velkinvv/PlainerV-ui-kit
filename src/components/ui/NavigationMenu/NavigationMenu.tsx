import React, { useCallback, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { NavigationMenuActiveAppearance, type NavigationMenuProps } from '@/types/ui';
import { NavigationMenuContext, type NavigationMenuContextValue } from './NavigationMenuContext';
import { NavigationMenuNav, NavigationMenuList } from './NavigationMenu.style';
import { NavigationMenuItem } from './NavigationMenuItem';

/**
 * Вертикальное меню навигации (макет Figma: expanded / collapsed, состояния пунктов).
 * Для выпадающей панели действий используйте компонент `Menu` в `components/ui/Menu`.
 * @param collapsed — только иконки; подписи скрыты визуально, остаются для скринридеров
 * @param activeId — контролируемый выбранный пункт (если передан, внешний источник истины)
 * @param defaultActiveId — начальный выбор в неконтролируемом режиме
 * @param onActiveChange — вызывается при выборе пункта (и в controlled, и в uncontrolled)
 * @param activeAppearance — BAR | HIGHLIGHTED | SOLID
 * @param aria-label — рекомендуется для `<nav>`
 * @param className — доп. класс на `<nav>`
 * @param children — только `NavigationMenuItem` / `NavigationMenu.Item`
 */
export const NavigationMenu: React.FC<NavigationMenuProps> & {
  Item: typeof NavigationMenuItem;
} = ({
  collapsed = false,
  activeId: activeIdProp,
  defaultActiveId = null,
  onActiveChange,
  activeAppearance = NavigationMenuActiveAppearance.BAR,
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

  const contextValue = useMemo<NavigationMenuContextValue>(
    () => ({
      collapsed,
      activeId,
      setActiveId,
      activeAppearance,
    }),
    [collapsed, activeId, setActiveId, activeAppearance],
  );

  return (
    <NavigationMenuContext.Provider value={contextValue}>
      <NavigationMenuNav className={clsx('ui-navigation-menu', className)} aria-label={ariaLabel}>
        <NavigationMenuList>{children}</NavigationMenuList>
      </NavigationMenuNav>
    </NavigationMenuContext.Provider>
  );
};

NavigationMenu.displayName = 'NavigationMenu';
NavigationMenu.Item = NavigationMenuItem;
