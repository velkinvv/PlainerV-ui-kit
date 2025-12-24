import { useState, useCallback } from 'react';

/**
 * Хук для управления состоянием прогресса
 * @param initialValue - начальное значение прогресса (0-100)
 * @returns объект с состоянием и методами управления
 */
export const useProgress = (initialValue: number = 0) => {
  const [value, setValue] = useState(initialValue);
  const [isComplete, setIsComplete] = useState(false);

  /**
   * Устанавливает значение прогресса
   * @param newValue - новое значение (0-100)
   */
  const setProgress = useCallback((newValue: number) => {
    const clampedValue = Math.min(Math.max(newValue, 0), 100);
    setValue(clampedValue);
    setIsComplete(clampedValue >= 100);
  }, []);

  /**
   * Увеличивает значение прогресса на указанное количество
   * @param increment - количество для увеличения
   */
  const increment = useCallback(
    (increment: number = 1) => {
      setProgress(value + increment);
    },
    [value, setProgress],
  );

  /**
   * Уменьшает значение прогресса на указанное количество
   * @param decrement - количество для уменьшения
   */
  const decrement = useCallback(
    (decrement: number = 1) => {
      setProgress(value - decrement);
    },
    [value, setProgress],
  );

  /**
   * Сбрасывает прогресс в начальное значение
   */
  const reset = useCallback(() => {
    setValue(initialValue);
    setIsComplete(false);
  }, [initialValue]);

  /**
   * Устанавливает прогресс в 100%
   */
  const complete = useCallback(() => {
    setValue(100);
    setIsComplete(true);
  }, []);

  return {
    value,
    isComplete,
    setProgress,
    increment,
    decrement,
    reset,
    complete,
  };
};
