import type { Transition } from 'framer-motion';

/** Короткая пружина для нажатий и мелких контролов. */
const springSnappy: Transition = { type: 'spring', stiffness: 520, damping: 38, mass: 0.85 };

/** Пружина для карточек (hover / tap). */
const springCard: Transition = { type: 'spring', stiffness: 420, damping: 30 };

/**
 * Обратная связь нажатия для обычной кнопки и IconButton.
 * @param reducedMotion — результат `useReducedMotion()` из framer-motion
 * @param active — не disabled и не loading
 */
export function uiMotionButtonPress(reducedMotion: boolean | null, active: boolean) {
  if (reducedMotion || !active) {
    return {};
  }
  return {
    whileTap: { scale: 0.97 },
    transition: springSnappy,
  };
}

/**
 * Hover-подъём и лёгкий tap для карточки (пропсы `hoverable` / `clickable`).
 */
export function uiMotionCardInteractions(
  reducedMotion: boolean | null,
  options: { hoverable: boolean; clickable: boolean },
) {
  if (reducedMotion) {
    return {};
  }

  const result: {
    whileHover?: { y: number };
    whileTap?: { scale: number };
    transition?: Transition;
  } = {};

  if (options.hoverable) {
    result.whileHover = { y: -2 };
  }
  if (options.clickable) {
    result.whileTap = { scale: 0.98 };
  }
  if (options.hoverable || options.clickable) {
    result.transition = springCard;
  }

  return result;
}

/**
 * Масштаб при hover/tap для кликабельного Badge.
 */
export function uiMotionBadgeInteractive(reducedMotion: boolean | null, interactive: boolean) {
  if (reducedMotion || !interactive) {
    return {};
  }
  return {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: springSnappy,
  };
}

/**
 * Масштаб для кликабельного Avatar.
 */
export function uiMotionAvatarInteractive(reducedMotion: boolean | null, interactive: boolean) {
  if (reducedMotion || !interactive) {
    return {};
  }
  return {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: springSnappy,
  };
}

/**
 * Лёгкое сжатие при нажатии на Pill (кнопка).
 */
export function uiMotionPillPress(reducedMotion: boolean | null, active: boolean) {
  if (reducedMotion || !active) {
    return {};
  }
  return {
    whileTap: { scale: 0.98 },
    transition: springSnappy,
  };
}
