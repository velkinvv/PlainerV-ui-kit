import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { TableRowProps } from '@/types/ui';
import { StyledTr } from './Table.style';
import { useTableSection } from './TableContext';

/**
 * Строка таблицы (`tr`).
 * @param props.selected - Выбранная строка (фон по макету)
 * @param props.hover - Подсветка при наведении (по умолчанию `true` для `tbody`)
 * @param props.disabled - Строка неактивна (сниженная непрозрачность)
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
