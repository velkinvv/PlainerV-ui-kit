/**
 * Ограничивает индекс слайда допустимым диапазоном.
 * @param index — запрошенный индекс
 * @param slideCount — число слайдов
 */
export function clampCarouselIndex(index: number, slideCount: number): number {
  if (slideCount <= 0) {
    return 0;
  }

  return Math.min(Math.max(0, index), slideCount - 1);
}

/**
 * Следующий индекс с учётом зацикливания.
 * @param currentIndex — текущий индекс
 * @param slideCount — число слайдов
 * @param loop — зацикливание
 */
export function getNextCarouselIndex(
  currentIndex: number,
  slideCount: number,
  loop: boolean,
): number {
  if (slideCount <= 0) {
    return 0;
  }

  if (currentIndex < slideCount - 1) {
    return currentIndex + 1;
  }

  return loop ? 0 : currentIndex;
}

/**
 * Предыдущий индекс с учётом зацикливания.
 * @param currentIndex — текущий индекс
 * @param slideCount — число слайдов
 * @param loop — зацикливание
 */
export function getPreviousCarouselIndex(
  currentIndex: number,
  slideCount: number,
  loop: boolean,
): number {
  if (slideCount <= 0) {
    return 0;
  }

  if (currentIndex > 0) {
    return currentIndex - 1;
  }

  return loop ? slideCount - 1 : currentIndex;
}
