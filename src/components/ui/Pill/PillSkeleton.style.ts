import styled, { css } from 'styled-components';
import { TransitionHandler } from '../../../handlers/uiHandlers';

/** Шиммер скелетона Pill (как у Tag / слайдера) */
const pillSkeletonShimmer = css`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.backgroundTertiary} 25%,
    ${({ theme }) => theme.colors.borderSecondary} 50%,
    ${({ theme }) => theme.colors.backgroundTertiary} 75%
  );
  background-size: 200% 100%;
  animation: ui-pill-skeleton-shimmer 1.5s infinite;
  transition: ${TransitionHandler()};

  @keyframes ui-pill-skeleton-shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

/**
 * Плейсхолдер Pill при загрузке (не интерактивный `span`).
 * @property $borderRadius — скругление как у кнопки (`getPillGeometry`)
 * @property $minHeightPx — высота строки
 * @property $widthPx — ширина полоски
 */
export const PillSkeletonRoot = styled.span.withConfig({
  shouldForwardProp: prop => !['$borderRadius', '$minHeightPx', '$widthPx'].includes(String(prop)),
})<{ $borderRadius: string; $minHeightPx: number; $widthPx: number }>`
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  border-radius: ${({ $borderRadius }) => $borderRadius};
  min-height: ${({ $minHeightPx }) => $minHeightPx}px;
  height: ${({ $minHeightPx }) => $minHeightPx}px;
  width: ${({ $widthPx }) => $widthPx}px;
  flex-shrink: 0;
  ${pillSkeletonShimmer}
`;
