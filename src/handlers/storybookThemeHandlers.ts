import { ThemeColorScheme, ThemeMode, ThemeVariant } from '../types/theme';
import {
  isThemeColorScheme,
  normalizeThemeVariant,
  readStoredThemeAxes,
  resolveBuiltinThemeMode,
  writeStoredThemeAxes,
} from './themeVariantHandlers';

/** Globals Storybook для осей темы */
export type StorybookThemeGlobals = {
  /** Вариант оформления (standard / glass / kidsBoys / kidsGirls) */
  themeVariant?: unknown;
  /** Светлая или тёмная палитра */
  colorScheme?: unknown;
  /** @deprecated Legacy flat theme id от addon-themes */
  theme?: unknown;
};

/** Оси темы Storybook */
export type StorybookThemeAxes = {
  themeVariant: ThemeVariant;
  colorScheme: ThemeColorScheme;
  themeMode: string;
};

/** Id встроенной темы для атрибута `data-theme` и {@link ThemeProvider} */
export type StorybookDataTheme = ReturnType<typeof resolveBuiltinThemeMode>;

const STORYBOOK_THEME_STORAGE_KEY = 'storybook-theme';

const builtinThemeModes = Object.values(ThemeMode) as string[];

/**
 * Собирает оси темы из globals Storybook.
 *
 * @param globals - globals Storybook (`themeVariant`, `colorScheme`)
 */
export function resolveStorybookGlobalsAxes(
  globals: StorybookThemeGlobals = {},
): StorybookThemeAxes {
  const themeVariant =
    normalizeThemeVariant(globals.themeVariant) ?? ThemeVariant.standard;
  const colorScheme = isThemeColorScheme(globals.colorScheme)
    ? globals.colorScheme
    : ThemeColorScheme.LIGHT;

  return {
    themeVariant,
    colorScheme,
    themeMode: resolveBuiltinThemeMode(themeVariant, colorScheme),
  };
}

/**
 * Читает сохранённые или переданные оси темы Storybook.
 *
 * @param globals - опциональные globals Storybook при инициализации preview
 */
export function readStorybookThemeAxes(globals?: StorybookThemeGlobals): StorybookThemeAxes {
  if (typeof window !== 'undefined') {
    const legacyThemeMode = window.localStorage.getItem(STORYBOOK_THEME_STORAGE_KEY) ?? undefined;
    const storedAxes = readStoredThemeAxes(builtinThemeModes, legacyThemeMode);

    if (storedAxes?.variant && storedAxes.colorScheme) {
      return {
        themeVariant: storedAxes.variant,
        colorScheme: storedAxes.colorScheme,
        themeMode: storedAxes.themeMode,
      };
    }
  }

  if (globals && (globals.themeVariant !== undefined || globals.colorScheme !== undefined)) {
    return resolveStorybookGlobalsAxes(globals);
  }

  return {
    themeVariant: ThemeVariant.standard,
    colorScheme: ThemeColorScheme.LIGHT,
    themeMode: ThemeMode.light,
  };
}

/**
 * Возвращает id встроенной темы по осям (для `data-theme` и ThemeProvider).
 *
 * @param themeVariant - вариант оформления
 * @param colorScheme - цветовая схема
 */
export function resolveStorybookThemeModeFromAxes(
  themeVariant: ThemeVariant,
  colorScheme: ThemeColorScheme,
): StorybookDataTheme {
  return resolveBuiltinThemeMode(themeVariant, colorScheme);
}

/**
 * @deprecated Используйте {@link resolveStorybookThemeModeFromAxes}
 */
export function resolveStorybookThemeGlobalFromAxes(
  themeVariant: ThemeVariant,
  colorScheme: ThemeColorScheme,
): StorybookDataTheme {
  return resolveStorybookThemeModeFromAxes(themeVariant, colorScheme);
}

/**
 * Нормализует id темы для {@link ThemeProvider} (миграция legacy `kidsLight` / `kidsDark`).
 *
 * @param themeMode - id темы из Storybook
 */
export function resolveStorybookThemeMode(themeMode: string): string {
  if (builtinThemeModes.includes(themeMode)) {
    return themeMode;
  }

  if (themeMode === 'kidsLight') {
    return ThemeMode.kidsBoysLight;
  }

  if (themeMode === 'kidsDark') {
    return ThemeMode.kidsBoysDark;
  }

  return ThemeMode.light;
}

/**
 * Сохраняет оси темы Storybook в localStorage.
 *
 * @param axes - вариант оформления, палитра и итоговый id темы
 */
export function writeStorybookThemeAxes(axes: StorybookThemeAxes): void {
  writeStoredThemeAxes(
    axes.themeVariant,
    axes.colorScheme,
    axes.themeMode,
    STORYBOOK_THEME_STORAGE_KEY,
  );
}
