import styled from 'styled-components';
import { BorderRadiusHandler, TransitionHandler } from '@/handlers/uiHandlers';

/**
 * Обёртка переключателя тем.
 */
export const ThemeSelectorRoot = styled.label`
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  font-family: inherit;
`;

/**
 * Подпись поля.
 */
export const ThemeSelectorLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes?.xs ?? '12px'};
  line-height: ${({ theme }) => theme.lineHeights?.tight ?? 1.2};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/**
 * Нативный select со стилями UI-kit.
 */
export const ThemeSelectorControl = styled.select`
  min-width: 160px;
  padding: 8px 32px 8px 12px;
  border-radius: ${({ theme }) => BorderRadiusHandler(theme?.borderRadius ?? theme.globalSize)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes?.sm ?? '14px'};
  line-height: ${({ theme }) => theme.lineHeights?.normal ?? 1.4};
  cursor: pointer;
  transition: ${TransitionHandler('border-color', 0.2)};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
