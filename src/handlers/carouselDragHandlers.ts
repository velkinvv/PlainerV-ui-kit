import { CarouselOrientation } from '../types/ui';
import {
  getNextCarouselIndex,
  getPreviousCarouselIndex,
} from './carouselNavigationHandlers';
import { isCarouselVerticalOrientation } from './carouselOrientationHandlers';

/** Доля ширины/высоты viewport для переключения слайда при отпускании */
export const DEFAULT_CAROUSEL_DRAG_RELEASE_THRESHOLD_RATIO = 0.2;

/** Порог скорости свайпа (px/ms) для «флика» */
export const DEFAULT_CAROUSEL_DRAG_VELOCITY_THRESHOLD = 0.35;

/** Сопротивление перетягиванию за край без loop (0…1) */
export const DEFAULT_CAROUSEL_EDGE_DRAG_RESISTANCE = 0.35;

/** Максимум сэмплов скорости pointer */
export const CAROUSEL_POINTER_VELOCITY_SAMPLE_LIMIT = 5;

/** Окно расчёта скорости pointer (мс) */
export const CAROUSEL_POINTER_VELOCITY_WINDOW_MS = 100;

/** Сэмпл координаты pointer для расчёта скорости */
export type CarouselPointerVelocitySample = {
  /** Координата по основной оси */
  coordinate: number;
  /** Время сэмпла (performance.now) */
  timestamp: number;
};

/** Параметры определения целевого слайда после drag */
export type ResolveCarouselDragReleaseIndexParams = {
  /** Текущий активный индекс */
  activeIndex: number;
  /** Смещение drag по основной оси (start - current), px */
  dragDeltaPrimaryPx: number;
  /** Размер viewport по основной оси, px */
  viewportPrimarySize: number;
  /** Число слайдов */
  slideCount: number;
  /** Зацикливание */
  loop: boolean;
  /** Скорость по основной оси (px/ms), положительная — к следующему слайду */
  velocityPrimary: number;
  /** Доля viewport для порога переключения */
  releaseThresholdRatio?: number;
  /** Порог скорости для флика */
  velocityThreshold?: number;
};

/**
 * Возвращает размер viewport по основной оси карусели.
 * @param viewportElement — DOM-элемент viewport
 * @param orientation — ориентация карусели
 */
export function getCarouselViewportPrimarySize(
  viewportElement: HTMLElement | null,
  orientation: CarouselOrientation = CarouselOrientation.HORIZONTAL,
): number {
  if (!viewportElement) {
    return 0;
  }

  return isCarouselVerticalOrientation(orientation)
    ? viewportElement.clientHeight
    : viewportElement.clientWidth;
}

/**
 * Применяет резиновое сопротивление на краях без loop.
 * @param dragDeltaPrimaryPx — сырое смещение drag (start - current)
 * @param activeIndex — активный индекс
 * @param slideCount — число слайдов
 * @param loop — зацикливание
 * @param edgeResistance — коэффициент сопротивления за краем
 */
export function applyCarouselDragResistance(
  dragDeltaPrimaryPx: number,
  activeIndex: number,
  slideCount: number,
  loop: boolean,
  edgeResistance: number = DEFAULT_CAROUSEL_EDGE_DRAG_RESISTANCE,
): number {
  if (loop || slideCount <= 1) {
    return dragDeltaPrimaryPx;
  }

  const resistanceFactor = Math.min(Math.max(edgeResistance, 0), 1);
  const isAtFirstSlide = activeIndex <= 0;
  const isAtLastSlide = activeIndex >= slideCount - 1;

  if (isAtFirstSlide && dragDeltaPrimaryPx < 0) {
    return dragDeltaPrimaryPx * resistanceFactor;
  }

  if (isAtLastSlide && dragDeltaPrimaryPx > 0) {
    return dragDeltaPrimaryPx * resistanceFactor;
  }

  return dragDeltaPrimaryPx;
}

/**
 * Добавляет сэмпл скорости pointer и обрезает окно.
 * @param samples — текущие сэмплы
 * @param coordinate — координата по основной оси
 * @param timestamp — время сэмпла
 * @param windowMs — окно расчёта скорости
 * @param sampleLimit — максимум сэмплов
 */
export function appendCarouselPointerVelocitySample(
  samples: CarouselPointerVelocitySample[],
  coordinate: number,
  timestamp: number,
  windowMs: number = CAROUSEL_POINTER_VELOCITY_WINDOW_MS,
  sampleLimit: number = CAROUSEL_POINTER_VELOCITY_SAMPLE_LIMIT,
): CarouselPointerVelocitySample[] {
  return [...samples, { coordinate, timestamp }]
    .filter((sample) => timestamp - sample.timestamp <= windowMs)
    .slice(-sampleLimit);
}

/**
 * Вычисляет скорость pointer по основной оси (px/ms).
 * @param samples — сэмплы координат
 */
export function calculateCarouselPointerVelocity(
  samples: CarouselPointerVelocitySample[],
): number {
  if (samples.length < 2) {
    return 0;
  }

  const firstSample = samples[0];
  const lastSample = samples[samples.length - 1];
  const elapsedMilliseconds = lastSample.timestamp - firstSample.timestamp;

  if (elapsedMilliseconds <= 0) {
    return 0;
  }

  return (firstSample.coordinate - lastSample.coordinate) / elapsedMilliseconds;
}

/**
 * Определяет целевой индекс после отпускания drag/swiper-жеста.
 * @param params — параметры release
 */
export function resolveCarouselDragReleaseIndex({
  activeIndex,
  dragDeltaPrimaryPx,
  viewportPrimarySize,
  slideCount,
  loop,
  velocityPrimary,
  releaseThresholdRatio = DEFAULT_CAROUSEL_DRAG_RELEASE_THRESHOLD_RATIO,
  velocityThreshold = DEFAULT_CAROUSEL_DRAG_VELOCITY_THRESHOLD,
}: ResolveCarouselDragReleaseIndexParams): number {
  if (slideCount <= 1 || viewportPrimarySize <= 0) {
    return activeIndex;
  }

  const releaseThresholdPx = viewportPrimarySize * releaseThresholdRatio;
  const wantsNextSlide =
    dragDeltaPrimaryPx > releaseThresholdPx || velocityPrimary > velocityThreshold;
  const wantsPreviousSlide =
    dragDeltaPrimaryPx < -releaseThresholdPx || velocityPrimary < -velocityThreshold;

  if (wantsNextSlide) {
    const nextIndex = getNextCarouselIndex(activeIndex, slideCount, loop);

    if (nextIndex !== activeIndex) {
      return nextIndex;
    }
  }

  if (wantsPreviousSlide) {
    const previousIndex = getPreviousCarouselIndex(activeIndex, slideCount, loop);

    if (previousIndex !== activeIndex) {
      return previousIndex;
    }
  }

  return activeIndex;
}

/**
 * CSS transform ленты с учётом drag-смещения.
 * @param activeIndex — активный индекс
 * @param dragOffsetPx — смещение drag в px
 * @param orientation — ориентация карусели
 */
export function getCarouselTrackTransformValue(
  activeIndex: number,
  dragOffsetPx: number,
  orientation: CarouselOrientation = CarouselOrientation.HORIZONTAL,
): string {
  const normalizedDragOffsetPx = Number.isFinite(dragOffsetPx) ? dragOffsetPx : 0;

  if (isCarouselVerticalOrientation(orientation)) {
    return `translateY(calc(-${activeIndex * 100}% - ${normalizedDragOffsetPx}px))`;
  }

  return `translateX(calc(-${activeIndex * 100}% - ${normalizedDragOffsetPx}px))`;
}
