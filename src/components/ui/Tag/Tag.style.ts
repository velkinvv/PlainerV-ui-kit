import styled, { css } from 'styled-components';
import { TransitionHandler } from '../../../handlers/uiHandlers';
import type { Colors } from '../../../types/theme';
import type { TagAppearance, TagColorVariant, TagCustomColors, TagStatusDisplay } from '../../../types/ui';
import { ThemeMode } from '../../../types/theme';

type TagRootProps = {
  $color: TagColorVariant;
  $appearance: TagAppearance;
  $statusDisplay: TagStatusDisplay;
  $clickable: boolean;
  $disabled?: boolean;
  $padding: string;
  $gap: string;
  $fontSize: string;
  $minHeight: string;
  $widthCss?: string;
  $maxWidthCss?: string;
  $hideBorder?: boolean;
  /** Полная кастомизация заливки пилюли (есть `background`) */
  $customSurface?: TagCustomColors | null;
};

/** Сплошная заливка кружка статуса (режим `marker`) */
export const markerDotFill = (
  theme: { colors: Colors; mode?: ThemeMode },
  color: TagColorVariant,
): string => {
  switch (color) {
    case 'neutral':
      return theme.colors.borderTertiary;
    case 'primary':
      return theme.colors.tagPrimaryAccent;
    case 'info':
      return theme.colors.info;
    case 'danger':
      return theme.colors.danger;
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'secondary':
      return theme.colors.secondary;
    case 'purple':
      return theme.colors.tagAccentPurple;
    case 'teal':
      return theme.colors.tagAccentTeal;
    case 'cyan':
      return theme.colors.tagAccentCyan;
    case 'pink':
      return theme.colors.tagAccentPink;
    case 'custom':
      return theme.colors.borderTertiary;
    default:
      return theme.colors.borderTertiary;
  }
};

/** Тон заливки/обводки тега по варианту из темы */
type TagTone = {
  fg: string;
  border: string;
  fill: string;
  outlineBg: string;
  outlineBorder: string;
};

const getTagTone = (
  theme: { colors: Colors; mode?: ThemeMode },
  color: TagColorVariant,
  isDark: boolean,
): TagTone => {
  const mix = (accent: string, lightPct: number, darkPct: number) =>
    `color-mix(in srgb, ${accent} ${isDark ? darkPct : lightPct}%, ${theme.colors.input})`;

  switch (color) {
    case 'neutral':
      return {
        fg: theme.colors.textSecondary,
        border: theme.colors.borderSecondary,
        fill: isDark
          ? `color-mix(in srgb, ${theme.colors.textTertiary} 22%, ${theme.colors.input})`
          : `color-mix(in srgb, ${theme.colors.textTertiary} 12%, ${theme.colors.input})`,
        outlineBg: theme.colors.input,
        outlineBorder: theme.colors.borderTertiary,
      };
    case 'secondary':
      return {
        fg: theme.colors.secondary,
        border: theme.colors.secondary,
        fill: mix(theme.colors.secondary, 10, 18),
        outlineBg: theme.colors.input,
        outlineBorder: theme.colors.secondary,
      };
    case 'primary':
      return {
        fg: theme.colors.tagPrimaryAccent,
        border: theme.colors.tagPrimaryAccent,
        fill: mix(theme.colors.tagPrimaryAccent, 12, 22),
        outlineBg: theme.colors.input,
        outlineBorder: theme.colors.tagPrimaryAccent,
      };
    case 'danger':
      return {
        fg: theme.colors.danger,
        border: theme.colors.danger,
        fill: mix(theme.colors.danger, 14, 22),
        outlineBg: theme.colors.input,
        outlineBorder: theme.colors.danger,
      };
    case 'info':
      return {
        fg: theme.colors.info,
        border: theme.colors.info,
        fill: mix(theme.colors.info, 12, 22),
        outlineBg: theme.colors.input,
        outlineBorder: theme.colors.info,
      };
    case 'success':
      return {
        fg: theme.colors.success,
        border: theme.colors.success,
        fill: mix(theme.colors.success, 14, 22),
        outlineBg: theme.colors.input,
        outlineBorder: theme.colors.success,
      };
    case 'warning':
      return {
        fg: theme.colors.warning,
        border: theme.colors.warning,
        fill: mix(theme.colors.warning, 16, 24),
        outlineBg: theme.colors.input,
        outlineBorder: theme.colors.warning,
      };
    case 'purple':
      return {
        fg: theme.colors.tagAccentPurple,
        border: theme.colors.tagAccentPurple,
        fill: mix(theme.colors.tagAccentPurple, 14, 22),
        outlineBg: theme.colors.input,
        outlineBorder: theme.colors.tagAccentPurple,
      };
    case 'teal':
      return {
        fg: theme.colors.tagAccentTeal,
        border: theme.colors.tagAccentTeal,
        fill: mix(theme.colors.tagAccentTeal, 14, 22),
        outlineBg: theme.colors.input,
        outlineBorder: theme.colors.tagAccentTeal,
      };
    case 'cyan':
      return {
        fg: theme.colors.tagAccentCyan,
        border: theme.colors.tagAccentCyan,
        fill: mix(theme.colors.tagAccentCyan, 14, 22),
        outlineBg: theme.colors.input,
        outlineBorder: theme.colors.tagAccentCyan,
      };
    case 'pink':
      return {
        fg: theme.colors.tagAccentPink,
        border: theme.colors.tagAccentPink,
        fill: mix(theme.colors.tagAccentPink, 14, 22),
        outlineBg: theme.colors.input,
        outlineBorder: theme.colors.tagAccentPink,
      };
    case 'custom':
      return getTagTone(theme, 'neutral', isDark);
    default:
      return getTagTone(theme, 'neutral', isDark);
  }
};

const palette = (
  theme: { colors: Colors; mode?: ThemeMode },
  color: TagColorVariant,
  appearance: TagAppearance,
) => {
  const isDark = theme.mode === ThemeMode.DARK;
  const filled = appearance === 'filled';

  const tone = getTagTone(theme, color, isDark);

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

const customSurfaceCss = (
  custom: NonNullable<TagRootProps['$customSurface']>,
  clickable: boolean,
  disabled?: boolean,
) => css`
  color: ${custom.color ?? 'inherit'};
  background: ${custom.background ?? 'transparent'};
  border: 1px solid ${custom.border ?? 'transparent'};
  ${clickable &&
  !disabled &&
  css`
    &:hover {
      filter: none;
      background: ${custom.backgroundHover ?? custom.background};
    }
    &:active {
      filter: brightness(0.96);
    }
  `}
`;

/**
 * Корневой элемент тега (полиморфный: `span` | `button` | `div`).
 * @property $statusDisplay - surface: палитра на всём теге; marker: нейтральная «пилюля» + цветной кружок
 * @property $customSurface — переопределение фона (не сочетается с marker в типах; в стилях игнорируем marker если передан custom)
 */
export const TagRoot = styled.span.withConfig({
  shouldForwardProp: prop =>
    ![
      '$color',
      '$appearance',
      '$statusDisplay',
      '$clickable',
      '$disabled',
      '$padding',
      '$gap',
      '$fontSize',
      '$minHeight',
      '$widthCss',
      '$maxWidthCss',
      '$hideBorder',
      '$customSurface',
    ].includes(String(prop)),
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

  ${({ $widthCss }) => $widthCss && `width: ${$widthCss};`}
  ${({ $maxWidthCss }) => $maxWidthCss && `max-width: ${$maxWidthCss};`}

  ${({ $hideBorder }) =>
    $hideBorder &&
    css`
      border-color: transparent !important;
    `}

  ${({ theme, $customSurface, $clickable, $disabled }) =>
    $customSurface?.background != null && `${$customSurface.background}`.length > 0
      ? customSurfaceCss($customSurface, Boolean($clickable), $disabled)
      : ''}

  ${({ theme, $color, $appearance, $statusDisplay, $customSurface }) =>
    !($customSurface?.background != null && `${$customSurface.background}`.length > 0) &&
    ($statusDisplay === 'marker'
      ? palette(theme, 'neutral', $appearance)
      : palette(theme, $color, $appearance))}

  ${({ $clickable, $disabled, theme, $customSurface }) =>
    $clickable &&
    !$disabled &&
    !($customSurface?.background != null && `${$customSurface.background}`.length > 0) &&
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

  ${({ $clickable, $disabled, theme, $customSurface }) =>
    $clickable &&
    !$disabled &&
    $customSurface?.background != null &&
    `${$customSurface.background}`.length > 0 &&
    css`
      &:focus-visible {
        outline: 2px solid ${theme.colors.primary};
        outline-offset: 2px;
      }
    `}
`;

/** Цветная метка статуса слева (режим `statusDisplay="marker"`) */
export const TagStatusMarker = styled.span.withConfig({
  shouldForwardProp: prop => !['$markerColor', '$markerFill'].includes(String(prop)),
})<{ $markerColor: TagColorVariant; $markerFill?: string }>`
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
  background: ${({ theme, $markerColor, $markerFill }) =>
    $markerFill ?? markerDotFill(theme, $markerColor)};
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
export const TagLabel = styled.span<{ $ellipsis?: boolean }>`
  min-width: 0;
  ${({ $ellipsis }) =>
    $ellipsis &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`;
