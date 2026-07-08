import {
  ThemeColorScheme,
  ThemeMode,
  ThemeVariant,
  type BuiltinThemeMode,
} from '../types/theme';

/** Ключ localStorage для варианта оформления (standard / glass / kidsBoys / …). */
export const THEME_VARIANT_STORAGE_KEY = 'plainerv-theme-variant';

/** Ключ localStorage для цветовой схемы (light / dark). */
export const COLOR_SCHEME_STORAGE_KEY = 'plainerv-color-scheme';

/**
 * Оси выбора темы: вариант оформления + палитра.
 * @property variant — визуальный вариант; `undefined` для кастомных тем каталога
 * @property colorScheme — светлая или тёмная палитра
 * @property themeMode — итоговый id темы в каталоге
 */
export type ThemeAxes = {
  variant?: ThemeVariant;
  colorScheme: ThemeColorScheme;
  themeMode: string;
};

/** Человекочитаемые подписи встроенных вариантов оформления. */
export const themeVariantLabels: Record<ThemeVariant, string> = {
  [ThemeVariant.standard]: 'Стандартная',
  [ThemeVariant.glass]: 'Стеклянная',
  [ThemeVariant.kidsBoys]: 'Детская (мальчики)',
  [ThemeVariant.kidsGirls]: 'Детская (девочки)',
};

/**
 * Нормализует legacy variant `kids` → `kidsBoys`.
 * @param value — сырое значение из localStorage или пропсов
 */
export function normalizeThemeVariant(value: unknown): ThemeVariant | undefined {
  if (value === ThemeVariant.kids || value === 'kids') {
    return ThemeVariant.kidsBoys;
  }

  if (isThemeVariant(value)) {
    return value;
  }

  return undefined;
}

/**
 * Собирает id встроенной темы из варианта оформления и палитры.
 * @param variant — standard, glass, kidsBoys или kidsGirls
 * @param colorScheme — светлая или тёмная палитра
 */
export function resolveBuiltinThemeMode(
  variant: ThemeVariant,
  colorScheme: ThemeColorScheme,
): BuiltinThemeMode {
  const normalizedVariant = normalizeThemeVariant(variant) ?? ThemeVariant.standard;

  if (normalizedVariant === ThemeVariant.glass) {
    return colorScheme === ThemeColorScheme.DARK ? ThemeMode.glassDark : ThemeMode.glassLight;
  }

  if (normalizedVariant === ThemeVariant.kidsGirls) {
    return colorScheme === ThemeColorScheme.DARK ? ThemeMode.kidsGirlsDark : ThemeMode.kidsGirlsLight;
  }

  if (normalizedVariant === ThemeVariant.kidsBoys) {
    return colorScheme === ThemeColorScheme.DARK ? ThemeMode.kidsBoysDark : ThemeMode.kidsBoysLight;
  }

  return colorScheme === ThemeColorScheme.DARK ? ThemeMode.dark : ThemeMode.light;
}

/**
 * Разбирает id темы на вариант оформления и палитру.
 * @param themeMode — id темы из каталога
 * @param fallbackColorScheme — палитра из каталога, если id не встроенный
 */
export function parseThemeModeToAxes(
  themeMode: string,
  fallbackColorScheme: ThemeColorScheme = ThemeColorScheme.LIGHT,
): Pick<ThemeAxes, 'variant' | 'colorScheme'> {
  if (themeMode === ThemeMode.glassLight || themeMode === ThemeMode.glass) {
    return { variant: ThemeVariant.glass, colorScheme: ThemeColorScheme.LIGHT };
  }

  if (themeMode === ThemeMode.glassDark) {
    return { variant: ThemeVariant.glass, colorScheme: ThemeColorScheme.DARK };
  }

  if (themeMode === ThemeMode.kidsBoysLight || themeMode === ThemeMode.kidsLight) {
    return { variant: ThemeVariant.kidsBoys, colorScheme: ThemeColorScheme.LIGHT };
  }

  if (themeMode === ThemeMode.kidsBoysDark || themeMode === ThemeMode.kidsDark) {
    return { variant: ThemeVariant.kidsBoys, colorScheme: ThemeColorScheme.DARK };
  }

  if (themeMode === ThemeMode.kidsGirlsLight) {
    return { variant: ThemeVariant.kidsGirls, colorScheme: ThemeColorScheme.LIGHT };
  }

  if (themeMode === ThemeMode.kidsGirlsDark) {
    return { variant: ThemeVariant.kidsGirls, colorScheme: ThemeColorScheme.DARK };
  }

  if (themeMode === ThemeMode.dark) {
    return { variant: ThemeVariant.standard, colorScheme: ThemeColorScheme.DARK };
  }

  if (themeMode === ThemeMode.light) {
    return { variant: ThemeVariant.standard, colorScheme: ThemeColorScheme.LIGHT };
  }

  return {
    variant: undefined,
    colorScheme: fallbackColorScheme,
  };
}

/**
 * Проверяет, что значение — известный {@link ThemeVariant}.
 * @param value — сырое значение из localStorage или пропсов
 */
export function isThemeVariant(value: unknown): value is ThemeVariant {
  return (
    value === ThemeVariant.standard ||
    value === ThemeVariant.glass ||
    value === ThemeVariant.kidsBoys ||
    value === ThemeVariant.kidsGirls ||
    value === ThemeVariant.kids ||
    value === 'kids'
  );
}

/**
 * Проверяет, что значение — известная {@link ThemeColorScheme}.
 * @param value — сырое значение из localStorage или пропсов
 */
export function isThemeColorScheme(value: unknown): value is ThemeColorScheme {
  return value === ThemeColorScheme.LIGHT || value === ThemeColorScheme.DARK;
}

/**
 * Возвращает уникальные варианты оформления из разрешённого каталога.
 * @param themeModes — id тем, доступных в каталоге
 */
export function getAvailableThemeVariants(themeModes: readonly string[]): ThemeVariant[] {
  const variants = new Set<ThemeVariant>();

  themeModes.forEach((themeMode) => {
    const axes = parseThemeModeToAxes(themeMode);
    if (axes.variant) {
      variants.add(axes.variant);
    }
  });

  return Array.from(variants);
}

/**
 * Читает сохранённые оси темы из localStorage с миграцией со старого `plainerv-theme-id`.
 * @param themeModes — id тем, доступных в каталоге
 * @param legacyThemeMode — значение из старого ключа хранения
 */
export function readStoredThemeAxes<TThemeMode extends string>(
  themeModes: readonly TThemeMode[],
  legacyThemeMode?: TThemeMode,
): ThemeAxes | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const storedVariant = normalizeThemeVariant(window.localStorage.getItem(THEME_VARIANT_STORAGE_KEY));
  const storedColorScheme = window.localStorage.getItem(COLOR_SCHEME_STORAGE_KEY);

  if (storedVariant && isThemeColorScheme(storedColorScheme)) {
    const resolvedThemeMode = resolveBuiltinThemeMode(storedVariant, storedColorScheme);

    if (themeModes.includes(resolvedThemeMode as TThemeMode)) {
      return {
        variant: storedVariant,
        colorScheme: storedColorScheme,
        themeMode: resolvedThemeMode,
      };
    }
  }

  if (legacyThemeMode && themeModes.includes(legacyThemeMode)) {
    const axes = parseThemeModeToAxes(legacyThemeMode);
    return {
      ...axes,
      themeMode: legacyThemeMode,
    };
  }

  return undefined;
}

/**
 * Сохраняет оси темы в localStorage.
 * @param variant — вариант оформления; `undefined` для кастомных тем
 * @param colorScheme — активная палитра
 * @param themeMode — итоговый id темы (для legacy-ключа)
 * @param legacyStorageKey — ключ старого формата (`plainerv-theme-id`)
 */
export function writeStoredThemeAxes(
  variant: ThemeVariant | undefined,
  colorScheme: ThemeColorScheme,
  themeMode: string,
  legacyStorageKey: string,
): void {
  if (typeof window === 'undefined') {
    return;
  }

  const normalizedVariant = variant ? normalizeThemeVariant(variant) : undefined;

  if (normalizedVariant) {
    window.localStorage.setItem(THEME_VARIANT_STORAGE_KEY, normalizedVariant);
    window.localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, colorScheme);
  }

  window.localStorage.setItem(legacyStorageKey, themeMode);
}
