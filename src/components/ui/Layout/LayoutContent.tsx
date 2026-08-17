import React from 'react';
import { clsx } from 'clsx';
import type { LayoutContentProps } from '../../../types/ui';
import { getLayoutContentFlexOrder } from './handlers';
import { useLayoutContext } from './LayoutContext';
import { LayoutContentSlot } from './Layout.style';

/**
 * Основная область каркаса. Всегда `<main>`.
 * @param props.children - Содержимое страницы
 */
export const LayoutContent: React.FC<LayoutContentProps> = ({ className, children }) => {
  const { scrollMode } = useLayoutContext();
  const isContentScroll = scrollMode === 'content';

  return (
    <LayoutContentSlot
      className={clsx('ui-layout-content', className)}
      $scrollContent={isContentScroll}
      $order={getLayoutContentFlexOrder()}
      data-scroll={isContentScroll ? 'content' : undefined}
    >
      {children}
    </LayoutContentSlot>
  );
};

LayoutContent.displayName = 'Layout.Content';
