import { TabsDirection } from '@/types/ui';

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
