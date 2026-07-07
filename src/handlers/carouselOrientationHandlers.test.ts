import { CarouselOrientation } from '../types/ui';
import {
  getCarouselNextArrowIconName,
  getCarouselPreviousArrowIconName,
  getCarouselViewportTouchAction,
  isCarouselVerticalOrientation,
  resolveCarouselAspectRatio,
} from './carouselOrientationHandlers';

describe('carouselOrientationHandlers', () => {
  it('isCarouselVerticalOrientation определяет ориентацию', () => {
    expect(isCarouselVerticalOrientation(CarouselOrientation.VERTICAL)).toBe(true);
    expect(isCarouselVerticalOrientation(CarouselOrientation.HORIZONTAL)).toBe(false);
  });

  it('resolveCarouselAspectRatio подставляет 9/16 для vertical', () => {
    expect(resolveCarouselAspectRatio(CarouselOrientation.VERTICAL)).toBe('9 / 16');
    expect(resolveCarouselAspectRatio(CarouselOrientation.VERTICAL, '4 / 3')).toBe('4 / 3');
    expect(resolveCarouselAspectRatio(CarouselOrientation.VERTICAL, '16 / 9', 480)).toBeUndefined();
  });

  it('getCarouselViewportTouchAction учитывает ориентацию', () => {
    expect(getCarouselViewportTouchAction(true, CarouselOrientation.HORIZONTAL)).toBe(
      'pan-y pinch-zoom',
    );
    expect(getCarouselViewportTouchAction(true, CarouselOrientation.VERTICAL)).toBe(
      'pan-x pinch-zoom',
    );
  });

  it('возвращает иконки стрелок по ориентации', () => {
    expect(getCarouselPreviousArrowIconName(CarouselOrientation.VERTICAL)).toBe('PhosphorCaretUp');
    expect(getCarouselNextArrowIconName(CarouselOrientation.VERTICAL)).toBe('PhosphorCaretDown');
  });
});
