import React, { useEffect, useRef } from 'react';
import type { CarouselSlideThumbnail } from '../../../handlers/carouselThumbnailHandlers';
import {
  getCarouselThumbnailAriaLabel,
  scrollCarouselThumbnailListToIndex,
} from '../../../handlers/carouselThumbnailHandlers';
import {
  CarouselThumbnailButton,
  CarouselThumbnailImage,
  CarouselThumbnailsList,
  CarouselThumbnailsStrip,
} from './Carousel.style';

/** Пропсы полосы миниатюр карусели */
export type CarouselThumbnailsProps = {
  /** Данные миниатюр по слайдам */
  slideThumbnails: CarouselSlideThumbnail[];
  /** Активный индекс слайда */
  activeIndex: number;
  /** Общее число слайдов */
  slideCount: number;
  /** Колбэк выбора слайда по индексу */
  onSelectSlide: (slideIndex: number) => void;
  /** Колбэк клика по миниатюре (превью) слайда */
  onThumbnailClick?: (slideIndex: number, nativeEvent: React.MouseEvent<HTMLButtonElement>) => void;
  /** Высота миниатюры в px */
  thumbnailHeight?: number;
  /** aria-label для nav */
  thumbnailsAriaLabel?: string;
  /** Скругление нижних углов полосы */
  bottomBorderRadius?: string;
};

const DEFAULT_THUMBNAIL_HEIGHT = 72;

/**
 * Полоса миниатюр под основной областью карусели.
 * @param props — см. `CarouselThumbnailsProps`
 */
export const CarouselThumbnails: React.FC<CarouselThumbnailsProps> = ({
  slideThumbnails,
  activeIndex,
  slideCount,
  onSelectSlide,
  onThumbnailClick,
  thumbnailHeight = DEFAULT_THUMBNAIL_HEIGHT,
  thumbnailsAriaLabel = 'Миниатюры слайдов',
  bottomBorderRadius,
}) => {
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const skipNextThumbnailScrollRef = useRef(true);

  useEffect(() => {
    const listElement = listRef.current;
    const activeButton = buttonRefs.current[activeIndex];

    if (!listElement || !activeButton) {
      return;
    }

    // На первом mount не прокручиваем — иначе Docs-страница уезжает к этой сторис
    if (skipNextThumbnailScrollRef.current) {
      skipNextThumbnailScrollRef.current = false;
      return;
    }

    scrollCarouselThumbnailListToIndex(listElement, activeButton);
  }, [activeIndex]);

  return (
    <CarouselThumbnailsStrip
      aria-label={thumbnailsAriaLabel}
      $thumbnailHeight={thumbnailHeight}
      $bottomBorderRadius={bottomBorderRadius}
    >
      <CarouselThumbnailsList ref={listRef}>
        {slideThumbnails.map((thumbnail) => {
          if (!thumbnail.imageSrc) {
            return null;
          }

          const isActive = thumbnail.slideIndex === activeIndex;

          return (
            <li key={thumbnail.slideIndex}>
              <CarouselThumbnailButton
                ref={(element) => {
                  buttonRefs.current[thumbnail.slideIndex] = element;
                }}
                type="button"
                $active={isActive}
                $thumbnailHeight={thumbnailHeight}
                aria-label={getCarouselThumbnailAriaLabel(
                  thumbnail.slideIndex,
                  slideCount,
                  thumbnail.slideLabel,
                )}
                aria-current={isActive ? 'true' : undefined}
                data-carousel-thumbnail=""
                data-carousel-thumbnail-clickable={onThumbnailClick ? '' : undefined}
                onClick={(nativeEvent) => {
                  onSelectSlide(thumbnail.slideIndex);
                  onThumbnailClick?.(thumbnail.slideIndex, nativeEvent);
                }}
              >
                <CarouselThumbnailImage
                  src={thumbnail.imageSrc}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </CarouselThumbnailButton>
            </li>
          );
        })}
      </CarouselThumbnailsList>
    </CarouselThumbnailsStrip>
  );
};

CarouselThumbnails.displayName = 'CarouselThumbnails';
