import React, { useMemo, useState } from 'react';
import type { CarouselItemDefinition } from '../../../types/ui';
import { Carousel } from './Carousel';
import { createCarouselDemoImageDataUri } from './carouselDemoImageAssets';

/** Демо-слайд для сторис карусели */
export type CarouselDemoSlide = {
  slideKey: string;
  imageSrc: string;
  imageAlt: string;
  caption?: string;
  slideLabel?: string;
};

/** Набор локальных SVG-изображений для демонстрации анимаций и навигации */
export const carouselDemoSlides: CarouselDemoSlide[] = [
  {
    slideKey: 'mountains',
    imageSrc: createCarouselDemoImageDataUri('Горный пейзаж', '#1e3a5f', '#4a90d9'),
    imageAlt: 'Горный пейзаж на рассвете',
    caption: 'Горный пейзаж',
    slideLabel: 'Горы на рассвете',
  },
  {
    slideKey: 'forest',
    imageSrc: createCarouselDemoImageDataUri('Хвойный лес', '#1b4332', '#40916c'),
    imageAlt: 'Тропа в хвойном лесу',
    caption: 'Лесная тропа',
    slideLabel: 'Хвойный лес',
  },
  {
    slideKey: 'coast',
    imageSrc: createCarouselDemoImageDataUri('Океанский берег', '#0077b6', '#90e0ef'),
    imageAlt: 'Берег океана с волнами',
    caption: 'Океанский берег',
    slideLabel: 'Берег океана',
  },
  {
    slideKey: 'aurora',
    imageSrc: createCarouselDemoImageDataUri('Северное сияние', '#240046', '#7b2cbf'),
    imageAlt: 'Северное сияние над снегом',
    caption: 'Северное сияние',
    slideLabel: 'Полярное сияние',
  },
];

/**
 * Преобразует демо-слайды в CarouselItemDefinition[] для пропа items.
 * @param slides — массив демо-слайдов
 * @param showCaptions — включать подписи в item.caption
 */
export function mapCarouselDemoSlidesToItems(
  slides: CarouselDemoSlide[],
  showCaptions = true,
): CarouselItemDefinition[] {
  return slides.map((slide) => ({
    slideId: slide.slideKey,
    slideLabel: slide.slideLabel,
    imageSrc: slide.imageSrc,
    imageAlt: slide.imageAlt,
    caption: showCaptions ? slide.caption : undefined,
    loading: 'eager' as const,
  }));
}

/**
 * Рендерит слайды карусели из демо-конфига.
 * @param slides — массив демо-слайдов
 * @param showCaptions — показывать подписи под изображениями
 */
export function renderCarouselDemoSlides(
  slides: CarouselDemoSlide[],
  showCaptions = true,
): React.ReactNode {
  return slides.map((slide) => (
    <Carousel.Slide key={slide.slideKey} slideId={slide.slideKey} slideLabel={slide.slideLabel}>
      <Carousel.Image src={slide.imageSrc} alt={slide.imageAlt} loading="eager" />
      {showCaptions && slide.caption ? (
        <Carousel.Caption>{slide.caption}</Carousel.Caption>
      ) : null}
    </Carousel.Slide>
  ));
}

/**
 * Хук для мемоизации JSX слайдов в сторис.
 * @param slides — массив демо-слайдов
 * @param showCaptions — показывать подписи
 */
export function useCarouselDemoSlides(slides: CarouselDemoSlide[], showCaptions = true) {
  return useMemo(() => renderCarouselDemoSlides(slides, showCaptions), [slides, showCaptions]);
}

/**
 * Контролируемое состояние активного слайда для интерактивных сторис.
 * @param initialActiveIndex — начальный индекс
 */
export function useCarouselStoryActiveIndex(initialActiveIndex = 0) {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  return {
    activeIndex,
    setActiveIndex,
  };
}
