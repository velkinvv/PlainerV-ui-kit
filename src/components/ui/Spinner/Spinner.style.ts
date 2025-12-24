import styled, { keyframes, css } from 'styled-components';
import type { SpinnerProps } from '../../../types/ui';
import { SpinnerVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { ColorHandler, SpinnerSizeHandler } from '../../../handlers/uiHandlers';

/**
 * Анимация вращения для circle варианта
 */
const createSpin = (speed: number) => keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

/**
 * Анимация для dots варианта
 */
const createDots = (speed: number) => keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

/**
 * Анимация для bars варианта
 */
const createBars = (speed: number) => keyframes`
  0%, 40%, 100% {
    transform: scaleY(0.4);
    opacity: 0.5;
  }
  20% {
    transform: scaleY(1);
    opacity: 1;
  }
`;

/**
 * Анимация пульсации для pulse варианта
 */
const createPulse = (speed: number) => keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.9);
  }
`;

/**
 * Контейнер спиннера
 */
export const SpinnerContainer = styled.div<{
  $size?: Size;
  $color?: string;
  $variant: SpinnerVariant | 'circle' | 'dots' | 'bars' | 'pulse';
  $speed: number;
  $thickness: number;
}>`
  display: inline-block;
  position: relative;

  ${({ $variant, $size, theme, $color, $speed, $thickness }) => {
    const spinnerSize = SpinnerSizeHandler($size ?? theme.globalSize);
    const spinnerColor = ColorHandler($color, theme.colors.primary);

    switch ($variant) {
      case 'circle':
        return css`
          width: ${spinnerSize};
          height: ${spinnerSize};
          border: ${$thickness}px solid ${theme.colors.borderSecondary};
          border-top: ${$thickness}px solid ${spinnerColor};
          border-radius: 50%;
          animation: ${createSpin($speed)} ${$speed}s linear infinite;
        `;

      case 'pulse':
        return css`
          width: ${spinnerSize};
          height: ${spinnerSize};
          background-color: ${spinnerColor};
          border-radius: 50%;
          animation: ${createPulse($speed)} ${$speed}s ease-in-out infinite;
        `;

      default:
        return css`
          width: ${spinnerSize};
          height: ${spinnerSize};
          border: ${$thickness}px solid ${theme.colors.borderSecondary};
          border-top: ${$thickness}px solid ${spinnerColor};
  border-radius: 50%;
          animation: ${createSpin($speed)} ${$speed}s linear infinite;
        `;
    }
  }}
`;

/**
 * Обёртка для спиннера с label или центрированием
 */
export const SpinnerWrapper = styled.div<{
  $centered: boolean;
  $labelPosition?: 'top' | 'bottom' | 'left' | 'right';
}>`
  display: inline-flex;
  flex-direction: ${({ $labelPosition }) => {
    if ($labelPosition === 'top' || $labelPosition === 'bottom') return 'column';
    if ($labelPosition === 'left' || $labelPosition === 'right') return 'row';
    return 'column';
  }};
  align-items: center;
  justify-content: center;
  gap: ${({ $labelPosition }) => {
    if ($labelPosition === 'top' || $labelPosition === 'bottom') return '8px';
    if ($labelPosition === 'left' || $labelPosition === 'right') return '12px';
    return '8px';
  }};

  ${({ $centered }) =>
    $centered &&
    css`
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`;

/**
 * Спиннер с точками
 */
export const SpinnerDots = styled.div<{
  $size?: Size;
  $color?: string;
  $speed: number;
  $thickness: number;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  width: ${({ $size, theme }) => SpinnerSizeHandler($size ?? theme.globalSize)};
  height: ${({ $size, theme }) => SpinnerSizeHandler($size ?? theme.globalSize)};

  span {
    width: calc(${({ $size, theme }) => SpinnerSizeHandler($size ?? theme.globalSize)} / 3);
    height: calc(${({ $size, theme }) => SpinnerSizeHandler($size ?? theme.globalSize)} / 3);
    background-color: ${({ $color, theme }) => ColorHandler($color, theme.colors.primary)};
    border-radius: 50%;
    animation: ${({ $speed }) => createDots($speed)} ${({ $speed }) => $speed * 1.4}s
      ease-in-out infinite;

    &:nth-child(1) {
      animation-delay: -${({ $speed }) => $speed * 0.32}s;
    }

    &:nth-child(2) {
      animation-delay: -${({ $speed }) => $speed * 0.16}s;
    }

    &:nth-child(3) {
      animation-delay: 0s;
    }
  }
`;

/**
 * Спиннер с полосами
 */
export const SpinnerBars = styled.div<{
  $size?: Size;
  $color?: string;
  $speed: number;
  $thickness: number;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;
  width: ${({ $size, theme }) => SpinnerSizeHandler($size ?? theme.globalSize)};
  height: ${({ $size, theme }) => SpinnerSizeHandler($size ?? theme.globalSize)};

  span {
    width: calc(${({ $size, theme }) => SpinnerSizeHandler($size ?? theme.globalSize)} / 5);
    height: ${({ $size, theme }) => SpinnerSizeHandler($size ?? theme.globalSize)};
    background-color: ${({ $color, theme }) => ColorHandler($color, theme.colors.primary)};
    border-radius: 2px;
    animation: ${({ $speed }) => createBars($speed)} ${({ $speed }) => $speed * 1.2}s
      ease-in-out infinite;

    &:nth-child(1) {
      animation-delay: -${({ $speed }) => $speed * 0.4}s;
    }

    &:nth-child(2) {
      animation-delay: -${({ $speed }) => $speed * 0.2}s;
    }

    &:nth-child(3) {
      animation-delay: 0s;
    }
  }
`;

/**
 * Текст рядом со спиннером
 */
export const SpinnerLabel = styled.span<{
  $position: 'top' | 'bottom' | 'left' | 'right';
}>`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
  order: ${({ $position }) => {
    if ($position === 'top' || $position === 'left') return -1;
    return 1;
  }};
`;
