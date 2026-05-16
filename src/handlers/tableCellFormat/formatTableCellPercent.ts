import { coerceTableCellNumericValue } from './coerceTableCellNumericValue';
import { getCachedIntlNumberFormat } from './intlFormatCache';
import { TABLE_CELL_FORMAT_DEFAULT_LOCALE } from './presetMasks';

/**
 * Отображение процентов.
 * @param value — число; при `fromFraction === true` ожидается доля (0.25 → 25 %)
 * @param fromFraction — трактовать как долю
 */
export function formatTableCellPercentDisplay(
  value: unknown,
  locale: string = TABLE_CELL_FORMAT_DEFAULT_LOCALE,
  decimals: number = 0,
  fromFraction: boolean = true,
  fallback?: string,
): string | null {
  const numericValue = coerceTableCellNumericValue(value);
  if (numericValue === null) {
    return fallback ?? null;
  }

  const ratio = fromFraction ? numericValue * 100 : numericValue;

  try {
    const formatted = getCachedIntlNumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(ratio);
    return `${formatted}\u00A0%`;
  } catch {
    return fallback ?? `${ratio}\u00A0%`;
  }
}
