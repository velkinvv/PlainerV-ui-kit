import styled, { css } from 'styled-components';
import { TransitionHandler } from '../../../handlers/uiHandlers';
import {
  buildHoverPressMotionCss,
  buildReducedMotionTransformCss,
} from '../../../handlers/uiMotionStyleHandlers';
import { Size } from '../../../types/sizes';
import { ThemeMode } from '../../../types/theme';
import { success } from '../../../variables/colors/success';
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
 */
export const CheckboxBox = styled.div<{
  checked: boolean;
  /** Промежуточное состояние: визуально как «включённый», с полоской вместо галочки */
  indeterminate?: boolean;
  disabled?: boolean;
  size?: Size;
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
      // Активный checkbox не имеет границы согласно макету
      return 'none';
    }
    if (disabled) {
      // Disabled border: Gray_02 / 4O (#E0E0E0) для светлой, Gray/500 (#9E9E9E) для темной
      return `1px solid ${theme.mode === ThemeMode.DARK ? grey[500] : grey[300]}`;
    }
    // Inactive border: Gray/300 (#C5C5C5)
    return `1px solid ${grey[300]}`;
  }};

  /* Border radius: пропорционально размеру, 4px для inactive, 6px для active согласно макету (MD) */
  border-radius: ${({ checked, indeterminate, size = Size.MD }) => {
    const baseRadius = checked || indeterminate ? 6 : 4; // Базовый радиус для MD (20px)
    const scale = size === Size.SM ? 0.8 : size === Size.LG ? 1.2 : 1; // Масштаб относительно MD
    return `${baseRadius * scale}px`;
  }};

  /* Background согласно макету */
  background: ${({ theme, checked, indeterminate, disabled }) => {
    if (disabled) {
      // Disabled background: Gray_02 / 2O (#F5F5F5) для светлой, Gray_02/7O (#757575) для темной
      return theme.mode === ThemeMode.DARK ? grey[600] : grey[100];
    }
    if (checked || indeterminate) {
      // Active background: Success/600 main (#7FCD43)
      return success[600];
    }
    // Inactive background: Gray_02/1O (#FFFFFF) для светлой, Gray_02/9O (#424242) для темной
    return theme.mode === ThemeMode.DARK ? neutral[800] : neutral[10];
  }};

  transition: ${TransitionHandler()};
  will-change: transform, background-color, border-color;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Hover состояние */
  &:hover {
    ${({ disabled, checked, indeterminate, theme }) =>
      !disabled &&
      css`
        border-color: ${checked || indeterminate ? success[600] : grey[300]};
        background: ${checked || indeterminate
          ? success[500]
          : theme.mode === ThemeMode.DARK
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

  /* Focus состояние согласно макету */
  &:focus-within,
  &:focus-visible {
    outline: 2px solid ${success.bg}; /* Success/bg (#E9FADC) */
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
export const CheckIcon = styled.div<{ checked: boolean; indeterminate?: boolean; size?: Size }>`
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

  /* Размер иконки пропорционально размеру чекбокса */
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
      // Disabled label: Gray_02 / 5O (#C2C2C2)
      return neutral[400];
    }
    // Label color: Gray_02 / 9O (#424242) для светлой, Gray_02/1O (#FFFFFF) для темной
    return theme.mode === ThemeMode.DARK ? neutral[10] : neutral[800];
  }};
  font-family: ${({ theme }) => theme.fonts.primary}; /* Montserrat */
  font-size: 14px; /* Согласно макету */
  font-weight: 400; /* Regular */
  line-height: 1.4285714285714286em; /* Согласно макету */
  user-select: none;
`;
