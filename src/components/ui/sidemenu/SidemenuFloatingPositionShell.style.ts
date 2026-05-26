import styled, { css } from 'styled-components';
import {
  SidemenuHorizontalPlacement,
  SidemenuVerticalAlignment,
} from '@/types/ui';
import {
  SIDEMENU_FLOATING_EDGE_INSET_PX,
  resolveSidemenuFixedHorizontalInset,
  resolveSidemenuFixedVerticalPosition,
} from '@/handlers/sidemenuPlacementHandlers';

/**
 * Fixed-оболочка для «оторванной» панели: позиция у края экрана по горизонтали и вертикали.
 * @property $horizontalPlacement — левый / правый край
 * @property $verticalAlignment — верх / центр / низ вьюпорта
 * @property $zIndex — слой над страницей (как у off-screen)
 */
export const SidemenuFloatingPositionShellRoot = styled.div<{
  $horizontalPlacement: SidemenuHorizontalPlacement;
  $verticalAlignment: SidemenuVerticalAlignment;
  $zIndex: number;
}>`
  position: fixed;
  z-index: ${({ $zIndex }) => $zIndex};
  box-sizing: border-box;
  pointer-events: none;

  ${({ $horizontalPlacement }) => {
    const horizontal = resolveSidemenuFixedHorizontalInset($horizontalPlacement);
  return css`
      left: ${horizontal.left ?? 'auto'};
      right: ${horizontal.right ?? 'auto'};
      padding-left: ${$horizontalPlacement === SidemenuHorizontalPlacement.LEFT
        ? `${SIDEMENU_FLOATING_EDGE_INSET_PX}px`
        : '0'};
      padding-right: ${$horizontalPlacement === SidemenuHorizontalPlacement.RIGHT
        ? `${SIDEMENU_FLOATING_EDGE_INSET_PX}px`
        : '0'};
    `;
  }}

  ${({ $verticalAlignment }) => {
    const vertical = resolveSidemenuFixedVerticalPosition($verticalAlignment);
    return `
      top: ${vertical.top ?? 'auto'};
      bottom: ${vertical.bottom ?? 'auto'};
      transform: ${vertical.transform ?? 'none'};
    `;
  }}

  & > * {
    pointer-events: auto;
  }
`;
