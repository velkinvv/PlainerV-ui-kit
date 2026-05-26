import { TabsDirection } from '@/types/ui';

/** Геометрия триггера относительно прокручиваемого трека (для pill-thumb и полоски активного сегмента) */
export interface SegmentTriggerMetrics {
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
}

/**
 * Считает положение и размер триггера относительно контента трека с учётом прокрутки.
 * Без `scrollLeft` / `scrollTop` подсветка смещается при горизонтальном/вертикальном скролле.
 *
 * @param trackElement — прокручиваемый контейнер (**TabItemGroupListRoot**)
 * @param triggerElement — кнопка активного сегмента
 */
export function measureSegmentTriggerRelativeToTrack(
  trackElement: HTMLElement,
  triggerElement: HTMLElement,
): SegmentTriggerMetrics {
  const trackRectangle = trackElement.getBoundingClientRect();
  const triggerRectangle = triggerElement.getBoundingClientRect();

  return {
    offsetX: triggerRectangle.left - trackRectangle.left + trackElement.scrollLeft,
    offsetY: triggerRectangle.top - trackRectangle.top + trackElement.scrollTop,
    width: triggerRectangle.width,
    height: triggerRectangle.height,
  };
}

/**
 * Прокручивает трек так, чтобы активный триггер был виден (горизонталь или вертикаль).
 *
 * @param trackElement — прокручиваемый контейнер (**TabItemGroupListRoot**)
 * @param triggerElement — кнопка активного сегмента
 * @param direction — ось списка вкладок
 */
export function scrollSegmentTriggerIntoView(
  trackElement: HTMLElement,
  triggerElement: HTMLElement,
  direction: TabsDirection,
): void {
  const trackRectangle = trackElement.getBoundingClientRect();
  const triggerRectangle = triggerElement.getBoundingClientRect();

  if (direction === TabsDirection.HORIZONTAL) {
    if (triggerRectangle.left < trackRectangle.left) {
      trackElement.scrollLeft -= trackRectangle.left - triggerRectangle.left;
      return;
    }
    if (triggerRectangle.right > trackRectangle.right) {
      trackElement.scrollLeft += triggerRectangle.right - trackRectangle.right;
    }
    return;
  }

  if (triggerRectangle.top < trackRectangle.top) {
    trackElement.scrollTop -= trackRectangle.top - triggerRectangle.top;
    return;
  }
  if (triggerRectangle.bottom > trackRectangle.bottom) {
    trackElement.scrollTop += triggerRectangle.bottom - trackRectangle.bottom;
  }
}
