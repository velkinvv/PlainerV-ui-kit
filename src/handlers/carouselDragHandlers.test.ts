import { CarouselOrientation } from '../types/ui';
import {
  applyCarouselDragResistance,
  appendCarouselPointerVelocitySample,
  calculateCarouselPointerVelocity,
  getCarouselTrackTransformValue,
  resolveCarouselDragReleaseIndex,
} from './carouselDragHandlers';

describe('carouselDragHandlers', () => {
  it('applyCarouselDragResistance ослабляет drag на краях без loop', () => {
    expect(applyCarouselDragResistance(-100, 0, 3, false, 0.5)).toBe(-50);
    expect(applyCarouselDragResistance(100, 2, 3, false, 0.5)).toBe(50);
    expect(applyCarouselDragResistance(100, 1, 3, false, 0.5)).toBe(100);
  });

  it('appendCarouselPointerVelocitySample ограничивает окно сэмплов', () => {
    const samples = appendCarouselPointerVelocitySample([], 10, 1000);
    expect(samples).toHaveLength(1);

    const trimmedSamples = appendCarouselPointerVelocitySample(
      [{ coordinate: 0, timestamp: 1000 }],
      50,
      1200,
      100,
      5,
    );

    expect(trimmedSamples).toHaveLength(1);
    expect(trimmedSamples[0]?.coordinate).toBe(50);
  });

  it('calculateCarouselPointerVelocity считает скорость по направлению next', () => {
    const velocity = calculateCarouselPointerVelocity([
      { coordinate: 200, timestamp: 0 },
      { coordinate: 100, timestamp: 100 },
    ]);

    expect(velocity).toBe(1);
  });

  it('resolveCarouselDragReleaseIndex переключает слайд по порогу и скорости', () => {
    expect(
      resolveCarouselDragReleaseIndex({
        activeIndex: 0,
        dragDeltaPrimaryPx: 80,
        viewportPrimarySize: 300,
        slideCount: 3,
        loop: false,
        velocityPrimary: 0,
      }),
    ).toBe(1);

    expect(
      resolveCarouselDragReleaseIndex({
        activeIndex: 1,
        dragDeltaPrimaryPx: 5,
        viewportPrimarySize: 300,
        slideCount: 3,
        loop: false,
        velocityPrimary: 0.5,
      }),
    ).toBe(2);
  });

  it('getCarouselTrackTransformValue учитывает drag offset', () => {
    expect(getCarouselTrackTransformValue(1, 24, CarouselOrientation.HORIZONTAL)).toBe(
      'translateX(calc(-100% - 24px))',
    );
    expect(getCarouselTrackTransformValue(2, 10, CarouselOrientation.VERTICAL)).toBe(
      'translateY(calc(-200% - 10px))',
    );
  });
});
