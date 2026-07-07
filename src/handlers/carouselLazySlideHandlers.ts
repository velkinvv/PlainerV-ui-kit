import { getNextCarouselIndex, getPreviousCarouselIndex } from './carouselNavigationHandlers';

/**
 * Нужно ли монтировать содержимое слайда (lazy render).
 * @param slideIndex — индекс слайда
 * @param activeIndex — активный индекс
 * @param visibleSlidesRange — радиус видимых слайдов вокруг активного; undefined — все слайды
 */
export function shouldRenderCarouselSlide(
  slideIndex: number,
  activeIndex: number,
  visibleSlidesRange: number | undefined,
): boolean {
  if (visibleSlidesRange === undefined) {
    return true;
  }

  return Math.abs(slideIndex - activeIndex) <= visibleSlidesRange;
}

/**
 * Возвращает индексы слайдов для предзагрузки изображений.
 * @param activeIndex — активный индекс
 * @param slideCount — число слайдов
 * @param loop — зацикливание
 */
export function getCarouselSlideIndicesToPreload(
  activeIndex: number,
  slideCount: number,
  loop: boolean,
): number[] {
  if (slideCount <= 0) {
    return [];
  }

  if (slideCount === 1) {
    return [activeIndex];
  }

  const previousIndex = getPreviousCarouselIndex(activeIndex, slideCount, loop);
  const nextIndex = getNextCarouselIndex(activeIndex, slideCount, loop);
  const uniqueIndices = new Set([activeIndex, previousIndex, nextIndex]);

  return Array.from(uniqueIndices);
}

/**
 * Предзагружает изображение по URL.
 * @param imageSrc — URL изображения
 */
export function preloadCarouselImageSrc(imageSrc: string | undefined): void {
  if (!imageSrc || typeof window === 'undefined') {
    return;
  }

  const preloadImage = new Image();
  preloadImage.src = imageSrc;
}
