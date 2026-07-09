import React, { useCallback } from 'react';

import { clsx } from 'clsx';

import type { CarouselCaptionProps } from '../../../types/ui';
import { CAROUSEL_CAPTION_DISPLAY_NAME } from '../../../handlers/carouselSlideMediaHandlers';
import { CarouselCaptionRoot } from './Carousel.style';
import { useCarouselDisplayContext } from './CarouselDisplayContext';
import { useCarouselSlideInteractionContext } from './CarouselSlideInteractionContext';

/**
 * Подпись под изображением в слайде карусели.
 * @param children — текст подписи (заголовок слайда)
 * @param className — CSS-класс
 */
export const CarouselCaption: React.FC<CarouselCaptionProps> = ({ children, className }) => {
  const { showCaption, onTitleClick } = useCarouselDisplayContext();
  const slideInteraction = useCarouselSlideInteractionContext();

  const handleTitleClick = useCallback(
    (nativeEvent: React.MouseEvent<HTMLElement>) => {
      if (!onTitleClick || !slideInteraction) {
        return;
      }

      nativeEvent.stopPropagation();

      onTitleClick({
        slide: slideInteraction.slideInfo,
        nativeEvent,
      });
    },
    [onTitleClick, slideInteraction],
  );

  if (!showCaption) {
    return null;
  }

  return (
    <CarouselCaptionRoot
      className={clsx('ui-carousel-caption', className)}
      data-carousel-title=""
      data-carousel-title-clickable={onTitleClick ? '' : undefined}
      $titleClickable={Boolean(onTitleClick)}
      onClick={onTitleClick ? handleTitleClick : undefined}
    >
      {children}
    </CarouselCaptionRoot>
  );
};
CarouselCaption.displayName = CAROUSEL_CAPTION_DISPLAY_NAME;

