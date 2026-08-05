import {
  clampRatingValue,
  roundToPrecision,
  ratingValueToPercent,
  resolveRatingScaleColor,
  defaultGetRatingLabelText,
  getInteractiveRatingSteps,
} from './ratingHandlers';

describe('ratingHandlers', () => {
  it('clampRatingValue ограничивает диапазон и пропускает null', () => {
    expect(clampRatingValue(null, 5)).toBeNull();
    expect(clampRatingValue(-1, 5)).toBe(0);
    expect(clampRatingValue(9, 5)).toBe(5);
    expect(clampRatingValue(3.2, 5)).toBe(3.2);
  });

  it('roundToPrecision округляет к шагу', () => {
    expect(roundToPrecision(2.24, 0.5)).toBe(2);
    expect(roundToPrecision(2.26, 0.5)).toBe(2.5);
    expect(roundToPrecision(2.7, 1)).toBe(3);
  });

  it('ratingValueToPercent считает долю', () => {
    expect(ratingValueToPercent(null, 5)).toBe(0);
    expect(ratingValueToPercent(2.5, 5)).toBe(50);
    expect(ratingValueToPercent(5, 5)).toBe(100);
  });

  it('resolveRatingScaleColor для traffic на краях', () => {
    expect(resolveRatingScaleColor(0, 'traffic', ['#f00', '#ff0', '#0f0'])).toBe('#ff0000');
    expect(resolveRatingScaleColor(1, 'traffic', ['#f00', '#ff0', '#0f0'])).toBe('#00ff00');
  });

  it('getInteractiveRatingSteps строит шаги 1..max с precision', () => {
    expect(getInteractiveRatingSteps(5, 1)).toEqual([1, 2, 3, 4, 5]);
    expect(getInteractiveRatingSteps(2, 0.5)).toEqual([0.5, 1, 1.5, 2]);
  });

  it('defaultGetRatingLabelText на русском', () => {
    expect(defaultGetRatingLabelText(1)).toMatch(/1/);
    expect(defaultGetRatingLabelText(5)).toMatch(/5/);
  });
});
