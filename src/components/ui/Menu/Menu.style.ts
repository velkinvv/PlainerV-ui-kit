import styled, { css } from 'styled-components';
import { ThemeMode, type ThemeType } from '@/types/theme';
import { buildHoverPressMotionCss } from '../../../handlers/uiMotionStyleHandlers';

/** Внешняя «бумага» списка меню (тень и граница как у выпадающих панелей) */
export const MenuSurface = styled.div`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.boxShadow.dropdown};
  padding: 4px 0;
  min-width: 180px;
`;

type MenuListProps = {
  $maxHeight?: string | number;
};

/** Список с role="menu" */
export const MenuList = styled.ul<MenuListProps>`
  list-style: none;
  margin: 0;
  padding: 0;
  outline: none;
  max-height: ${({ $maxHeight }) =>
    $maxHeight == null ? 'none' : typeof $maxHeight === 'number' ? `${$maxHeight}px` : $maxHeight};
  overflow-y: auto;
`;

export const MenuItemRow = styled.li`
  margin: 0;
  padding: 0;
`;

const menuItemButtonStyles = (props: {
  theme: ThemeType;
  $dense: boolean;
  $selected: boolean;
  $destructive: boolean;
}) => {
  const { theme, $dense, $selected, $destructive } = props;
  const isDark = theme.mode === ThemeMode.DARK;
  const hoverBg = isDark ? '#2a2a2a' : '#f5f5f5';
  const selectedBg =
    theme.mode === ThemeMode.DARK
      ? `color-mix(in srgb, ${theme.colors.primary} 22%, ${theme.colors.background})`
      : `color-mix(in srgb, ${theme.colors.primary} 10%, ${theme.colors.background})`;

  return css`
    display: flex;
    align-items: center;
    width: 100%;
    min-height: ${$dense ? 32 : 40}px;
    padding: ${$dense ? '6px 12px' : '10px 14px'};
    gap: 10px;
    border: none;
    border-radius: 6px;
    margin: 0 4px;
    font: inherit;
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    color: ${$destructive ? theme.colors.danger : theme.colors.text};
    background: transparent;
    cursor: pointer;
    transition:
      background 0.12s ease,
      color 0.12s ease,
      transform 0.12s ease;
    will-change: transform, background-color;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.45;
      color: ${theme.colors.textDisabled};
    }

    &:not(:disabled):hover {
      background: ${hoverBg};
    }
    ${buildHoverPressMotionCss({
      hoverSelector: '&:not(:disabled):hover',
      activeSelector: '&:not(:disabled):active',
      hoverTransform: 'translateY(-1px)',
      activeTransform: 'scale(0.98)',
    })}

    ${$selected && !$destructive
      ? css`
          background: ${selectedBg};
          color: ${theme.colors.primary};
          font-weight: 500;
        `
      : ''}

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 0;
    }
  `;
};

type MenuItemControlProps = {
  $dense: boolean;
  $selected: boolean;
  $destructive: boolean;
};

/** Кнопка пункта меню (`role="menuitem"`) */
export const MenuItemControl = styled.button<MenuItemControlProps>`
  ${(props) => menuItemButtonStyles(props)}
`;
