import React, { useMemo } from 'react';
import { clsx } from 'clsx';
import type { CarouselSlideProps } from '../../../types/ui';
import { splitCarouselSlideChildren } from '../../../handlers/carouselSlideOverlayHandlers';
import { CarouselSlideRoot } from './Carousel.style';
import { CarouselSlideContent } from './CarouselSlideOverlay.style';
import { useCarouselSlideInteractionContext } from './CarouselSlideInteractionContext';
import { CarouselSlideOverlays } from './CarouselSlideOverlays';
import { CarouselSlideOverlayPanels } from './CarouselSlideOverlayPanels';

/** Маркер типа слайда для фильтрации children */
export const CAROUSEL_SLIDE_DISPLAY_NAME = 'CarouselSlide';

/**
 * Слайд карусели: изображение, подпись, оверлеи или произвольный контент.
 * @param slideId — пользовательский идентификатор для колбэков карусели
 * @param slideLabel — пользовательская подпись для aria-label
 * @param thumbnailSrc — URL миниатюры для полосы навигации
 * @param className — CSS-класс
 * @param children — Carousel.Image, Carousel.Caption, Carousel.Overlay, Carousel.OverlayPanel и др.
 */
export const CarouselSlide: React.FC<CarouselSlideProps> = ({
  slideId,
  slideLabel,
  thumbnailSrc,
  className,
  children,
}) => {
  const slideInteraction = useCarouselSlideInteractionContext();
  const { contentChildren, overlayZoneGroups, overlayPanelElements } = useMemo(
    () => splitCarouselSlideChildren(children),
    [children],
  );

  return (
    <CarouselSlideRoot
      className={clsx('ui-carousel-slide', className)}
      data-slide-id={slideId}
      data-slide-label={slideLabel}
      data-thumbnail-src={thumbnailSrc}
    >
      <CarouselSlideContent>{contentChildren}</CarouselSlideContent>
      <CarouselSlideOverlayPanels
        overlayPanelElements={overlayPanelElements}
        slideInfo={slideInteraction?.slideInfo}
      />
      <CarouselSlideOverlays
        overlayZoneGroups={overlayZoneGroups}
        slideInfo={slideInteraction?.slideInfo}
      />
    </CarouselSlideRoot>
  );
};

CarouselSlide.displayName = CAROUSEL_SLIDE_DISPLAY_NAME;
