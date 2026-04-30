import React, { forwardRef, useMemo } from 'react';
import type { TableProps } from '@/types/ui';
import { StyledTable } from './Table.style';
import { TableRootProvider } from './TableContext';

/**
 * ╨Ъ╨╛╤А╨╜╨╡╨▓╨░╤П `<table>` ╤Б ╨║╨╛╨╜╤В╨╡╨║╤Б╤В╨╛╨╝ ╤А╨░╨╖╨╝╨╡╤А╨░ ╨╕ ╨╖╨╡╨▒╤А╤Л ╨┤╨╗╤П ╤Б╤В╤А╨╛╨║.
 * @param props.stickyHeader - ╨д╨╕╨║╤Б╨╕╤А╨╛╨▓╨░╨╜╨╜╨░╤П ╤И╨░╨┐╨║╨░ ╨┐╤А╨╕ ╨▓╨╡╤А╤В╨╕╨║╨░╨╗╤М╨╜╨╛╨╝ ╤Б╨║╤А╨╛╨╗╨╗╨╡ ╤А╨╛╨┤╨╕╤В╨╡╨╗╤П
 * @param props.size - ╨Я╨╗╨╛╤В╨╜╨╛╤Б╤В╤М ╤П╤З╨╡╨╡╨║ (`sm` | `md`)
 * @param props.striped - ╨Ч╨╡╨▒╤А╨░ ╨┐╨╛ ╤Б╤В╤А╨╛╨║╨░╨╝ ╨▓ `tbody`
 * @param props.className - CSS-╨║╨╗╨░╤Б╤Б
 * @param props.children - ╨б╨╡╨║╤Ж╨╕╨╕ `TableHead`, `TableBody`, тАж
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
