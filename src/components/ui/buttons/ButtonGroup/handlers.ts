import type { ButtonGroupAttachedShape } from '@/types/ui';
import { Size } from '../../../../types/sizes';

/**
 * Внешний радиус скругления для первого/последнего сегмента в режиме `attached` (макет Figma).
 * @param size — размер группы (совпадайте с `size` у дочерних `Button`).
 * @param shape — сегмент или капсула.
 */
export const getButtonGroupAttachedOuterRadius = (
  size: Size = Size.MD,
  shape: ButtonGroupAttachedShape = 'segment',
): string => {
  if (shape === 'pill') {
    return '9999px';
  }
  switch (size) {
    case Size.XS:
    case Size.SM:
      return '4px';
    case Size.MD:
      return '8px';
    case Size.LG:
      return '12px';
    case Size.XL:
      return '16px';
    default:
      return '8px';
  }
};
