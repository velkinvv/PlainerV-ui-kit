import type { CarouselSlideInfo } from '../types/ui';
import { clampCarouselIndex } from './carouselNavigationHandlers';

/**
 * Ищет индекс слайда по slideId.
 * @param slideInfoList — метаданные слайдов
 * @param slideId — идентификатор слайда
 */
export function findCarouselSlideIndexBySlideId(
  slideInfoList: CarouselSlideInfo[],
  slideId: string | undefined,
): number | null {
  if (!slideId) {
    return null;
  }

  const slideIndex = slideInfoList.findIndex((slideInfo) => slideInfo.slideId === slideId);

  return slideIndex >= 0 ? slideIndex : null;
}

/** Параметры вычисления активного индекса карусели */
export type ResolveCarouselActiveIndexParams = {
  /** Управляемый индекс (controlled) */
  activeIndexProp?: number;
  /** Управляемый slideId (controlled) */
  activeSlideIdProp?: string;
  /** Метаданные слайдов */
  slideInfoList: CarouselSlideInfo[];
  /** Внутренний индекс (uncontrolled) */
  internalIndex: number;
  /** Начальный индекс по умолчанию */
  defaultActiveIndex: number;
  /** Начальный slideId по умолчанию */
  defaultSlideId?: string;
  /** Число слайдов */
  slideCount: number;
};

/**
 * Вычисляет активный индекс с учётом controlled index / slideId и значений по умолчанию.
 * @param params — параметры резолва индекса
 */
export function resolveCarouselActiveIndex({
  activeIndexProp,
  activeSlideIdProp,
  slideInfoList,
  internalIndex,
  defaultActiveIndex,
  defaultSlideId,
  slideCount,
}: ResolveCarouselActiveIndexParams): number {
  if (slideCount <= 0) {
    return 0;
  }

  if (activeSlideIdProp !== undefined) {
    const slideIdIndex = findCarouselSlideIndexBySlideId(slideInfoList, activeSlideIdProp);
    return clampCarouselIndex(slideIdIndex ?? 0, slideCount);
  }

  if (activeIndexProp !== undefined) {
    return clampCarouselIndex(activeIndexProp, slideCount);
  }

  return clampCarouselIndex(internalIndex, slideCount);
}

/**
 * Возвращает начальный индекс для uncontrolled-режима.
 * @param slideInfoList — метаданные слайдов
 * @param defaultActiveIndex — индекс по умолчанию
 * @param defaultSlideId — slideId по умолчанию
 * @param slideCount — число слайдов
 */
export function resolveCarouselDefaultActiveIndex(
  slideInfoList: CarouselSlideInfo[],
  defaultActiveIndex: number,
  defaultSlideId: string | undefined,
  slideCount: number,
): number {
  const slideIdIndex = findCarouselSlideIndexBySlideId(slideInfoList, defaultSlideId);

  if (slideIdIndex !== null) {
    return clampCarouselIndex(slideIdIndex, slideCount);
  }

  return clampCarouselIndex(defaultActiveIndex, slideCount);
}

/**
 * Возвращает slideId по индексу.
 * @param slideInfoList — метаданные слайдов
 * @param slideIndex — индекс слайда
 */
export function getCarouselSlideIdAtIndex(
  slideInfoList: CarouselSlideInfo[],
  slideIndex: number,
): string | undefined {
  return slideInfoList[slideIndex]?.slideId;
}
