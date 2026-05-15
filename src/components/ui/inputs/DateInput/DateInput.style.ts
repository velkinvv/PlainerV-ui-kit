import styled from 'styled-components';
import { BorderRadiusHandler, TransitionHandler } from '../../../../handlers/uiHandlers';
import { Size } from '../../../../types/sizes';

/** Стилизованные части `DateInput` (вёрстка и тема), логика — в `DateInput.tsx`. */
export const AbsoluteLabel = styled.label.withConfig({
  shouldForwardProp: (prop) => !['focused', 'disabled', 'error', 'size'].includes(prop),
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
  $size?: Size;
  $isOverLimit?: boolean;
}>`
  color: ${({ theme, $isOverLimit }) =>
    $isOverLimit ? theme.colors.danger : theme.colors.textSecondary};
  font-size: ${({ $size }) => {
    switch ($size) {
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

export const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: ${TransitionHandler()};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

/** Ширина как у `InputWrapper`, чтобы счётчик и подписи не растягивались на 100% ширины внешнего контейнера */
export const DateInputFieldStack = styled.div.withConfig({
  shouldForwardProp: (prop) => !['fullWidth'].includes(prop),
})<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '335px')};
  max-width: 100%;
`;

export const CalendarPopup = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isOpen', 'size', '$calendarFullWidth'].includes(prop),
})<{ isOpen: boolean; size?: Size; $calendarFullWidth?: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  /* По умолчанию — ширина контента; опционально можно растянуть на ширину поля */
  width: ${({ $calendarFullWidth }) => ($calendarFullWidth ? '100%' : 'max-content')};
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
  padding: 16px;
  min-width: 280px;
`;

// Стилизованные компоненты для сегментированного ввода даты
export const DateSegmentsContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['size', 'textAlign'].includes(prop),
})<{
  size?: Size;
  textAlign?: 'left' | 'center' | 'right';
}>`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  justify-content: ${({ textAlign }) => {
    switch (textAlign) {
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      default:
        return 'flex-start';
    }
  }};
`;

export const DateSegment = styled.span.withConfig({
  shouldForwardProp: (prop) => !['isActive', 'size', 'disabled'].includes(prop),
})<{
  isActive: boolean;
  size?: Size;
  disabled?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '24px';
      case Size.LG:
        return '40px';
      default:
        return '32px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '20px';
      case Size.LG:
        return '32px';
      default:
        return '24px';
    }
  }};
  padding: 2px 4px;
  border-radius: 4px;
  font-size: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '12px';
      case Size.LG:
        return '16px';
      default:
        return '14px';
    }
  }};
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: ${TransitionHandler()};
  background: ${({ theme, isActive }) => (isActive ? theme.colors.primary : 'transparent')};
  color: ${({ theme, isActive, disabled }) => {
    if (disabled) return theme.colors.textDisabled;
    if (isActive) return theme.colors.text;
    return theme.colors.text;
  }};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    background: ${({ theme, isActive, disabled }) => {
      if (disabled) return 'transparent';
      if (isActive) return theme.colors.primaryHover;
      return theme.colors.backgroundSecondary;
    }};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const DateSeparator = styled.span<{ size?: Size }>`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '12px';
      case Size.LG:
        return '16px';
      default:
        return '14px';
    }
  }};
  font-weight: 500;
  user-select: none;
`;

// Для range режима
export const RangeDateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

export const RangeDateGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const RangeDateLabel = styled.span<{ size?: Size }>`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const RangeDateSeparator = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

