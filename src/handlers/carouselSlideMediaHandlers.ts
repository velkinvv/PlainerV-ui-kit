import React from 'react';
import type { CarouselSlideProps } from '../types/ui';
import {
  extractCarouselSlideInfoList,
} from './carouselSlideInfoHandlers';

/** Медиа-данные слайда для полноэкранного просмотра */
export type CarouselSlideMedia = {
  slideIndex: number;
  imageSrc?: string;
  imageAlt?: string;
  caption?: string;
  slideLabel?: string;
};

/** Реэкспорт для обратной совместимости тестов */
export { CAROUSEL_CAPTION_DISPLAY_NAME } from './carouselSlideInfoHandlers';

/**
 * Извлекает медиа-данные слайдов карусели для полноэкранного режима.
 * @param slideElements — массив Carousel.Slide
 */
export function extractCarouselSlideMediaList(
  slideElements: React.ReactElement<CarouselSlideProps>[],
): CarouselSlideMedia[] {
  return extractCarouselSlideInfoList(slideElements).map((slideInfo) => ({
    slideIndex: slideInfo.slideIndex,
    imageSrc: slideInfo.imageSrc,
    imageAlt: slideInfo.imageAlt,
    caption: slideInfo.caption,
    slideLabel: slideInfo.slideLabel,
  }));
}

/**
 * Возвращает медиа активного слайда.
 * @param slideMediaList — список медиа слайдов
 * @param activeIndex — активный индекс
 */
export function getActiveCarouselSlideMedia(
  slideMediaList: CarouselSlideMedia[],
  activeIndex: number,
): CarouselSlideMedia | undefined {
  return slideMediaList.find((slideMedia) => slideMedia.slideIndex === activeIndex);
}
