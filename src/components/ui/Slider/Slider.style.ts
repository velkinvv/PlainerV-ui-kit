import styled, { css } from 'styled-components';
import { TransitionHandler } from '../../../handlers/uiHandlers';

/** Корневая колонка слайдера */
export const SliderRoot = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  min-width: 0;
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

/** Область трека и бегунков */
export const SliderTrackWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  touch-action: none;
`;

/** Невидимая зона клика по всей ширине (под бегунком) */
export const SliderTrackHit = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 24px;
  z-index: 0;
`;

/** Серый фон трека (неактивная часть) */
export const SliderTrackRail = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 4px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.borderSecondary};
  z-index: 0;
`;

/**
 * Активный синий сегмент.
 * @property $leftPct - Начало в % от левого края
 * @property $widthPct - Ширина в %
 */
export const SliderTrackActive = styled.div<{ $leftPct: number; $widthPct: number }>`
  position: absolute;
  left: ${({ $leftPct }) => $leftPct}%;
  width: ${({ $widthPct }) => $widthPct}%;
  top: 50%;
  transform: translateY(-50%);
  height: 6px;
  margin-left: 0;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.primary};
  z-index: 1;
  transition: ${TransitionHandler()};
  pointer-events: none;
`;

/**
 * Бегунок.
 * @property $thumbPx - Диаметр px
 * @property $disabled - Отключено
 */
export const SliderThumb = styled.button<{ $thumbPx: number; $disabled?: boolean }>`
  position: absolute;
  top: 50%;
  left: 0;
  width: ${({ $thumbPx }) => $thumbPx}px;
  height: ${({ $thumbPx }) => $thumbPx}px;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  transform: translate(-50%, -50%);
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'grab')};
  z-index: 2;
  box-shadow: 0 1px 3px ${({ theme }) => theme.colors.shadow};
  transition: ${TransitionHandler()};

  &:active:not(:disabled) {
    cursor: grabbing;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
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
