import type { DropdownMenuItemProps, SearchFormat } from '../types/ui';

/**
 * Текстовые поля пункта меню в нижнем регистре для встроенного поиска (как в `Dropdown`).
 * @param item - Пункт меню (`label`, `description`).
 */
export const getDropdownItemSearchHaystackParts = (
  item: Pick<DropdownMenuItemProps, 'label' | 'description'>,
): { labelLower: string; descriptionLower: string } => {
  const descriptionLower =
    typeof item.description === 'string' ? item.description.toLowerCase() : '';
  let labelLower = '';
  if (typeof item.label === 'string') {
    labelLower = item.label.toLowerCase();
  } else if (typeof item.label === 'number') {
    labelLower = String(item.label).toLowerCase();
  }
  return { labelLower, descriptionLower };
};

/**
 * Встроенное сравнение строки поиска с `label` / `description` пункта (если не задан `searchFilter`).
 * @param rawQuery - Строка из поля поиска.
 * @param format - `wholly` — вся строка запроса (после trim) как одна подстрока; `word` — каждое слово по пробелам должно встречаться в объединённом тексте пункта.
 * @param parts - `label` и `description` в нижнем регистре.
 * @returns `true`, если пункт проходит фильтр.
 */
export const defaultDropdownSearchMatches = (
  rawQuery: string,
  format: SearchFormat | undefined,
  parts: { labelLower: string; descriptionLower: string },
): boolean => {
  const normalized = rawQuery.trim().toLowerCase();
  if (!normalized) {
    return true;
  }
  const mode = format ?? 'wholly';
  if (mode === 'wholly') {
    const descriptionMatches = parts.descriptionLower.includes(normalized);
    if (parts.labelLower.length > 0) {
      return parts.labelLower.includes(normalized) || descriptionMatches;
    }
    return descriptionMatches;
  }
  const tokens = normalized.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) {
    return true;
  }
  const combined = `${parts.labelLower} ${parts.descriptionLower}`.trim();
  return tokens.every((t) => combined.includes(t));
};
