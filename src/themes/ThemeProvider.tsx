import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import {
  ThemeColorScheme,
  ThemeMode,
  type BuiltinThemeMode,
  type ThemeType,
  type ThemeVariant,
} from '../types/theme';
import type { CustomThemesByMode, ThemeOverridesByMode } from '../types/themeOverride';
import type { ThemeCatalog } from '../types/themeCatalog';
import { GlobalStyles } from '../styles/GlobalStyles';
import {
  buildThemeCatalogFromLegacyProps,
  createBuiltinThemeCatalog,
  DEFAULT_THEME_STORAGE_KEY,
  ensureValidThemeMode,
  findThemeModeByColorScheme,
  getNextThemeMode,
  getThemeCatalogMeta,
  getThemeCatalogModes,
  readStoredThemeMode,
  resolveThemeCatalog,
  writeStoredThemeMode,
} from '../handlers/themeCatalogHandlers';
import {
  getAvailableThemeVariants,
  parseThemeModeToAxes,
  resolveBuiltinThemeMode,
} from '../handlers/themeVariantHandlers';
import { ThemeContext, type ThemeContextProps } from './themeContext';

export type { ThemeContextProps } from './themeContext';
export { ThemeContext, useTheme } from './themeContext';

export interface ThemeProviderProps<TThemeMode extends string = BuiltinThemeMode> {
  children: React.ReactNode;
  applyGlobalStyles?: boolean;
  themes?: ThemeCatalog<TThemeMode>;
  defaultThemeMode?: TThemeMode;
  initialThemeMode?: TThemeMode;
  storageKey?: string;
  /** @deprecated {@link initialThemeMode} */
  initialThemeName?: TThemeMode;
  /** @deprecated {@link defaultThemeMode} */
  defaultThemeName?: TThemeMode;
  /** @deprecated {@link initialThemeMode} */
  initialThemeId?: TThemeMode;
  /** @deprecated {@link defaultThemeMode} */
  defaultThemeId?: TThemeMode;
  /** @deprecated Используйте `initialThemeMode` */
  initialMode?: ThemeColorScheme;
  themeOverrides?: ThemeOverridesByMode;
  customThemes?: CustomThemesByMode;
}

export function ThemeProvider<TThemeMode extends string = BuiltinThemeMode>({
  children,
  applyGlobalStyles = true,
  themes: themesProp,
  defaultThemeMode: defaultThemeModeProp,
  initialThemeMode: initialThemeModeProp,
  initialThemeName,
  defaultThemeName,
  initialThemeId,
  defaultThemeId,
  storageKey = DEFAULT_THEME_STORAGE_KEY,
  initialMode,
  themeOverrides,
  customThemes,
}: ThemeProviderProps<TThemeMode>) {
  const catalog = useMemo(() => {
    if (themesProp) {
      return themesProp;
    }
    if (themeOverrides || customThemes) {
      return buildThemeCatalogFromLegacyProps(
        themeOverrides,
        customThemes,
      ) as ThemeCatalog<TThemeMode>;
    }
    return createBuiltinThemeCatalog() as ThemeCatalog<TThemeMode>;
  }, [themesProp, themeOverrides, customThemes]);

  const resolvedCatalog = useMemo(() => resolveThemeCatalog(catalog), [catalog]);

  const themeModes = useMemo(() => getThemeCatalogModes(catalog) as TThemeMode[], [catalog]);

  const themesMeta = useMemo(() => getThemeCatalogMeta(resolvedCatalog), [resolvedCatalog]);

  const themeVariants = useMemo(
    () => getAvailableThemeVariants(themeModes),
    [themeModes],
  );

  const themeByMode = useMemo(() => {
    const map = new Map<TThemeMode, ThemeType>();
    resolvedCatalog.forEach((item) => {
      map.set(item.name, item.theme);
    });
    return map;
  }, [resolvedCatalog]);

  const fallbackThemeMode = ensureValidThemeMode(
    defaultThemeModeProp ?? defaultThemeName ?? defaultThemeId ?? ThemeMode.light,
    themeModes,
    (themeModes[0] ?? ThemeMode.light) as TThemeMode,
  );

  const resolveInitialThemeMode = (): TThemeMode => {
    const explicitInitial = initialThemeModeProp ?? initialThemeName ?? initialThemeId;
    if (explicitInitial) {
      return ensureValidThemeMode(explicitInitial, themeModes, fallbackThemeMode);
    }

    if (initialMode !== undefined) {
      const fromScheme = findThemeModeByColorScheme(resolvedCatalog, initialMode);
      if (fromScheme) {
        return fromScheme;
      }
    }

    const stored = readStoredThemeMode<TThemeMode>(themeModes, storageKey);
    if (stored) {
      return stored;
    }

    return fallbackThemeMode;
  };

  const [themeMode, setThemeModeState] = useState<TThemeMode>(resolveInitialThemeMode);

  useEffect(() => {
    const explicitInitial = initialThemeModeProp ?? initialThemeName ?? initialThemeId;
    if (!explicitInitial) {
      return;
    }

    const nextThemeMode = ensureValidThemeMode(explicitInitial, themeModes, fallbackThemeMode);
    setThemeModeState((currentThemeMode) =>
      currentThemeMode === nextThemeMode ? currentThemeMode : nextThemeMode,
    );
  }, [initialThemeModeProp, initialThemeName, initialThemeId, themeModes, fallbackThemeMode]);

  useEffect(() => {
    if (!themeModes.includes(themeMode)) {
      setThemeModeState(fallbackThemeMode);
    }
  }, [themeModes, themeMode, fallbackThemeMode]);

  const activeTheme = themeByMode.get(themeMode) ?? themeByMode.get(fallbackThemeMode);

  if (!activeTheme) {
    throw new Error(
      `ThemeProvider: тема "${themeMode}" не найдена. Доступные ThemeMode: ${themeModes.join(', ')}`,
    );
  }

  const colorScheme = activeTheme.mode;

  const activeCatalogItem = resolvedCatalog.find((item) => item.name === themeMode);
  const themeVariant = activeCatalogItem?.variant ?? parseThemeModeToAxes(themeMode, colorScheme).variant;

  const setThemeMode = useCallback(
    (nextThemeMode: TThemeMode) => {
      setThemeModeState(ensureValidThemeMode(nextThemeMode, themeModes, fallbackThemeMode));
    },
    [themeModes, fallbackThemeMode],
  );

  const setColorScheme = useCallback(
    (nextColorScheme: ThemeColorScheme) => {
      const target = findThemeModeByColorScheme(resolvedCatalog, nextColorScheme, themeVariant);
      if (target) {
        setThemeMode(target);
      }
    },
    [resolvedCatalog, themeVariant, setThemeMode],
  );

  const setThemeVariant = useCallback(
    (nextThemeVariant: ThemeVariant) => {
      const target = findThemeModeByColorScheme(resolvedCatalog, colorScheme, nextThemeVariant);
      if (target) {
        setThemeMode(target);
        return;
      }

      const builtinTarget = resolveBuiltinThemeMode(nextThemeVariant, colorScheme);
      if (themeModes.includes(builtinTarget as TThemeMode)) {
        setThemeMode(builtinTarget as TThemeMode);
      }
    },
    [resolvedCatalog, colorScheme, themeModes, setThemeMode],
  );

  const setMode = useCallback(
    (nextColorScheme: ThemeColorScheme) => {
      setColorScheme(nextColorScheme);
    },
    [setColorScheme],
  );

  const cycleTheme = useCallback(() => {
    setThemeMode(getNextThemeMode(themeModes, themeMode));
  }, [themeModes, themeMode, setThemeMode]);

  const toggle = useCallback(() => {
    if (themeModes.length === 2) {
      const other = themeModes.find((name) => name !== themeMode) ?? themeModes[0];
      setThemeMode(other);
      return;
    }
    cycleTheme();
  }, [themeModes, themeMode, setThemeMode, cycleTheme]);

  const getThemeByMode = useCallback(
    (requested: TThemeMode) => themeByMode.get(requested),
    [themeByMode],
  );

  const themeWithType = useMemo(() => ({ ...activeTheme, type: activeTheme.mode }), [activeTheme]);

  useEffect(() => {
    writeStoredThemeMode(themeMode, colorScheme, storageKey);
  }, [themeMode, colorScheme, storageKey]);

  const contextValue = useMemo<ThemeContextProps<TThemeMode>>(
    () => ({
      themeMode,
      setThemeMode,
      themeModes,
      themes: themesMeta,
      cycleTheme,
      themeVariant,
      themeVariants,
      setThemeVariant,
      colorScheme,
      setColorScheme,
      isDarkColorScheme: colorScheme === ThemeColorScheme.DARK,
      getThemeByMode,
      themeName: themeMode,
      setThemeName: setThemeMode,
      themeNames: themeModes,
      themeId: themeMode,
      setThemeId: setThemeMode,
      themeIds: themeModes,
      mode: colorScheme,
      setMode,
      toggle,
      getThemeByName: getThemeByMode,
      getThemeById: getThemeByMode,
    }),
    [
      themeMode,
      setThemeMode,
      themeModes,
      themesMeta,
      cycleTheme,
      themeVariant,
      themeVariants,
      setThemeVariant,
      colorScheme,
      setColorScheme,
      getThemeByMode,
      setMode,
      toggle,
    ],
  );

  return (
    <ThemeContext.Provider value={contextValue as unknown as ThemeContextProps<string>}>
      <StyledThemeProvider theme={themeWithType}>
        {applyGlobalStyles ? <GlobalStyles /> : null}
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export const builtinThemeCatalog = createBuiltinThemeCatalog();
