import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { TableRowProps } from '@/types/ui';
import { StyledTr } from './Table.style';
import { useTableSection } from './TableContext';

/**
 * ╨б╤В╤А╨╛╨║╨░ ╤В╨░╨▒╨╗╨╕╤Ж╤Л (`tr`).
 * @param props.selected - ╨Т╤Л╨▒╤А╨░╨╜╨╜╨░╤П ╤Б╤В╤А╨╛╨║╨░ (╤Д╨╛╨╜ ╨┐╨╛ ╨╝╨░╨║╨╡╤В╤Г)
 * @param props.hover — подсветка при наведении (по умолчанию true для `tbody`)
 * @param props.disabled — строка неактивна (пониженная непрозрачность)
 * @param props.dragging — строка перетаскивается (источник DnD)
 */
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    {
      selected = false,
      hover,
      disabled = false,
      dragging = false,
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
        $dragging={dragging && isBody}
        $hoverable={hoverable && !disabled && !(dragging && isBody)}
        data-selected={selected ? 'true' : undefined}
        data-disabled={disabled ? 'true' : undefined}
        data-dragging={dragging && isBody ? 'true' : undefined}
        onClick={disabled ? undefined : onClick}
        {...rest}
      >
        {children}
      </StyledTr>
    );
  },
);

TableRow.displayName = 'TableRow';
