import React from 'react';
import { CarouselProgressBarPosition } from '../../../types/ui';
import {
  getCarouselAutoplayProgressAriaValueNow,
  getCarouselAutoplayProgressAriaValueText,
  getCarouselAutoplayRemainingSeconds,
} from '../../../handlers/carouselAutoplayProgressHandlers';
import {
  CarouselAutoplayProgressCountdown,
  CarouselAutoplayProgressFill,
  CarouselAutoplayProgressRoot,
  CarouselAutoplayProgressTrack,
} from './CarouselAutoplayProgress.style';

/** Пропсы линейного прогресса autoplay */
export type CarouselAutoplayProgressProps = {
  /** Доля прогресса текущего цикла 0…1 */
  progressRatio: number;
  /** Интервал autoplay в мс */
  autoplayInterval: number;
  /** Расположение полоски */
  position?: CarouselProgressBarPosition;
  /** Показывать обратный отсчёт рядом с полоской (для outer) */
  showCountdown?: boolean;
  /** aria-label прогресса autoplay */
  autoplayProgressAriaLabel?: string;
};

/**
 * Линейная полоска прогресса до следующего слайда при autoplay.
 * @param progressRatio — доля прогресса 0…1
 * @param autoplayInterval — интервал autoplay в мс
 * @param position — inner / outer
 * @param showCountdown — показывать обратный отсчёт рядом с полоской
 * @param autoplayProgressAriaLabel — aria-label
 */
export const CarouselAutoplayProgress: React.FC<CarouselAutoplayProgressProps> = ({
  progressRatio,
  autoplayInterval,
  position = CarouselProgressBarPosition.INNER,
  showCountdown = false,
  autoplayProgressAriaLabel = 'Прогресс автопрокрутки до следующего слайда',
}) => {
  const remainingSeconds = getCarouselAutoplayRemainingSeconds(progressRatio, autoplayInterval);
  const ariaValueText = getCarouselAutoplayProgressAriaValueText(remainingSeconds);

  return (
    <CarouselAutoplayProgressRoot
      role="progressbar"
      aria-label={autoplayProgressAriaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={getCarouselAutoplayProgressAriaValueNow(progressRatio)}
      aria-valuetext={ariaValueText}
      $position={position}
    >
      <CarouselAutoplayProgressTrack>
        <CarouselAutoplayProgressFill $progressRatio={progressRatio} />
      </CarouselAutoplayProgressTrack>
      {showCountdown ? (
        <CarouselAutoplayProgressCountdown aria-hidden>
          {remainingSeconds} с
        </CarouselAutoplayProgressCountdown>
      ) : null}
    </CarouselAutoplayProgressRoot>
  );
};

CarouselAutoplayProgress.displayName = 'CarouselAutoplayProgress';
