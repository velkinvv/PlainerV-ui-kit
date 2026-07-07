import { createContext, useContext } from 'react';
import type { CarouselSlideInfo } from '../../../types/ui';

/** Данные текущего слайда для обработчиков кликов внутри Slide / Caption */
export type CarouselSlideInteractionContextValue = {
  /** Индекс слайда в текущем порядке отображения */
  slideIndex: number;
  /** Метаданные слайда */
  slideInfo: CarouselSlideInfo;
};

/** Контекст взаимодействия с конкретным слайдом */
export const CarouselSlideInteractionContext =
  createContext<CarouselSlideInteractionContextValue | null>(null);

/**
 * Читает метаданные текущего слайда из контекста.
 */
export function useCarouselSlideInteractionContext(): CarouselSlideInteractionContextValue | null {
  return useContext(CarouselSlideInteractionContext);
}
