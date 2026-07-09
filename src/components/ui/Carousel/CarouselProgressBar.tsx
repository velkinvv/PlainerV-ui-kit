import React, { useMemo } from 'react';
import { CarouselProgressBarPosition } from '../../../types/ui';
import {
  getCarouselProgressAriaValueMax,
  getCarouselProgressAriaValueNow,
  getCarouselProgressAriaValueText,
  getCarouselProgressSegmentState,
  shouldAnimateCarouselProgressSegment,
} from '../../../handlers/carouselProgressHandlers';
import {
  CarouselProgressBarRoot,
  CarouselProgressSegment,
  CarouselProgressSegmentFill,
} from './CarouselProgressBar.style';

/** Пропсы полоски прогресса карусели */
export type CarouselProgressBarProps = {
  /** Число слайдов */
  slideCount: number;
  /** Активный индекс слайда */
  activeIndex: number;
  /** Расположение полоски */
  position: CarouselProgressBarPosition;
  /** Включена ли автопрокрутка */
  autoplay?: boolean;
  /** Идёт ли автопрокрутка */
  autoplayRunning?: boolean;
  /** На паузе ли автопрокрутка */
  autoplayPaused?: boolean;
  /** Интервал автопрокрутки в мс */
  autoplayInterval?: number;
  /** prefers-reduced-motion */
  reducedMotion?: boolean;
  /** aria-label полоски прогресса */
  progressBarAriaLabel?: string;
};

/**
 * Сегментированная полоска прогресса слайдов карусели.
 * @param props — см. `CarouselProgressBarProps`
 */
export const CarouselProgressBar: React.FC<CarouselProgressBarProps> = ({
  slideCount,
  activeIndex,
  position,
  autoplay = false,
  autoplayRunning = false,
  autoplayPaused = false,
  autoplayInterval = 5000,
  reducedMotion = false,
  progressBarAriaLabel = 'Прогресс просмотра слайдов',
}) => {
  const isSegmentAnimating = shouldAnimateCarouselProgressSegment(
    autoplay,
    autoplayRunning,
    autoplayPaused,
    reducedMotion,
  );

  const segmentIndexes = useMemo(
    () => Array.from({ length: slideCount }, (_value, segmentIndex) => segmentIndex),
    [slideCount],
  );

  if (slideCount <= 1) {
    return null;
  }

  return (
    <CarouselProgressBarRoot
      role="progressbar"
      aria-label={progressBarAriaLabel}
      aria-valuemin={1}
      aria-valuenow={getCarouselProgressAriaValueNow(activeIndex, slideCount)}
      aria-valuemax={getCarouselProgressAriaValueMax(slideCount)}
      aria-valuetext={getCarouselProgressAriaValueText(activeIndex, slideCount)}
      $position={position}
    >
      {segmentIndexes.map((segmentIndex) => {
        const segmentState = getCarouselProgressSegmentState(segmentIndex, activeIndex);
        const isComplete = segmentState === 'complete';
        const isActive = segmentState === 'active';

        return (
          <CarouselProgressSegment key={segmentIndex}>
            <CarouselProgressSegmentFill
              key={
                isActive && isSegmentAnimating
                  ? `segment-${segmentIndex}-${activeIndex}`
                  : `segment-${segmentIndex}`
              }
              $isComplete={isComplete}
              $isActive={isActive}
              $isAnimating={isActive && isSegmentAnimating}
              $durationMs={autoplayInterval}
            />
          </CarouselProgressSegment>
        );
      })}
    </CarouselProgressBarRoot>
  );
};

CarouselProgressBar.displayName = 'CarouselProgressBar';
