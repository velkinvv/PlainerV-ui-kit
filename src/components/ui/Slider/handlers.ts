import { Size } from '../../../types/sizes';

/** Акцент трека и бегунка (согласован с `status` / `error` / `success` у полей) */
export type SliderAccentKind = 'default' | 'error' | 'success' | 'warning';

/**
 * Итоговый визуальный акцент: сначала текст ошибки и `success`, затем явный `status`.
 *
 * @param error - Сообщение об ошибке
 * @param success - Успех
 * @param status - Явный статус рамки/цвета
 */
export const resolveSliderAccentKind = (
  error?: string,
  success?: boolean,
  status?: 'error' | 'success' | 'warning',
): SliderAccentKind => {
  if (error != null && String(error).length > 0) {
    return 'error';
  }
  if (success === true) {
    return 'success';
  }
  if (status === 'error' || status === 'success' || status === 'warning') {
    return status;
  }
  return 'default';
};

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
 * Учитывает «внутреннюю» ширину трека без половинок бегунка по краям (иначе обрезание на min/max).
 *
 * @param clientX - Координата указателя
 * @param rect - `getBoundingClientRect()` обёртки трека (`SliderTrackWrap`)
 * @param min - Минимум
 * @param max - Максимум
 * @param step - Шаг
 * @param thumbSizePx - Диаметр бегунка; при 0 — прежняя модель на всю ширину rect (обратная совместимость)
 */
export const clientXToSliderValue = (
  clientX: number,
  rect: DOMRect,
  min: number,
  max: number,
  step: number,
  thumbSizePx = 0,
): number => {
  const innerWidth = Math.max(0, rect.width - thumbSizePx);
  const inset = thumbSizePx > 0 ? thumbSizePx / 2 : 0;
  const ratio = innerWidth > 0 ? (clientX - rect.left - inset) / innerWidth : 0;
  const clampedRatio = clampSliderValue(ratio, 0, 1);
  const raw = min + clampedRatio * (max - min);
  return snapSliderToStep(raw, min, max, step);
};

/**
 * CSS `left` для бегунка / подписи: центр по «внутреннему» треку (без обрезания круга у границ).
 * @param thumbPx - Диаметр бегунка в px
 * @param percentZeroToHundred - Доля 0–100 (как у `valueToPercent`)
 */
export const sliderThumbLeftCalcCss = (thumbPx: number, percentZeroToHundred: number): string => {
  const inset = thumbPx / 2;
  return `calc(${inset}px + (100% - ${thumbPx}px) * ${percentZeroToHundred} / 100)`;
};

/**
 * Горизонтальный отступ у корня слайдера, когда показаны подписи значений под бегунком:
 * центр текста совпадает с бегунком (`translateX(-50%)`), у min/max половина строки выходит
 * за «внутренний» трек — без полей обрезается у узких контейнеров.
 *
 * @param thumbPx - Диаметр бегунка (px)
 */
export const getSliderValueLabelRootPaddingHorizontalPx = (thumbPx: number): number => {
  const halfThumb = Math.round(thumbPx / 2);
  return Math.max(halfThumb, 24);
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
 * Диаметр бегунка в px по размеру компонента (возрастает от XS к XL, шаг 4px).
 * @param size - Размер из дизайн-системы
 */
export const getSliderThumbSizePx = (size: Size = Size.MD): number => {
  switch (size) {
    case Size.XS:
      return 12;
    case Size.SM:
      return 16;
    case Size.MD:
      return 20;
    case Size.LG:
      return 24;
    case Size.XL:
      return 28;
    default:
      return 20;
  }
};

/** Геометрия линий трека (серая / синяя), зоны клика и высоты обёртки — согласованы с `Size` и бегунком */
export type SliderTrackMetrics = {
  /** Высота серой «рельсы» (px) */
  railHeightPx: number;
  /** Высота активного сегмента (px), не меньше рельсы */
  activeHeightPx: number;
  /** Высота невидимой зоны попадания для drag/tap (px) */
  hitHeightPx: number;
  /** Высота блока `SliderTrackWrap` (px) */
  trackWrapHeightPx: number;
};

/**
 * Толщина полосок трека и высота обёртки по размеру компонента (XS → тоньше, XL → толще).
 * @param size - Размер из дизайн-системы
 */
export const getSliderTrackMetrics = (size: Size = Size.MD): SliderTrackMetrics => {
  switch (size) {
    case Size.XS:
      return { railHeightPx: 2, activeHeightPx: 3, hitHeightPx: 20, trackWrapHeightPx: 28 };
    case Size.SM:
      return { railHeightPx: 3, activeHeightPx: 4, hitHeightPx: 22, trackWrapHeightPx: 30 };
    case Size.MD:
      return { railHeightPx: 4, activeHeightPx: 6, hitHeightPx: 24, trackWrapHeightPx: 32 };
    case Size.LG:
      return { railHeightPx: 5, activeHeightPx: 7, hitHeightPx: 28, trackWrapHeightPx: 36 };
    case Size.XL:
      return { railHeightPx: 6, activeHeightPx: 8, hitHeightPx: 32, trackWrapHeightPx: 40 };
    default:
      return getSliderTrackMetrics(Size.MD);
  }
};

export type SliderTrackMetricsOverrides = {
  /** Явная высота серой линии (px) */
  trackRailHeightPx?: number;
  /** Явная высота синего сегмента (px) */
  trackActiveHeightPx?: number;
};

/**
 * Итоговые метрики трека: шкала по `size` либо переопределение толщины полосок.
 *
 * @param size - Базовый размер
 * @param overrides - Необязательные `trackRailHeightPx` / `trackActiveHeightPx`
 */
export const resolveSliderTrackMetrics = (
  size: Size = Size.MD,
  overrides?: SliderTrackMetricsOverrides,
): SliderTrackMetrics => {
  const base = getSliderTrackMetrics(size);
  const thumbPx = getSliderThumbSizePx(size);
  const railOver = overrides?.trackRailHeightPx;
  const activeOver = overrides?.trackActiveHeightPx;
  if (railOver == null && activeOver == null) {
    return base;
  }
  const rail = Math.max(1, Math.round(railOver ?? base.railHeightPx));
  let active: number;
  if (activeOver != null) {
    active = Math.max(rail, Math.round(activeOver));
  } else if (railOver != null) {
    active = Math.max(base.activeHeightPx, rail + 1);
  } else {
    active = base.activeHeightPx;
  }
  const hit = Math.max(base.hitHeightPx, Math.round(active * 3), 20);
  const wrap = Math.max(base.trackWrapHeightPx, thumbPx + 8, hit);
  return {
    railHeightPx: rail,
    activeHeightPx: active,
    hitHeightPx: hit,
    trackWrapHeightPx: wrap,
  };
};

/**
 * Упорядочивает пару [low, high] в границах шкалы.
 * @param a - Первое число
 * @param b - Второе число
 * @param min - Минимум шкалы
 * @param max - Максимум шкалы
 */
export const sortAndClampRange = (
  a: number,
  b: number,
  min: number,
  max: number,
): [number, number] => {
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
  thumbSizePx = 0,
): 0 | 1 => {
  const clickVal = clientXToSliderValue(clientX, rect, min, max, step, thumbSizePx);
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
