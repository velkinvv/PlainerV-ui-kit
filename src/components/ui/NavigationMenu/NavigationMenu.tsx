import React, { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import {
  NavigationMenuActiveAppearance,
  NavigationMenuExpandInteraction,
  type NavigationMenuProps,
} from '@/types/ui';
import { useNavigationMenuExpand } from '@/hooks/useNavigationMenuExpand';
import { coerceWidthForMotion } from '@/handlers/navigationMenuMotionHandlers';
import { NavigationMenuContext, type NavigationMenuContextValue } from './NavigationMenuContext';
import { NavigationMenuNav, NavigationMenuList } from './NavigationMenu.style';
import { NavigationMenuDepthProvider } from './NavigationMenuDepthContext';
import { NavigationMenuItem } from './NavigationMenuItem';

const DEFAULT_EXPAND_COMPACT = 72;
const DEFAULT_EXPAND_FULL = 280;

const expandTransition = {
  width: { type: 'tween' as const, duration: 0.34, ease: [0.25, 0.1, 0.25, 1] as const },
};

/**
 * Вертикальное меню навигации (макет Figma: expanded / collapsed, состояния пунктов).
 * Для выпадающей панели действий используйте компонент `Menu` в `components/ui/Menu`.
 * @param collapsed — только иконки; при expandInteraction ≠ none задаёт вид в режиме без интерактива (NONE)
 * @param activeId — контролируемый выбранный пункт (если передан, внешний источник истины)
 * @param defaultActiveId — начальный выбор в неконтролируемом режиме
 * @param onActiveChange — вызывается при выборе пункта (и в controlled, и в uncontrolled)
 * @param activeAppearance — BAR | HIGHLIGHTED | SOLID
 * @param expandInteraction — none | click | hover: раскрытие компактной колонки с анимацией ширины
 * @param expanded — контролируемое раскрытие (при expandInteraction ≠ none)
 * @param defaultExpanded — начальное раскрытие
 * @param onExpand — после разворота
 * @param onCollapse — после сворачивания
 * @param onExpandedChange — запрос смены expanded (контролируемый режим)
 * @param expandCompactWidth — ширина компактного режима (px или css)
 * @param expandFullWidth — ширина развёрнутого режима
 * @param collapsedNestedFlyout — при **collapsed** показывать **items** в панели при hover справа
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
  expandInteraction = NavigationMenuExpandInteraction.NONE,
  expanded: expandedProp,
  defaultExpanded = false,
  onExpand,
  onCollapse,
  onExpandedChange,
  expandCompactWidth = DEFAULT_EXPAND_COMPACT,
  expandFullWidth = DEFAULT_EXPAND_FULL,
  collapsedNestedFlyout = true,
}) => {
  const isControlled = activeIdProp !== undefined;
  const [internalActiveId, setInternalActiveId] = useState<string | null>(defaultActiveId ?? null);

  const activeId = isControlled ? (activeIdProp ?? null) : internalActiveId;

  const setActiveId = useCallback(
    (id: string) => {
      if (!isControlled) {
        setInternalActiveId(id);
      }
      onActiveChange?.(id);
    },
    [isControlled, onActiveChange],
  );

  const expand = useNavigationMenuExpand({
    expandInteraction,
    collapsed,
    expanded: expandedProp,
    defaultExpanded,
    onExpand,
    onCollapse,
    onExpandedChange,
  });

  const contextValue = useMemo<NavigationMenuContextValue>(
    () => ({
      collapsed: expand.effectiveCollapsed,
      activeId,
      setActiveId,
      activeAppearance,
      collapsedNestedFlyout,
    }),
    [expand.effectiveCollapsed, activeId, setActiveId, activeAppearance, collapsedNestedFlyout],
  );

  const navigationInner = (
    <NavigationMenuContext.Provider value={contextValue}>
      <NavigationMenuDepthProvider depth={0}>
        <NavigationMenuNav className={clsx('ui-navigation-menu', className)} aria-label={ariaLabel}>
          <NavigationMenuList>{children}</NavigationMenuList>
        </NavigationMenuNav>
      </NavigationMenuDepthProvider>
    </NavigationMenuContext.Provider>
  );

  if (!expand.isExpandInteractionEnabled) {
    return navigationInner;
  }

  const compactPx = coerceWidthForMotion(expandCompactWidth, DEFAULT_EXPAND_COMPACT);
  const fullPx = coerceWidthForMotion(expandFullWidth, DEFAULT_EXPAND_FULL);
  const targetWidthPx = expand.isExpanded ? fullPx : compactPx;

  return (
    <motion.div
      className="ui-navigation-menu-expand-root"
      {...expand.expandRootProps}
      initial={false}
      animate={{ width: targetWidthPx }}
      transition={expandTransition}
      style={{ overflow: 'hidden', flexShrink: 0, maxWidth: '100%' }}
    >
      {navigationInner}
    </motion.div>
  );
};

NavigationMenu.displayName = 'NavigationMenu';
NavigationMenu.Item = NavigationMenuItem;
