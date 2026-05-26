import type { ThemeType } from '../types/theme';
import type { ThemeOverride } from '../types/themeOverride';

/**
 * Проверяет, что значение — обычный объект для глубокого слияния
 * (не массив, не `null`, не примитив).
 */
function isMergeableObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Рекурсивно сливает `themeOverride` в `baseTheme`.
 * Поля из переопределения заменяют базовые; вложенные объекты сливаются рекурсивно.
 * Ключи со значением `undefined` в переопределении игнорируются — остаётся значение из базы.
 *
 * @param baseTheme — стандартная тема библиотеки (`lightTheme` / `darkTheme`)
 * @param themeOverride — частичная кастомная тема пользователя
 * @returns полная тема с подставленными недостающими токенами из `baseTheme`
 */
export function mergeTheme(baseTheme: ThemeType, themeOverride: ThemeOverride): ThemeType {
  return deepMergeRecord(baseTheme, themeOverride) as ThemeType;
}

function deepMergeRecord<Base extends Record<string, unknown>>(
  base: Base,
  override: Record<string, unknown> | undefined,
): Base {
  if (override === undefined) {
    return base;
  }

  const merged = { ...base };

  for (const key of Object.keys(override)) {
    const overrideValue = override[key];

    if (overrideValue === undefined) {
      continue;
    }

    const baseValue = base[key];

    if (isMergeableObject(baseValue) && isMergeableObject(overrideValue)) {
      merged[key as keyof Base] = deepMergeRecord(baseValue, overrideValue) as Base[keyof Base];
      continue;
    }

    merged[key as keyof Base] = overrideValue as Base[keyof Base];
  }

  return merged;
}
