import type { ThemeType } from '@/types/theme';
import { lightShadows } from '@/variables/shadows';

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
