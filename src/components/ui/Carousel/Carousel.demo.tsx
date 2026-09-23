import React, { useState } from 'react';
import type { CSSProperties } from 'react';
import { Carousel } from './Carousel';
import {
  CarouselAnimation,
  CarouselDotsPosition,
  CarouselNavigation,
  CarouselOrientation,
} from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { carouselStoriesStyles } from './Carousel.stories.styles';
import {
  carouselDemoSlides,
  renderCarouselDemoSlides,
  useCarouselDemoSlides,
  useCarouselStoryActiveIndex,
} from './Carousel.fixtures';

export type CarouselStoryDemoProps = {
  animation?: CarouselAnimation;
  navigation?: CarouselNavigation;
  dotsPosition?: CarouselDotsPosition;
  thumbnails?: boolean;
  thumbnailHeight?: number;
  showCaption?: boolean;
  fullscreen?: boolean;
  fullscreenOpenAriaLabel?: string;
  random?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  swipeEnabled?: boolean;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  animationDuration?: number;
  size?: Size;
  aspectRatio?: string;
  height?: string | number;
  orientation?: CarouselOrientation;
  showProgressBar?: boolean;
  'aria-label'?: string;
  showActiveIndex?: boolean;
  shellStyle?: CSSProperties;
};

export const CarouselStoryDemo = ({
  animation = CarouselAnimation.SLIDE,
  navigation = CarouselNavigation.BOTH,
  dotsPosition = CarouselDotsPosition.INNER,
  thumbnails = false,
  thumbnailHeight = 72,
  showCaption = true,
  fullscreen = false,
  fullscreenOpenAriaLabel,
  random = false,
  loop = true,
  autoplay = false,
  autoplayInterval = 5000,
  swipeEnabled = true,
  pauseOnHover = true,
  pauseOnFocus = true,
  animationDuration = 350,
  size = Size.MD,
  aspectRatio = '16 / 9',
  height,
  orientation = CarouselOrientation.HORIZONTAL,
  showProgressBar = false,
  'aria-label': ariaLabel = 'Галерея изображений',
  showActiveIndex = true,
  shellStyle,
}: CarouselStoryDemoProps) => {
  const { activeIndex, setActiveIndex } = useCarouselStoryActiveIndex();
  const slideNodes = useCarouselDemoSlides(carouselDemoSlides);

  return (
    <div style={carouselStoriesStyles.section}>
      {showActiveIndex ? (
        <p style={carouselStoriesStyles.statusPanel}>
          Активный слайд: {activeIndex + 1} из {carouselDemoSlides.length}
        </p>
      ) : null}
      <div style={shellStyle}>
        <Carousel
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          animation={animation}
          navigation={navigation}
          dotsPosition={dotsPosition}
          thumbnails={thumbnails}
          thumbnailHeight={thumbnailHeight}
          showCaption={showCaption}
          fullscreen={fullscreen}
          fullscreenOpenAriaLabel={fullscreenOpenAriaLabel}
          random={random}
          loop={loop}
          autoplay={autoplay}
          autoplayInterval={autoplayInterval}
          swipeEnabled={swipeEnabled}
          pauseOnHover={pauseOnHover}
          pauseOnFocus={pauseOnFocus}
          animationDuration={animationDuration}
          size={size}
          aspectRatio={aspectRatio}
          height={height}
          orientation={orientation}
          showProgressBar={showProgressBar}
          aria-label={ariaLabel}
        >
          {slideNodes}
        </Carousel>
      </div>
    </div>
  );
};

export const ControlledCarouselDemo = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={carouselStoriesStyles.section}>
      <p style={carouselStoriesStyles.statusPanel}>
        Внешнее управление: слайд {activeIndex + 1} из {carouselDemoSlides.length}
      </p>
      <div style={carouselStoriesStyles.hint}>
        <button type="button" onClick={() => setActiveIndex(0)}>
          Первый
        </button>{' '}
        <button type="button" onClick={() => setActiveIndex(2)}>
          Третий
        </button>{' '}
        <button
          type="button"
          onClick={() =>
            setActiveIndex((previousIndex) =>
              previousIndex >= carouselDemoSlides.length - 1 ? 0 : previousIndex + 1,
            )
          }
        >
          Следующий
        </button>
      </div>
      <Carousel
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        loop
        navigation={CarouselNavigation.BOTH}
        aria-label="Контролируемая галерея"
      >
        {renderCarouselDemoSlides(carouselDemoSlides)}
      </Carousel>
    </div>
  );
};
