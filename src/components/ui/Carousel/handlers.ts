import { CarouselAnimation, CarouselNavigation } from '../../../types/ui';

export {
  clampCarouselIndex,
  getNextCarouselIndex,
  getPreviousCarouselIndex,
} from '../../../handlers/carouselNavigationHandlers';

export {
  isCarouselPointerDragGesture,
  resolveCarouselSwipeDirection,
} from '../../../handlers/carouselSwipeHandlers';

/**
 * Нужно ли показывать стрелки навигации.
 * @param navigation — режим навигации
 */
export function carouselShowsArrows(navigation: CarouselNavigation): boolean {
  return navigation === CarouselNavigation.ARROWS || navigation === CarouselNavigation.BOTH;
}

/**
 * Нужно ли показывать точки-индикаторы.
 * @param navigation — режим навигации
 */
export function carouselShowsDots(navigation: CarouselNavigation): boolean {
  return navigation === CarouselNavigation.DOTS || navigation === CarouselNavigation.BOTH;
}

/**
 * Нужно ли показывать полосу миниатюр.
 * @param navigation — режим навигации
 * @param thumbnails — явный флаг миниатюр
 */
export function carouselShowsThumbnails(
  navigation: CarouselNavigation,
  thumbnails?: boolean,
): boolean {
  if (thumbnails === true) {
    return true;
  }

  return navigation === CarouselNavigation.THUMBNAILS;
}

/**
 * Можно ли перейти к предыдущему слайду.
 * @param currentIndex — текущий индекс
 * @param loop — зацикливание
 */
export function canGoToPreviousCarouselSlide(currentIndex: number, loop: boolean): boolean {
  return loop || currentIndex > 0;
}

/**
 * Можно ли перейти к следующему слайду.
 * @param currentIndex — текущий индекс
 * @param slideCount — число слайдов
 * @param loop — зацикливание
 */
export function canGoToNextCarouselSlide(
  currentIndex: number,
  slideCount: number,
  loop: boolean,
): boolean {
  return loop || currentIndex < slideCount - 1;
}

/**
 * Проверяет, нужно ли игнорировать pointer-событие для свайпа (клик по контролам).
 * @param target — event.target
 */
export function shouldIgnoreCarouselSwipePointerTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(
    target.closest('button, a, input, textarea, select, [data-carousel-control]'),
  );
}

/**
 * Подпись слайда для screen readers.
 * @param slideIndex — индекс с 0
 * @param slideCount — всего слайдов
 * @param slideLabel — пользовательская подпись
 */
export function getCarouselSlideAriaLabel(
  slideIndex: number,
  slideCount: number,
  slideLabel?: string,
): string {
  if (slideLabel) {
    return slideLabel;
  }

  return `Слайд ${slideIndex + 1} из ${slideCount}`;
}

/**
 * Значение aria-live для карусели.
 * @param autoplayActive — идёт ли автопрокрутка
 */
export function getCarouselAriaLive(autoplayActive: boolean): 'off' | 'polite' {
  return autoplayActive ? 'off' : 'polite';
}

/**
 * CSS transition для slide-анимации с учётом reduced motion.
 * @param animationDuration — длительность в мс
 * @param reducedMotion — prefers-reduced-motion
 */
export function getCarouselSlideTransition(
  animationDuration: number,
  reducedMotion: boolean,
): string {
  if (reducedMotion) {
    return 'none';
  }

  return `transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
}

/**
 * Длительность crossfade-анимации (fade / scale).
 * @param animationDuration — базовая длительность в мс
 * @param reducedMotion — prefers-reduced-motion
 */
export function getCarouselCrossfadeDuration(
  animationDuration: number,
  reducedMotion: boolean,
): number {
  return reducedMotion ? 0 : animationDuration;
}

/**
 * Проверяет, используется ли горизонтальная лента.
 * @param animation — тип анимации
 */
export function isCarouselSlideTrackAnimation(animation: CarouselAnimation): boolean {
  return animation === CarouselAnimation.SLIDE;
}

export {
  getCarouselEffectTransition,
  isCarouselCrossfadeAnimation,
  isCarouselEffectAnimation,
} from '../../../handlers/carouselEffectHandlers';
