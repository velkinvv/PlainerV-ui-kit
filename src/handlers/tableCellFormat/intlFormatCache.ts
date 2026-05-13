/**
 * Кэш экземпляров Intl, чтобы не создавать форматтеры на каждый вызов (react-doctor/js-hoist-intl).
 */
const numberFormatCache = new Map<string, Intl.NumberFormat>();

/**
 * Ключ кэша для Intl.NumberFormat (локаль + сериализованные опции).
 * @param locale — BCP 47
 * @param options — опции конструктора
 */
function buildNumberFormatCacheKey(locale: string, options: Intl.NumberFormatOptions): string {
  return `${locale}:${JSON.stringify(options)}`;
}

/**
 * Возвращает закэшированный `Intl.NumberFormat`.
 * @param locale — BCP 47
 * @param options — опции форматирования
 */
export function getCachedIntlNumberFormat(
  locale: string,
  options: Intl.NumberFormatOptions,
): Intl.NumberFormat {
  const cacheKey = buildNumberFormatCacheKey(locale, options);
  const existingFormatter = numberFormatCache.get(cacheKey);
  if (existingFormatter != null) {
    return existingFormatter;
  }
  const createdFormatter = new Intl.NumberFormat(locale, options);
  numberFormatCache.set(cacheKey, createdFormatter);
  return createdFormatter;
}
