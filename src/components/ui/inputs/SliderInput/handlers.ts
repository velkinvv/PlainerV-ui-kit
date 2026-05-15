import {
  clampSliderValue,
  formatSliderNumberRu,
  snapSliderToStep,
} from '../../Slider/handlers';
import { normalizeMultiInputToken } from '../MultiInput/handlers';

/**
 * Нормализованная шкала `SliderInput`: целостный min/max/step.
 * @param minProp - Нижняя граница из пропсов.
 * @param maxProp - Верхняя граница из пропсов.
 * @param stepProp - Шаг из пропсов.
 */
export const normalizeSliderInputScale = ({
  minProp,
  maxProp,
  stepProp,
}: {
  minProp: number;
  maxProp: number;
  stepProp: number;
}): { min: number; max: number; step: number } => {
  const min = minProp;
  const max = Math.max(min, maxProp);
  const step = stepProp > 0 ? stepProp : 1;
  return { min, max, step };
};

/**
 * Значение по умолчанию для форматирования подписи (как у `Slider`).
 * @param numberValue - Число на шкале.
 */
export const formatSliderInputValueRuDefault = (numberValue: number): string => {
  return formatSliderNumberRu(numberValue);
};

/**
 * Прижимает сырое число к [min,max] и к шагу.
 * @param raw - Ввод с слайдера или поля.
 * @param min - Минимум.
 * @param max - Максимум.
 * @param step - Шаг.
 */
export const resolveSliderInputSnappedValue = (
  raw: number,
  min: number,
  max: number,
  step: number,
): number => {
  return snapSliderToStep(clampSliderValue(raw, min, max), min, max, step);
};

/**
 * Стартовая строка черновика поля числа.
 * @param valueProp - Контролируемое значение (если есть).
 * @param defaultValue - Дефолт из пропсов.
 * @param min - Минимум.
 * @param max - Максимум.
 * @param step - Шаг.
 */
export const getSliderInputNumericDraftSeed = ({
  valueProp,
  defaultValue,
  min,
  max,
  step,
}: {
  valueProp?: number;
  defaultValue?: number;
  min: number;
  max: number;
  step: number;
}): string => {
  const seedValue = valueProp !== undefined ? valueProp : (defaultValue ?? min);
  return String(resolveSliderInputSnappedValue(seedValue, min, max, step));
};

/**
 * Минимум шкалы после snap (для сброса и сравнения с текущим значением).
 * @param min - Минимум.
 * @param max - Максимум.
 * @param step - Шаг.
 */
export const getSliderInputSnappedMinimum = (min: number, max: number, step: number): number => {
  return resolveSliderInputSnappedValue(min, min, max, step);
};

/**
 * Флаги санитизации ввода в поле числа.
 * @param step - Шаг шкалы.
 * @param min - Минимум (отрицательный min разрешает «-» в черновике).
 */
export const resolveSliderInputNumericSanitizeFlags = (
  step: number,
  min: number,
): { allowDecimal: boolean; allowNegative: boolean } => {
  return {
    allowDecimal: !Number.isInteger(step),
    allowNegative: min < 0,
  };
};

/**
 * Проверяет «незавершённый» черновик, который нельзя парсить в число.
 * @param trimmed - Строка после `normalizeMultiInputToken`.
 */
export const isSliderInputNumericDraftIncomplete = (trimmed: string): boolean => {
  return (
    trimmed === '' ||
    trimmed === '-' ||
    trimmed === '.' ||
    trimmed === '-.' ||
    trimmed === ',' ||
    trimmed === '-,'
  );
};

/**
 * Результат разбора черновика после blur: зафиксировать число или вернуть отображение к committed.
 */
export type SliderInputNumericDraftResolution =
  | { outcome: 'revert' }
  | { outcome: 'commit'; nextValue: number };

/**
 * Решает, что сделать с черновиком числа при фиксации.
 * @param numericDraft - Текущая строка поля.
 */
export const resolveSliderInputNumericDraftOnCommit = (
  numericDraft: string,
): SliderInputNumericDraftResolution => {
  const trimmed = normalizeMultiInputToken(numericDraft);
  if (isSliderInputNumericDraftIncomplete(trimmed)) {
    return { outcome: 'revert' };
  }
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed)) {
    return { outcome: 'revert' };
  }
  return { outcome: 'commit', nextValue: parsed };
};

/** Намерение обработки клавиш бегунка слайдера. */
export type SliderInputThumbKeyboardIntent =
  | { kind: 'none' }
  | { kind: 'toMin' }
  | { kind: 'toMax' }
  | { kind: 'delta'; delta: number };

/**
 * Определяет действие по клавише для `role="slider"`.
 * @param key - `event.key`.
 * @param step - Шаг шкалы.
 */
export const resolveSliderInputThumbKeyboardIntent = (
  key: string,
  step: number,
): SliderInputThumbKeyboardIntent => {
  if (key === 'ArrowLeft' || key === 'ArrowDown') {
    return { kind: 'delta', delta: -step };
  }
  if (key === 'ArrowRight' || key === 'ArrowUp') {
    return { kind: 'delta', delta: step };
  }
  if (key === 'Home') {
    return { kind: 'toMin' };
  }
  if (key === 'End') {
    return { kind: 'toMax' };
  }
  if (key === 'PageDown') {
    return { kind: 'delta', delta: -step * 10 };
  }
  if (key === 'PageUp') {
    return { kind: 'delta', delta: step * 10 };
  }
  return { kind: 'none' };
};

/**
 * Псевдо-значение для `shouldShowInputClearButton`: не пусто, если текущее значение не у минимума.
 * @param value - Текущее значение.
 * @param snappedMinimum - Минимум после snap.
 */
export const getSliderInputClearButtonPseudoValue = (
  value: number,
  snappedMinimum: number,
): string => {
  return value !== snappedMinimum ? '1' : '';
};

/**
 * Видимость счётчика символов под полем (логика как у `Input`).
 * @param displayCharacterCounter - Флаг из пропсов.
 * @param maxLength - maxLength или undefined.
 * @param draftLength - Длина черновика числа.
 * @param visibilityThreshold - Порог из пропсов.
 */
export const shouldShowSliderInputCharacterCounter = ({
  displayCharacterCounter,
  maxLength,
  draftLength,
  visibilityThreshold,
}: {
  displayCharacterCounter: boolean;
  maxLength: number | undefined;
  draftLength: number;
  visibilityThreshold: number;
}): boolean => {
  return Boolean(
    displayCharacterCounter && (maxLength ?? 0) > 0 && draftLength >= visibilityThreshold,
  );
};
