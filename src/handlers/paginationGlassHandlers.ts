import type { Colors, PaginationTheme } from '../types/theme';
import { ThemeColorScheme } from '../types/theme';
import grey from '../variables/colors/grey';
import { mixColorWithTransparent, withHexAlpha } from './glassColorHandlers';

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
 * Glass-палитра пагинации из `onAccent`.
 * @param isDark — тёмная ли базовая палитра
 * @param borderSecondary — нейтральная граница из темы
 * @param onAccent — цвет текста/поверхности на акценте
 */
function getPaginationGlassSurfacePalette(
  isDark: boolean,
  borderSecondary: string,
  onAccent: string,
): PaginationSurfacePalette {
  const barBackground = mixColorWithTransparent(onAccent, isDark ? 6 : 26);
  const itemHoverBackground = mixColorWithTransparent(onAccent, isDark ? 10 : 18);

  return {
    barBackground,
    barBorder: `1px solid ${borderSecondary}`,
    itemHoverBackground,
    activePageBackground: (accentColor) => withHexAlpha(accentColor, ACTIVE_PAGE_ALPHA),
    activePageHoverBackground: (accentColor) =>
      withHexAlpha(accentColor, ACTIVE_PAGE_HOVER_ALPHA),
    activePageRing: (accentColor) =>
      `0 0 0 1px ${withHexAlpha(accentColor, Math.min(ACTIVE_PAGE_ALPHA + 0.12, 1))}`,
    activePageGlow: (accentColor) => `0 4px 14px ${withHexAlpha(accentColor, 0.32)}`,
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
  const onAccent = theme.colors?.onAccent ?? '#ffffff';

  if (theme.paginations?.settings?.backdropFilter) {
    return getPaginationGlassSurfacePalette(isDark, theme.colors.borderSecondary, onAccent);
  }

  const barBackground = isDark ? grey[800] : theme.colors.backgroundSecondary;

  return {
    barBackground,
    barBorder: 'none',
    itemHoverBackground: isDark
      ? mixColorWithTransparent(onAccent, 8)
      : theme.colors.backgroundTertiary,
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
