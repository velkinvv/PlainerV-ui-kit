import React, { forwardRef, useMemo, useRef } from 'react';
import type { TableProps } from '@/types/ui';
import { StyledTable } from './Table.style';
import {
  TableBodyScrollSplitBodyInner,
  TableBodyScrollSplitBodyTrackVertical,
  TableBodyScrollSplitHeader,
  TableBodyScrollSplitHeaderInner,
  TableBodyScrollSplitHeaderToolbar,
  TableBodyScrollSplitRoot,
} from './TableBodyScrollSplitLayout.style';
import type { PartitionedTableChildren } from './tablePartitionChildrenHandlers';
import {
  partitionTableHeadForSplitScroll,
  type TableHeadSectionProps,
} from './tablePartitionHeadRowsHandlers';
import {
  useTableSplitColumnWidthSync,
  useTableSplitHorizontalScrollSync,
  useTableSplitScrollbarGutterSync,
} from './tableBodySplitScrollSyncHooks';
import { shouldMeasureTableBodyNaturalColumnWidths } from './tableBodyScrollHandlers';
import { useTableBodyScroll } from './TableBodyScrollContext';
import { useTableContainerAppearance } from './TableContainerAppearanceContext';
import { useTableShellInset } from './TableShellInsetContext';
import { resolveTableScrollClipCornerMode } from './tableScrollClipCornerRadiusHandlers';
import type { NormalizedTableSurfaceBackgrounds } from './tableSurfaceBackgroundHandlers';

/**
 * Split-layout: шапка фиксирована, скролл (Y и X) только у блока строк.
 * @param partitionedChildren — шапка, тело и прочие секции таблицы
 * @param bodyScrollMaxHeight — макс. высота зоны строк
 * @param horizontalScroll — горизонтальный скролл широкой сетки
 * @param tableProps — пропсы корневой таблицы (`size`, `striped`, `id`, …)
 * @param resolvedSurfaces — нормализованные фоны поверхностей
 */
export const TableBodyScrollSplitLayout = forwardRef<
  HTMLTableElement,
  {
    partitionedChildren: PartitionedTableChildren;
    bodyScrollMaxHeight: string | number;
    horizontalScroll?: boolean;
    tableProps: TableProps & {
      $stickyHeader: boolean;
      $striped: boolean;
      $surfaces?: NormalizedTableSurfaceBackgrounds;
      $horizontalScroll?: boolean;
      $splitTablesScroll?: boolean;
    };
    resolvedSurfaces?: NormalizedTableSurfaceBackgrounds;
  }
>(function TableBodyScrollSplitLayout(
  {
    partitionedChildren,
    bodyScrollMaxHeight,
    horizontalScroll = true,
    tableProps,
    resolvedSurfaces,
  },
  ref,
) {
  const splitRootRef = useRef<HTMLDivElement | null>(null);
  const bodyScrollTrackRef = useRef<HTMLDivElement | null>(null);
  const headerColumnsScrollRef = useRef<HTMLDivElement | null>(null);
  const headerTableRef = useRef<HTMLTableElement | null>(null);
  const bodyTableRef = useRef<HTMLTableElement | null>(null);

  const partitionedHead = useMemo(
    () =>
      partitionedChildren.head != null
        ? partitionTableHeadForSplitScroll(
            partitionedChildren.head as React.ReactElement<TableHeadSectionProps>,
          )
        : { toolbarHead: null, columnHeaderHead: null },
    [partitionedChildren.head],
  );

  const assignHeaderTableRef = (tableElement: HTMLTableElement | null): void => {
    headerTableRef.current = tableElement;
    if (typeof ref === 'function') {
      ref(tableElement);
      return;
    }
    if (ref) {
      ref.current = tableElement;
    }
  };

  const measureNaturalColumnWidths = shouldMeasureTableBodyNaturalColumnWidths(horizontalScroll);
  const { shellVariant } = useTableContainerAppearance();
  const { shellInset } = useTableShellInset();
  const tableBodyScroll = useTableBodyScroll();
  const embeddedPaginationBelow = tableBodyScroll?.embeddedPaginationBelow ?? false;
  const headerCornerMode = resolveTableScrollClipCornerMode(
    shellVariant,
    shellInset,
    embeddedPaginationBelow,
    'header',
  );
  const bodyCornerMode = resolveTableScrollClipCornerMode(
    shellVariant,
    shellInset,
    embeddedPaginationBelow,
    'body',
  );

  const splitTableProps = {
    ...tableProps,
    $splitTablesScroll: true,
  };

  useTableSplitScrollbarGutterSync(splitRootRef, bodyScrollTrackRef, true);
  useTableSplitColumnWidthSync(
    headerTableRef,
    bodyTableRef,
    bodyScrollTrackRef,
    true,
    measureNaturalColumnWidths,
  );
  useTableSplitHorizontalScrollSync(headerColumnsScrollRef, bodyScrollTrackRef, horizontalScroll);

  const {
    className,
    style,
    id,
    'aria-label': ariaLabel,
    $striped,
    $horizontalScroll,
    $stickyHeader: _omittedStickyHeader,
    $splitTablesScroll: _omittedSplitTablesScroll,
    ...nativeTableProps
  } = splitTableProps;

  return (
    <TableBodyScrollSplitRoot ref={splitRootRef} className={className} style={style}>
      {partitionedHead.toolbarHead != null || partitionedHead.columnHeaderHead != null ? (
        <TableBodyScrollSplitHeader $surfaces={resolvedSurfaces} $cornerMode={headerCornerMode}>
          {partitionedHead.toolbarHead != null ? (
            <TableBodyScrollSplitHeaderToolbar>
              <StyledTable
                {...nativeTableProps}
                id={id != null ? `${id}-header-toolbar` : undefined}
                className={className}
                style={style}
                $stickyHeader={false}
                $striped={$striped}
                $surfaces={resolvedSurfaces}
                $horizontalScroll={false}
                $splitTablesScroll
                $splitHeaderRole="toolbar"
              >
                {partitionedHead.toolbarHead}
              </StyledTable>
            </TableBodyScrollSplitHeaderToolbar>
          ) : null}
          {partitionedHead.columnHeaderHead != null ? (
            <TableBodyScrollSplitHeaderInner ref={headerColumnsScrollRef}>
              <StyledTable
                {...nativeTableProps}
                ref={assignHeaderTableRef}
                id={id}
                aria-label={ariaLabel}
                className={className}
                style={style}
                $stickyHeader={false}
                $striped={$striped}
                $surfaces={resolvedSurfaces}
                $horizontalScroll={$horizontalScroll}
                $splitTablesScroll
                $splitHeaderRole="columns"
              >
                {partitionedHead.columnHeaderHead}
              </StyledTable>
            </TableBodyScrollSplitHeaderInner>
          ) : null}
        </TableBodyScrollSplitHeader>
      ) : null}

      {partitionedChildren.body != null ? (
        <TableBodyScrollSplitBodyTrackVertical
          ref={bodyScrollTrackRef}
          $bodyScrollMaxHeight={bodyScrollMaxHeight}
          $horizontalScroll={horizontalScroll}
          $cornerMode={bodyCornerMode}
        >
          <TableBodyScrollSplitBodyInner>
            <StyledTable
              {...nativeTableProps}
              ref={bodyTableRef}
              className={className}
              style={style}
              $stickyHeader={false}
              $striped={$striped}
              $surfaces={resolvedSurfaces}
              $horizontalScroll={$horizontalScroll}
              $splitTablesScroll
            >
              {partitionedChildren.body}
            </StyledTable>
          </TableBodyScrollSplitBodyInner>
        </TableBodyScrollSplitBodyTrackVertical>
      ) : null}

      {partitionedChildren.other}
    </TableBodyScrollSplitRoot>
  );
});

TableBodyScrollSplitLayout.displayName = 'TableBodyScrollSplitLayout';
