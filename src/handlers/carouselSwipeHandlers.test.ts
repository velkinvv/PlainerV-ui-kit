import { CarouselOrientation } from '../types/ui';
import {
  getCarouselPointerPrimaryCoordinate,
  isCarouselPointerDragGesture,
  resolveCarouselSwipeDirection,
} from './carouselSwipeHandlers';

describe('carouselSwipeHandlers', () => {
  it('resolveCarouselSwipeDirection определяет направление по горизонтали', () => {
    expect(resolveCarouselSwipeDirection(60, CarouselOrientation.HORIZONTAL)).toBe('next');
    expect(resolveCarouselSwipeDirection(-60, CarouselOrientation.HORIZONTAL)).toBe('previous');
  });

  it('resolveCarouselSwipeDirection определяет направление по вертикали', () => {
    expect(resolveCarouselSwipeDirection(60, CarouselOrientation.VERTICAL)).toBe('next');
    expect(resolveCarouselSwipeDirection(-60, CarouselOrientation.VERTICAL)).toBe('previous');
  });

  it('getCarouselPointerPrimaryCoordinate выбирает ось', () => {
    expect(
      getCarouselPointerPrimaryCoordinate({ clientX: 10, clientY: 40 }, CarouselOrientation.HORIZONTAL),
    ).toBe(10);
    expect(
      getCarouselPointerPrimaryCoordinate({ clientX: 10, clientY: 40 }, CarouselOrientation.VERTICAL),
    ).toBe(40);
  });

  it('isCarouselPointerDragGesture определяет drag', () => {
    expect(isCarouselPointerDragGesture(0, 10)).toBe(true);
    expect(isCarouselPointerDragGesture(0, 2)).toBe(false);
  });
});
