import { coerceTableCellNumericValue } from './coerceTableCellNumericValue';
import { getCachedIntlNumberFormat } from './intlFormatCache';
import {
  TABLE_CELL_FORMAT_DEFAULT_CURRENCY,
  TABLE_CELL_FORMAT_DEFAULT_LOCALE,
} from './presetMasks';

/**
 * Форматирование денежной суммы.
 * @param value — сырое числовое значение
 * @param currency — код ISO 4217 (по умолчанию RUB)
 * @param locale — локаль Intl (по умолчанию ru-RU)
 * @param decimals — знаков после запятой (по умолчанию 2)
 */
export function formatTableCellCurrencyDisplay(
  value: unknown,
  currency: string = TABLE_CELL_FORMAT_DEFAULT_CURRENCY,
  locale: string = TABLE_CELL_FORMAT_DEFAULT_LOCALE,
  decimals: number = 2,
  fallback?: string,
): string | null {
  const numericValue = coerceTableCellNumericValue(value);
  if (numericValue === null) {
    return fallback ?? null;
  }
  try {
    return getCachedIntlNumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(numericValue);
  } catch {
    return fallback ?? String(numericValue);
  }
}
