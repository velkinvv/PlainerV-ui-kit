import styled, { css } from 'styled-components';
import { TransitionHandler } from '../../../handlers/uiHandlers';
import type { SliderAccentKind } from './handlers';

/**
 * Корневая колонка слайдера.
 * @property $valueLabelPadPx — симметричные `padding-left` / `padding-right`, если показаны подписи значений (антиклий у краёв)
 */
export const SliderRoot = styled.div<{ $fullWidth?: boolean; $valueLabelPadPx?: number }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  min-width: 0;
  box-sizing: border-box;
  ${({ $valueLabelPadPx }) =>
    $valueLabelPadPx != null && $valueLabelPadPx > 0
      ? css`
          padding-left: ${$valueLabelPadPx}px;
          padding-right: ${$valueLabelPadPx}px;
        `
      : undefined}
`;

/** Строка подписей min / max над треком */
export const SliderScaleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const SliderScaleLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.textTertiary};
`;

/**
 * Тонкая обводка вокруг трека при статусе (как рамка у `Input` с ошибкой).
 * @property $accent - Вид акцента; при `default` рамки нет
 */
export const SliderTrackRingWrap = styled.div<{ $accent: SliderAccentKind }>`
  position: relative;
  border-radius: 10px;
  padding: 1px;
  margin: -1px;
  ${({ $accent, theme }) =>
    $accent === 'error'
      ? css`
          box-shadow: 0 0 0 1px ${theme.colors.danger};
        `
      : $accent === 'success'
        ? css`
            box-shadow: 0 0 0 1px ${theme.colors.success};
          `
        : $accent === 'warning'
          ? css`
              box-shadow: 0 0 0 1px ${theme.colors.warning};
            `
          : undefined}
`;

/**
 * Область трека и бегунков.
 * @property $trackWrapHeightPx - Высота блока (зависит от размера и толщины полосок)
 */
export const SliderTrackWrap = styled.div<{ $trackWrapHeightPx: number }>`
  position: relative;
  display: flex;
  align-items: center;
  height: ${({ $trackWrapHeightPx }) => $trackWrapHeightPx}px;
  touch-action: none;
`;

/**
 * Невидимая зона клика по ширине «внутреннего» трека (без половинок бегунка у краёв).
 * @property $thumbInsetPx - Отступ слева/справа, половина диаметра бегунка
 * @property $hitHeightPx - Высота зоны клика (та же шкала, что и толщина трека)
 */
export const SliderTrackHit = styled.div<{ $thumbInsetPx: number; $hitHeightPx: number }>`
  position: absolute;
  left: ${({ $thumbInsetPx }) => $thumbInsetPx}px;
  right: ${({ $thumbInsetPx }) => $thumbInsetPx}px;
  top: 50%;
  transform: translateY(-50%);
  height: ${({ $hitHeightPx }) => $hitHeightPx}px;
  z-index: 0;
`;

/**
 * Серый фон трека (неактивная часть).
 * @property $thumbInsetPx - Совпадает с инсетом бегунка
 * @property $railHeightPx - Толщина серой линии
 */
export const SliderTrackRail = styled.div<{ $thumbInsetPx: number; $railHeightPx: number }>`
  position: absolute;
  left: ${({ $thumbInsetPx }) => $thumbInsetPx}px;
  right: ${({ $thumbInsetPx }) => $thumbInsetPx}px;
  top: 50%;
  transform: translateY(-50%);
  height: ${({ $railHeightPx }) => $railHeightPx}px;
  border-radius: ${({ $railHeightPx }) => Math.max(1, Math.round($railHeightPx / 2))}px;
  background: ${({ theme }) => theme.colors.borderSecondary};
  z-index: 0;
`;

/**
 * Заполненная часть трека (яркий акцент `theme.colors.info`, не `primary` из палитры blue).
 * @property $leftPct - Начало в % по внутренней ширине трека
 * @property $widthPct - Ширина в % по внутренней ширине
 * @property $thumbInsetPx / $thumbSizePx - Совпадают с геометрией бегунка
 * @property $activeHeightPx - Толщина синей полоски
 */
export const SliderTrackActive = styled.div<{
  $leftPct: number;
  $widthPct: number;
  $thumbInsetPx: number;
  $thumbSizePx: number;
  $activeHeightPx: number;
  $accent: SliderAccentKind;
}>`
  position: absolute;
  left: ${({ $leftPct, $thumbInsetPx, $thumbSizePx }) =>
    `calc(${$thumbInsetPx}px + (100% - ${$thumbSizePx}px) * ${$leftPct} / 100)`};
  width: ${({ $widthPct, $thumbSizePx }) =>
    `calc((100% - ${$thumbSizePx}px) * ${$widthPct} / 100)`};
  top: 50%;
  transform: translateY(-50%);
  height: ${({ $activeHeightPx }) => $activeHeightPx}px;
  margin-left: 0;
  border-radius: ${({ $activeHeightPx }) => Math.max(1, Math.round($activeHeightPx / 2))}px;
  background: ${({ theme, $accent }) => {
    switch ($accent) {
      case 'error':
        return theme.colors.danger;
      case 'success':
        return theme.colors.success;
      case 'warning':
        return theme.colors.warning;
      default:
        return theme.colors.info;
    }
  }};
  z-index: 1;
  transition: ${TransitionHandler()};
  pointer-events: none;
`;

/**
 * Бегунок.
 * @property $thumbPx - Диаметр px
 * @property $disabled - Отключено
 * @property $accent - Цветовой акцент (трек и обводка согласованы)
 */
export const SliderThumb = styled.button<{
  $thumbPx: number;
  $disabled?: boolean;
  $accent: SliderAccentKind;
}>`
  position: absolute;
  top: 50%;
  left: 0;
  width: ${({ $thumbPx }) => $thumbPx}px;
  height: ${({ $thumbPx }) => $thumbPx}px;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: ${({ theme, $accent }) => {
    switch ($accent) {
      case 'error':
        return theme.colors.danger;
      case 'success':
        return theme.colors.success;
      case 'warning':
        return theme.colors.warning;
      default:
        return theme.colors.info;
    }
  }};
  transform: translate(-50%, -50%);
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'grab')};
  z-index: 2;
  box-shadow: 0 1px 3px ${({ theme }) => theme.colors.shadow};
  transition: ${TransitionHandler()};

  &:hover:not(:disabled) {
    background: ${({ theme, $accent }) => {
      switch ($accent) {
        case 'error':
          return theme.colors.dangerHover;
        case 'success':
          return theme.colors.successHover;
        case 'warning':
          return theme.colors.warning;
        default:
          return theme.colors.infoHover;
      }
    }};
    filter: ${({ $accent }) => ($accent === 'warning' ? 'brightness(0.95)' : 'none')};
  }

  &:active:not(:disabled) {
    cursor: grabbing;
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme, $accent }) => {
        switch ($accent) {
          case 'error':
            return theme.colors.danger;
          case 'success':
            return theme.colors.success;
          case 'warning':
            return theme.colors.warning;
          default:
            return theme.colors.info;
        }
      }};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.45;
  }
`;

/** Строка под значениями под треком */
export const SliderValuesRow = styled.div`
  position: relative;
  min-height: 22px;
  margin-top: 2px;
`;

/**
 * Подпись значения под бегунком (позиционирование снаружи через style.left).
 * @property $disabled - Приглушить текст
 */
export const SliderValueLabel = styled.span<{ $disabled?: boolean }>`
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: 500;
  line-height: 1.3;
  color: ${({ theme, $disabled }) => ($disabled ? theme.colors.textTertiary : theme.colors.text)};
  white-space: nowrap;
`;

/** Скрытый input для отправки формы (одиночный слайдер) */
export const SliderHiddenInput = styled.input.attrs({ type: 'hidden' })`
  display: none;
`;

/** Ряд полей «От» / «До» под range */
export const RangeSliderInputsRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  width: 100%;
  margin-top: 4px;

  & > * {
    flex: 1 1 0;
    min-width: 0;
  }
`;
