import React from 'react';
import { clsx } from 'clsx';
import type {
  CarouselSlideOverlayPanelProps,
  CarouselSlideOverlayPanelTextProps,
  CarouselSlideOverlayPanelTitleProps,
} from '../../../types/ui';
import { CAROUSEL_SLIDE_OVERLAY_PANEL_DISPLAY_NAME } from '../../../handlers/carouselSlideOverlayConstants';
import {
  CarouselSlideOverlayPanelTextRoot,
  CarouselSlideOverlayPanelTitleRoot,
} from './CarouselSlideOverlayPanel.style';

/**
 * Маркер контентной панели поверх слайда. Рендерится через `CarouselSlideOverlayPanels`.
 * @param placement — top, center, bottom, stretch (по умолчанию bottom)
 * @param align — start, center, end
 * @param gradient — градиентная подложка для читаемости текста
 * @param parallax — parallax переднего плана: true, false или коэффициент 0…2
 * @param children — содержимое или render prop `(slide: CarouselSlideInfo) => ReactNode`
 */
export const CarouselSlideOverlayPanel: React.FC<CarouselSlideOverlayPanelProps> = () => null;

CarouselSlideOverlayPanel.displayName = CAROUSEL_SLIDE_OVERLAY_PANEL_DISPLAY_NAME;

/**
 * Заголовок внутри `Carousel.OverlayPanel`.
 * @param children — текст заголовка
 * @param className — CSS-класс
 */
export const CarouselSlideOverlayPanelTitle: React.FC<CarouselSlideOverlayPanelTitleProps> = ({
  children,
  className,
}) => (
  <CarouselSlideOverlayPanelTitleRoot className={clsx('ui-carousel-overlay-panel-title', className)}>
    {children}
  </CarouselSlideOverlayPanelTitleRoot>
);

CarouselSlideOverlayPanelTitle.displayName = 'CarouselSlideOverlayPanelTitle';

/**
 * Текст внутри `Carousel.OverlayPanel`.
 * @param children — текст абзаца
 * @param className — CSS-класс
 */
export const CarouselSlideOverlayPanelText: React.FC<CarouselSlideOverlayPanelTextProps> = ({
  children,
  className,
}) => (
  <CarouselSlideOverlayPanelTextRoot className={clsx('ui-carousel-overlay-panel-text', className)}>
    {children}
  </CarouselSlideOverlayPanelTextRoot>
);

CarouselSlideOverlayPanelText.displayName = 'CarouselSlideOverlayPanelText';
