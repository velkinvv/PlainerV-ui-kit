import styled from 'styled-components';
import { motion } from 'framer-motion';
import { createStyledShouldForwardProp } from '../../../handlers/styledComponentHandlers';
import { BorderRadiusHandler, TransitionHandler } from '../../../handlers/uiHandlers';
import type { FloatButtonEdgeOffsets } from './handlers';

type FloatButtonAnchorStyleProps = {
  $position: 'fixed' | 'absolute';
  $zIndex: number;
  $offsets: FloatButtonEdgeOffsets;
};

/**
 * Якорь плавающей кнопки / группы.
 * @property $position - fixed (viewport) или absolute (контейнер)
 * @property $zIndex - Слой
 * @property $offsets - Логические inset
 */
export const FloatButtonAnchor = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<FloatButtonAnchorStyleProps>`
  position: ${({ $position }) => $position};
  z-index: ${({ $zIndex }) => $zIndex};
  inset-block-start: ${({ $offsets }) =>
    $offsets.insetBlockStart != null ? `${$offsets.insetBlockStart}px` : 'auto'};
  inset-block-end: ${({ $offsets }) =>
    $offsets.insetBlockEnd != null ? `${$offsets.insetBlockEnd}px` : 'auto'};
  inset-inline-start: ${({ $offsets }) =>
    $offsets.insetInlineStart != null ? `${$offsets.insetInlineStart}px` : 'auto'};
  inset-inline-end: ${({ $offsets }) =>
    $offsets.insetInlineEnd != null ? `${$offsets.insetInlineEnd}px` : 'auto'};
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

type FloatButtonSurfaceStyleProps = {
  $sizePx: number;
  $hasLabel: boolean;
  $shape: 'circle' | 'square';
  $background: string;
  $color: string;
  $border: string;
  $hoverBackground: string;
  $hoverColor: string;
  $hoverBorder: string;
  $disabled: boolean;
};

const surfaceShouldForward = createStyledShouldForwardProp();

/**
 * Поверхность кнопки / ссылки.
 */
export const FloatButtonSurface = styled(motion.button).withConfig({
  shouldForwardProp: surfaceShouldForward,
})<FloatButtonSurfaceStyleProps>`
  pointer-events: auto;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: ${({ $hasLabel, $sizePx }) => ($hasLabel ? `0 ${$sizePx / 2.5}px` : '0')};
  gap: 8px;
  width: ${({ $hasLabel, $sizePx }) => ($hasLabel ? 'auto' : `${$sizePx}px`)};
  min-width: ${({ $sizePx }) => `${$sizePx}px`};
  height: ${({ $sizePx }) => `${$sizePx}px`};
  font-family: inherit;
  font-weight: 600;
  font-size: ${({ $sizePx }) => ($sizePx >= 48 ? '16px' : '14px')};
  line-height: 1;
  text-decoration: none;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  position: relative;
  overflow: visible;
  outline: none;
  opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};
  border: ${({ $border }) => $border};
  background: ${({ $background }) => $background};
  color: ${({ $color }) => $color};
  box-shadow: ${({ theme }) => theme.shadow};
  border-radius: ${({ $shape, $hasLabel, $sizePx, theme }) => {
    if ($shape === 'circle') {
      return $hasLabel ? `${$sizePx / 2}px` : '50%';
    }
    return BorderRadiusHandler(theme.borderRadius);
  }};
  transition: ${TransitionHandler()};

  &:hover:not(:disabled) {
    background: ${({ $hoverBackground }) => $hoverBackground};
    color: ${({ $hoverColor }) => $hoverColor};
    border: ${({ $hoverBorder }) => $hoverBorder};
  }

  &:focus-visible {
    outline: 2px solid ${({ $color }) => $color};
    outline-offset: 3px;
  }
`;

export const FloatButtonLinkSurface = styled(motion.a).withConfig({
  shouldForwardProp: surfaceShouldForward,
})<FloatButtonSurfaceStyleProps>`
  pointer-events: auto;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: ${({ $hasLabel, $sizePx }) => ($hasLabel ? `0 ${$sizePx / 2.5}px` : '0')};
  gap: 8px;
  width: ${({ $hasLabel, $sizePx }) => ($hasLabel ? 'auto' : `${$sizePx}px`)};
  min-width: ${({ $sizePx }) => `${$sizePx}px`};
  height: ${({ $sizePx }) => `${$sizePx}px`};
  font-family: inherit;
  font-weight: 600;
  font-size: ${({ $sizePx }) => ($sizePx >= 48 ? '16px' : '14px')};
  line-height: 1;
  text-decoration: none;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  position: relative;
  overflow: visible;
  outline: none;
  opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};
  border: ${({ $border }) => $border};
  background: ${({ $background }) => $background};
  color: ${({ $color }) => $color};
  box-shadow: ${({ theme }) => theme.shadow};
  border-radius: ${({ $shape, $hasLabel, $sizePx, theme }) => {
    if ($shape === 'circle') {
      return $hasLabel ? `${$sizePx / 2}px` : '50%';
    }
    return BorderRadiusHandler(theme.borderRadius);
  }};
  transition: ${TransitionHandler()};

  &:hover:not(:disabled) {
    background: ${({ $hoverBackground }) => $hoverBackground};
    color: ${({ $hoverColor }) => $hoverColor};
    border: ${({ $hoverBorder }) => $hoverBorder};
  }

  &:focus-visible {
    outline: 2px solid ${({ $color }) => $color};
    outline-offset: 3px;
  }
`;

export const FloatButtonBadgeSlot = styled.span`
  position: absolute;
  inset-block-start: -4px;
  inset-inline-end: -4px;
  pointer-events: none;
  line-height: 0;
`;

export const FloatButtonIconSlot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;

  svg {
    width: 1.25em;
    height: 1.25em;
  }
`;

type FloatButtonFanStyleProps = {
  $expandPlacement: 'top' | 'bottom' | 'start' | 'end';
};

/**
 * Контейнер веера группы.
 */
export const FloatButtonFan = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<FloatButtonFanStyleProps>`
  pointer-events: auto;
  display: flex;
  gap: 12px;
  flex-direction: ${({ $expandPlacement }) => {
    if ($expandPlacement === 'start' || $expandPlacement === 'end') {
      return 'row';
    }
    return 'column';
  }};
`;

export const FloatButtonProgressSvg = styled.svg`
  position: absolute;
  inset: -4px;
  width: calc(100% + 8px);
  height: calc(100% + 8px);
  pointer-events: none;
  transform: rotate(-90deg);
`;
