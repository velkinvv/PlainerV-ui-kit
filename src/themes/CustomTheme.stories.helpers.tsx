import type { ThemeOverridesByMode } from '@/types/themeOverride';

/**
 * Брендовые переопределения для демо кастомной темы в Storybook.
 */
export const brandThemeOverrides: ThemeOverridesByMode = {
  light: {
    colors: {
      primary: '#7C3AED',
      primaryHover: '#6D28D9',
      primaryActive: '#5B21B6',
    },
  },
  dark: {
    colors: {
      primary: '#A78BFA',
      primaryHover: '#8B5CF6',
      primaryActive: '#7C3AED',
    },
  },
};

/**
 * Параметры Storybook для сторис с брендовой темой (без второго ThemeProvider).
 */
export const brandPlainervThemeParameters = {
  plainervTheme: {
    themeOverrides: brandThemeOverrides,
    applyGlobalStyles: false,
  },
} as const;
