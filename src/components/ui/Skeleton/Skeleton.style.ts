import styled, { css, keyframes } from 'styled-components';
import type { SkeletonGroupDirection } from '../../../types/ui';

/**
 * Анимация shimmer для эффекта загрузки
 */
const createShimmer = (speed: number) => keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const SkeletonWrapper = styled.span<{
  $width?: string;
  $height?: string;
  $shape: 'rect' | 'circle';
  $animated: boolean;
  $animationSpeed: number;
  $borderRadius?: string;
  $inline: boolean;
}>`
  display: ${({ $inline }) => ($inline ? 'inline-block' : 'block')};
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '16px'};
  border-radius: ${({ $borderRadius, $shape }) =>
    $borderRadius || ($shape === 'circle' ? '999px' : '12px')};
  background: ${({ theme }) => {
    if (theme.mode === 'dark') {
      return `linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.08) 0%,
        rgba(255, 255, 255, 0.18) 50%,
        rgba(255, 255, 255, 0.08) 100%
      )`;
    }
    return `linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.06) 0%,
      rgba(0, 0, 0, 0.12) 50%,
      rgba(0, 0, 0, 0.06) 100%
    )`;
  }};
  background-size: 200% 100%;
  ${({ $animated, $animationSpeed }) =>
    $animated
      ? css`
          animation: ${createShimmer($animationSpeed)} ${$animationSpeed}s ease-in-out infinite;
        `
      : css`
          animation: none;
        `}
  position: relative;
  overflow: hidden;
`;

export const SkeletonGroup = styled.div<{
  $gap: number;
  $direction: SkeletonGroupDirection | 'row' | 'column';
}>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: ${({ $gap }) => `${$gap}px`};
  ${({ $direction }) =>
    $direction === 'row' &&
    css`
      align-items: center;
    `}
`;
