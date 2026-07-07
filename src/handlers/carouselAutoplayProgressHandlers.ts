/**
 * Возвращает долю прогресса autoplay (0…1).
 * @param elapsedMilliseconds — прошло миллисекунд в текущем цикле
 * @param autoplayInterval — интервал autoplay в мс
 */
export function calculateCarouselAutoplayProgressRatio(
  elapsedMilliseconds: number,
  autoplayInterval: number,
): number {
  if (autoplayInterval <= 0) {
    return 0;
  }

  return Math.min(Math.max(elapsedMilliseconds / autoplayInterval, 0), 1);
}

/**
 * Возвращает оставшееся время до следующего слайда в миллисекундах.
 * @param progressRatio — доля прогресса 0…1
 * @param autoplayInterval — интервал autoplay в мс
 */
export function getCarouselAutoplayRemainingMilliseconds(
  progressRatio: number,
  autoplayInterval: number,
): number {
  return Math.max(0, Math.ceil(autoplayInterval * (1 - progressRatio)));
}

/**
 * Возвращает оставшееся время до следующего слайда в секундах (округление вверх).
 * @param progressRatio — доля прогресса 0…1
 * @param autoplayInterval — интервал autoplay в мс
 */
export function getCarouselAutoplayRemainingSeconds(
  progressRatio: number,
  autoplayInterval: number,
): number {
  return Math.max(0, Math.ceil(getCarouselAutoplayRemainingMilliseconds(progressRatio, autoplayInterval) / 1000));
}

/**
 * aria-valuetext для прогресса autoplay.
 * @param remainingSeconds — секунд до следующего слайда
 */
export function getCarouselAutoplayProgressAriaValueText(remainingSeconds: number): string {
  if (remainingSeconds <= 0) {
    return 'Следующий слайд сейчас';
  }

  return `До следующего слайда ${remainingSeconds} с`;
}

/**
 * aria-valuenow для прогресса autoplay (0…100).
 * @param progressRatio — доля прогресса 0…1
 */
export function getCarouselAutoplayProgressAriaValueNow(progressRatio: number): number {
  return Math.round(Math.min(Math.max(progressRatio, 0), 1) * 100);
}
