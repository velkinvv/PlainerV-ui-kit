import styled, { css } from 'styled-components';
import { ButtonVariant } from '@/types/ui';
import { getButtonVariant } from '@/handlers/buttonThemeHandlers';
import { tableBorderRadiusFromTheme } from './tableThemeRadiusHandlers';

/**
 * Кнопка-иконка фильтра в заголовке таблицы / грида.
 * При `$filterApplied` — заливка `theme.colors.info` и контрастный цвет иконки (как у текста primary-кнопки).
 */
export const TableHeaderFilterIconButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== '$filterApplied',
})<{ $filterApplied?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  align-self: center;
  margin: 0;
  padding: 2px;
  min-width: 24px;
  min-height: 24px;
  border: 0;
  border-radius: ${({ theme }) => tableBorderRadiusFromTheme(theme)};
  box-sizing: border-box;
  background: transparent;
  cursor: pointer;
  color: inherit;

  ${({ theme, $filterApplied }) =>
    $filterApplied &&
    css`
      background: ${theme.colors.info};
      color: ${getButtonVariant(theme.buttons, ButtonVariant.PRIMARY).color};

      &:hover {
        background: ${theme.colors.infoHover};
        color: ${getButtonVariant(theme.buttons, ButtonVariant.PRIMARY).hover?.color ??
        getButtonVariant(theme.buttons, ButtonVariant.PRIMARY).color};
      }
    `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
