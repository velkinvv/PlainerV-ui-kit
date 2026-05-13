import styled, { css } from 'styled-components';
import { TransitionHandler } from '../../../handlers/uiHandlers';

/** Шиммер для плейсхолдера тега (как у слайдера / инпутов) */
const tagSkeletonShimmer = css`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.backgroundTertiary} 25%,
    ${({ theme }) => theme.colors.borderSecondary} 50%,
    ${({ theme }) => theme.colors.backgroundTertiary} 75%
  );
  background-size: 200% 100%;
  animation: ui-tag-skeleton-shimmer 1.5s infinite;
  transition: ${TransitionHandler()};

  @keyframes ui-tag-skeleton-shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

/**
 * Плейсхолдер тега при загрузке.
 * @property $minHeight — высота строки как у обычного тега (`getTagMetrics`)
 * @property $widthPx — ширина полоски в px
 */
export const TagSkeletonRoot = styled.span.withConfig({
  shouldForwardProp: (prop) => !['$minHeight', '$widthPx'].includes(String(prop)),
})<{ $minHeight: string; $widthPx: number }>`
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  border-radius: 6px;
  min-height: ${({ $minHeight }) => $minHeight};
  height: ${({ $minHeight }) => $minHeight};
  width: ${({ $widthPx }) => $widthPx}px;
  flex-shrink: 0;
  ${tagSkeletonShimmer}
`;
