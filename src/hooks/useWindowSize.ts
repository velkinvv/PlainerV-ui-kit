import { useState, useEffect } from 'react';

export interface WindowSize {
  width: number;
  height: number;
}

/**
 * Нижняя граница ширины окна для «десктопа» (согласовано с `useIsMobile` / `useIsTablet`: 768 / 1024).
 */
export const DESKTOP_MIN_INNER_WIDTH_PX = 1025;

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Устанавливаем начальное значение
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}

// Хук для определения размера экрана
export function useScreenSize(): WindowSize {
  const [screenSize, setScreenSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.screen.width : 0,
    height: typeof window !== 'undefined' ? window.screen.height : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setScreenSize({
        width: window.screen.width,
        height: window.screen.height,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
}

// Хук для определения доступного размера окна (без панелей браузера)
export function useAvailableSize(): WindowSize {
  const [availableSize, setAvailableSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.screen.availWidth : 0,
    height: typeof window !== 'undefined' ? window.screen.availHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setAvailableSize({
        width: window.screen.availWidth,
        height: window.screen.availHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return availableSize;
}

/**
 * Десктопная раскладка по ширине окна браузера (`innerWidth`), обновляется на `resize`.
 * Композиция над {@link useWindowSize}; порог по умолчанию совпадает с пресетами `useMediaQuery`.
 *
 * @param minInnerWidthPx - минимальная ширина окна в пикселях для `true` (по умолчанию {@link DESKTOP_MIN_INNER_WIDTH_PX})
 */
export function useIsDesktop(minInnerWidthPx: number = DESKTOP_MIN_INNER_WIDTH_PX): boolean {
  const { width } = useWindowSize();
  return width >= minInnerWidthPx;
}
