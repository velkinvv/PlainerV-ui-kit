import { FloatingMenuOrientation } from '@/types/ui';

/** Отступ по умолчанию для max-size динамической панели FloatingMenu (px) */
export const DEFAULT_FLOATING_MENU_DYNAMIC_SIZE_INSET_PX = 16;

/**
 * CSS max-size для dynamicSize: max-width (horizontal) или max-height (vertical).
 * Только vw/vh — без `100%`, чтобы избежать циклического расчёта в fit-content fixed-контейнере.
 *
 * @param orientation — горизонтальная или вертикальная раскладка
 * @param insetPx — отступ от краёв вьюпорта (px)
 */
export function resolveFloatingMenuDynamicMaxSizeCss(
  orientation: FloatingMenuOrientation,
  insetPx: number = DEFAULT_FLOATING_MENU_DYNAMIC_SIZE_INSET_PX,
): string {
  const totalInset = insetPx * 2;

  if (orientation === FloatingMenuOrientation.VERTICAL) {
    return `calc(100vh - ${totalInset}px)`;
  }

  return `calc(100vw - ${totalInset}px)`;
}

/**
 * Нормализует ориентацию FloatingMenu.
 *
 * @param orientation — явная ориентация
 */
export function resolveFloatingMenuOrientation(
  orientation?: FloatingMenuOrientation,
): FloatingMenuOrientation {
  return orientation ?? FloatingMenuOrientation.HORIZONTAL;
}
