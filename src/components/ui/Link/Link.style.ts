import styled, { css } from 'styled-components';
import { TransitionHandler } from '../../../handlers/uiHandlers';

/**
 * Текстовая ссылка (`<a>`).
 * @property $variant - Визуальный вариант: `default` | `line` | `muted`
 */
export const StyledTextLink = styled.a<{ $variant?: 'default' | 'line' | 'muted' }>`
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  transition: ${TransitionHandler()};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: 2px;
  }

  ${({ theme, $variant = 'default' }) => {
    if ($variant === 'muted') {
      return css`
        color: ${theme.colors.textSecondary};

        &:hover {
          color: ${theme.colors.primary};
          text-decoration: underline;
        }
      `;
    }
    if ($variant === 'line') {
      return css`
        color: ${theme.colors.primary};
        text-decoration: underline;

        &:hover {
          color: ${theme.colors.primaryHover};
        }
      `;
    }
    return css`
      color: ${theme.colors.primary};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    `;
  }}
`;
