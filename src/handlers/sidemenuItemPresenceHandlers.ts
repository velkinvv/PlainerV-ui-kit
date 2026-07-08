import type { Transition } from 'framer-motion';
import { sidemenuDynamicHeightLayoutTransition } from './sidemenuDynamicHeightHandlers';

/** Переход opacity / scale пункта sidemenu */
export const sidemenuMenuItemPresenceTransition: Transition = {
  type: 'spring',
  stiffness: 520,
  damping: 38,
  mass: 0.75,
};

/** Пружина высоты — совпадает с dynamicHeight, панель следует за контентом без отдельного layout */
export const sidemenuMenuItemHeightTransition: Transition = sidemenuDynamicHeightLayoutTransition;

/** Длительность size-анимации sidemenu (ms) — для блокировки overflow на панели */
export const SIDEMENU_SIZE_ANIMATION_RELEASE_MS = 520;

/** Опции motion-пропсов AnimatePresence для пункта sidemenu / ActionBar */
export type SidemenuMenuItemPresenceMotionOptions = {
  /** Последний пункт списка (без нижнего отступа под gap) */
  isLastItem?: boolean;
  /** Анимировать height / marginBottom (sidemenu dynamicHeight); ActionBar — false */
  animateHeight?: boolean;
};

/**
 * Motion-пропсы для mount/unmount пункта меню (AnimatePresence mode=sync).
 *
 * Работает для любой позиции в списке (начало, середина, конец):
 * — enter/exit анимируют height и marginBottom (нижний gap 4px, у последнего 0);
 * — при exit пункт остаётся в потоке (sync) и схлопывается, пункты ниже плавно поднимаются;
 * — CSS :last-child на панели подстраивает margin, если «последний» изменился после удаления.
 *
 * @param reducedMotion — включено «уменьшить движение»
 * @param options — isLastItem, animateHeight
 */
export function getSidemenuMenuItemPresenceMotionProps(
  reducedMotion: boolean | null,
  options: SidemenuMenuItemPresenceMotionOptions = {},
) {
  const { isLastItem = false, animateHeight = true } = options;

  if (reducedMotion) {
    return {
      initial: false as const,
      animate: { opacity: 1 },
      exit: undefined,
    };
  }

  if (!animateHeight) {
    return {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.96 },
      transition: sidemenuMenuItemPresenceTransition,
    };
  }

  const itemGapPx = isLastItem ? 0 : 4;

  return {
    initial: { opacity: 0, scale: 0.96, height: 0, marginBottom: 0 },
    animate: { opacity: 1, scale: 1, height: 'auto', marginBottom: itemGapPx },
    exit: { opacity: 0, scale: 0.96, height: 0, marginBottom: 0 },
    transition: {
      opacity: sidemenuMenuItemPresenceTransition,
      scale: sidemenuMenuItemPresenceTransition,
      height: sidemenuMenuItemHeightTransition,
      marginBottom: sidemenuMenuItemHeightTransition,
    },
  };
}
