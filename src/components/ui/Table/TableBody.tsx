import React, { forwardRef } from 'react';
import type { TableBodyProps } from '@/types/ui';
import { StyledTbody } from './Table.style';
import { TableSectionProvider } from './TableContext';

/**
 * Секция тела (`tbody`).
 * @param props.children - Строки данных
 */
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, style, ...rest }, ref) => {
    return (
      <TableSectionProvider section="body">
        <StyledTbody ref={ref} className={className} style={style} {...rest}>
          {children}
        </StyledTbody>
      </TableSectionProvider>
    );
  },
);

TableBody.displayName = 'TableBody';
