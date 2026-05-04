import { TabsDirection, TabsVariant } from '@/types/ui';

/**
 * Определяет вариант оформления табов по направлению и явному пропу.
 * @param direction — горизонтальный или вертикальный список
 * @param variant — если задан, используется как есть; иначе: вертикально LINE, горизонтально PILL (макет Figma)
 */
export const resolveTabsVariant = (direction: TabsDirection, variant?: TabsVariant): TabsVariant => {
  if (variant !== undefined) {
    return variant;
  }
  return direction === TabsDirection.VERTICAL ? TabsVariant.LINE : TabsVariant.PILL;
};
