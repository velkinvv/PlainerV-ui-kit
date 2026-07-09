import React from 'react';
import { CAROUSEL_IMAGE_DISPLAY_NAME } from './carouselThumbnailHandlers';
import {
  buildCarouselSlideChangeEvent,
  CAROUSEL_CAPTION_DISPLAY_NAME,
  extractCarouselSlideInfoList,
  getCarouselAdjacentSlideInfo,
  getCarouselSlideInfoAtIndex,
  shouldIgnoreCarouselSlideClickTarget,
} from './carouselSlideInfoHandlers';

const CAROUSEL_SLIDE_DISPLAY_NAME = 'CarouselSlide';

describe('carouselSlideInfoHandlers', () => {
  it('extractCarouselSlideInfoList собирает id, медиа и миниатюру', () => {
    const slideElements = [
      React.createElement(
        { displayName: CAROUSEL_SLIDE_DISPLAY_NAME },
        { slideId: 'mountains', slideLabel: 'Горы', thumbnailSrc: 'https://example.com/thumb.jpg' },
        React.createElement(
          { displayName: CAROUSEL_IMAGE_DISPLAY_NAME },
          { src: 'https://example.com/main.jpg', alt: 'Горы' },
        ),
        React.createElement(
          { displayName: CAROUSEL_CAPTION_DISPLAY_NAME },
          null,
          'Горный пейзаж',
        ),
      ),
    ] as React.ReactElement[];

    expect(extractCarouselSlideInfoList(slideElements)).toEqual([
      {
        slideIndex: 0,
        slideId: 'mountains',
        slideLabel: 'Горы',
        imageSrc: 'https://example.com/main.jpg',
        imageAlt: 'Горы',
        caption: 'Горный пейзаж',
        thumbnailSrc: 'https://example.com/thumb.jpg',
      },
    ]);
  });

  it('buildCarouselSlideChangeEvent возвращает current, previous и next', () => {
    const slideInfoList = [
      { slideIndex: 0, slideId: 'a' },
      { slideIndex: 1, slideId: 'b' },
      { slideIndex: 2, slideId: 'c' },
    ];

    expect(buildCarouselSlideChangeEvent(slideInfoList, 1, false)).toEqual({
      activeIndex: 1,
      current: { slideIndex: 1, slideId: 'b' },
      previous: { slideIndex: 0, slideId: 'a' },
      next: { slideIndex: 2, slideId: 'c' },
    });
  });

  it('buildCarouselSlideChangeEvent учитывает loop на границах', () => {
    const slideInfoList = [
      { slideIndex: 0, slideId: 'a' },
      { slideIndex: 1, slideId: 'b' },
    ];

    expect(buildCarouselSlideChangeEvent(slideInfoList, 0, true)).toEqual({
      activeIndex: 0,
      current: { slideIndex: 0, slideId: 'a' },
      previous: { slideIndex: 1, slideId: 'b' },
      next: { slideIndex: 1, slideId: 'b' },
    });

    expect(buildCarouselSlideChangeEvent(slideInfoList, 0, false)).toEqual({
      activeIndex: 0,
      current: { slideIndex: 0, slideId: 'a' },
      previous: null,
      next: { slideIndex: 1, slideId: 'b' },
    });
  });

  it('getCarouselAdjacentSlideInfo возвращает null для одного слайда', () => {
    const slideInfoList = [{ slideIndex: 0, slideId: 'only' }];

    expect(getCarouselAdjacentSlideInfo(slideInfoList, 0, 'next', true)).toBeNull();
    expect(getCarouselSlideInfoAtIndex(slideInfoList, 0).slideId).toBe('only');
  });

  it('shouldIgnoreCarouselSlideClickTarget игнорирует контролы и заголовок', () => {
    const button = document.createElement('button');
    const title = document.createElement('figcaption');
    title.setAttribute('data-carousel-title', '');
    document.body.appendChild(button);
    document.body.appendChild(title);

    expect(shouldIgnoreCarouselSlideClickTarget(button)).toBe(true);
    expect(shouldIgnoreCarouselSlideClickTarget(title)).toBe(true);
    expect(shouldIgnoreCarouselSlideClickTarget(document.createElement('div'))).toBe(false);

    document.body.removeChild(button);
    document.body.removeChild(title);
  });
});
