import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import { parseDate, formatDateForDisplay } from '../dateHandlers';

dayjs.extend(customParseFormat);

/**
 * Преобразует значение ячейки в `Date` для последующего форматирования.
 */
export function parseTableCellDateInput(value: unknown): Date | null {
  if (value instanceof Date) {
    return value;
  }
  const parsed = parseDate(value as string | number | Date | null | undefined);
  return parsed.isValid ? parsed.date : null;
}

/**
 * Форматирование даты/времени через dayjs (локаль совпадает с настройками dateHandlers).
 * @param pattern — шаблон dayjs, например `DD.MM.YYYY HH:mm`
 */
export function formatTableCellDayjsDisplay(
  value: unknown,
  pattern: string,
  fallback?: string,
): string | null {
  const dateValue = parseTableCellDateInput(value);
  if (!dateValue) {
    if (typeof value === 'string' && value.trim() !== '') {
      const guessedTime = dayjs(value.trim(), ['HH:mm', 'H:mm', 'HH:mm:ss', 'H:mm:ss'], true);
      if (guessedTime.isValid()) {
        return guessedTime.format(pattern);
      }
    }
    return fallback ?? null;
  }
  const formatted = formatDateForDisplay(dateValue, pattern);
  return formatted !== '' ? formatted : (fallback ?? null);
}
