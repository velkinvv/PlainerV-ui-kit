import styled, { css } from 'styled-components';
import { CarouselProgressBarPosition } from '../../../types/ui';
import {
  getCarouselSurfaceTokens,
  type CarouselThemeContext,
} from '../../../handlers/carouselGlassHandlers';

type CarouselAutoplayProgressThemeSlice = {
  mode: CarouselThemeContext['mode'];
  colors: CarouselThemeContext['colors'];
  surfaceMaterial?: CarouselThemeContext['surfaceMaterial'];
};

/**
 * Контекст темы для прогресса autoplay.
 * @param theme — styled-components theme
 */
const getAutoplayProgressThemeContext = (
  theme: CarouselAutoplayProgressThemeSlice,
): CarouselThemeContext => ({
  mode: theme.mode,
  colors: theme.colors,
  surfaceMaterial: theme.surfaceMaterial,
});

/**
 * Обёртка линейного прогресса autoplay.
 * @property $position — inner / outer
 */
export const CarouselAutoplayProgressRoot = styled.div<{ $position: CarouselProgressBarPosition }>`
  display: flex;
  align-items: center;
  gap: 8px;
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
          margin-top: 8px;
          padding: 0 2px;
        `}
`;

/** Дорожка линейного прогресса autoplay */
export const CarouselAutoplayProgressTrack = styled.div`
  flex: 1 1 auto;
  height: 4px;
  border-radius: 9999px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.35);

  ${({ theme }) => {
    const tokens = getCarouselSurfaceTokens(getAutoplayProgressThemeContext(theme));

    return tokens.dotsTrackBackground
      ? css`
          background: ${tokens.dotsTrackBackground};
        `
      : css``;
  }}
`;

/** Заполнение линейного прогресса autoplay */
export const CarouselAutoplayProgressFill = styled.div<{ $progressRatio: number }>`
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: left center;
  transform: scaleX(${({ $progressRatio }) => Math.min(Math.max($progressRatio, 0), 1)});
  background: ${({ theme }) => theme.colors.primary};
  border-radius: inherit;
  will-change: transform;
`;

/** Подпись обратного отсчёта autoplay в панели управления */
export const CarouselAutoplayProgressCountdown = styled.span`
  flex: 0 0 auto;
  min-width: 2.5rem;
  font-size: 12px;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  text-align: center;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.92;

  ${({ theme }) => {
    const tokens = getCarouselSurfaceTokens(getAutoplayProgressThemeContext(theme));

    return tokens.controlBackground
      ? css`
          padding: 4px 8px;
          border-radius: 9999px;
          background: ${tokens.controlBackground};
          border: ${tokens.controlBorder};
        `
      : css``;
  }}
`;
