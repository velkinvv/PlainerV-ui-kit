/** Состояние сегмента полоски прогресса */
export type CarouselProgressSegmentState = 'complete' | 'active' | 'pending';

/**
 * Возвращает состояние сегмента полоски прогресса.
 * @param slideIndex — индекс сегмента
 * @param activeIndex — активный индекс слайда
 */
export function getCarouselProgressSegmentState(
  slideIndex: number,
  activeIndex: number,
): CarouselProgressSegmentState {
  if (slideIndex < activeIndex) {
    return 'complete';
  }

  if (slideIndex === activeIndex) {
    return 'active';
  }

  return 'pending';
}

/**
 * Нужно ли анимировать активный сегмент прогресса (автопрокрутка).
 * @param isAutoplayEnabled — включена ли автопрокрутка
 * @param isAutoplayRunning — идёт ли автопрокрутка
 * @param isAutoplayPaused — на паузе ли автопрокрутка
 * @param reducedMotion — prefers-reduced-motion
 */
export function shouldAnimateCarouselProgressSegment(
  isAutoplayEnabled: boolean,
  isAutoplayRunning: boolean,
  isAutoplayPaused: boolean,
  reducedMotion: boolean,
): boolean {
  return isAutoplayEnabled && isAutoplayRunning && !isAutoplayPaused && !reducedMotion;
}

/**
 * Возвращает aria-valuenow для полоски прогресса.
 * @param activeIndex — активный индекс
 * @param slideCount — число слайдов
 */
export function getCarouselProgressAriaValueNow(activeIndex: number, slideCount: number): number {
  if (slideCount <= 0) {
    return 0;
  }

  return activeIndex + 1;
}

/**
 * Возвращает aria-valuemax для полоски прогресса.
 * @param slideCount — число слайдов
 */
export function getCarouselProgressAriaValueMax(slideCount: number): number {
  return Math.max(slideCount, 1);
}

/**
 * Возвращает aria-valuetext для полоски прогресса.
 * @param activeIndex — активный индекс
 * @param slideCount — число слайдов
 */
export function getCarouselProgressAriaValueText(activeIndex: number, slideCount: number): string {
  return `Слайд ${activeIndex + 1} из ${slideCount}`;
}
