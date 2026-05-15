import { TabsVariant } from '@/types/ui';

/**
 * Варианты с текстовыми сегментами и общей скользящей полоской (**minimal**, **line**, **underline**), без pill-трека.
 *
 * @param variant — значение **TabsVariant**
 */
export function isTabsTextSegmentVariant(variant: TabsVariant): boolean {
  return (
    variant === TabsVariant.MINIMAL ||
    variant === TabsVariant.LINE ||
    variant === TabsVariant.UNDERLINE
  );
}
