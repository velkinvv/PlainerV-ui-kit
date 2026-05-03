import React, { forwardRef, useMemo } from 'react';
import { clsx } from 'clsx';
import type { TableSortLabelProps } from '@/types/ui';
import { TableSortChevronIcon } from './TableSortChevronIcon';
import { TableSortLabelButton, TableSortLabelInner, TableSortLabelTextClamp } from './Table.style';
import { normalizeTableHeaderMaxLines } from './tableHeaderClampHandlers';

/**
 * ╨Я╨╛╨┤╨┐╨╕╤Б╤М ╤Б╨╛╤А╤В╨╕╤А╤Г╨╡╨╝╨╛╨╣ ╨║╨╛╨╗╨╛╨╜╨║╨╕: ╤В╨╡╨║╤Б╤В + ╨╕╨║╨╛╨╜╨║╨░ ╨╜╨░╨┐╤А╨░╨▓╨╗╨╡╨╜╨╕╤П.
 * @param props.active - ╨Ъ╨╛╨╗╨╛╨╜╨║╨░ ╤Б╨╡╨╣╤З╨░╤Б ╤Б╨╛╤А╤В╨╕╤А╤Г╨╡╤В╤Б╤П
 * @param props.direction - `asc` | `desc` | `false` (╨╜╨╡╤В ╨╜╨░╨┐╤А╨░╨▓╨╗╨╡╨╜╨╕╤П ╨┐╤А╨╕ ╨░╨║╤В╨╕╨▓╨╜╨╛╨╣ ╨║╨╛╨╗╨╛╨╜╨║╨╡)
 * @param props.hideSortIcon - Скрыть шевроны
 * @param props.disabled - Отключить кнопку
 * @param props.onClick - Переключение сортировки снаружи
 * @param props.sortPriority - При мульти-сортировке: порядковый номер (1…n) рядом с иконкой
 * @param props.children - Текст заголовка колонки
 * @param props.maxLines - Максимум строк у текста рядом с иконкой сортировки
 */
export const TableSortLabel = forwardRef<HTMLButtonElement, TableSortLabelProps>(
  (
    {
      active = false,
      direction = false,
      hideSortIcon = false,
      disabled = false,
      sortPriority,
      maxLines,
      className,
      children,
      style,
      ...rest
    },
    ref,
  ) => {
    const clampLineCount = useMemo(() => normalizeTableHeaderMaxLines(maxLines), [maxLines]);
    const useHeaderLineClamp = clampLineCount != null;

    return (
      <TableSortLabelButton
        ref={ref}
        className={clsx(className)}
        style={style}
        disabled={disabled}
        $disabled={disabled}
        $headerClampLayout={useHeaderLineClamp}
        {...rest}
        type="button"
        aria-sort={
          active ? (direction === 'desc' ? 'descending' : direction === 'asc' ? 'ascending' : 'none') : undefined
        }
      >
        {useHeaderLineClamp ? (
          <>
            <TableSortLabelTextClamp $maxLines={clampLineCount}>{children}</TableSortLabelTextClamp>
            {!hideSortIcon ? (
              <TableSortChevronIcon
                active={active}
                direction={direction}
                dockStart
                sortPriority={sortPriority}
              />
            ) : null}
          </>
        ) : (
          <TableSortLabelInner>
            {children}
            {!hideSortIcon ? (
              <TableSortChevronIcon active={active} direction={direction} sortPriority={sortPriority} />
            ) : null}
          </TableSortLabelInner>
        )}
      </TableSortLabelButton>
    );
  },
);

TableSortLabel.displayName = 'TableSortLabel';
