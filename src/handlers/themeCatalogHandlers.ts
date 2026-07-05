import {
  ThemeColorScheme,
  ThemeMode,
  type BuiltinThemeMode,
  type ThemeModeMap,
  type ThemeType,
} from '../types/theme';
import type { CustomThemesByMode, ThemeOverridesByMode } from '../types/themeOverride';
import type {
  DefinedThemeCatalog,
  ResolvedThemeCatalogItem,
  ThemeCatalog,
  ThemeCatalogItemDefinition,
  ThemeCatalogItemWithId,
  ThemeCatalogMeta,
} from '../types/themeCatalog';
import { darkTheme, glassDarkTheme, glassLightTheme, lightTheme } from '../themes/themes';
import { mergeTheme } from '../themes/mergeTheme';

export const DEFAULT_THEME_STORAGE_KEY = 'plainerv-theme-id';
export const LEGACY_STORYBOOK_THEME_STORAGE_KEY = 'storybook-theme';

/**
 * Базовая тема для элемента каталога по id и палитре.
 * @param themeMode — id темы из каталога
 * @param baseMode — палитра LIGHT / DARK
 */
function resolveCatalogBaseTheme(themeMode: string, baseMode: ThemeColorScheme): ThemeType {
  if (themeMode === ThemeMode.glassLight || themeMode === ThemeMode.glass) {
    return glassLightTheme;
  }

  if (themeMode === ThemeMode.glassDark) {
    return glassDarkTheme;
  }

  return baseMode === ThemeColorScheme.DARK ? darkTheme : lightTheme;
}

export function createBuiltinThemeCatalog(): ThemeCatalog<BuiltinThemeMode> {
  return {
    [ThemeMode.light]: {
      label: 'Light',
      baseMode: ThemeColorScheme.LIGHT,
    },
    [ThemeMode.dark]: {
      label: 'Dark',
      baseMode: ThemeColorScheme.DARK,
    },
    [ThemeMode.glassLight]: {
      label: 'Glass Light',
      baseMode: ThemeColorScheme.LIGHT,
      theme: glassLightTheme,
    },
    [ThemeMode.glassDark]: {
      label: 'Glass Dark',
      baseMode: ThemeColorScheme.DARK,
      theme: glassDarkTheme,
    },
  };
}

export const builtinThemeModeMap: ThemeModeMap<BuiltinThemeMode> = { ...ThemeMode };

/**
 * Карта id тем `{ ocean: 'ocean' }`.
 */
export function createThemeModeMap<const TThemeMode extends string>(
  themeModes: readonly TThemeMode[],
): ThemeModeMap<TThemeMode> {
  return Object.fromEntries(themeModes.map((name) => [name, name])) as ThemeModeMap<TThemeMode>;
}

/** @deprecated Используйте {@link createThemeModeMap} */
export const createThemeNameMap = createThemeModeMap;

/**
 * Типобезопасный каталог. Расширяет {@link ThemeMode}: `appThemes.themeMode.ocean`.
 */
export function defineThemeCatalog<const T extends readonly ThemeCatalogItemWithId[]>(
  items: T,
): DefinedThemeCatalog<T> {
  const catalog = {} as ThemeCatalog<T[number]['id']>;

  items.forEach((item) => {
    const { id, ...definition } = item;
    catalog[id as T[number]['id']] = definition;
  });

  const themeModes = items.map((item) => item.id) as readonly T[number]['id'][];
  const themeMode = createThemeModeMap(themeModes);

  return {
    catalog,
    themeMode,
    themeModes,
    themeName: themeMode,
    themeNames: themeModes,
  };
}

/** @deprecated Используйте {@link defineThemeCatalog} */
export function createThemeCatalog(
  items: Array<{ id: string } & ThemeCatalogItemDefinition>,
): ThemeCatalog {
  return Object.fromEntries(items.map(({ id, ...definition }) => [id, definition]));
}

export function getThemeCatalogModes<TThemeMode extends string>(
  catalog: ThemeCatalog<TThemeMode>,
): TThemeMode[] {
  return Object.keys(catalog) as TThemeMode[];
}

/** @deprecated */
export const getThemeCatalogIds = getThemeCatalogModes;
export const getThemeCatalogNames = getThemeCatalogModes;

export function resolveThemeCatalogItem<TThemeMode extends string>(
  themeMode: TThemeMode,
  definition: ThemeCatalogItemDefinition,
): ResolvedThemeCatalogItem<TThemeMode> {
  const baseMode =
    definition.baseMode ??
    definition.theme?.mode ??
    (themeMode === ThemeMode.dark || themeMode === ThemeMode.glassDark
      ? ThemeColorScheme.DARK
      : ThemeColorScheme.LIGHT);

  const baseTheme = resolveCatalogBaseTheme(themeMode, baseMode);

  let theme: ThemeType;

  if (definition.theme) {
    theme = {
      ...definition.theme,
      mode: definition.theme.mode ?? baseMode,
    };
  } else if (definition.override) {
    theme = mergeTheme(baseTheme, {
      ...definition.override,
      mode: baseMode,
    });
  } else {
    theme = { ...baseTheme, mode: baseMode };
  }

  return {
    name: themeMode,
    label: definition.label ?? themeMode,
    baseMode,
    theme,
  };
}

export function resolveThemeCatalog<TThemeMode extends string>(
  catalog: ThemeCatalog<TThemeMode>,
): ResolvedThemeCatalogItem<TThemeMode>[] {
  return getThemeCatalogModes(catalog).map((themeMode) =>
    resolveThemeCatalogItem(themeMode, catalog[themeMode] ?? {}),
  );
}

export function getThemeCatalogMeta<TThemeMode extends string>(
  resolvedItems: ResolvedThemeCatalogItem<TThemeMode>[],
): ThemeCatalogMeta<TThemeMode>[] {
  return resolvedItems.map((item) => ({
    name: item.name,
    label: item.label,
    colorScheme: item.theme.mode,
  }));
}

export function getNextThemeMode<TThemeMode extends string>(
  themeModes: readonly TThemeMode[],
  currentThemeMode: TThemeMode,
): TThemeMode {
  if (themeModes.length === 0) {
    return currentThemeMode;
  }

  const currentIndex = themeModes.indexOf(currentThemeMode);
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % themeModes.length;
  return themeModes[nextIndex] ?? themeModes[0] ?? currentThemeMode;
}

/** @deprecated */
export const getNextThemeName = getNextThemeMode;
export const getNextThemeId = getNextThemeMode;

export function findThemeModeByColorScheme<TThemeMode extends string>(
  resolvedItems: ResolvedThemeCatalogItem<TThemeMode>[],
  colorScheme: ThemeColorScheme,
): TThemeMode | undefined {
  return resolvedItems.find((item) => item.theme.mode === colorScheme)?.name;
}

/** @deprecated */
export const findThemeNameByColorScheme = findThemeModeByColorScheme;
export const findThemeIdByMode = findThemeModeByColorScheme;

export function readStoredThemeMode<TThemeMode extends string>(
  themeModes: readonly TThemeMode[],
  storageKey: string = DEFAULT_THEME_STORAGE_KEY,
): TThemeMode | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const saved = window.localStorage.getItem(storageKey);
  if (saved && themeModes.includes(saved as TThemeMode)) {
    return saved as TThemeMode;
  }

  const legacyMode = window.localStorage.getItem(LEGACY_STORYBOOK_THEME_STORAGE_KEY);
  if (legacyMode === ThemeMode.dark && themeModes.includes(ThemeMode.dark as TThemeMode)) {
    return ThemeMode.dark as TThemeMode;
  }
  if (legacyMode === ThemeMode.glassLight && themeModes.includes(ThemeMode.glassLight as TThemeMode)) {
    return ThemeMode.glassLight as TThemeMode;
  }
  if (legacyMode === ThemeMode.glassDark && themeModes.includes(ThemeMode.glassDark as TThemeMode)) {
    return ThemeMode.glassDark as TThemeMode;
  }
  if (legacyMode === 'glass' && themeModes.includes(ThemeMode.glassLight as TThemeMode)) {
    return ThemeMode.glassLight as TThemeMode;
  }
  if (legacyMode === ThemeMode.light && themeModes.includes(ThemeMode.light as TThemeMode)) {
    return ThemeMode.light as TThemeMode;
  }

  return undefined;
}

/** @deprecated */
export const readStoredThemeName = readStoredThemeMode;
export const readStoredThemeId = readStoredThemeMode;

export function writeStoredThemeMode<TThemeMode extends string>(
  themeMode: TThemeMode,
  colorScheme: ThemeColorScheme,
  storageKey: string = DEFAULT_THEME_STORAGE_KEY,
): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(storageKey, themeMode);
  window.localStorage.setItem(
    LEGACY_STORYBOOK_THEME_STORAGE_KEY,
    themeMode === ThemeMode.glassLight || themeMode === ThemeMode.glass
      ? ThemeMode.glassLight
      : themeMode === ThemeMode.glassDark
        ? ThemeMode.glassDark
        : colorScheme === ThemeColorScheme.DARK
          ? ThemeMode.dark
          : ThemeMode.light,
  );
}

/** @deprecated */
export const writeStoredThemeName = writeStoredThemeMode;
export const writeStoredThemeId = writeStoredThemeMode;

export function buildThemeCatalogFromLegacyProps(
  themeOverrides?: ThemeOverridesByMode,
  customThemes?: CustomThemesByMode,
): ThemeCatalog<BuiltinThemeMode> {
  const catalog = createBuiltinThemeCatalog();

  const applyLegacy = (themeMode: BuiltinThemeMode, baseMode: ThemeColorScheme) => {
    const customTheme = themeMode === ThemeMode.light ? customThemes?.light : customThemes?.dark;
    const override = themeMode === ThemeMode.light ? themeOverrides?.light : themeOverrides?.dark;

    if (customTheme) {
      catalog[themeMode] = {
        label: catalog[themeMode]?.label,
        theme: customTheme,
        baseMode,
      };
      return;
    }

    if (override) {
      catalog[themeMode] = {
        label: catalog[themeMode]?.label,
        override,
        baseMode,
      };
    }
  };

  applyLegacy(ThemeMode.light, ThemeColorScheme.LIGHT);
  applyLegacy(ThemeMode.dark, ThemeColorScheme.DARK);

  return catalog;
}

export function ensureValidThemeMode<TThemeMode extends string>(
  themeMode: string | undefined,
  themeModes: readonly TThemeMode[],
  fallbackThemeMode: TThemeMode,
): TThemeMode {
  if (themeMode && themeModes.includes(themeMode as TThemeMode)) {
    return themeMode as TThemeMode;
  }
  return fallbackThemeMode;
}

/** @deprecated */
export const ensureValidThemeName = ensureValidThemeMode;
export const ensureValidThemeId = ensureValidThemeMode;
