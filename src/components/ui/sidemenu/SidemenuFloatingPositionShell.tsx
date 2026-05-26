import React from 'react';
import type { SidemenuHorizontalPlacement, SidemenuVerticalAlignment } from '@/types/ui';
import { SidemenuFloatingPositionShellRoot } from './SidemenuFloatingPositionShell.style';

export interface SidemenuFloatingPositionShellProps {
  /** Левый или правый край экрана */
  horizontalPlacement: SidemenuHorizontalPlacement;
  /** Верх / центр / низ — позиция всей панели */
  verticalAlignment: SidemenuVerticalAlignment;
  /** z-index слоя (по умолчанию как у off-screen) */
  zIndex: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Оболочка для плавающей панели (**edgeAttached** = false, без **offScreenHoverReveal**):
 * фиксирует компонент у выбранного края и по вертикали экрана.
 */
export const SidemenuFloatingPositionShell: React.FC<SidemenuFloatingPositionShellProps> = ({
  horizontalPlacement,
  verticalAlignment,
  zIndex,
  className,
  children,
}) => (
  <SidemenuFloatingPositionShellRoot
    className={className}
    $horizontalPlacement={horizontalPlacement}
    $verticalAlignment={verticalAlignment}
    $zIndex={zIndex}
    role="presentation"
  >
    {children}
  </SidemenuFloatingPositionShellRoot>
);
