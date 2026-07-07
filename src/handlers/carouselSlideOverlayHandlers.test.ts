import React from 'react';
import {
  CarouselSlideOverlayAlign,
  CarouselSlideOverlayPlacement,
} from '../types/ui';
import { CAROUSEL_SLIDE_OVERLAY_DISPLAY_NAME } from './carouselSlideOverlayHandlers';
import {
  getCarouselSlideOverlayFlexAlignment,
  getCarouselSlideOverlayZoneKey,
  groupCarouselSlideOverlaysByZone,
  resolveCarouselSlideOverlayContent,
  splitCarouselSlideChildren,
} from './carouselSlideOverlayHandlers';

describe('carouselSlideOverlayHandlers', () => {
  it('splitCarouselSlideChildren отделяет оверлеи от контента', () => {
    const slideChildren = [
      React.createElement(
        { displayName: 'CarouselImage' },
        { src: 'image.jpg', alt: 'Фото' },
      ),
      React.createElement(
        { displayName: CAROUSEL_SLIDE_OVERLAY_DISPLAY_NAME },
        { placement: CarouselSlideOverlayPlacement.TOP, align: CarouselSlideOverlayAlign.START },
        React.createElement('button', { type: 'button' }, 'Действие'),
      ),
    ];

    const splitResult = splitCarouselSlideChildren(slideChildren);

    expect(splitResult.contentChildren).toHaveLength(1);
    expect(splitResult.overlayZoneGroups).toHaveLength(1);
    expect(splitResult.overlayPanelElements).toEqual([]);
    expect(splitResult.overlayZoneGroups[0]?.placement).toBe(CarouselSlideOverlayPlacement.TOP);
    expect(splitResult.overlayZoneGroups[0]?.align).toBe(CarouselSlideOverlayAlign.START);
  });

  it('groupCarouselSlideOverlaysByZone группирует оверлеи по placement + align', () => {
    const overlayElements = [
      React.createElement(
        { displayName: CAROUSEL_SLIDE_OVERLAY_DISPLAY_NAME },
        { placement: CarouselSlideOverlayPlacement.LEFT, align: CarouselSlideOverlayAlign.CENTER },
        'A',
      ),
      React.createElement(
        { displayName: CAROUSEL_SLIDE_OVERLAY_DISPLAY_NAME },
        { placement: CarouselSlideOverlayPlacement.LEFT, align: CarouselSlideOverlayAlign.CENTER },
        'B',
      ),
      React.createElement(
        { displayName: CAROUSEL_SLIDE_OVERLAY_DISPLAY_NAME },
        { placement: CarouselSlideOverlayPlacement.RIGHT, align: CarouselSlideOverlayAlign.END },
        'C',
      ),
    ] as React.ReactElement[];

    const zoneGroups = groupCarouselSlideOverlaysByZone(overlayElements);

    expect(zoneGroups).toHaveLength(2);
    expect(
      zoneGroups.find((group) => group.zoneKey === getCarouselSlideOverlayZoneKey(
        CarouselSlideOverlayPlacement.LEFT,
        CarouselSlideOverlayAlign.CENTER,
      ))?.overlayElements,
    ).toHaveLength(2);
  });

  it('resolveCarouselSlideOverlayContent поддерживает render prop', () => {
    const slideInfo = { slideIndex: 1, slideId: 'forest' };

    expect(
      resolveCarouselSlideOverlayContent(
        (slide) => `${slide.slideId}-${slide.slideIndex}`,
        slideInfo,
      ),
    ).toBe('forest-1');
  });

  it('getCarouselSlideOverlayFlexAlignment возвращает flex значения', () => {
    expect(getCarouselSlideOverlayFlexAlignment(CarouselSlideOverlayAlign.START)).toBe('flex-start');
    expect(getCarouselSlideOverlayFlexAlignment(CarouselSlideOverlayAlign.CENTER)).toBe('center');
    expect(getCarouselSlideOverlayFlexAlignment(CarouselSlideOverlayAlign.END)).toBe('flex-end');
  });
});
