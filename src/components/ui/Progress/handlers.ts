import type React from 'react';
import type { ProgressVariant, ProgressStep } from '../../../types/ui';
import type { DefaultTheme } from 'styled-components';

/**
 * Ограничивает значение прогресса в диапазоне от 0 до 100%
 * @param value - значение прогресса
 * @param max - максимальное значение
 * @returns процент прогресса от 0 до 100
 */
export const clampProgress = (value: number, max: number): number => {
  if (max <= 0) return 0;
  const percentage = (value / max) * 100;
  return Math.min(Math.max(percentage, 0), 100);
};

/**
 * Вычисляет значение прогресса для варианта stepper на основе activeStep
 * @param variant - вариант прогресса
 * @param steps - массив шагов
 * @param activeStep - активный шаг (начинается с 0)
 * @param value - значение прогресса для других вариантов
 * @returns вычисленное значение прогресса
 */
export const calculateStepperValue = (
  variant: ProgressVariant,
  steps: ProgressStep[] | undefined,
  activeStep: number,
  value: number | undefined,
): number => {
  if ((variant === 'stepper' || variant === 'stepper-circle') && steps && steps.length > 0) {
    const totalSteps = steps.length;
    // activeStep начинается с 0, используется напрямую для расчета процента
    // activeStep = 0 -> 0 / 4 * 100 = 0% (соответствует -1 элементу массива)
    // activeStep = 1 -> 1 / 4 * 100 = 25% (соответствует индексу 0 массива)
    // activeStep = 2 -> 2 / 4 * 100 = 50% (соответствует индексу 1 массива)
    // activeStep = 3 -> 3 / 4 * 100 = 75% (соответствует индексу 2 массива)
    // activeStep = 4 -> 4 / 4 * 100 = 100% (соответствует индексу 3 массива)
    const clampedActiveStep = Math.min(Math.max(activeStep, 0), totalSteps);
    return (clampedActiveStep / totalSteps) * 100;
  }
  // Для других вариантов используем переданное value или 0 по умолчанию
  return value ?? 0;
};

/**
 * Определяет статус прогресса автоматически, если не передан явно
 * @param status - явно переданный статус
 * @param isComplete - завершен ли прогресс (100%)
 * @returns вычисленный статус
 */
export const getComputedStatus = (
  status: 'await' | 'loading' | 'success' | 'error' | undefined,
  isComplete: boolean,
): 'await' | 'loading' | 'success' | 'error' => {
  // Если статус передан явно, используем его
  if (status) return status;
  // Если прогресс завершен, возвращаем success
  if (isComplete) return 'success';
  // По умолчанию возвращаем await, а не loading
  // loading должен быть явно указан, чтобы показывать спиннер и анимацию
  return 'await';
};

/**
 * Получает цвет прогресса в зависимости от статуса из темы
 * @param progressColor - явно переданный цвет прогресса
 * @param computedStatus - вычисленный статус
 * @param theme - тема приложения
 * @param explicitStatus - явно переданный статус (для определения, был ли статус указан явно)
 * @returns цвет прогресса
 */
export const getStatusColor = (
  progressColor: string | undefined,
  computedStatus: 'await' | 'loading' | 'success' | 'error',
  theme: DefaultTheme,
  explicitStatus?: 'await' | 'loading' | 'success' | 'error' | undefined,
): string => {
  if (progressColor) return progressColor;
  switch (computedStatus) {
    case 'await':
      // Если статус await был установлен по умолчанию (не передан явно), используем стандартный цвет
      if (explicitStatus === undefined) {
        return theme.progress.colors.fill;
      }
      // Если статус await был передан явно, используем цвет статуса
      return theme.progress.colors.statusAwait;
    case 'loading':
      return theme.progress.colors.statusLoading;
    case 'success':
      return theme.progress.colors.statusSuccess;
    case 'error':
      return theme.progress.colors.statusError;
    default:
      return theme.progress.colors.fill;
  }
};

/**
 * Форматирует значение прогресса для отображения
 * @param value - значение прогресса
 * @param max - максимальное значение
 * @param progress - процент прогресса (0-100)
 * @param formatValue - пользовательская функция форматирования
 * @returns отформатированное значение
 */
export const formatProgressValue = (
  value: number,
  max: number,
  progress: number,
  formatValue?: (value: number, max: number) => React.ReactNode,
): React.ReactNode => {
  if (formatValue) return formatValue(value, max);
  return `${Math.round(progress)}%`;
};

/**
 * Вычисляет радиус круга для кругового прогресса
 * @param circleSize - размер круга
 * @param thickness - толщина обводки
 * @returns радиус круга
 */
export const calculateCircleRadius = (circleSize: number, thickness: number): number => {
  return (circleSize - thickness) / 2;
};

/**
 * Вычисляет длину окружности для кругового прогресса
 * @param radius - радиус круга
 * @returns длина окружности
 */
export const calculateCircleCircumference = (radius: number): number => {
  return 2 * Math.PI * radius;
};

/**
 * Вычисляет смещение для кругового прогресса
 * @param circumference - длина окружности
 * @param progress - процент прогресса (0-100)
 * @returns смещение для stroke-dashoffset
 */
export const calculateCircleOffset = (circumference: number, progress: number): number => {
  // stroke-dashoffset определяет, сколько штриха смещено
  // При progress = 0: offset = circumference (весь штрих смещен, круг не виден)
  // При progress = 100: offset = 0 (штрих не смещен, круг полностью виден)
  // Для SVG круга, повернутого на -90 градусов, используем положительное значение
  // чтобы круг заполнялся по часовой стрелке от верхней точки (12 часов)
  // Формула: offset = circumference - (progress / 100) * circumference
  return circumference - (progress / 100) * circumference;
};

/**
 * Получает информацию о текущем и следующем шаге для степпера
 * @param steps - массив шагов
 * @param activeStep - активный шаг (начинается с 0)
 * @returns объект с текущим и следующим шагом
 */
export const getStepperSteps = (
  steps: ProgressStep[],
  activeStep: number,
): { currentStep: ProgressStep | null; nextStep: ProgressStep | null; totalSteps: number } => {
  const totalSteps = steps.length;
  // activeStep начинается с 0
  // activeStep = 0 -> соответствует -1 элементу массива, следующий шаг = steps[0] ("Далее - название первого шага")
  // activeStep = 1 -> соответствует индексу 0 массива, следующий шаг = steps[1] ("Далее - название второго шага")
  // activeStep = 2 -> соответствует индексу 1 массива, следующий шаг = steps[2] ("Далее - название третьего шага")
  // activeStep = 3 -> соответствует индексу 2 массива, следующий шаг = steps[3] ("Далее - название четвертого шага")
  // activeStep = 4 -> соответствует индексу 3 массива, следующего шага нет
  const nextStep = activeStep < totalSteps ? steps[activeStep] : null;

  // Текущий шаг - это шаг, на котором мы находимся (activeStep - 1)
  // activeStep = 0 -> нет текущего шага (соответствует -1 элементу)
  // activeStep = 1 -> текущий шаг = steps[0]
  // activeStep = 2 -> текущий шаг = steps[1]
  const currentStep = activeStep > 0 && activeStep <= totalSteps ? steps[activeStep - 1] : null;

  return { currentStep, nextStep, totalSteps };
};

/**
 * Получает текст статуса для скринридеров
 * @param status - статус прогресса
 * @returns текст статуса
 */
export const getStatusLabel = (
  status: 'await' | 'loading' | 'success' | 'error',
): string => {
  switch (status) {
    case 'await':
      return 'Ожидание';
    case 'loading':
      return 'Загрузка';
    case 'success':
      return 'Завершено';
    case 'error':
      return 'Ошибка';
    default:
      return 'Загрузка';
  }
};

/**
 * Создает объект с ARIA атрибутами для прогресс-бара
 * @param computedValue - вычисленное значение прогресса
 * @param max - максимальное значение
 * @param label - лейбл прогресса
 * @param info - дополнительная информация
 * @param computedStatus - вычисленный статус
 * @param indeterminate - неопределенный режим
 * @param labelId - ID для лейбла
 * @param descriptionId - ID для описания
 * @returns объект с ARIA атрибутами
 */
export const getAccessibilityProps = (
  computedValue: number,
  max: number,
  label: React.ReactNode | undefined,
  info: { title?: React.ReactNode; value?: React.ReactNode; description?: React.ReactNode } | undefined,
  computedStatus: 'await' | 'loading' | 'success' | 'error',
  indeterminate: boolean | undefined,
  labelId?: string,
  descriptionId?: string,
): React.AriaAttributes => {
  const props: React.AriaAttributes & Record<string, unknown> = {
    role: 'progressbar',
    'aria-valuemin': 0,
    'aria-valuemax': max,
    'aria-live': 'polite',
    'aria-atomic': true,
  };

  if (indeterminate) {
    props['aria-valuenow'] = undefined;
    props['aria-busy'] = true;
  } else {
    props['aria-valuenow'] = Math.round(Math.min(Math.max(computedValue, 0), max));
    props['aria-busy'] = computedStatus === 'loading';
  }

  if (label) {
    if (labelId) {
      props['aria-labelledby'] = labelId;
    } else {
      props['aria-label'] = typeof label === 'string' ? label : getStatusLabel(computedStatus);
    }
  } else {
    props['aria-label'] = getStatusLabel(computedStatus);
  }

  if (info && descriptionId) {
    props['aria-describedby'] = descriptionId;
  }

  return props;
};

/**
 * Форматирует время в читаемый формат
 * @param seconds - время в секундах
 * @returns отформатированное время (например, "2 мин 30 сек")
 */
export const formatEstimatedTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${Math.round(seconds)} сек`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  if (remainingSeconds === 0) {
    return `${minutes} мин`;
  }
  return `${minutes} мин ${remainingSeconds} сек`;
};

/**
 * Получает текст статуса с учетом кастомных лейблов
 * @param status - статус прогресса
 * @param statusLabels - кастомные тексты статусов
 * @returns текст статуса
 */
export const getStatusLabelText = (
  status: 'await' | 'loading' | 'success' | 'error',
  statusLabels?: { await?: string; loading?: string; success?: string; error?: string },
): string => {
  if (statusLabels) {
    switch (status) {
      case 'await':
        return statusLabels.await ?? 'Ожидание';
      case 'loading':
        return statusLabels.loading ?? 'Загрузка';
      case 'success':
        return statusLabels.success ?? 'Завершено';
      case 'error':
        return statusLabels.error ?? 'Ошибка';
    }
  }
  return getStatusLabel(status);
};
