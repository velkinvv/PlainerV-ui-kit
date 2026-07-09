import { CarouselOrientation } from '../types/ui';

/**
 * Проверяет, используется ли вертикальная ориентация карусели.
 * @param orientation — ориентация карусели
 */
export function isCarouselVerticalOrientation(
  orientation: CarouselOrientation = CarouselOrientation.HORIZONTAL,
): boolean {
  return orientation === CarouselOrientation.VERTICAL;
}

/**
 * Возвращает CSS touch-action для viewport с учётом ориентации.
 * @param swipeEnabled — включён ли свайп
 * @param orientation — ориентация карусели
 */
export function getCarouselViewportTouchAction(
  swipeEnabled: boolean,
  orientation: CarouselOrientation = CarouselOrientation.HORIZONTAL,
): string {
  if (!swipeEnabled) {
    return 'auto';
  }

  return isCarouselVerticalOrientation(orientation) ? 'pan-x pinch-zoom' : 'pan-y pinch-zoom';
}

/**
 * Возвращает aspect-ratio области слайдов с учётом ориентации.
 * @param orientation — ориентация карусели
 * @param aspectRatio — пользовательский aspect-ratio
 * @param height — фиксированная высота (если задана, aspect-ratio не используется)
 */
export function resolveCarouselAspectRatio(
  orientation: CarouselOrientation = CarouselOrientation.HORIZONTAL,
  aspectRatio?: string,
  height?: string | number,
): string | undefined {
  if (height !== undefined && height !== null && height !== '') {
    return undefined;
  }

  if (isCarouselVerticalOrientation(orientation) && (!aspectRatio || aspectRatio === '16 / 9')) {
    return '9 / 16';
  }

  return aspectRatio ?? '16 / 9';
}

/**
 * Возвращает имя иконки стрелки «назад» для ориентации.
 * @param orientation — ориентация карусели
 */
export function getCarouselPreviousArrowIconName(
  orientation: CarouselOrientation = CarouselOrientation.HORIZONTAL,
): 'PhosphorCaretLeft' | 'PhosphorCaretUp' {
  return isCarouselVerticalOrientation(orientation) ? 'PhosphorCaretUp' : 'PhosphorCaretLeft';
}

/**
 * Возвращает имя иконки стрелки «вперёд» для ориентации.
 * @param orientation — ориентация карусели
 */
export function getCarouselNextArrowIconName(
  orientation: CarouselOrientation = CarouselOrientation.HORIZONTAL,
): 'PhosphorCaretRight' | 'PhosphorCaretDown' {
  return isCarouselVerticalOrientation(orientation) ? 'PhosphorCaretDown' : 'PhosphorCaretRight';
}
