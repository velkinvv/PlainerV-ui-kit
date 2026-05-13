import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import type { SelectOption, TablePaginationProps } from '@/types/ui';
import { Size } from '@/types/sizes';
import { Input } from '../../inputs/Input/Input';
import { Select } from '../../inputs/Select/Select';
import { Pagination } from '../../Pagination/Pagination';
import { clampTablePageZeroBased, getTableTotalPages, parseTablePageJumpInput } from './handlers';
import {
  TablePaginationRoot,
  TablePaginationRow,
  TablePaginationRowsSelect,
  TablePaginationSelectField,
  TABLE_PAGINATION_ROWS_SELECT_INPUT_CLASS,
  TablePaginationPageJump,
  TablePaginationPageJumpField,
  TABLE_PAGINATION_PAGE_JUMP_INPUT_CLASS,
} from './Table.style';

/**
 * Пагинация таблицы: `page` с нуля, `count` — всего записей, опционально выбор `rowsPerPage`.
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
 * @param props.embeddedInTableCard - Подвал как часть одной карточки с таблицей (разделитель сверху, без внешнего отступа)
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
  embeddedInTableCard = false,
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

  /** Опции для `Select` (значения строк — строки для совместимости с контролируемым `value`). */
  const rowsPerPageSelectOptions = useMemo<SelectOption[]>(
    () =>
      rowsPerPageOptions?.map((optionSize) => ({
        value: String(optionSize),
        label: String(optionSize),
      })) ?? [],
    [rowsPerPageOptions],
  );

  /** Смена размера страницы: отдаём тот же контракт, что у нативного `select` (`event.target.value`). */
  const handleRowsPerPageValueChange = useCallback(
    (nextValue: string | string[]) => {
      const valueString = String(Array.isArray(nextValue) ? nextValue[0] : nextValue);
      onRowsPerPageChange?.({
        target: { value: valueString } as HTMLSelectElement,
        currentTarget: { value: valueString } as HTMLSelectElement,
      } as React.ChangeEvent<HTMLSelectElement>);
    },
    [onRowsPerPageChange],
  );

  return (
    <TablePaginationRoot
      $embeddedInTableCard={embeddedInTableCard}
      className={clsx(className)}
      style={style}
    >
      <TablePaginationRow
        $toolbarAlign={paginationToolbarAlign}
        $toolbarReverse={paginationToolbarReverse}
      >
        {shouldShowRowsPerPageSelect && rowsPerPageOptions?.length ? (
          <TablePaginationRowsSelect $compact={isRowsSelectCompact}>
            <span>{resolvedRowsPerPageLabel}</span>
            <TablePaginationSelectField $compact={isRowsSelectCompact}>
              <Select
                mode="select"
                searchable={false}
                options={rowsPerPageSelectOptions}
                value={String(rowsPerPage)}
                onValueChange={handleRowsPerPageValueChange}
                disabled={disabled}
                size={size}
                fullWidth
                textAlign="center"
                className={TABLE_PAGINATION_ROWS_SELECT_INPUT_CLASS}
                aria-label={rowsSelectAriaLabel}
              />
            </TablePaginationSelectField>
          </TablePaginationRowsSelect>
        ) : null}

        {shouldShowPageJump ? (
          <TablePaginationPageJump>
            <span>{resolvedLabelPageJump}</span>
            <TablePaginationPageJumpField>
              <Input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                disabled={disabled}
                value={jumpDraft}
                onChange={(event) => {
                  setJumpDraft(event.target.value);
                }}
                onBlur={() => {
                  applyJumpDraft();
                }}
                onKeyDown={handleJumpKeyDown}
                size={size}
                fullWidth
                textAlign="center"
                displayCharacterCounter={false}
                className={TABLE_PAGINATION_PAGE_JUMP_INPUT_CLASS}
                aria-label={
                  typeof resolvedLabelPageJump === 'string'
                    ? `${resolvedLabelPageJump} номер от 1 до ${totalPages}`
                    : 'Номер страницы'
                }
              />
            </TablePaginationPageJumpField>
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
