import { createContext, useContext } from 'react';
import type { CarouselOrientation } from '../../../types/ui';

/** Контекст parallax-движения карусели */
export type CarouselParallaxContextValue = {
  /** Parallax включён на карусели */
  enabled: boolean;
  /** Визуальный индекс карусели */
  motionIndex: number;
  /** Размер viewport по основной оси, px */
  viewportPrimarySize: number;
  /** Ориентация карусели */
  orientation: CarouselOrientation;
  /** prefers-reduced-motion */
  reducedMotion: boolean;
  /** Идёт drag */
  isDragging: boolean;
  /** Длительность transition смены слайда, мс */
  transitionDurationMs: number;
  /** Коэффициент фона по умолчанию */
  backgroundRatio: number;
  /** Кoэффициент переднего плана по умолчанию */
  foregroundRatio: number;
};

/** React-контекст parallax карусели */
export const CarouselParallaxContext = createContext<CarouselParallaxContextValue | null>(null);

/**
 * Читает parallax-контекст карусели.
 */
export function useCarouselParallaxContext(): CarouselParallaxContextValue | null {
  return useContext(CarouselParallaxContext);
}
