import type { Target, Transition } from 'framer-motion';
import type { DrawerPlacement } from '../../../types/ui';

const drawerTransition: Transition = { type: 'tween', duration: 0.25, ease: 'easeOut' };
const drawerReducedTransition: Transition = { duration: 0.01 };

/**
 * Анимация оверлея drawer (прозрачность).
 */
export const getDrawerOverlayMotion = (reducedMotion = false) => ({
  initial: { opacity: 0 } as Target,
  animate: { opacity: 1 } as Target,
  exit: { opacity: 0 } as Target,
  transition: reducedMotion
    ? ({ duration: 0.01 } as Transition)
    : ({ duration: 0.2, ease: 'easeOut' } as Transition),
});

/**
 * Возвращает motion-пропсы для выезда панели по стороне экрана.
 * @param placement - Сторона появления панели.
 */
export const getDrawerPanelMotion = (placement: DrawerPlacement, reducedMotion = false) => {
  const motionTransition = reducedMotion ? drawerReducedTransition : drawerTransition;
  switch (placement) {
    case 'left':
      return {
        initial: { x: '-100%' } as Target,
        animate: { x: 0 } as Target,
        exit: { x: '-100%' } as Target,
        transition: motionTransition,
      };
    case 'right':
      return {
        initial: { x: '100%' } as Target,
        animate: { x: 0 } as Target,
        exit: { x: '100%' } as Target,
        transition: motionTransition,
      };
    case 'top':
      return {
        initial: { y: '-100%' } as Target,
        animate: { y: 0 } as Target,
        exit: { y: '-100%' } as Target,
        transition: motionTransition,
      };
    case 'bottom':
      return {
        initial: { y: '100%' } as Target,
        animate: { y: 0 } as Target,
        exit: { y: '100%' } as Target,
        transition: motionTransition,
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
