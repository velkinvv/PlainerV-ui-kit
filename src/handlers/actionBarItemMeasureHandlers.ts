import { ActionBarOrientation } from '@/types/ui';
import { measurePanelItemSizePx } from './panelItemPresenceMeasureHandlers';

/**
 * Измеряет ширину (horizontal) или высоту (vertical) слота ActionBar вне layout.
 *
 * @param sourceElement — элемент для клонирования
 * @param orientation — ориентация панели
 */
export function measureActionBarItemSizePx(
  sourceElement: HTMLElement,
  orientation: ActionBarOrientation,
): number {
  const layoutOrientation =
    orientation === ActionBarOrientation.VERTICAL ? 'vertical' : 'horizontal';
  return measurePanelItemSizePx(sourceElement, layoutOrientation);
}
