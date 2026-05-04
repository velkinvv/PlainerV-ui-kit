import { Size } from '../../../types/sizes';

/**
 * Число или строка с единицами → значение для CSS width/max-width.
 * @param value - px или строка (`120`, `50%`)
 */
export const tagLengthToCss = (value: number | string | undefined): string | undefined => {
  if (value === undefined) {
    return undefined;
  }
  return typeof value === 'number' ? `${value}px` : value;
};

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

/**
 * Дефолтная ширина скелетона тега (px), если не передан `skeletonWidth`.
 * @param size - размер тега
 */
export const getTagSkeletonDefaultWidthPx = (size: Size): number => {
  switch (size) {
    case Size.XS:
      return 56;
    case Size.SM:
      return 72;
    case Size.MD:
      return 80;
    case Size.LG:
      return 96;
    case Size.XL:
      return 112;
    default:
      return 72;
  }
};
