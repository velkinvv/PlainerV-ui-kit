/**
 * Приводит значение ячейки к числу для форматирования.
 * @param value — число, строка с пробелами и десятичной запятой/точкой
 */
export function coerceTableCellNumericValue(value: unknown): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value === 'boolean') {
    return value ? 1 : 0;
  }
  if (typeof value === 'string') {
    const normalized = value.replace(/\s/g, '').replace(',', '.');
    if (normalized === '') {
      return null;
    }
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}
