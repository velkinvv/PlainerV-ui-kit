import type { ThemeType } from '../types/theme';
import { ThemeColorScheme } from '../types/theme';
import { isGlassColorScheme } from './glassSurfaceHandlers';

/** Непрозрачность glass-панели выпадающих списков (как pagination / accordion) */
const PANEL_ALPHA_LIGHT = 0.26;

const PANEL_ALPHA_DARK = 0.06;

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
 */
export function getOverlayPanelGlassBackground(mode: ThemeColorScheme): string {
  if (mode === ThemeColorScheme.DARK) {
    return `rgba(255, 255, 255, ${PANEL_ALPHA_DARK})`;
  }

  return `rgba(255, 255, 255, ${PANEL_ALPHA_LIGHT})`;
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
    return getOverlayPanelGlassBackground(theme.mode);
  }

  return fallbackBackground ?? theme.colors.backgroundSecondary;
}
