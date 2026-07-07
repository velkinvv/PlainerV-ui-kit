import React from 'react';
import type { CarouselSlideOverlayProps } from '../../../types/ui';
import { CAROUSEL_SLIDE_OVERLAY_DISPLAY_NAME } from '../../../handlers/carouselSlideOverlayConstants';

/**
 * Маркер оверлея поверх слайда. Контент рендерится в зонах через `CarouselSlideOverlays`.
 * @param placement — зона размещения (top, bottom, left, right)
 * @param align — выравнивание внутри зоны (start, center, end)
 * @param parallax — parallax переднего плана: true, false или коэффициент 0…2
 * @param children — содержимое или render prop `(slide: CarouselSlideInfo) => ReactNode`
 */
export const CarouselSlideOverlay: React.FC<CarouselSlideOverlayProps> = () => null;

CarouselSlideOverlay.displayName = CAROUSEL_SLIDE_OVERLAY_DISPLAY_NAME;
