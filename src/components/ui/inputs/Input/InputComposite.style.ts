import styled, { css } from 'styled-components';
import { createStyledShouldForwardProp } from '../../../../handlers/styledComponentHandlers';
import {
  COMPOSITE_INPUT_SEARCH_SELECT_SLOT_MIN_WIDTH_PX,
  COMPOSITE_INPUT_SELECT_SLOT_MIN_WIDTH_PX,
} from '../../../../handlers/inputFieldLayoutHandlers';
import { InputPaddingHandler } from '../../../../handlers/uiHandlers';
import { Size } from '../../../../types/sizes';

/**
 * Сегмент основного поля ввода внутри составного Input (prefix/suffix).
 * @property size - Размер поля для внутренних отступов.
 */
export const InputCompositeFieldSegment = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(['size', '$verticalAlign']),
})<{
  size?: Size;
  /** Выравнивание по поперечной оси: `flex-start` для многострочного поля (TextArea). */
  $verticalAlign?: 'center' | 'flex-start';
}>`
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: ${({ $verticalAlign = 'center' }) => $verticalAlign};
  align-self: stretch;

  ${({ size, theme }) => css`
    padding: ${InputPaddingHandler(size ?? theme.defaultInputSize)};
  `}
`;

/**
 * Слот prefix/suffix в составном поле: разделитель и выравнивание addon-компонента.
 * @property $position - Сторона addon относительно поля ввода.
 * @property size - Размер поля (для согласованных отступов у текстовых addon).
 */
export const InputCompositeAddon = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(['$position', 'size']),
})<{
  $position: 'prefix' | 'suffix';
  size?: Size;
}>`
  display: flex;
  align-items: center;
  align-self: stretch;
  flex-shrink: 0;

  border-${({ $position }) => ($position === 'prefix' ? 'right' : 'left')}: 1px solid
    ${({ theme }) => theme.colors.borderSecondary};

  ${({ size, theme }) => css`
    padding: ${InputPaddingHandler(size ?? theme.defaultInputSize)};
  `}

  /* Встроенный Select: фиксированная минимальная ширина, padding у триггера */
  &:has([data-embedded-composite-select='true']) {
    padding: 0;
    flex: 0 0 auto;
    min-width: ${COMPOSITE_INPUT_SELECT_SLOT_MIN_WIDTH_PX}px;
    width: auto;
    max-width: 42%;

    & > * {
      flex: 1 1 auto;
      min-width: 0;
      width: 100%;
      height: 100%;
      align-self: stretch;
    }
  }

  &:has([data-embedded-composite-select-mode='searchSelect']) {
    min-width: ${COMPOSITE_INPUT_SEARCH_SELECT_SLOT_MIN_WIDTH_PX}px;
    max-width: 48%;
  }

  /* Текстовый addon без Select */
  &:not(:has([data-embedded-composite-select='true'])) {
    min-width: 0;
    max-width: 40%;
  }
`;
