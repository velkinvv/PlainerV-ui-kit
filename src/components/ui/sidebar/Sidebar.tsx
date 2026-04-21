import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { MenuItemContent, MenuIcon, MenuLabel } from './Sidebar.style';

import { clsx } from 'clsx';
import type { SidebarProps, SidebarItem } from '../../../types/ui';
import { SidebarVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { BorderRadiusHandler, BoxShadowHandler } from '../../../handlers/uiHandlers';

const SidebarContainer = styled(motion.div)<{
  $variant?: SidebarVariant;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => BorderRadiusHandler(theme?.borderRadius ?? theme.globalSize)};
  padding: 0 0 30px 0;
  height: 741px;
  box-shadow: ${BoxShadowHandler(Size.LG)};
  position: relative;
  overflow: hidden;

  ${({ $variant = SidebarVariant.EXPANDED }) => {
    switch ($variant) {
      case SidebarVariant.EXPANDED:
        return css`
          width: 310px;
        `;
      case SidebarVariant.COLLAPSED:
        return css`
          width: 100px;
        `;
      default:
        return css`
          width: 310px;
        `;
    }
  }}
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 30px 0;
  width: 100%;
`;

const LogoIcon = styled.div`
  width: 24px;
  height: 21px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LogoTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 500;
  font-size: 12px;
  line-height: 1.219em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const Divider = styled.div`
  width: 200px;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 0 10px 10px;
`;

const CollapsedDivider = styled.div`
  width: 50px;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 0 10px 10px;
`;

const MenuItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  flex: 1;
`;

const MenuItem = styled(motion.div)<{
  $active?: boolean;
  $variant?: SidebarVariant;
}>`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px 20px;
  width: 270px;
  height: 59px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  ${({ $variant = SidebarVariant.EXPANDED }) => {
    switch ($variant) {
      case SidebarVariant.EXPANDED:
        return css`
          justify-content: space-between;
        `;
      case SidebarVariant.COLLAPSED:
        return css`
          justify-content: center;
          width: 78px;
          flex-direction: column;
          gap: 11px;
          padding: 18px 10px;
        `;
      default:
        return css`
          justify-content: space-between;
        `;
    }
  }}

  ${({ $active, theme }) =>
    $active &&
    css`
      background: linear-gradient(
        90deg,
        ${theme.colors.background} 0%,
        ${theme.colors.backgroundSecondary} 52.6%,
        ${theme.colors.background} 100%
      );
      border-radius: 0;
    `}

  &:hover {
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.background} 0%,
      ${({ theme }) => theme.colors.backgroundSecondary} 52.6%,
      ${({ theme }) => theme.colors.background} 100%
    );
  }
`;

const ActiveIndicator = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 19px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 21px;
  box-shadow: 0px 0px 7px 0px ${({ theme }) => `${theme.colors.primary}66`};
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.background};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 500;
  font-size: 12px;
  line-height: 1.219em;
  z-index: 1;
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  padding: 0 20px;
`;

const NotificationButton = styled(motion.button)`
  position: relative;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.border};
  }
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.border};
  }
`;

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  logo,
  variant = SidebarVariant.EXPANDED,
  className,
  onItemClick,
}) => {
  const handleItemClick = (item: SidebarItem) => {
    onItemClick?.(item);
    item.onClick?.();
  };

  return (
    <SidebarContainer
      $variant={variant}
      className={clsx('ui-sidebar', className)}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo Section */}
      <LogoSection>
        {logo?.icon && <LogoIcon>{logo.icon}</LogoIcon>}
        {variant === SidebarVariant.EXPANDED && logo?.title && <LogoTitle>{logo.title}</LogoTitle>}
      </LogoSection>

      {/* Divider */}
      {variant === SidebarVariant.EXPANDED ? <Divider /> : <CollapsedDivider />}

      {/* Menu Items */}
      <MenuItemsContainer>
        {items.map(item => (
          <MenuItem
            key={item.id}
            $active={item.active}
            $variant={variant}
            onClick={() => handleItemClick(item)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MenuItemContent $variant={variant}>
              <MenuIcon $active={item.active}>{item.icon}</MenuIcon>
              {variant === SidebarVariant.EXPANDED && (
                <MenuLabel $active={item.active}>{item.label}</MenuLabel>
              )}
            </MenuItemContent>
            {item.active && <ActiveIndicator />}
            {item.notificationCount && item.notificationCount > 0 && (
              <NotificationBadge>{item.notificationCount}</NotificationBadge>
            )}
          </MenuItem>
        ))}
      </MenuItemsContainer>

      {/* Bottom Section */}
      <BottomSection>
        <NotificationButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <MenuIcon>
            {/* Bell icon placeholder */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C13.1 2 14 2.9 14 4V4.29C17.03 5.11 19 7.73 19 11V16L21 18V19H3V18L5 16V11C5 7.73 6.97 5.11 10 4.29V4C10 2.9 10.9 2 12 2ZM12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </MenuIcon>
          <NotificationBadge>1</NotificationBadge>
        </NotificationButton>

        <UserAvatar>
          {/* User avatar placeholder */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z"
              fill="currentColor"
            />
            <path
              d="M10 12C6.68629 12 4 14.6863 4 18V20H16V18C16 14.6863 13.3137 12 10 12Z"
              fill="currentColor"
            />
          </svg>
        </UserAvatar>
      </BottomSection>
    </SidebarContainer>
  );
};
