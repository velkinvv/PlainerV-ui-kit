import { CarouselAnimation, CarouselOrientation } from '../types/ui';
import { isCarouselVerticalOrientation } from './carouselOrientationHandlers';

/** Максимальное смещение слайдов, рендерящихся в coverflow / flip */
export const DEFAULT_CAROUSEL_EFFECT_VISIBLE_OFFSET = 3;

/** Максимальное смещение слайдов в flip-режиме (активный + два соседа) */
export const DEFAULT_CAROUSEL_FLIP_VISIBLE_OFFSET = 2;

/** Угол бокового слайда в flip-режиме, deg */
export const CAROUSEL_FLIP_SIDE_ROTATION_DEG = 88;

/** Угол скрытого слайда в flip-режиме, deg */
export const CAROUSEL_FLIP_HIDDEN_ROTATION_DEG = 178;

/** Смещение по Z для боковых flip-слайдов, px */
export const CAROUSEL_FLIP_SIDE_DEPTH_PX = 18;

/** Максимальное смещение слайдов в stack-режиме (сзади активного) */
export const DEFAULT_CAROUSEL_STACK_VISIBLE_OFFSET = 2;

/** Смещение уехавшего слайда в процентах viewport */
export const CAROUSEL_STACK_EXIT_TRANSLATE_PERCENT = 105;

/** Уменьшение scale для каждого слайда в стопке сзади */
export const CAROUSEL_STACK_BEHIND_SCALE_STEP = 0.04;

/** CSS-представление слайда в coverflow / flip */
export type CarouselEffectSlidePresentation = {
  /** CSS transform */
  transform: string;
  /** Прозрачность слайда */
  opacity: number;
  /** z-index слоя */
  zIndex: number;
  /** Доступность pointer-events */
  pointerEvents: 'auto' | 'none';
  /** Видимость для a11y и производительности */
  visibility: 'visible' | 'hidden';
};

/**
 * Проверяет, используется ли 3D-анимация coverflow / flip / stack.
 * @param animation — тип анимации
 */
export function isCarouselEffectAnimation(animation: CarouselAnimation): boolean {
  return (
    animation === CarouselAnimation.COVERFLOW ||
    animation === CarouselAnimation.FLIP ||
    animation === CarouselAnimation.STACK
  );
}

/**
 * Проверяет, используется ли crossfade-анимация fade / scale.
 * @param animation — тип анимации
 */
export function isCarouselCrossfadeAnimation(animation: CarouselAnimation): boolean {
  return animation === CarouselAnimation.FADE || animation === CarouselAnimation.SCALE;
}

/**
 * CSS transition для 3D-эффектов.
 * @param animationDuration — длительность в мс
 * @param reducedMotion — prefers-reduced-motion
 */
export function getCarouselEffectTransition(
  animationDuration: number,
  reducedMotion: boolean,
): string {
  if (reducedMotion) {
    return 'none';
  }

  return `transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${animationDuration}ms ease`;
}

/**
 * Нужно ли монтировать слайд в coverflow / flip / stack.
 * @param slideIndex — индекс слайда
 * @param activeIndex — активный индекс
 * @param visibleOffset — максимальное смещение от активного
 * @param animation — тип эффекта
 */
export function shouldRenderCarouselEffectSlide(
  slideIndex: number,
  activeIndex: number,
  visibleOffset?: number,
  animation: CarouselAnimation = CarouselAnimation.COVERFLOW,
): boolean {
  if (animation === CarouselAnimation.STACK) {
    const stackVisibleOffset = visibleOffset ?? DEFAULT_CAROUSEL_STACK_VISIBLE_OFFSET;
    return slideIndex >= activeIndex - 1 && slideIndex <= activeIndex + stackVisibleOffset;
  }

  if (animation === CarouselAnimation.FLIP) {
    const flipVisibleOffset = visibleOffset ?? DEFAULT_CAROUSEL_FLIP_VISIBLE_OFFSET;
    return Math.abs(slideIndex - activeIndex) <= flipVisibleOffset;
  }

  const effectVisibleOffset = visibleOffset ?? DEFAULT_CAROUSEL_EFFECT_VISIBLE_OFFSET;
  return Math.abs(slideIndex - activeIndex) <= effectVisibleOffset;
}

/**
 * Возвращает CSS-представление слайда для coverflow.
 * @param slideIndex — индекс слайда
 * @param activeIndex — активный индекс
 * @param orientation — ориентация карусели
 */
export function getCarouselCoverflowSlidePresentation(
  slideIndex: number,
  activeIndex: number,
  orientation: CarouselOrientation = CarouselOrientation.HORIZONTAL,
): CarouselEffectSlidePresentation {
  const slideOffset = slideIndex - activeIndex;
  const absoluteOffset = Math.abs(slideOffset);

  if (absoluteOffset > DEFAULT_CAROUSEL_EFFECT_VISIBLE_OFFSET) {
    return {
      transform: 'translate3d(0, 0, 0)',
      opacity: 0,
      zIndex: 0,
      pointerEvents: 'none',
      visibility: 'hidden',
    };
  }

  const scaleValue = Math.max(1 - absoluteOffset * 0.12, 0.64);
  const opacityValue = Math.max(1 - absoluteOffset * 0.22, 0.35);
  const depthPixels = absoluteOffset * 180;
  const isVertical = isCarouselVerticalOrientation(orientation);

  if (isVertical) {
    return {
      transform: `translate3d(0, ${slideOffset * 78}%, 0) translate3d(0, 0, ${-depthPixels}px) rotateX(${slideOffset * -55}deg) scale(${scaleValue})`,
      opacity: opacityValue,
      zIndex: 100 - absoluteOffset,
      pointerEvents: slideOffset === 0 ? 'auto' : 'none',
      visibility: 'visible',
    };
  }

  return {
    transform: `translate3d(${slideOffset * 78}%, 0, 0) translate3d(0, 0, ${-depthPixels}px) rotateY(${slideOffset * -55}deg) scale(${scaleValue})`,
    opacity: opacityValue,
    zIndex: 100 - absoluteOffset,
    pointerEvents: slideOffset === 0 ? 'auto' : 'none',
    visibility: 'visible',
  };
}

/**
 * Возвращает CSS-представление слайда для flip (карточки в одной точке с поворотом).
 * @param slideIndex — индекс слайда
 * @param activeIndex — активный индекс
 * @param orientation — ориентация карусели
 */
export function getCarouselFlipSlidePresentation(
  slideIndex: number,
  activeIndex: number,
  orientation: CarouselOrientation = CarouselOrientation.HORIZONTAL,
): CarouselEffectSlidePresentation {
  const slideOffset = slideIndex - activeIndex;
  const absoluteOffset = Math.abs(slideOffset);
  const isVertical = isCarouselVerticalOrientation(orientation);

  if (absoluteOffset > DEFAULT_CAROUSEL_FLIP_VISIBLE_OFFSET) {
    return {
      transform: isVertical
        ? `translate3d(0, 0, 0) rotateX(${slideOffset > 0 ? CAROUSEL_FLIP_HIDDEN_ROTATION_DEG : -CAROUSEL_FLIP_HIDDEN_ROTATION_DEG}deg) scale(0.9)`
        : `translate3d(0, 0, 0) rotateY(${slideOffset > 0 ? CAROUSEL_FLIP_HIDDEN_ROTATION_DEG : -CAROUSEL_FLIP_HIDDEN_ROTATION_DEG}deg) scale(0.9)`,
      opacity: 0,
      zIndex: 0,
      pointerEvents: 'none',
      visibility: 'hidden',
    };
  }

  if (slideOffset === 0) {
    return {
      transform: isVertical
        ? 'translate3d(0, 0, 0) rotateX(0deg) scale(1)'
        : 'translate3d(0, 0, 0) rotateY(0deg) scale(1)',
      opacity: 1,
      zIndex: 100,
      pointerEvents: 'auto',
      visibility: 'visible',
    };
  }

  const rotationDegrees =
    absoluteOffset === 1
      ? slideOffset * CAROUSEL_FLIP_SIDE_ROTATION_DEG
      : slideOffset * CAROUSEL_FLIP_HIDDEN_ROTATION_DEG;
  const scaleValue = absoluteOffset === 1 ? 0.96 : 0.9;
  const opacityValue = absoluteOffset === 1 ? 0.78 : 0.35;

  if (isVertical) {
    return {
      transform: `translate3d(0, 0, ${-CAROUSEL_FLIP_SIDE_DEPTH_PX}px) rotateX(${rotationDegrees}deg) scale(${scaleValue})`,
      opacity: opacityValue,
      zIndex: 100 - absoluteOffset,
      pointerEvents: 'none',
      visibility: 'visible',
    };
  }

  return {
    transform: `translate3d(0, 0, ${-CAROUSEL_FLIP_SIDE_DEPTH_PX}px) rotateY(${rotationDegrees}deg) scale(${scaleValue})`,
    opacity: opacityValue,
    zIndex: 100 - absoluteOffset,
    pointerEvents: 'none',
    visibility: 'visible',
  };
}

/**
 * Возвращает CSS-представление слайда для stack (уход под следующий слайд).
 * @param slideIndex — индекс слайда
 * @param activeIndex — активный индекс
 * @param orientation — ориентация карусели
 */
export function getCarouselStackSlidePresentation(
  slideIndex: number,
  activeIndex: number,
  orientation: CarouselOrientation = CarouselOrientation.HORIZONTAL,
): CarouselEffectSlidePresentation {
  const slideOffset = slideIndex - activeIndex;
  const isVertical = isCarouselVerticalOrientation(orientation);

  if (
    slideOffset > DEFAULT_CAROUSEL_STACK_VISIBLE_OFFSET ||
    slideOffset < -1
  ) {
    return {
      transform: isVertical
        ? `translate3d(0, -${CAROUSEL_STACK_EXIT_TRANSLATE_PERCENT}%, 0) scale(0.9)`
        : `translate3d(-${CAROUSEL_STACK_EXIT_TRANSLATE_PERCENT}%, 0, 0) scale(0.9)`,
      opacity: 0,
      zIndex: 0,
      pointerEvents: 'none',
      visibility: 'hidden',
    };
  }

  if (slideOffset === 0) {
    return {
      transform: 'translate3d(0, 0, 0) scale(1)',
      opacity: 1,
      zIndex: 100,
      pointerEvents: 'auto',
      visibility: 'visible',
    };
  }

  if (slideOffset > 0) {
    const scaleValue = Math.max(1 - slideOffset * CAROUSEL_STACK_BEHIND_SCALE_STEP, 0.88);

    return {
      transform: `translate3d(0, 0, 0) scale(${scaleValue})`,
      opacity: 1,
      zIndex: 100 - slideOffset,
      pointerEvents: 'none',
      visibility: 'visible',
    };
  }

  return {
    transform: isVertical
      ? `translate3d(0, -${CAROUSEL_STACK_EXIT_TRANSLATE_PERCENT}%, 0) scale(0.94)`
      : `translate3d(-${CAROUSEL_STACK_EXIT_TRANSLATE_PERCENT}%, 0, 0) scale(0.94)`,
    opacity: 0.9,
    zIndex: 94,
    pointerEvents: 'none',
    visibility: 'visible',
  };
}

/**
 * Возвращает CSS-представление слайда для coverflow / flip / stack.
 * @param animation — coverflow, flip или stack
 * @param slideIndex — индекс слайда
 * @param activeIndex — активный индекс
 * @param orientation — ориентация карусели
 */
export function getCarouselEffectSlidePresentation(
  animation: CarouselAnimation,
  slideIndex: number,
  activeIndex: number,
  orientation: CarouselOrientation = CarouselOrientation.HORIZONTAL,
): CarouselEffectSlidePresentation {
  if (animation === CarouselAnimation.STACK) {
    return getCarouselStackSlidePresentation(slideIndex, activeIndex, orientation);
  }

  if (animation === CarouselAnimation.FLIP) {
    return getCarouselFlipSlidePresentation(slideIndex, activeIndex, orientation);
  }

  return getCarouselCoverflowSlidePresentation(slideIndex, activeIndex, orientation);
}
