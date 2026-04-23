import styled, { css } from 'styled-components';
import { TransitionHandler } from '../../../handlers/uiHandlers';
import type { TagAppearance, TagColorVariant } from '../../../types/ui';
import { ThemeMode } from '../../../types/theme';

type TagRootProps = {
  $color: TagColorVariant;
  $appearance: TagAppearance;
  $clickable: boolean;
  $disabled?: boolean;
  $padding: string;
  $gap: string;
  $fontSize: string;
  $minHeight: string;
};

const palette = (
  theme: { colors: Record<string, string>; mode?: ThemeMode },
  color: TagColorVariant,
  appearance: TagAppearance,
) => {
  const isDark = theme.mode === ThemeMode.DARK;
  const filled = appearance === 'filled';

  const tone = {
    neutral: {
      fg: isDark ? theme.colors.textSecondary : theme.colors.textSecondary,
      border: theme.colors.borderSecondary,
      fill: isDark
        ? `color-mix(in srgb, ${theme.colors.textTertiary} 22%, ${theme.colors.input})`
        : `color-mix(in srgb, ${theme.colors.textTertiary} 12%, ${theme.colors.input})`,
      outlineBg: theme.colors.input,
      outlineBorder: theme.colors.borderTertiary,
    },
    danger: {
      fg: theme.colors.danger,
      border: theme.colors.danger,
      fill: `color-mix(in srgb, ${theme.colors.danger} ${isDark ? 22 : 14}%, ${theme.colors.input})`,
      outlineBg: theme.colors.input,
      outlineBorder: theme.colors.danger,
    },
    info: {
      fg: theme.colors.primary,
      border: theme.colors.primary,
      fill: `color-mix(in srgb, ${theme.colors.primary} ${isDark ? 22 : 12}%, ${theme.colors.input})`,
      outlineBg: theme.colors.input,
      outlineBorder: theme.colors.primary,
    },
    success: {
      fg: theme.colors.success,
      border: theme.colors.success,
      fill: `color-mix(in srgb, ${theme.colors.success} ${isDark ? 22 : 14}%, ${theme.colors.input})`,
      outlineBg: theme.colors.input,
      outlineBorder: theme.colors.success,
    },
    warning: {
      fg: theme.colors.warning,
      border: theme.colors.warning,
      fill: `color-mix(in srgb, ${theme.colors.warning} ${isDark ? 24 : 16}%, ${theme.colors.input})`,
      outlineBg: theme.colors.input,
      outlineBorder: theme.colors.warning,
    },
  }[color];

  if (filled) {
    return css`
      color: ${tone.fg};
      border: 1px solid ${tone.border};
      background: ${tone.fill};
    `;
  }
  return css`
    color: ${tone.fg};
    border: 1px solid ${tone.outlineBorder};
    background: ${tone.outlineBg};
  `;
};

/**
 * Корневой элемент тега (`span`, при клике — `role="button"`).
 * @property $color - Палитра
 * @property $appearance - filled / outline
 * @property $clickable - Курсор и hover
 * @property $disabled - Приглушение
 * @property $padding / $gap / $fontSize / $minHeight — из `getTagMetrics`
 */
export const TagRoot = styled.span.withConfig({
  shouldForwardProp: prop =>
    !['$color', '$appearance', '$clickable', '$disabled', '$padding', '$gap', '$fontSize', '$minHeight'].includes(
      String(prop),
    ),
})<TagRootProps>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  gap: ${({ $gap }) => $gap};
  padding: ${({ $padding }) => $padding};
  min-height: ${({ $minHeight }) => $minHeight};
  border-radius: 6px;
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: ${({ theme }) => theme.typography.label.fontWeight};
  line-height: 1.25;
  white-space: nowrap;
  user-select: none;
  transition: ${TransitionHandler()};
  cursor: ${({ $clickable, $disabled }) => ($disabled ? 'not-allowed' : $clickable ? 'pointer' : 'default')};
  opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};

  ${({ theme, $color, $appearance }) => palette(theme, $color, $appearance)}

  ${({ $clickable, $disabled, theme }) =>
    $clickable &&
    !$disabled &&
    css`
      &:hover {
        filter: brightness(0.97);
      }

      &:active {
        filter: brightness(0.93);
      }

      &:focus-visible {
        outline: 2px solid ${theme.colors.primary};
        outline-offset: 2px;
      }
    `}
`;

/** Обёртка иконки (выравнивание с текстом) */
export const TagIconSlot = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  line-height: 0;
`;

/** Текстовая часть */
export const TagLabel = styled.span`
  min-width: 0;
`;
