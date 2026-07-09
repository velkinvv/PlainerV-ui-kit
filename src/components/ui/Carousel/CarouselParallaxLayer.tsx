import React, { useMemo } from 'react';
import { clsx } from 'clsx';
import type { CarouselParallaxLayerProps } from '../../../types/ui';
import type { CarouselParallaxLayerPreset } from '../../../handlers/carouselParallaxHandlers';
import {
  formatCarouselParallaxLayerTransform,
  getCarouselParallaxLayerTransform,
  getCarouselParallaxPresetRatio,
  getCarouselParallaxLayerTransition,
  resolveCarouselParallaxRatio,
} from '../../../handlers/carouselParallaxHandlers';
import { useCarouselParallaxContext } from './CarouselParallaxContext';
import { useCarouselSlideInteractionContext } from './CarouselSlideInteractionContext';
import { CarouselParallaxLayerRoot } from './CarouselParallaxLayer.style';

/**
 * Parallax-обёртка для произвольного содержимого слайда.
 * @param parallax — `true`, `false` или коэффициент 0…2
 * @param layer — пресет слоя: background, content, overlayPanel, overlay
 * @param className — CSS-класс
 * @param children — содержимое слоя
 */
export const CarouselParallaxLayer: React.FC<CarouselParallaxLayerProps> = ({
  parallax,
  layer = 'content',
  className,
  children,
}) => {
  const parallaxContext = useCarouselParallaxContext();
  const slideInteraction = useCarouselSlideInteractionContext();
  const layerPreset = layer as CarouselParallaxLayerPreset;

  const parallaxRatio = useMemo(() => {
    if (!parallaxContext?.enabled) {
      return resolveCarouselParallaxRatio(false, parallax, getCarouselParallaxPresetRatio(layerPreset));
    }

    return resolveCarouselParallaxRatio(
      parallaxContext.enabled,
      parallax,
      getCarouselParallaxPresetRatio(
        layerPreset,
        parallaxContext.backgroundRatio,
        parallaxContext.foregroundRatio,
      ),
    );
  }, [layerPreset, parallax, parallaxContext]);

  const layerStyle = useMemo(() => {
    if (
      parallaxRatio == null ||
      !parallaxContext?.enabled ||
      slideInteraction == null ||
      parallaxContext.viewportPrimarySize <= 0
    ) {
      return {
        transform: 'none',
        transition: 'none',
      };
    }

    const layerTransform = getCarouselParallaxLayerTransform(
      slideInteraction.slideIndex,
      parallaxContext.motionIndex,
      parallaxContext.viewportPrimarySize,
      parallaxRatio,
      parallaxContext.orientation,
    );

    return {
      transform: formatCarouselParallaxLayerTransform(
        layerTransform,
        parallaxContext.orientation,
        parallaxContext.reducedMotion,
      ),
      transition: getCarouselParallaxLayerTransition(
        parallaxContext.transitionDurationMs,
        parallaxContext.isDragging,
        parallaxContext.reducedMotion,
      ),
    };
  }, [parallaxContext, parallaxRatio, slideInteraction]);

  if (parallaxRatio == null) {
    return <>{children}</>;
  }

  return (
    <CarouselParallaxLayerRoot
      className={clsx('ui-carousel-parallax-layer', className)}
      data-carousel-parallax-layer=""
      data-carousel-parallax-ratio={parallaxRatio}
      $transform={layerStyle.transform}
      $transition={layerStyle.transition}
    >
      {children}
    </CarouselParallaxLayerRoot>
  );
};

CarouselParallaxLayer.displayName = 'CarouselParallaxLayer';
