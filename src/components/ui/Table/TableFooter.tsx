import React, { forwardRef } from 'react';
import type { TableFooterProps } from '@/types/ui';
import { StyledTfoot } from './Table.style';
import { TableSectionProvider } from './TableContext';

/**
 * Секция подвала (`tfoot`), например «Загрузить ещё».
 * @param props.children - Строки подвала
 */
export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, children, style, ...rest }, ref) => {
    return (
      <TableSectionProvider section="footer">
        <StyledTfoot ref={ref} className={className} style={style} {...rest}>
          {children}
        </StyledTfoot>
      </TableSectionProvider>
    );
  },
);

TableFooter.displayName = 'TableFooter';
