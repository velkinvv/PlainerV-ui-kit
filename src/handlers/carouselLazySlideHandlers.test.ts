import {
  getCarouselSlideIndicesToPreload,
  shouldRenderCarouselSlide,
} from './carouselLazySlideHandlers';

describe('carouselLazySlideHandlers', () => {
  it('shouldRenderCarouselSlide рендерит слайды в радиусе visibleSlidesRange', () => {
    expect(shouldRenderCarouselSlide(0, 2, 1)).toBe(false);
    expect(shouldRenderCarouselSlide(1, 2, 1)).toBe(true);
    expect(shouldRenderCarouselSlide(2, 2, 1)).toBe(true);
    expect(shouldRenderCarouselSlide(4, 2, 1)).toBe(false);
  });

  it('shouldRenderCarouselSlide рендерит все слайды при undefined range', () => {
    expect(shouldRenderCarouselSlide(0, 5, undefined)).toBe(true);
  });

  it('getCarouselSlideIndicesToPreload возвращает соседние индексы', () => {
    expect(getCarouselSlideIndicesToPreload(1, 3, false)).toEqual([1, 0, 2]);
    expect(getCarouselSlideIndicesToPreload(0, 1, false)).toEqual([0]);
  });
});
