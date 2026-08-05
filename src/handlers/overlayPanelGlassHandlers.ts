import type { ThemeType } from '../types/theme';
import { ThemeColorScheme } from '../types/theme';
import { mixColorWithTransparent } from './glassColorHandlers';
import { isGlassColorScheme } from './glassSurfaceHandlers';

/** Непрозрачность glass-панели выпадающих списков (как pagination / accordion), % */
const PANEL_ALPHA_LIGHT = 26;

const PANEL_ALPHA_DARK = 6;

/**
 * Проверяет, активна ли glass-тема для всплывающих панелей.
 * @param theme — активная тема styled-components
 */
export function isOverlayPanelGlassTheme(theme: Pick<ThemeType, 'surfaceMaterial'>): boolean {
  return isGlassColorScheme(theme);
}

/**
 * Glass-фон выпадающей панели (dropdown, select, popover, menu и аналоги).
 * @param mode — светлая или тёмная тема
 * @param onAccent — цвет текста/поверхности на акценте из темы
 */
export function getOverlayPanelGlassBackground(
  mode: ThemeColorScheme,
  onAccent?: string,
): string {
  const base = onAccent ?? '#ffffff';
  const alphaPercent = mode === ThemeColorScheme.DARK ? PANEL_ALPHA_DARK : PANEL_ALPHA_LIGHT;
  return mixColorWithTransparent(base, alphaPercent);
}

/**
 * Резолвит фон всплывающей панели с учётом glass-темы.
 * @param theme — активная тема styled-components
 * @param fallbackBackground — фон в обычной теме (например из `theme.dropdowns.variants`)
 */
export function resolveOverlayPanelBackground(
  theme: ThemeType,
  fallbackBackground?: string,
): string {
  if (isOverlayPanelGlassTheme(theme)) {
    return getOverlayPanelGlassBackground(theme.mode, theme.colors?.onAccent);
  }

  return fallbackBackground ?? theme.colors.backgroundSecondary;
}
