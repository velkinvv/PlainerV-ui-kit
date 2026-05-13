import styled from 'styled-components';
import { buildReducedMotionTransformCss } from '../../../handlers/uiMotionStyleHandlers';
import type { RadioButtonProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';

/**
 * RadioContainerWrapper
 * Обертка для контейнера радиокнопки (div вместо label для избежания проблем с пропсами)
 * Примечание: В styled-components v6 пропсы с префиксом $ должны автоматически фильтроваться,
 * но в тестовой среде могут появляться предупреждения React. Это не критично и не влияет на функциональность.
 * В production сборке эти предупреждения обычно не появляются.
 */
export const RadioContainerWrapper = styled.div<{
  $labelPosition?: RadioButtonProps['labelPosition'];
  $fullWidth?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}>`
  display: inline-flex;
  flex-direction: ${({ $labelPosition }) => {
    switch ($labelPosition) {
      case 'top':
      case 'bottom':
        return 'column';
      case 'left':
        return 'row-reverse';
      case 'right':
      case 'none':
      default:
        return 'row';
    }
  }};
  align-items: ${({ $labelPosition }) => {
    switch ($labelPosition) {
      case 'top':
      case 'bottom':
        return 'center';
      case 'left':
      case 'right':
      case 'none':
      default:
        return 'flex-start';
    }
  }};
  cursor: ${({ disabled, readOnly }) => {
    if (disabled || readOnly) return 'not-allowed';
    return 'pointer';
  }};
  user-select: none;
  gap: ${({ theme }) => theme.radioButton.spacing.container};
  opacity: ${({ disabled, theme }) => (disabled ? theme.radioButton.settings.disabledOpacity : 1)};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

/**
 * RadioContainer
 * Label элемент для связи с input
 */
export const RadioContainer = styled.label<{ disabled?: boolean; readOnly?: boolean }>`
  display: contents; /* Позволяет label быть прозрачным для layout */
  cursor: ${({ disabled, readOnly }) => {
    if (disabled || readOnly) return 'not-allowed';
    return 'pointer';
  }};
`;

/**
 * Контейнер для текстового контента (лейбл + дополнительный текст)
 * Для позиций top/bottom текст выравнивается по центру
 */
export const RadioTextContainer = styled.div<{
  'data-label-position'?: RadioButtonProps['labelPosition'];
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.radioButton.spacing.textContainer};
  text-align: ${props => {
    const position = props['data-label-position'];
    switch (position) {
      case 'top':
      case 'bottom':
        return 'center';
      case 'left':
      case 'right':
      case 'none':
      default:
        return 'left';
    }
  }};
`;

/**
 * RadioCircle
 * Согласно макету:
 * - Filled вариант: полностью залитый круг при checked
 * - Outline вариант: белый круг с зеленой обводкой при checked
 */
export const RadioCircle = styled.div<RadioButtonProps>`
  position: relative;
  width: ${({ theme, size = Size.MD }) => {
    // Обрабатываем размеры, которые могут отсутствовать в теме (XS, XL используем MD)
    const sizeKey = size === Size.XS ? Size.SM : size === Size.XL ? Size.LG : size;
    return (
      theme.radioButton.sizes[sizeKey]?.circleSize || theme.radioButton.sizes[Size.MD].circleSize
    );
  }};
  height: ${({ theme, size = Size.MD }) => {
    const sizeKey = size === Size.XS ? Size.SM : size === Size.XL ? Size.LG : size;
    return (
      theme.radioButton.sizes[sizeKey]?.circleSize || theme.radioButton.sizes[Size.MD].circleSize
    );
  }};
  border: ${({ theme }) => theme.radioButton.settings.borderWidth} solid
    ${({ theme, checked, disabled, readOnly: _readOnly, variant, error, status }) => {
      // Приоритет: error (проп) > status === 'error' > checked > обычное состояние
      if (error) {
        return theme.radioButton.colors.error.border;
      }
      if (status === 'error') {
        return theme.radioButton.colors.status.error.border;
      }
      if (status === 'warning') {
        return theme.radioButton.colors.status.warning.border;
      }
      if (status === 'success') {
        return theme.radioButton.colors.status.success.border;
      }
      if (disabled) return theme.radioButton.colors.disabled.border;
      // Для readOnly состояния используем те же цвета, что и для обычного состояния
      // Для checked состояния всегда зеленая обводка
      if (checked) {
        return variant === 'outline'
          ? theme.radioButton.colors.outline.borderChecked
          : theme.radioButton.colors.filled.borderChecked;
      }
      // Для unchecked состояния
      return variant === 'outline'
        ? theme.radioButton.colors.outline.borderUnchecked
        : theme.radioButton.colors.filled.borderUnchecked;
    }};
  border-radius: ${({ theme }) => theme.radioButton.settings.borderRadius};
  background: ${({ theme, checked, disabled, readOnly: _readOnly, variant }) => {
    if (disabled) {
      return theme.radioButton.colors.disabled.background;
    }
    // Для readOnly состояния используем те же цвета, что и для обычного состояния
    // Для filled варианта: полностью заливаем при checked
    if (variant === 'filled' && checked) {
      return theme.radioButton.colors.filled.checked;
    }
    // Для outline варианта: фон даже при checked
    if (variant === 'outline') {
      return theme.radioButton.colors.outline.checked;
    }
    // По умолчанию (filled, unchecked): фон
    return theme.radioButton.colors.filled.unchecked;
  }};
  transition: ${({ theme }) => theme.radioButton.animations.transition};
  will-change: transform, border-color, background-color;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${({ theme, checked, disabled, readOnly }) => {
      if (disabled || readOnly) return theme.radioButton.colors.disabled.border;
      // Используем цвет из темы для hover
      if (checked) {
        return theme.radioButton.colors.hover.borderChecked;
      }
      return theme.radioButton.colors.hover.borderUnchecked;
    }};

    transform: ${({ disabled, readOnly }) => (disabled || readOnly ? 'none' : 'translateY(-1px)')};
  }

  &:active {
    transform: ${({ disabled, readOnly }) => (disabled || readOnly ? 'none' : 'scale(0.97)')};
    ${buildReducedMotionTransformCss()}
  }

  &:focus-within {
    // Согласно макету: обводка Success/bg (#E9FADC), strokeWeight: 2px, borderRadius: 50px
    outline: ${({ theme }) => theme.radioButton.settings.focusOutlineWidth} solid
      ${({ theme }) => theme.radioButton.colors.focus.outline};
    outline-offset: ${({ theme }) => theme.radioButton.settings.focusOutlineOffset};
    border-radius: 50px;
  }
`;

/**
 * RadioDot
 * Используется только для outline варианта, когда нужно показать точку в центре
 * Для filled варианта точка не нужна, так как весь круг залит
 */
export const RadioDot = styled.div<RadioButtonProps>`
  width: ${({ theme, size = Size.MD }) => {
    const sizeKey = size === Size.XS ? Size.SM : size === Size.XL ? Size.LG : size;
    return theme.radioButton.sizes[sizeKey]?.dotSize || theme.radioButton.sizes[Size.MD].dotSize;
  }};
  height: ${({ theme, size = Size.MD }) => {
    const sizeKey = size === Size.XS ? Size.SM : size === Size.XL ? Size.LG : size;
    return theme.radioButton.sizes[sizeKey]?.dotSize || theme.radioButton.sizes[Size.MD].dotSize;
  }};
  border-radius: ${({ theme }) => theme.radioButton.settings.borderRadius};
  background: ${({ theme, checked, variant }) => {
    // Для outline варианта показываем точку в центре при checked
    if (variant === 'outline' && checked) {
      return theme.radioButton.colors.outline.dot;
    }
    // Для filled варианта точка не нужна
    return 'transparent';
  }};
  transition: ${({ theme }) => theme.radioButton.animations.dotScale};
  will-change: transform, background-color;
  transform: ${({ checked, variant }) => {
    // Показываем точку только для outline варианта
    if (variant === 'outline' && checked) {
      return 'scale(1)';
    }
    return 'scale(0)';
  }};
`;

/**
 * RadioLabel
 * Стили согласно макету Figma:
 * - Шрифт: Montserrat, 14px, Regular (400)
 * - Line-height: 1.4285714285714286em
 * - Цвет: Gray_02 / 9O (#424242) для обычного состояния
 * - Цвет: Gray_02 / 5O (#C2C2C2) для disabled состояния
 */
export const RadioLabel = styled.span<RadioButtonProps>`
  color: ${({ theme, disabled, readOnly: _readOnly }) => {
    // Для readOnly лейбл остается обычного цвета (не серым)
    if (disabled) {
      return theme.radioButton.typography.label.colorDisabled;
    }
    // Для обычного состояния и readOnly
    return theme.radioButton.typography.label.color;
  }};
  font-family: ${({ theme }) => theme.radioButton.typography.label.fontFamily};
  font-size: ${({ theme }) => theme.radioButton.typography.label.fontSize};
  font-weight: ${({ theme }) => theme.radioButton.typography.label.fontWeight};
  line-height: ${({ theme }) => theme.radioButton.typography.label.lineHeight};
`;

/**
 * RadioExtraText
 * Дополнительный текст (подсказка), который выводится нижней строкой
 * Стили для дополнительного текста: меньший размер шрифта, более светлый цвет
 */
export const RadioExtraText = styled.span<RadioButtonProps>`
  color: ${({ theme, disabled, readOnly: _readOnly }) => {
    // Для readOnly дополнительный текст остается обычного цвета
    if (disabled) {
      return theme.radioButton.typography.extraText.colorDisabled;
    }
    // Вторичный текст - более светлый, чем основной лейбл (для обычного состояния и readOnly)
    return theme.radioButton.typography.extraText.color;
  }};
  font-family: ${({ theme }) => theme.radioButton.typography.extraText.fontFamily};
  font-size: ${({ theme }) => theme.radioButton.typography.extraText.fontSize};
  font-weight: ${({ theme }) => theme.radioButton.typography.extraText.fontWeight};
  line-height: ${({ theme }) => theme.radioButton.typography.extraText.lineHeight};
`;

/**
 * Контейнер для иконок
 */
export const RadioIconContainer = styled.div<{ 'data-position'?: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => {
    const position = props['data-position'];
    const theme = props.theme;
    if (position === 'left') {
      return `margin-right: ${theme.radioButton.spacing.icon.left};`;
    }
    return `margin-left: ${theme.radioButton.spacing.icon.right};`;
  }}
`;

/**
 * Индикатор обязательности
 */
export const RadioRequiredIndicator = styled.span`
  color: ${({ theme }) => theme.radioButton.colors.required.indicator};
  margin-left: 4px;
  font-size: 14px;
  line-height: 1;
`;

/**
 * Текст ошибки
 */
export const RadioErrorText = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.radioButton.spacing.errorText};
  color: ${({ theme }) => theme.radioButton.typography.errorText.color};
  font-family: ${({ theme }) => theme.radioButton.typography.errorText.fontFamily};
  font-size: ${({ theme }) => theme.radioButton.typography.errorText.fontSize};
  font-weight: ${({ theme }) => theme.radioButton.typography.errorText.fontWeight};
  line-height: ${({ theme }) => theme.radioButton.typography.errorText.lineHeight};
`;

/**
 * Вспомогательный текст
 */
export const RadioHelperText = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.radioButton.spacing.helperText};
  color: ${({ theme }) => theme.radioButton.typography.helperText.color};
  font-family: ${({ theme }) => theme.radioButton.typography.helperText.fontFamily};
  font-size: ${({ theme }) => theme.radioButton.typography.helperText.fontSize};
  font-weight: ${({ theme }) => theme.radioButton.typography.helperText.fontWeight};
  line-height: ${({ theme }) => theme.radioButton.typography.helperText.lineHeight};
`;

/**
 * Обертка для радиокнопки с ошибками и подсказками
 */
export const RadioWrapper = styled.div<{ 'data-full-width'?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${props => {
    const fullWidth = props['data-full-width'];
    return fullWidth ? '100%' : 'auto';
  }};
`;
