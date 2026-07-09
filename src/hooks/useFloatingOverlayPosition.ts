import { useCallback, useEffect, useLayoutEffect, useState, type RefObject } from 'react';

import {
  calculateDropdownPosition,
  findScrollableParents,
  removeScrollListeners,
} from '../components/ui/Dropdown/handlers';
import type { DropdownPositioningMode } from '../types/ui';

export type UseFloatingOverlayPositionParameters = {
  /** Открыта ли панель */
  isOpen: boolean;
  /** Ref якоря (триггера) */
  anchorRef: RefObject<HTMLElement | null>;
  /** Ref DOM-панели для расчёта flip / fit */
  overlayRef: RefObject<HTMLElement | null>;
  /** Режим позиционирования (как у Dropdown) */
  positioningMode?: DropdownPositioningMode;
  /** Предпочитаемое размещение */
  preferredPlacement?: 'below' | 'rightStart';
  /** Отступ от якоря, px */
  offset?: number;
  /** `absolute` внутри boundary вместо `fixed` + viewport */
  inline?: boolean;
  /** Граница для inline-режима */
  boundaryRef?: RefObject<HTMLElement | null>;
};

/**
 * Вычисляет координаты всплывающей панели (fixed или absolute) с учётом scroll/resize.
 */
export function useFloatingOverlayPosition({
  isOpen,
  anchorRef,
  overlayRef,
  positioningMode = 'autoFlip',
  preferredPlacement = 'below',
  offset = 4,
  inline = false,
  boundaryRef,
}: UseFloatingOverlayPositionParameters) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const updatePosition = useCallback(() => {
    const anchorElement = anchorRef.current;
    if (!anchorElement) {
      return;
    }

    const nextPosition = calculateDropdownPosition({
      triggerElement: anchorElement,
      menuElement: overlayRef.current,
      boundaryElement: inline ? (boundaryRef?.current ?? anchorElement) : undefined,
      offset,
      mode: positioningMode,
      preferredPlacement,
    });

    setPosition(nextPosition);
  }, [anchorRef, overlayRef, inline, boundaryRef, offset, positioningMode, preferredPlacement]);

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    updatePosition();
    const frameId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(frameId);
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleScrollOrResize = () => {
      updatePosition();
    };

    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    document.addEventListener('scroll', handleScrollOrResize, true);

    const scrollableElements = findScrollableParents(anchorRef.current);

    scrollableElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.addEventListener('scroll', handleScrollOrResize, true);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
      document.removeEventListener('scroll', handleScrollOrResize, true);
      removeScrollListeners(scrollableElements, handleScrollOrResize);
    };
  }, [anchorRef, isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen || !overlayRef.current || typeof ResizeObserver === 'undefined') {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      updatePosition();
    });

    resizeObserver.observe(overlayRef.current);
    return () => resizeObserver.disconnect();
  }, [isOpen, overlayRef, updatePosition]);

  return { position, updatePosition };
}
