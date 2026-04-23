import { ThemeMode } from '../../../types/theme';
import {
  clampStepperActiveIndex,
  formatStepperCounterLabel,
  getCircleProgressStrokeDashoffset,
  getCompactRingProgressFraction,
  getLinearStepCircleVisual,
  isLinearConnectorCompleted,
  resolveStepperAppearance,
} from './handlers';

describe('Stepper handlers', () => {
  describe('resolveStepperAppearance', () => {
    it('возвращает явный appearance', () => {
      expect(resolveStepperAppearance('dark', ThemeMode.LIGHT)).toBe('dark');
      expect(resolveStepperAppearance('light', ThemeMode.DARK)).toBe('light');
    });

    it('берёт из темы при undefined', () => {
      expect(resolveStepperAppearance(undefined, ThemeMode.LIGHT)).toBe('light');
      expect(resolveStepperAppearance(undefined, ThemeMode.DARK)).toBe('dark');
    });
  });

  describe('clampStepperActiveIndex', () => {
    it('ограничивает индекс', () => {
      expect(clampStepperActiveIndex(5, 3)).toBe(2);
      expect(clampStepperActiveIndex(-1, 3)).toBe(0);
      expect(clampStepperActiveIndex(0, 0)).toBe(0);
    });
  });

  describe('getCompactRingProgressFraction', () => {
    it('считает долю по шагам с 1', () => {
      expect(getCompactRingProgressFraction(1, 3)).toBeCloseTo(1 / 3);
      expect(getCompactRingProgressFraction(3, 3)).toBe(1);
      expect(getCompactRingProgressFraction(0, 3)).toBeCloseTo(1 / 3);
    });

    it('возвращает 0 при нуле шагов', () => {
      expect(getCompactRingProgressFraction(1, 0)).toBe(0);
    });
  });

  describe('getCircleProgressStrokeDashoffset', () => {
    it('полный круг при нуле прогресса', () => {
      const c = 100;
      expect(getCircleProgressStrokeDashoffset(c, 0)).toBe(c);
    });

    it('ноль при полном прогрессе', () => {
      const c = 100;
      expect(getCircleProgressStrokeDashoffset(c, 1)).toBe(0);
    });
  });

  describe('formatStepperCounterLabel', () => {
    it('форматирует счётчик', () => {
      expect(formatStepperCounterLabel(1, 3)).toBe('1/3');
      expect(formatStepperCounterLabel(10, 10)).toBe('10/10');
    });
  });

  describe('getLinearStepCircleVisual', () => {
    it('filled до активного включительно', () => {
      expect(getLinearStepCircleVisual(0, 1)).toBe('filled');
      expect(getLinearStepCircleVisual(1, 1)).toBe('filled');
      expect(getLinearStepCircleVisual(2, 1)).toBe('outline');
    });
  });

  describe('isLinearConnectorCompleted', () => {
    it('завершён если сегмент до активного', () => {
      expect(isLinearConnectorCompleted(0, 2)).toBe(true);
      expect(isLinearConnectorCompleted(1, 1)).toBe(false);
    });
  });
});
