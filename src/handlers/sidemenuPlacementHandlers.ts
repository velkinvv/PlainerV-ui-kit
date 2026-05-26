import {
  SidemenuHorizontalPlacement,
  SidemenuVerticalAlignment,
} from '@/types/ui';

/** Отступ плавающей панели от кромки экрана (px) */
export const SIDEMENU_FLOATING_EDGE_INSET_PX = 16;

/**
 * Горизонтальная кромка для fixed-оболочки (плавающая панель / off-screen).
 * @param horizontalPlacement — левый или правый край вьюпорта
 */
export function resolveSidemenuFixedHorizontalInset(
  horizontalPlacement: SidemenuHorizontalPlacement,
): { left?: number | string; right?: number | string } {
  if (horizontalPlacement === SidemenuHorizontalPlacement.RIGHT) {
    return { right: 0, left: 'auto' };
  }
  return { left: 0, right: 'auto' };
}

/**
 * Вертикальное положение fixed-оболочки: вся панель у верха, по центру или у низа экрана.
 * @param verticalAlignment — top | center | bottom
 */
export function resolveSidemenuFixedVerticalPosition(
  verticalAlignment: SidemenuVerticalAlignment,
): {
  top?: number | string;
  bottom?: number | string;
  transform?: string;
} {
  switch (verticalAlignment) {
    case SidemenuVerticalAlignment.CENTER:
      return {
        top: '50%',
        bottom: 'auto',
        transform: 'translateY(-50%)',
      };
    case SidemenuVerticalAlignment.BOTTOM:
      return {
        top: 'auto',
        bottom: SIDEMENU_FLOATING_EDGE_INSET_PX,
        transform: 'none',
      };
    case SidemenuVerticalAlignment.TOP:
    default:
      return {
        top: SIDEMENU_FLOATING_EDGE_INSET_PX,
        bottom: 'auto',
        transform: 'none',
      };
  }
}

/**
 * justify-content для блока навигации внутри панели (только edgeAttached).
 * @param verticalAlignment — top: пункты у шапки; center/bottom: блок меню в свободной зоне
 */
export function resolveSidemenuEdgeMenuJustifyContent(
  verticalAlignment: SidemenuVerticalAlignment,
): 'flex-start' | 'center' | 'flex-end' {
  switch (verticalAlignment) {
    case SidemenuVerticalAlignment.CENTER:
      return 'center';
    case SidemenuVerticalAlignment.BOTTOM:
      return 'flex-end';
    case SidemenuVerticalAlignment.TOP:
    default:
      return 'flex-start';
  }
}

/**
 * Смещение панели за край при скрытии (off-screen).
 * @param horizontalPlacement — направление уезда панели
 * @param panelWidthPx — ширина панели
 */
export function resolveSidemenuOffScreenHiddenOffsetX(
  horizontalPlacement: SidemenuHorizontalPlacement,
  panelWidthPx: number,
): number {
  if (horizontalPlacement === SidemenuHorizontalPlacement.RIGHT) {
    return panelWidthPx;
  }
  return -panelWidthPx;
}

/**
 * Наклон «листа» при скрытии off-screen (градусы rotateY).
 * @param horizontalPlacement — зеркально для правого края
 */
export function resolveSidemenuOffScreenHiddenRotateY(
  horizontalPlacement: SidemenuHorizontalPlacement,
): number {
  if (horizontalPlacement === SidemenuHorizontalPlacement.RIGHT) {
    return -5;
  }
  return 5;
}

/**
 * Точки perspective / transform-origin для 3D-анимации off-screen.
 * @param horizontalPlacement — левый или правый край
 */
export function resolveSidemenuOffScreenTransformOrigin(
  horizontalPlacement: SidemenuHorizontalPlacement,
): { perspectiveOrigin: string; transformOrigin: string } {
  if (horizontalPlacement === SidemenuHorizontalPlacement.RIGHT) {
    return {
      perspectiveOrigin: 'right center',
      transformOrigin: 'right center',
    };
  }
  return {
    perspectiveOrigin: 'left center',
    transformOrigin: 'left center',
  };
}

/**
 * align-items для строки полоса + панель (off-screen).
 * @param verticalAlignment — положение панели по высоте экрана
 */
export function resolveSidemenuOffScreenRowAlignItems(
  verticalAlignment: SidemenuVerticalAlignment,
): 'flex-start' | 'center' | 'flex-end' {
  switch (verticalAlignment) {
    case SidemenuVerticalAlignment.CENTER:
      return 'center';
    case SidemenuVerticalAlignment.BOTTOM:
      return 'flex-end';
    case SidemenuVerticalAlignment.TOP:
    default:
      return 'flex-start';
  }
}
