import React from 'react';
import type { CarouselItemDefinition } from '../types/ui';
import { extractCarouselSlideInfoList } from './carouselSlideInfoHandlers';
import {
  buildCarouselSlideElementsFromItems,
  collectCarouselSlideElementsFromChildren,
  resolveCarouselSlideElements,
} from './carouselSlideItemsHandlers';

describe('carouselSlideItemsHandlers', () => {
  const demoItems: CarouselItemDefinition[] = [
    {
      slideId: 'first',
      slideLabel: 'Первый',
      imageSrc: 'https://example.com/1.jpg',
      imageAlt: 'Первый слайд',
      caption: 'Подпись первого',
    },
    {
      slideId: 'second',
      slideLabel: 'Второй',
      children: <span data-testid="custom-slide">Кастомный слайд</span>,
    },
  ];

  it('resolveCarouselSlideElements отдаёт приоритет items над children', () => {
    const childSlides = collectCarouselSlideElementsFromChildren(
      buildCarouselSlideElementsFromItems([
        { slideId: 'from-children', imageSrc: 'https://example.com/x.jpg', imageAlt: 'X' },
      ]),
    );

    const resolvedSlides = resolveCarouselSlideElements({
      items: demoItems,
      children: childSlides,
    });

    expect(resolvedSlides).toHaveLength(2);
    expect(resolvedSlides[0]?.props?.slideId).toBe('first');
    expect(resolvedSlides[1]?.props?.slideId).toBe('second');
  });

  it('buildCarouselSlideElementsFromItems создаёт Image и Caption', () => {
    const slideElements = buildCarouselSlideElementsFromItems([demoItems[0]!]);
    const slideInfoList = extractCarouselSlideInfoList(slideElements);

    expect(slideInfoList[0]?.slideId).toBe('first');
    expect(slideInfoList[0]?.imageSrc).toBe('https://example.com/1.jpg');
    expect(slideInfoList[0]?.caption).toBe('Подпись первого');
  });

  it('buildCarouselSlideElementsFromItems поддерживает children в item', () => {
    const slideElements = buildCarouselSlideElementsFromItems([demoItems[1]!]);

    expect(slideElements[0]?.props?.children).toBeTruthy();
  });
});
