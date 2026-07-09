import {
  findCarouselSlideIndexBySlideId,
  getCarouselSlideIdAtIndex,
  resolveCarouselActiveIndex,
  resolveCarouselDefaultActiveIndex,
} from './carouselSlideIdHandlers';

const slideInfoList = [
  { slideIndex: 0, slideId: 'intro' },
  { slideIndex: 1, slideId: 'details' },
  { slideIndex: 2, slideId: 'summary' },
];

describe('carouselSlideIdHandlers', () => {
  it('findCarouselSlideIndexBySlideId находит индекс по slideId', () => {
    expect(findCarouselSlideIndexBySlideId(slideInfoList, 'details')).toBe(1);
    expect(findCarouselSlideIndexBySlideId(slideInfoList, 'missing')).toBeNull();
  });

  it('resolveCarouselDefaultActiveIndex учитывает defaultSlideId', () => {
    expect(resolveCarouselDefaultActiveIndex(slideInfoList, 0, 'summary', 3)).toBe(2);
    expect(resolveCarouselDefaultActiveIndex(slideInfoList, 1, undefined, 3)).toBe(1);
  });

  it('resolveCarouselActiveIndex учитывает controlled slideId', () => {
    expect(
      resolveCarouselActiveIndex({
        activeSlideIdProp: 'details',
        slideInfoList,
        internalIndex: 0,
        defaultActiveIndex: 0,
        slideCount: 3,
      }),
    ).toBe(1);
  });

  it('getCarouselSlideIdAtIndex возвращает slideId', () => {
    expect(getCarouselSlideIdAtIndex(slideInfoList, 2)).toBe('summary');
  });
});
