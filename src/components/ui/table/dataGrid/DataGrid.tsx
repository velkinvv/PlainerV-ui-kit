import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { useTheme } from 'styled-components';
import type { ThemeType } from '@/types/theme';
import {
  RadioButtonLabelPosition,
  SpinnerVariant,
  type DataGridBaseRow,
  type DataGridColumn,
  type DataGridExpandedRowDataStatus,
  type DataGridExpandedRowRenderContext,
  type DataGridLoadingDisplay,
  type DataGridProps,
  type DataGridRenderCellParams,
} from '@/types/ui';
import { Size, IconSize } from '@/types/sizes';
import { getTableSelectionAggregate } from '@/handlers/tableSelectionHandlers';
import { formatTableCellValue } from '@/handlers/tableCellFormat';
import { Checkbox } from '../../Checkbox/Checkbox';
import { RadioButton } from '../../RadioButton/RadioButton';
import { Spinner } from '../../Spinner/Spinner';
import { Icon } from '../../Icon/Icon';
import {
  TableContainer,
  TableContainerScroll,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '../basicTable';
import { normalizeTableHeaderMaxLines } from '../basicTable/tableHeaderClampHandlers';
import { PLAINER_TABLE_HEADER_BACKGROUND_CSS_VAR } from '../basicTable/tableThemeRadiusHandlers';
import { PLAINER_TABLE_HEADER_TOOLBAR_ROW_ATTRIBUTE } from '../basicTable/tableBodyScrollHandlers';
import {
  applyDataGridColDragGhostPreview,
  applyDataGridRowDragGhostPreview,
  DATA_GRID_COL_DRAG_SHIFT_TRANSITION,
  DATA_GRID_ROW_DRAG_SHIFT_TRANSITION,
  dataGridSizeToTableSize,
  getDataGridCellValue,
  getDataGridColDragDisplacementPx,
  getDataGridDisplayColumns,
  getDataGridRowDragDisplacementPx,
  resolveDataGridColumnBackgroundColor,
  resolveDataGridRowBackgroundColor,
  resolveDataGridExpandedRowDataStatus,
  sliceRowsForPagination,
  toIdSet,
  reorderByIndex,
} from './dataGridHandlers';
import {
  clampDataGridColumnResizeWidthPx,
  DATA_GRID_COLUMN_RESIZE_FALLBACK_MAX_PX,
  parseDataGridColumnMinWidthConstraintPx,
  parseDataGridColumnWidthToPixels,
} from './dataGridColumnResizeHandlers';
import {
  getDataGridSortCriterionIndexForField,
  normalizeDataGridSortModel,
  resolveNextDataGridSortModel,
} from './dataGridSortModelHandlers';
import {
  DataGridChevronWrap,
  DataGridExpandButton,
  DataGridExpandedInner,
  DataGridExpandedLoadingWrap,
  DataGridExpandedSlot,
  DataGridLoadingOverlay,
  DataGridRoot,
  DataGridRowDragHandle,
  DataGridColumnResizeHandle,
  DataGridHeaderToolbarInner,
  DATA_GRID_HEADER_TOOLBAR_STICKY_TOP_OFFSET,
} from './DataGrid.style';
import { DataGridColumnHeaderContent } from './DataGridColumnHeaderContent';
import {
  normalizeTableSurfaceBackgrounds,
  resolveTableHeaderSurfaceBackgroundColor,
  resolveTableHeaderToolbarSurfaceBackgroundColor,
} from '../basicTable/tableSurfaceBackgroundHandlers';
import { resolveDataGridTableLayout } from './dataGridTableLayoutHandlers';
import { resolveDataGridTableHeaderBackground } from './dataGridTableHeaderSurfaceHandlers';
import { DataGridHeaderToolbarBuiltinActions } from './DataGridHeaderToolbarBuiltinActions';
import { DataGridEmptyState } from './DataGridEmptyState';
import { DataGridErrorState } from './DataGridErrorState';
import { DataGridSkeletonBody } from './DataGridSkeletonBody';
import { DataGridStatusMessage } from './DataGridStatusMessage';
import {
  resolveDataGridDataStatus,
  resolveDataGridLoadingDisplay,
  resolveDataGridSkeletonRowCount,
} from './dataGridDataStatusHandlers';
import { convertDataGridColumnsToExportColumns } from './excelExport/dataGridExcelExportColumnHandlers';
import { DataGridExcelExportButton } from './excelExport/DataGridExcelExportButton';

/**
 * Готовая таблица с колонками и строками из пропсов (композиция `Table*` + выбор + пагинация + сортировка).
 * @param props — см. `DataGridProps` в `types/ui.ts`: раскрытие строк (`expandedRowIds`, `onExpandedRowChange` с объектом
 *   `{ rowId, expanded, expandedIds }`; не `onRowCollapseChange`), ресайз (`onColumnResize*`),
 *   DnD колонок/строк (`onColumnDrag*`, `onRowDrag*`), клик по фильтру (`onColumnFilterClick` + `filterable` у колонки),
 *   дополнительная строка над заголовками колонок (`headerToolbar`, `refetch`, `onResetFilters`, `hasActiveFilters`, `excelExport`, …),
 *   липкая шапка по умолчанию (`stickyHeader`, отключение — `stickyHeader={false}`),
 *   горизонтальный скролл по умолчанию (`horizontalScroll`, отключение — `horizontalScroll={false}`),
 *   высота области скролла (`scrollAreaMaxHeight` → `TableContainerScroll`) для вертикальной прокрутки с липкой шапкой,
 *   тон шапки (`tableHeaderVariant`, `tableHeaderBackground`) для согласования с панелью `headerToolbar`,
 *   декларативное отображение ячеек (`columns[].format` → `TableCellFormat`; приоритет ниже, чем у `columns[].render` и `renderCell`).
 *   пустой `rows` / отсутствие строк — блок в `tbody` с иконкой лупы (`emptyStateTitle`, `emptyStateDescription`, `renderEmptyState`), шапка остаётся.
 *   статусы данных (`dataStatus`, `loadingDisplay`, `error`, `statusMessage`, `renderErrorState`, …) — загрузка, скелетон, ошибка и информационные сообщения.
 */
export function DataGrid<
  Row extends DataGridBaseRow<string> = DataGridBaseRow,
  RowColorKey extends string = string,
  ColumnColorKey extends string = string,
>(props: DataGridProps<Row, RowColorKey, ColumnColorKey>): React.ReactElement {
  const theme = useTheme() as ThemeType;
  const {
    tableId,
    columns,
    rows = [],
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
    paginationVariant = 'default',
    paginationToolbarAlign = 'right',
    paginationToolbarReverse = false,
    showRowsPerPageSelect,
    showPageJump,
    labelPageJump,
    rowsPerPageSelectVariant = 'default',
    rowsPerPageOptions = [5, 10, 25],
    sortModel,
    onSortChange,
    multiColumnSort = false,
    stickyHeader = true,
    horizontalScroll = true,
    scrollAreaMaxHeight,
    tableHeaderVariant = 'default',
    tableHeaderBackground,
    striped = true,
    columnDividers = true,
    size = Size.MD,
    headerMaxLines,
    dataStatus,
    loadingDisplay = 'overlay',
    skeletonRowCount,
    isLoading = false,
    error,
    errorStateTitle,
    errorStateDescription,
    onRetry,
    errorStateRetryLabel,
    renderErrorState,
    renderLoadingOverlay,
    statusMessage,
    statusMessageVariant = 'info',
    renderStatusMessage,
    rowBackgroundColorByStatus,
    rowColorMap,
    rowColorField,
    columnColorMap,
    expandedRowIds,
    getRowExpandable,
    getExpandedRowDataStatus,
    getExpandedRowLoading,
    onExpandedRowOpen,
    onExpandedRowChange,
    renderExpandedRow,
    renderRowWrapper,
    renderCell,
    enableColumnDrag = false,
    onColumnDragStart,
    onColumnDragEnd,
    onColumnOrderChange,
    onColumnDragCancel,
    enableColumnResize = false,
    onColumnResizeStart,
    onColumnResizeChange,
    onColumnResize,
    onColumnResizeEnd,
    columnResizeMaxWidthPx,
    enableRowDrag = false,
    onRowDragStart,
    onRowDragEnd,
    onRowDragCancel,
    onColumnFilterClick,
    headerToolbar,
    headerToolbarAlign = 'end',
    headerToolbarAriaLabel,
    refetch,
    isRefetching = false,
    onResetFilters,
    hasActiveFilters = false,
    resetFiltersConfirmTexts,
    excelExport,
    emptyStateTitle,
    emptyStateDescription,
    renderEmptyState,
    hideFooter = false,
    elevated = true,
    shellVariant = 'card',
    shellInset = false,
    shellInsetPadding,
    surfaceBackgrounds,
    tableAriaLabel,
    className,
    style,
  } = props;

  const displayColumns = useMemo(
    () => getDataGridDisplayColumns<Row, ColumnColorKey>(columns),
    [columns],
  );

  const columnBackgroundByField = useMemo(() => {
    const backgroundByField = new Map<string, string | undefined>();
    for (const column of displayColumns) {
      const fieldName = String(column.field);
      backgroundByField.set(
        fieldName,
        resolveDataGridColumnBackgroundColor(column.columnColor, theme.colors, columnColorMap),
      );
    }
    return backgroundByField;
  }, [displayColumns, columnColorMap, theme.colors]);

  const tableSize = useMemo(() => dataGridSizeToTableSize(size), [size]);
  const multiColumnSortEnabled = Boolean(multiColumnSort);

  const rawSortCriteria = useMemo(() => normalizeDataGridSortModel(sortModel ?? null), [sortModel]);

  const displaySortCriteria = useMemo(() => {
    if (!multiColumnSortEnabled && rawSortCriteria.length > 1) {
      return rawSortCriteria.slice(0, 1);
    }
    return rawSortCriteria;
  }, [rawSortCriteria, multiColumnSortEnabled]);
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

  const resolvedDataStatus = useMemo(
    () => resolveDataGridDataStatus({ dataStatus, isLoading }),
    [dataStatus, isLoading],
  );

  const isTableLoading = resolvedDataStatus === 'loading';
  const isTableError = resolvedDataStatus === 'error';
  const isTableReady = resolvedDataStatus === 'ready';

  const showEmptyState = isTableReady && rows.length === 0;
  const showErrorState = isTableError;
  const showStatusMessage = isTableReady && (statusMessage != null || renderStatusMessage != null);

  const effectiveLoadingDisplay: DataGridLoadingDisplay = useMemo(
    () =>
      resolveDataGridLoadingDisplay(loadingDisplay, {
        isTableLoading,
        hasVisibleRows: rows.length > 0,
      }),
    [loadingDisplay, isTableLoading, rows.length],
  );

  const showSkeletonBody = isTableLoading && effectiveLoadingDisplay === 'skeleton';
  const showLoadingOverlay = isTableLoading && effectiveLoadingDisplay === 'overlay';
  const showDataRows = isTableReady && rows.length > 0;

  const skeletonBodyRowCount = useMemo(
    () =>
      resolveDataGridSkeletonRowCount({
        skeletonRowCount,
        paginationPageSize: paginationModel?.pageSize,
      }),
    [skeletonRowCount, paginationModel?.pageSize],
  );

  const handleDataGridRetry = useMemo(() => {
    const retryHandler = onRetry ?? refetch;
    return retryHandler != null ? () => retryHandler() : undefined;
  }, [onRetry, refetch]);

  const errorStateContent = useMemo(() => {
    if (!showErrorState) {
      return null;
    }
    if (renderErrorState) {
      return renderErrorState(error, handleDataGridRetry);
    }
    return (
      <DataGridErrorState
        title={errorStateTitle}
        description={errorStateDescription}
        error={error}
        onRetry={handleDataGridRetry}
        retryLabel={errorStateRetryLabel}
      />
    );
  }, [
    showErrorState,
    renderErrorState,
    error,
    handleDataGridRetry,
    errorStateTitle,
    errorStateDescription,
    errorStateRetryLabel,
  ]);

  const statusMessageContent = useMemo(() => {
    if (!showStatusMessage) {
      return null;
    }
    if (renderStatusMessage) {
      return renderStatusMessage();
    }
    if (statusMessage != null) {
      return <DataGridStatusMessage message={statusMessage} variant={statusMessageVariant} />;
    }
    return null;
  }, [showStatusMessage, renderStatusMessage, statusMessage, statusMessageVariant]);

  const emptyStateContent = useMemo(() => {
    if (!showEmptyState) {
      return null;
    }
    return (
      renderEmptyState?.() ?? (
        <DataGridEmptyState title={emptyStateTitle} description={emptyStateDescription} />
      )
    );
  }, [showEmptyState, renderEmptyState, emptyStateTitle, emptyStateDescription]);

  const visibleRows = useMemo(() => {
    if (paginationModel && paginationMode === 'client') {
      return sliceRowsForPagination(rows, paginationModel);
    }
    return [...rows];
  }, [rows, paginationModel, paginationMode]);

  const pageIds = useMemo(() => visibleRows.map((r) => getRowId(r)), [visibleRows, getRowId]);
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
      pageIdSet.forEach((id) => {
        next.delete(id);
      });
    } else {
      pageIdSet.forEach((id) => {
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
    (field: string, sortableColumn?: boolean) => {
      if (!sortableColumn || !onSortChange) {
        return;
      }
      const nextModel = resolveNextDataGridSortModel({
        current: sortModel ?? null,
        field,
        multiColumnSort: multiColumnSortEnabled,
      });
      onSortChange(nextModel);
    },
    [onSortChange, sortModel, multiColumnSortEnabled],
  );

  const setRowExpanded = useCallback(
    (rowId: string, expanded: boolean) => {
      const wasExpanded = expandedSet.has(rowId);
      const nextExpandedSet = new Set(expandedSet);
      if (expanded) {
        nextExpandedSet.add(rowId);
      } else {
        nextExpandedSet.delete(rowId);
      }
      const nextExpandedIds = [...nextExpandedSet];

      onExpandedRowChange?.({
        rowId,
        expanded,
        expandedIds: nextExpandedIds,
      });

      if (expanded && !wasExpanded) {
        const rowForOpen = visibleRows.find((visibleRow) => getRowId(visibleRow) === rowId);
        if (rowForOpen != null) {
          onExpandedRowOpen?.(rowForOpen);
        }
      }

      if (expandedRowIds == null) {
        setInternalExpanded(nextExpandedSet);
      }
    },
    [expandedRowIds, expandedSet, getRowId, onExpandedRowChange, onExpandedRowOpen, visibleRows],
  );

  const renderExpandedRowContent = useCallback(
    (row: Row, dataStatus: DataGridExpandedRowDataStatus) => {
      const context: DataGridExpandedRowRenderContext = {
        dataStatus,
        isLoading: dataStatus === 'loading',
      };
      if (dataStatus === 'loading') {
        return (
          <DataGridExpandedLoadingWrap aria-busy="true" aria-live="polite">
            <Spinner variant={SpinnerVariant.DOTS} ariaLabel="Загрузка деталей строки" />
          </DataGridExpandedLoadingWrap>
        );
      }
      if (dataStatus === 'error') {
        const expandedErrorContent = renderExpandedRow?.(row, context);
        if (expandedErrorContent != null) {
          return expandedErrorContent;
        }
        return <DataGridErrorState compact error={error} />;
      }
      return renderExpandedRow?.(row, context) ?? null;
    },
    [renderExpandedRow, error],
  );

  const resolvedSurfaces = useMemo(
    () => normalizeTableSurfaceBackgrounds(surfaceBackgrounds),
    [surfaceBackgrounds],
  );

  const columnResizeMaxPx = columnResizeMaxWidthPx ?? DATA_GRID_COLUMN_RESIZE_FALLBACK_MAX_PX;
  const showColumnResizeUi = Boolean(enableColumnResize && onColumnResize);

  /** Единый фон шапки колонок (серый / белый из темы или кастом; с учётом `surfaceBackgrounds`). */
  const resolvedTableHeaderBackground = useMemo(() => {
    const themeHeaderBackground = resolveDataGridTableHeaderBackground(
      theme,
      tableHeaderVariant,
      tableHeaderBackground,
    );
    return resolveTableHeaderSurfaceBackgroundColor(resolvedSurfaces, themeHeaderBackground);
  }, [theme, tableHeaderVariant, tableHeaderBackground, resolvedSurfaces]);

  /** Фон панели `headerToolbar` — отдельный флаг `headerToolbar` в `surfaceBackgrounds`. */
  const resolvedHeaderToolbarBackground = useMemo(
    () =>
      resolveTableHeaderToolbarSurfaceBackgroundColor(
        resolvedSurfaces,
        resolvedTableHeaderBackground,
      ),
    [resolvedSurfaces, resolvedTableHeaderBackground],
  );

  /** `table-layout: fixed` при горизонтальном скролле или ресайзе — ширины колонок не сжимаются. */
  const dataGridTableStyle = useMemo((): React.CSSProperties => {
    const tableLayout = resolveDataGridTableLayout(horizontalScroll, showColumnResizeUi);
    return {
      [PLAINER_TABLE_HEADER_BACKGROUND_CSS_VAR]: resolvedTableHeaderBackground,
      ...(tableLayout ? { tableLayout } : {}),
    } as React.CSSProperties;
  }, [horizontalScroll, showColumnResizeUi, resolvedTableHeaderBackground]);

  const [columnResizePreview, setColumnResizePreview] = useState<{
    field: string;
    widthPx: number;
  } | null>(null);
  const columnResizeSessionRef = useRef<{
    field: string;
    startClientX: number;
    startWidthPx: number;
    minPx: number;
    maxPx: number;
    pointerId: number;
  } | null>(null);
  const columnResizeLiveWidthRef = useRef(0);
  const columnResizeBlockColDragRef = useRef(false);

  useEffect(() => {
    if (!enableColumnDrag || !showColumnResizeUi) {
      return;
    }
    const onDragStartCapture = (event: DragEvent) => {
      if (!columnResizeBlockColDragRef.current) {
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
    };
    document.addEventListener('dragstart', onDragStartCapture, true);
    return () => {
      document.removeEventListener('dragstart', onDragStartCapture, true);
    };
  }, [enableColumnDrag, showColumnResizeUi]);

  const endColumnResizeGesture = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>, commit: boolean) => {
      const session = columnResizeSessionRef.current;
      if (!session || session.pointerId !== event.pointerId) {
        return;
      }
      columnResizeSessionRef.current = null;
      columnResizeBlockColDragRef.current = false;
      const field = session.field;
      const finalWidth = columnResizeLiveWidthRef.current;
      setColumnResizePreview(null);
      if (typeof event.currentTarget.releasePointerCapture === 'function') {
        try {
          event.currentTarget.releasePointerCapture(event.pointerId);
        } catch {
          /* снятие захвата уже выполнено браузером */
        }
      }
      if (commit && onColumnResize) {
        onColumnResize({ field, width: finalWidth });
      }
      onColumnResizeEnd?.({ field, width: finalWidth, committed: commit });
    },
    [onColumnResize, onColumnResizeEnd],
  );

  const handleColumnResizePointerDown = useCallback(
    (
      event: React.PointerEvent<HTMLButtonElement>,
      col: DataGridColumn<Row>,
      headerCell: HTMLElement,
    ) => {
      if (!showColumnResizeUi || col.disableResize) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      columnResizeBlockColDragRef.current = true;
      const fieldStr = String(col.field);
      const measuredWidth = headerCell.getBoundingClientRect().width;
      const startWidthPx = parseDataGridColumnWidthToPixels(col.width, measuredWidth);
      const minPx = parseDataGridColumnMinWidthConstraintPx(col.minWidth);
      const startClamped = clampDataGridColumnResizeWidthPx(startWidthPx, minPx, columnResizeMaxPx);
      columnResizeSessionRef.current = {
        field: fieldStr,
        startClientX: event.clientX,
        startWidthPx: startClamped,
        minPx,
        maxPx: columnResizeMaxPx,
        pointerId: event.pointerId,
      };
      columnResizeLiveWidthRef.current = startClamped;
      setColumnResizePreview({ field: fieldStr, widthPx: startClamped });
      onColumnResizeStart?.({ field: fieldStr, width: startClamped });
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [columnResizeMaxPx, onColumnResizeStart, showColumnResizeUi],
  );

  const handleColumnResizePointerMove = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      const session = columnResizeSessionRef.current;
      if (!session || session.pointerId !== event.pointerId) {
        return;
      }
      const deltaX = event.clientX - session.startClientX;
      const nextWidth = clampDataGridColumnResizeWidthPx(
        session.startWidthPx + deltaX,
        session.minPx,
        session.maxPx,
      );
      columnResizeLiveWidthRef.current = nextWidth;
      onColumnResizeChange?.({ field: session.field, width: nextWidth });
      setColumnResizePreview((previous) => {
        if (previous?.field === session.field && previous.widthPx === nextWidth) {
          return previous;
        }
        return { field: session.field, widthPx: nextWidth };
      });
    },
    [onColumnResizeChange],
  );

  const [dragColFrom, setDragColFrom] = useState<number | null>(null);
  const [dragColOverIndex, setDragColOverIndex] = useState<number | null>(null);
  const [dragColWidthPx, setDragColWidthPx] = useState(0);

  const beginColDrag = useCallback(
    (colIndex: number, sourceWidthPx: number) => {
      if (!enableColumnDrag) {
        return;
      }
      const columnAtStart = columns[colIndex];
      const fieldAtStart = columnAtStart != null ? String(columnAtStart.field) : String(colIndex);
      onColumnDragStart?.({ fromIndex: colIndex, field: fieldAtStart });
      setDragColFrom(colIndex);
      setDragColOverIndex(colIndex);
      setDragColWidthPx(sourceWidthPx);
    },
    [columns, enableColumnDrag, onColumnDragStart],
  );

  const handleColDragOverTarget = useCallback(
    (targetColIndex: number, event: React.DragEvent<HTMLElement>) => {
      if (!enableColumnDrag || dragColFrom === null) {
        return;
      }
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      setDragColOverIndex((previous) => (previous === targetColIndex ? previous : targetColIndex));
    },
    [enableColumnDrag, dragColFrom],
  );

  const handleColDrop = useCallback(
    (toIndex: number) => {
      if (dragColFrom == null) {
        return;
      }
      const fromIndex = dragColFrom;
      const movedColumn = columns[fromIndex];
      const movedField = movedColumn != null ? String(movedColumn.field) : String(fromIndex);
      if (fromIndex !== toIndex) {
        onColumnDragEnd?.(fromIndex, toIndex);
        onColumnOrderChange?.({ fromIndex, toIndex, field: movedField });
      } else {
        onColumnDragCancel?.();
      }
      setDragColFrom(null);
      setDragColOverIndex(null);
      setDragColWidthPx(0);
    },
    [columns, dragColFrom, onColumnDragCancel, onColumnDragEnd, onColumnOrderChange],
  );

  const buildColumnDragCellStyle = useCallback(
    (colIndex: number, baseStyle: React.CSSProperties): React.CSSProperties => {
      const shiftPx =
        enableColumnDrag && dragColFrom !== null
          ? getDataGridColDragDisplacementPx(
              colIndex,
              dragColFrom,
              dragColOverIndex,
              dragColWidthPx,
            )
          : 0;
      const shiftPart: React.CSSProperties | undefined =
        enableColumnDrag && dragColFrom !== null
          ? {
              ...(shiftPx !== 0 ? { transform: `translateX(${shiftPx}px)` } : {}),
              transition: DATA_GRID_COL_DRAG_SHIFT_TRANSITION,
            }
          : undefined;
      const sourceColumnPart: React.CSSProperties | undefined =
        enableColumnDrag && dragColFrom === colIndex
          ? {
              opacity: 0.48,
              outline: `2px dashed ${theme.colors.primary}`,
              outlineOffset: -2,
              position: 'relative',
              zIndex: 2,
              boxShadow: theme.boxShadow?.md ?? `0 8px 24px ${theme.colors.shadow}`,
            }
          : undefined;
      return {
        ...baseStyle,
        ...(shiftPart ?? {}),
        ...(sourceColumnPart ?? {}),
      };
    },
    [
      dragColFrom,
      dragColOverIndex,
      dragColWidthPx,
      enableColumnDrag,
      theme.boxShadow?.md,
      theme.colors.primary,
      theme.colors.shadow,
    ],
  );

  const [dragRowFrom, setDragRowFrom] = useState<number | null>(null);
  const [dragRowOverIndex, setDragRowOverIndex] = useState<number | null>(null);
  const [dragRowHeightPx, setDragRowHeightPx] = useState(0);

  const beginRowDrag = useCallback(
    (rowIndex: number, sourceRowHeightPx: number) => {
      if (!enableRowDrag) {
        return;
      }
      const rowAtStart = visibleRows[rowIndex];
      const rowIdAtStart = rowAtStart != null ? getRowId(rowAtStart) : '';
      onRowDragStart?.({ fromIndex: rowIndex, rowId: rowIdAtStart });
      setDragRowFrom(rowIndex);
      setDragRowOverIndex(rowIndex);
      setDragRowHeightPx(sourceRowHeightPx);
    },
    [enableRowDrag, getRowId, onRowDragStart, visibleRows],
  );

  const handleBodyRowDragOver = useCallback(
    (targetRowIndex: number, event: React.DragEvent<HTMLTableRowElement>) => {
      if (!enableRowDrag || dragRowFrom === null) {
        return;
      }
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      setDragRowOverIndex((previous) => (previous === targetRowIndex ? previous : targetRowIndex));
    },
    [enableRowDrag, dragRowFrom],
  );

  const handleRowDrop = useCallback(
    (toIndex: number) => {
      if (dragRowFrom == null) {
        return;
      }
      const fromIndex = dragRowFrom;
      const orderedIds = visibleRows.map((r) => getRowId(r));
      const nextOrder = reorderByIndex(orderedIds, fromIndex, toIndex);
      if (fromIndex !== toIndex) {
        onRowDragEnd?.(nextOrder);
      } else {
        onRowDragCancel?.();
      }
      setDragRowFrom(null);
      setDragRowOverIndex(null);
      setDragRowHeightPx(0);
    },
    [dragRowFrom, getRowId, onRowDragCancel, onRowDragEnd, visibleRows],
  );

  const colCount =
    displayColumns.length +
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
      if (col.format) {
        const formattedNode = formatTableCellValue({
          value,
          row,
          field: fieldStr,
          rowIndex,
          format: col.format,
        });
        if (formattedNode !== null && formattedNode !== undefined) {
          return formattedNode;
        }
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

  const headerToolbarFlexAlign = useMemo(():
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between' => {
    switch (headerToolbarAlign) {
      case 'start':
        return 'flex-start';
      case 'center':
        return 'center';
      case 'space-between':
        return 'space-between';
      case 'end':
      default:
        return 'flex-end';
    }
  }, [headerToolbarAlign]);

  const showBuiltinHeaderToolbarActions = Boolean(refetch ?? onResetFilters);
  const showExcelExportButton = Boolean(excelExport?.dataFetcher && excelExport.disabled !== true);
  const excelExportPageSize =
    excelExport?.pageSize ?? paginationModel?.pageSize ?? rowsPerPageOptions[0] ?? 10;
  const excelExportCurrentPage = paginationModel?.page ?? 0;

  const excelExportColumns = useMemo(() => {
    if (!excelExport) {
      return [];
    }
    const ignoredFields = [
      ...(excelExport.ignoreFields?.map(String) ?? []),
      ...(rowColorField != null ? [String(rowColorField)] : ['rowColor']),
    ];
    return excelExport.columns ?? convertDataGridColumnsToExportColumns(columns, ignoredFields);
  }, [columns, excelExport, rowColorField]);

  const showHeaderToolbar =
    showBuiltinHeaderToolbarActions || showExcelExportButton || headerToolbar != null;

  const headerToolbarContent = useMemo(() => {
    if (!showHeaderToolbar) {
      return null;
    }
    return (
      <>
        {showBuiltinHeaderToolbarActions ? (
          <DataGridHeaderToolbarBuiltinActions
            size={size}
            refetch={refetch}
            isRefetching={isRefetching}
            onResetFilters={onResetFilters}
            hasActiveFilters={hasActiveFilters}
            resetFiltersConfirmTexts={resetFiltersConfirmTexts}
          />
        ) : null}
        {showExcelExportButton && excelExport ? (
          <DataGridExcelExportButton<Row>
            size={size}
            totalCount={totalRows}
            pageSize={excelExportPageSize}
            currentPage={excelExportCurrentPage}
            gridColumns={columns}
            exportColumns={excelExportColumns}
            excelExport={excelExport}
          />
        ) : null}
        {headerToolbar}
      </>
    );
  }, [
    showHeaderToolbar,
    showBuiltinHeaderToolbarActions,
    showExcelExportButton,
    size,
    refetch,
    isRefetching,
    onResetFilters,
    hasActiveFilters,
    resetFiltersConfirmTexts,
    excelExport,
    excelExportPageSize,
    excelExportCurrentPage,
    totalRows,
    columns,
    excelExportColumns,
    headerToolbar,
  ]);

  /** Второй ряд липкой шапки (заголовки колонок) смещается ниже строки `headerToolbar`. */
  const rootStyleWithStickyToolbar =
    stickyHeader && showHeaderToolbar
      ? ({
          ...style,
          ['--plainer-sticky-thead-second-row-top' as string]:
            DATA_GRID_HEADER_TOOLBAR_STICKY_TOP_OFFSET,
        } as React.CSSProperties)
      : style;

  return (
    <DataGridRoot
      className={clsx(className)}
      style={rootStyleWithStickyToolbar}
      onDragEnd={() => {
        // Сброс при отпускании вне цели drop (нативный HTML5 DnD): `drop` не вызван — уведомляем об отмене
        setDragColFrom((previous) => {
          if (previous !== null) {
            onColumnDragCancel?.();
          }
          return null;
        });
        setDragColOverIndex(null);
        setDragColWidthPx(0);
        setDragRowFrom((previous) => {
          if (previous !== null) {
            onRowDragCancel?.();
          }
          return null;
        });
        setDragRowOverIndex(null);
        setDragRowHeightPx(0);
      }}
    >
      <TableContainer
        elevated={elevated}
        shellVariant={shellVariant}
        shellInset={shellInset}
        shellInsetPadding={shellInsetPadding}
        surfaceBackgrounds={surfaceBackgrounds}
      >
        <TableContainerScroll
          embeddedPaginationBelow={showPagination}
          scrollAreaMaxHeight={scrollAreaMaxHeight}
          horizontalScroll={horizontalScroll}
        >
          <Table
            id={tableId}
            size={tableSize}
            striped={striped}
            columnDividers={columnDividers}
            stickyHeader={stickyHeader}
            aria-label={tableAriaLabel}
            style={dataGridTableStyle}
          >
            <TableHead>
              {showHeaderToolbar ? (
                <TableRow {...{ [PLAINER_TABLE_HEADER_TOOLBAR_ROW_ATTRIBUTE]: true }}>
                  <TableCell
                    colSpan={colCount}
                    padding="none"
                    style={{ verticalAlign: 'middle', borderBottom: 'none' }}
                  >
                    <DataGridHeaderToolbarInner
                      $align={headerToolbarFlexAlign}
                      $background={resolvedHeaderToolbarBackground}
                      role="toolbar"
                      aria-label={headerToolbarAriaLabel ?? 'Дополнительные действия таблицы'}
                    >
                      {headerToolbarContent}
                    </DataGridHeaderToolbarInner>
                  </TableCell>
                </TableRow>
              ) : null}
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
                {displayColumns.map((col) => {
                  const colIndex = columns.indexOf(col);
                  const fieldStr = String(col.field);
                  const sortable = Boolean(col.sortable && onSortChange);
                  const sortCriterionIndex = getDataGridSortCriterionIndexForField(
                    displaySortCriteria,
                    fieldStr,
                  );
                  const headerSortActive = sortCriterionIndex >= 0;
                  const headerSortDirection = headerSortActive
                    ? (displaySortCriteria[sortCriterionIndex]?.direction ?? 'asc')
                    : false;
                  const rawCriterionIndex = getDataGridSortCriterionIndexForField(
                    rawSortCriteria,
                    fieldStr,
                  );
                  const headerSortPriority =
                    multiColumnSortEnabled &&
                    rawSortCriteria.length > 1 &&
                    rawCriterionIndex >= 0 &&
                    headerSortActive
                      ? rawCriterionIndex + 1
                      : undefined;
                  const mergedHeaderMaxLinesRaw =
                    col.headerMaxLines !== undefined ? col.headerMaxLines : headerMaxLines;
                  const columnHeaderClampLines =
                    normalizeTableHeaderMaxLines(mergedHeaderMaxLinesRaw);
                  const showResizeHandle = showColumnResizeUi && !col.disableResize;
                  const widthForCell =
                    columnResizePreview?.field === fieldStr
                      ? columnResizePreview.widthPx
                      : col.width;
                  const thStyle: React.CSSProperties = {};
                  if (widthForCell != null) {
                    thStyle.width = widthForCell;
                  }
                  if (col.minWidth != null) {
                    thStyle.minWidth = col.minWidth;
                  }
                  if (showResizeHandle) {
                    thStyle.position = 'relative';
                  }
                  const headerAlign: 'left' | 'center' | 'right' =
                    col.align === 'right' ? 'right' : col.align === 'center' ? 'center' : 'left';
                  const showFilterButton = Boolean(col.filterable && onColumnFilterClick);
                  const filterIconPosition = col.filterIconPosition ?? 'trailing';
                  return (
                    <TableCell
                      key={fieldStr}
                      align={headerAlign}
                      activeColumn={headerSortActive}
                      headerMaxLines={mergedHeaderMaxLinesRaw}
                      columnColor={columnBackgroundByField.get(fieldStr)}
                      style={buildColumnDragCellStyle(colIndex, thStyle)}
                      draggable={enableColumnDrag && !col.disableReorder}
                      onDragStart={(dragEvent: React.DragEvent<HTMLTableCellElement>) => {
                        if (!enableColumnDrag || col.disableReorder) {
                          return;
                        }
                        dragEvent.dataTransfer.effectAllowed = 'move';
                        applyDataGridColDragGhostPreview(dragEvent);
                        const width =
                          dragEvent.currentTarget instanceof HTMLElement
                            ? dragEvent.currentTarget.offsetWidth
                            : 0;
                        beginColDrag(colIndex, width);
                      }}
                      onDragOver={(dragEvent: React.DragEvent<HTMLTableCellElement>) =>
                        handleColDragOverTarget(colIndex, dragEvent)
                      }
                      onDrop={() => {
                        handleColDrop(colIndex);
                      }}
                    >
                      <DataGridColumnHeaderContent
                        field={fieldStr}
                        headerFallback={col.headerName ?? fieldStr}
                        sortable={sortable}
                        sortActive={headerSortActive}
                        sortDirection={headerSortDirection}
                        sortPriority={headerSortPriority}
                        onSortClick={() => {
                          handleSortClick(fieldStr, sortable);
                        }}
                        mergedHeaderMaxLinesRaw={mergedHeaderMaxLinesRaw}
                        columnHeaderClampLines={columnHeaderClampLines ?? null}
                        headerAlign={headerAlign}
                        showFilterButton={showFilterButton}
                        filterApplied={Boolean(col.filterApplied)}
                        filterIcon={col.filterIcon}
                        filterIconProps={col.filterIconProps}
                        filterIconPropsApplied={col.filterIconPropsApplied}
                        onColumnFilterClick={onColumnFilterClick}
                        filterIconPosition={filterIconPosition}
                      />
                      {showResizeHandle ? (
                        <DataGridColumnResizeHandle
                          type="button"
                          tabIndex={-1}
                          aria-label={`Изменить ширину колонки ${fieldStr}`}
                          data-datagrid-col-resize-handle="true"
                          onPointerDown={(pointerEvent: React.PointerEvent<HTMLButtonElement>) => {
                            const headerCell = pointerEvent.currentTarget.parentElement;
                            if (!(headerCell instanceof HTMLElement)) {
                              return;
                            }
                            handleColumnResizePointerDown(pointerEvent, col, headerCell);
                          }}
                          onPointerMove={handleColumnResizePointerMove}
                          onPointerUp={(pointerUpEvent: React.PointerEvent<HTMLButtonElement>) => {
                            endColumnResizeGesture(pointerUpEvent, true);
                          }}
                          onPointerCancel={(
                            pointerCancelEvent: React.PointerEvent<HTMLButtonElement>,
                          ) => {
                            endColumnResizeGesture(pointerCancelEvent, false);
                          }}
                        />
                      ) : null}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody aria-busy={isTableLoading || undefined}>
              {showStatusMessage ? (
                <TableRow>
                  <TableCell colSpan={colCount} padding="none" style={{ borderBottom: 'none' }}>
                    {statusMessageContent}
                  </TableCell>
                </TableRow>
              ) : null}
              {showErrorState ? (
                <TableRow>
                  <TableCell colSpan={colCount} padding="none" style={{ borderBottom: 'none' }}>
                    {errorStateContent}
                  </TableCell>
                </TableRow>
              ) : null}
              {showSkeletonBody ? (
                <DataGridSkeletonBody
                  rowCount={skeletonBodyRowCount}
                  columnCount={displayColumns.length}
                  tableSize={tableSize}
                  showSelectionColumn={displayRowSelectionColumn}
                  showExpandColumn={showExpandColumn}
                  showRowDragColumn={enableRowDrag}
                />
              ) : null}
              {showEmptyState ? (
                <TableRow>
                  <TableCell colSpan={colCount} padding="none" style={{ borderBottom: 'none' }}>
                    {emptyStateContent}
                  </TableCell>
                </TableRow>
              ) : null}
              {showDataRows
                ? visibleRows.map((row, rowIndex) => {
                    const rowId = getRowId(row);
                    const disabled = disabledSet.has(rowId);
                    const selected = selectedSet.has(rowId);
                    const rowBackgroundColor = resolveDataGridRowBackgroundColor(
                      row,
                      theme.colors,
                      {
                        rowBackgroundColorByStatus,
                        rowColorMap,
                        rowColorField,
                      },
                    );
                    const expandable = getRowExpandable?.(row) ?? false;
                    const expanded = expandedSet.has(rowId);
                    const expandedDataStatus = resolveDataGridExpandedRowDataStatus(row, {
                      getExpandedRowDataStatus,
                      getExpandedRowLoading,
                    });

                    const dragDisplacementPx =
                      enableRowDrag && dragRowFrom !== null
                        ? getDataGridRowDragDisplacementPx(
                            rowIndex,
                            dragRowFrom,
                            dragRowOverIndex,
                            dragRowHeightPx,
                          )
                        : 0;
                    const rowDragShiftStyle: React.CSSProperties | undefined =
                      enableRowDrag && dragRowFrom !== null
                        ? {
                            ...(dragDisplacementPx !== 0
                              ? { transform: `translateY(${dragDisplacementPx}px)` }
                              : {}),
                            transition: DATA_GRID_ROW_DRAG_SHIFT_TRANSITION,
                          }
                        : undefined;
                    const mergedRowStyle: React.CSSProperties | undefined = rowDragShiftStyle;

                    const cells = (
                      <>
                        {enableRowDrag ? (
                          <TableCell padding="checkbox">
                            <DataGridRowDragHandle
                              $disabled={disabled}
                              draggable={!disabled}
                              onDragStart={(dragEvent: React.DragEvent<HTMLSpanElement>) => {
                                dragEvent.dataTransfer.effectAllowed = 'move';
                                applyDataGridRowDragGhostPreview(dragEvent);
                                const sourceRow = dragEvent.currentTarget.closest('tr');
                                const sourceHeight =
                                  sourceRow instanceof HTMLElement ? sourceRow.offsetHeight : 0;
                                beginRowDrag(rowIndex, sourceHeight);
                              }}
                              aria-label="Перетащить строку"
                            >
                              {/* IconExDots — как в демо-колонке действий, без квадратной обводки у IconExMoreSquare */}
                              <Icon name="IconExDots" size={IconSize.SM} color="currentColor" />
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
                                onChange={(e) => {
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
                                  <Icon
                                    name="IconPlainerChevronDown"
                                    size={IconSize.SM}
                                    color="currentColor"
                                  />
                                </DataGridChevronWrap>
                              </DataGridExpandButton>
                            ) : null}
                          </TableCell>
                        ) : null}
                        {displayColumns.map((col) => {
                          const colIndex = columns.indexOf(col);
                          const fieldStr = String(col.field);
                          const widthForBodyCell =
                            columnResizePreview?.field === fieldStr
                              ? columnResizePreview.widthPx
                              : col.width;
                          const tdStyle: React.CSSProperties = {};
                          if (widthForBodyCell != null) {
                            tdStyle.width = widthForBodyCell;
                          }
                          if (col.minWidth != null) {
                            tdStyle.minWidth = col.minWidth;
                          }
                          return (
                            <TableCell
                              key={fieldStr}
                              align={
                                col.align === 'right'
                                  ? 'right'
                                  : col.align === 'center'
                                    ? 'center'
                                    : 'left'
                              }
                              columnColor={columnBackgroundByField.get(fieldStr)}
                              style={buildColumnDragCellStyle(colIndex, tdStyle)}
                              onDragOver={(dragEvent: React.DragEvent<HTMLTableCellElement>) =>
                                handleColDragOverTarget(colIndex, dragEvent)
                              }
                              onDrop={() => {
                                handleColDrop(colIndex);
                              }}
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
                        dragging={Boolean(enableRowDrag && dragRowFrom === rowIndex)}
                        rowColor={rowBackgroundColor}
                        style={mergedRowStyle}
                        onClick={(e) => {
                          onRowClick?.(row, e);
                        }}
                        onDoubleClick={(e) => {
                          onRowDoubleClick?.(row, e);
                        }}
                        onDragOver={(dragEvent: React.DragEvent<HTMLTableRowElement>) =>
                          handleBodyRowDragOver(rowIndex, dragEvent)
                        }
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
                        {expandable && renderExpandedRow ? (
                          <TableRow
                            data-datagrid-expanded-detail=""
                            style={{
                              ...(rowDragShiftStyle ?? {}),
                              borderBottom: expanded ? undefined : 'none',
                            }}
                            onDragOver={(dragEvent: React.DragEvent<HTMLTableRowElement>) =>
                              handleBodyRowDragOver(rowIndex, dragEvent)
                            }
                          >
                            <TableCell
                              colSpan={colCount}
                              padding="none"
                              style={{
                                backgroundColor: rowBackgroundColor,
                                verticalAlign: 'top',
                                padding: 0,
                              }}
                            >
                              <DataGridExpandedSlot $open={expanded}>
                                <DataGridExpandedInner
                                  $tableSize={tableSize}
                                  $open={expanded}
                                  aria-hidden={expanded ? undefined : true}
                                >
                                  {renderExpandedRowContent(row, expandedDataStatus)}
                                </DataGridExpandedInner>
                              </DataGridExpandedSlot>
                            </TableCell>
                          </TableRow>
                        ) : null}
                      </React.Fragment>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainerScroll>

        {showPagination && paginationModel ? (
          <TablePagination
            count={totalRows}
            page={paginationModel.page}
            rowsPerPage={paginationModel.pageSize}
            rowsPerPageOptions={rowsPerPageOptions}
            showRowsPerPageSelect={showRowsPerPageSelect}
            rowsPerPageSelectVariant={rowsPerPageSelectVariant}
            paginationVariant={paginationVariant}
            paginationToolbarAlign={paginationToolbarAlign}
            paginationToolbarReverse={paginationToolbarReverse}
            showPageJump={showPageJump}
            labelPageJump={labelPageJump}
            embeddedInTableCard
            onPageChange={(_e, pageZeroBased) => {
              onPaginationChange?.({ ...paginationModel, page: pageZeroBased });
            }}
            onRowsPerPageChange={(event) => {
              const nextPageSize = Number(event.target.value);
              onPaginationChange?.({ page: 0, pageSize: nextPageSize });
            }}
            size={size}
          />
        ) : null}
      </TableContainer>

      {showLoadingOverlay ? (
        <DataGridLoadingOverlay aria-busy="true" aria-live="polite">
          {renderLoadingOverlay?.() ?? (
            <Spinner variant={SpinnerVariant.DOTS} ariaLabel="Загрузка таблицы" />
          )}
        </DataGridLoadingOverlay>
      ) : null}
    </DataGridRoot>
  );
}

DataGrid.displayName = 'DataGrid';
