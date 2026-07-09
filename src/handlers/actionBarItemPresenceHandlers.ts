import type { Transition } from 'framer-motion';
import { ActionBarOrientation } from '@/types/ui';
import { sidemenuDynamicHeightLayoutTransition } from './sidemenuDynamicHeightHandlers';

/** Переход opacity / scale пункта ActionBar */
export const actionBarItemPresenceTransition: Transition = {
  type: 'spring',
  stiffness: 520,
  damping: 38,
  mass: 0.75,
};

/** Пружина размера — совпадает с dynamicSize панели */
export const actionBarItemSizeTransition: Transition = sidemenuDynamicHeightLayoutTransition;

/** Длительность size-анимации ActionBar (ms) */
export const ACTION_BAR_SIZE_ANIMATION_RELEASE_MS = 520;

/** Gap между пунктами в dynamicSize (px) */
export const ACTION_BAR_ITEM_PRESENCE_GAP_PX = 4;

/** Опции motion-пропсов AnimatePresence для ActionBar */
export type ActionBarItemPresenceMotionOptions = {
  orientation: ActionBarOrientation;
  /** Последний пункт — без trailing gap */
  isLastItem?: boolean;
  /** Измеренный размер контента (px); 0 — fallback на auto для initial mount */
  contentSizePx?: number;
};

/**
 * Motion-пропсы mount/unmount пункта ActionBar (AnimatePresence mode=sync).
 * Vertical: height + marginBottom; horizontal: width + marginRight.
 *
 * @param reducedMotion — включено «уменьшить движение»
 * @param options — orientation, isLastItem, contentSizePx
 */
export function getActionBarItemPresenceMotionProps(
  reducedMotion: boolean | null,
  options: ActionBarItemPresenceMotionOptions,
) {
  const { orientation, isLastItem = false, contentSizePx = 0 } = options;
  const trailingGapPx = isLastItem ? 0 : ACTION_BAR_ITEM_PRESENCE_GAP_PX;
  const resolvedSize = contentSizePx > 0 ? contentSizePx : 'auto';

  if (reducedMotion) {
    return {
      initial: false as const,
      animate: { opacity: 1 },
      exit: undefined,
    };
  }

  if (orientation === ActionBarOrientation.HORIZONTAL) {
    return {
      initial: { opacity: 0, scale: 0.96, width: 0, marginRight: 0 },
      animate: { opacity: 1, scale: 1, width: resolvedSize, marginRight: trailingGapPx },
      exit: { opacity: 0, scale: 0.96, width: 0, marginRight: 0 },
      transition: {
        opacity: actionBarItemPresenceTransition,
        scale: actionBarItemPresenceTransition,
        width: actionBarItemSizeTransition,
        marginRight: actionBarItemSizeTransition,
      },
    };
  }

  return {
    initial: { opacity: 0, scale: 0.96, height: 0, marginBottom: 0 },
    animate: { opacity: 1, scale: 1, height: resolvedSize, marginBottom: trailingGapPx },
    exit: { opacity: 0, scale: 0.96, height: 0, marginBottom: 0 },
    transition: {
      opacity: actionBarItemPresenceTransition,
      scale: actionBarItemPresenceTransition,
      height: actionBarItemSizeTransition,
      marginBottom: actionBarItemSizeTransition,
    },
  };
}
