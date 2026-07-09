import React from 'react';
import type { CarouselItemDefinition, CarouselSlideProps } from '../types/ui';
import { CarouselSlide, CAROUSEL_SLIDE_DISPLAY_NAME } from '../components/ui/Carousel/CarouselSlide';
import { CarouselImage } from '../components/ui/Carousel/CarouselImage';
import { CarouselCaption } from '../components/ui/Carousel/CarouselCaption';

/** Параметры резолва списка слайдов карусели */
export type ResolveCarouselSlideElementsParams = {
  /** Дочерние Carousel.Slide */
  children?: React.ReactNode;
  /** Массив описаний слайдов */
  items?: CarouselItemDefinition[];
};

/**
 * Возвращает React-key слайда из item или индекса.
 * @param item — описание слайда
 * @param slideIndex — индекс в массиве items
 */
export function getCarouselItemSlideReactKey(
  item: CarouselItemDefinition,
  slideIndex: number,
): string {
  return item.slideId ?? `carousel-item-${slideIndex}`;
}

/**
 * Извлекает React-элементы Carousel.Slide из children.
 * @param children — дочерние элементы Carousel
 */
export function collectCarouselSlideElementsFromChildren(
  children: React.ReactNode,
): React.ReactElement<CarouselSlideProps>[] {
  return React.Children.toArray(children).filter(
    (child): child is React.ReactElement<CarouselSlideProps> => {
      if (!React.isValidElement(child)) {
        return false;
      }

      const childType = child.type as { displayName?: string };
      return childType.displayName === CAROUSEL_SLIDE_DISPLAY_NAME;
    },
  );
}

/**
 * Собирает содержимое слайда из полей item (без children).
 * @param item — описание слайда
 */
export function buildCarouselSlideContentFromItem(
  item: CarouselItemDefinition,
): React.ReactNode {
  const slideContentNodes: React.ReactNode[] = [];

  if (item.imageSrc) {
    slideContentNodes.push(
      <CarouselImage
        key="carousel-item-image"
        src={item.imageSrc}
        alt={item.imageAlt ?? item.slideLabel ?? ''}
        objectFit={item.objectFit}
        loading={item.loading}
        thumbnailSrc={item.imageThumbnailSrc}
        parallax={item.parallax}
      />,
    );
  }

  if (item.caption != null) {
    slideContentNodes.push(
      <CarouselCaption key="carousel-item-caption">{item.caption}</CarouselCaption>,
    );
  }

  if (slideContentNodes.length === 1) {
    return slideContentNodes[0];
  }

  return slideContentNodes;
}

/**
 * Преобразует CarouselItemDefinition в React-элемент Carousel.Slide.
 * @param item — описание слайда
 * @param slideIndex — индекс в массиве
 */
export function buildCarouselSlideElementFromItem(
  item: CarouselItemDefinition,
  slideIndex: number,
): React.ReactElement<CarouselSlideProps> {
  const slideKey = getCarouselItemSlideReactKey(item, slideIndex);
  const slideContent = item.children ?? buildCarouselSlideContentFromItem(item);

  return (
    <CarouselSlide
      key={slideKey}
      slideId={item.slideId}
      slideLabel={item.slideLabel}
      thumbnailSrc={item.thumbnailSrc}
      className={item.className}
    >
      {slideContent}
    </CarouselSlide>
  );
}

/**
 * Строит массив Carousel.Slide из items.
 * @param items — массив описаний слайдов
 */
export function buildCarouselSlideElementsFromItems(
  items: CarouselItemDefinition[],
): React.ReactElement<CarouselSlideProps>[] {
  return items.map((item, slideIndex) => buildCarouselSlideElementFromItem(item, slideIndex));
}

/**
 * Возвращает слайды карусели: items имеет приоритет над children (как в Tabs).
 * @param params — children и/или items
 */
export function resolveCarouselSlideElements(
  params: ResolveCarouselSlideElementsParams,
): React.ReactElement<CarouselSlideProps>[] {
  if (params.items?.length) {
    return buildCarouselSlideElementsFromItems(params.items);
  }

  return collectCarouselSlideElementsFromChildren(params.children);
}
