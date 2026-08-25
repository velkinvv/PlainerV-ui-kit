import styled from 'styled-components';
import { createStyledShouldForwardProp } from '../../../../handlers/styledComponentHandlers';
import { TransitionHandler } from '../../../../handlers/uiHandlers';
import { Size } from '../../../../types/sizes';

/** Ряд прежнего floating-лейбла DateInput / TimeInput / DateTimeInput. */
export const FloatingCaptionRow = styled.div`
  position: relative;
  margin-bottom: 4px;
  width: 100%;
  height: 20px;
`;

export const FloatingFieldLabel = styled.label.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{
  focused: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: Size;
}>`
  position: absolute !important;
  top: 0 !important;
  margin: 0 !important;
  background: none !important;
  padding: 0 !important;
  color: ${({ theme, focused, error, disabled }) => {
    if (disabled) return theme.colors.textDisabled;
    if (error) return theme.colors.danger;
    if (focused) return theme.colors.primary;
    return theme.colors.textSecondary;
  }};
  transition: ${TransitionHandler()};
`;

export const FloatingLeftLabel = styled(FloatingFieldLabel)`
  left: 0 !important;
  font-size: ${({ size }) => {
    switch (size) {
      case Size.SM:
        return '12px';
      case Size.LG:
        return '14px';
      default:
        return '12px';
    }
  }};
`;

export const FloatingRightLabel = styled(FloatingFieldLabel)`
  right: 0 !important;
  font-size: 12px;
  opacity: 0.7;
`;
