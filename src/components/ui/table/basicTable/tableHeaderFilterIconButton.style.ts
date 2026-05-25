import styled, { css } from 'styled-components';
import { createStyledShouldForwardProp } from '@/handlers/styledComponentHandlers';
import { tableBorderRadiusFromCssVar } from './tableThemeRadiusHandlers';

/**
 * Кнопка-иконка фильтра в заголовке таблицы / грида.
 * При `$filterApplied` — цвет иконки `theme.colors.info` (залитая воронка через `IconExFilterFilled`), без фона-кружка.
 */
export const TableHeaderFilterIconButton = styled.button.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
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
  border-radius: ${({ theme }) => tableBorderRadiusFromCssVar(theme)};
  box-sizing: border-box;
  background: transparent;
  cursor: pointer;
  color: inherit;

  ${({ theme, $filterApplied }) =>
    $filterApplied &&
    css`
      color: ${theme.colors.info};

      &:hover {
        color: ${theme.colors.infoHover};
      }
    `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
