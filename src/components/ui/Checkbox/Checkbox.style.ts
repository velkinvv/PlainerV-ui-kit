import styled, { css } from 'styled-components';
import { TransitionHandler } from '../../../handlers/uiHandlers';
import {
  buildHoverPressMotionCss,
  buildReducedMotionTransformCss,
} from '../../../handlers/uiMotionStyleHandlers';
import { Size } from '../../../types/sizes';
import { ThemeColorScheme } from '../../../types/theme';
import grey from '../../../variables/colors/grey';
import { neutral } from '../../../variables/colors/neutral';

/**
 * Контейнер чекбокса
 * @param disabled - состояние отключения
 */
export const CheckboxContainer = styled.label<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
  gap: 8px; /* Gap между checkbox и label согласно макету */
`;

/**
 * Скрытый input чекбокса
 */
export const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  pointer-events: none;
`;

/**
 * Визуальный элемент чекбокса
 * @param checked - состояние выбора
 * @param disabled - состояние отключения
 * @param size - размер чекбокса (SM=16px, MD=20px, LG=24px)
 * @param $checkedColor - заливка во «вкл» / indeterminate
 * @param $checkedHoverColor - hover при активном состоянии
 * @param $focusRingColor - кольцо фокуса
 */
export const CheckboxBox = styled.div.withConfig({
  shouldForwardProp: (propName) =>
    ![
      'checked',
      'indeterminate',
      'disabled',
      'size',
      '$checkedColor',
      '$checkedHoverColor',
      '$focusRingColor',
    ].includes(String(propName)),
})<{
  checked: boolean;
  /** Промежуточное состояние: визуально как «включённый», с полоской вместо галочки */
  indeterminate?: boolean;
  disabled?: boolean;
  size?: Size;
  $checkedColor: string;
  $checkedHoverColor: string;
  $focusRingColor: string;
}>`
  position: relative;
  flex-shrink: 0;

  /* Размеры чекбокса в зависимости от пропса size */
  ${({ size = Size.MD }) => {
    switch (size) {
      case Size.SM:
        return css`
          width: 16px;
          height: 16px;
        `;
      case Size.MD:
        return css`
          width: 20px;
          height: 20px;
        `;
      case Size.LG:
        return css`
          width: 24px;
          height: 24px;
        `;
      default:
        return css`
          width: 20px;
          height: 20px;
        `;
    }
  }}

  /* Border согласно макету */
  border: ${({ checked, indeterminate, disabled, theme }) => {
    if (checked || indeterminate) {
      return 'none';
    }
    if (disabled) {
      return `1px solid ${theme.mode === ThemeColorScheme.DARK ? grey[500] : grey[300]}`;
    }
    return `1px solid ${grey[300]}`;
  }};

  border-radius: ${({ checked, indeterminate, size = Size.MD }) => {
    const baseRadius = checked || indeterminate ? 6 : 4;
    const scale = size === Size.SM ? 0.8 : size === Size.LG ? 1.2 : 1;
    return `${baseRadius * scale}px`;
  }};

  background: ${({ theme, checked, indeterminate, disabled, $checkedColor }) => {
    if (disabled) {
      return theme.mode === ThemeColorScheme.DARK ? grey[600] : grey[100];
    }
    if (checked || indeterminate) {
      return $checkedColor;
    }
    return theme.mode === ThemeColorScheme.DARK ? neutral[800] : neutral[10];
  }};

  transition: ${TransitionHandler()};
  will-change: transform, background-color, border-color;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    ${({ disabled, checked, indeterminate, theme, $checkedColor, $checkedHoverColor }) =>
      !disabled &&
      css`
        border-color: ${checked || indeterminate ? $checkedColor : grey[300]};
        background: ${checked || indeterminate
          ? $checkedHoverColor
          : theme.mode === ThemeColorScheme.DARK
            ? neutral[800]
            : neutral[10]};
      `}
  }

  &:active {
  }
  ${buildHoverPressMotionCss({
    hoverSelector: '&:hover',
    activeSelector: '&:active',
    hoverTransform: 'none',
    activeTransform: 'scale(0.96)',
  })}

  &:focus-within,
  &:focus-visible {
    outline: 2px solid
      ${({ $focusRingColor }) => `color-mix(in srgb, ${$focusRingColor} 25%, transparent)`};
    outline-offset: 2px;
    border-radius: ${({ checked, indeterminate, size = Size.MD }) => {
      const baseRadius = checked || indeterminate ? 6 : 4;
      const scale = size === Size.SM ? 0.8 : size === Size.LG ? 1.2 : 1;
      return `${baseRadius * scale}px`;
    }};
  }
`;

/**
 * Иконка галочки в чекбоксе
 * @param checked - состояние выбора
 * @param size - размер чекбокса (SM=10px, MD=12px, LG=14px - пропорционально размеру чекбокса)
 */
export const CheckIcon = styled.div.withConfig({
  shouldForwardProp: (propName) =>
    !['checked', 'indeterminate', 'size'].includes(String(propName)),
})<{ checked: boolean; indeterminate?: boolean; size?: Size }>`
  opacity: ${({ checked, indeterminate }) => (checked || indeterminate ? 1 : 0)};
  transition: ${TransitionHandler()};
  transform: ${({ checked, indeterminate }) =>
    checked || indeterminate ? 'scale(1)' : 'scale(0.75)'};
  will-change: transform, opacity;
  color: ${neutral[10]}; /* Белый цвет для иконки */
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  ${buildReducedMotionTransformCss('scale(1)')}

  ${({ size = Size.MD }) => {
    switch (size) {
      case Size.SM:
        return css`
          width: 10px;
          height: 10px;
        `;
      case Size.MD:
        return css`
          width: 12px;
          height: 12px;
        `;
      case Size.LG:
        return css`
          width: 14px;
          height: 14px;
        `;
      default:
        return css`
          width: 12px;
          height: 12px;
        `;
    }
  }}
`;

/**
 * Лейбл чекбокса
 * @param disabled - состояние отключения
 */
export const CheckboxLabel = styled.span<{ disabled?: boolean }>`
  color: ${({ theme, disabled }) => {
    if (disabled) {
      return neutral[400];
    }
    return theme.mode === ThemeColorScheme.DARK ? neutral[10] : neutral[800];
  }};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4285714285714286em;
  user-select: none;
`;
