import { CarouselAnimation } from '../types/ui';
import {
  CAROUSEL_PARALLAX_BACKGROUND_RATIO,
  CAROUSEL_PARALLAX_OVERLAY_RATIO,
  easeCarouselParallaxProgress,
  formatCarouselParallaxLayerTransform,
  getCarouselParallaxLayerTransform,
  getCarouselParallaxMotionIndex,
  getCarouselParallaxPresetRatio,
  getCarouselSlideDisplacementPx,
  isCarouselParallaxEnabled,
  resolveCarouselAnimation,
  resolveCarouselParallaxRatio,
} from './carouselParallaxHandlers';

describe('carouselParallaxHandlers', () => {
  it('resolveCarouselAnimation преобразует parallax в slide', () => {
    expect(resolveCarouselAnimation(CarouselAnimation.PARALLAX)).toBe(CarouselAnimation.SLIDE);
    expect(resolveCarouselAnimation(CarouselAnimation.FADE)).toBe(CarouselAnimation.FADE);
  });

  it('isCarouselParallaxEnabled учитывает animation и prop parallax', () => {
    expect(isCarouselParallaxEnabled(CarouselAnimation.SLIDE, true)).toBe(true);
    expect(isCarouselParallaxEnabled(CarouselAnimation.PARALLAX)).toBe(true);
    expect(isCarouselParallaxEnabled(CarouselAnimation.SLIDE, false)).toBe(false);
  });

  it('getCarouselParallaxMotionIndex учитывает dragOffset', () => {
    expect(getCarouselParallaxMotionIndex(0, 120, 400)).toBeCloseTo(0.3);
  });

  it('getCarouselSlideDisplacementPx возвращает смещение от центра', () => {
    expect(getCarouselSlideDisplacementPx(0, 0.5, 400)).toBe(-200);
  });

  it('resolveCarouselParallaxRatio поддерживает явный коэффициент', () => {
    expect(resolveCarouselParallaxRatio(false, 0.42, CAROUSEL_PARALLAX_BACKGROUND_RATIO)).toBe(0.42);
    expect(resolveCarouselParallaxRatio(true, false, CAROUSEL_PARALLAX_BACKGROUND_RATIO)).toBeNull();
  });

  it('getCarouselParallaxLayerTransform замедляет фон относительно слайда', () => {
    const layerTransform = getCarouselParallaxLayerTransform(0, 0.5, 400, 0.35);

    expect(layerTransform.translatePrimaryPx).toBe(-130);
    expect(layerTransform.scale).toBeGreaterThan(1);
  });

  it('formatCarouselParallaxLayerTransform возвращает none при reduced motion', () => {
    expect(
      formatCarouselParallaxLayerTransform(
        { translatePrimaryPx: 10, scale: 1.05 },
        undefined,
        true,
      ),
    ).toBe('none');
  });

  it('getCarouselParallaxPresetRatio возвращает пресеты слоёв', () => {
    expect(getCarouselParallaxPresetRatio('background')).toBe(CAROUSEL_PARALLAX_BACKGROUND_RATIO);
    expect(getCarouselParallaxPresetRatio('overlay')).toBe(CAROUSEL_PARALLAX_OVERLAY_RATIO);
  });

  it('easeCarouselParallaxProgress ограничивает progress', () => {
    expect(easeCarouselParallaxProgress(2)).toBe(1);
    expect(easeCarouselParallaxProgress(-1)).toBe(0);
  });
});
