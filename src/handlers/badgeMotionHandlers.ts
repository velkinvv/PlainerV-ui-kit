import type { Transition } from 'framer-motion';

/** Короткая пружина (как в uiMotion). */
const springSnappy: Transition = { type: 'spring', stiffness: 520, damping: 38, mass: 0.85 };

/** Появление / исчезновение бейджа. */
export const badgeEnterExitTransition: Transition = {
  type: 'spring',
  stiffness: 560,
  damping: 32,
  mass: 0.75,
};

/** Плавная смена размера (layout). */
export const badgeLayoutTransition: Transition = {
  type: 'spring',
  stiffness: 480,
  damping: 34,
  mass: 0.8,
};

/** Пульс при смене значения. */
export const badgeValuePulseTransition: Transition = {
  duration: 0.42,
  times: [0, 0.32, 0.68, 1],
  ease: 'easeOut',
};

/**
 * Начальное состояние бейджа (появление).
 *
 * @param reducedMotion — включено «уменьшить движение»
 */
export function uiMotionBadgeInitial(reducedMotion: boolean | null) {
  if (reducedMotion) {
    return false;
  }

  return { scale: 0.35, opacity: 0 };
}

/**
 * Конечное состояние после появления.
 */
export function uiMotionBadgeVisible(_reducedMotion?: boolean | null) {
  return { scale: 1, opacity: 1 };
}

/**
 * Состояние исчезновения бейджа.
 *
 * @param reducedMotion — включено «уменьшить движение»
 */
export function uiMotionBadgeExit(reducedMotion: boolean | null) {
  if (reducedMotion) {
    return undefined;
  }

  return { scale: 0.35, opacity: 0 };
}

/**
 * Keyframes пульса при изменении значения или размера.
 *
 * @param reducedMotion — включено «уменьшить движение»
 */
export function uiMotionBadgeValuePulse(reducedMotion: boolean | null) {
  if (reducedMotion) {
    return { scale: 1, opacity: 1 };
  }

  return {
    scale: [1, 1.18, 0.96, 1],
    opacity: 1,
  };
}

/**
 * Переход для пульса значения.
 *
 * @param reducedMotion — включено «уменьшить движение»
 */
export function uiMotionBadgeValuePulseTransition(reducedMotion: boolean | null): Transition {
  if (reducedMotion) {
    return springSnappy;
  }

  return badgeValuePulseTransition;
}
