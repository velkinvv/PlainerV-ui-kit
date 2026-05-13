import styled, { css } from 'styled-components';

/** Номер приоритета при мульти-сортировке (рядом с шевронами). */
export const TableSortLabelPriority = styled.span`
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  min-width: 10px;
  text-align: center;
  color: inherit;
  opacity: 0.75;
  user-select: none;
`;

/** Шевроны + опциональный индекс сортировки в одну горизонтальную группу. */
export const TableSortChevronMetaRow = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== '$dockStart',
})<{ $dockStart?: boolean }>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;

  ${({ $dockStart }) =>
    $dockStart &&
    css`
      align-self: flex-start;
      margin-top: 2px;
    `}
`;
