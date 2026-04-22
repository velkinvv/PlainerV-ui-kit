import styled, { css } from 'styled-components';
import { ThemeMode } from '@/types/theme';
import grey from '@/variables/colors/grey';
import { neutral } from '@/variables/colors/neutral';

/**
 * Корневой `nav` пагинации.
 * @property $gap - Расстояние между группами (стрелки и список)
 */
export const PaginationNav = styled.nav<{ $gap: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ $gap }) => $gap};
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.primary};
`;

/**
 * Список номеров страниц и разрывов.
 * @property $gap - Расстояние между пунктами
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

/**
 * Элемент списка (`li`).
 */
export const PaginationListItem = styled.li`
  display: flex;
  align-items: center;
`;

/**
 * Кнопка номера страницы.
 * @property $active - Текущая страница
 * @property $dim - Отключена (вместе с `disabled`)
 */
export const PageButton = styled.button<{
  $active: boolean;
  $dim: boolean;
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
  padding: 0 6px;
  border-radius: ${({ $radius }) => $radius};
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: 500;
  line-height: 1.2;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease,
    opacity 0.15s ease;

  ${({ theme, $active, $dim }) => {
    const dark = theme.mode === ThemeMode.DARK;
    const idleColor = dark ? neutral[200] : grey[800];
    const borderIdle = dark ? neutral[600] : grey[300];
    const hoverBg = dark ? neutral[700] : grey[200];

    if ($dim) {
      return css`
        opacity: 0.45;
        cursor: not-allowed;
        pointer-events: none;
        color: ${idleColor};
        background: transparent;
        border: 1px solid ${borderIdle};
      `;
    }

    if ($active) {
      return css`
        color: ${neutral[10]};
        background: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary};
        cursor: default;

        &:hover {
          color: ${neutral[10]};
          background: ${theme.colors.primary};
          border-color: ${theme.colors.primary};
        }
      `;
    }

    return css`
      color: ${idleColor};
      background: transparent;
      border: 1px solid ${borderIdle};
      cursor: pointer;

      &:hover {
        background: ${hoverBg};
      }

      &:focus-visible {
        outline: 2px solid ${theme.colors.primary};
        outline-offset: 2px;
      }
    `;
  }}
`;

/**
 * Разрыв «…» между группами номеров.
 */
export const Ellipsis = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.75em;
  padding: 0 2px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  user-select: none;
  color: ${({ theme }) => (theme.mode === ThemeMode.DARK ? neutral[400] : grey[500])};
`;
