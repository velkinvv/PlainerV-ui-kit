import React from 'react';
import { clsx } from 'clsx';
import { TableBodyScrollProvider } from './TableBodyScrollContext';
import { TableHorizontalScrollProvider } from './TableHorizontalScrollContext';
import { resolveTableBodyScrollHost } from './tableBodyScrollHandlers';
import { TableContainerScrollClip, TableContainerScrollTrack } from './Table.style';
import { useTableContainerAppearance } from './TableContainerAppearanceContext';
import { useTableShellInset } from './TableShellInsetContext';

export interface TableContainerScrollProps {
  /** Обычно единственный потомок — `<Table>…</Table>`. */
  children: React.ReactNode;
  /** Класс на внешнем clip-слое. */
  className?: string;
  /**
   * `true`, если сразу после этой обёртки (внутри того же `TableContainer`) идёт `TablePagination`
   * с `embeddedInTableCard` — скругление только сверху у блока таблицы. Если футера нет — `false` или не передавайте,
   * чтобы снизу тоже применялся радиус карточки.
   */
  embeddedPaginationBelow?: boolean;
  /**
   * Макс. высота зоны прокрутки **только строк** (`tbody`), если включён `stickyHeader`.
   * Шапка и пагинация вне вертикального скролла. Число трактуется как пиксели.
   */
  scrollAreaMaxHeight?: string | number;
  /**
   * Горизонтальный скролл при широкой сетке (по умолчанию `true`).
   * `false` — колонки ужимаются по ширине контейнера, без горизонтальной полосы прокрутки.
   */
  horizontalScroll?: boolean;
}

/**
 * Двухслойная обёртка вокруг таблицы: clip по радиусу темы (`--plainer-table-border-radius`).
 * При `scrollAreaMaxHeight` и `stickyHeader` на `Table` / `DataGrid` — split-layout в `Table`:
 * шапка и `headerToolbar` вне вертикального скролла, горизонтальный скролл только у `tbody`,
 * синхронизация `scrollLeft` и ширин колонок между шапкой и телом.
 * Не кладите сюда `TablePagination` (тени футера).
 */
export function TableContainerScroll({
  children,
  className,
  embeddedPaginationBelow = false,
  scrollAreaMaxHeight,
  horizontalScroll = true,
}: TableContainerScrollProps): React.ReactElement {
  const { shellInset } = useTableShellInset();
  const { shellVariant } = useTableContainerAppearance();
  const bodyScrollHost = resolveTableBodyScrollHost(scrollAreaMaxHeight);
  const splitTablesScroll = bodyScrollHost === 'split-tables';

  return (
    <TableHorizontalScrollProvider horizontalScroll={horizontalScroll}>
      <TableBodyScrollProvider
        bodyScrollMaxHeight={scrollAreaMaxHeight}
        bodyScrollHost={bodyScrollHost}
        embeddedPaginationBelow={embeddedPaginationBelow}
      >
        <TableContainerScrollClip
          className={clsx(className)}
          $embeddedPaginationBelow={embeddedPaginationBelow}
          $shellInset={shellInset}
          $shellVariant={shellVariant}
        >
          <TableContainerScrollTrack
            $scrollAreaMaxHeight={scrollAreaMaxHeight}
            $bodyScrollHost={bodyScrollHost}
            $splitTablesScroll={splitTablesScroll}
            $horizontalScroll={horizontalScroll}
          >
            {children}
          </TableContainerScrollTrack>
        </TableContainerScrollClip>
      </TableBodyScrollProvider>
    </TableHorizontalScrollProvider>
  );
}

TableContainerScroll.displayName = 'TableContainerScroll';
