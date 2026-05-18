import styled from 'styled-components';
import { createStyledShouldForwardProp } from '../../../../handlers/styledComponentHandlers';
import { ClearButton, InputWrapper } from '../shared';
import {
  BorderRadiusHandler,
  InputPaddingHandler,
  InputSizeHandler,
} from '../../../../handlers/uiHandlers';
import { Size } from '../../../../types/sizes';

export const TextAreaWrapper = styled(InputWrapper)`
  align-items: flex-start;
`;

export const StyledTextArea = styled.textarea.withConfig({
  shouldForwardProp: createStyledShouldForwardProp([
    'textAlign',
    'readOnly',
    'resize',
    '$hasRightControls',
  ]),
})<{
  textAlign?: 'left' | 'center' | 'right';
  readOnly?: boolean;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  $hasRightControls?: boolean;
}>`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  color: ${({ theme }) => theme.colors.text};
  text-align: ${({ textAlign = 'left' }) => textAlign};
  width: 100%;
  min-height: 96px;
  resize: ${({ resize = 'vertical' }) => resize};
  padding-right: ${({ $hasRightControls }) => ($hasRightControls ? '36px' : '0')};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
    opacity: 1;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.textTertiary};
    cursor: not-allowed;
  }

  ${({ readOnly }) =>
    readOnly &&
    `
      cursor: default;
      resize: none;
    `}
`;

/**
 * Кнопка очистки для textarea: фиксируем в правом верхнем углу.
 */
export const TextAreaClearButton = styled(ClearButton)`
  top: 8px;
  right: 8px;
  transform: none;
`;

/**
 * Скелетон textarea, повторяющий размеры реального поля и учитывающий `rows`.
 */
export const TextAreaSkeleton = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ fullWidth?: boolean; $rows?: number }>`
  position: relative;
  overflow: hidden;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '335px')};
  max-width: 100%;
  padding: ${InputPaddingHandler(Size.LG)};
  border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.backgroundTertiary} 25%,
      ${({ theme }) => theme.colors.borderSecondary} 50%,
      ${({ theme }) => theme.colors.backgroundTertiary} 75%
    );
    background-size: 200% 100%;
    animation: textarea-skeleton-loading 1.5s infinite;
  }

  /* Поддерживаем минимальную визуальную высоту, как у поля ввода LG. */
  min-height: ${({ $rows = 4 }) => {
    const normalizedRows = Math.max(1, $rows);
    return `max(calc(${normalizedRows} * 24px + 24px), ${InputSizeHandler(Size.LG)})`;
  }};

  @keyframes textarea-skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
