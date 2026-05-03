/**
 * Вспомогательные функции для изменения ширины колонок DataGrid (px).
 */

/** Минимальная ширина колонки при ресайзе, если у колонки не задан `minWidth` */
export const DATA_GRID_COLUMN_RESIZE_FALLBACK_MIN_PX = 64;

/** Верхняя граница ширины при ресайзе, если родитель не передал свой лимит */
export const DATA_GRID_COLUMN_RESIZE_FALLBACK_MAX_PX = 2000;

/**
 * Приводит значение ширины из пропсов колонки к числу пикселей.
 * @param width - `width` колонки или `undefined`
 * @param measuredFallbackPx - ширина ячейки из DOM, если в пропсах нет числа / распознаваемого `px`
 */
export function parseDataGridColumnWidthToPixels(
  width: number | string | undefined,
  measuredFallbackPx: number,
): number {
  if (typeof width === 'number' && Number.isFinite(width)) {
    return Math.max(1, width);
  }
  if (typeof width === 'string') {
    const trimmed = width.trim();
    if (trimmed === '') {
      return Math.max(1, measuredFallbackPx);
    }
    if (trimmed.endsWith('px')) {
      const parsed = Number.parseFloat(trimmed);
      if (Number.isFinite(parsed)) {
        return Math.max(1, parsed);
      }
    }
    // Только «голое» число в строке считаем px; `12rem`, `50%` и т.п. — в измеренную ширину
    if (/^\d*\.?\d+$/.test(trimmed)) {
      const asNumber = Number.parseFloat(trimmed);
      if (Number.isFinite(asNumber)) {
        return Math.max(1, asNumber);
      }
    }
  }
  return Math.max(1, measuredFallbackPx);
}

/**
 * Нижняя граница ширины при перетаскивании разделителя.
 * @param minWidth - `minWidth` колонки или `undefined`
 * @param fallbackMinPx - значение, если распарсить не удалось
 */
export function parseDataGridColumnMinWidthConstraintPx(
  minWidth: number | string | undefined,
  fallbackMinPx: number = DATA_GRID_COLUMN_RESIZE_FALLBACK_MIN_PX,
): number {
  if (typeof minWidth === 'number' && Number.isFinite(minWidth)) {
    return Math.max(1, minWidth);
  }
  if (typeof minWidth === 'string') {
    const trimmed = minWidth.trim();
    if (trimmed.endsWith('px')) {
      const parsed = Number.parseFloat(trimmed);
      if (Number.isFinite(parsed)) {
        return Math.max(1, parsed);
      }
    }
    if (/^\d*\.?\d+$/.test(trimmed)) {
      const asNumber = Number.parseFloat(trimmed);
      if (Number.isFinite(asNumber)) {
        return Math.max(1, asNumber);
      }
    }
  }
  return Math.max(1, fallbackMinPx);
}

/**
 * Ограничивает ширину колонки при ресайзе.
 * @param widthPx - желаемая ширина в пикселях
 * @param minPx - минимум
 * @param maxPx - максимум
 */
export function clampDataGridColumnResizeWidthPx(widthPx: number, minPx: number, maxPx: number): number {
  const low = Math.min(minPx, maxPx);
  const high = Math.max(minPx, maxPx);
  return Math.min(high, Math.max(low, widthPx));
}
