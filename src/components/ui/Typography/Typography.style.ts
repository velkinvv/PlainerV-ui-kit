import styled, { css } from 'styled-components';

/**
 * StyledTypography
 */
export const StyledTypography = styled.div<{
  $variant?: string;
  $color?: string;
  $align?: string;
  $fontWeight?: string;
  $fontSize?: string;
  $lineHeight?: string;
  $fontFamily?: string;
  $textTransform?: string;
  $textDecoration?: string;
  $letterSpacing?: string;
  $wordSpacing?: string;
  $responsive?: boolean;
  $animate?: boolean;
  $noWrap?: boolean;
}>`
  /* Базовые стили из темы */
  ${({ theme, $variant }) => {
    if ($variant === 'inherit') return '';

    const typographyStyle = theme.typography[$variant as keyof typeof theme.typography];
    if (!typographyStyle) return '';

    return css`
      font-family: ${typographyStyle.fontFamily};
      font-size: ${typographyStyle.fontSize};
      font-weight: ${typographyStyle.fontWeight};
      line-height: ${typographyStyle.lineHeight};
    `;
  }}

  /* Цвет текста */
  color: ${({ theme, $color }) => {
    if ($color) {
      return theme.colors[$color as keyof typeof theme.colors] || $color;
    }
    return theme.colors.text;
  }};

  /* Выравнивание текста */
  text-align: ${({ $align }) => $align || 'left'};

  /* Дополнительные стили */
  margin: 0;
  padding: 0;

  /* Кастомные стили */
  ${({ theme, $fontWeight }) =>
    $fontWeight &&
    css`
      font-weight: ${theme.fontWeights[$fontWeight as keyof typeof theme.fontWeights]};
    `}

  ${({ theme, $fontSize }) =>
    $fontSize &&
    css`
      font-size: ${theme.fontSizes[$fontSize as keyof typeof theme.fontSizes]};
    `}

  ${({ theme, $lineHeight }) =>
    $lineHeight &&
    css`
      line-height: ${theme.lineHeights[$lineHeight as keyof typeof theme.lineHeights]};
    `}

  ${({ theme, $fontFamily }) =>
    $fontFamily &&
    css`
      font-family: ${theme.fonts[$fontFamily as keyof typeof theme.fonts]};
    `}

  /* Дополнительные стили */
  ${({ $textTransform }) =>
    $textTransform &&
    css`
      text-transform: ${$textTransform};
    `}

  ${({ $textDecoration }) =>
    $textDecoration &&
    css`
      text-decoration: ${$textDecoration};
    `}

  ${({ $letterSpacing }) =>
    $letterSpacing &&
    css`
      letter-spacing: ${$letterSpacing};
    `}

  ${({ $wordSpacing }) =>
    $wordSpacing &&
    css`
      word-spacing: ${$wordSpacing};
    `}

  /* Адаптивные стили */
  ${({ theme, $responsive }) => {
    if (!$responsive) return '';

    return css`
      @media (max-width: 768px) {
        font-size: ${theme.fontSizes.sm};
        line-height: ${theme.lineHeights.normal};
      }
    `;
  }}

  /* Анимации */
  ${({ $animate }) =>
    $animate &&
    css`
      transition: all 0.3s ease;
      &:hover {
        transform: translateY(-2px);
      }
    `}

  /* Без переноса строк */
  ${({ $noWrap }) =>
    $noWrap &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`;
