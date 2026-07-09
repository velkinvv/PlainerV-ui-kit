import type { ThemeColorScheme, ThemeModeMap, ThemeType, ThemeVariant } from './theme';
import type { ThemeOverride } from './themeOverride';

/**
 * @deprecated Используйте {@link ThemeMode}.light / .dark
 */
export const BUILTIN_THEME_ID_LIGHT = 'light' as const;

/** @deprecated Используйте {@link ThemeMode}.dark */
export const BUILTIN_THEME_ID_DARK = 'dark' as const;

/** @deprecated Используйте {@link BuiltinThemeMode} */
export type BuiltinThemeId = 'light' | 'dark';

/**
 * @deprecated Используйте {@link ThemeMode}
 */
export const BuiltinThemeName = {
  light: 'light',
  dark: 'dark',
} as const;

/** @deprecated Используйте {@link BuiltinThemeMode} */
export type BuiltinThemeNameValue = (typeof BuiltinThemeName)[keyof typeof BuiltinThemeName];

/**
 * @deprecated Используйте {@link ThemeModeMap}
 */
export type ThemeNameMap<TThemeName extends string> = ThemeModeMap<TThemeName>;

/**
 * @deprecated Используйте {@link ThemeModeFromMap}
 */
export type ThemeNameFromMap<TThemeMap extends Record<string, string>> = TThemeMap[keyof TThemeMap];

export type ThemeCatalogItemWithId = {
  id: string;
  label?: string;
  theme?: ThemeType;
  override?: ThemeOverride;
  /** Палитра базовой темы для `mergeTheme` */
  baseMode?: ThemeColorScheme;
  /** Визуальный вариант оформления (standard, glass, …) */
  variant?: ThemeVariant;
};

export type ThemeCatalogItemDefinition = Omit<ThemeCatalogItemWithId, 'id'>;

export type ThemeCatalog<TThemeMode extends string = string> = Record<
  TThemeMode,
  ThemeCatalogItemDefinition
>;

export type DefinedThemeCatalog<T extends readonly ThemeCatalogItemWithId[]> = {
  catalog: ThemeCatalog<T[number]['id']>;
  /** Type-safe id: `themeMode.ocean` → `'ocean'` */
  themeMode: ThemeModeMap<T[number]['id']>;
  themeModes: readonly T[number]['id'][];
  /** @deprecated Используйте `themeMode` */
  themeName: ThemeModeMap<T[number]['id']>;
  /** @deprecated Используйте `themeModes` */
  themeNames: readonly T[number]['id'][];
};

export type ResolvedThemeCatalogItem<TThemeMode extends string = string> = {
  name: TThemeMode;
  label: string;
  baseMode: ThemeColorScheme;
  theme: ThemeType;
  /** Визуальный вариант оформления; `undefined` для кастомных тем */
  variant?: ThemeVariant;
};

export type ThemeCatalogMeta<TThemeMode extends string = string> = {
  name: TThemeMode;
  label: string;
  colorScheme: ThemeColorScheme;
  /** Визуальный вариант оформления; `undefined` для кастомных тем */
  variant?: ThemeVariant;
};
