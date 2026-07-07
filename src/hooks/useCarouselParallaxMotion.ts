import { useEffect, useRef, useState } from 'react';
import type { CarouselOrientation } from '../types/ui';
import { getCarouselParallaxMotionIndex } from '../handlers/carouselParallaxHandlers';
import { getCarouselViewportPrimarySize } from '../handlers/carouselDragHandlers';

/** Параметры хука визуального parallax-движения */
export type UseCarouselParallaxMotionParams = {
  /** Активный индекс слайда */
  activeIndex: number;
  /** Смещение drag по основной оси, px */
  dragOffsetPx: number;
  /** Идёт pointer drag */
  isDragging: boolean;
  /** Длительность анимации смены слайда, мс */
  animationDuration: number;
  /** prefers-reduced-motion */
  reducedMotion: boolean;
  /** Ref viewport карусели */
  viewportRef: React.RefObject<HTMLElement | null>;
  /** Ориентация карусели */
  orientation: CarouselOrientation;
  /** Parallax включён */
  enabled: boolean;
};

/** Результат хука parallax-движения */
export type UseCarouselParallaxMotionResult = {
  /** Визуальный индекс карусели (дробный при drag) */
  motionIndex: number;
  /** Размер viewport по основной оси, px */
  viewportPrimarySize: number;
};

/**
 * Синхронизирует визуальный motionIndex с drag и CSS-переходом ленты.
 * При смене слайда без drag полагается на CSS transition parallax-слоёв, без RAF.
 * @param params — activeIndex, dragOffsetPx, viewport и др.
 */
export function useCarouselParallaxMotion({
  activeIndex,
  dragOffsetPx,
  isDragging,
  animationDuration,
  reducedMotion,
  viewportRef,
  orientation,
  enabled,
}: UseCarouselParallaxMotionParams): UseCarouselParallaxMotionResult {
  const [motionIndex, setMotionIndex] = useState(activeIndex);
  const [viewportPrimarySize, setViewportPrimarySize] = useState(0);
  const motionIndexRef = useRef(activeIndex);

  useEffect(() => {
    if (!enabled) {
      motionIndexRef.current = activeIndex;
      setMotionIndex(activeIndex);
      return undefined;
    }

    const viewportElement = viewportRef.current;

    if (!viewportElement) {
      return undefined;
    }

    const updateViewportPrimarySize = () => {
      setViewportPrimarySize(getCarouselViewportPrimarySize(viewportElement, orientation));
    };

    updateViewportPrimarySize();

    const resizeObserver = new ResizeObserver(updateViewportPrimarySize);
    resizeObserver.observe(viewportElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeIndex, enabled, orientation, viewportRef]);

  useEffect(() => {
    if (!enabled) {
      motionIndexRef.current = activeIndex;
      setMotionIndex(activeIndex);
      return undefined;
    }

    if (isDragging) {
      const nextMotionIndex = getCarouselParallaxMotionIndex(
        activeIndex,
        dragOffsetPx,
        viewportPrimarySize,
      );
      motionIndexRef.current = nextMotionIndex;
      setMotionIndex(nextMotionIndex);
      return undefined;
    }

    const targetMotionIndex = activeIndex;

    if (reducedMotion || animationDuration <= 0) {
      motionIndexRef.current = targetMotionIndex;
      setMotionIndex(targetMotionIndex);
      return undefined;
    }

    motionIndexRef.current = targetMotionIndex;
    setMotionIndex(targetMotionIndex);
  }, [
    activeIndex,
    animationDuration,
    dragOffsetPx,
    enabled,
    isDragging,
    reducedMotion,
    viewportPrimarySize,
  ]);

  return {
    motionIndex: enabled ? motionIndex : activeIndex,
    viewportPrimarySize,
  };
}
