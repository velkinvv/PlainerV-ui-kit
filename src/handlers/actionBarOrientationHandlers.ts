import { ActionBarOrientation } from '../types/ui';
import {
  sidemenuDynamicHeightLayoutTransition,
} from './sidemenuDynamicHeightHandlers';

/** Отступ по умолчанию для max-size динамической панели ActionBar (px) */
export const DEFAULT_ACTION_BAR_DYNAMIC_SIZE_INSET_PX = 16;

/** Переход layout/size для динамической панели (horizontal и vertical) */
export const actionBarDynamicSizeMotionTransition = {
  height: sidemenuDynamicHeightLayoutTransition,
  width: sidemenuDynamicHeightLayoutTransition,
  layout: sidemenuDynamicHeightLayoutTransition,
};

/**
 * CSS max-size для динамической панели: высота (vertical) или ширина (horizontal).
 *
 * @param orientation — горизонтальная или вертикальная раскладка
 * @param insetPx — отступ от краёв (px)
 */
export function resolveActionBarDynamicMaxSizeCss(
  orientation: ActionBarOrientation,
  insetPx: number,
): string {
  const totalInset = insetPx * 2;

  if (orientation === ActionBarOrientation.VERTICAL) {
    return `calc(100vh - ${totalInset}px)`;
  }

  return `calc(100vw - ${totalInset}px)`;
}

/**
 * Нормализует пропсы orientation / dynamicSize с учётом legacy **dynamicHeight**.
 *
 * @param orientation — явная ориентация
 * @param dynamicSize — динамический размер с анимацией
 * @param dynamicHeight — legacy: vertical + dynamicSize
 */
export function resolveActionBarLayoutOptions(options: {
  orientation?: ActionBarOrientation;
  dynamicSize?: boolean;
  dynamicHeight?: boolean;
}): {
  orientation: ActionBarOrientation;
  dynamicSize: boolean;
} {
  const legacyDynamic = options.dynamicHeight === true;
  const resolvedOrientation =
    options.orientation ??
    (legacyDynamic ? ActionBarOrientation.VERTICAL : ActionBarOrientation.HORIZONTAL);
  const dynamicSize = options.dynamicSize ?? legacyDynamic;

  return { orientation: resolvedOrientation, dynamicSize };
}
