import type { Target, Transition } from 'framer-motion';
import type { DrawerPlacement } from '../../../types/ui';

const drawerTransition: Transition = { type: 'tween', duration: 0.25, ease: 'easeOut' };

/**
 * Анимация оверлея drawer (прозрачность).
 */
export const drawerOverlayMotion = {
  initial: { opacity: 0 } as Target,
  animate: { opacity: 1 } as Target,
  exit: { opacity: 0 } as Target,
  transition: { duration: 0.2, ease: 'easeOut' } as Transition,
};

/**
 * Возвращает motion-пропсы для выезда панели по стороне экрана.
 * @param placement - Сторона появления панели.
 */
export const getDrawerPanelMotion = (placement: DrawerPlacement) => {
  switch (placement) {
    case 'left':
      return {
        initial: { x: '-100%' } as Target,
        animate: { x: 0 } as Target,
        exit: { x: '-100%' } as Target,
        transition: drawerTransition,
      };
    case 'right':
      return {
        initial: { x: '100%' } as Target,
        animate: { x: 0 } as Target,
        exit: { x: '100%' } as Target,
        transition: drawerTransition,
      };
    case 'top':
      return {
        initial: { y: '-100%' } as Target,
        animate: { y: 0 } as Target,
        exit: { y: '-100%' } as Target,
        transition: drawerTransition,
      };
    case 'bottom':
      return {
        initial: { y: '100%' } as Target,
        animate: { y: 0 } as Target,
        exit: { y: '100%' } as Target,
        transition: drawerTransition,
      };
  }
};

/**
 * Преобразует размер в CSS-значение для `width` / `height`.
 * @param value - Число (px), строка CSS или `undefined`
 * @param fallback - Значение по умолчанию, если `value` не задан
 */
export const drawerSizeToCss = (value: string | number | undefined, fallback: string): string => {
  if (value === undefined || value === null) {
    return fallback;
  }
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return String(value);
};
