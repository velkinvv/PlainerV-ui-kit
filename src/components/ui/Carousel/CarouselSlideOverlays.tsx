import React from 'react';
import type { CarouselSlideInfo } from '../../../types/ui';
import type { CarouselSlideOverlayZoneGroup } from '../../../handlers/carouselSlideOverlayHandlers';
import {
  getCarouselSlideOverlayFlexAlignment,
  resolveCarouselSlideOverlayContent,
} from '../../../handlers/carouselSlideOverlayHandlers';
import {
  CarouselSlideOverlayLayer,
  CarouselSlideOverlayZone,
} from './CarouselSlideOverlay.style';
import { CarouselParallaxLayer } from './CarouselParallaxLayer';

/** Пропсы слоя оверлеев слайда */
export type CarouselSlideOverlaysProps = {
  /** Сгруппированные оверлеи по зонам placement + align */
  overlayZoneGroups: CarouselSlideOverlayZoneGroup[];
  /** Метаданные текущего слайда для render prop */
  slideInfo: CarouselSlideInfo | undefined;
};

/**
 * Рендерит зоны оверлеев поверх слайда.
 * @param overlayZoneGroups — группы оверлеев
 * @param slideInfo — метаданные слайда
 */
export const CarouselSlideOverlays: React.FC<CarouselSlideOverlaysProps> = ({
  overlayZoneGroups,
  slideInfo,
}) => {
  if (overlayZoneGroups.length === 0) {
    return null;
  }

  return (
    <CarouselSlideOverlayLayer>
      {overlayZoneGroups.map((overlayZoneGroup) => (
        <CarouselSlideOverlayZone
          key={overlayZoneGroup.zoneKey}
          data-carousel-overlay=""
          data-carousel-overlay-placement={overlayZoneGroup.placement}
          data-carousel-overlay-align={overlayZoneGroup.align}
          $placement={overlayZoneGroup.placement}
          $flexAlignment={getCarouselSlideOverlayFlexAlignment(overlayZoneGroup.align)}
        >
          {overlayZoneGroup.overlayElements.map((overlayElement, overlayIndex) => (
            <CarouselParallaxLayer
              key={overlayElement.key ?? `${overlayZoneGroup.zoneKey}-${overlayIndex}`}
              parallax={overlayElement.props?.parallax}
              layer="overlay"
            >
              {resolveCarouselSlideOverlayContent(overlayElement.props?.children, slideInfo)}
            </CarouselParallaxLayer>
          ))}
        </CarouselSlideOverlayZone>
      ))}
    </CarouselSlideOverlayLayer>
  );
};

CarouselSlideOverlays.displayName = 'CarouselSlideOverlays';
