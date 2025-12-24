import React from 'react';
import {
  clampProgress,
  calculateStepperValue,
  getComputedStatus,
  getStatusColor,
  formatProgressValue,
  calculateCircleRadius,
  calculateCircleCircumference,
  calculateCircleOffset,
  getStepperSteps,
  getStatusLabel,
  getAccessibilityProps,
  formatEstimatedTime,
  getStatusLabelText,
} from './handlers';
import type { ProgressStep } from '../../../types/ui';

// Мок темы для тестов
const mockTheme = {
  colors: {
    progressStatusAwait: '#94D263',
    progressStatusLoading: '#68D5F8',
    progressStatusSuccess: '#94D263',
    progressStatusError: '#FF5252',
    progressFill: '#68D5F8',
  },
} as any;

describe('Progress handlers', () => {
  describe('clampProgress', () => {
    it('должен ограничивать значение в диапазоне 0-100', () => {
      expect(clampProgress(50, 100)).toBe(50);
      expect(clampProgress(0, 100)).toBe(0);
      expect(clampProgress(100, 100)).toBe(100);
    });

    it('должен ограничивать значения меньше 0', () => {
      expect(clampProgress(-10, 100)).toBe(0);
    });

    it('должен ограничивать значения больше 100', () => {
      expect(clampProgress(150, 100)).toBe(100);
    });

    it('должен корректно вычислять процент для разных max', () => {
      expect(clampProgress(25, 50)).toBe(50);
      expect(clampProgress(75, 150)).toBe(50);
    });

    it('должен возвращать 0 если max <= 0', () => {
      expect(clampProgress(50, 0)).toBe(0);
      expect(clampProgress(50, -10)).toBe(0);
    });
  });

  describe('calculateStepperValue', () => {
    const steps: ProgressStep[] = [
      { id: 1, label: 'Шаг 1' },
      { id: 2, label: 'Шаг 2' },
      { id: 3, label: 'Шаг 3' },
      { id: 4, label: 'Шаг 4' },
    ];

    it('должен вычислять значение для stepper варианта', () => {
      expect(calculateStepperValue('stepper', steps, 0, undefined)).toBe(0);
      expect(calculateStepperValue('stepper', steps, 1, undefined)).toBe(25);
      expect(calculateStepperValue('stepper', steps, 2, undefined)).toBe(50);
      expect(calculateStepperValue('stepper', steps, 3, undefined)).toBe(75);
      expect(calculateStepperValue('stepper', steps, 4, undefined)).toBe(100);
    });

    it('должен вычислять значение для stepper-circle варианта', () => {
      expect(calculateStepperValue('stepper-circle', steps, 0, undefined)).toBe(0);
      expect(calculateStepperValue('stepper-circle', steps, 2, undefined)).toBe(50);
      expect(calculateStepperValue('stepper-circle', steps, 4, undefined)).toBe(100);
    });

    it('должен ограничивать activeStep максимальным количеством шагов', () => {
      expect(calculateStepperValue('stepper', steps, 10, undefined)).toBe(100);
    });

    it('должен ограничивать activeStep минимальным значением 0', () => {
      expect(calculateStepperValue('stepper', steps, -5, undefined)).toBe(0);
    });

    it('должен использовать value для других вариантов', () => {
      expect(calculateStepperValue('linear', undefined, 0, 50)).toBe(50);
      expect(calculateStepperValue('circle', undefined, 0, 75)).toBe(75);
    });

    it('должен возвращать 0 если value не передан для не-stepper вариантов', () => {
      expect(calculateStepperValue('linear', undefined, 0, undefined)).toBe(0);
    });

    it('должен возвращать 0 если steps пустой массив', () => {
      expect(calculateStepperValue('stepper', [], 1, undefined)).toBe(0);
    });
  });

  describe('getComputedStatus', () => {
    it('должен возвращать переданный статус если он указан', () => {
      expect(getComputedStatus('await', false)).toBe('await');
      expect(getComputedStatus('loading', false)).toBe('loading');
      expect(getComputedStatus('success', false)).toBe('success');
      expect(getComputedStatus('error', false)).toBe('error');
    });

    it('должен возвращать success если прогресс завершен и статус не указан', () => {
      expect(getComputedStatus(undefined, true)).toBe('success');
    });

    it('должен возвращать await если прогресс не завершен и статус не указан', () => {
      expect(getComputedStatus(undefined, false)).toBe('await');
    });

    it('должен приоритизировать переданный статус над isComplete', () => {
      expect(getComputedStatus('error', true)).toBe('error');
      expect(getComputedStatus('await', true)).toBe('await');
    });
  });

  describe('getStatusColor', () => {
    it('должен возвращать переданный progressColor если он указан', () => {
      expect(getStatusColor('#FF0000', 'loading', mockTheme)).toBe('#FF0000');
    });

    it('должен возвращать стандартный цвет прогресса для await если статус не передан явно', () => {
      expect(getStatusColor(undefined, 'await', mockTheme, undefined)).toBe('#68D5F8');
    });

    it('должен возвращать цвет статуса await если он передан явно', () => {
      expect(getStatusColor(undefined, 'await', mockTheme, 'await')).toBe('#94D263');
    });

    it('должен возвращать цвет из темы для статуса loading', () => {
      expect(getStatusColor(undefined, 'loading', mockTheme, 'loading')).toBe('#68D5F8');
    });

    it('должен возвращать цвет из темы для статуса success', () => {
      expect(getStatusColor(undefined, 'success', mockTheme, 'success')).toBe('#94D263');
    });

    it('должен возвращать цвет из темы для статуса error', () => {
      expect(getStatusColor(undefined, 'error', mockTheme, 'error')).toBe('#FF5252');
    });

    it('должен возвращать стандартный цвет прогресса по умолчанию', () => {
      expect(getStatusColor(undefined, 'loading' as any, mockTheme)).toBe('#68D5F8');
    });
  });

  describe('formatProgressValue', () => {
    it('должен форматировать значение как процент по умолчанию', () => {
      expect(formatProgressValue(50, 100, 50)).toBe('50%');
      expect(formatProgressValue(75, 100, 75)).toBe('75%');
      expect(formatProgressValue(0, 100, 0)).toBe('0%');
      expect(formatProgressValue(100, 100, 100)).toBe('100%');
    });

    it('должен округлять процент до целого числа', () => {
      expect(formatProgressValue(33.333, 100, 33.333)).toBe('33%');
      expect(formatProgressValue(66.666, 100, 66.666)).toBe('67%');
    });

    it('должен использовать кастомную функцию форматирования если она передана', () => {
      const customFormat = (value: number, max: number) => `${value}/${max}`;
      expect(formatProgressValue(50, 100, 50, customFormat)).toBe('50/100');
    });

    it('должен поддерживать React.ReactNode в кастомной функции', () => {
      const customFormat = (value: number) => `Custom: ${value}%`;
      const result = formatProgressValue(50, 100, 50, customFormat);
      expect(result).toBe('Custom: 50%');
    });
  });

  describe('calculateCircleRadius', () => {
    it('должен вычислять радиус корректно', () => {
      expect(calculateCircleRadius(100, 10)).toBe(45);
      expect(calculateCircleRadius(200, 20)).toBe(90);
      expect(calculateCircleRadius(50, 5)).toBe(22.5);
    });

    it('должен обрабатывать нулевые значения', () => {
      expect(calculateCircleRadius(0, 0)).toBe(0);
    });
  });

  describe('calculateCircleCircumference', () => {
    it('должен вычислять длину окружности корректно', () => {
      const radius = 50;
      const expected = 2 * Math.PI * radius;
      expect(calculateCircleCircumference(radius)).toBeCloseTo(expected, 5);
    });

    it('должен возвращать 0 для нулевого радиуса', () => {
      expect(calculateCircleCircumference(0)).toBe(0);
    });
  });

  describe('calculateCircleOffset', () => {
    it('должен вычислять смещение для 0% прогресса', () => {
      const circumference = 100;
      expect(calculateCircleOffset(circumference, 0)).toBe(100);
    });

    it('должен вычислять смещение для 50% прогресса', () => {
      const circumference = 100;
      expect(calculateCircleOffset(circumference, 50)).toBe(50);
    });

    it('должен вычислять смещение для 100% прогресса', () => {
      const circumference = 100;
      expect(calculateCircleOffset(circumference, 100)).toBe(0);
    });

    it('должен вычислять смещение для промежуточных значений', () => {
      const circumference = 200;
      expect(calculateCircleOffset(circumference, 25)).toBe(150);
      expect(calculateCircleOffset(circumference, 75)).toBe(50);
    });
  });

  describe('getStepperSteps', () => {
    const steps: ProgressStep[] = [
      { id: 1, label: 'Шаг 1' },
      { id: 2, label: 'Шаг 2' },
      { id: 3, label: 'Шаг 3' },
      { id: 4, label: 'Шаг 4' },
    ];

    it('должен возвращать правильный текущий и следующий шаг для activeStep = 0', () => {
      const result = getStepperSteps(steps, 0);
      expect(result.currentStep).toBeNull();
      expect(result.nextStep).toEqual(steps[0]);
      expect(result.totalSteps).toBe(4);
    });

    it('должен возвращать правильный текущий и следующий шаг для activeStep = 1', () => {
      const result = getStepperSteps(steps, 1);
      expect(result.currentStep).toEqual(steps[0]);
      expect(result.nextStep).toEqual(steps[1]);
      expect(result.totalSteps).toBe(4);
    });

    it('должен возвращать правильный текущий и следующий шаг для activeStep = 2', () => {
      const result = getStepperSteps(steps, 2);
      expect(result.currentStep).toEqual(steps[1]);
      expect(result.nextStep).toEqual(steps[2]);
      expect(result.totalSteps).toBe(4);
    });

    it('должен возвращать правильный текущий и следующий шаг для activeStep = 4', () => {
      const result = getStepperSteps(steps, 4);
      expect(result.currentStep).toEqual(steps[3]);
      expect(result.nextStep).toBeNull();
      expect(result.totalSteps).toBe(4);
    });

    it('должен возвращать null для nextStep если activeStep >= totalSteps', () => {
      const result = getStepperSteps(steps, 5);
      expect(result.nextStep).toBeNull();
    });

    it('должен возвращать null для currentStep если activeStep = 0', () => {
      const result = getStepperSteps(steps, 0);
      expect(result.currentStep).toBeNull();
    });
  });

  describe('getStatusLabel', () => {
    it('должен возвращать правильный текст для каждого статуса', () => {
      expect(getStatusLabel('await')).toBe('Ожидание');
      expect(getStatusLabel('loading')).toBe('Загрузка');
      expect(getStatusLabel('success')).toBe('Завершено');
      expect(getStatusLabel('error')).toBe('Ошибка');
    });
  });

  describe('getAccessibilityProps', () => {
    it('должен создавать базовые ARIA атрибуты', () => {
      const props = getAccessibilityProps(50, 100, undefined, undefined, 'loading', false);
      expect(props.role).toBe('progressbar');
      expect(props['aria-valuemin']).toBe(0);
      expect(props['aria-valuemax']).toBe(100);
      expect(props['aria-live']).toBe('polite');
      expect(props['aria-atomic']).toBe(true);
    });

    it('должен устанавливать aria-valuenow для определенного прогресса', () => {
      const props = getAccessibilityProps(50, 100, undefined, undefined, 'loading', false);
      expect(props['aria-valuenow']).toBe(50);
    });

    it('должен устанавливать aria-busy для indeterminate режима', () => {
      const props = getAccessibilityProps(50, 100, undefined, undefined, 'loading', true);
      expect(props['aria-valuenow']).toBeUndefined();
      expect(props['aria-busy']).toBe(true);
    });

    it('должен устанавливать aria-busy для статуса loading', () => {
      const props = getAccessibilityProps(50, 100, undefined, undefined, 'loading', false);
      expect(props['aria-busy']).toBe(true);
    });

    it('должен устанавливать aria-labelledby если labelId передан', () => {
      const props = getAccessibilityProps(
        50,
        100,
        'Загрузка',
        undefined,
        'loading',
        false,
        'label-id',
      );
      expect(props['aria-labelledby']).toBe('label-id');
    });

    it('должен устанавливать aria-label если label передан без labelId', () => {
      const props = getAccessibilityProps(50, 100, 'Загрузка', undefined, 'loading', false);
      expect(props['aria-label']).toBe('Загрузка');
    });

    it('должен устанавливать aria-describedby если descriptionId передан', () => {
      const props = getAccessibilityProps(
        50,
        100,
        undefined,
        { description: 'Описание' },
        'loading',
        false,
        undefined,
        'description-id',
      );
      expect(props['aria-describedby']).toBe('description-id');
    });

    it('должен ограничивать aria-valuenow в диапазоне 0-max', () => {
      const props1 = getAccessibilityProps(-10, 100, undefined, undefined, 'loading', false);
      expect(props1['aria-valuenow']).toBe(0);

      const props2 = getAccessibilityProps(150, 100, undefined, undefined, 'loading', false);
      expect(props2['aria-valuenow']).toBe(100);
    });
  });

  describe('formatEstimatedTime', () => {
    it('должен форматировать время меньше минуты в секунды', () => {
      expect(formatEstimatedTime(0)).toBe('0 сек');
      expect(formatEstimatedTime(30)).toBe('30 сек');
      expect(formatEstimatedTime(59)).toBe('59 сек');
    });

    it('должен форматировать время в минуты и секунды', () => {
      expect(formatEstimatedTime(60)).toBe('1 мин');
      expect(formatEstimatedTime(90)).toBe('1 мин 30 сек');
      expect(formatEstimatedTime(125)).toBe('2 мин 5 сек');
    });

    it('должен округлять секунды', () => {
      expect(formatEstimatedTime(30.7)).toBe('31 сек');
      expect(formatEstimatedTime(90.3)).toBe('1 мин 30 сек');
    });
  });

  describe('getStatusLabelText', () => {
    it('должен возвращать стандартный текст если statusLabels не передан', () => {
      expect(getStatusLabelText('await')).toBe('Ожидание');
      expect(getStatusLabelText('loading')).toBe('Загрузка');
      expect(getStatusLabelText('success')).toBe('Завершено');
      expect(getStatusLabelText('error')).toBe('Ошибка');
    });

    it('должен возвращать кастомный текст из statusLabels', () => {
      const statusLabels = {
        await: 'Ожидание начала',
        loading: 'Загрузка данных',
        success: 'Успешно завершено',
        error: 'Произошла ошибка',
      };
      expect(getStatusLabelText('await', statusLabels)).toBe('Ожидание начала');
      expect(getStatusLabelText('loading', statusLabels)).toBe('Загрузка данных');
      expect(getStatusLabelText('success', statusLabels)).toBe('Успешно завершено');
      expect(getStatusLabelText('error', statusLabels)).toBe('Произошла ошибка');
    });

    it('должен использовать стандартный текст если кастомный не указан', () => {
      const statusLabels = {
        loading: 'Загрузка данных',
      };
      expect(getStatusLabelText('await', statusLabels)).toBe('Ожидание');
      expect(getStatusLabelText('loading', statusLabels)).toBe('Загрузка данных');
      expect(getStatusLabelText('success', statusLabels)).toBe('Завершено');
    });
  });
});
