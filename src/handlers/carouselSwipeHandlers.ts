import { CarouselOrientation } from '../types/ui';
import { isCarouselVerticalOrientation } from './carouselOrientationHandlers';

/** Порог свайпа (px) */
const SWIPE_THRESHOLD_PX = 48;

/**
 * Извлекает координату pointer-события по основной оси карусели.
 * @param clientCoordinate — clientX или clientY
 * @param orientation — ориентация карусели
 */
export function getCarouselPointerPrimaryCoordinate(
  clientCoordinate: { clientX: number; clientY: number },
  orientation: CarouselOrientation = CarouselOrientation.HORIZONTAL,
): number {
  return isCarouselVerticalOrientation(orientation)
    ? clientCoordinate.clientY
    : clientCoordinate.clientX;
}

/**
 * Определяет направление свайпа по основной оси.
 * @param deltaPrimary — смещение по основной оси (start - end)
 * @param orientation — ориентация карусели
 * @param thresholdPx — минимальный порог
 */
export function resolveCarouselSwipeDirection(
  deltaPrimary: number,
  orientation: CarouselOrientation = CarouselOrientation.HORIZONTAL,
  thresholdPx: number = SWIPE_THRESHOLD_PX,
): 'previous' | 'next' | null {
  if (Math.abs(deltaPrimary) < thresholdPx) {
    return null;
  }

  return deltaPrimary > 0 ? 'next' : 'previous';
}

/**
 * Проверяет, превышен ли порог движения pointer для подавления click.
 * @param startPrimary — начальная координата по основной оси
 * @param currentPrimary — текущая координата по основной оси
 * @param dragThresholdPx — порог в px
 */
export function isCarouselPointerDragGesture(
  startPrimary: number,
  currentPrimary: number,
  dragThresholdPx: number = 5,
): boolean {
  return Math.abs(startPrimary - currentPrimary) > dragThresholdPx;
}
