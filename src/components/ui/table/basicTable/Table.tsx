import React, { forwardRef, useCallback, useMemo, useRef } from 'react';
import type { TableProps } from '@/types/ui';
import { StyledTable } from './Table.style';
import { TableBodyScrollSplitLayout } from './TableBodyScrollSplitLayout';
import { useTableBodyScroll } from './TableBodyScrollContext';
import { useTableHorizontalScroll } from './TableHorizontalScrollContext';
import { TableRootProvider } from './TableContext';
import { partitionTableChildren } from './tablePartitionChildrenHandlers';
import {
  shouldUseTableBodyColumnWidthSync,
  shouldUseTableBodyOnlyVerticalScroll,
} from './tableBodyScrollHandlers';
import { useTableBodyColumnWidthSync } from './tableBodyColumnWidthSyncHooks';
import { useTableBodyScrollbarGutterSync } from './tableBodyScrollbarGutterHooks';
import { useResolvedTableSurfaceBackgrounds } from './tableSurfaceBackgroundHooks';

/**
 * Корневая `<table>` с контекстом размера и зебры для строк.
 * @param props.stickyHeader — фиксированная шапка при `scrollAreaMaxHeight` (split-layout)
 * @param props.size — плотность ячеек (`sm` | `md`)
 * @param props.striped — зебра по строкам в `tbody`
 * @param props.rowColorMap — карта ключ → цвет; в `TableRow` передаётся `rowColorKey`
 * @param props.columnColorMap — карта ключ → цвет; в `TableCell` передаётся `columnColorKey`
 * @param props.surfaceBackgrounds — прозрачные фоны (переопределяет `TableContainer`)
 * @param props.className — CSS-класс
 * @param props.children — секции `TableHead`, `TableBody`, …
 */
function TableInner<
  RowColorKey extends string = string,
  ColumnColorKey extends string = string,
>(
  {
    stickyHeader = false,
    size = 'md',
    striped = false,
    columnDividers = true,
    surfaceBackgrounds,
    rowColorMap,
    columnColorMap,
    className,
    children,
    style,
    ...rest
  }: TableProps<RowColorKey, ColumnColorKey>,
  ref: React.ForwardedRef<HTMLTableElement>,
) {
    const resolvedSurfaces = useResolvedTableSurfaceBackgrounds(surfaceBackgrounds);
    const tableBodyScroll = useTableBodyScroll();
    const { horizontalScroll } = useTableHorizontalScroll();

    const splitScrollEnabled =
      shouldUseTableBodyOnlyVerticalScroll(stickyHeader, tableBodyScroll?.bodyScrollMaxHeight) &&
      tableBodyScroll?.bodyScrollHost === 'split-tables';

    const bodyScrollMaxHeight = splitScrollEnabled
      ? tableBodyScroll?.bodyScrollMaxHeight
      : undefined;

    const partitionedChildren = useMemo(
      () => (splitScrollEnabled ? partitionTableChildren(children) : null),
      [children, splitScrollEnabled],
    );

    const tableElementRef = useRef<HTMLTableElement | null>(null);
    const legacyBodyScrollOnTbody = bodyScrollMaxHeight != null && !splitScrollEnabled;

    useTableBodyScrollbarGutterSync(tableElementRef, legacyBodyScrollOnTbody);
    useTableBodyColumnWidthSync(
      tableElementRef,
      shouldUseTableBodyColumnWidthSync(legacyBodyScrollOnTbody),
      horizontalScroll,
    );

    const assignTableRef = useCallback(
      (tableElement: HTMLTableElement | null) => {
        tableElementRef.current = tableElement;
        if (typeof ref === 'function') {
          ref(tableElement);
          return;
        }
        if (ref) {
          ref.current = tableElement;
        }
      },
      [ref],
    );

    const ctx = useMemo(
      () => ({ size, striped, stickyHeader, columnDividers, rowColorMap, columnColorMap }),
      [size, striped, stickyHeader, columnDividers, rowColorMap, columnColorMap],
    );

    const styledTableProps = {
      className,
      style,
      $stickyHeader: stickyHeader,
      $striped: striped,
      $surfaces: resolvedSurfaces,
      /** Только для legacy tbody-scroll; в split-layout не передаём — иначе второй вертикальный скролл на `tbody`. */
      $bodyScrollMaxHeight: splitScrollEnabled ? undefined : bodyScrollMaxHeight,
      $horizontalScroll: horizontalScroll,
      ...rest,
    };

    if (
      splitScrollEnabled &&
      partitionedChildren != null &&
      bodyScrollMaxHeight != null &&
      bodyScrollMaxHeight !== ''
    ) {
      return (
        <TableRootProvider value={ctx}>
          <TableBodyScrollSplitLayout
            ref={ref}
            partitionedChildren={partitionedChildren}
            bodyScrollMaxHeight={bodyScrollMaxHeight}
            horizontalScroll={horizontalScroll}
            tableProps={styledTableProps}
            resolvedSurfaces={resolvedSurfaces}
          />
        </TableRootProvider>
      );
    }

    return (
      <TableRootProvider value={ctx}>
        <StyledTable ref={assignTableRef} {...styledTableProps}>
          {children}
        </StyledTable>
      </TableRootProvider>
    );
}

TableInner.displayName = 'Table';

export const Table = forwardRef(TableInner) as <
  RowColorKey extends string = string,
  ColumnColorKey extends string = string,
>(
  props: TableProps<RowColorKey, ColumnColorKey> & { ref?: React.Ref<HTMLTableElement> },
) => React.ReactElement;
