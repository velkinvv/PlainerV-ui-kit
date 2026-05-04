import React from 'react';
import { clsx } from 'clsx';
import type { FloatingMenuDividerProps } from '@/types/ui';
import { FloatingMenuDivider as StyledDivider } from './FloatingMenu.style';

/**
 * Вертикальный разделитель между группами действий.
 */
export const FloatingMenuDivider: React.FC<FloatingMenuDividerProps> = ({ className }) => (
  <StyledDivider
    className={clsx('ui-floating-menu-divider', className)}
    role="separator"
    aria-orientation="vertical"
  />
);

FloatingMenuDivider.displayName = 'FloatingMenuDivider';
