import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import type { TablePaginationProps } from '@/types/ui';
import { Size } from '@/types/sizes';
import { Pagination } from '../../Pagination/Pagination';
import { clampTablePageZeroBased, getTableTotalPages, parseTablePageJumpInput } from './handlers';
import {
  TablePaginationRoot,
  TablePaginationRow,
  TablePaginationRowsSelect,
  TablePaginationSelect,
  TablePaginationPageJump,
  TablePaginationPageJumpInput,
} from './Table.style';

/**
 * Пагинация в духе MUI: `page` с нуля, `count` всего записей, опционально выбор `rowsPerPage`.
 * Внутри используется `Pagination` (1-based страницы).
 * @param props.count - Всего элементов
 * @param props.page - Текущая страница с нуля
 * @param props.rowsPerPage - Размер страницы
 * @param props.onPageChange - `(event, nextPageZeroBased)` при смене страницы
 * @param props.rowsPerPageOptions - Непустой список — источник опций селекта (показ селекта ещё зависит от `showRowsPerPageSelect`)
 * @param props.showRowsPerPageSelect - Явно скрыть селект: `false`
 * @param props.rowsPerPageSelectVariant - `compact` — короткая подпись и компактный селект
 * @param props.paginationVariant - `compact` у плашки страниц — только стрелки и текущая страница
 * @param props.paginationToolbarAlign - Выравнивание селекта и плашки страниц в строке (`left` | `center` | `right`, по умолчанию `right`)
 * @param props.paginationToolbarReverse - Зеркальный порядок блоков в строке (`row-reverse`; выравнивание по краю сохраняется)
 * @param props.showPageJump - Поле ввода номера страницы слева от `Pagination` в порядке DOM; при реверсе визуально справа от плашки
 * @param props.labelPageJump - Подпись перед полем (по умолчанию «Страница:»)
 * @param props.size - Размер плашки номеров страниц
 */
export const TablePagination: React.FC<TablePaginationProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  siblingCount = 1,
  rowsPerPageOptions,
  showRowsPerPageSelect,
  rowsPerPageSelectVariant = 'default',
  onRowsPerPageChange,
  labelRowsPerPage,
  paginationVariant = 'default',
  paginationToolbarAlign = 'right',
  paginationToolbarReverse = false,
  showPageJump,
  labelPageJump,
  disabled = false,
  size = Size.MD,
  className,
  style,
}) => {
  const totalPages = useMemo(() => getTableTotalPages(count, rowsPerPage), [count, rowsPerPage]);
  const safePageZero = useMemo(() => clampTablePageZeroBased(page, totalPages), [page, totalPages]);
  const pageOneBased = safePageZero + 1;

  const hasRowsPerPageOptions = Boolean(rowsPerPageOptions?.length);
  /** Селект размера страницы: по умолчанию показываем при непустых опциях; `showRowsPerPageSelect={false}` — всегда скрыть */
  const shouldShowRowsPerPageSelect = hasRowsPerPageOptions && showRowsPerPageSelect !== false;

  const resolvedRowsPerPageLabel = useMemo(() => {
    if (labelRowsPerPage !== undefined && labelRowsPerPage !== null) {
      return labelRowsPerPage;
    }
    return rowsPerPageSelectVariant === 'compact' ? 'На стр.:' : 'Строк на странице:';
  }, [labelRowsPerPage, rowsPerPageSelectVariant]);

  const rowsSelectAriaLabel = useMemo(() => {
    if (typeof resolvedRowsPerPageLabel === 'string') {
      return resolvedRowsPerPageLabel;
    }
    return rowsPerPageSelectVariant === 'compact' ? 'Число строк на странице' : 'Строк на странице';
  }, [resolvedRowsPerPageLabel, rowsPerPageSelectVariant]);

  const isRowsSelectCompact = rowsPerPageSelectVariant === 'compact';

  const resolvedLabelPageJump = labelPageJump ?? 'Страница:';
  const shouldShowPageJump = showPageJump !== false && totalPages > 1;

  const [jumpDraft, setJumpDraft] = useState(() => String(pageOneBased));

  useEffect(() => {
    setJumpDraft(String(safePageZero + 1));
  }, [safePageZero]);

  const handlePaginationChange = useCallback(
    (nextOneBased: number) => {
      onPageChange?.(null, nextOneBased - 1);
    },
    [onPageChange],
  );

  const applyJumpDraft = useCallback(() => {
    const nextZeroBased = parseTablePageJumpInput(jumpDraft, totalPages);
    if (nextZeroBased === null) {
      setJumpDraft(String(pageOneBased));
      return;
    }
    if (nextZeroBased !== safePageZero) {
      onPageChange?.(null, nextZeroBased);
    }
  }, [jumpDraft, totalPages, safePageZero, onPageChange, pageOneBased]);

  const handleJumpKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        applyJumpDraft();
      }
    },
    [applyJumpDraft],
  );

  return (
    <TablePaginationRoot className={clsx(className)} style={style}>
      <TablePaginationRow
        $toolbarAlign={paginationToolbarAlign}
        $toolbarReverse={paginationToolbarReverse}
      >
        {shouldShowRowsPerPageSelect && rowsPerPageOptions?.length ? (
          <TablePaginationRowsSelect $compact={isRowsSelectCompact}>
            <span>{resolvedRowsPerPageLabel}</span>
            <TablePaginationSelect
              $compact={isRowsSelectCompact}
              value={rowsPerPage}
              disabled={disabled}
              onChange={event => {
                onRowsPerPageChange?.(event);
              }}
              aria-label={rowsSelectAriaLabel}
            >
              {rowsPerPageOptions.map(optionSize => (
                <option key={optionSize} value={optionSize}>
                  {optionSize}
                </option>
              ))}
            </TablePaginationSelect>
          </TablePaginationRowsSelect>
        ) : null}

        {shouldShowPageJump ? (
          <TablePaginationPageJump>
            <span>{resolvedLabelPageJump}</span>
            <TablePaginationPageJumpInput
              type="text"
              inputMode="numeric"
              autoComplete="off"
              disabled={disabled}
              value={jumpDraft}
              onChange={event => {
                setJumpDraft(event.target.value);
              }}
              onBlur={() => {
                applyJumpDraft();
              }}
              onKeyDown={handleJumpKeyDown}
              aria-label={
                typeof resolvedLabelPageJump === 'string'
                  ? `${resolvedLabelPageJump} номер от 1 до ${totalPages}`
                  : 'Номер страницы'
              }
            />
          </TablePaginationPageJump>
        ) : null}

        <Pagination
          totalPages={totalPages}
          page={pageOneBased}
          onPageChange={handlePaginationChange}
          siblingCount={siblingCount}
          disabled={disabled}
          size={size}
          variant={paginationVariant}
          aria-label="Пагинация таблицы"
        />
      </TablePaginationRow>
    </TablePaginationRoot>
  );
};

TablePagination.displayName = 'TablePagination';
