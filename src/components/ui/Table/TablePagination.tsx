import React, { useCallback, useMemo } from 'react';
import { clsx } from 'clsx';
import type { TablePaginationProps } from '@/types/ui';
import { Size } from '@/types/sizes';
import { Pagination } from '../Pagination/Pagination';
import { clampTablePageZeroBased, getTableTotalPages } from './handlers';
import { TablePaginationRoot, TablePaginationRow, TablePaginationRowsSelect, TablePaginationSelect } from './Table.style';

/**
 * Пагинация в духе MUI: `page` с нуля, `count` всего записей, опционально выбор `rowsPerPage`.
 * Внутри используется `Pagination` (1-based страницы).
 * @param props.count - Всего элементов
 * @param props.page - Текущая страница с нуля
 * @param props.rowsPerPage - Размер страницы
 * @param props.onPageChange - `(event, nextPageZeroBased)`
 * @param props.rowsPerPageOptions - Если задано — показывается нативный select
 * @param props.size - Размер плашки номеров страниц
 */
export const TablePagination: React.FC<TablePaginationProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  siblingCount = 1,
  rowsPerPageOptions,
  onRowsPerPageChange,
  labelRowsPerPage = 'Строк на странице:',
  disabled = false,
  size = Size.MD,
  className,
  style,
}) => {
  const totalPages = useMemo(() => getTableTotalPages(count, rowsPerPage), [count, rowsPerPage]);
  const safePageZero = useMemo(() => clampTablePageZeroBased(page, totalPages), [page, totalPages]);
  const pageOneBased = safePageZero + 1;

  const handlePaginationChange = useCallback(
    (nextOneBased: number) => {
      onPageChange?.(null, nextOneBased - 1);
    },
    [onPageChange],
  );

  return (
    <TablePaginationRoot className={clsx(className)} style={style}>
      <TablePaginationRow>
        {rowsPerPageOptions?.length ? (
          <TablePaginationRowsSelect>
            <span>{labelRowsPerPage}</span>
            <TablePaginationSelect
              value={rowsPerPage}
              disabled={disabled}
              onChange={e => {
                onRowsPerPageChange?.(e);
              }}
              aria-label={typeof labelRowsPerPage === 'string' ? labelRowsPerPage : 'Строк на странице'}
            >
              {rowsPerPageOptions.map(n => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </TablePaginationSelect>
          </TablePaginationRowsSelect>
        ) : null}

        <Pagination
          totalPages={totalPages}
          page={pageOneBased}
          onPageChange={handlePaginationChange}
          siblingCount={siblingCount}
          disabled={disabled}
          size={size}
          aria-label="Пагинация таблицы"
        />
      </TablePaginationRow>
    </TablePaginationRoot>
  );
};

TablePagination.displayName = 'TablePagination';
