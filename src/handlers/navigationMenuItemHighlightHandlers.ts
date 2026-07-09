import { css } from 'styled-components';
import type { ThemeType } from '@/types/theme';

/** Длительность подсветки только что добавленного пункта (ms) */
export const NAVIGATION_MENU_ITEM_HIGHLIGHT_PULSE_MS = 900;

/**
 * CSS-пульс подсветки для недавно добавленного пункта навигации.
 *
 * @param theme — активная тема
 */
export function navigationMenuItemHighlightPulseCss(theme: ThemeType) {
  const primary = theme.colors.primary;

  return css`
    animation: ui-navigation-menu-item-highlight-pulse 0.85s ease-out;

    @keyframes ui-navigation-menu-item-highlight-pulse {
      0% {
        box-shadow: 0 0 0 0 color-mix(in srgb, ${primary} 0%, transparent);
        background-color: color-mix(in srgb, ${primary} 0%, transparent);
      }

      35% {
        box-shadow: 0 0 0 3px color-mix(in srgb, ${primary} 38%, transparent);
        background-color: color-mix(in srgb, ${primary} 20%, transparent);
      }

      70% {
        box-shadow: 0 0 0 1px color-mix(in srgb, ${primary} 16%, transparent);
        background-color: color-mix(in srgb, ${primary} 8%, transparent);
      }

      100% {
        box-shadow: 0 0 0 0 color-mix(in srgb, ${primary} 0%, transparent);
        background-color: transparent;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `;
}
