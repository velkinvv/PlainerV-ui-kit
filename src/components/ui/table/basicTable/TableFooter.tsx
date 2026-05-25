import React, { forwardRef } from 'react';
import type { TableFooterProps } from '@/types/ui';
import { StyledTfoot } from './Table.style';
import { TableSectionProvider } from './TableContext';
import { useResolvedTableSurfaceBackgrounds } from './tableSurfaceBackgroundHooks';

/**
 * ╨б╨╡╨║╤Ж╨╕╤П ╨┐╨╛╨┤╨▓╨░╨╗╨░ (`tfoot`), ╨╜╨░╨┐╤А╨╕╨╝╨╡╤А ┬л╨Ч╨░╨│╤А╤Г╨╖╨╕╤В╤М ╨╡╤Й╤С┬╗.
 * @param props.children - ╨б╤В╤А╨╛╨║╨╕ ╨┐╨╛╨┤╨▓╨░╨╗╨░
 */
export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, children, style, ...rest }, ref) => {
    const resolvedSurfaces = useResolvedTableSurfaceBackgrounds();

    return (
      <TableSectionProvider section="footer">
        <StyledTfoot
          ref={ref}
          className={className}
          style={style}
          $surfaces={resolvedSurfaces}
          {...rest}
        >
          {children}
        </StyledTfoot>
      </TableSectionProvider>
    );
  },
);

TableFooter.displayName = 'TableFooter';
