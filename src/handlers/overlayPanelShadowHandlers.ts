import { css, type RuleSet } from 'styled-components';
import type { ThemeType } from '@/types/theme';
import { lightShadows } from '@/variables/shadows';
import { resolveOverlayPanelBackground } from './overlayPanelGlassHandlers';

/** Запасная тень всплывающей панели, если в теме нет `boxShadow.dropdown` */
const OVERLAY_PANEL_BOX_SHADOW_FALLBACK = lightShadows.dropdown;

/**
 * Тень для всплывающих панелей: popover, dropdown, select, меню и аналоги.
 * Берёт `theme.boxShadow.dropdown` — токен «Shadow/8px» из макета.
 * @param theme — активная тема styled-components
 */
export function overlayPanelBoxShadowFromTheme(theme: ThemeType): string {
  return theme.boxShadow?.dropdown ?? theme.boxShadow?.sm ?? OVERLAY_PANEL_BOX_SHADOW_FALLBACK;
}

/**
 * Фон всплывающей панели: в glass — лёгкая прозрачность, иначе fallback или `backgroundSecondary`.
 * @param theme — активная тема styled-components
 * @param fallbackBackground — фон в обычной теме
 */
export function overlayPanelBackgroundFromTheme(
  theme: ThemeType,
  fallbackBackground?: string,
): string {
  return resolveOverlayPanelBackground(theme, fallbackBackground);
}

/**
 * Backdrop-filter для всплывающих панелей (glass vibrancy).
 * @param theme — активная тема styled-components
 */
export function overlayPanelBackdropFilterFromTheme(theme: ThemeType): string | undefined {
  return (
    theme.dropdowns?.settings?.backdropFilter ?? theme.surfaceMaterial?.backdropFilter ?? undefined
  );
}

/**
 * CSS фона и vibrancy для popover, dropdown, календаря, time-picker и аналогов.
 * @param theme — активная тема styled-components
 */
export function overlayPanelSurfaceCss(theme: ThemeType): RuleSet {
  const backdropFilter = overlayPanelBackdropFilterFromTheme(theme);

  return css`
    background: ${overlayPanelBackgroundFromTheme(theme)};
    ${backdropFilter
      ? css`
          backdrop-filter: ${backdropFilter};
          -webkit-backdrop-filter: ${backdropFilter};
        `
      : ''}
  `;
}
