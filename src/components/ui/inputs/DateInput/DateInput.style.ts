import styled, { css } from 'styled-components';
import { createStyledShouldForwardProp } from '../../../../handlers/styledComponentHandlers';
import { overlayPanelBoxShadowFromTheme, overlayPanelSurfaceCss } from '../../../../handlers/overlayPanelShadowHandlers';
import { getInputFieldWidthCss } from '../../../../handlers/inputFieldLayoutHandlers';
import { BorderRadiusHandler, TransitionHandler } from '../../../../handlers/uiHandlers';
import { Size } from '../../../../types/sizes';

export {
  FloatingFieldLabel as AbsoluteLabel,
  FloatingLeftLabel as LeftLabel,
  FloatingRightLabel as RightLabel,
} from '../shared/InputFieldCaption.style';

/** Корень DateInput: relative для попапа; padding-top: 10px только у floating с лейблом. */
export const DateInputRoot = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp([
    'fullWidth',
    'disabled',
    'error',
    '$floatingCaption',
  ]),
})<{
  fullWidth?: boolean;
  disabled?: boolean;
  error?: boolean;
  $floatingCaption?: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  align-items: ${({ fullWidth }) => (fullWidth ? 'stretch' : 'flex-start')};
  opacity: ${({ disabled, $floatingCaption }) => (disabled && $floatingCaption ? 0.5 : 1)};
  ${({ $floatingCaption }) =>
    $floatingCaption
      ? css`
          gap: 0;
          padding-top: 10px;
        `
      : css`
          gap: 4px;
          padding-top: 0;
        `}
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
  shouldForwardProp: createStyledShouldForwardProp(['fullWidth', 'autoWidth']),
})<{ fullWidth?: boolean; autoWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: ${({ fullWidth, autoWidth }) => getInputFieldWidthCss(fullWidth, autoWidth)};
  max-width: 100%;
`;

export const CalendarPopup = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(['$portaled']),
})<{ isOpen: boolean; size?: Size; $calendarFullWidth?: boolean; $portaled?: boolean }>`
  position: ${({ $portaled }) => ($portaled ? 'fixed' : 'absolute')};
  ${({ $portaled }) =>
    !$portaled &&
    `
      top: 100%;
      left: 0;
    `}
  /* По умолчанию — ширина контента; опционально можно растянуть на ширину поля */
  width: ${({ $calendarFullWidth }) => ($calendarFullWidth ? '100%' : 'max-content')};
  max-width: 100%;
  ${({ theme }) => overlayPanelSurfaceCss(theme)}
  border: 2px solid ${({ theme }) => theme.colors.borderSecondary};
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  box-shadow: ${({ theme }) => overlayPanelBoxShadowFromTheme(theme)};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: ${({ isOpen, $portaled }) =>
    $portaled ? 'none' : isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: ${TransitionHandler()};
  margin-top: ${({ $portaled }) => ($portaled ? '0' : '4px')};
  padding: 16px;
  min-width: 280px;
`;

// Стилизованные компоненты для сегментированного ввода даты
export const DateSegmentsContainer = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
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
  shouldForwardProp: createStyledShouldForwardProp(),
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

/**
 * Шапка / подвал панели пикера даты (граница из темы).
 * @property $edge - `bottom` — нижняя граница (шапка), `top` — верхняя (подвал)
 */
export const DateInputPickerChrome = styled.div<{ $edge: 'top' | 'bottom' }>`
  padding: 16px;
  border-top: ${({ $edge, theme }) =>
    $edge === 'top' ? `1px solid ${theme.colors.border}` : 'none'};
  border-bottom: ${({ $edge, theme }) =>
    $edge === 'bottom' ? `1px solid ${theme.colors.border}` : 'none'};
`;
