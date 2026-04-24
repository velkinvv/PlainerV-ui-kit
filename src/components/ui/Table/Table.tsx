import React, { forwardRef, useMemo } from 'react';
import type { TableProps } from '@/types/ui';
import { StyledTable } from './Table.style';
import { TableRootProvider } from './TableContext';

/**
 * Корневая `<table>` с контекстом размера и зебры для строк.
 * @param props.stickyHeader - Фиксированная шапка при вертикальном скролле родителя
 * @param props.size - Плотность ячеек (`sm` | `md`)
 * @param props.striped - Зебра по строкам в `tbody`
 * @param props.className - CSS-класс
 * @param props.children - Секции `TableHead`, `TableBody`, …
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    { stickyHeader = false, size = 'md', striped = false, className, children, style, ...rest },
    ref,
  ) => {
    const ctx = useMemo(() => ({ size, striped, stickyHeader }), [size, striped, stickyHeader]);

    return (
      <TableRootProvider value={ctx}>
        <StyledTable
          ref={ref}
          className={className}
          style={style}
          $stickyHeader={stickyHeader}
          $striped={striped}
          {...rest}
        >
          {children}
        </StyledTable>
      </TableRootProvider>
    );
  },
);

Table.displayName = 'Table';
