import { useState, useEffect } from 'react';

export interface ScrollPosition {
  x: number;
  y: number;
}

export interface UseScrollPositionOptions {
  element?: HTMLElement | null;
  throttle?: number;
  enabled?: boolean;
}

export function useScrollPosition({
  element,
  throttle = 100,
  enabled = true,
}: UseScrollPositionOptions = {}): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!enabled) return;

    let timeoutId: NodeJS.Timeout;
    const targetElement = element || window;

    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const isWindowTarget = targetElement === window;
        const x = isWindowTarget
          ? window.pageXOffset || document.documentElement.scrollLeft
          : (targetElement as HTMLElement).scrollLeft;

        const y = isWindowTarget
          ? window.pageYOffset || document.documentElement.scrollTop
          : (targetElement as HTMLElement).scrollTop;

        setScrollPosition({ x, y });
      }, throttle);
    };

    // Устанавливаем начальное значение
    handleScroll();

    targetElement.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      targetElement.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [element, throttle, enabled]);

  return scrollPosition;
}

// Упрощенная версия для window
export function useWindowScrollPosition(throttle: number = 100): ScrollPosition {
  return useScrollPosition({ throttle });
}

// Хук для определения направления скролла
export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.pageYOffset;

      if (currentY > lastY) {
        setDirection('down');
      } else if (currentY < lastY) {
        setDirection('up');
      }

      setLastY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastY]);

  return direction;
}
