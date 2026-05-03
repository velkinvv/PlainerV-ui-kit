/**
 * Ограничение числа строк в заголовках таблицы (`line-clamp`).
 */

/** Практический потолок для `-webkit-line-clamp` (CSS и UX) */
export const TABLE_HEADER_MAX_LINES_CAP = 20;

/**
 * Приводит значение «максимум строк заголовка» к допустимому целому или `undefined`.
 * @param raw - число из пропсов (`headerMaxLines` / `maxLines`)
 * @returns целое от 1 до `TABLE_HEADER_MAX_LINES_CAP`, иначе `undefined` (режим по умолчанию — одна строка без переноса)
 */
export function normalizeTableHeaderMaxLines(raw: number | undefined): number | undefined {
  if (raw == null || !Number.isFinite(raw)) {
    return undefined;
  }
  const rounded = Math.floor(raw);
  if (rounded < 1) {
    return undefined;
  }
  return Math.min(rounded, TABLE_HEADER_MAX_LINES_CAP);
}
