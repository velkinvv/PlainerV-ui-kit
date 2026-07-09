import { createContext, useContext } from 'react';
import type { CarouselSlideClickEvent } from '../../../types/ui';

/** Настройки отображения содержимого карусели */
export type CarouselDisplayContextValue = {
  /** Показывать подписи `Carousel.Caption` под изображениями */
  showCaption: boolean;
  /** Колбэк клика по заголовку / подписи слайда */
  onTitleClick?: (event: CarouselSlideClickEvent) => void;
};

const defaultCarouselDisplayContextValue: CarouselDisplayContextValue = {
  showCaption: true,
};
/** Контекст отображения карусели для дочерних Slide / Caption */
export const CarouselDisplayContext = createContext<CarouselDisplayContextValue>(
  defaultCarouselDisplayContextValue,
);

/**
 * Читает настройки отображения карусели из контекста.
 */
export function useCarouselDisplayContext(): CarouselDisplayContextValue {
  return useContext(CarouselDisplayContext);
}
