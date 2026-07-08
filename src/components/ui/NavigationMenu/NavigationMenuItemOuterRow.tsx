import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { getSidemenuMenuItemPresenceMotionProps } from '@/handlers/sidemenuItemPresenceHandlers';
import {
  NavigationMenuRowCollapse,
  NavigationMenuRowCollapseInner,
  NavigationMenuRowPresence,
} from './NavigationMenu.style';

/** Пропсы внешней строки пункта меню */
export type NavigationMenuItemOuterRowProps = {
  /** AnimatePresence mount/unmount (Sidemenu dynamicHeight) */
  presenceMotion?: boolean;
  /** Последний пункт списка (без нижнего gap) */
  presenceMotionIsLastItem?: boolean;
  /** Показ строки с grid-collapse (без unmount) */
  isVisible: boolean;
  /** Содержимое строки */
  children: React.ReactNode;
};

/**
 * Внешняя обёртка пункта: обычный collapse или motion.li для AnimatePresence.
 *
 * @param presenceMotion — motion-строка для mount/unmount
 * @param presenceMotionIsLastItem — последний пункт (gap)
 * @param isVisible — видимость при grid-collapse
 */
export const NavigationMenuItemOuterRow: React.FC<NavigationMenuItemOuterRowProps> = ({
  presenceMotion = false,
  presenceMotionIsLastItem = false,
  isVisible,
  children,
}) => {
  const reducedMotion = useReducedMotion();

  if (presenceMotion) {
    const presenceMotionProps = getSidemenuMenuItemPresenceMotionProps(reducedMotion, {
      isLastItem: presenceMotionIsLastItem,
      animateHeight: true,
    });

    return (
      <NavigationMenuRowPresence
        className="ui-navigation-menu-row-presence"
        {...presenceMotionProps}
      >
        <NavigationMenuRowCollapseInner>{children}</NavigationMenuRowCollapseInner>
      </NavigationMenuRowPresence>
    );
  }

  return (
    <NavigationMenuRowCollapse $isVisible={isVisible}>
      <NavigationMenuRowCollapseInner>{children}</NavigationMenuRowCollapseInner>
    </NavigationMenuRowCollapse>
  );
};
