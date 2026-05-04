import styled, { css } from 'styled-components';
import { TransitionHandler } from '../../../handlers/uiHandlers';

/** Общий шиммер для плейсхолдера слайдера (как у `SkeletonEffect` у инпутов) */
const skeletonShimmer = css`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.backgroundTertiary} 25%,
    ${({ theme }) => theme.colors.borderSecondary} 50%,
    ${({ theme }) => theme.colors.backgroundTertiary} 75%
  );
  background-size: 200% 100%;
  animation: slider-skeleton-shimmer 1.5s infinite;
  transition: ${TransitionHandler()};

  @keyframes slider-skeleton-shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

/**
 * Короткая полоска (подписи min/max над треком).
 * @property $widthPx / $heightPx — размеры в px
 */
export const SliderSkeletonPill = styled.span<{ $widthPx: number; $heightPx: number }>`
  display: inline-block;
  flex-shrink: 0;
  width: ${({ $widthPx }) => $widthPx}px;
  height: ${({ $heightPx }) => $heightPx}px;
  border-radius: 4px;
  ${skeletonShimmer}
`;

/**
 * Полоска трека на всю ширину контейнера.
 * @property $heightPx — высота (как у рельсы)
 */
export const SliderSkeletonRailBar = styled.div<{ $heightPx: number }>`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: ${({ $heightPx }) => $heightPx}px;
  border-radius: ${({ $heightPx }) => Math.max(1, Math.round($heightPx / 2))}px;
  ${skeletonShimmer}
`;

/**
 * Круг бегунка-заглушки.
 * @property $sizePx — диаметр
 */
export const SliderSkeletonThumbCircle = styled.span<{ $sizePx: number }>`
  position: absolute;
  top: 50%;
  left: 0;
  width: ${({ $sizePx }) => $sizePx}px;
  height: ${({ $sizePx }) => $sizePx}px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  ${skeletonShimmer}
`;

/**
 * Контейнер под строку трека (задаёт высоту как у `SliderTrackWrap`).
 */
export const SliderSkeletonTrackSlot = styled.div<{ $heightPx: number }>`
  position: relative;
  width: 100%;
  height: ${({ $heightPx }) => $heightPx}px;
  flex-shrink: 0;
`;
