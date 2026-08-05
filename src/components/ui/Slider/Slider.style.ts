import styled, { css } from 'styled-components';
import { TransitionHandler } from '../../../handlers/uiHandlers';
import {
  resolveSliderTrackRailBackground,
  resolveSliderTrackRailBoxShadow,
  type SliderAccentKind,
} from './handlers';

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
  width: 100%;
  box-sizing: border-box;
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
  width: 100%;
  box-sizing: border-box;
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
  background-color: ${({ theme }) => resolveSliderTrackRailBackground(theme)};
  box-shadow: ${({ theme }) => resolveSliderTrackRailBoxShadow(theme) ?? 'none'};
  z-index: 0;
  pointer-events: none;
`;

/**
 * Заполненная часть трека.
 * @property $leftPct - Начало в % по внутренней ширине трека
 * @property $widthPct - Ширина в % по внутренней ширине
 * @property $thumbInsetPx / $thumbSizePx - Совпадают с геометрией бегунка
 * @property $activeHeightPx - Толщина активной полоски
 * @property $accentColor - Цвет заливки
 */
export const SliderTrackActive = styled.div<{
  $leftPct: number;
  $widthPct: number;
  $thumbInsetPx: number;
  $thumbSizePx: number;
  $activeHeightPx: number;
  $accentColor: string;
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
  background: ${({ $accentColor }) => $accentColor};
  z-index: 1;
  transition: ${TransitionHandler()};
  pointer-events: none;
`;

/**
 * Бегунок.
 * @property $thumbPx - Диаметр px
 * @property $disabled - Отключено
 * @property $accentColor - Цвет заливки
 * @property $accentHoverColor - Hover заливки
 * @property $focusRingColor - Кольцо фокуса
 */
export const SliderThumb = styled.button<{
  $thumbPx: number;
  $disabled?: boolean;
  $accentColor: string;
  $accentHoverColor: string;
  $focusRingColor: string;
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
  background: ${({ $accentColor }) => $accentColor};
  transform: translate(-50%, -50%);
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'grab')};
  z-index: 2;
  box-shadow: 0 1px 3px ${({ theme }) => theme.colors.shadow};
  transition: ${TransitionHandler()};

  &:hover:not(:disabled) {
    background: ${({ $accentHoverColor }) => $accentHoverColor};
  }

  &:active:not(:disabled) {
    cursor: grabbing;
  }

  &:focus-visible {
    outline: 2px solid ${({ $focusRingColor }) => $focusRingColor};
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

/**
 * Ряд «боковая иконка — трек — боковая иконка».
 * @property $embedded - В режиме `embeddedInInput` выравнивание по нижней кромке трека
 */
export const SliderTrackSideIconsRow = styled.div<{ $embedded?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: ${({ $embedded }) => ($embedded ? 'flex-end' : 'center')};
  gap: 8px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
`;

/** Колонка трека внутри ряда с боковыми иконками */
export const SliderTrackSideIconsTrack = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  width: 100%;
`;

/** Некликабельная обёртка боковой иконки (без `on*Click`) */
export const SliderSideIconStatic = styled.span`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors?.textSecondary ?? theme.colors.text};
`;

/**
 * Кнопка боковой иконки слайдера.
 * @property $disabled - Приглушённый вид
 */
export const SliderSideIconButton = styled.button.attrs({ type: 'button' })<{
  $disabled?: boolean;
}>`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 4px;
  border: none;
  background: transparent;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  color: ${({ theme, $disabled }) =>
    $disabled
      ? (theme.colors?.textTertiary ?? theme.colors.text)
      : (theme.colors?.textSecondary ?? theme.colors.text)};
  opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};
  transition: ${TransitionHandler()};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors?.text ?? theme.colors.text};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.info ?? theme.colors.primary};
    outline-offset: 2px;
  }
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
