/** Локализованные подписи контролов карусели */
export type CarouselAriaLabels = {
  /** aria-label кнопки «предыдущий слайд» */
  previousSlideAriaLabel?: string;
  /** aria-label кнопки «следующий слайд» */
  nextSlideAriaLabel?: string;
  /** aria-label списка точек */
  dotsListAriaLabel?: string;
  /** aria-label кнопки точки; по умолчанию «Слайд N» */
  slideDotAriaLabel?: (slideIndex: number, slideCount: number) => string;
  /** aria-label кнопки паузы автопрокрутки */
  autoplayPauseAriaLabel?: string;
  /** aria-label кнопки запуска автопрокрутки */
  autoplayPlayAriaLabel?: string;
  /** aria-label полноэкранного оверлея */
  fullscreenOverlayAriaLabel?: string;
  /** aria-label счётчика слайдов в fullscreen */
  fullscreenCounterAriaLabel?: (activeIndex: number, slideCount: number) => string;
};

const DEFAULT_PREVIOUS_SLIDE_ARIA_LABEL = 'Предыдущий слайд';
const DEFAULT_NEXT_SLIDE_ARIA_LABEL = 'Следующий слайд';
const DEFAULT_DOTS_LIST_ARIA_LABEL = 'Выбор слайда';
const DEFAULT_AUTOPLAY_PAUSE_ARIA_LABEL = 'Пауза автопрокрутки';
const DEFAULT_AUTOPLAY_PLAY_ARIA_LABEL = 'Запуск автопрокрутки';
const DEFAULT_FULLSCREEN_OVERLAY_ARIA_LABEL = 'Полноэкранный просмотр слайда';

/**
 * Возвращает aria-label кнопки «предыдущий слайд».
 * @param ariaLabels — пользовательские подписи
 */
export function getCarouselPreviousSlideAriaLabel(ariaLabels?: CarouselAriaLabels): string {
  return ariaLabels?.previousSlideAriaLabel ?? DEFAULT_PREVIOUS_SLIDE_ARIA_LABEL;
}

/**
 * Возвращает aria-label кнопки «следующий слайд».
 * @param ariaLabels — пользовательские подписи
 */
export function getCarouselNextSlideAriaLabel(ariaLabels?: CarouselAriaLabels): string {
  return ariaLabels?.nextSlideAriaLabel ?? DEFAULT_NEXT_SLIDE_ARIA_LABEL;
}

/**
 * Возвращает aria-label списка точек.
 * @param ariaLabels — пользовательские подписи
 */
export function getCarouselDotsListAriaLabel(ariaLabels?: CarouselAriaLabels): string {
  return ariaLabels?.dotsListAriaLabel ?? DEFAULT_DOTS_LIST_ARIA_LABEL;
}

/**
 * Возвращает aria-label кнопки точки.
 * @param slideIndex — индекс с 0
 * @param slideCount — всего слайдов
 * @param ariaLabels — пользовательские подписи
 */
export function getCarouselSlideDotAriaLabel(
  slideIndex: number,
  slideCount: number,
  ariaLabels?: CarouselAriaLabels,
): string {
  if (ariaLabels?.slideDotAriaLabel) {
    return ariaLabels.slideDotAriaLabel(slideIndex, slideCount);
  }

  return `Слайд ${slideIndex + 1}`;
}

/**
 * Возвращает aria-label кнопки автопрокрутки.
 * @param autoplayRunning — идёт ли автопрокрутка
 * @param ariaLabels — пользовательские подписи
 */
export function getCarouselAutoplayAriaLabel(
  autoplayRunning: boolean,
  ariaLabels?: CarouselAriaLabels,
): string {
  if (autoplayRunning) {
    return ariaLabels?.autoplayPauseAriaLabel ?? DEFAULT_AUTOPLAY_PAUSE_ARIA_LABEL;
  }

  return ariaLabels?.autoplayPlayAriaLabel ?? DEFAULT_AUTOPLAY_PLAY_ARIA_LABEL;
}

/**
 * Возвращает aria-label полноэкранного оверлея.
 * @param ariaLabels — пользовательские подписи
 */
export function getCarouselFullscreenOverlayAriaLabel(ariaLabels?: CarouselAriaLabels): string {
  return ariaLabels?.fullscreenOverlayAriaLabel ?? DEFAULT_FULLSCREEN_OVERLAY_ARIA_LABEL;
}

/**
 * Возвращает текст счётчика слайдов в fullscreen.
 * @param activeIndex — активный индекс
 * @param slideCount — число слайдов
 * @param ariaLabels — пользовательские подписи
 */
export function getCarouselFullscreenCounterLabel(
  activeIndex: number,
  slideCount: number,
  ariaLabels?: CarouselAriaLabels,
): string {
  if (ariaLabels?.fullscreenCounterAriaLabel) {
    return ariaLabels.fullscreenCounterAriaLabel(activeIndex, slideCount);
  }

  return `Слайд ${activeIndex + 1} из ${slideCount}`;
}
