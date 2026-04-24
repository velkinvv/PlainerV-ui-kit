import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import type { InputVariant } from '../../../../types/ui';
import {
  InputSizeHandler,
  InputPaddingHandler,
  BorderRadiusHandler,
  GapHandler,
  TransitionHandler,
} from '../../../../handlers/uiHandlers';
import { Size } from '../../../../types/sizes';

// ============================================================================
// КОНТЕЙНЕРЫ
// ============================================================================

export const InputContainer = styled.div.withConfig({
  shouldForwardProp: prop => !['fullWidth'].includes(prop),
})<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

export const InputContainerWithPadding = styled.div.withConfig({
  shouldForwardProp: prop => !['disabled', 'error'].includes(prop),
})<{ disabled?: boolean; error?: boolean }>`
  position: relative;
  width: 100%;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  padding-top: 10px;
`;

// ============================================================================
// ЛЕЙБЛЫ
// ============================================================================

export const Label = styled.label`
  font-family: ${({ theme }) => theme.typography.label.fontFamily};
  font-size: ${({ theme }) => theme.typography.label.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.fontWeight};
  line-height: ${({ theme }) => theme.typography.label.lineHeight};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

export const AbsoluteLabel = styled.label`
  position: absolute !important;
  top: 0 !important;
  margin: 0 !important;
  background: none !important;
  font-family: ${({ theme }) => theme.typography.label.fontFamily};
  font-weight: ${({ theme }) => theme.typography.label.fontWeight};
  line-height: ${({ theme }) => theme.typography.label.lineHeight};
  color: ${({ theme }) => theme.colors.text};
`;

export const LeftLabel = styled(AbsoluteLabel)`
  left: 0 !important;
  font-size: ${({ theme }) => theme.typography.label.fontSize};
`;

export const RightLabel = styled(AbsoluteLabel)`
  right: 0 !important;
  font-size: 12px;
  opacity: 0.7;
`;

// ============================================================================
// ОБЕРТКИ ИНПУТОВ
// ============================================================================

export const InputWrapper = styled(motion.div).withConfig({
  shouldForwardProp: prop =>
    !['error', 'success', 'fullWidth', 'focused', 'status', 'readOnly', '$fileSurface', '$dragActive'].includes(
      prop,
    ),
})<{
  variant?: InputVariant;
  size?: Size;
  error?: string;
  success?: boolean;
  fullWidth?: boolean;
  focused?: boolean;
  status?: 'error' | 'success' | 'warning';
  readOnly?: boolean;
  /** Режимы `FileInput`: поле, пунктирная зона или карточка файла (макет Figma) */
  $fileSurface?: 'field' | 'dropzone' | 'file';
  /** Подсветка зоны при перетаскивании файла */
  $dragActive?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme, $fileSurface }) =>
    $fileSurface ? theme.colors.input : theme.colors.backgroundSecondary};
  border: 1px solid
    ${({ theme, status, error, $dragActive }) => {
      if ($dragActive) {
        return theme.colors.primary;
      }
      /* Текст ошибки без status — тоже красная рамка (как в DateInput WithError) */
      if (status === 'error' || Boolean(error)) return theme.colors.danger;
      if (status === 'success') return theme.colors.success;
      if (status === 'warning') return theme.colors.warning;
      return theme.colors.borderSecondary;
    }};
  border-style: ${({ $fileSurface }) => ($fileSurface === 'dropzone' ? 'dashed' : 'solid')};
  /* У FileInput в макете скругление ~10px, не «пилюля» общих инпутов */
  border-radius: ${({ theme, $fileSurface }) =>
    $fileSurface ? '10px' : BorderRadiusHandler(theme.borderRadius)};
  transition: ${TransitionHandler()};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '335px')};

  ${({ size, theme, $fileSurface }) => css`
    min-height: ${InputSizeHandler(size ?? theme.defaultInputSize)};
    padding: ${InputPaddingHandler(size ?? theme.defaultInputSize)};
    ${$fileSurface === 'dropzone' &&
    css`
      min-height: calc(${InputSizeHandler(size ?? theme.defaultInputSize)} * 2.35);
      align-items: stretch;
    `}
    ${$fileSurface === 'file' &&
    css`
      min-height: calc(${InputSizeHandler(size ?? theme.defaultInputSize)} * 1.45);
      align-items: stretch;
    `}
  `}

  ${({ focused, theme, status, error }) =>
    focused &&
    css`
      border-color: ${status === 'error' || Boolean(error) ? theme.colors.danger : theme.colors.primary};
      box-shadow: 0 0 0 2px
        ${status === 'error' || Boolean(error) ? `${theme.colors.danger}33` : `${theme.colors.primary}20`};
    `}

  ${({ readOnly }) =>
    readOnly &&
    css`
      background: ${({ theme }) => theme.colors.backgroundTertiary};
      cursor: default;

      &:focus-within {
        border-color: ${({ theme }) => theme.colors.borderSecondary};
        box-shadow: none;
      }
    `}

  ${({ variant }) => {
    switch (variant) {
      case 'selector':
        return css`
          cursor: pointer;
          user-select: none;
        `;
      case 'date':
        return css`
          cursor: pointer;
          user-select: none;
        `;
      case 'clear':
        return css`
          padding-right: 40px;
        `;
      default:
        return '';
    }
  }}

  &:hover:not(:disabled):not([readonly]) {
    border-color: ${({ theme, status, error }) => {
      if (status === 'error' || Boolean(error)) return theme.colors.danger;
      if (status === 'success') return theme.colors.success;
      if (status === 'warning') return theme.colors.warning;
      return theme.colors.primary;
    }};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.backgroundTertiary};
    color: ${({ theme }) => theme.colors.textTertiary};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

// ============================================================================
// СТИЛИЗОВАННЫЕ ИНПУТЫ
// ============================================================================

export const StyledInput = styled.input.withConfig({
  shouldForwardProp: prop => !['textAlign', 'readOnly'].includes(prop),
})<{
  textAlign?: 'left' | 'center' | 'right';
  readOnly?: boolean;
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
    css`
      cursor: default;
    `}
`;

// ============================================================================
// ВСПОМОГАТЕЛЬНЫЕ ТЕКСТЫ
// ============================================================================

export const HelperText = styled.div<{
  status?: 'error' | 'success' | 'warning';
}>`
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  font-weight: ${({ theme }) => theme.typography.caption.fontWeight};
  line-height: ${({ theme }) => theme.typography.caption.lineHeight};
  color: ${({ theme, status }) => {
    if (status === 'error') return theme.colors.danger;
    if (status === 'success') return theme.colors.success;
    if (status === 'warning') return theme.colors.warning;
    return theme.colors.textSecondary;
  }};
  margin-top: 4px;
`;

export const ErrorText = styled(HelperText)`
  color: ${({ theme }) => theme.colors.danger};
`;

export const SuccessText = styled(HelperText)`
  color: ${({ theme }) => theme.colors.success};
`;

// ============================================================================
// ИКОНКИ И КНОПКИ
// ============================================================================

export const IconContainer = styled.div.withConfig({
  shouldForwardProp: prop => !['$position', 'size'].includes(prop),
})<{
  $position?: 'left' | 'right';
  size?: Size;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: ${({ $position }) => ($position === 'left' ? '0 8px 0 0' : '0 0 0 8px')};
  flex-shrink: 0;
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${TransitionHandler()};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

// ============================================================================
// СОСТОЯНИЯ ЗАГРУЗКИ И СКЕЛЕТОНА
// ============================================================================

export const LoadingSpinner = styled.div<{ size?: Size }>`
  width: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '16px';
      case Size.LG:
        return '20px';
      default:
        return '18px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '16px';
      case Size.LG:
        return '20px';
      default:
        return '18px';
    }
  }};
  border: 2px solid ${({ theme }) => theme.colors.borderSecondary};
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: 8px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

/**
 * Плейсхолдер загрузки: в режиме `field` совпадает с габаритами `InputWrapper` (ширина, min-height, padding, рамка).
 *
 * @param size — размер поля (`Size`, как у инпута)
 * @param fullWidth — при `true` ширина `100%`, иначе как у обёртки — `335px`
 * @param $layout — `field` (по умолчанию) или `compact` (короткая полоска под лейбл в skeleton-режиме)
 */
export const SkeletonEffect = styled.div.withConfig({
  shouldForwardProp: prop => !['size', 'fullWidth', '$layout'].includes(prop),
})<{
  size?: Size;
  fullWidth?: boolean;
  $layout?: 'field' | 'compact';
}>`
  position: relative;
  display: flex;
  align-items: center;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.backgroundTertiary} 25%,
    ${({ theme }) => theme.colors.borderSecondary} 50%,
    ${({ theme }) => theme.colors.backgroundTertiary} 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  transition: ${TransitionHandler()};

  ${({ theme, size, fullWidth, $layout }) => {
    const layout = $layout ?? 'field';
    if (layout === 'compact') {
      return css`
        box-sizing: border-box;
        width: 40%;
        max-width: 200px;
        min-height: 14px;
        height: 14px;
        padding: 0;
        border: 1px solid ${theme.colors.borderSecondary};
        border-radius: ${BorderRadiusHandler(theme.borderRadius)};
      `;
    }
    return css`
      box-sizing: border-box;
      width: ${fullWidth ? '100%' : '335px'};
      min-height: ${InputSizeHandler(size ?? theme.defaultInputSize)};
      padding: ${InputPaddingHandler(size ?? theme.defaultInputSize)};
      border: 1px solid ${theme.colors.borderSecondary};
      border-radius: ${BorderRadiusHandler(theme.borderRadius)};
    `;
  }}

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

// ============================================================================
// ДОПОЛНИТЕЛЬНЫЕ ЭЛЕМЕНТЫ
// ============================================================================

export const AdditionalLabel = styled.div`
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  font-weight: ${({ theme }) => theme.typography.caption.fontWeight};
  line-height: ${({ theme }) => theme.typography.caption.lineHeight};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 2px;
`;

export const ExtraText = styled.span`
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  font-weight: ${({ theme }) => theme.typography.caption.fontWeight};
  line-height: ${({ theme }) => theme.typography.caption.lineHeight};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
  display: block;
`;

export const CharacterCounter = styled.span<{ $isOverLimit?: boolean }>`
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  font-weight: ${({ theme }) => theme.typography.caption.fontWeight};
  line-height: ${({ theme }) => theme.typography.caption.lineHeight};
  color: ${({ theme, $isOverLimit }) =>
    $isOverLimit ? theme.colors.danger : theme.colors.textSecondary};
  margin-top: 4px;
  display: block;
  text-align: right;
`;

export const IconWrapper = styled.div<{ size?: Size }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-right: 8px;
  flex-shrink: 0;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundTertiary};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const RequiredIndicator = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  margin-left: 2px;
`;

// ============================================================================
// УТИЛИТЫ ДЛЯ РАЗМЕРОВ И ОТСТУПОВ
// ============================================================================

export const getInputGap = (size?: Size) => {
  return GapHandler(size ?? Size.MD);
};

export const getInputPadding = (size?: Size) => {
  return InputPaddingHandler(size ?? Size.MD);
};

export const getInputMinHeight = (size?: Size) => {
  return InputSizeHandler(size ?? Size.MD);
};
