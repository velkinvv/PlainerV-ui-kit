import React from 'react';
import { CAROUSEL_IMAGE_DISPLAY_NAME } from './carouselThumbnailHandlers';
import {
  CAROUSEL_CAPTION_DISPLAY_NAME,
  extractCarouselSlideMediaList,
  getActiveCarouselSlideMedia,
} from './carouselSlideMediaHandlers';

const CAROUSEL_SLIDE_DISPLAY_NAME = 'CarouselSlide';

describe('carouselSlideMediaHandlers', () => {
  it('extractCarouselSlideMediaList берёт src, alt и caption', () => {
    const slideElements = [
      React.createElement(
        { displayName: CAROUSEL_SLIDE_DISPLAY_NAME },
        { slideLabel: 'Горы' },
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

    expect(extractCarouselSlideMediaList(slideElements)).toEqual([
      {
        slideIndex: 0,
        imageSrc: 'https://example.com/main.jpg',
        imageAlt: 'Горы',
        caption: 'Горный пейзаж',
        slideLabel: 'Горы',
      },
    ]);
  });

  it('getActiveCarouselSlideMedia возвращает активный слайд', () => {
    const slideMediaList = [
      { slideIndex: 0, imageAlt: 'A' },
      { slideIndex: 1, imageSrc: 'b.jpg', imageAlt: 'B' },
    ];

    expect(getActiveCarouselSlideMedia(slideMediaList, 1)?.imageSrc).toBe('b.jpg');
  });
});
