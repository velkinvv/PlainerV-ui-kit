import type { Transition, Variants } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

/** Практически мгновенный переход при включённом «уменьшить движение». */
export const storybookMotionInstantTransition: Transition = { duration: 0.02 };

/**
 * Набор длительностей и пружин для демо в Storybook.
 * Учитывает `prefers-reduced-motion`: при включённой опции все переходы становятся почти мгновенными.
 */
export function useStorybookMotionTransitions(): {
  /** Панели, карточки, выпадающие списки */
  panel: Transition;
  /** Затемнение под модалкой */
  backdrop: Transition;
  /** Мягкая пружина для акцентных блоков */
  springSoft: Transition;
  /** Объект transition для `staggerChildren` на контейнере */
  stagger: Transition;
  reducedMotion: boolean;
} {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return {
      panel: storybookMotionInstantTransition,
      backdrop: storybookMotionInstantTransition,
      springSoft: storybookMotionInstantTransition,
      stagger: { staggerChildren: 0, delayChildren: 0 },
      reducedMotion: true,
    };
  }

  return {
    panel: { type: 'spring', stiffness: 440, damping: 34, mass: 0.82 },
    backdrop: { duration: 0.24, ease: [0.4, 0, 0.2, 1] },
    springSoft: { type: 'spring', stiffness: 340, damping: 30 },
    stagger: { staggerChildren: 0.065, delayChildren: 0.04 },
    reducedMotion: false,
  };
}

/** Стандартный fade + лёгкий сдвиг по Y для панелей и карточек в демо. */
export const storybookFadeSlideVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

/** Появление дропдауна: сдвиг сверху и масштаб. */
export const storybookDropdownRevealVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.98 },
};

/** Затемнение фона под модалкой в сторис. */
export const storybookBackdropFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

/** Карточка «модалки» в упрощённом демо Storybook. */
export const storybookModalPopVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 14 },
};

/** Дочерние элементы сетки обзора (карточки хуков и т.п.). */
export const storybookStaggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Контейнер со stagger; transition подставляется из хука.
 * @param staggerTransition — результат `useStorybookMotionTransitions().stagger`
 */
export function storybookStaggerContainerVariants(staggerTransition: Transition): Variants {
  return {
    hidden: {},
    visible: {
      transition: staggerTransition,
    },
  };
}
