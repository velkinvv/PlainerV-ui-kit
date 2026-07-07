import styled, { css } from 'styled-components';
import { CarouselAnimation } from '../../../types/ui';

/** 3D-viewport для coverflow / flip / stack */
export const CarouselEffectViewport = styled.div<{
  $animation?: CarouselAnimation;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  ${({ $animation = CarouselAnimation.COVERFLOW }) => {
    if ($animation === CarouselAnimation.STACK) {
      return css`
        perspective: none;
        transform-style: flat;
      `;
    }

    if ($animation === CarouselAnimation.FLIP) {
      return css`
        perspective: 900px;
        perspective-origin: center center;
        transform-style: preserve-3d;
      `;
    }

    return css`
      perspective: 1200px;
      perspective-origin: center center;
      transform-style: preserve-3d;
    `;
  }}
`;

/**
 * Слой слайда в coverflow / flip.
 * @property $transform — CSS transform
 * @property $opacity — прозрачность
 * @property $zIndex — z-index
 * @property $pointerEvents — pointer-events
 * @property $visibility — visibility
 * @property $effectTransition — CSS transition
 * @property $animation — тип эффектной анимации
 */
export const CarouselEffectSlide = styled.div<{
  $transform: string;
  $opacity: number;
  $zIndex: number;
  $pointerEvents: 'auto' | 'none';
  $visibility: 'visible' | 'hidden';
  $effectTransition: string;
  $animation?: CarouselAnimation;
}>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: ${({ $transform }) => $transform};
  opacity: ${({ $opacity }) => $opacity};
  z-index: ${({ $zIndex }) => $zIndex};
  pointer-events: ${({ $pointerEvents }) => $pointerEvents};
  visibility: ${({ $visibility }) => $visibility};
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transition: ${({ $effectTransition }) => $effectTransition};
  transform-origin: center center;
  will-change: transform, opacity;
`;

/** Внутренний контейнер содержимого эффектного слайда */
export const CarouselEffectSlideInner = styled.div<{ $animation: CarouselAnimation }>`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  border-radius: inherit;
  transform-origin: center center;
`;
