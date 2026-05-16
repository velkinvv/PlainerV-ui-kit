import { lightTheme } from './light';
import { darkTheme } from './dark';
import { ThemeMode, type ColorTheme } from '../../types/theme';

// Общие цветовые переменные для использования в компонентах
export const themeColors: Record<ThemeMode, ColorTheme> = {
  [ThemeMode.LIGHT]: lightTheme,
  [ThemeMode.DARK]: darkTheme,
};

// Функция для получения цвета из темы
export const getThemeColor = (mode: ThemeMode, colorKey: keyof ColorTheme): string | undefined => {
  return themeColors[mode][colorKey];
};

// Функция для получения цвета с fallback
export const getColor = (
  mode: ThemeMode,
  colorKey: keyof ColorTheme,
  fallback?: string,
): string => {
  const color = getThemeColor(mode, colorKey);
  return color || fallback || '#68d5f8';
};
