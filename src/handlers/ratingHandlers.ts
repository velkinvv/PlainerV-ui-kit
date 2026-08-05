/**
 * Ограничивает значение рейтинга диапазоном [0, max] либо возвращает null.
 * @param value — текущее значение или null
 * @param max — верхняя граница шкалы (> 0)
 */
export function clampRatingValue(value: number | null, max: number): number | null {
  if (value == null) {
    return null;
  }
  if (max <= 0) {
    return 0;
  }
  return Math.min(max, Math.max(0, value));
}

/**
 * Округляет значение к ближайшему шагу precision.
 * @param value — число
 * @param precision — шаг (> 0), например 0.5 или 1
 */
export function roundToPrecision(value: number, precision: number): number {
  const safePrecision = precision > 0 ? precision : 1;
  const rounded = Math.round(value / safePrecision) * safePrecision;
  // убираем артефакты float (2.3000000004)
  return Number(rounded.toFixed(6));
}

/**
 * Доля заполнения бара в процентах 0–100.
 * @param value — рейтинг или null
 * @param max — максимум шкалы
 */
export function ratingValueToPercent(value: number | null, max: number): number {
  if (value == null || max <= 0) {
    return 0;
  }
  return Math.min(100, Math.max(0, (value / max) * 100));
}

/**
 * Линейная интерполяция цвета по stops (hex).
 * @param ratio — доля 0..1
 * @param _scaleMode — 'default' | 'traffic' (stops задаёт вызывающий)
 * @param colorStops — массив hex-цветов
 */
export function resolveRatingScaleColor(
  ratio: number,
  _scaleMode: 'default' | 'traffic' | string,
  colorStops: string[],
): string {
  const stops = colorStops.length > 0 ? colorStops : ['#999999'];
  if (stops.length === 1) {
    return stops[0];
  }
  const clampedRatio = Math.min(1, Math.max(0, ratio));
  const segmentCount = stops.length - 1;
  const scaled = clampedRatio * segmentCount;
  const segmentIndex = Math.min(segmentCount - 1, Math.floor(scaled));
  const localRatio = scaled - segmentIndex;
  return mixHexColors(stops[segmentIndex], stops[segmentIndex + 1], localRatio);
}

/**
 * Смешивает два hex-цвета.
 * @param fromColor — начальный цвет
 * @param toColor — конечный цвет
 * @param amount — доля 0..1
 */
function mixHexColors(fromColor: string, toColor: string, amount: number): string {
  const fromRgb = hexToRgb(fromColor);
  const toRgb = hexToRgb(toColor);
  if (fromRgb == null || toRgb == null) {
    return toColor;
  }
  const red = Math.round(fromRgb.red + (toRgb.red - fromRgb.red) * amount);
  const green = Math.round(fromRgb.green + (toRgb.green - fromRgb.green) * amount);
  const blue = Math.round(fromRgb.blue + (toRgb.blue - fromRgb.blue) * amount);
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

/**
 * Парсит hex (#RGB или #RRGGBB) в каналы RGB.
 * @param hexColor — строка цвета
 */
function hexToRgb(hexColor: string): { red: number; green: number; blue: number } | null {
  const normalized = hexColor.replace('#', '').trim();
  let fullHex = normalized;
  if (normalized.length === 3) {
    fullHex = normalized
      .split('')
      .map((channel) => `${channel}${channel}`)
      .join('');
  }
  if (fullHex.length !== 6) {
    return null;
  }
  return {
    red: parseInt(fullHex.slice(0, 2), 16),
    green: parseInt(fullHex.slice(2, 4), 16),
    blue: parseInt(fullHex.slice(4, 6), 16),
  };
}

/**
 * Канал 0–255 → двухсимвольный hex.
 * @param channel — значение канала
 */
function toHex(channel: number): string {
  return Math.min(255, Math.max(0, channel)).toString(16).padStart(2, '0');
}

/**
 * Шаги значений для radio/клика: precision..max.
 * @param max — верх шкалы
 * @param precision — шаг
 */
export function getInteractiveRatingSteps(max: number, precision: number): number[] {
  const safePrecision = precision > 0 ? precision : 1;
  const steps: number[] = [];
  for (let stepValue = safePrecision; stepValue <= max + 1e-9; stepValue += safePrecision) {
    steps.push(Number(stepValue.toFixed(6)));
  }
  return steps;
}

/**
 * Подпись значения рейтинга по умолчанию (русский).
 * @param value — числовое значение шага
 */
export function defaultGetRatingLabelText(value: number): string {
  const rounded = Number.isInteger(value) ? String(value) : String(value);
  if (value === 1) {
    return `${rounded} балл`;
  }
  if (value >= 2 && value <= 4 && Number.isInteger(value)) {
    return `${rounded} балла`;
  }
  return `${rounded} баллов`;
}

/**
 * Значение по позиции указателя на треке бара.
 * @param clientX — clientX события
 * @param trackRect — getBoundingClientRect трека
 * @param max — максимум
 * @param precision — шаг
 */
export function ratingValueFromTrackPointer(
  clientX: number,
  trackRect: { left: number; width: number },
  max: number,
  precision: number,
): number {
  if (trackRect.width <= 0) {
    return 0;
  }
  const ratio = (clientX - trackRect.left) / trackRect.width;
  const rawValue = Math.min(1, Math.max(0, ratio)) * max;
  return clampRatingValue(roundToPrecision(rawValue, precision), max) ?? 0;
}

/**
 * Доля заполнения одного слота иконки (0..1) для partial fill.
 * @param displayValue — отображаемое значение (с учётом hover)
 * @param slotIndex — 1-based индекс слота
 */
export function getRatingIconSlotFill(displayValue: number | null, slotIndex: number): number {
  if (displayValue == null) {
    return 0;
  }
  return Math.min(1, Math.max(0, displayValue - (slotIndex - 1)));
}
