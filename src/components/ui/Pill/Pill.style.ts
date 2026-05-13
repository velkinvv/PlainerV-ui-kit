import styled, { css } from 'styled-components';
import type { DefaultTheme } from 'styled-components';
import { TransitionHandler } from '../../../handlers/uiHandlers';
import { buildHoverPressMotionCss } from '../../../handlers/uiMotionStyleHandlers';
import type { PillGeometry } from './handlers';
import type { PillStatus } from '../../../types/ui';
import { ThemeMode } from '../../../types/theme';

/**
 * Акцентный цвет Pill по семантическому статусу (выбранное состояние, спиннер).
 *
 * @param theme — тема styled-components
 * @param status — статус (`default` — primary)
 */
export const resolvePillAccent = (theme: DefaultTheme, status: PillStatus | undefined): string => {
  switch (status ?? 'default') {
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'danger':
      return theme.colors.danger;
    case 'info':
      return theme.colors.info;
    default:
      return theme.colors.primary;
  }
};

/**
 * Корневая кнопка Pill (default / hover / active / selected / disabled / loading).
 * @property $g - Геометрия из `getPillGeometry`
 * @property $selected - Выбранное состояние
 * @property $status - Семантический акцент выбранного состояния
 */
export const PillRoot = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== '$g' && prop !== '$selected' && prop !== '$status',
})<{ $g: PillGeometry; $selected?: boolean; $status?: PillStatus }>`
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
  ${buildHoverPressMotionCss({
    hoverSelector: '&:hover:not(:disabled)',
    activeSelector: '&:active:not(:disabled)',
    hoverTransform: 'none',
    activeTransform: 'scale(0.98)',
  })}

  ${({ $selected, theme, $status }) =>
    $selected &&
    css`
      border-color: ${resolvePillAccent(theme, $status)};
      color: ${resolvePillAccent(theme, $status)};
      background: ${theme.mode === ThemeMode.DARK
        ? `color-mix(in srgb, ${resolvePillAccent(theme, $status)} 22%, ${theme.colors.input})`
        : `color-mix(in srgb, ${resolvePillAccent(theme, $status)} 10%, ${theme.colors.input})`};
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
 * @property $status - Цвет кольца и точки в выбранном состоянии
 */
export const PillIndicator = styled.span.withConfig({
  shouldForwardProp: (prop) =>
    prop !== '$g' && prop !== '$selected' && prop !== '$disabled' && prop !== '$status',
})<{ $g: PillGeometry; $selected?: boolean; $disabled?: boolean; $status?: PillStatus }>`
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

  ${({ $disabled, $selected, theme, $g, $status }) =>
    !$disabled &&
    $selected &&
    css`
      border: ${$g.ringWidth}px solid ${resolvePillAccent(theme, $status)};
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
    ${({ $selected, $disabled, theme, $status }) =>
      $selected && !$disabled
        ? css`
            background: ${resolvePillAccent(theme, $status)};
          `
        : css`
            display: none;
          `}
  }
`;

/**
 * Спиннер в слоте индикатора при `loading` (полоска кольца с акцентом статуса).
 * @property $g — диаметр как у индикатора
 * @property $status — цвет активной дуги
 */
export const PillLoadingIndicator = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== '$g' && prop !== '$status',
})<{ $g: PillGeometry; $status?: PillStatus }>`
  flex-shrink: 0;
  width: ${({ $g }) => $g.indicator}px;
  height: ${({ $g }) => $g.indicator}px;
  border-radius: 50%;
  box-sizing: border-box;
  border: ${({ $g }) => Math.max(1, Math.round($g.ringWidth))}px solid
    ${({ theme }) => theme.colors.borderSecondary};
  border-top-color: ${({ theme, $status }) => resolvePillAccent(theme, $status)};
  animation: ui-pill-loading-spin 0.7s linear infinite;

  @keyframes ui-pill-loading-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

/** Текст подписи рядом с индикатором */
export const PillText = styled.span`
  white-space: nowrap;
  color: inherit;
`;
