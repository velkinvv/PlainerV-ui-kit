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
 * Подпись сортируемой колонки: текст + иконка направления.
 * @param props.active - Колонка сейчас сортируется
 * @param props.direction - `asc` | `desc` | `false` (нет направления при активной колонке)
 * @param props.hideSortIcon - Скрыть шевроны
 * @param props.disabled - Отключить кнопку
 * @param props.onClick - Обработчик клика (переключение сортировки снаружи)
 * @param props.children - Текст заголовка колонки
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
