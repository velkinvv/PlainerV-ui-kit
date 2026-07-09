import React from 'react';
import { clsx } from 'clsx';
import { FloatingMenuOrientation, type FloatingMenuDividerProps } from '@/types/ui';
import { useFloatingMenuRootContext } from './FloatingMenuContext';
import { FloatingMenuDivider as StyledDivider } from './FloatingMenu.style';

/**
 * Разделитель между группами: вертикальная линия (horizontal) или горизонтальная (vertical).
 */
export const FloatingMenuDivider: React.FC<FloatingMenuDividerProps> = ({ className }) => {
  const { orientation } = useFloatingMenuRootContext();
  const isVerticalLayout = orientation === FloatingMenuOrientation.VERTICAL;

  return (
    <StyledDivider
      className={clsx('ui-floating-menu-divider', className)}
      $orientation={orientation}
      role="separator"
      aria-orientation={isVerticalLayout ? 'horizontal' : 'vertical'}
    />
  );
};

FloatingMenuDivider.displayName = 'FloatingMenuDivider';
