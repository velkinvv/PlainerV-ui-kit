import React from 'react';
import type { CarouselSlideInfo } from '../../../types/ui';
import { CarouselSlideOverlayAlign as OverlayAlignEnum } from '../../../types/ui';
import type { CarouselSlideOverlayPanelProps } from '../../../types/ui';
import {
  getCarouselSlideOverlayPanelLayout,
  resolveCarouselSlideOverlayPanelContent,
  resolveCarouselSlideOverlayPanelGradient,
  resolveCarouselSlideOverlayPanelPlacement,
} from '../../../handlers/carouselSlideOverlayPanelHandlers';
import {
  CarouselSlideOverlayPanelLayer,
  CarouselSlideOverlayPanelRoot,
} from './CarouselSlideOverlayPanel.style';
import { CarouselParallaxLayer } from './CarouselParallaxLayer';

/** Пропсы слоя контентных панелей слайда */
export type CarouselSlideOverlayPanelsProps = {
  /** Контентные панели из children Carousel.Slide */
  overlayPanelElements: React.ReactElement<CarouselSlideOverlayPanelProps>[];
  /** Метаданные текущего слайда для render prop */
  slideInfo: CarouselSlideInfo | undefined;
};

/**
 * Рендерит контентные панели поверх слайда.
 * @param overlayPanelElements — массив Carousel.OverlayPanel
 * @param slideInfo — метаданные слайда
 */
export const CarouselSlideOverlayPanels: React.FC<CarouselSlideOverlayPanelsProps> = ({
  overlayPanelElements,
  slideInfo,
}) => {
  if (overlayPanelElements.length === 0) {
    return null;
  }

  return (
    <CarouselSlideOverlayPanelLayer data-carousel-overlay-panel-layer="">
      {overlayPanelElements.map((overlayPanelElement, overlayPanelIndex) => {
        const placement = resolveCarouselSlideOverlayPanelPlacement(overlayPanelElement.props?.placement);
        const align = overlayPanelElement.props?.align ?? OverlayAlignEnum.START;
        const gradient = resolveCarouselSlideOverlayPanelGradient(
          overlayPanelElement.props?.gradient,
          placement,
        );
        const panelLayout = getCarouselSlideOverlayPanelLayout(placement, align);

        return (
          <CarouselSlideOverlayPanelRoot
            key={overlayPanelElement.key ?? `carousel-overlay-panel-${overlayPanelIndex}`}
            className={overlayPanelElement.props?.className}
            data-carousel-overlay-panel=""
            data-carousel-overlay-panel-placement={placement}
            data-carousel-overlay-panel-align={align}
            data-carousel-overlay-panel-gradient={gradient}
            $placement={placement}
            $gradient={gradient}
            $mainAxisAlignment={panelLayout.mainAxisAlignment}
            $crossAxisAlignment={panelLayout.crossAxisAlignment}
            $textAlignment={panelLayout.textAlignment}
          >
            <CarouselParallaxLayer parallax={overlayPanelElement.props?.parallax} layer="overlayPanel">
              {resolveCarouselSlideOverlayPanelContent(overlayPanelElement.props?.children, slideInfo)}
            </CarouselParallaxLayer>
          </CarouselSlideOverlayPanelRoot>
        );
      })}
    </CarouselSlideOverlayPanelLayer>
  );
};

CarouselSlideOverlayPanels.displayName = 'CarouselSlideOverlayPanels';
