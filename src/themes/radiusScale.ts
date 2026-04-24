import { Size } from '../types/sizes';

/**
 * Скругления по размеру для UI из макета Figma (прямоугольные поля и кнопки, не «пилюля» 35px).
 * Используется `BorderRadiusHandler` и размерами кнопок в `themes/buttons`.
 */
export const themeRadiusBySize: Record<Size, string> = {
  [Size.XS]: '4px',
  [Size.SM]: '6px',
  [Size.MD]: '8px',
  [Size.LG]: '10px',
  [Size.XL]: '12px',
};
