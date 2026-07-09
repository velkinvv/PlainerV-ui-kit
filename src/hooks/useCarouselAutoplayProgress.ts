import { useEffect, useRef, useState } from 'react';
import { calculateCarouselAutoplayProgressRatio } from '../handlers/carouselAutoplayProgressHandlers';

/** Параметры хука прогресса autoplay */
export type UseCarouselAutoplayProgressParams = {
  /** Включён ли autoplay */
  autoplay: boolean;
  /** Идёт ли autoplay */
  autoplayRunning: boolean;
  /** На паузе ли autoplay */
  autoplayPaused: boolean;
  /** Интервал autoplay в мс */
  autoplayInterval: number;
  /** Активный индекс (сброс цикла при смене) */
  activeIndex: number;
  /** prefers-reduced-motion */
  reducedMotion: boolean;
};

/**
 * Отслеживает прогресс текущего цикла autoplay до следующего слайда.
 * @param params — параметры хука
 */
export function useCarouselAutoplayProgress({
  autoplay,
  autoplayRunning,
  autoplayPaused,
  autoplayInterval,
  activeIndex,
  reducedMotion: _reducedMotion,
}: UseCarouselAutoplayProgressParams) {
  const [progressRatio, setProgressRatio] = useState(0);
  const cycleElapsedMillisecondsRef = useRef(0);
  const cycleResumeTimestampRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const isProgressActive =
    autoplay && autoplayRunning && !autoplayPaused && autoplayInterval > 0;

  useEffect(() => {
    cycleElapsedMillisecondsRef.current = 0;
    cycleResumeTimestampRef.current = null;
    setProgressRatio(0);
  }, [activeIndex, autoplayInterval]);

  useEffect(() => {
    if (!isProgressActive) {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (autoplay && autoplayRunning && autoplayPaused && cycleResumeTimestampRef.current !== null) {
        cycleElapsedMillisecondsRef.current += performance.now() - cycleResumeTimestampRef.current;
        cycleResumeTimestampRef.current = null;
      }

      return undefined;
    }

    cycleResumeTimestampRef.current = performance.now();

    const tick = (timestamp: number) => {
      if (cycleResumeTimestampRef.current === null) {
        cycleResumeTimestampRef.current = timestamp;
      }

      const elapsedMilliseconds =
        cycleElapsedMillisecondsRef.current + (timestamp - cycleResumeTimestampRef.current);
      const nextProgressRatio = calculateCarouselAutoplayProgressRatio(
        elapsedMilliseconds,
        autoplayInterval,
      );

      setProgressRatio(nextProgressRatio);

      if (nextProgressRatio < 1) {
        animationFrameRef.current = window.requestAnimationFrame(tick);
      } else {
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (cycleResumeTimestampRef.current !== null) {
        cycleElapsedMillisecondsRef.current += performance.now() - cycleResumeTimestampRef.current;
        cycleResumeTimestampRef.current = null;
      }
    };
  }, [
    activeIndex,
    autoplay,
    autoplayInterval,
    autoplayPaused,
    autoplayRunning,
    isProgressActive,
  ]);

  return {
    progressRatio,
  };
}
