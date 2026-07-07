import { CarouselAnimation, CarouselOrientation } from '../types/ui';
import { isCarouselVerticalOrientation } from './carouselOrientationHandlers';

/** Коэффициент parallax фона по умолчанию (медленнее слайда) */
export const CAROUSEL_PARALLAX_BACKGROUND_RATIO = 0.35;

/** Коэффициент parallax обычного контента (движется вместе со слайдом) */
export const CAROUSEL_PARALLAX_CONTENT_RATIO = 1;

/** Кoэффициент parallax контентной панели */
export const CAROUSEL_PARALLAX_OVERLAY_PANEL_RATIO = 1.06;

/** Кoэффициент parallax зон Carousel.Overlay */
export const CAROUSEL_PARALLAX_OVERLAY_RATIO = 1.12;

/** Максимальный дополнительный scale фона при parallax */
export const CAROUSEL_PARALLAX_BACKGROUND_SCALE_BOOST = 0.12;

/** Тип пресета слоя parallax */
export type CarouselParallaxLayerPreset = 'background' | 'content' | 'overlayPanel' | 'overlay';

/** CSS transform parallax-слоя */
export type CarouselParallaxLayerTransform = {
  /** Смещение по основной оси карусели в px */
  translatePrimaryPx: number;
  /** Дополнительный scale для компенсации смещения фона */
  scale: number;
};

/**
 * Возвращает дефолтный коэффициент parallax для пресета слоя.
 * @param layerPreset — тип слоя
 * @param backgroundRatio — переопределение фона с Carousel
 * @param foregroundRatio — переопределение переднего плана с Carousel
 */
export function getCarouselParallaxPresetRatio(
  layerPreset: CarouselParallaxLayerPreset,
  backgroundRatio: number = CAROUSEL_PARALLAX_BACKGROUND_RATIO,
  foregroundRatio: number = CAROUSEL_PARALLAX_OVERLAY_RATIO,
): number {
  if (layerPreset === 'background') {
    return backgroundRatio;
  }

  if (layerPreset === 'overlayPanel') {
    return Math.max(foregroundRatio, CAROUSEL_PARALLAX_OVERLAY_PANEL_RATIO);
  }

  if (layerPreset === 'overlay') {
    return foregroundRatio;
  }

  return CAROUSEL_PARALLAX_CONTENT_RATIO;
}

/**
 * Разрешает коэффициент parallax для элемента.
 * @param globalParallaxEnabled — parallax включён на Carousel
 * @param elementParallax — проп `parallax` элемента
 * @param defaultRatio — дефолт для типа слоя
 */
export function resolveCarouselParallaxRatio(
  globalParallaxEnabled: boolean,
  elementParallax: boolean | number | undefined,
  defaultRatio: number,
): number | null {
  if (elementParallax === false) {
    return null;
  }

  if (typeof elementParallax === 'number' && Number.isFinite(elementParallax)) {
    return Math.min(Math.max(elementParallax, 0), 2);
  }

  if (elementParallax === true || globalParallaxEnabled) {
    return defaultRatio;
  }

  return null;
}

/**
 * Вычисляет визуальный индекс карусели с учётом drag.
 * @param activeIndex — активный индекс
 * @param dragOffsetPx — смещение drag по основной оси
 * @param viewportPrimarySize — размер viewport
 */
export function getCarouselParallaxMotionIndex(
  activeIndex: number,
  dragOffsetPx: number,
  viewportPrimarySize: number,
): number {
  if (viewportPrimarySize <= 0) {
    return activeIndex;
  }

  return activeIndex + dragOffsetPx / viewportPrimarySize;
}

/**
 * Смещение слайда относительно центра viewport в px.
 * @param slideIndex — индекс слайда
 * @param motionIndex — визуальный индекс карусели
 * @param viewportPrimarySize — размер viewport
 */
export function getCarouselSlideDisplacementPx(
  slideIndex: number,
  motionIndex: number,
  viewportPrimarySize: number,
): number {
  return (slideIndex - motionIndex) * viewportPrimarySize;
}

/**
 * Easing ease-out cubic для анимации motionIndex.
 * @param progress — прогресс 0…1
 */
export function easeCarouselParallaxProgress(progress: number): number {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  return 1 - (1 - clampedProgress) ** 3;
}

/**
 * Transform parallax-слоя относительно слайда.
 * @param slideIndex — индекс слайда
 * @param motionIndex — визуальный индекс
 * @param viewportPrimarySize — размер viewport
 * @param parallaxRatio — коэффициент слоя
 * @param orientation — ориентация карусели
 */
export function getCarouselParallaxLayerTransform(
  slideIndex: number,
  motionIndex: number,
  viewportPrimarySize: number,
  parallaxRatio: number,
  orientation: CarouselOrientation = CarouselOrientation.HORIZONTAL,
): CarouselParallaxLayerTransform {
  const displacementPx = getCarouselSlideDisplacementPx(
    slideIndex,
    motionIndex,
    viewportPrimarySize,
  );
  const translatePrimaryPx = displacementPx * (1 - parallaxRatio);
  const normalizedDisplacement =
    viewportPrimarySize > 0 ? Math.abs(displacementPx) / viewportPrimarySize : 0;
  const scale =
    parallaxRatio < CAROUSEL_PARALLAX_CONTENT_RATIO
      ? 1 + normalizedDisplacement * CAROUSEL_PARALLAX_BACKGROUND_SCALE_BOOST
      : 1;

  return {
    translatePrimaryPx,
    scale,
  };
}

/**
 * CSS transform строка для parallax-слоя.
 * @param layerTransform — рассчитанный transform
 * @param orientation — ориентация
 * @param reducedMotion — prefers-reduced-motion
 */
export function formatCarouselParallaxLayerTransform(
  layerTransform: CarouselParallaxLayerTransform,
  orientation: CarouselOrientation = CarouselOrientation.HORIZONTAL,
  reducedMotion = false,
): string {
  if (reducedMotion) {
    return 'none';
  }

  if (isCarouselVerticalOrientation(orientation)) {
    return `translate3d(0, ${layerTransform.translatePrimaryPx}px, 0) scale(${layerTransform.scale})`;
  }

  return `translate3d(${layerTransform.translatePrimaryPx}px, 0, 0) scale(${layerTransform.scale})`;
}

/**
 * Длительность transition parallax-слоёв.
 * @param transitionDurationMs — длительность смены слайда
 * @param isDragging — идёт drag
 * @param reducedMotion — prefers-reduced-motion
 */
export function getCarouselParallaxLayerTransition(
  transitionDurationMs: number,
  isDragging: boolean,
  reducedMotion: boolean,
): string {
  if (reducedMotion || isDragging) {
    return 'none';
  }

  return `transform ${transitionDurationMs}ms cubic-bezier(0.4, 0, 0.2, 1)`;
}

/**
 * Преобразует animation=parallax в slide-ленту.
 * @param animation — тип анимации Carousel
 */
export function resolveCarouselAnimation(animation: CarouselAnimation): CarouselAnimation {
  return animation === CarouselAnimation.PARALLAX ? CarouselAnimation.SLIDE : animation;
}

/**
 * Проверяет, включён ли parallax на карусели.
 * @param animation — тип анимации
 * @param parallax — явный флаг parallax
 */
export function isCarouselParallaxEnabled(
  animation: CarouselAnimation,
  parallax?: boolean,
): boolean {
  return parallax === true || animation === CarouselAnimation.PARALLAX;
}
