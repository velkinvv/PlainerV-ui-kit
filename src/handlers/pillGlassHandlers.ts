import type { Colors, PillTheme } from '../types/theme';
import { ThemeColorScheme } from '../types/theme';
import { mixColorWithTransparent, withHexAlpha } from './glassColorHandlers';

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
 * Glass-палитра поверхностей Pill из `onAccent`.
 * @param isDark — тёмная ли базовая палитра
 * @param borderSecondary — цвет нейтральной границы из темы
 * @param onAccent — цвет текста/поверхности на акценте
 */
function getPillGlassSurfacePalette(
  isDark: boolean,
  borderSecondary: string,
  onAccent: string,
): PillSurfacePalette {
  const defaultBackground = mixColorWithTransparent(onAccent, isDark ? 6 : 26);
  const hoverBackground = mixColorWithTransparent(onAccent, isDark ? 10 : 18);
  const activeBackground = mixColorWithTransparent(onAccent, isDark ? 14 : 30);

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
  const onAccent = theme.colors?.onAccent ?? '#ffffff';

  if (theme.pills?.settings?.backdropFilter) {
    return getPillGlassSurfacePalette(isDark, theme.colors.borderSecondary, onAccent);
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
