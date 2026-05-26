import { createContext, useContext } from 'react';
import type { ThemeColorScheme, ThemeType } from '../types/theme';
import type { ThemeCatalogMeta } from '../types/themeCatalog';

/**
 * Значение React-контекста темы (без провайдера).
 */
export interface ThemeContextProps<TThemeMode extends string = string> {
  /** Id активной темы (`ThemeMode.light`, `appThemes.themeMode.ocean`, …). */
  themeMode: TThemeMode;
  setThemeMode: (nextThemeMode: TThemeMode) => void;
  themeModes: readonly TThemeMode[];
  themes: readonly ThemeCatalogMeta<TThemeMode>[];
  cycleTheme: () => void;
  /** Палитра активной темы — только для стилей, не для переключения. */
  colorScheme: ThemeColorScheme;
  isDarkColorScheme: boolean;
  getThemeByMode: (themeMode: TThemeMode) => ThemeType | undefined;

  /** @deprecated {@link themeMode} */
  themeName: TThemeMode;
  /** @deprecated {@link setThemeMode} */
  setThemeName: (nextThemeMode: TThemeMode) => void;
  /** @deprecated {@link themeModes} */
  themeNames: readonly TThemeMode[];
  /** @deprecated {@link themeMode} */
  themeId: TThemeMode;
  /** @deprecated {@link setThemeMode} */
  setThemeId: (nextThemeMode: TThemeMode) => void;
  /** @deprecated {@link themeModes} */
  themeIds: readonly TThemeMode[];
  /** @deprecated {@link colorScheme} */
  mode: ThemeColorScheme;
  /** @deprecated {@link setThemeMode} */
  setMode: (colorScheme: ThemeColorScheme) => void;
  /** @deprecated */
  toggle: () => void;
  /** @deprecated {@link getThemeByMode} */
  getThemeByName: (themeMode: TThemeMode) => ThemeType | undefined;
  /** @deprecated {@link getThemeByMode} */
  getThemeById: (themeMode: TThemeMode) => ThemeType | undefined;
}

export const ThemeContext = createContext<ThemeContextProps<string> | undefined>(undefined);

/**
 * Доступ к каталогу тем. Требует обёртки {@link ThemeProvider}.
 */
export function useTheme<TThemeMode extends string = string>(): ThemeContextProps<TThemeMode> {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context as unknown as ThemeContextProps<TThemeMode>;
}
