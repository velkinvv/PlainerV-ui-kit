import { Size } from '../../../types/sizes';
import {
  clampSliderValue,
  snapSliderToStep,
  valueToPercent,
  mergeRangeAfterThumbMove,
  parseManualSliderNumber,
  getSliderThumbSizePx,
} from './handlers';

describe('Slider handlers', () => {
  it('clampSliderValue', () => {
    expect(clampSliderValue(5, 0, 10)).toBe(5);
    expect(clampSliderValue(-1, 0, 10)).toBe(0);
    expect(clampSliderValue(99, 0, 10)).toBe(10);
  });

  it('snapSliderToStep', () => {
    expect(snapSliderToStep(13, 0, 100, 5)).toBe(15);
    expect(snapSliderToStep(2, 0, 10, 3)).toBe(3);
  });

  it('valueToPercent', () => {
    expect(valueToPercent(50, 0, 100)).toBe(50);
    expect(valueToPercent(0, 0, 200)).toBe(0);
  });

  it('mergeRangeAfterThumbMove', () => {
    expect(mergeRangeAfterThumbMove(0, 30, 40, 80, 0, 100, 1)).toEqual([30, 80]);
    expect(mergeRangeAfterThumbMove(1, 50, 40, 80, 0, 100, 1)).toEqual([40, 50]);
  });

  it('parseManualSliderNumber', () => {
    expect(parseManualSliderNumber('1 000 000')).toBe(1000000);
    expect(parseManualSliderNumber('')).toBeNull();
  });

  it('getSliderThumbSizePx', () => {
    expect(getSliderThumbSizePx(Size.SM)).toBe(16);
    expect(getSliderThumbSizePx(Size.MD)).toBe(20);
  });
});
