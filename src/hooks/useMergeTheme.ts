import { useContext, useMemo } from 'react';
import { ThemeColorScheme, type ThemeType } from '../types/theme';
import type { ThemeOverride } from '../types/themeOverride';
import { darkTheme, lightTheme } from '../themes/themes';
import { mergeTheme } from '../themes/mergeTheme';
import { ThemeContext } from '../themes/ThemeProvider';

/**
 * Параметры хука {@link useMergeTheme}.
 */
export type UseMergeThemeOptions = {
  /** Базовая тема для слияния. */
  baseTheme?: ThemeType;
  /** Палитра, если нет темы из каталога. */
  colorScheme?: ThemeColorScheme;
  /** @deprecated {@link colorScheme} */
  mode?: ThemeColorScheme;
  /** Id темы: {@link ThemeMode}.light или `appThemes.themeMode.ocean` */
  themeMode?: string;
  /** @deprecated {@link themeMode} */
  themeName?: string;
  /** @deprecated {@link themeMode} */
  themeId?: string;
};

/**
 * Сливает override с базовой темой из каталога или встроенной light/dark.
 */
export function useMergeTheme(
  themeOverride: ThemeOverride,
  options?: UseMergeThemeOptions,
): ThemeType {
  const themeContext = useContext(ThemeContext);
  const resolvedThemeMode =
    options?.themeMode ?? options?.themeName ?? options?.themeId ?? themeContext?.themeMode;
  const resolvedColorScheme =
    options?.colorScheme ??
    options?.mode ??
    themeContext?.colorScheme ??
    themeContext?.mode ??
    ThemeColorScheme.LIGHT;

  return useMemo(() => {
    if (options?.baseTheme) {
      return mergeTheme(options.baseTheme, themeOverride);
    }

    const catalogBaseTheme =
      resolvedThemeMode && themeContext?.getThemeByMode
        ? themeContext.getThemeByMode(resolvedThemeMode)
        : undefined;

    const baseTheme =
      catalogBaseTheme ??
      (resolvedColorScheme === ThemeColorScheme.DARK ? darkTheme : lightTheme);

    return mergeTheme(baseTheme, themeOverride);
  }, [
    themeOverride,
    options?.baseTheme,
    resolvedColorScheme,
    resolvedThemeMode,
    themeContext?.getThemeByMode,
  ]);
}
