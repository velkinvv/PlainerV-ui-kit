import React from 'react';
import { clsx } from 'clsx';
import type { LayoutHeaderProps } from '../../../types/ui';
import { LayoutHeaderSlot } from './Layout.style';

/**
 * Шапка каркаса страницы.
 * @param props.sticky - Липкий верх
 * @param props.children - Содержимое
 */
export const LayoutHeader: React.FC<LayoutHeaderProps> = ({
  sticky = false,
  className,
  children,
}) => (
  <LayoutHeaderSlot className={clsx('ui-layout-header', className)} $sticky={sticky}>
    {children}
  </LayoutHeaderSlot>
);

LayoutHeader.displayName = 'Layout.Header';
