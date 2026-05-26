import React, { useMemo } from 'react';
import type { TableSize } from '@/types/ui';
import { Skeleton } from '../../Skeleton/Skeleton';
import { TableRow, TableCell } from '../basicTable';

/**
 * Параметры набора строк-скелетонов в `tbody`.
 *
 * @param rowCount — число строк-заглушек
 * @param columnCount — число колонок данных (без служебных)
 * @param tableSize — плотность строк таблицы
 * @param showSelectionColumn — колонка выбора
 * @param showExpandColumn — колонка раскрытия
 * @param showRowDragColumn — колонка перетаскивания строк
 */
export type DataGridSkeletonBodyProps = {
  rowCount: number;
  columnCount: number;
  tableSize: TableSize;
  showSelectionColumn?: boolean;
  showExpandColumn?: boolean;
  showRowDragColumn?: boolean;
};

const skeletonCellHeightByTableSize: Record<TableSize, number> = {
  sm: 14,
  md: 16,
};

const skeletonSelectionSizeByTableSize: Record<TableSize, number> = {
  sm: 16,
  md: 18,
};

/**
 * Строки-скелетоны на время первичной загрузки (`loadingDisplay="skeleton"`).
 */
export function DataGridSkeletonBody({
  rowCount,
  columnCount,
  tableSize,
  showSelectionColumn = false,
  showExpandColumn = false,
  showRowDragColumn = false,
}: DataGridSkeletonBodyProps): React.ReactElement {
  const cellHeight = skeletonCellHeightByTableSize[tableSize];
  const selectionSize = skeletonSelectionSizeByTableSize[tableSize];

  const rowKeys = useMemo(
    () => Array.from({ length: rowCount }, (_, index) => `data-grid-skeleton-row-${index}`),
    [rowCount],
  );

  return (
    <>
      {rowKeys.map((rowKey) => (
        <TableRow key={rowKey} aria-hidden>
          {showRowDragColumn ? (
            <TableCell padding="checkbox">
              <Skeleton width={selectionSize} height={selectionSize} animated ariaLabel="" />
            </TableCell>
          ) : null}
          {showSelectionColumn ? (
            <TableCell padding="checkbox">
              <Skeleton
                width={selectionSize}
                height={selectionSize}
                shape="rect"
                animated
                ariaLabel=""
              />
            </TableCell>
          ) : null}
          {showExpandColumn ? (
            <TableCell padding="checkbox">
              <Skeleton width={selectionSize} height={selectionSize} animated ariaLabel="" />
            </TableCell>
          ) : null}
          {Array.from({ length: columnCount }, (_, columnIndex) => (
            <TableCell key={`${rowKey}-col-${columnIndex}`}>
              <Skeleton width="72%" height={cellHeight} animated ariaLabel="" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

DataGridSkeletonBody.displayName = 'DataGridSkeletonBody';
