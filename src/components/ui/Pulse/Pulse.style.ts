import styled, { keyframes } from 'styled-components';
import { createStyledShouldForwardProp } from '../../../handlers/styledComponentHandlers';
import type { PulseGeometry } from './handlers';

/**
 * Keyframes волны для конкретного размера.
 * @param geometry - Геометрия Pulse
 */
const createPulseWaveKeyframes = (geometry: PulseGeometry) => keyframes`
  0% {
    width: ${geometry.waveStartSize}px;
    height: ${geometry.waveStartSize}px;
    opacity: 1;
    border-width: 1px;
    filter: blur(0.33px);
  }

  80% {
    width: ${geometry.waveEndSize}px;
    height: ${geometry.waveEndSize}px;
    opacity: 0;
    border-width: ${geometry.waveEndBorderWidth}px;
    filter: blur(${geometry.waveEndBlur}px);
  }

  100% {
    opacity: 0;
  }
`;

type PulseRootProps = {
  $geometry: PulseGeometry;
  $color: string;
};

/**
 * Корневая точка Pulse с анимированной волной (`::before`).
 * @property $geometry - Размеры точки и волны
 * @property $color - Цвет заливки и обводки волны
 */
export const PulseRoot = styled.span.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<PulseRootProps>`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: ${({ $geometry }) => `${$geometry.dotSize}px`};
  height: ${({ $geometry }) => `${$geometry.dotSize}px`};
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  vertical-align: middle;

  &::before {
    position: absolute;
    content: '';
    box-sizing: border-box;
    border-radius: 50%;
    border-style: solid;
    border-color: ${({ $color }) => $color};
    background-color: transparent;
    animation-name: ${({ $geometry }) => createPulseWaveKeyframes($geometry)};
    animation-duration: 2500ms;
    animation-timing-function: cubic-bezier(0, 0, 0.58, 1);
    animation-iteration-count: infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
      opacity: 0;
    }
  }
`;
