import { Size } from '../../../types/sizes';

/**
 * Ограничивает число интервалом [min, max].
 * @param value - Значение
 * @param min - Нижняя граница
 * @param max - Верхняя граница
 */
export const clampSliderValue = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, value));
};

/**
 * Привязка к шагу относительно min (как у `input[type=range]`).
 * @param value - Значение
 * @param min - Минимум шкалы
 * @param max - Максимум шкалы
 * @param step - Шаг (> 0)
 */
export const snapSliderToStep = (value: number, min: number, max: number, step: number): number => {
  if (!Number.isFinite(step) || step <= 0) {
    return clampSliderValue(value, min, max);
  }
  const snapped = min + Math.round((value - min) / step) * step;
  // Убираем артефакты float
  const rounded = Number.parseFloat(snapped.toPrecision(12));
  return clampSliderValue(rounded, min, max);
};

/**
 * Доля позиции на треке 0–100.
 * @param value - Текущее значение
 * @param min - Минимум
 * @param max - Максимум
 */
export const valueToPercent = (value: number, min: number, max: number): number => {
  if (max <= min) {
    return 0;
  }
  return clampSliderValue(((value - min) / (max - min)) * 100, 0, 100);
};

/**
 * Значение по горизонтали клика на треке.
 * @param clientX - Координата указателя
 * @param rect - `getBoundingClientRect()` трека
 * @param min - Минимум
 * @param max - Максимум
 * @param step - Шаг
 */
export const clientXToSliderValue = (
  clientX: number,
  rect: DOMRect,
  min: number,
  max: number,
  step: number,
): number => {
  const ratio = rect.width > 0 ? (clientX - rect.left) / rect.width : 0;
  const raw = min + ratio * (max - min);
  return snapSliderToStep(raw, min, max, step);
};

/**
 * Форматирование числа для подписей (пробелы как разделители тысяч).
 * @param n - Число
 */
export const formatSliderNumberRu = (n: number): string => {
  if (!Number.isFinite(n)) {
    return '';
  }
  return new Intl.NumberFormat('ru-RU').format(Math.round(n));
};

/**
 * Диаметр бегунка в px по размеру компонента.
 * @param size - Размер из дизайн-системы
 */
export const getSliderThumbSizePx = (size: Size = Size.MD): number => {
  switch (size) {
    case Size.SM:
      return 16;
    case Size.LG:
      return 24;
    case Size.XS:
    case Size.MD:
    case Size.XL:
    default:
      return 20;
  }
};

/**
 * Упорядочивает пару [low, high] в границах шкалы.
 * @param a - Первое число
 * @param b - Второе число
 * @param min - Минимум шкалы
 * @param max - Максимум шкалы
 */
export const sortAndClampRange = (a: number, b: number, min: number, max: number): [number, number] => {
  const low = clampSliderValue(Math.min(a, b), min, max);
  const high = clampSliderValue(Math.max(a, b), min, max);
  return low <= high ? [low, high] : [high, low];
};

/**
 * Обновляет пару после движения одного из бегунков.
 * @param thumbIndex - 0 — нижний бегунок, 1 — верхний
 * @param newVal - Новое значение (сырое, будет clamp + step)
 * @param low - Текущий нижний
 * @param high - Текущий верхний
 * @param min / max / step - Шкала
 */
export const mergeRangeAfterThumbMove = (
  thumbIndex: 0 | 1,
  newVal: number,
  low: number,
  high: number,
  min: number,
  max: number,
  step: number,
): [number, number] => {
  const s = snapSliderToStep(clampSliderValue(newVal, min, max), min, max, step);
  if (thumbIndex === 0) {
    const nextLow = Math.min(s, high);
    return sortAndClampRange(nextLow, high, min, max);
  }
  const nextHigh = Math.max(s, low);
  return sortAndClampRange(low, nextHigh, min, max);
};

/**
 * Какой бегунок ближе к точке клика на треке.
 * @param clientX - Координата X
 * @param rect - Прямоугольник трека
 * @param low / high - Текущие значения
 * @param min / max / step - Шкала
 */
export const pickCloserThumbIndex = (
  clientX: number,
  rect: DOMRect,
  low: number,
  high: number,
  min: number,
  max: number,
  step: number,
): 0 | 1 => {
  const clickVal = clientXToSliderValue(clientX, rect, min, max, step);
  const d0 = Math.abs(clickVal - low);
  const d1 = Math.abs(clickVal - high);
  return d0 <= d1 ? 0 : 1;
};

/**
 * Разбор строки поля ввода (цифры, минус, пробелы как разделители).
 * @param raw - Строка из инпута
 * @returns Число или `null`, если ввод пустой / невалидный
 */
export const parseManualSliderNumber = (raw: string): number | null => {
  const cleaned = raw?.replace(/\s/g, '').replace(/[^\d-]/g, '') ?? '';
  if (cleaned === '' || cleaned === '-') {
    return null;
  }
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
};
