import type { Transition } from 'framer-motion';

/** Отступ по умолчанию для max-height динамической панели (px) */
export const DEFAULT_SIDEMENU_DYNAMIC_HEIGHT_INSET_PX = 16;

/**
 * CSS max-height: минимум из высоты вьюпорта и родителя минус отступы с двух сторон.
 *
 * @param insetPx — отступ от краёв (px)
 */
export function resolveSidemenuDynamicHeightMaxCss(insetPx: number): string {
  const totalInset = insetPx * 2;
  return `min(calc(100vh - ${totalInset}px), calc(100% - ${totalInset}px))`;
}

/** Пружина для layout-анимации высоты панели */
export const sidemenuDynamicHeightLayoutTransition: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 36,
  mass: 0.85,
};

/** Переход высоты панели (дополнение к width/x анимации) */
export const sidemenuDynamicHeightMotionTransition = {
  height: sidemenuDynamicHeightLayoutTransition,
  layout: sidemenuDynamicHeightLayoutTransition,
};
