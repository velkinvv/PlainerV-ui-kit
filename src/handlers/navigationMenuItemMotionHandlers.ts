import type { Transition } from 'framer-motion';

/** Плавность появления / скрытия содержимого строки меню */
export const navigationMenuItemContentMotionTransition: Transition = {
  duration: 0.2,
  ease: [0.25, 0.1, 0.25, 1],
};
