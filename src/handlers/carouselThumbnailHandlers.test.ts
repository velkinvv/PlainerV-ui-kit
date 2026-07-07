import React from 'react';
import {
  CAROUSEL_IMAGE_DISPLAY_NAME,
  carouselHasRenderableThumbnails,
  extractCarouselSlideThumbnails,
  getCarouselThumbnailAriaLabel,
  scrollCarouselThumbnailListToIndex,
} from './carouselThumbnailHandlers';

const CAROUSEL_SLIDE_DISPLAY_NAME = 'CarouselSlide';

describe('carouselThumbnailHandlers', () => {
  it('extractCarouselSlideThumbnails берёт src из Carousel.Image', () => {
    const slideElements = [
      React.createElement(
        { displayName: CAROUSEL_SLIDE_DISPLAY_NAME },
        { slideLabel: 'Горы' },
        React.createElement(
          { displayName: CAROUSEL_IMAGE_DISPLAY_NAME },
          { src: 'https://example.com/main.jpg', alt: 'Горы' },
        ),
      ),
    ] as React.ReactElement[];

    expect(extractCarouselSlideThumbnails(slideElements)).toEqual([
      {
        slideIndex: 0,
        imageSrc: 'https://example.com/main.jpg',
        imageAlt: 'Горы',
        slideLabel: 'Горы',
      },
    ]);
  });

  it('extractCarouselSlideThumbnails учитывает thumbnailSrc на слайде и изображении', () => {
    const slideElements = [
      React.createElement(
        { displayName: CAROUSEL_SLIDE_DISPLAY_NAME },
        {
          slideLabel: 'Лес',
          thumbnailSrc: 'https://example.com/slide-thumb.jpg',
        },
        React.createElement(
          { displayName: CAROUSEL_IMAGE_DISPLAY_NAME },
          {
            src: 'https://example.com/main.jpg',
            thumbnailSrc: 'https://example.com/image-thumb.jpg',
            alt: 'Лес',
          },
        ),
      ),
    ] as React.ReactElement[];

    expect(extractCarouselSlideThumbnails(slideElements)[0]?.imageSrc).toBe(
      'https://example.com/slide-thumb.jpg',
    );
  });

  it('carouselHasRenderableThumbnails и getCarouselThumbnailAriaLabel', () => {
    expect(
      carouselHasRenderableThumbnails([
        { slideIndex: 0, imageAlt: 'A' },
        { slideIndex: 1, imageSrc: 'thumb.jpg', imageAlt: 'B' },
      ]),
    ).toBe(true);

    expect(getCarouselThumbnailAriaLabel(0, 3, 'Берег')).toBe('Берег, слайд 1 из 3');
    expect(getCarouselThumbnailAriaLabel(1, 3)).toBe('Слайд 2 из 3');
  });

  it('scrollCarouselThumbnailListToIndex прокручивает только список миниатюр', () => {
    const listElement = document.createElement('ul');
    const activeButton = document.createElement('button');

    listElement.scrollTo = jest.fn();
    Object.defineProperty(listElement, 'clientWidth', { value: 200, configurable: true });
    Object.defineProperty(listElement, 'scrollLeft', { value: 0, configurable: true });

    listElement.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      top: 0,
      width: 200,
      height: 80,
      right: 200,
      bottom: 80,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));

    activeButton.getBoundingClientRect = jest.fn(() => ({
      left: 120,
      top: 0,
      width: 40,
      height: 72,
      right: 160,
      bottom: 72,
      x: 120,
      y: 0,
      toJSON: () => ({}),
    }));

    scrollCarouselThumbnailListToIndex(listElement, activeButton);

    expect(listElement.scrollTo).toHaveBeenCalledWith({
      left: expect.any(Number),
      behavior: 'smooth',
    });
  });
});
