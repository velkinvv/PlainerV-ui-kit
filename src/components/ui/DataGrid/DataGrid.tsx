import React, { useCallback, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import type {
  DataGridBaseRow,
  DataGridColumn,
  DataGridPaginationModel,
  DataGridProps,
  DataGridRenderCellParams,
} from '@/types/ui';
import { RadioButtonLabelPosition } from '@/types/ui';
import { Size, IconSize } from '@/types/sizes';
import { getTableSelectionAggregate } from '@/handlers/tableSelectionHandlers';
import { Checkbox } from '../Checkbox/Checkbox';
import { RadioButton } from '../RadioButton/RadioButton';
import { Spinner } from '../Spinner/Spinner';
import { SpinnerVariant } from '@/types/ui';
import { Icon } from '../Icon/Icon';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel,
} from '../Table';
import {
  dataGridSizeToTableSize,
  getDataGridCellValue,
  sliceRowsForPagination,
  toIdSet,
  reorderByIndex,
} from './dataGridHandlers';
import {
  DataGridChevronWrap,
  DataGridExpandButton,
  DataGridLoadingOverlay,
  DataGridRoot,
  DataGridRowDragHandle,
} from './DataGrid.style';

/**
 * Готовая таблица с колонками и строками из пропсов (композиция `Table*` + выбор + пагинация + сортировка).
 * @param props — см. `DataGridProps` в `types/ui.ts`
 */
export function DataGrid<Row extends DataGridBaseRow>(props: DataGridProps<Row>): React.ReactElement {
  const {
    tableId,
    columns,
    rows,
    totalRows,
    getRowId = (row: Row) => row.id,
    displayRowSelectionColumn = false,
    multiselect = true,
    selectedIds,
    disabledIds,
    onRowSelectionChange,
    onRowClick,
    onRowDoubleClick,
    paginationModel,
    onPaginationChange,
    paginationMode = 'client',
    rowsPerPageOptions = [5, 10, 25],
    sortModel,
    onSortChange,
    stickyHeader = false,
    striped = true,
    size = Size.MD,
    isLoading = false,
    rowBackgroundColorByStatus,
    expandedRowIds,
    onRowCollapseChange,
    getRowExpandable,
    renderExpandedRow,
    renderRowWrapper,
    renderCell,
    enableColumnDrag = false,
    onColumnDragEnd,
    enableRowDrag = false,
    onRowDragEnd,
    hideFooter = false,
    elevated = true,
    tableAriaLabel,
    className,
    style,
  } = props;

  const tableSize = useMemo(() => dataGridSizeToTableSize(size), [size]);
  const selectedSet = useMemo(() => toIdSet(selectedIds), [selectedIds]);
  const disabledSet = useMemo(() => toIdSet(disabledIds), [disabledIds]);

  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(() => new Set());
  const expandedSet = useMemo(() => {
    if (expandedRowIds != null) {
      return toIdSet(expandedRowIds);
    }
    return internalExpanded;
  }, [expandedRowIds, internalExpanded]);

  const showExpandColumn = Boolean(getRowExpandable && renderExpandedRow);

  const visibleRows = useMemo(() => {
    if (paginationModel && paginationMode === 'client') {
      return sliceRowsForPagination(rows, paginationModel);
    }
    return [...rows];
  }, [rows, paginationModel, paginationMode]);

  const pageIds = useMemo(() => visibleRows.map(r => getRowId(r)), [visibleRows, getRowId]);
  const selectionAggregate = useMemo(
    () => getTableSelectionAggregate(pageIds, selectedSet),
    [pageIds, selectedSet],
  );

  const toggleSelectAllPage = useCallback(() => {
    if (!onRowSelectionChange || !displayRowSelectionColumn || !multiselect) {
      return;
    }
    const pageIdSet = new Set(pageIds);
    const next = new Set(selectedSet);
    const agg = getTableSelectionAggregate(pageIds, selectedSet);
    if (agg === 'all' || agg === 'partial') {
      pageIdSet.forEach(id => {
        next.delete(id);
      });
    } else {
      pageIdSet.forEach(id => {
        next.add(id);
      });
    }
    onRowSelectionChange([...next], 'header');
  }, [displayRowSelectionColumn, multiselect, onRowSelectionChange, pageIds, selectedSet]);

  const toggleOne = useCallback(
    (rowId: string, checked: boolean) => {
      if (!onRowSelectionChange || !displayRowSelectionColumn) {
        return;
      }
      if (multiselect) {
        const next = new Set(selectedSet);
        if (checked) {
          next.add(rowId);
        } else {
          next.delete(rowId);
        }
        onRowSelectionChange([...next], 'row');
      } else {
        onRowSelectionChange(checked ? [rowId] : [], 'row');
      }
    },
    [displayRowSelectionColumn, multiselect, onRowSelectionChange, selectedSet],
  );

  const handleSortClick = useCallback(
    (field: string, sortable?: boolean) => {
      if (!sortable || !onSortChange) {
        return;
      }
      const cur = sortModel;
      if (cur?.field === field) {
        const nextDir = cur.direction === 'asc' ? 'desc' : 'asc';
        onSortChange({ field, direction: nextDir });
      } else {
        onSortChange({ field, direction: 'asc' });
      }
    },
    [onSortChange, sortModel],
  );

  const setRowExpanded = useCallback(
    (rowId: string, expanded: boolean) => {
      onRowCollapseChange?.(rowId, expanded);
      if (expandedRowIds == null) {
        setInternalExpanded(prev => {
          const n = new Set(prev);
          if (expanded) {
            n.add(rowId);
          } else {
            n.delete(rowId);
          }
          return n;
        });
      }
    },
    [expandedRowIds, onRowCollapseChange],
  );

  const [dragColFrom, setDragColFrom] = useState<number | null>(null);
  const handleColDragStart = useCallback(
    (index: number, disabled?: boolean) => {
      if (!enableColumnDrag || disabled) {
        return;
      }
      setDragColFrom(index);
    },
    [enableColumnDrag],
  );

  const handleColDrop = useCallback(
    (toIndex: number) => {
      if (dragColFrom == null || !onColumnDragEnd) {
        return;
      }
      if (dragColFrom !== toIndex) {
        onColumnDragEnd(dragColFrom, toIndex);
      }
      setDragColFrom(null);
    },
    [dragColFrom, onColumnDragEnd],
  );

  const [dragRowFrom, setDragRowFrom] = useState<number | null>(null);
  const handleRowDragStart = useCallback(
    (index: number) => {
      if (!enableRowDrag) {
        return;
      }
      setDragRowFrom(index);
    },
    [enableRowDrag],
  );

  const handleRowDrop = useCallback(
    (toIndex: number) => {
      if (dragRowFrom == null || !onRowDragEnd) {
        return;
      }
      const orderedIds = visibleRows.map(r => getRowId(r));
      const nextOrder = reorderByIndex(orderedIds, dragRowFrom, toIndex);
      if (dragRowFrom !== toIndex) {
        onRowDragEnd(nextOrder);
      }
      setDragRowFrom(null);
    },
    [dragRowFrom, enableRowDrag, getRowId, onRowDragEnd, visibleRows],
  );

  const colCount =
    columns.length +
    (displayRowSelectionColumn ? 1 : 0) +
    (showExpandColumn ? 1 : 0) +
    (enableRowDrag ? 1 : 0);

  const renderCellValue = useCallback(
    (row: Row, col: DataGridColumn<Row>, rowIndex: number): React.ReactNode => {
      const fieldStr = String(col.field);
      const value = col.valueGetter ? col.valueGetter(row) : getDataGridCellValue(row, col.field);
      const params: DataGridRenderCellParams<Row> = { row, field: fieldStr, value, rowIndex };
      if (col.render) {
        return col.render(params);
      }
      if (renderCell) {
        return renderCell(params);
      }
      if (value == null || value === '') {
        return null;
      }
      if (typeof value === 'string' || typeof value === 'number') {
        return String(value);
      }
      return null;
    },
    [renderCell],
  );

  const showPagination = Boolean(paginationModel && onPaginationChange && !hideFooter);

  return (
    <DataGridRoot
      className={clsx(className)}
      style={style}
      onDragEnd={() => {
        // Сброс при отпускании вне цели drop (нативный HTML5 DnD)
        setDragColFrom(null);
        setDragRowFrom(null);
      }}
    >
      <TableContainer elevated={elevated}>
        <Table
          id={tableId}
          size={tableSize}
          striped={striped}
          stickyHeader={stickyHeader}
          aria-label={tableAriaLabel}
        >
          <TableHead>
            <TableRow>
              {enableRowDrag ? <TableCell padding="checkbox" aria-hidden /> : null}
              {displayRowSelectionColumn ? (
                <TableCell padding="checkbox">
                  {multiselect ? (
                    <Checkbox
                      size={size === Size.SM || size === Size.XS ? Size.SM : Size.MD}
                      checked={selectionAggregate === 'all'}
                      indeterminate={selectionAggregate === 'partial'}
                      onChange={() => {
                        toggleSelectAllPage();
                      }}
                      aria-label="Выбрать все на странице"
                    />
                  ) : null}
                </TableCell>
              ) : null}
              {showExpandColumn ? <TableCell padding="checkbox" aria-label="Развернуть" /> : null}
              {columns.map((col, colIndex) => {
                const fieldStr = String(col.field);
                const sortable = Boolean(col.sortable && onSortChange);
                const active = sortModel?.field === fieldStr;
                const thStyle: React.CSSProperties = {};
                if (col.width != null) {
                  thStyle.width = col.width;
                }
                if (col.minWidth != null) {
                  thStyle.minWidth = col.minWidth;
                }
                return (
                  <TableCell
                    key={fieldStr}
                    align={col.align === 'right' ? 'right' : col.align === 'center' ? 'center' : 'left'}
                    activeColumn={active}
                    style={thStyle}
                    draggable={enableColumnDrag && !col.disableReorder}
                    onDragStart={() => {
                      handleColDragStart(colIndex, col.disableReorder);
                    }}
                    onDragOver={e => {
                      if (enableColumnDrag) {
                        e.preventDefault();
                      }
                    }}
                    onDrop={() => {
                      handleColDrop(colIndex);
                    }}
                  >
                    {sortable ? (
                      <TableSortLabel
                        active={active}
                        direction={active ? sortModel?.direction ?? 'asc' : false}
                        onClick={() => {
                          handleSortClick(fieldStr, sortable);
                        }}
                      >
                        {col.headerName ?? fieldStr}
                      </TableSortLabel>
                    ) : (
                      (col.headerName ?? fieldStr) as React.ReactNode
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row, rowIndex) => {
              const rowId = getRowId(row);
              const disabled = disabledSet.has(rowId);
              const selected = selectedSet.has(rowId);
              const bg = rowBackgroundColorByStatus?.(row);
              const rowStyle: React.CSSProperties | undefined = bg ? { backgroundColor: bg } : undefined;
              const expandable = getRowExpandable?.(row) ?? false;
              const expanded = expandedSet.has(rowId);

              const cells = (
                <>
                  {enableRowDrag ? (
                    <TableCell padding="checkbox">
                      <DataGridRowDragHandle
                        $disabled={disabled}
                        draggable={!disabled}
                        onDragStart={e => {
                          e.dataTransfer.effectAllowed = 'move';
                          handleRowDragStart(rowIndex);
                        }}
                        aria-label="Перетащить строку"
                      >
                        <Icon name="IconExMoreSquare" size={IconSize.SM} color="currentColor" />
                      </DataGridRowDragHandle>
                    </TableCell>
                  ) : null}
                  {displayRowSelectionColumn ? (
                    <TableCell padding="checkbox">
                      {multiselect ? (
                        <Checkbox
                          size={size === Size.SM || size === Size.XS ? Size.SM : Size.MD}
                          checked={selected}
                          disabled={disabled}
                          onChange={e => {
                            toggleOne(rowId, e.target.checked);
                          }}
                          aria-label={`Выбрать строку ${rowId}`}
                        />
                      ) : (
                        <RadioButton
                          name={tableId}
                          value={rowId}
                          checked={selected}
                          disabled={disabled}
                          labelPosition={RadioButtonLabelPosition.NONE}
                          size={size}
                          onChange={() => {
                            toggleOne(rowId, true);
                          }}
                          aria-label={`Выбрать строку ${rowId}`}
                        />
                      )}
                    </TableCell>
                  ) : null}
                  {showExpandColumn ? (
                    <TableCell padding="checkbox">
                      {expandable ? (
                        <DataGridExpandButton
                          type="button"
                          aria-expanded={expanded}
                          aria-label={expanded ? 'Свернуть' : 'Развернуть'}
                          onClick={() => {
                            setRowExpanded(rowId, !expanded);
                          }}
                        >
                          <DataGridChevronWrap $open={expanded} aria-hidden>
                            <Icon name="PhosphorArrowFatLineDown" size={IconSize.SM} color="currentColor" />
                          </DataGridChevronWrap>
                        </DataGridExpandButton>
                      ) : null}
                    </TableCell>
                  ) : null}
                  {columns.map(col => {
                    const fieldStr = String(col.field);
                    const tdStyle: React.CSSProperties = {};
                    if (col.width != null) {
                      tdStyle.width = col.width;
                    }
                    if (col.minWidth != null) {
                      tdStyle.minWidth = col.minWidth;
                    }
                    return (
                      <TableCell
                        key={fieldStr}
                        align={col.align === 'right' ? 'right' : col.align === 'center' ? 'center' : 'left'}
                        style={tdStyle}
                      >
                        {renderCellValue(row, col, rowIndex)}
                      </TableCell>
                    );
                  })}
                </>
              );

              const mainRow = (
                <TableRow
                  key={rowId}
                  selected={selected}
                  disabled={disabled}
                  style={rowStyle}
                  onClick={e => {
                    onRowClick?.(row, e);
                  }}
                  onDoubleClick={e => {
                    onRowDoubleClick?.(row, e);
                  }}
                  onDragOver={e => {
                    if (enableRowDrag) {
                      e.preventDefault();
                    }
                  }}
                  onDrop={() => {
                    if (enableRowDrag) {
                      handleRowDrop(rowIndex);
                    }
                  }}
                >
                  {cells}
                </TableRow>
              );

              const wrappedMain =
                renderRowWrapper != null
                  ? renderRowWrapper({ row, children: mainRow as React.ReactElement })
                  : mainRow;

              return (
                <React.Fragment key={rowId}>
                  {wrappedMain}
                  {expandable && expanded && renderExpandedRow ? (
                    <TableRow>
                      <TableCell colSpan={colCount} style={{ backgroundColor: bg }}>
                        {renderExpandedRow(row)}
                      </TableCell>
                    </TableRow>
                  ) : null}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {showPagination && paginationModel ? (
        <TablePagination
          count={totalRows}
          page={paginationModel.page}
          rowsPerPage={paginationModel.pageSize}
          rowsPerPageOptions={rowsPerPageOptions}
          onPageChange={(_e, p) => {
            onPaginationChange?.({ ...paginationModel, page: p });
          }}
          onRowsPerPageChange={e => {
            const next = Number(e.target.value);
            onPaginationChange?.({ page: 0, pageSize: next });
          }}
          size={size}
        />
      ) : null}

      {isLoading ? (
        <DataGridLoadingOverlay aria-busy="true" aria-live="polite">
          <Spinner variant={SpinnerVariant.DOTS} ariaLabel="Загрузка таблицы" />
        </DataGridLoadingOverlay>
      ) : null}
    </DataGridRoot>
  );
}

DataGrid.displayName = 'DataGrid';
