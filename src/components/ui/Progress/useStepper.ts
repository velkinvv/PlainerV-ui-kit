import { useState, useCallback } from 'react';
import type { ProgressStep } from '../../../types/ui';

/**
 * Хук для управления состоянием степпера
 * @param steps - массив шагов
 * @param initialStep - начальный активный шаг (по умолчанию 0)
 * @returns объект с состоянием и методами управления
 */
export const useStepper = (steps: ProgressStep[], initialStep: number = 0) => {
  const [activeStep, setActiveStep] = useState(initialStep);
  const totalSteps = steps.length;

  /**
   * Переходит к следующему шагу
   */
  const nextStep = useCallback(() => {
    setActiveStep(prev => Math.min(prev + 1, totalSteps));
  }, [totalSteps]);

  /**
   * Переходит к предыдущему шагу
   */
  const previousStep = useCallback(() => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  }, []);

  /**
   * Переходит к конкретному шагу
   * @param stepIndex - индекс шага (0-based)
   */
  const goToStep = useCallback(
    (stepIndex: number) => {
      setActiveStep(Math.min(Math.max(stepIndex, 0), totalSteps));
    },
    [totalSteps],
  );

  /**
   * Сбрасывает степпер в начальное состояние
   */
  const reset = useCallback(() => {
    setActiveStep(initialStep);
  }, [initialStep]);

  /**
   * Переходит к первому шагу
   */
  const goToFirst = useCallback(() => {
    setActiveStep(0);
  }, []);

  /**
   * Переходит к последнему шагу
   */
  const goToLast = useCallback(() => {
    setActiveStep(totalSteps);
  }, [totalSteps]);

  /**
   * Проверяет, можно ли перейти к следующему шагу
   */
  const canGoNext = activeStep < totalSteps;

  /**
   * Проверяет, можно ли перейти к предыдущему шагу
   */
  const canGoPrevious = activeStep > 0;

  /**
   * Получает текущий шаг
   */
  const currentStep = activeStep > 0 && activeStep <= totalSteps ? steps[activeStep - 1] : null;

  /**
   * Получает следующий шаг
   */
  const nextStepData = activeStep < totalSteps ? steps[activeStep] : null;

  /**
   * Вычисляет процент прогресса
   */
  const progress = (activeStep / totalSteps) * 100;

  return {
    activeStep,
    totalSteps,
    currentStep,
    nextStepData,
    progress,
    canGoNext,
    canGoPrevious,
    nextStep,
    previousStep,
    goToStep,
    reset,
    goToFirst,
    goToLast,
  };
};
