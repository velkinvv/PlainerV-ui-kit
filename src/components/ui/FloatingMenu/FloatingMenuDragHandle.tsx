import React, { useEffect } from 'react';
import { clsx } from 'clsx';
import type { FloatingMenuDragHandleProps } from '@/types/ui';
import { useFloatingMenuRootContext } from './FloatingMenuContext';
import { FloatingMenuDragHandleGrip, FloatingMenuDragHandleRoot } from './FloatingMenu.style';

/**
 * Зона захвата для перетаскивания панели (только при `dragSource={HANDLE}` на `FloatingMenu`).
 * @property children — иконка «грип» (по умолчанию ⋮⋮)
 * @property className — класс
 */
export const FloatingMenuDragHandle: React.FC<FloatingMenuDragHandleProps> = ({
  className,
  children,
}) => {
  const { setHasDragHandle } = useFloatingMenuRootContext();

  useEffect(() => {
    setHasDragHandle(true);
    return () => setHasDragHandle(false);
  }, [setHasDragHandle]);

  return (
    <FloatingMenuDragHandleRoot
      className={clsx('ui-floating-menu-drag-handle', className)}
      data-floating-menu-drag-handle
      aria-label="Переместить панель"
    >
      {children ?? (
        <FloatingMenuDragHandleGrip aria-hidden>⋮⋮</FloatingMenuDragHandleGrip>
      )}
    </FloatingMenuDragHandleRoot>
  );
};

FloatingMenuDragHandle.displayName = 'FloatingMenuDragHandle';
