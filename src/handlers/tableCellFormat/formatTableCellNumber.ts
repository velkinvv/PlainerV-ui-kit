import { coerceTableCellNumericValue } from './coerceTableCellNumericValue';
import { getCachedIntlNumberFormat } from './intlFormatCache';
import { TABLE_CELL_FORMAT_DEFAULT_LOCALE } from './presetMasks';

/**
 * Строковое представление числа через Intl.
 * @param value — сырое значение ячейки
 * @param locale — локаль (по умолчанию `ru-RU`)
 * @param decimals — точность; если не задано — целые без принудительных дробных знаков
 * @param fallback — текст при ошибке парсинга
 */
export function formatTableCellNumberDisplay(
  value: unknown,
  locale: string = TABLE_CELL_FORMAT_DEFAULT_LOCALE,
  decimals?: number,
  fallback?: string,
): string | null {
  const numericValue = coerceTableCellNumericValue(value);
  if (numericValue === null) {
    return fallback ?? null;
  }

  const options: Intl.NumberFormatOptions =
    decimals != null
      ? {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }
      : {
          maximumFractionDigits: 20,
        };

  try {
    return getCachedIntlNumberFormat(locale, options).format(numericValue);
  } catch {
    return fallback ?? String(numericValue);
  }
}
