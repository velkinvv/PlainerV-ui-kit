import type { Transition } from 'framer-motion';
import { FloatingMenuOrientation } from '@/types/ui';
import { sidemenuDynamicHeightLayoutTransition } from './sidemenuDynamicHeightHandlers';

/** Переход opacity / scale пункта FloatingMenu */
export const floatingMenuItemPresenceTransition: Transition = {
  type: 'spring',
  stiffness: 520,
  damping: 38,
  mass: 0.75,
};

/** Пружина размера — совпадает с dynamicSize панели */
export const floatingMenuItemSizeTransition: Transition = sidemenuDynamicHeightLayoutTransition;

/** Длительность size-анимации FloatingMenu (ms) */
export const FLOATING_MENU_SIZE_ANIMATION_RELEASE_MS = 520;

/** Gap между пунктами в группе при dynamicSize (px) */
export const FLOATING_MENU_ITEM_PRESENCE_GAP_PX = 2;

/** Опции motion-пропсов AnimatePresence для пункта FloatingMenu */
export type FloatingMenuItemPresenceMotionOptions = {
  /** Горизонтальная или вертикальная раскладка */
  orientation: FloatingMenuOrientation;
  /** Последний пункт группы — без trailing gap */
  isLastItem?: boolean;
  /** Измеренный размер контента (px); 0 — fallback на auto для initial mount */
  contentSizePx?: number;
};

/**
 * Motion-пропсы mount/unmount пункта FloatingMenu (AnimatePresence mode=sync).
 * Horizontal: width + marginRight; vertical: height + marginBottom.
 *
 * @param reducedMotion — включено «уменьшить движение»
 * @param options — orientation, isLastItem, contentSizePx
 */
export function getFloatingMenuItemPresenceMotionProps(
  reducedMotion: boolean | null,
  options: FloatingMenuItemPresenceMotionOptions,
) {
  const { orientation, isLastItem = false, contentSizePx = 0 } = options;
  const trailingGapPx = isLastItem ? 0 : FLOATING_MENU_ITEM_PRESENCE_GAP_PX;
  const resolvedSize = contentSizePx > 0 ? contentSizePx : 'auto';

  if (reducedMotion) {
    return {
      initial: false as const,
      animate: { opacity: 1 },
      exit: undefined,
    };
  }

  if (orientation === FloatingMenuOrientation.HORIZONTAL) {
    return {
      initial: { opacity: 0, scale: 0.96, width: 0, marginRight: 0 },
      animate: { opacity: 1, scale: 1, width: resolvedSize, marginRight: trailingGapPx },
      exit: { opacity: 0, scale: 0.96, width: 0, marginRight: 0 },
      transition: {
        opacity: floatingMenuItemPresenceTransition,
        scale: floatingMenuItemPresenceTransition,
        width: floatingMenuItemSizeTransition,
        marginRight: floatingMenuItemSizeTransition,
      },
    };
  }

  return {
    initial: { opacity: 0, scale: 0.96, height: 0, marginBottom: 0 },
    animate: { opacity: 1, scale: 1, height: resolvedSize, marginBottom: trailingGapPx },
    exit: { opacity: 0, scale: 0.96, height: 0, marginBottom: 0 },
    transition: {
      opacity: floatingMenuItemPresenceTransition,
      scale: floatingMenuItemPresenceTransition,
      height: floatingMenuItemSizeTransition,
      marginBottom: floatingMenuItemSizeTransition,
    },
  };
}
