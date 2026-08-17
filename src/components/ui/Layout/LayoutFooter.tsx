import React from 'react';
import { clsx } from 'clsx';
import type { LayoutFooterProps } from '../../../types/ui';
import { LayoutFooterSlot } from './Layout.style';

/**
 * Подвал каркаса страницы.
 * @param props.children - Содержимое
 */
export const LayoutFooter: React.FC<LayoutFooterProps> = ({ className, children }) => (
  <LayoutFooterSlot className={clsx('ui-layout-footer', className)}>{children}</LayoutFooterSlot>
);

LayoutFooter.displayName = 'Layout.Footer';
