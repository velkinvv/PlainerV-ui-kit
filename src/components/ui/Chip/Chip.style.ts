import styled, { css } from 'styled-components';
import { createStyledShouldForwardProp } from '../../../handlers/styledComponentHandlers';
import { TransitionHandler } from '../../../handlers/uiHandlers';
import { buildHoverPressMotionCss } from '../../../handlers/uiMotionStyleHandlers';
import type { ChipAppearance } from '../../../types/ui';

type ChipRootProps = {
  $appearance: ChipAppearance;
  $selected: boolean;
  $clickable: boolean;
  $disabled: boolean;
  $padding: string;
  $gap: string;
  $fontSize: string;
  $minHeight: string;
  $maxWidthCss?: string;
};

/**
 * Корневой элемент чипа (полиморфный: `span` | `button`).
 * @property $appearance - filled / outline
 * @property $selected - выбранное состояние
 * @property $clickable - есть обработчик клика
 * @property $disabled - блокировка
 */
export const ChipRoot = styled.span.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<ChipRootProps>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  flex-shrink: 0;
  gap: ${({ $gap }) => $gap};
  padding: ${({ $padding }) => $padding};
  min-height: ${({ $minHeight }) => $minHeight};
  max-width: ${({ $maxWidthCss }) => $maxWidthCss ?? '100%'};
  border-radius: 999px;
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: ${({ theme }) => theme.typography.label.fontWeight};
  line-height: 1.25;
  white-space: nowrap;
  user-select: none;
  transition: ${TransitionHandler()};
  cursor: ${({ $clickable, $disabled }) =>
    $disabled ? 'not-allowed' : $clickable ? 'pointer' : 'default'};
  opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};

  ${({ theme, $appearance, $selected }) => {
    if ($selected) {
      return css`
        color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary};
        background: color-mix(
          in srgb,
          ${theme.colors.primary} ${$appearance === 'outline' ? 10 : 16}%,
          ${theme.colors.input}
        );
      `;
    }

    if ($appearance === 'outline') {
      return css`
        color: ${theme.colors.text};
        border: 1px solid ${theme.colors.borderSecondary};
        background: transparent;
      `;
    }

    return css`
      color: ${theme.colors.text};
      border: 1px solid transparent;
      background: ${theme.colors.backgroundTertiary};
    `;
  }}

  ${({ $clickable, $disabled, $selected, theme, $appearance }) =>
    $clickable &&
    !$disabled &&
    css`
      &:hover {
        ${!$selected &&
        ($appearance === 'outline'
          ? css`
              background: ${theme.colors.backgroundSecondary};
            `
          : css`
              filter: brightness(0.97);
            `)}
        ${$selected &&
        css`
          filter: brightness(0.97);
        `}
      }

      &:active {
        filter: brightness(0.95);
      }

      ${buildHoverPressMotionCss({
        hoverSelector: '&:hover',
        activeSelector: '&:active',
        hoverTransform: 'none',
        activeTransform: 'scale(0.98)',
      })}
    `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/** Слот под иконку слева/справа */
export const ChipIconSlot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 0;
`;

/**
 * Текст чипа с опциональной обрезкой.
 * @property $ellipsis - включить text-overflow
 */
export const ChipLabel = styled.span.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $ellipsis?: boolean }>`
  min-width: 0;
  font: inherit;
  ${({ $ellipsis }) =>
    $ellipsis &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
`;

/** Слот для badge справа от текста */
export const ChipBadgeSlot = styled.span`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  line-height: 0;
`;

/**
 * Кнопка удаления чипа.
 * @property $sizePx - ширина/высота кнопки
 */
export const ChipCloseButton = styled.button.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $sizePx: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  width: ${({ $sizePx }) => `${$sizePx}px`};
  height: ${({ $sizePx }) => `${$sizePx}px`};
  border: none;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition:
    color 0.15s ease,
    transform 0.12s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.text};
  }

  ${buildHoverPressMotionCss({
    hoverSelector: '&:hover:not(:disabled)',
    activeSelector: '&:active:not(:disabled)',
    hoverTransform: 'translateY(-1px)',
    activeTransform: 'scale(0.96)',
  })}

  &:active:not(:disabled) {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 1px;
  }
`;
