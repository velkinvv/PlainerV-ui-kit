import { ThemeColorScheme } from '../../../types/theme';
import {
  clampStepperActiveIndex,
  formatStepperCounterLabel,
  getCircleProgressStrokeDashoffset,
  getCompactRingProgressFraction,
  getLinearStepCircleVisual,
  getStepperStepAccessibleTitle,
  isLinearConnectorCompleted,
  resolveEffectiveStepperTitleLayout,
  resolveStepperAppearance,
  STEPPER_LINEAR_NARROW_CONTAINER_MAX_PX,
} from './handlers';

describe('Stepper handlers', () => {
  describe('resolveStepperAppearance', () => {
    it('возвращает явный appearance', () => {
      expect(resolveStepperAppearance('dark', ThemeColorScheme.LIGHT)).toBe('dark');
      expect(resolveStepperAppearance('light', ThemeColorScheme.DARK)).toBe('light');
    });

    it('берёт из темы при undefined', () => {
      expect(resolveStepperAppearance(undefined, ThemeColorScheme.LIGHT)).toBe('light');
      expect(resolveStepperAppearance(undefined, ThemeColorScheme.DARK)).toBe('dark');
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

  describe('resolveEffectiveStepperTitleLayout', () => {
    it('auto ниже порога → hidden', () => {
      expect(resolveEffectiveStepperTitleLayout('auto', 360)).toBe('hidden');
      expect(resolveEffectiveStepperTitleLayout(undefined, 519)).toBe('hidden');
    });

    it('auto на пороге и выше → nowrap', () => {
      expect(
        resolveEffectiveStepperTitleLayout('auto', STEPPER_LINEAR_NARROW_CONTAINER_MAX_PX),
      ).toBe('nowrap');
      expect(resolveEffectiveStepperTitleLayout('auto', 960)).toBe('nowrap');
    });

    it('auto при неизвестной ширине → nowrap (SSR / до измерения)', () => {
      expect(resolveEffectiveStepperTitleLayout('auto', null)).toBe('nowrap');
    });

    it('явные режимы не зависят от ширины', () => {
      expect(resolveEffectiveStepperTitleLayout('wrap', 960)).toBe('wrap');
      expect(resolveEffectiveStepperTitleLayout('hidden', 960)).toBe('hidden');
      expect(resolveEffectiveStepperTitleLayout('nowrap', 200)).toBe('nowrap');
    });
  });

  describe('getStepperStepAccessibleTitle', () => {
    it('возвращает строку title', () => {
      expect(getStepperStepAccessibleTitle('Реквизиты организации')).toBe('Реквизиты организации');
    });

    it('для не-строки возвращает undefined', () => {
      expect(getStepperStepAccessibleTitle(null)).toBeUndefined();
    });
  });
});
