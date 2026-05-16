import styled, { css } from 'styled-components';
import {
  BorderRadiusHandler,
  InputPaddingHandler,
  InputSizeHandler,
} from '../../../../handlers/uiHandlers';
import { ClearButton, InputWrapper } from '../shared';
import {
  SliderScaleRow,
  SliderThumb,
  SliderTrackActive,
  SliderTrackHit,
  SliderTrackRail,
  SliderTrackRingWrap,
  SliderTrackWrap,
} from '../../Slider/Slider.style';
import type { Size } from '../../../../types/sizes';

/** Скругления нижних углов как у рамки `Input`. */
const sliderInputBottomCornerRadius = (theme: { borderRadius: Size }) => {
  const radius = BorderRadiusHandler(theme.borderRadius);
  return css`
    border-radius: 0;
    border-bottom-left-radius: ${radius};
    border-bottom-right-radius: ${radius};
  `;
};

/** Линия трека у нижней кромки, на всю ширину. */
const sliderInputTrackLineAtBottom = css`
  top: auto;
  bottom: 0;
  left: 0;
  right: 0;
  transform: none;
`;

/**
 * Рамка поля: padding у тела, низ — трек; скругление снизу как у инпута.
 * @property $fieldSize - Размер поля (для совместимости с оболочкой).
 */
export const SliderInputFieldShell = styled(InputWrapper)<{ $fieldSize: Size }>`
  flex-direction: column;
  align-items: stretch;
  border-bottom: none;
  overflow: visible;

  ${({ $fieldSize, theme }) => css`
    && {
      min-height: ${InputSizeHandler($fieldSize ?? theme.defaultInputSize)};
      padding: 0;
    }
  `}
`;

/**
 * Верхняя зона: значение / число, иконки (с отступами как у `Input`).
 * @property $fieldSize - Размер поля.
 */
export const SliderInputBody = styled.div<{ $fieldSize: Size }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  min-width: 0;
  flex: 1 1 auto;
  gap: 8px;
  box-sizing: border-box;

  ${({ $fieldSize, theme }) => {
    const padding = InputPaddingHandler($fieldSize ?? theme.defaultInputSize);
    return css`
      padding: ${padding};
      padding-bottom: 8px;
    `;
  }}
`;

/** Основная колонка слева (отображаемое значение без поля числа). */
export const SliderInputMain = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  min-height: 1.25em;
`;

/**
 * Крупное значение в теле поля (когда `showNumberField={false}`).
 * @property $fieldSize - Размер поля.
 * @property $disabled - Приглушить текст.
 */
export const SliderInputValueDisplay = styled.span<{ $fieldSize: Size; $disabled?: boolean }>`
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  color: ${({ theme, $disabled }) => ($disabled ? theme.colors.textTertiary : theme.colors.text)};
  white-space: nowrap;
`;

/** Обёртка трека без внутренних отступов. */
export const SliderInputTrackRingWrap = styled(SliderTrackRingWrap)`
  margin: 0;
  padding: 0;
  border-radius: 0;
`;

/** Область бегунка и трека; бегунок не обрезается (`overflow: visible`). */
export const SliderInputTrackWrap = styled(SliderTrackWrap)`
  position: relative;
  width: 100%;
  overflow: visible;
`;

/** Зона клика на всю высоту нижнего блока (включая бегунок). */
export const SliderInputTrackHit = styled(SliderTrackHit)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transform: none;
`;

/**
 * Полоска трека у нижней грани рамки; скругления обрезаются только здесь.
 * @property $lineHeightPx - Высота серой/синей линии.
 */
export const SliderInputTrackStrip = styled.div<{ $lineHeightPx: number }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${({ $lineHeightPx }) => $lineHeightPx}px;
  overflow: hidden;
  pointer-events: none;
  ${({ theme }) => sliderInputBottomCornerRadius(theme)}
`;

/** Серая полоса — нижняя грань поля, скругления как у рамки. */
export const SliderInputTrackRail = styled(SliderTrackRail)`
  ${sliderInputTrackLineAtBottom}
  ${({ theme }) => sliderInputBottomCornerRadius(theme)}
`;

/**
 * Синяя полоса: скругление слева всегда; справа — только если заполнено до max.
 * @property $fillToEnd - Дошла ли полоска до правого края.
 */
export const SliderInputTrackActive = styled(SliderTrackActive)<{ $fillToEnd?: boolean }>`
  ${sliderInputTrackLineAtBottom}
  ${({ theme, $fillToEnd }) => {
    const radius = BorderRadiusHandler(theme.borderRadius);
    return css`
      border-radius: 0;
      border-bottom-left-radius: ${radius};
      border-bottom-right-radius: ${$fillToEnd ? radius : 0};
    `;
  }}
`;

/** Бегунок по центру линии трека; `left` и `bottom` задаются из компонента. */
export const SliderInputThumb = styled(SliderThumb)`
  top: auto;
  z-index: 3;
  transform: translate(-50%, 50%);
`;

/** Нижняя зона трека на всю ширину рамки (нижняя половина бегунка может выходить за кромку). */
export const SliderInputTrackFooter = styled.div`
  flex-shrink: 0;
  width: 100%;
  margin: 0;
  overflow: visible;
`;

/** Подписи min / max под рамкой поля (отступ под нижнюю половину бегунка). */
export const SliderInputScaleRow = styled(SliderScaleRow)`
  margin-top: 12px;
`;

/**
 * Кнопка очистки в верхней зоне (не по центру всей рамки с треком).
 */
export const SliderInputClearButton = styled(ClearButton)`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  flex-shrink: 0;
`;

/**
 * Колонка под ввод числа.
 * @property $width - Минимальная / фиксированная ширина (например `88px`).
 * @property $grow - Растянуть на свободное место в строке (для `fullWidth`).
 * @property $reserveClearSpace - Отступ справа под кнопку очистки.
 */
export const SliderInputNumberSlot = styled.div<{
  $width: string;
  $grow?: boolean;
  $reserveClearSpace?: boolean;
}>`
  flex-shrink: 0;
  min-width: 0;
  align-self: center;

  ${({ $reserveClearSpace }) =>
    $reserveClearSpace &&
    css`
      input {
        padding-right: 32px;
      }
    `}

  ${({ $width, $grow }) =>
    $grow
      ? css`
          flex: 1;
          width: auto;
          min-width: ${$width};
        `
      : css`
          width: ${$width};
        `}
`;
