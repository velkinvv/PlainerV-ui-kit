import styled, { css } from 'styled-components';
import { BorderRadiusHandler } from '../../../handlers/uiHandlers';
import { Size } from '../../../types/sizes';
import {
  SliderTrackActive,
  SliderTrackHit,
  SliderTrackRail,
  SliderTrackRingWrap,
  SliderTrackWrap,
  SliderThumb,
} from './Slider.style';

/** Скругления нижних углов как у рамки `Input`. */
const embeddedBottomCornerRadius = (theme: { borderRadius: Size }) => {
  const radius = BorderRadiusHandler(theme.borderRadius);
  return css`
    border-radius: 0;
    border-bottom-left-radius: ${radius};
    border-bottom-right-radius: ${radius};
  `;
};

/** Серая рельса на всю ширину полоски трека (полоска уже смещена на 1px от рамки). */
const embeddedRailLineAtBottom = css`
  top: auto;
  bottom: 0;
  left: 0;
  right: 0;
  transform: none;
`;

/**
 * Синий сегмент: только вертикальное позиционирование.
 * `left` / `width` из `SliderTrackActive` ($leftPct / $widthPct) не переопределяем.
 */
const embeddedActiveLineAtBottom = css`
  top: auto;
  bottom: 0;
  transform: none;
`;

/** Нижняя зона трека внутри `SliderInput`. */
export const SliderEmbeddedFooter = styled.div`
  flex-shrink: 0;
  width: 100%;
  margin: 0;
  overflow: visible;
`;

/**
 * Внутри `SliderInput` рамку рисует `InputWrapper`; дублирующая box-shadow ломает нижние скругления.
 */
export const SliderEmbeddedRingWrap = styled(SliderTrackRingWrap)`
  margin: 0;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
`;

export const SliderEmbeddedTrackWrap = styled(SliderTrackWrap)`
  position: relative;
  width: 100%;
  overflow: visible;
`;

export const SliderEmbeddedTrackHit = styled(SliderTrackHit)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transform: none;
`;

/**
 * Полоска линий у нижней грани поля.
 * @property $lineHeightPx - Высота серой/синей линии.
 */
export const SliderEmbeddedTrackStrip = styled.div<{ $lineHeightPx: number }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  ${({ theme, $lineHeightPx }) => {
    const radiusPx =
      Number.parseInt(BorderRadiusHandler(theme.borderRadius), 10) || 8;
    const heightPx = Math.max($lineHeightPx, radiusPx);
    return css`
      height: ${heightPx}px;
    `;
  }}
  overflow: hidden;
  pointer-events: none;
  ${({ theme }) => embeddedBottomCornerRadius(theme)}
`;

export const SliderEmbeddedTrackRail = styled(SliderTrackRail)`
  ${embeddedRailLineAtBottom}
  ${({ theme }) => embeddedBottomCornerRadius(theme)}
`;

/**
 * Активная полоса во вложенном треке: рельса на всю ширину, заливка от левого края при $leftPct=0.
 * @property $fillToEnd - Скругление справа у активной полосы (конец диапазона у max).
 */
export const SliderEmbeddedTrackActive = styled(SliderTrackActive)<{ $fillToEnd?: boolean }>`
  left: ${({ $leftPct, $thumbInsetPx, $thumbSizePx }) =>
    ($leftPct ?? 0) <= 0
      ? '0'
      : `calc(${$thumbInsetPx}px + (100% - ${$thumbSizePx}px) * ${$leftPct} / 100)`};
  width: ${({ $leftPct, $widthPct, $thumbInsetPx, $thumbSizePx }) =>
    ($leftPct ?? 0) <= 0
      ? `calc(${$thumbInsetPx}px + (100% - ${$thumbSizePx}px) * ${($widthPct ?? 0)} / 100)`
      : `calc((100% - ${$thumbSizePx}px) * ${($widthPct ?? 0)} / 100)`};
  ${embeddedActiveLineAtBottom}
  ${({ theme, $fillToEnd }) => {
    const radius = BorderRadiusHandler(theme.borderRadius);
    return css`
      border-radius: 0;
      border-bottom-left-radius: ${radius};
      border-bottom-right-radius: ${$fillToEnd ? radius : 0};
    `;
  }}
`;

/** Бегунок на нижней линии трека (`left` и `bottom` из компонента). */
export const SliderEmbeddedThumb = styled(SliderThumb)`
  top: auto;
  z-index: 3;
  transform: translate(-50%, 50%);
`;
