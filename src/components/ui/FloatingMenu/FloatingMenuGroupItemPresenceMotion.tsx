import React, { useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { getFloatingMenuItemPresenceMotionProps } from '@/handlers/floatingMenuItemPresenceHandlers';
import { measureFloatingMenuItemSizePx } from '@/handlers/floatingMenuItemMeasureHandlers';
import { useFloatingMenuRootContext } from './FloatingMenuContext';
import {
  FloatingMenuGroupItemPresence,
  FloatingMenuGroupItemRoot,
} from './FloatingMenu.style';

/** Пропсы анимированного пункта группы */
export type FloatingMenuGroupItemPresenceMotionProps = {
  /** Последний пункт группы — без trailing gap */
  isLastItem?: boolean;
  /** Содержимое пункта (FloatingMenu.GroupItem) */
  children: React.ReactNode;
};

/**
 * Обёртка пункта группы с AnimatePresence-анимацией (dynamicSize).
 * Размер измеряется клоном вне layout — корректно для fixed/flex контейнера.
 */
export const FloatingMenuGroupItemPresenceMotion: React.FC<
  FloatingMenuGroupItemPresenceMotionProps
> = ({ isLastItem = false, children }) => {
  const reducedMotion = useReducedMotion();
  const { orientation } = useFloatingMenuRootContext();
  const measureRef = useRef<HTMLDivElement>(null);
  const [contentSizePx, setContentSizePx] = useState(0);

  useLayoutEffect(() => {
    const measureElement = measureRef.current;
    if (!measureElement) {
      return undefined;
    }

    const updateMeasuredSize = () => {
      setContentSizePx(measureFloatingMenuItemSizePx(measureElement, orientation));
    };

    updateMeasuredSize();

    const resizeObserver = new ResizeObserver(updateMeasuredSize);
    resizeObserver.observe(measureElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [children, orientation]);

  const presenceMotionProps = getFloatingMenuItemPresenceMotionProps(reducedMotion, {
    orientation,
    isLastItem,
    contentSizePx,
  });

  return (
    <FloatingMenuGroupItemPresence
      className="ui-floating-menu-item-presence"
      $orientation={orientation}
      {...presenceMotionProps}
    >
      <FloatingMenuGroupItemRoot ref={measureRef}>{children}</FloatingMenuGroupItemRoot>
    </FloatingMenuGroupItemPresence>
  );
};
