import type { Colors, PillTheme } from '../types/theme';
import { ThemeColorScheme } from '../types/theme';
import { withHexAlpha } from './glassColorHandlers';

/** Палитра поверхностей Pill для default / hover / selected */
export type PillSurfacePalette = {
  background: string;
  hoverBackground: string;
  activeBackground: string;
  disabledBackground: string;
  border: string;
  /** Полупрозрачная заливка выбранного состояния */
  selectedBackground: (accentColor: string) => string;
  /** Граница выбранного состояния */
  selectedBorder: (accentColor: string) => string;
};

/** Прозрачность glass-границ — как у glass-тегов и кнопок */
const BORDER_ALPHA = 0.66;

/** Прозрачность заливки выбранного pill */
const SELECTED_FILL_ALPHA_LIGHT = 0.22;

const SELECTED_FILL_ALPHA_DARK = 0.28;

/**
 * Glass-палитра поверхностей Pill.
 * @param isDark — тёмная ли базовая палитра
 * @param borderSecondary — цвет нейтральной границы из темы
 */
function getPillGlassSurfacePalette(
  isDark: boolean,
  borderSecondary: string,
): PillSurfacePalette {
  const defaultBackground = isDark
    ? 'rgba(255, 255, 255, 0.06)'
    : 'rgba(255, 255, 255, 0.26)';
  const hoverBackground = isDark
    ? 'rgba(255, 255, 255, 0.10)'
    : 'rgba(255, 255, 255, 0.18)';
  const activeBackground = isDark
    ? 'rgba(255, 255, 255, 0.14)'
    : 'rgba(255, 255, 255, 0.30)';

  return {
    background: defaultBackground,
    hoverBackground,
    activeBackground,
    disabledBackground: defaultBackground,
    border: borderSecondary,
    selectedBackground: (accentColor) =>
      withHexAlpha(accentColor, isDark ? SELECTED_FILL_ALPHA_DARK : SELECTED_FILL_ALPHA_LIGHT),
    selectedBorder: (accentColor) => withHexAlpha(accentColor, BORDER_ALPHA),
  };
}

/**
 * Возвращает палитру поверхностей Pill с учётом glass-темы.
 * @param theme — тема styled-components (colors, mode, pills)
 */
export function getPillSurfacePalette(theme: {
  colors: Colors;
  mode?: ThemeColorScheme;
  pills?: PillTheme;
}): PillSurfacePalette {
  const isDark = theme.mode === ThemeColorScheme.DARK;

  if (theme.pills?.settings?.backdropFilter) {
    return getPillGlassSurfacePalette(isDark, theme.colors.borderSecondary);
  }

  return {
    background: theme.colors.input,
    hoverBackground: theme.colors.backgroundTertiary,
    activeBackground: theme.colors.backgroundQuaternary,
    disabledBackground: theme.colors.input,
    border: theme.colors.borderSecondary,
    selectedBackground: (accentColor) =>
      isDark
        ? `color-mix(in srgb, ${accentColor} 22%, ${theme.colors.input})`
        : `color-mix(in srgb, ${accentColor} 10%, ${theme.colors.input})`,
    selectedBorder: (accentColor) => accentColor,
  };
}
