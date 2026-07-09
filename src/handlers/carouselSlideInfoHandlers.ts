import React from 'react';
import type {
  CarouselCaptionProps,
  CarouselSlideChangeEvent,
  CarouselSlideInfo,
  CarouselSlideProps,
} from '../types/ui';
import {
  getNextCarouselIndex,
  getPreviousCarouselIndex,
} from './carouselNavigationHandlers';
import { findCarouselImageElement } from './carouselThumbnailHandlers';

/** Маркер типа подписи слайда */
export const CAROUSEL_CAPTION_DISPLAY_NAME = 'CarouselCaption';

/**
 * Извлекает текст подписи из children слайда.
 * @param slideChildren — children Carousel.Slide
 */
function extractCarouselCaptionText(slideChildren: React.ReactNode): string | undefined {
  const childArray = React.Children.toArray(slideChildren);

  for (const child of childArray) {
    if (!React.isValidElement(child)) {
      continue;
    }

    const childType = child.type as { displayName?: string };

    if (childType.displayName !== CAROUSEL_CAPTION_DISPLAY_NAME) {
      continue;
    }

    const captionChildren = (child.props as CarouselCaptionProps).children;

    if (typeof captionChildren === 'string' || typeof captionChildren === 'number') {
      return String(captionChildren);
    }
  }

  return undefined;
}

/**
 * Извлекает метаданные слайдов карусели.
 * @param slideElements — массив Carousel.Slide
 */
export function extractCarouselSlideInfoList(
  slideElements: React.ReactElement<CarouselSlideProps>[],
): CarouselSlideInfo[] {
  return slideElements.map((slideElement, slideIndex) => {
    const slideId = slideElement.props?.slideId;
    const slideLabel = slideElement.props?.slideLabel;
    const slideThumbnailSrc = slideElement.props?.thumbnailSrc;
    const slideChildren = slideElement.props?.children;
    const imageElement = findCarouselImageElement(slideElement);
    const imageProps = imageElement?.props;
    const imageSrc = imageProps?.src;
    const imageAlt = imageProps?.alt ?? slideLabel ?? `Слайд ${slideIndex + 1}`;
    const caption = extractCarouselCaptionText(slideChildren);
    const thumbnailSrc = slideThumbnailSrc ?? imageProps?.thumbnailSrc ?? imageProps?.src;

    return {
      slideIndex,
      slideId,
      slideLabel,
      imageSrc,
      imageAlt,
      caption,
      thumbnailSrc,
    };
  });
}

/**
 * Возвращает слайд по индексу или fallback с минимальными данными.
 * @param slideInfoList — список метаданных слайдов
 * @param slideIndex — индекс с 0
 */
export function getCarouselSlideInfoAtIndex(
  slideInfoList: CarouselSlideInfo[],
  slideIndex: number,
): CarouselSlideInfo {
  return (
    slideInfoList[slideIndex] ?? {
      slideIndex,
    }
  );
}

/**
 * Возвращает соседний слайд относительно активного.
 * @param slideInfoList — список метаданных слайдов
 * @param activeIndex — активный индекс
 * @param direction — previous / next
 * @param loop — зацикливание
 */
export function getCarouselAdjacentSlideInfo(
  slideInfoList: CarouselSlideInfo[],
  activeIndex: number,
  direction: 'previous' | 'next',
  loop: boolean,
): CarouselSlideInfo | null {
  const slideCount = slideInfoList.length;

  if (slideCount <= 1) {
    return null;
  }

  if (direction === 'previous') {
    if (activeIndex === 0 && !loop) {
      return null;
    }

    const previousIndex = getPreviousCarouselIndex(activeIndex, slideCount, loop);
    return getCarouselSlideInfoAtIndex(slideInfoList, previousIndex);
  }

  if (activeIndex === slideCount - 1 && !loop) {
    return null;
  }

  const nextIndex = getNextCarouselIndex(activeIndex, slideCount, loop);
  return getCarouselSlideInfoAtIndex(slideInfoList, nextIndex);
}

/**
 * Формирует событие смены активного слайда.
 * @param slideInfoList — список метаданных слайдов
 * @param activeIndex — активный индекс
 * @param loop — зацикливание
 */
export function buildCarouselSlideChangeEvent(
  slideInfoList: CarouselSlideInfo[],
  activeIndex: number,
  loop: boolean,
): CarouselSlideChangeEvent {
  const current = getCarouselSlideInfoAtIndex(slideInfoList, activeIndex);
  const previous = getCarouselAdjacentSlideInfo(slideInfoList, activeIndex, 'previous', loop);
  const next = getCarouselAdjacentSlideInfo(slideInfoList, activeIndex, 'next', loop);

  return {
    activeIndex,
    current,
    previous,
    next,
  };
}

/**
 * Проверяет, нужно ли игнорировать клик по слайду (контролы карусели).
 * @param target — event.target
 */
export function shouldIgnoreCarouselSlideClickTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(
    target.closest(
      'button, a, input, textarea, select, [data-carousel-control], [data-carousel-title], [data-carousel-overlay]',
    ),
  );
}
