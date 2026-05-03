import React from 'react';
import { clsx } from 'clsx';
import { TableContainerScrollClip, TableContainerScrollTrack } from './Table.style';

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
}

/**
 * Двухслойная обёртка вокруг таблицы: clip по радиусу темы, горизонтальный скролл — внутри.
 * Не кладите сюда `TablePagination` (тени футера).
 */
export function TableContainerScroll({
  children,
  className,
  embeddedPaginationBelow = false,
}: TableContainerScrollProps): React.ReactElement {
  return (
    <TableContainerScrollClip
      className={clsx(className)}
      $embeddedPaginationBelow={embeddedPaginationBelow}
    >
      <TableContainerScrollTrack>{children}</TableContainerScrollTrack>
    </TableContainerScrollClip>
  );
}

TableContainerScroll.displayName = 'TableContainerScroll';
