import React, { forwardRef, useMemo } from 'react';
import { clsx } from 'clsx';
import type { TableCellProps } from '@/types/ui';
import { TableCellBase } from './Table.style';
import { resolveTableCellVariant, useTableRootContext, useTableSection } from './TableContext';

/**
 * ╨п╤З╨╡╨╣╨║╨░ `th` / `td`.
 * @param props.align - ╨Т╤Л╤А╨░╨▓╨╜╨╕╨▓╨░╨╜╨╕╨╡ ╤Б╨╛╨┤╨╡╤А╨╢╨╕╨╝╨╛╨│╨╛
 * @param props.component - ╨п╨▓╨╜╤Л╨╣ ╤В╨╡╨│ (`th`, `td`, тАж)
 * @param props.variant - `head` ╤А╨╡╨╜╨┤╨╡╤А╨╕╤В `th` ╨┐╨╛ ╤Г╨╝╨╛╨╗╤З╨░╨╜╨╕╤О; ╨╕╨╜╨░╤З╨╡ ╨╜╨░╤Б╨╗╨╡╨┤╤Г╨╡╤В ╤Б╨╡╨║╤Ж╨╕╤О (`thead` тЖТ `th`)
 * @param props.padding - ╨Ю╤В╤Б╤В╤Г╨┐╤Л (`checkbox` тАФ ╤Г╨╖╨║╨░╤П ╨║╨╛╨╗╨╛╨╜╨║╨░ ╨▓╤Л╨▒╨╛╤А╨░)
 * @param props.activeColumn - ╨г╤Б╨╕╨╗╨╡╨╜╨╜╨░╤П ╨╜╨╕╨╢╨╜╤П╤П ╨│╤А╨░╨╜╨╕╤Ж╨░ ╤Г ╨╖╨░╨│╨╛╨╗╨╛╨▓╨║╨░ ╨░╨║╤В╨╕╨▓╨╜╨╛╨╣ ╨║╨╛╨╗╨╛╨╜╨║╨╕ ╤Б╨╛╤А╤В╨╕╤А╨╛╨▓╨║╨╕
 */
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      align = 'inherit',
      component,
      variant: variantProp,
      padding = 'normal',
      activeColumn = false,
      className,
      children,
      style,
      colSpan,
      rowSpan,
      scope,
      ...rest
    },
    ref,
  ) => {
    const section = useTableSection();
    const { size } = useTableRootContext();
    const resolvedVariant = useMemo(
      () => resolveTableCellVariant(section, variantProp),
      [section, variantProp],
    );
    const isHead = resolvedVariant === 'head';
    const Comp = useMemo(() => {
      if (component) {
        return component;
      }
      return isHead ? 'th' : 'td';
    }, [component, isHead]);

    return (
      <TableCellBase
        ref={ref}
        as={Comp}
        className={clsx(className)}
        style={style}
        scope={isHead ? (scope ?? (colSpan == null || colSpan === 1 ? 'col' : undefined)) : scope}
        colSpan={colSpan}
        rowSpan={rowSpan}
        $align={align}
        $padding={padding}
        $isHead={isHead}
        $size={size}
        $activeSortColumn={isHead ? activeColumn : false}
        {...rest}
      >
        {children}
      </TableCellBase>
    );
  },
);

TableCell.displayName = 'TableCell';
