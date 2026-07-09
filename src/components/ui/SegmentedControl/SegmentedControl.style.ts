import styled, { css, keyframes } from 'styled-components';
import { createStyledShouldForwardProp } from '../../../handlers/styledComponentHandlers';
import { TransitionHandler } from '../../../handlers/uiHandlers';
import type { SegmentedControlAppearance } from '../../../types/ui';
import type { SegmentedControlGeometry } from './handlers';

type RootProps = {
  $appearance: SegmentedControlAppearance;
  $fullWidth: boolean;
  $outerRadius: string;
};

/**
 * Корень группы (`fieldset`).
 */
export const SegmentedControlRoot = styled.fieldset.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<RootProps>`
  display: ${({ $fullWidth }) => ($fullWidth ? 'flex' : 'inline-flex')};
  flex-wrap: nowrap;
  align-items: stretch;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
  border-radius: ${({ $outerRadius }) => $outerRadius};

  ${({ $appearance }) =>
    $appearance === 'filled'
      ? css`
          gap: 1px;
          background: ${({ theme }) => theme.colors.backgroundTertiary};
          padding: 2px;
        `
      : css`
          & > .ui-segmented-control-item:not(:first-child) {
            margin-left: -1px;
          }
        `}

  & > .ui-segmented-control-item {
    flex: ${({ $fullWidth }) => ($fullWidth ? '1 1 0' : '0 0 auto')};
    min-width: 0;
  }

  & > .ui-segmented-control-item:first-child .ui-segmented-control-item__surface {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  & > .ui-segmented-control-item:last-child .ui-segmented-control-item__surface {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  & > .ui-segmented-control-item:not(:first-child):not(:last-child)
    .ui-segmented-control-item__surface {
    border-radius: 0;
  }

  & > .ui-segmented-control-item:only-child .ui-segmented-control-item__surface {
    border-radius: ${({ $outerRadius }) => $outerRadius};
  }
`;

type ItemLabelProps = {
  $disabled: boolean;
};

/** Обёртка-лейбл сегмента */
export const SegmentedControlItemLabel = styled.label.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<ItemLabelProps>`
  position: relative;
  display: inline-flex;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};
  box-sizing: border-box;
`;

/** Скрытый native input */
export const SegmentedControlItemInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`;

type SurfaceProps = {
  $geometry: SegmentedControlGeometry;
  $appearance: SegmentedControlAppearance;
  $checked: boolean;
  $disabled: boolean;
  $displayAsSquare: boolean;
};

/**
 * Визуальная поверхность сегмента.
 */
export const SegmentedControlItemSurface = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<SurfaceProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-sizing: border-box;
  min-height: ${({ $geometry }) => $geometry.minHeight};
  padding: ${({ $geometry, $displayAsSquare }) =>
    $displayAsSquare ? '0' : `0 ${$geometry.paddingInline}`};
  width: ${({ $geometry, $displayAsSquare }) =>
    $displayAsSquare ? $geometry.squareSize : '100%'};
  min-width: ${({ $geometry, $displayAsSquare }) =>
    $displayAsSquare ? $geometry.squareSize : 'auto'};
  border-radius: ${({ $geometry }) => $geometry.outerRadius};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ $geometry }) => $geometry.fontSize};
  font-weight: 500;
  line-height: 1.25;
  white-space: nowrap;
  user-select: none;
  transition: ${TransitionHandler()};

  ${({ theme, $appearance, $checked }) => {
    if ($appearance === 'filled') {
      return $checked
        ? css`
            color: ${theme.colors.text};
            background: ${theme.colors.card ?? theme.colors.background};
            border: 1px solid transparent;
            box-shadow: 0 1px 2px color-mix(in srgb, ${theme.colors.text} 12%, transparent);
          `
        : css`
            color: ${theme.colors.textSecondary};
            background: transparent;
            border: 1px solid transparent;
          `;
    }

    return $checked
      ? css`
          color: ${theme.colors.primary};
          background: color-mix(in srgb, ${theme.colors.primary} 10%, ${theme.colors.input});
          border: 1px solid ${theme.colors.primary};
          z-index: 1;
        `
      : css`
          color: ${theme.colors.text};
          background: ${theme.colors.input};
          border: 1px solid ${theme.colors.borderSecondary};
        `;
  }}

  ${SegmentedControlItemLabel}:hover:not([data-disabled='true']) & {
    ${({ $checked, $appearance, theme }) =>
      !$checked &&
      ($appearance === 'filled'
        ? css`
            color: ${theme.colors.text};
          `
        : css`
            background: ${theme.colors.backgroundSecondary};
          `)}
  }

  ${SegmentedControlItemInput}:focus-visible + & {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    z-index: 2;
  }
`;

/** Слот иконки */
export const SegmentedControlItemIconSlot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 0;
`;

const spinKeyframes = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

/** Спиннер загрузки в сегменте */
export const SegmentedControlItemSpinner = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spinKeyframes} 0.7s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.7;
  }
`;
