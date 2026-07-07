import React from 'react';
import {
  CarouselSlideOverlayAlign,
  CarouselSlideOverlayPanelGradient,
  CarouselSlideOverlayPanelPlacement,
} from '../types/ui';
import {
  CAROUSEL_SLIDE_OVERLAY_PANEL_DISPLAY_NAME,
  extractCarouselSlideOverlayPanels,
  getCarouselSlideOverlayPanelLayout,
  resolveCarouselSlideOverlayPanelGradient,
  resolveCarouselSlideOverlayPanelPlacement,
  resolveCarouselSlideOverlayPanelContent,
} from './carouselSlideOverlayPanelHandlers';
import { CAROUSEL_SLIDE_OVERLAY_DISPLAY_NAME } from './carouselSlideOverlayHandlers';
import { splitCarouselSlideChildren } from './carouselSlideOverlayHandlers';
import { CarouselSlideOverlayPlacement } from '../types/ui';

describe('carouselSlideOverlayPanelHandlers', () => {
  it('splitCarouselSlideChildren отделяет OverlayPanel от контента и зон', () => {
    const slideChildren = [
      React.createElement(
        { displayName: 'CarouselImage' },
        { src: 'image.jpg', alt: 'Фото' },
      ),
      React.createElement(
        { displayName: CAROUSEL_SLIDE_OVERLAY_PANEL_DISPLAY_NAME },
        { placement: CarouselSlideOverlayPanelPlacement.BOTTOM },
        React.createElement('h3', null, 'Заголовок'),
      ),
      React.createElement(
        { displayName: CAROUSEL_SLIDE_OVERLAY_DISPLAY_NAME },
        { placement: CarouselSlideOverlayPlacement.TOP, align: CarouselSlideOverlayAlign.END },
        React.createElement('button', { type: 'button' }, 'Действие'),
      ),
    ];

    const splitResult = splitCarouselSlideChildren(slideChildren);

    expect(splitResult.contentChildren).toHaveLength(1);
    expect(splitResult.overlayPanelElements).toHaveLength(1);
    expect(splitResult.overlayZoneGroups).toHaveLength(1);
  });

  it('extractCarouselSlideOverlayPanels возвращает только панели', () => {
    const slideChildren = [
      React.createElement(
        { displayName: CAROUSEL_SLIDE_OVERLAY_PANEL_DISPLAY_NAME },
        {},
        'Панель',
      ),
      React.createElement('span', null, 'Контент'),
    ];

    expect(extractCarouselSlideOverlayPanels(slideChildren)).toHaveLength(1);
  });

  it('resolveCarouselSlideOverlayPanelPlacement использует bottom по умолчанию', () => {
    expect(resolveCarouselSlideOverlayPanelPlacement(undefined)).toBe(
      CarouselSlideOverlayPanelPlacement.BOTTOM,
    );
  });

  it('resolveCarouselSlideOverlayPanelGradient подбирает дефолт по placement', () => {
    expect(
      resolveCarouselSlideOverlayPanelGradient(
        undefined,
        CarouselSlideOverlayPanelPlacement.TOP,
      ),
    ).toBe(CarouselSlideOverlayPanelGradient.TOP);

    expect(
      resolveCarouselSlideOverlayPanelGradient(
        undefined,
        CarouselSlideOverlayPanelPlacement.BOTTOM,
      ),
    ).toBe(CarouselSlideOverlayPanelGradient.BOTTOM);
  });

  it('getCarouselSlideOverlayPanelLayout возвращает flex-параметры', () => {
    expect(
      getCarouselSlideOverlayPanelLayout(
        CarouselSlideOverlayPanelPlacement.STRETCH,
        CarouselSlideOverlayAlign.CENTER,
      ),
    ).toEqual({
      mainAxisAlignment: 'center',
      crossAxisAlignment: 'center',
      textAlignment: 'center',
    });
  });

  it('resolveCarouselSlideOverlayPanelContent поддерживает render prop', () => {
    const slideInfo = { slideIndex: 2, slideId: 'ocean', caption: 'Океан' };

    expect(
      resolveCarouselSlideOverlayPanelContent(
        (slide) => `${slide.slideId}: ${slide.caption}`,
        slideInfo,
      ),
    ).toBe('ocean: Океан');
  });
});
