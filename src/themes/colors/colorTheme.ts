import { lightTheme } from './light';
import { darkTheme } from './dark';
import { ThemeColorScheme, type ColorTheme } from '../../types/theme';

export const themeColors: Record<ThemeColorScheme, ColorTheme> = {
  [ThemeColorScheme.LIGHT]: lightTheme,
  [ThemeColorScheme.DARK]: darkTheme,
};

export const getThemeColor = (
  colorScheme: ThemeColorScheme,
  colorKey: keyof ColorTheme,
): string | undefined => {
  return themeColors[colorScheme][colorKey];
};

export const getColor = (
  colorScheme: ThemeColorScheme,
  colorKey: keyof ColorTheme,
  fallback?: string,
): string => {
  const color = getThemeColor(colorScheme, colorKey);
  return color || fallback || '#68d5f8';
};
