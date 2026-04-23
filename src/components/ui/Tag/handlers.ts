import { Size } from '../../../types/sizes';

/**
 * Внутренние отступы и типографика тега по размеру.
 * @param size - Размер из дизайн-системы
 */
export const getTagMetrics = (size: Size = Size.SM) => {
  switch (size) {
    case Size.MD:
      return { padding: '5px 12px', gap: '6px', fontSize: '13px', minHeight: '28px' };
    case Size.LG:
    case Size.XL:
      return { padding: '6px 14px', gap: '6px', fontSize: '14px', minHeight: '32px' };
    case Size.XS:
    case Size.SM:
    default:
      return { padding: '4px 10px', gap: '5px', fontSize: '12px', minHeight: '24px' };
  }
};
