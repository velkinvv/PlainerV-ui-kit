import styled, { css } from 'styled-components';
import { SidebarVariant } from '../../../types/ui';

/** Transient-пропсы для кусков меню сайдбара (не путать с `SidebarProps` компонента) */
export interface SidebarMenuStyledProps {
  /** Вариант раскладки пункта меню */
  $variant?: SidebarVariant;
  /** Активный пункт */
  $active?: boolean;
}

/**
 * MenuItemContent
 */
export const MenuItemContent = styled.div<SidebarMenuStyledProps>`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 177px;
  height: 24px;

  ${({ $variant = SidebarVariant.EXPANDED }) => {
    switch ($variant) {
      case SidebarVariant.EXPANDED:
        return css`
          flex-direction: row;
        `;
      default:
        return css``;
    }
  }}
`;

/**
 * MenuIcon
 */
export const MenuIcon = styled.div<SidebarMenuStyledProps>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text)};
  transition: color 0.2s ease;
`;

/**
 * MenuLabel
 */
export const MenuLabel = styled.span<SidebarMenuStyledProps>`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;
  font-size: 14px;
  line-height: 1.219em;
  text-transform: capitalize;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.text)};
  white-space: nowrap;

  ${({ $variant = SidebarVariant.EXPANDED }) => {
    switch ($variant) {
      case SidebarVariant.EXPANDED:
        return css`
          display: block;
        `;
      default:
        return css``;
    }
  }}
`;
