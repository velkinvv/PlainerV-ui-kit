import { type ReactNode } from 'react';
import { getBadgeMotionContentKey } from '../handlers/badgeContentHandlers';
import { Size } from '../types/sizes';
import { useValuePulseMotion } from './useValuePulseMotion';

/** Параметры хука анимации бейджа */
export type UseBadgeMotionOptions = {
  /** Содержимое бейджа */
  children: ReactNode;
  /** Режим точки без текста */
  isDot: boolean;
  /** Размер бейджа */
  size?: Size;
  /** Кликабельный бейдж (hover/tap) */
  interactive: boolean;
  /** Включить lifecycle-анимации (появление, пульс, layout) */
  motionEnabled?: boolean;
};

/**
 * Управляет появлением, пульсом при смене значения/размера и layout-анимацией бейджа.
 *
 * @param options — содержимое, размер и флаги интерактива
 */
export function useBadgeMotion(options: UseBadgeMotionOptions) {
  const {
    children,
    isDot,
    size = Size.MD,
    interactive,
    motionEnabled = true,
  } = options;

  const contentKey = getBadgeMotionContentKey(children, isDot, size);

  return useValuePulseMotion({
    contentKey,
    motionEnabled,
    interactive,
    layoutEnabled: true,
  });
}
