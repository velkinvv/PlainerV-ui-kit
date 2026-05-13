import type { StepperAppearance } from '../../../types/ui';
import { ThemeMode } from '../../../types/theme';

/**
 * Итоговый вид панели: из пропа или из режима темы приложения.
 * @param appearance - Явный `light` / `dark` или `undefined`.
 * @param themeMode - `ThemeMode` из `ThemeProvider`.
 * @returns Нормализованный `light` | `dark`.
 */
export const resolveStepperAppearance = (
  appearance: StepperAppearance | undefined,
  themeMode: ThemeMode,
): StepperAppearance => {
  if (appearance === 'light' || appearance === 'dark') {
    return appearance;
  }
  return themeMode === ThemeMode.DARK ? 'dark' : 'light';
};

/**
 * Ограничивает индекс шага диапазоном массива.
 * @param index - Индекс активного шага.
 * @param length - Число шагов.
 * @returns Индекс от 0 до `length - 1` (при `length === 0` вернёт 0).
 */
export const clampStepperActiveIndex = (index: number, length: number): number => {
  if (length <= 0) {
    return 0;
  }
  return Math.max(0, Math.min(index, length - 1));
};

/**
 * Доля заполнения кольца (compact): `currentStep / totalSteps`, шаги считаются с 1.
 * @param currentStep - Текущий шаг (≥ 1).
 * @param totalSteps - Всего шагов (≥ 1).
 * @returns Дробь от 0 до 1.
 */
export const getCompactRingProgressFraction = (currentStep: number, totalSteps: number): number => {
  if (totalSteps <= 0) {
    return 0;
  }
  const clampedStep = Math.max(1, Math.min(currentStep, totalSteps));
  return clampedStep / totalSteps;
};

/**
 * Смещение штриха SVG для дуги прогресса (`stroke-dashoffset`).
 * @param circumference - Длина окружности `2 * π * r`.
 * @param progressFraction - Доля от 0 до 1.
 * @returns Значение для `strokeDashoffset`.
 */
export const getCircleProgressStrokeDashoffset = (
  circumference: number,
  progressFraction: number,
): number => {
  const f = Math.min(1, Math.max(0, progressFraction));
  return circumference * (1 - f);
};

/**
 * Текст счётчика в компактном кольце («1/3»).
 * @param currentStep - Текущий шаг, с 1.
 * @param totalSteps - Всего шагов.
 * @returns Строка для центра кольца.
 */
export const formatStepperCounterLabel = (currentStep: number, totalSteps: number): string => {
  const total = Math.max(1, totalSteps);
  const current = Math.max(1, Math.min(currentStep, total));
  return `${current}/${total}`;
};

/** Визуальное состояние кружка в линейном степпере */
export type StepperLinearCircleVisual = 'filled' | 'outline';

/**
 * Состояние кружка шага в линейном варианте.
 * @param stepIndex - Индекс шага, с 0.
 * @param activeStepIndex - Активный шаг, с 0 (уже ограниченный).
 * @returns `filled` для пройденных и активного, `outline` для будущих.
 */
export const getLinearStepCircleVisual = (
  stepIndex: number,
  activeStepIndex: number,
): StepperLinearCircleVisual => {
  return stepIndex <= activeStepIndex ? 'filled' : 'outline';
};

/**
 * Линия между шагами считается «пройденной», если заканчивается до активного.
 * @param segmentStartIndex - Индекс шага слева от соединителя.
 * @param activeStepIndex - Активный шаг.
 */
export const isLinearConnectorCompleted = (
  segmentStartIndex: number,
  activeStepIndex: number,
): boolean => {
  return segmentStartIndex < activeStepIndex;
};
