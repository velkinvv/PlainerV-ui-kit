import { Size } from '../../../types/sizes';

/** Параметры геометрии трека и бегунка для одного размера */
export type SwitchGeometry = {
  trackWidth: number;
  trackHeight: number;
  thumbSize: number;
  padding: number;
};

/**
 * Возвращает размеры трека и бегунка для визуального Switch.
 * @param size - Размер из дизайн-системы.
 * @returns Ширина/высота трека, диаметр бегунка и внутренний отступ.
 */
export const getSwitchGeometry = (size: Size = Size.MD): SwitchGeometry => {
  switch (size) {
    case Size.SM:
      return { trackWidth: 36, trackHeight: 20, thumbSize: 16, padding: 2 };
    case Size.LG:
      return { trackWidth: 52, trackHeight: 28, thumbSize: 24, padding: 2 };
    case Size.MD:
    case Size.XL:
    default:
      return { trackWidth: 44, trackHeight: 24, thumbSize: 20, padding: 2 };
  }
};

/**
 * Смещение бегунка по оси X при включённом состоянии.
 * @param checked - Включён ли переключатель.
 * @param geometry - Геометрия из `getSwitchGeometry`.
 * @returns Значение для `translateX` в px.
 */
export const getSwitchThumbTranslateX = (checked: boolean, geometry: SwitchGeometry): number => {
  if (!checked) {
    return 0;
  }
  const travel = geometry.trackWidth - geometry.thumbSize - geometry.padding * 2;
  return Math.max(0, travel);
};
