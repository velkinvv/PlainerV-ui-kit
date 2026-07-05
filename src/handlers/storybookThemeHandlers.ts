import { ThemeColorScheme, ThemeMode } from '../types/theme';

/** Значение глобала `theme` в Storybook (addon-themes). */
export type StorybookThemeGlobal = 'light' | 'dark' | 'glassLight' | 'glassDark';

const STORYBOOK_THEME_STORAGE_KEY = 'storybook-theme';

/**
 * Читает сохранённую тему Storybook из localStorage.
 */
export function readStorybookThemeGlobal(): StorybookThemeGlobal {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const stored = window.localStorage.getItem(STORYBOOK_THEME_STORAGE_KEY);
  if (stored === 'dark' || stored === 'glassLight' || stored === 'glassDark') {
    return stored;
  }
  if (stored === 'glass') {
    return 'glassLight';
  }

  return 'light';
}

/**
 * Нормализует значение глобала `theme` из Storybook.
 * @param rawTheme — `context.globals.theme`
 */
export function resolveStorybookThemeGlobal(rawTheme: unknown): StorybookThemeGlobal {
  if (
    rawTheme === 'dark' ||
    rawTheme === 'light' ||
    rawTheme === 'glassLight' ||
    rawTheme === 'glassDark'
  ) {
    return rawTheme;
  }

  if (rawTheme === 'glass') {
    return 'glassLight';
  }

  return readStorybookThemeGlobal();
}

/**
 * Id темы UI-kit для {@link ThemeProvider}.
 * @param storybookTheme — нормализованный глобал Storybook
 */
export function resolveStorybookThemeMode(storybookTheme: StorybookThemeGlobal): string {
  switch (storybookTheme) {
    case 'dark':
      return ThemeMode.dark;
    case 'glassDark':
      return ThemeMode.glassDark;
    case 'glassLight':
      return ThemeMode.glassLight;
    default:
      return ThemeMode.light;
  }
}

/**
 * Палитра {@link ThemeColorScheme} для legacy-пропсов (не используйте для выбора glass-темы).
 * @param storybookTheme — нормализованный глобал Storybook
 */
export function resolveStorybookColorScheme(
  storybookTheme: StorybookThemeGlobal,
): ThemeColorScheme {
  return storybookTheme === 'dark' || storybookTheme === 'glassDark'
    ? ThemeColorScheme.DARK
    : ThemeColorScheme.LIGHT;
}

/**
 * Сохраняет тему Storybook в localStorage (ключ addon-themes).
 * @param storybookTheme — нормализованный глобал Storybook
 */
export function writeStorybookThemeGlobal(storybookTheme: StorybookThemeGlobal): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORYBOOK_THEME_STORAGE_KEY, storybookTheme);
}
