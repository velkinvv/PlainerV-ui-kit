import { css } from 'styled-components';
import type { ThemeType } from '@/types/theme';

/** Базовая толщина полосы прокрутки (WebKit). */
export const PLAINER_SCROLLBAR_SIZE_CSS_VAR = '--plainer-scrollbar-size';

/** Толщина при наведении на полосу (WebKit). */
export const PLAINER_SCROLLBAR_SIZE_HOVER_CSS_VAR = '--plainer-scrollbar-size-hover';

/**
 * Глобальные стили скроллбара: тонкая полоса и плавное увеличение при наведении.
 * Подключается в `GlobalStyles`; элементы с `scrollbar-width: none` / скрытым WebKit-скроллом не затрагиваются.
 * @param theme — активная тема приложения
 */
export function globalScrollbarStyles(theme: ThemeType) {
  const thumbColor = theme.colors.borderSecondary;
  const thumbHoverColor = theme.colors.borderTertiary;
  const trackColor = 'transparent';

  return css`
    :root {
      ${PLAINER_SCROLLBAR_SIZE_CSS_VAR}: 8px;
      ${PLAINER_SCROLLBAR_SIZE_HOVER_CSS_VAR}: 11px;
    }

  /* Firefox */
    * {
      scrollbar-width: thin;
      scrollbar-color: ${thumbColor} ${trackColor};
    }

    @media (hover: hover) {
      * {
        transition: scrollbar-color 0.2s ease;
      }

      *:hover {
        scrollbar-color: ${thumbHoverColor} ${trackColor};
      }
    }

    /* Chromium, Safari, Edge */
    *::-webkit-scrollbar {
      width: var(${PLAINER_SCROLLBAR_SIZE_CSS_VAR});
      height: var(${PLAINER_SCROLLBAR_SIZE_CSS_VAR});
      transition:
        width 0.2s ease,
        height 0.2s ease;
    }

    *::-webkit-scrollbar:hover {
      width: var(${PLAINER_SCROLLBAR_SIZE_HOVER_CSS_VAR});
      height: var(${PLAINER_SCROLLBAR_SIZE_HOVER_CSS_VAR});
    }

    *::-webkit-scrollbar-track {
      background: ${trackColor};
      border-radius: 999px;
    }

    *::-webkit-scrollbar-thumb {
      background-color: ${thumbColor};
      border: 2px solid transparent;
      background-clip: padding-box;
      border-radius: 999px;
      transition:
        background-color 0.2s ease,
        border-width 0.2s ease;
    }

    *::-webkit-scrollbar-thumb:hover {
      background-color: ${thumbHoverColor};
      border-width: 0;
    }

    *::-webkit-scrollbar-corner {
      background: ${trackColor};
    }
  `;
}
