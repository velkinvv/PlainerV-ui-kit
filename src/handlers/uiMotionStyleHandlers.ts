import { css, type keyframes } from 'styled-components';

/** Единый easing для мягкого появления surface-элементов (Tooltip/Hint/Popover). */
export const uiMotionSurfaceEasing = 'cubic-bezier(0.2, 0, 0.2, 1)';

/** Базовая длительность анимации появления surface-элементов. */
export const uiMotionSurfaceDuration = '0.18s';

/** Практически мгновенная длительность для режима reduce motion. */
export const uiMotionReducedDuration = '0.01s';
/** Единая длительность reveal-анимации панелей (Popover/Dropdown и т.п.). */
export const uiMotionSurfaceRevealDuration = '0.16s';

type SurfaceRevealKeyframes = ReturnType<typeof keyframes>;

type HoverPressMotionConfig = {
  /** CSS-селектор hover-состояния. */
  hoverSelector: string;
  /** CSS-селектор active-состояния. */
  activeSelector: string;
  /** Трансформация при hover. */
  hoverTransform: string;
  /** Трансформация при active. */
  activeTransform: string;
};

/**
 * Унифицированная микро-анимация hover/press с fallback для prefers-reduced-motion.
 * @param hoverPressMotionConfig - селекторы и трансформации интерактивного элемента
 */
export const buildHoverPressMotionCss = ({
  hoverSelector,
  activeSelector,
  hoverTransform,
  activeTransform,
}: HoverPressMotionConfig) => css`
  ${hoverSelector} {
    transform: ${hoverTransform};
  }

  ${activeSelector} {
    transform: ${activeTransform};
  }

  @media (prefers-reduced-motion: reduce) {
    ${hoverSelector},
    ${activeSelector} {
      transform: none;
    }
  }
`;

/**
 * Единый transition для surface-элементов с fallback для reduced motion.
 * @param transitionValue - основная строка transition для обычного режима
 */
export const buildSurfaceTransitionCss = (transitionValue: string) => css`
  transition: ${transitionValue};

  @media (prefers-reduced-motion: reduce) {
    transition:
      opacity ${uiMotionReducedDuration} linear,
      visibility ${uiMotionReducedDuration} linear,
      transform ${uiMotionReducedDuration} linear;
  }
`;

/**
 * Reveal-анимация surface-элемента (opacity + scale) с отключением в reduced motion.
 * @param animationName - keyframes-анимация
 * @param duration - длительность reveal
 */
export const buildSurfaceRevealAnimationCss = (
  animationName: SurfaceRevealKeyframes,
  duration: string = uiMotionSurfaceRevealDuration,
) => css`
  animation: ${animationName} ${duration} ${uiMotionSurfaceEasing};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/**
 * Упрощение transition до короткой длительности в режиме reduced motion.
 * @param duration - длительность transition в reduced motion
 */
export const buildReducedMotionTransitionDurationCss = (duration: string = '0.05s') => css`
  @media (prefers-reduced-motion: reduce) {
    transition-duration: ${duration};
  }
`;

/**
 * Переопределяет transform в режиме reduced motion.
 * @param reducedMotionTransformValue - значение transform при prefers-reduced-motion
 */
export const buildReducedMotionTransformCss = (reducedMotionTransformValue: string = 'none') => css`
  @media (prefers-reduced-motion: reduce) {
    transform: ${reducedMotionTransformValue};
  }
`;
