import { CarouselNavigation } from '../../../types/ui';
import {
  canGoToNextCarouselSlide,
  canGoToPreviousCarouselSlide,
  carouselShowsArrows,
  carouselShowsDots,
  carouselShowsThumbnails,
  clampCarouselIndex,
  getNextCarouselIndex,
  getPreviousCarouselIndex,
  getCarouselSlideAriaLabel,
  resolveCarouselSwipeDirection,
  shouldIgnoreCarouselSwipePointerTarget,
} from './handlers';

describe('Carousel handlers', () => {
  it('clampCarouselIndex ограничивает диапазон', () => {
    expect(clampCarouselIndex(-1, 5)).toBe(0);
    expect(clampCarouselIndex(3, 5)).toBe(3);
    expect(clampCarouselIndex(9, 5)).toBe(4);
  });

  it('getNextCarouselIndex и getPreviousCarouselIndex учитывают loop', () => {
    expect(getNextCarouselIndex(4, 5, false)).toBe(4);
    expect(getNextCarouselIndex(4, 5, true)).toBe(0);
    expect(getPreviousCarouselIndex(0, 5, false)).toBe(0);
    expect(getPreviousCarouselIndex(0, 5, true)).toBe(4);
  });

  it('carouselShowsArrows и carouselShowsDots', () => {
    expect(carouselShowsArrows(CarouselNavigation.BOTH)).toBe(true);
    expect(carouselShowsArrows(CarouselNavigation.DOTS)).toBe(false);
    expect(carouselShowsDots(CarouselNavigation.BOTH)).toBe(true);
    expect(carouselShowsDots(CarouselNavigation.ARROWS)).toBe(false);
  });

  it('carouselShowsThumbnails', () => {
    expect(carouselShowsThumbnails(CarouselNavigation.THUMBNAILS)).toBe(true);
    expect(carouselShowsThumbnails(CarouselNavigation.BOTH, true)).toBe(true);
    expect(carouselShowsThumbnails(CarouselNavigation.BOTH, false)).toBe(false);
    expect(carouselShowsThumbnails(CarouselNavigation.NONE)).toBe(false);
  });

  it('canGoToPreviousCarouselSlide и canGoToNextCarouselSlide', () => {
    expect(canGoToPreviousCarouselSlide(0, false)).toBe(false);
    expect(canGoToPreviousCarouselSlide(0, true)).toBe(true);
    expect(canGoToNextCarouselSlide(2, 3, false)).toBe(false);
    expect(canGoToNextCarouselSlide(2, 3, true)).toBe(true);
  });

  it('resolveCarouselSwipeDirection определяет направление', () => {
    expect(resolveCarouselSwipeDirection(60)).toBe('next');
    expect(resolveCarouselSwipeDirection(-60)).toBe('previous');
    expect(resolveCarouselSwipeDirection(10)).toBeNull();
  });

  it('shouldIgnoreCarouselSwipePointerTarget игнорирует контролы', () => {
    const button = document.createElement('button');
    document.body.appendChild(button);

    expect(shouldIgnoreCarouselSwipePointerTarget(button)).toBe(true);
    expect(shouldIgnoreCarouselSwipePointerTarget(document.createElement('div'))).toBe(false);

    document.body.removeChild(button);
  });

  it('getCarouselSlideAriaLabel формирует подпись', () => {
    expect(getCarouselSlideAriaLabel(1, 5)).toBe('Слайд 2 из 5');
    expect(getCarouselSlideAriaLabel(0, 3, 'Горы')).toBe('Горы');
  });
});
