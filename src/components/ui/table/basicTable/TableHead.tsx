import React, { forwardRef } from 'react';
import type { TableHeadProps } from '@/types/ui';
import { StyledThead } from './Table.style';
import { TableSectionProvider } from './TableContext';
import { useTableContainerAppearance } from './TableContainerAppearanceContext';
import { useResolvedTableSurfaceBackgrounds } from './tableSurfaceBackgroundHooks';

/**
 * ╨б╨╡╨║╤Ж╨╕╤П ╨╖╨░╨│╨╛╨╗╨╛╨▓╨║╨░ (`thead`).
 * @param props.children - ╨б╤В╤А╨╛╨║╨╕ ╤Б ╤П╤З╨╡╨╣╨║╨░╨╝╨╕-╨╖╨░╨│╨╛╨╗╨╛╨▓╨║╨░╨╝╨╕
 */
export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className, children, style, ...rest }, ref) => {
    const resolvedSurfaces = useResolvedTableSurfaceBackgrounds();
    const { shellVariant } = useTableContainerAppearance();

    return (
      <TableSectionProvider section="head">
        <StyledThead
          ref={ref}
          className={className}
          style={style}
          $surfaces={resolvedSurfaces}
          $shellVariant={shellVariant}
          {...rest}
        >
          {children}
        </StyledThead>
      </TableSectionProvider>
    );
  },
);

TableHead.displayName = 'TableHead';
