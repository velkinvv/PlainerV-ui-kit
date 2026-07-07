import {
  calculateCarouselAutoplayProgressRatio,
  getCarouselAutoplayProgressAriaValueText,
  getCarouselAutoplayRemainingSeconds,
} from './carouselAutoplayProgressHandlers';

describe('carouselAutoplayProgressHandlers', () => {
  it('calculateCarouselAutoplayProgressRatio ограничивает диапазон 0…1', () => {
    expect(calculateCarouselAutoplayProgressRatio(2500, 5000)).toBe(0.5);
    expect(calculateCarouselAutoplayProgressRatio(7000, 5000)).toBe(1);
  });

  it('getCarouselAutoplayRemainingSeconds округляет вверх', () => {
    expect(getCarouselAutoplayRemainingSeconds(0.1, 5000)).toBe(5);
    expect(getCarouselAutoplayRemainingSeconds(0.96, 5000)).toBe(1);
  });

  it('getCarouselAutoplayProgressAriaValueText описывает обратный отсчёт', () => {
    expect(getCarouselAutoplayProgressAriaValueText(3)).toBe('До следующего слайда 3 с');
    expect(getCarouselAutoplayProgressAriaValueText(0)).toBe('Следующий слайд сейчас');
  });
});
