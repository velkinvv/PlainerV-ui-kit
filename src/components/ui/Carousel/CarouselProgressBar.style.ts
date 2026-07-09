import styled, { css, keyframes } from 'styled-components';
import { CarouselProgressBarPosition } from '../../../types/ui';
import {
  getCarouselSurfaceTokens,
  type CarouselThemeContext,
} from '../../../handlers/carouselGlassHandlers';

type CarouselProgressThemeSlice = {
  mode: CarouselThemeContext['mode'];
  colors: CarouselThemeContext['colors'];
  surfaceMaterial?: CarouselThemeContext['surfaceMaterial'];
};

/**
 * Контекст темы для полоски прогресса.
 * @param theme — styled-components theme
 */
const getProgressThemeContext = (theme: CarouselProgressThemeSlice): CarouselThemeContext => ({
  mode: theme.mode,
  colors: theme.colors,
  surfaceMaterial: theme.surfaceMaterial,
});

const carouselProgressFillAnimation = keyframes`
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
`;

/**
 * Обёртка полоски прогресса.
 * @property $position — inner / outer
 */
export const CarouselProgressBarRoot = styled.div<{ $position: CarouselProgressBarPosition }>`
  display: flex;
  align-items: stretch;
  gap: 4px;
  width: 100%;
  box-sizing: border-box;
  pointer-events: none;

  ${({ $position }) =>
    $position === CarouselProgressBarPosition.INNER
      ? css`
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          z-index: 4;
        `
      : css`
          position: relative;
          margin-top: 10px;
          padding: 0 2px;
        `}
`;

/** Сегмент полоски прогресса */
export const CarouselProgressSegment = styled.div`
  flex: 1 1 0;
  height: 3px;
  border-radius: 9999px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.35);

  ${({ theme }) => {
    const tokens = getCarouselSurfaceTokens(getProgressThemeContext(theme));

    return tokens.dotsTrackBackground
      ? css`
          background: ${tokens.dotsTrackBackground};
        `
      : css``;
  }}
`;

/**
 * Заполнение сегмента прогресса.
 * @property $isComplete — сегмент уже пройден
 * @property $isActive — текущий сегмент
 * @property $isAnimating — анимация автопрокрутки
 * @property $durationMs — длительность анимации
 */
export const CarouselProgressSegmentFill = styled.div<{
  $isComplete: boolean;
  $isActive: boolean;
  $isAnimating: boolean;
  $durationMs: number;
}>`
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: left center;
  transform: scaleX(
    ${({ $isComplete, $isActive, $isAnimating }) => {
      if ($isComplete || ($isActive && !$isAnimating)) {
        return 1;
      }

      return 0;
    }}
  );
  background: ${({ theme }) => theme.colors.primary};
  border-radius: inherit;

  ${({ $isActive, $isAnimating, $durationMs }) =>
    $isActive && $isAnimating
      ? css`
          animation: ${carouselProgressFillAnimation} ${$durationMs}ms linear forwards;
        `
      : css`
          transition: transform 0.25s ease;
        `}
`;
