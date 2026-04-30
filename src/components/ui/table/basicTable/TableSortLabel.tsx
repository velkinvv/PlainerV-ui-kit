import React, { forwardRef, useMemo } from 'react';
import { clsx } from 'clsx';
import type { TableSortLabelProps } from '@/types/ui';
import { getSortChevronTones } from './handlers';
import {
  SortChevronDown,
  SortChevronStack,
  SortChevronUp,
  TableSortLabelButton,
  TableSortLabelInner,
} from './Table.style';

/**
 * ╨Я╨╛╨┤╨┐╨╕╤Б╤М ╤Б╨╛╤А╤В╨╕╤А╤Г╨╡╨╝╨╛╨╣ ╨║╨╛╨╗╨╛╨╜╨║╨╕: ╤В╨╡╨║╤Б╤В + ╨╕╨║╨╛╨╜╨║╨░ ╨╜╨░╨┐╤А╨░╨▓╨╗╨╡╨╜╨╕╤П.
 * @param props.active - ╨Ъ╨╛╨╗╨╛╨╜╨║╨░ ╤Б╨╡╨╣╤З╨░╤Б ╤Б╨╛╤А╤В╨╕╤А╤Г╨╡╤В╤Б╤П
 * @param props.direction - `asc` | `desc` | `false` (╨╜╨╡╤В ╨╜╨░╨┐╤А╨░╨▓╨╗╨╡╨╜╨╕╤П ╨┐╤А╨╕ ╨░╨║╤В╨╕╨▓╨╜╨╛╨╣ ╨║╨╛╨╗╨╛╨╜╨║╨╡)
 * @param props.hideSortIcon - ╨б╨║╤А╤Л╤В╤М ╤И╨╡╨▓╤А╨╛╨╜╤Л
 * @param props.disabled - ╨Ю╤В╨║╨╗╤О╤З╨╕╤В╤М ╨║╨╜╨╛╨┐╨║╤Г
 * @param props.onClick - ╨Ю╨▒╤А╨░╨▒╨╛╤В╤З╨╕╨║ ╨║╨╗╨╕╨║╨░ (╨┐╨╡╤А╨╡╨║╨╗╤О╤З╨╡╨╜╨╕╨╡ ╤Б╨╛╤А╤В╨╕╤А╨╛╨▓╨║╨╕ ╤Б╨╜╨░╤А╤Г╨╢╨╕)
 * @param props.children - ╨в╨╡╨║╤Б╤В ╨╖╨░╨│╨╛╨╗╨╛╨▓╨║╨░ ╨║╨╛╨╗╨╛╨╜╨║╨╕
 */
export const TableSortLabel = forwardRef<HTMLButtonElement, TableSortLabelProps>(
  (
    {
      active = false,
      direction = false,
      hideSortIcon = false,
      disabled = false,
      className,
      children,
      style,
      ...rest
    },
    ref,
  ) => {
    const tones = useMemo(() => getSortChevronTones(active, direction), [active, direction]);

    return (
      <TableSortLabelButton
        ref={ref}
        className={clsx(className)}
        style={style}
        disabled={disabled}
        $disabled={disabled}
        {...rest}
        type="button"
        aria-sort={
          active ? (direction === 'desc' ? 'descending' : direction === 'asc' ? 'ascending' : 'none') : undefined
        }
      >
        <TableSortLabelInner>
          {children}
          {!hideSortIcon ? (
            <SortChevronStack aria-hidden>
              <SortChevronUp $tone={tones.up} />
              <SortChevronDown $tone={tones.down} />
            </SortChevronStack>
          ) : null}
        </TableSortLabelInner>
      </TableSortLabelButton>
    );
  },
);

TableSortLabel.displayName = 'TableSortLabel';
