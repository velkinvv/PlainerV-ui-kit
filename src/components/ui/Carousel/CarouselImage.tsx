import React from 'react';
import { clsx } from 'clsx';
import type { CarouselImageProps } from '../../../types/ui';
import { CAROUSEL_IMAGE_DISPLAY_NAME } from '../../../handlers/carouselThumbnailHandlers';
import { CarouselImageRoot } from './Carousel.style';
import { CarouselParallaxLayer } from './CarouselParallaxLayer';
import { CarouselParallaxImageShell } from './CarouselParallaxLayer.style';

/**
 * Изображение в слайде карусели.
 * @param src — URL изображения
 * @param alt — текстовая альтернатива
 * @param objectFit — способ вписывания (по умолчанию cover)
 * @param loading — lazy / eager
 * @param thumbnailSrc — отдельный URL для полосы миниатюр
 * @param parallax — parallax-эффект фона относительно оверлеев
 * @param className — CSS-класс
 */
export const CarouselImage: React.FC<CarouselImageProps> = ({
  src,
  alt,
  objectFit = 'cover',
  loading = 'lazy',
  thumbnailSrc,
  parallax,
  className,
}) => (
  <CarouselParallaxImageShell>
    <CarouselParallaxLayer parallax={parallax} layer="background">
      <CarouselImageRoot
        className={clsx('ui-carousel-image', className)}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        draggable={false}
        $objectFit={objectFit}
      />
    </CarouselParallaxLayer>
  </CarouselParallaxImageShell>
);

CarouselImage.displayName = CAROUSEL_IMAGE_DISPLAY_NAME;
