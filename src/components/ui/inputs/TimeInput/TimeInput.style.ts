import styled from 'styled-components';
import { createStyledShouldForwardProp } from '../../../../handlers/styledComponentHandlers';
import {
  BorderRadiusHandler,
  TransitionHandler,
  InputSizeHandler,
  InputPaddingHandler,
} from '../../../../handlers/uiHandlers';
import { Size } from '../../../../types/sizes';
import { Button } from '../../buttons/Button';

/** Стилизованные части `TimeInput` (вёрстка и тема), логика — в `TimeInput.tsx`. */
export const Container = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ disabled?: boolean; error?: boolean }>`
  position: relative;
  width: 100%;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  padding-top: 10px;
`;

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

export const InputWrapper = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{
  focused: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: Size;
  status?: 'error' | 'success' | 'warning';
}>`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid
    ${({ theme, focused, error, disabled, status }) => {
      if (disabled) return theme.colors.borderTertiary;
      if (error) return theme.colors.danger;
      if (status === 'error') return theme.colors.danger;
      if (status === 'success') return theme.colors.success;
      if (status === 'warning') return theme.colors.warning;
      if (focused) return theme.colors.primary;
      return theme.colors.borderSecondary;
    }};
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.backgroundTertiary : theme.colors.backgroundSecondary};
  transition: ${TransitionHandler()};
  width: 100%;
  box-sizing: border-box;
  min-height: ${({ size, theme }) => InputSizeHandler(size ?? theme.defaultInputSize)};
  padding: ${({ size, theme }) => InputPaddingHandler(size ?? theme.defaultInputSize)};

  &:hover {
    border-color: ${({ theme, focused, error, disabled, status }) => {
      if (disabled) return theme.colors.borderTertiary;
      if (error) return theme.colors.dangerHover;
      if (status === 'error') return theme.colors.dangerHover;
      if (status === 'success') return theme.colors.successHover;
      if (status === 'warning') return theme.colors.warning;
      if (focused) return theme.colors.primaryHover;
      return theme.colors.borderHover;
    }};
  }
`;
export const IconWrapper = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ size?: Size; $marginLeftAuto?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-right: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '4px';
      case Size.LG:
        return '8px';
      default:
        return '6px';
    }
  }};
  ${({ $marginLeftAuto }) => ($marginLeftAuto ? 'margin-left: auto;' : '')}
`;
export const AbsoluteLabel = styled.label.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{
  focused: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: Size;
}>`
  position: absolute !important;
  top: 0 !important;
  margin: 0 !important;
  background: none !important;
  padding: 0 !important;
  color: ${({ theme, focused, error, disabled }) => {
    if (disabled) return theme.colors.textDisabled;
    if (error) return theme.colors.danger;
    if (focused) return theme.colors.primary;
    return theme.colors.textSecondary;
  }};
  transition: ${TransitionHandler()};
`;

export const LeftLabel = styled(AbsoluteLabel)`
  left: 0 !important;
  font-size: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '12px';
      case Size.LG:
        return '14px';
      default:
        return '12px';
    }
  }};
`;

export const RightLabel = styled(AbsoluteLabel)`
  right: 0 !important;
  font-size: 12px;
  opacity: 0.7;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: ${TransitionHandler()};

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ErrorMessage = styled.div<{ size?: Size }>`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '10px';
      case Size.LG:
        return '14px';
      default:
        return '12px';
    }
  }};
  margin-top: 4px;
  line-height: 1.4;
`;

export const ExtraText = styled.div<{ size?: Size }>`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '10px';
      case Size.LG:
        return '14px';
      default:
        return '12px';
    }
  }};
  margin-top: 4px;
  line-height: 1.4;
  display: block;
`;

export const CharacterCounter = styled.div<{
  size?: Size;
  $isOverLimit?: boolean;
}>`
  color: ${({ theme, $isOverLimit }) =>
    $isOverLimit ? theme.colors.danger : theme.colors.textSecondary};
  font-size: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '10px';
      case Size.LG:
        return '14px';
      default:
        return '12px';
    }
  }};
  margin-top: 4px;
  line-height: 1.4;
  display: block;
  text-align: right;
`;

export const TimePickerPopup = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{
  isOpen: boolean;
  size?: Size;
  showSeconds?: boolean;
}>`
  position: absolute;
  top: 100%;
  left: 0;
  width: max-content;
  max-width: 100%;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 2px solid ${({ theme }) => theme.colors.borderSecondary};
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  transition: ${TransitionHandler()};
  margin-top: 4px;
  min-width: ${({ showSeconds }) => (showSeconds ? '300px' : '280px')};
`;
export const TimePickerGrid = styled.div`
  display: flex;
  gap: 0;
  padding: 0;
  height: 200px;
`;

export const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-right: none;
  }
`;

export const TimeColumnLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 8px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 500;
  background: ${({ theme }) => theme.colors.backgroundTertiary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TimeColumnContent = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 4px 0;
`;

export const TimeOption = styled.button.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{
  isSelected: boolean;
  isCurrent: boolean;
  isDisabled: boolean;
}>`
  width: calc(100% - 16px);
  min-height: 32px;
  padding: 0 8px;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  margin: 2px auto;
  box-sizing: border-box;
  background: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.backgroundTertiary : 'transparent'};
  color: ${({ theme, isSelected, isDisabled }) =>
    isSelected
      ? theme.colors.primary
      : isDisabled
        ? theme.colors.textDisabled || theme.colors.textSecondary
        : theme.colors.text};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  transition: ${TransitionHandler()};
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  position: relative;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.backgroundTertiary};
    border-color: ${({ theme }) => theme.colors.borderSecondary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 1px;
  }

  ${({ isSelected, theme, isDisabled }) =>
    isSelected &&
    !isDisabled &&
    `
    background: ${theme.colors.primary} !important;
    border-color: ${theme.colors.primary} !important;
    color: ${theme.colors.backgroundSecondary} !important;
  `}

  ${({ isDisabled, theme }) =>
    isDisabled &&
    `
    &:hover {
      background: ${theme.colors.backgroundTertiary} !important;
    }
    &:active {
      background: ${theme.colors.backgroundTertiary} !important;
    }
  `}
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  gap: 8px;
`;

export const ActionButton = styled(Button)`
  flex: 1;
`;

// Стили для range режима
export const RangeContainer = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ showSeconds?: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: ${({ showSeconds }) => (showSeconds ? '800px' : '600px')};
  max-width: ${({ showSeconds }) => (showSeconds ? '800px' : '600px')};
`;

export const RangePickersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 16px;
`;

export const RangePickerContainer = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid
    ${({ theme, isActive }) =>
      isActive
        ? (theme.buttons?.variants?.primary?.background ?? theme.colors.primary)
        : theme.colors.borderSecondary};
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  overflow: hidden;
  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.backgroundSecondary : theme.colors.backgroundTertiary};
  transition: ${TransitionHandler()};
  cursor: pointer;
  box-shadow: none;
`;

export const RangePickerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundTertiary};
`;

export const RangePickerTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;
export const RangeFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  gap: 8px;
  background: ${({ theme }) => theme.colors.backgroundTertiary};
`;

// Компоненты для сегментированного отображения времени
export const TimeSegmentsContainer = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{
  size?: Size;
  textAlign?: 'left' | 'center' | 'right';
}>`
  display: flex;
  align-items: center;
  justify-content: ${({ textAlign }) => {
    switch (textAlign) {
      case 'left':
        return 'flex-start';
      case 'right':
        return 'flex-end';
      case 'center':
      default:
        return 'center';
    }
  }};
  gap: 4px;
  font-family: ${({ theme }) => theme.fonts.monospace};
  font-size: ${({ size, theme }) => {
    switch (size) {
      case Size.SM:
        return theme.fontSizes.sm;
      case Size.LG:
        return theme.fontSizes.lg;
      default:
        return theme.fontSizes.base;
    }
  }};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  user-select: none;
  width: 100%;
`;

export const TimeSegment = styled.span.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{
  isActive: boolean;
  size?: Size;
  disabled?: boolean;
}>`
  display: inline-block;
  padding: 2px 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  background-color: ${({ isActive, theme }) =>
    isActive ? `${theme.colors.primary}20` : 'transparent'};
  color: ${({ isActive, theme, disabled }) =>
    disabled ? theme.colors.textSecondary : isActive ? theme.colors.primary : theme.colors.text};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  min-width: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '20px';
      case Size.LG:
        return '28px';
      default:
        return '24px';
    }
  }};
  width: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '20px';
      case Size.LG:
        return '28px';
      default:
        return '24px';
    }
  }};

  &:hover {
    background-color: ${({ disabled, theme }) =>
      disabled ? 'transparent' : `${theme.colors.primary}10`};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 1px;
  }
`;

export const TimeSeparator = styled.span<{ size?: Size }>`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ size, theme }) => {
    switch (size) {
      case Size.SM:
        return theme.fontSizes.sm;
      case Size.LG:
        return theme.fontSizes.lg;
      default:
        return theme.fontSizes.base;
    }
  }};
`;

export const RangeTimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RangeTimeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const RangeTimeLabel = styled.span<{ size?: Size }>`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const RangeTimeSeparator = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Стилизованный input для обычного режима ввода времени
export const RegularTimeInput = styled.input.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(['hasIcon', 'textAlign']),
})<{
  $inputSize?: Size;
  hasIcon?: boolean;
  textAlign?: 'left' | 'center' | 'right';
}>`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ $inputSize }) => {
    switch ($inputSize) {
      case Size.SM:
        return '12px';
      case Size.LG:
        return '16px';
      default:
        return '14px';
    }
  }};
  line-height: 1.4;
  padding-left: ${({ hasIcon }) => (hasIcon ? '8px' : '0')};
  text-align: ${({ textAlign }) => textAlign || 'left'};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
