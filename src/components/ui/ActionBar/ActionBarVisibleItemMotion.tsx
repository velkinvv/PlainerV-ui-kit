import React, { useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ActionBarOrientation } from '../../../types/ui';
import { getActionBarItemPresenceMotionProps } from '@/handlers/actionBarItemPresenceHandlers';
import { measureActionBarItemSizePx } from '@/handlers/actionBarItemMeasureHandlers';
import {
  ActionBarVisibleItemMeasureShell,
  ActionBarVisibleItemPresence,
} from './ActionBar.style';

/** Пропсы анимированного видимого действия */
export type ActionBarVisibleItemMotionProps = {
  /** Ориентация панели */
  orientation: ActionBarOrientation;
  /** Последний пункт — без trailing gap */
  isLastItem?: boolean;
  /** Содержимое слота (кнопка + разделитель) */
  children: React.ReactNode;
};

/**
 * Обёртка видимого действия с AnimatePresence-анимацией.
 * Размер измеряется клоном вне layout — панель корректно расширяется/сжимается.
 */
export const ActionBarVisibleItemMotion: React.FC<ActionBarVisibleItemMotionProps> = ({
  orientation,
  isLastItem = false,
  children,
}) => {
  const reducedMotion = useReducedMotion();
  const measureRef = useRef<HTMLDivElement>(null);
  const [contentSizePx, setContentSizePx] = useState(0);

  useLayoutEffect(() => {
    const measureElement = measureRef.current;
    if (!measureElement) {
      return undefined;
    }

    const updateMeasuredSize = () => {
      setContentSizePx(measureActionBarItemSizePx(measureElement, orientation));
    };

    updateMeasuredSize();

    const resizeObserver = new ResizeObserver(updateMeasuredSize);
    resizeObserver.observe(measureElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [children, orientation]);

  const presenceMotionProps = getActionBarItemPresenceMotionProps(reducedMotion, {
    orientation,
    isLastItem,
    contentSizePx,
  });

  return (
    <ActionBarVisibleItemPresence
      className="ui-action-bar-item-presence"
      $orientation={orientation}
      {...presenceMotionProps}
    >
      <ActionBarVisibleItemMeasureShell ref={measureRef} $orientation={orientation}>
        {children}
      </ActionBarVisibleItemMeasureShell>
    </ActionBarVisibleItemPresence>
  );
};
