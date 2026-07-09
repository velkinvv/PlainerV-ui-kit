import React from 'react';
import type { CarouselImageProps, CarouselSlideProps } from '../types/ui';

/** Маркер типа изображения слайда для извлечения миниатюр */
export const CAROUSEL_IMAGE_DISPLAY_NAME = 'CarouselImage';

/** Данные миниатюры одного слайда */
export type CarouselSlideThumbnail = {
  /** Индекс слайда с 0 */
  slideIndex: number;
  /** URL миниатюры */
  imageSrc?: string;
  /** alt для кнопки миниатюры */
  imageAlt?: string;
  /** Пользовательская подпись слайда */
  slideLabel?: string;
};

/**
 * Ищет первый Carousel.Image внутри слайда.
 * @param slideElement — React-элемент Carousel.Slide
 */
export function findCarouselImageElement(
  slideElement: React.ReactElement<CarouselSlideProps>,
): React.ReactElement<CarouselImageProps> | null {
  const slideChildren = slideElement.props?.children;

  const childArray = React.Children.toArray(slideChildren);

  for (const child of childArray) {
    if (!React.isValidElement(child)) {
      continue;
    }

    const childType = child.type as { displayName?: string };

    if (childType.displayName === CAROUSEL_IMAGE_DISPLAY_NAME) {
      return child as React.ReactElement<CarouselImageProps>;
    }
  }

  return null;
}

/**
 * Извлекает данные миниатюр из слайдов карусели.
 * Приоритет src: `slide.thumbnailSrc` → `image.thumbnailSrc` → `image.src`.
 * @param slideElements — массив Carousel.Slide
 */
export function extractCarouselSlideThumbnails(
  slideElements: React.ReactElement<CarouselSlideProps>[],
): CarouselSlideThumbnail[] {
  return slideElements.map((slideElement, slideIndex) => {
    const slideLabel = slideElement.props?.slideLabel;
    const slideThumbnailSrc = slideElement.props?.thumbnailSrc;
    const imageElement = findCarouselImageElement(slideElement);
    const imageProps = imageElement?.props;

    const imageSrc = slideThumbnailSrc ?? imageProps?.thumbnailSrc ?? imageProps?.src;
    const imageAlt = imageProps?.alt ?? slideLabel ?? `Слайд ${slideIndex + 1}`;

    return {
      slideIndex,
      imageSrc,
      imageAlt,
      slideLabel,
    };
  });
}

/**
 * Проверяет, есть ли хотя бы одна миниатюра с src.
 * @param slideThumbnails — данные миниатюр
 */
export function carouselHasRenderableThumbnails(slideThumbnails: CarouselSlideThumbnail[]): boolean {
  return slideThumbnails.some((thumbnail) => Boolean(thumbnail.imageSrc));
}

/**
 * Подпись кнопки миниатюры для screen readers.
 * @param slideIndex — индекс с 0
 * @param slideCount — всего слайдов
 * @param slideLabel — пользовательская подпись
 */
export function getCarouselThumbnailAriaLabel(
  slideIndex: number,
  slideCount: number,
  slideLabel?: string,
): string {
  if (slideLabel) {
    return `${slideLabel}, слайд ${slideIndex + 1} из ${slideCount}`;
  }

  return `Слайд ${slideIndex + 1} из ${slideCount}`;
}

/**
 * Прокручивает горизонтальный список миниатюр к активной кнопке.
 * Не использует scrollIntoView, чтобы не сдвигать страницу Storybook Docs.
 * @param listElement — контейнер со scroll (ul)
 * @param activeButton — активная кнопка-миниатюра
 */
export function scrollCarouselThumbnailListToIndex(
  listElement: HTMLElement,
  activeButton: HTMLElement,
): void {
  const listRect = listElement.getBoundingClientRect();
  const buttonRect = activeButton.getBoundingClientRect();
  const buttonOffsetInList = buttonRect.left - listRect.left + listElement.scrollLeft;
  const targetScrollLeft =
    buttonOffsetInList - (listElement.clientWidth - buttonRect.width) / 2;

  listElement.scrollTo({
    left: Math.max(0, targetScrollLeft),
    behavior: 'smooth',
  });
}
