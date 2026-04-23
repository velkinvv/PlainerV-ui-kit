import styled, { css } from 'styled-components';
import { TransitionHandler } from '../../../handlers/uiHandlers';
import type { PillGeometry } from './handlers';
import { ThemeMode } from '../../../types/theme';

/**
 * Корневая кнопка Pill (default / hover / active / selected / disabled).
 * @property $g - Геометрия из `getPillGeometry`
 * @property $selected - Выбранное состояние
 */
export const PillRoot = styled.button
  .withConfig({
    shouldForwardProp: prop => prop !== '$g' && prop !== '$selected',
  })<{ $g: PillGeometry; $selected?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0;
  padding: ${({ $g }) => $g.padding};
  gap: ${({ $g }) => $g.gap};
  border-radius: ${({ $g }) => $g.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ $g }) => $g.fontSize};
  font-weight: ${({ $g }) => $g.fontWeight};
  line-height: ${({ $g }) => $g.lineHeight};
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  user-select: none;
  transition: ${TransitionHandler()};

  &:hover:not(:disabled) {
    ${({ $selected, theme }) =>
      $selected
        ? css`
            filter: brightness(0.97);
          `
        : css`
            background: ${theme.colors.backgroundTertiary};
          `}
  }

  &:active:not(:disabled) {
    ${({ $selected, theme }) =>
      $selected
        ? css`
            filter: brightness(0.93);
          `
        : css`
            background: ${theme.colors.backgroundQuaternary};
          `}
  }

  ${({ $selected, theme }) =>
    $selected &&
    css`
      border-color: ${theme.colors.primary};
      color: ${theme.colors.primary};
      background: ${theme.mode === ThemeMode.DARK
        ? `color-mix(in srgb, ${theme.colors.primary} 22%, ${theme.colors.input})`
        : `color-mix(in srgb, ${theme.colors.primary} 10%, ${theme.colors.input})`};
    `}

  &:disabled {
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.colors.borderSecondary};
    background: ${({ theme }) => theme.colors.input};
    color: ${({ theme }) => theme.colors.textDisabled};
    opacity: 0.92;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/**
 * Круглый индикатор слева (контур / точка / приглушённая заливка при disabled).
 * @property $g - Геометрия
 * @property $selected - Выбрано
 * @property $disabled - Отключено
 */
export const PillIndicator = styled.span
  .withConfig({
    shouldForwardProp: prop => prop !== '$g' && prop !== '$selected' && prop !== '$disabled',
  })<{ $g: PillGeometry; $selected?: boolean; $disabled?: boolean }>`
  position: relative;
  flex-shrink: 0;
  width: ${({ $g }) => $g.indicator}px;
  height: ${({ $g }) => $g.indicator}px;
  border-radius: 50%;
  box-sizing: border-box;

  ${({ $disabled, theme }) =>
    $disabled &&
    css`
      border: none;
      background: ${theme.colors.borderTertiary};
    `}

  ${({ $disabled, $selected, theme, $g }) =>
    !$disabled &&
    !$selected &&
    css`
      border: ${$g.ringWidth}px solid ${theme.colors.text};
      background: transparent;
    `}

  ${({ $disabled, $selected, theme, $g }) =>
    !$disabled &&
    $selected &&
    css`
      border: ${$g.ringWidth}px solid ${theme.colors.primary};
      background: transparent;
    `}

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    width: ${({ $g }) => $g.dot}px;
    height: ${({ $g }) => $g.dot}px;
    ${({ $selected, $disabled, theme }) =>
      $selected && !$disabled
        ? css`
            background: ${theme.colors.primary};
          `
        : css`
            display: none;
          `}
  }
`;

/** Текст подписи рядом с индикатором */
export const PillText = styled.span`
  white-space: nowrap;
  color: inherit;
`;
