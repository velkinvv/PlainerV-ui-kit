import type { DefaultTheme } from 'styled-components';
import { Size } from '../../../types/sizes';
import type { PulseCustomColors, PulseStatus } from '../../../types/ui';

/** Геометрия точки Pulse по размеру */
export type PulseGeometry = {
  /** Диаметр центральной точки, px */
  dotSize: number;
  /** Стартовый диаметр волны, px */
  waveStartSize: number;
  /** Конечный диаметр волны, px */
  waveEndSize: number;
  /** Толщина обводки волны в конце, px */
  waveEndBorderWidth: number;
  /** Размытие волны в конце, px */
  waveEndBlur: number;
};

/**
 * Возвращает геометрию Pulse.
 * @param size - Размер из дизайн-системы
 */
export const getPulseGeometry = (size: Size = Size.MD): PulseGeometry => {
  switch (size) {
    case Size.XS:
    case Size.SM:
      return {
        dotSize: 8,
        waveStartSize: 6,
        waveEndSize: 20,
        waveEndBorderWidth: 1.5,
        waveEndBlur: 0.66,
      };
    case Size.LG:
    case Size.XL:
      return {
        dotSize: 16,
        waveStartSize: 14,
        waveEndSize: 36,
        waveEndBorderWidth: 3,
        waveEndBlur: 1.33,
      };
    case Size.MD:
    default:
      return {
        dotSize: 12,
        waveStartSize: 10,
        waveEndSize: 28,
        waveEndBorderWidth: 2,
        waveEndBlur: 1,
      };
  }
};

/**
 * Резолвит цвет Pulse из статуса или кастомных цветов.
 * @param theme - Тема styled-components
 * @param status - Семантический статус
 * @param customColors - Кастомный цвет (приоритетнее status)
 */
export const resolvePulseColor = (
  theme: DefaultTheme,
  status: PulseStatus = 'info',
  customColors?: PulseCustomColors,
): string => {
  if (customColors?.background) {
    return customColors.background;
  }

  switch (status) {
    case 'danger':
      return theme.colors.danger;
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'info':
    default:
      return theme.colors.info ?? theme.colors.primary;
  }
};
