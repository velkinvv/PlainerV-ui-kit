import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { TableRowProps } from '@/types/ui';
import { StyledTr } from './Table.style';
import { useTableSection } from './TableContext';

/**
 * ╨б╤В╤А╨╛╨║╨░ ╤В╨░╨▒╨╗╨╕╤Ж╤Л (`tr`).
 * @param props.selected - ╨Т╤Л╨▒╤А╨░╨╜╨╜╨░╤П ╤Б╤В╤А╨╛╨║╨░ (╤Д╨╛╨╜ ╨┐╨╛ ╨╝╨░╨║╨╡╤В╤Г)
 * @param props.hover - ╨Я╨╛╨┤╤Б╨▓╨╡╤В╨║╨░ ╨┐╤А╨╕ ╨╜╨░╨▓╨╡╨┤╨╡╨╜╨╕╨╕ (╨┐╨╛ ╤Г╨╝╨╛╨╗╤З╨░╨╜╨╕╤О `true` ╨┤╨╗╤П `tbody`)
 * @param props.disabled - ╨б╤В╤А╨╛╨║╨░ ╨╜╨╡╨░╨║╤В╨╕╨▓╨╜╨░ (╤Б╨╜╨╕╨╢╨╡╨╜╨╜╨░╤П ╨╜╨╡╨┐╤А╨╛╨╖╤А╨░╤З╨╜╨╛╤Б╤В╤М)
 */
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    {
      selected = false,
      hover,
      disabled = false,
      className,
      children,
      style,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const section = useTableSection();
    const isBody = section === 'body';
    const hoverable = hover ?? isBody;

    return (
      <StyledTr
        ref={ref}
        className={clsx(className)}
        style={style}
        $section={section}
        $selected={selected}
        $disabled={disabled}
        $hoverable={hoverable && !disabled}
        data-selected={selected ? 'true' : undefined}
        data-disabled={disabled ? 'true' : undefined}
        onClick={disabled ? undefined : onClick}
        {...rest}
      >
        {children}
      </StyledTr>
    );
  },
);

TableRow.displayName = 'TableRow';
