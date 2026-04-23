import styled, { css } from 'styled-components';
import { ThemeMode } from '@/types/theme';
import grey from '@/variables/colors/grey';
import { neutral } from '@/variables/colors/neutral';

/**
 * Корневой `nav`: центрирует плашку пагинации.
 */
export const PaginationNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.primary};
`;

/**
 * Контейнер-плашка (макет Figma: светлая — белый фон, тёмная — ~#333, скруглённые края).
 */
export const PaginationBar = styled.div`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 4px 8px;
  gap: 2px;
  border-radius: 9999px;
  background: ${({ theme }) =>
    theme.mode === ThemeMode.DARK ? '#333333' : theme.colors.backgroundSecondary};
`;

/**
 * Список номеров страниц и разрывов.
 * @property $gap — зазор между пунктами внутри плашки
 */
export const PaginationList = styled.ul<{ $gap: string }>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ $gap }) => $gap};
  margin: 0;
  padding: 0;
  list-style: none;
`;

/** Элемент списка (`li`) */
export const PaginationListItem = styled.li`
  display: flex;
  align-items: center;
`;

/**
 * Кнопка «назад» / «вперёд» внутри плашки (макет: без круга, как у номеров).
 * @property $minW — мин. ширина
 * @property $minH — мин. высота
 * @property $radius — скругление ячейки
 */
export const PaginationArrowButton = styled.button<{
  $minW: string;
  $minH: string;
  $radius: string;
}>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ $minW }) => $minW};
  min-height: ${({ $minH }) => $minH};
  padding: 0;
  border: none;
  border-radius: ${({ $radius }) => $radius};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover:enabled {
    background: ${({ theme }) =>
      theme.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, 0.08)' : '#f5f5f5'};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/**
 * Кнопка номера страницы.
 * @property $active — текущая страница (синяя заливка и «glow» по макету)
 * @property $disabled — глобальный disabled пагинации (все номера неактивны)
 */
export const PageButton = styled.button<{
  $active: boolean;
  $disabled: boolean;
  $minW: string;
  $minH: string;
  $fontSize: string;
  $radius: string;
}>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ $minW }) => $minW};
  min-height: ${({ $minH }) => $minH};
  padding: 0 4px;
  border: none;
  border-radius: ${({ $radius }) => $radius};
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: 500;
  line-height: 1.2;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease,
    opacity 0.15s ease;

  ${({ theme, $active, $disabled }) => {
    const dark = theme.mode === ThemeMode.DARK;
    const idleColor = dark ? neutral[10] : grey[900];
    const primary = theme.colors.primary;

    if ($disabled) {
      return css`
        opacity: 0.45;
        cursor: not-allowed;
        pointer-events: none;
        color: ${idleColor};
        background: transparent;
        box-shadow: none;
      `;
    }

    if ($active) {
      return css`
        color: #ffffff;
        background: ${primary};
        cursor: default;
        box-shadow:
          0 0 0 1px color-mix(in srgb, ${primary} 45%, transparent),
          0 4px 14px color-mix(in srgb, ${primary} 40%, transparent);

        &:hover {
          color: #ffffff;
          background: ${primary};
          box-shadow:
            0 0 0 1px color-mix(in srgb, ${primary} 45%, transparent),
            0 4px 14px color-mix(in srgb, ${primary} 40%, transparent);
        }
      `;
    }

    return css`
      color: ${idleColor};
      background: transparent;
      cursor: pointer;

      &:hover {
        background: ${dark ? 'rgba(255, 255, 255, 0.08)' : '#f5f5f5'};
      }

      &:focus {
        outline: none;
      }

      &:focus-visible {
        outline: 2px solid ${primary};
        outline-offset: 2px;
      }
    `;
  }}
`;

/**
 * Разрыв «…» между группами номеров.
 * @property $minH — выравнивание по высоте с кнопками страниц
 */
export const Ellipsis = styled.span<{ $minH?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.75em;
  min-height: ${({ $minH }) => $minH ?? 'auto'};
  padding: 0 2px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  user-select: none;
  color: ${({ theme }) => (theme.mode === ThemeMode.DARK ? neutral[200] : grey[800])};
`;
