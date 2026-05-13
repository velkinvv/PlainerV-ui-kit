import { useState, useEffect } from 'react';

export { useIsDesktop } from './useWindowSize';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Устанавливаем начальное значение
    setMatches(mediaQuery.matches);

    // Создаем обработчик изменений
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Добавляем слушатель
    mediaQuery.addEventListener('change', handleChange);

    // Очистка
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

// Предопределенные медиа-запросы
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsTablet = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
export const useIsLargeScreen = () => useMediaQuery('(min-width: 1440px)');

// Хук для определения ориентации
export const useIsPortrait = () => useMediaQuery('(orientation: portrait)');
export const useIsLandscape = () => useMediaQuery('(orientation: landscape)');

// Хук для определения поддержки hover
export const useSupportsHover = () => useMediaQuery('(hover: hover)');
export const useSupportsTouch = () => useMediaQuery('(pointer: coarse)');
