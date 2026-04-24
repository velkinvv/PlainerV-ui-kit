import React, { forwardRef } from 'react';
import type { TableHeadProps } from '@/types/ui';
import { StyledThead } from './Table.style';
import { TableSectionProvider } from './TableContext';

/**
 * Секция заголовка (`thead`).
 * @param props.children - Строки с ячейками-заголовками
 */
export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className, children, style, ...rest }, ref) => {
    return (
      <TableSectionProvider section="head">
        <StyledThead ref={ref} className={className} style={style} {...rest}>
          {children}
        </StyledThead>
      </TableSectionProvider>
    );
  },
);

TableHead.displayName = 'TableHead';
