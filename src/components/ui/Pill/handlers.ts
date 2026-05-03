import { Size } from '../../../types/sizes';

/** Геометрия Pill по размеру (отступы, типографика, индикатор) */
export type PillGeometry = {
  /** Внутренние отступы кнопки */
  padding: string;
  /** Зазор между индикатором и текстом */
  gap: string;
  /** Скругление контейнера */
  borderRadius: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  /** Диаметр внешнего круга индикатора, px */
  indicator: number;
  /** Диаметр внутренней точки в состоянии selected, px */
  dot: number;
  /** Толщина обводки кольца (unselected) */
  ringWidth: number;
};

/**
 * Возвращает размеры и отступы для `Pill` по значению `size`.
 * @param size - Размер из дизайн-системы (по умолчанию MD).
 */
export const getPillGeometry = (size: Size = Size.MD): PillGeometry => {
  switch (size) {
    case Size.SM:
      return {
        padding: '6px 10px',
        gap: '8px',
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '1.25',
        indicator: 14,
        dot: 6,
        ringWidth: 1,
      };
    case Size.LG:
      return {
        padding: '10px 16px',
        gap: '10px',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '1.25',
        indicator: 20,
        dot: 9,
        ringWidth: 2,
      };
    case Size.XS:
    case Size.MD:
    default:
      return {
        padding: '8px 12px',
        gap: '8px',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '1.28',
        indicator: 16,
        dot: 7,
        ringWidth: 1,
      };
  }
};

/**
 * Ширина скелетона Pill по умолчанию (подпись ~3–4 символа).
 *
 * @param size — размер чипа
 */
export const getPillSkeletonDefaultWidthPx = (size: Size): number => {
  switch (size) {
    case Size.SM:
      return 76;
    case Size.LG:
      return 108;
    case Size.XS:
    case Size.MD:
    default:
      return 88;
  }
};

/**
 * Минимальная высота блока скелетона по вертикали (согласовано с отступами и типографикой).
 *
 * @param size — размер чипа
 */
export const getPillSkeletonMinHeightPx = (size: Size): number => {
  switch (size) {
    case Size.SM:
      return 28;
    case Size.LG:
      return 40;
    case Size.XS:
    case Size.MD:
    default:
      return 34;
  }
};
