import {
  getCarouselProgressSegmentState,
  shouldAnimateCarouselProgressSegment,
} from './carouselProgressHandlers';

describe('carouselProgressHandlers', () => {
  it('getCarouselProgressSegmentState определяет состояние сегмента', () => {
    expect(getCarouselProgressSegmentState(0, 2)).toBe('complete');
    expect(getCarouselProgressSegmentState(2, 2)).toBe('active');
    expect(getCarouselProgressSegmentState(3, 2)).toBe('pending');
  });

  it('shouldAnimateCarouselProgressSegment учитывает autoplay и reduced motion', () => {
    expect(shouldAnimateCarouselProgressSegment(true, true, false, false)).toBe(true);
    expect(shouldAnimateCarouselProgressSegment(true, true, true, false)).toBe(false);
    expect(shouldAnimateCarouselProgressSegment(true, true, false, true)).toBe(false);
  });
});
