import styled, { css } from 'styled-components';
import { ThemeMode, type ThemeType } from '@/types/theme';
import { MenuActiveAppearance } from '@/types/ui';

/** Корневой контейнер навигации */
export const MenuNav = styled.nav`
  width: 100%;
`;

/** Список пунктов меню */
export const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

/** Обёртка пункта в списке */
export const MenuRow = styled.li`
  margin: 0;
  padding: 0;
  width: 100%;
`;

const menuItemSurface = (p: {
  theme: ThemeType;
  $collapsed: boolean;
  $active: boolean;
  $disabled: boolean;
  $appearance: MenuActiveAppearance;
}) => {
  const { theme, $collapsed, $active, $disabled, $appearance } = p;
  const primary = theme.colors.primary;
  const isDark = theme.mode === ThemeMode.DARK;

  const defaultBg = isDark ? '#1f1f1f' : theme.colors.backgroundSecondary;
  const hoverBg = isDark ? '#2a2a2a' : '#f5f5f5';

  const activeBarText = primary;
  const activeHighlightBg =
    theme.mode === ThemeMode.DARK
      ? `color-mix(in srgb, ${primary} 18%, ${defaultBg})`
      : `color-mix(in srgb, ${primary} 12%, ${theme.colors.backgroundSecondary})`;

  return css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: ${$collapsed ? 'center' : 'flex-start'};
    gap: 8px;
    width: 100%;
    min-height: 40px;
    padding: ${$collapsed ? '10px' : '10px 12px'};
    border: none;
    border-radius: 6px;
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    text-decoration: none;
    cursor: ${$disabled ? 'not-allowed' : 'pointer'};
    color: ${theme.colors.text};
    background: ${defaultBg};
    transition:
      background 0.15s ease,
      color 0.15s ease,
      opacity 0.15s ease;

    ${$disabled
      ? css`
          opacity: 0.45;
          color: ${theme.colors.textDisabled};
        `
      : css`
          &:hover {
            background: ${hoverBg};
          }
        `}

    ${!$disabled && $active && $appearance === MenuActiveAppearance.BAR
      ? css`
          color: ${activeBarText};
          background: ${defaultBg};
        `
      : ''}

    ${!$disabled && $active && $appearance === MenuActiveAppearance.HIGHLIGHTED
      ? css`
          color: ${activeBarText};
          background: ${activeHighlightBg};
        `
      : ''}

    ${!$disabled && $active && $appearance === MenuActiveAppearance.SOLID
      ? css`
          color: #ffffff;
          background: ${primary};

          &:hover:enabled {
            background: ${theme.colors.primaryHover};
          }
        `
      : ''}

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      bottom: 8px;
      width: 3px;
      border-radius: 0 2px 2px 0;
      background: transparent;
      transition: background 0.15s ease;
    }

    ${!$disabled && $active && $appearance !== MenuActiveAppearance.SOLID
      ? css`
          &::before {
            background: ${primary};
          }
        `
      : ''}

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: 2px solid ${primary};
      outline-offset: 2px;
    }
  `;
};

type MenuItemSurfaceProps = {
  $collapsed: boolean;
  $active: boolean;
  $disabled: boolean;
  $appearance: MenuActiveAppearance;
};

/** Интерактивная поверхность пункта (кнопка) */
export const MenuItemButton = styled.button<MenuItemSurfaceProps>`
  ${props => menuItemSurface(props)}
`;

/** Интерактивная поверхность пункта (ссылка) */
export const MenuItemAnchor = styled.a<MenuItemSurfaceProps>`
  ${props => menuItemSurface(props)}
`;

/** Обёртка иконки (для «плавающего» бейджа в collapsed) */
export const MenuItemIconWrap = styled.span`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  color: currentColor;
`;

/**
 * Бейдж уведомления
 * @property $floating — в режиме collapsed закрепляется у иконки
 */
export const MenuItemBadge = styled.span<{ $floating?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  color: #ffffff;
  background: #ff4d4f;
  flex-shrink: 0;

  ${({ $floating }) =>
    $floating
      ? css`
          position: absolute;
          top: -6px;
          right: -6px;
          min-width: 16px;
          height: 16px;
          font-size: 10px;
          padding: 0 4px;
        `
      : css`
          margin-left: auto;
        `}
`;

/** Текстовая подпись пункта */
export const MenuItemLabel = styled.span<{ $collapsed?: boolean }>`
  flex: 1;
  min-width: 0;

  ${({ $collapsed }) =>
    $collapsed
      ? css`
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        `
      : ''}
`;

/** Суффикс (стрелка и т.п.) */
export const MenuItemSuffix = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  margin-left: 4px;
  color: currentColor;
`;
