import type { Colors, PaginationTheme } from '../types/theme';
import { ThemeColorScheme } from '../types/theme';
import grey from '../variables/colors/grey';
import { withHexAlpha } from './glassColorHandlers';

/** Палитра поверхностей компонента Pagination */
export type PaginationSurfacePalette = {
  barBackground: string;
  barBorder: string;
  itemHoverBackground: string;
  activePageBackground: (accentColor: string) => string;
  activePageHoverBackground: (accentColor: string) => string;
  activePageRing: (accentColor: string) => string;
  activePageGlow: (accentColor: string) => string;
};

/** Прозрачность активной страницы — как у glass-кнопок */
const ACTIVE_PAGE_ALPHA = 0.54;

const ACTIVE_PAGE_HOVER_ALPHA = 0.64;

/**
 * Glass-палитра пагинации.
 * @param isDark — тёмная ли базовая палитра
 * @param borderSecondary — нейтральная граница из темы
 */
function getPaginationGlassSurfacePalette(
  isDark: boolean,
  borderSecondary: string,
): PaginationSurfacePalette {
  const barBackground = isDark
    ? 'rgba(255, 255, 255, 0.06)'
    : 'rgba(255, 255, 255, 0.26)';
  const itemHoverBackground = isDark
    ? 'rgba(255, 255, 255, 0.10)'
    : 'rgba(255, 255, 255, 0.18)';

  return {
    barBackground,
    barBorder: `1px solid ${borderSecondary}`,
    itemHoverBackground,
    activePageBackground: (accentColor) => withHexAlpha(accentColor, ACTIVE_PAGE_ALPHA),
    activePageHoverBackground: (accentColor) =>
      withHexAlpha(accentColor, ACTIVE_PAGE_HOVER_ALPHA),
    activePageRing: (accentColor) =>
      `0 0 0 1px ${withHexAlpha(accentColor, Math.min(ACTIVE_PAGE_ALPHA + 0.12, 1))}`,
    activePageGlow: (accentColor) =>
      `0 4px 14px ${withHexAlpha(accentColor, 0.32)}`,
  };
}

/**
 * Возвращает палитру поверхностей Pagination с учётом glass-темы.
 * @param theme — тема styled-components (colors, mode, paginations)
 */
export function getPaginationSurfacePalette(theme: {
  colors: Colors;
  mode?: ThemeColorScheme;
  paginations?: PaginationTheme;
}): PaginationSurfacePalette {
  const isDark = theme.mode === ThemeColorScheme.DARK;

  if (theme.paginations?.settings?.backdropFilter) {
    return getPaginationGlassSurfacePalette(isDark, theme.colors.borderSecondary);
  }

  const barBackground = isDark ? grey[800] : theme.colors.backgroundSecondary;

  return {
    barBackground,
    barBorder: 'none',
    itemHoverBackground: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f5f5f5',
    activePageBackground: (accentColor) => accentColor,
    activePageHoverBackground: (accentColor) => accentColor,
    activePageRing: (accentColor) =>
      `0 0 0 1px color-mix(in srgb, ${accentColor} 45%, transparent)`,
    activePageGlow: (accentColor) =>
      `0 4px 14px color-mix(in srgb, ${accentColor} 40%, transparent)`,
  };
}

/**
 * CSS box-shadow активной страницы.
 * @param surfaces — палитра пагинации
 * @param accentColor — акцентный цвет
 */
export function getPaginationActivePageBoxShadow(
  surfaces: PaginationSurfacePalette,
  accentColor: string,
): string {
  return `${surfaces.activePageRing(accentColor)}, ${surfaces.activePageGlow(accentColor)}`;
}
