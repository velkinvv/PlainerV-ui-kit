import React from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '../../../themes/ThemeProvider';
import { Icon } from '../Icon';
import type { ThemeToggleProps } from '../../../types/ui';
import { ThemeMode } from '../../../types/theme';
import { SunIcon, MoonIcon } from './ThemeToggle.style';
import { IconSize } from '../../../types/sizes';
import { BorderRadiusHandler, TransitionHandler } from '../../../handlers/uiHandlers';

const ToggleContainer = styled(motion.button)`
  position: relative;
  width: 48px;
  height: 24px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => BorderRadiusHandler(theme?.borderRadius ?? theme.globalSize)};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 2px;
  transition: ${TransitionHandler('background-color', 0.3)};
  border: none;
  outline: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const ToggleHandle = styled(motion.div)`
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { mode, toggle } = useTheme();
  const isDark = mode === ThemeMode.DARK;
  const prefersReducedMotion = useReducedMotion();

  return (
    <ToggleContainer
      onClick={toggle}
      className={className}
      {...(!prefersReducedMotion ? { whileTap: { scale: 0.95 } } : {})}
    >
      <SunIcon>
        <Icon name="IconPlainerSun" size={IconSize.MD} />
      </SunIcon>
      <MoonIcon>
        <Icon name="IconPlainerMoon" size={IconSize.MD} />
      </MoonIcon>
      <ToggleHandle
        layout
        animate={{
          x: isDark ? 24 : 0,
        }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }
        }
      />
    </ToggleContainer>
  );
};
