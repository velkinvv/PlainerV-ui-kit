import type { CSSProperties } from 'react';
import { FloatingMenuPlacement } from '@/types/ui';
import { calculateDropdownPosition } from '@/components/ui/Dropdown/handlers';

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
 * Позиция панели выпадающего меню под триггером (viewport + fixed).
 * @param trigger — DOM-элемент кнопки
 * @param menuElement — DOM панели для flip/fit (если уже смонтирована)
 */
export function getDropdownPanelPosition(
  trigger: HTMLElement,
  menuElement?: HTMLElement | null,
): { top: number; left: number } {
  const nextPosition = calculateDropdownPosition({
    triggerElement: trigger,
    menuElement: menuElement ?? null,
    offset: 6,
    mode: 'autoFlip',
    preferredPlacement: 'below',
  });

  return { top: nextPosition.y, left: nextPosition.x };
}
