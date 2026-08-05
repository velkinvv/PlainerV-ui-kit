import styled from 'styled-components';
import { createStyledShouldForwardProp } from '../../../handlers/styledComponentHandlers';
import { BorderRadiusHandler, TransitionHandler } from '../../../handlers/uiHandlers';
import { Size } from '../../../types/sizes';

type AlertRootStyleProps = {
  $fullWidth?: boolean;
  $background: string;
  $border: string;
  $text: string;
  $padding: string;
  $gap: string;
};

/**
 * Корень Alert.
 * @property $background / $border / $text - Токены поверхности
 * @property $fullWidth - На всю ширину
 */
export const AlertRoot = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<AlertRootStyleProps>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ $gap }) => $gap};
  box-sizing: border-box;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  max-width: 100%;
  padding: ${({ $padding }) => $padding};
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  border: 1px solid ${({ $border }) => $border};
  background: ${({ $background }) => $background};
  color: ${({ $text }) => $text};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  transition: ${TransitionHandler()};
`;

export const AlertIconSlot = styled.div<{ $accent: string; $iconSizePx: number }>`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  width: ${({ $iconSizePx }) => $iconSizePx}px;
  height: ${({ $iconSizePx }) => $iconSizePx}px;
  color: ${({ $accent }) => $accent};
  line-height: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const AlertBody = styled.div<{ $fontSize: string }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 1 auto;
  min-width: 0;
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: 400;
  line-height: 1.45;
  color: inherit;
`;

export const AlertTitleRoot = styled.div<{ $titleColor: string; $fontSize: string }>`
  margin: 0;
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: 600;
  line-height: 1.35;
  color: ${({ $titleColor }) => $titleColor};
`;

export const AlertActionSlot = styled.div`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  align-self: center;
`;

/**
 * Кнопка закрытия Alert: цвет из поверхности (на filled — белый), без темы ghost IconButton.
 * @property $iconColor - Цвет иконки
 * @property $sizePx - Размер hit-area
 */
export const AlertCloseButton = styled.button.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $iconColor: string; $sizePx: number }>`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: ${({ $sizePx }) => $sizePx}px;
  height: ${({ $sizePx }) => $sizePx}px;
  border: none;
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  background: transparent;
  color: ${({ $iconColor }) => $iconColor};
  cursor: pointer;
  transition: ${TransitionHandler()};

  &:hover {
    background: color-mix(in srgb, ${({ $iconColor }) => $iconColor} 14%, transparent);
  }

  &:focus-visible {
    outline: 2px solid ${({ $iconColor }) => $iconColor};
    outline-offset: 2px;
  }
`;

/**
 * Геометрия Alert по Size.
 * @param size - Размер
 */
export const getAlertGeometry = (
  size: Size,
): { padding: string; gap: string; fontSize: string; titleFontSize: string } => {
  switch (size) {
    case Size.XS:
      return { padding: '8px 10px', gap: '8px', fontSize: '12px', titleFontSize: '12px' };
    case Size.SM:
      return { padding: '10px 12px', gap: '10px', fontSize: '13px', titleFontSize: '13px' };
    case Size.LG:
      return { padding: '14px 16px', gap: '12px', fontSize: '15px', titleFontSize: '16px' };
    case Size.XL:
      return { padding: '16px 18px', gap: '14px', fontSize: '16px', titleFontSize: '17px' };
    case Size.MD:
    default:
      return { padding: '12px 14px', gap: '12px', fontSize: '14px', titleFontSize: '14px' };
  }
};
