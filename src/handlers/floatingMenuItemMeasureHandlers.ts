import { FloatingMenuOrientation } from '@/types/ui';
import { measurePanelItemSizePx } from './panelItemPresenceMeasureHandlers';

/**
 * Измеряет ширину или высоту DOM-узла вне текущего layout (клон в body).
 *
 * @param sourceElement — элемент для клонирования
 * @param orientation — horizontal: width, vertical: height
 */
export function measureFloatingMenuItemSizePx(
  sourceElement: HTMLElement,
  orientation: FloatingMenuOrientation,
): number {
  const layoutOrientation =
    orientation === FloatingMenuOrientation.VERTICAL ? 'vertical' : 'horizontal';
  return measurePanelItemSizePx(sourceElement, layoutOrientation);
}

/**
 * @deprecated Используйте {@link measureFloatingMenuItemSizePx}
 */
export function measureFloatingMenuItemWidthPx(sourceElement: HTMLElement): number {
  return measureFloatingMenuItemSizePx(sourceElement, FloatingMenuOrientation.HORIZONTAL);
}
