import { CarouselAnimation, CarouselOrientation } from '../types/ui';
import {
  getCarouselCoverflowSlidePresentation,
  getCarouselEffectSlidePresentation,
  getCarouselFlipSlidePresentation,
  getCarouselStackSlidePresentation,
  isCarouselCrossfadeAnimation,
  isCarouselEffectAnimation,
  shouldRenderCarouselEffectSlide,
} from './carouselEffectHandlers';

describe('carouselEffectHandlers', () => {
  it('isCarouselEffectAnimation определяет coverflow, flip и stack', () => {
    expect(isCarouselEffectAnimation(CarouselAnimation.COVERFLOW)).toBe(true);
    expect(isCarouselEffectAnimation(CarouselAnimation.FLIP)).toBe(true);
    expect(isCarouselEffectAnimation(CarouselAnimation.STACK)).toBe(true);
    expect(isCarouselEffectAnimation(CarouselAnimation.SLIDE)).toBe(false);
  });

  it('isCarouselCrossfadeAnimation определяет fade и scale', () => {
    expect(isCarouselCrossfadeAnimation(CarouselAnimation.FADE)).toBe(true);
    expect(isCarouselCrossfadeAnimation(CarouselAnimation.COVERFLOW)).toBe(false);
  });

  it('shouldRenderCarouselEffectSlide рендерит соседние слайды', () => {
    expect(shouldRenderCarouselEffectSlide(0, 2, 3)).toBe(true);
    expect(shouldRenderCarouselEffectSlide(6, 2, 3)).toBe(false);
  });

  it('getCarouselCoverflowSlidePresentation задаёт transform активному слайду', () => {
    const presentation = getCarouselCoverflowSlidePresentation(1, 1, CarouselOrientation.HORIZONTAL);
    const neighborPresentation = getCarouselCoverflowSlidePresentation(2, 1, CarouselOrientation.HORIZONTAL);

    expect(presentation.opacity).toBe(1);
    expect(presentation.pointerEvents).toBe('auto');
    expect(presentation.transform).toContain('scale(1)');
    expect(presentation.transform).toContain('rotateY(0deg)');
    expect(neighborPresentation.transform).toContain('78%');
    expect(neighborPresentation.transform).toContain('-180px');
  });

  it('getCarouselFlipSlidePresentation переворачивает слайды на месте без бокового смещения', () => {
    const activePresentation = getCarouselFlipSlidePresentation(1, 1, CarouselOrientation.HORIZONTAL);
    const nextPresentation = getCarouselFlipSlidePresentation(2, 1, CarouselOrientation.HORIZONTAL);

    expect(activePresentation.transform).toContain('rotateY(0deg)');
    expect(activePresentation.transform).not.toContain('%');
    expect(nextPresentation.transform).toContain('rotateY(88deg)');
    expect(nextPresentation.transform).not.toContain('%');
    expect(nextPresentation.pointerEvents).toBe('none');
  });

  it('getCarouselStackSlidePresentation кладёт активный слайд поверх стопки', () => {
    const activePresentation = getCarouselStackSlidePresentation(1, 1, CarouselOrientation.HORIZONTAL);
    const previousPresentation = getCarouselStackSlidePresentation(0, 1, CarouselOrientation.HORIZONTAL);
    const nextPresentation = getCarouselStackSlidePresentation(2, 1, CarouselOrientation.HORIZONTAL);

    expect(activePresentation.zIndex).toBeGreaterThan(previousPresentation.zIndex);
    expect(activePresentation.zIndex).toBeGreaterThan(nextPresentation.zIndex);
    expect(previousPresentation.transform).toContain('-105%');
    expect(nextPresentation.transform).toContain('scale(0.96)');
  });

  it('shouldRenderCarouselEffectSlide для stack монтирует предыдущий и следующие слайды', () => {
    expect(
      shouldRenderCarouselEffectSlide(0, 1, undefined, CarouselAnimation.STACK),
    ).toBe(true);
    expect(
      shouldRenderCarouselEffectSlide(4, 1, undefined, CarouselAnimation.STACK),
    ).toBe(false);
  });

  it('getCarouselEffectSlidePresentation делегирует coverflow, flip и stack', () => {
    expect(
      getCarouselEffectSlidePresentation(CarouselAnimation.COVERFLOW, 0, 0).zIndex,
    ).toBeGreaterThan(
      getCarouselEffectSlidePresentation(CarouselAnimation.COVERFLOW, 2, 0).zIndex,
    );
    expect(
      getCarouselEffectSlidePresentation(CarouselAnimation.STACK, 1, 1).zIndex,
    ).toBeGreaterThan(
      getCarouselEffectSlidePresentation(CarouselAnimation.STACK, 0, 1).zIndex,
    );
  });
});
