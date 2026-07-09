import React from 'react';
import {
  CarouselAnimation,
  CarouselOrientation,
  type CarouselSlideProps,
} from '../../../types/ui';
import {
  getCarouselEffectSlidePresentation,
  shouldRenderCarouselEffectSlide,
} from '../../../handlers/carouselEffectHandlers';
import { CarouselEffectSlide, CarouselEffectSlideInner, CarouselEffectViewport } from './CarouselEffect.style';

/** Поддерживаемые эффектные анимации карусели */
export type CarouselEffectAnimationType =
  | CarouselAnimation.COVERFLOW
  | CarouselAnimation.FLIP
  | CarouselAnimation.STACK;

/** Пропсы 3D-слайдов coverflow / flip / stack */
export type CarouselEffectSlidesProps = {
  /** Тип эффектной анимации */
  animation: CarouselEffectAnimationType;
  /** Активный индекс */
  activeIndex: number;
  /** Ориентация карусели */
  orientation: CarouselOrientation;
  /** CSS transition эффекта */
  effectTransition: string;
  /** React-элементы слайдов */
  orderedSlideElements: React.ReactElement<CarouselSlideProps>[];
  /** Рендер оболочки слайда */
  renderSlideShell: (
    slideElement: React.ReactElement<CarouselSlideProps>,
    slideIndex: number,
  ) => React.ReactNode;
};

/**
 * Эффектные слайды карусели (coverflow / flip / stack).
 * @param props — см. `CarouselEffectSlidesProps`
 */
export const CarouselEffectSlides: React.FC<CarouselEffectSlidesProps> = ({
  animation,
  activeIndex,
  orientation,
  effectTransition,
  orderedSlideElements,
  renderSlideShell,
}) => {
  return (
    <CarouselEffectViewport $animation={animation}>
      {orderedSlideElements.map((slideElement, slideIndex) => {
        if (!shouldRenderCarouselEffectSlide(slideIndex, activeIndex, undefined, animation)) {
          return null;
        }

        const slidePresentation = getCarouselEffectSlidePresentation(
          animation,
          slideIndex,
          activeIndex,
          orientation,
        );

        return (
          <CarouselEffectSlide
            key={slideElement.key ?? slideIndex}
            $transform={slidePresentation.transform}
            $opacity={slidePresentation.opacity}
            $zIndex={slidePresentation.zIndex}
            $pointerEvents={slidePresentation.pointerEvents}
            $visibility={slidePresentation.visibility}
            $effectTransition={effectTransition}
            $animation={animation}
            data-carousel-effect-slide=""
            data-carousel-effect-animation={animation}
          >
            <CarouselEffectSlideInner $animation={animation}>
              {renderSlideShell(slideElement, slideIndex)}
            </CarouselEffectSlideInner>
          </CarouselEffectSlide>
        );
      })}
    </CarouselEffectViewport>
  );
};

CarouselEffectSlides.displayName = 'CarouselEffectSlides';
