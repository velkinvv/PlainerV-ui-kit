/**
 * Приводит ширину для анимации Framer Motion к числу (px).
 * Строки вида `72px` парсятся; иначе возвращается fallback.
 *
 * @param width — число или css-строка
 * @param fallbackPx — значение по умолчанию в пикселях
 */
export function coerceWidthForMotion(
  width: number | string | undefined,
  fallbackPx: number,
): number {
  if (typeof width === 'number' && !Number.isNaN(width)) {
    return width;
  }
  if (typeof width === 'string') {
    const trimmed = width.trim();
    const pxMatch = trimmed.match(/^([\d.]+)px$/i);
    if (pxMatch?.[1]) {
      return parseFloat(pxMatch[1]);
    }
  }
  return fallbackPx;
}
