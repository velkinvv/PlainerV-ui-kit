import { CarouselOrientation } from '../types/ui';
import { isCarouselVerticalOrientation } from './carouselOrientationHandlers';

/** Действие навигации по клавиатуре в карусели */
export type CarouselKeyboardAction = 'previous' | 'next' | 'first' | 'last';

/**
 * Определяет действие навигации по нажатой клавише с учётом ориентации.
 * @param event — событие клавиатуры
 * @param orientation — ориентация карусели
 */
export function resolveCarouselKeyboardAction(
  event: Pick<KeyboardEvent, 'key'>,
  orientation: CarouselOrientation = CarouselOrientation.HORIZONTAL,
): CarouselKeyboardAction | null {
  if (isCarouselVerticalOrientation(orientation)) {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        return 'previous';
      case 'ArrowDown':
      case 'ArrowRight':
        return 'next';
      case 'Home':
        return 'first';
      case 'End':
        return 'last';
      default:
        return null;
    }
  }

  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      return 'previous';
    case 'ArrowRight':
    case 'ArrowDown':
      return 'next';
    case 'Home':
      return 'first';
    case 'End':
      return 'last';
    default:
      return null;
  }
}

/**
 * Применяет действие клавиатуры к индексу слайда.
 * @param action — действие навигации
 * @param currentIndex — текущий индекс
 * @param slideCount — число слайдов
 * @param loop — зацикливание
 */
export function applyCarouselKeyboardAction(
  action: CarouselKeyboardAction,
  currentIndex: number,
  slideCount: number,
  loop: boolean,
): number {
  if (slideCount <= 0) {
    return 0;
  }

  switch (action) {
    case 'previous':
      return currentIndex > 0 ? currentIndex - 1 : loop ? slideCount - 1 : currentIndex;
    case 'next':
      return currentIndex < slideCount - 1 ? currentIndex + 1 : loop ? 0 : currentIndex;
    case 'first':
      return 0;
    case 'last':
      return slideCount - 1;
    default:
      return currentIndex;
  }
}
