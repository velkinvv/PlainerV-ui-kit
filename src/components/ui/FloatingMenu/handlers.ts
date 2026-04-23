import type { CSSProperties } from 'react';
import { FloatingMenuPlacement } from '@/types/ui';

const SAFE = 16;

/**
 * Стили фиксированного позиционирования панели у края вьюпорта.
 * @param placement — угол/край и выравнивание
 * @param zIndex — z-index слоя
 */
export function getFloatingMenuFixedStyles(
  placement: FloatingMenuPlacement,
  zIndex: number,
): CSSProperties {
  const base: CSSProperties = {
    position: 'fixed',
    zIndex,
    left: 'auto',
    right: 'auto',
    top: 'auto',
    bottom: 'auto',
    transform: 'none',
  };

  switch (placement) {
    case FloatingMenuPlacement.LEFT_TOP:
      return { ...base, left: SAFE, top: SAFE };
    case FloatingMenuPlacement.LEFT_CENTER:
      return { ...base, left: SAFE, top: '50%', transform: 'translateY(-50%)' };
    case FloatingMenuPlacement.LEFT_BOTTOM:
      return { ...base, left: SAFE, bottom: SAFE };
    case FloatingMenuPlacement.RIGHT_TOP:
      return { ...base, right: SAFE, top: SAFE };
    case FloatingMenuPlacement.RIGHT_CENTER:
      return { ...base, right: SAFE, top: '50%', transform: 'translateY(-50%)' };
    case FloatingMenuPlacement.RIGHT_BOTTOM:
      return { ...base, right: SAFE, bottom: SAFE };
    case FloatingMenuPlacement.TOP_LEFT:
      return { ...base, left: SAFE, top: SAFE };
    case FloatingMenuPlacement.TOP_CENTER:
      return { ...base, left: '50%', top: SAFE, transform: 'translateX(-50%)' };
    case FloatingMenuPlacement.TOP_RIGHT:
      return { ...base, right: SAFE, top: SAFE };
    case FloatingMenuPlacement.BOTTOM_LEFT:
      return { ...base, left: SAFE, bottom: SAFE };
    case FloatingMenuPlacement.BOTTOM_CENTER:
      return { ...base, left: '50%', bottom: SAFE, transform: 'translateX(-50%)' };
    case FloatingMenuPlacement.BOTTOM_RIGHT:
      return { ...base, right: SAFE, bottom: SAFE };
    default:
      return { ...base, left: '50%', bottom: SAFE, transform: 'translateX(-50%)' };
  }
}

/**
 * Ограничивает координаты панели границами окна.
 * @param x — желаемый `left`
 * @param y — желаемый `top`
 * @param width — ширина панели
 * @param height — высота панели
 * @param margin — отступ от краёв
 */
export function clampFloatingMenuToViewport(
  x: number,
  y: number,
  width: number,
  height: number,
  margin: number,
): { x: number; y: number } {
  const maxX = Math.max(margin, window.innerWidth - width - margin);
  const maxY = Math.max(margin, window.innerHeight - height - margin);
  return {
    x: Math.min(Math.max(margin, x), maxX),
    y: Math.min(Math.max(margin, y), maxY),
  };
}

/**
 * Позиция панели выпадающего меню под триггером.
 * @param trigger — DOM-элемент кнопки
 * @param menuWidth — ширина меню (если известна)
 */
export function getDropdownPanelPosition(
  trigger: HTMLElement,
  menuWidth?: number,
): { top: number; left: number } {
  const rect = trigger.getBoundingClientRect();
  const scrollX = window.scrollX ?? window.pageXOffset;
  const scrollY = window.scrollY ?? window.pageYOffset;
  const w = menuWidth ?? 200;
  let left = rect.left + scrollX;
  const top = rect.bottom + scrollY + 6;
  const rightEdge = left + w;
  const vw = window.innerWidth;
  if (rightEdge > vw + scrollX - 8) {
    left = Math.max(8 + scrollX, vw + scrollX - w - 8);
  }
  return { top, left };
}
