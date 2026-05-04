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
  /**
   * Макс. высота зоны с вертикальным скроллом внутри трека (`TableContainerScrollTrack`).
   * Нужно для липкой шапки: без этого внешний контейнер с `overflow: auto` и трек с `overflow-x: auto`
   * дают неверный scroll-ancestor для `position: sticky`. Число трактуется как пиксели.
   */
  scrollAreaMaxHeight?: string | number;
}

/**
 * Двухслойная обёртка вокруг таблицы: clip по радиусу темы, горизонтальный скролл — внутри.
 * Не кладите сюда `TablePagination` (тени футера).
 */
export function TableContainerScroll({
  children,
  className,
  embeddedPaginationBelow = false,
  scrollAreaMaxHeight,
}: TableContainerScrollProps): React.ReactElement {
  return (
    <TableContainerScrollClip
      className={clsx(className)}
      $embeddedPaginationBelow={embeddedPaginationBelow}
    >
      <TableContainerScrollTrack $scrollAreaMaxHeight={scrollAreaMaxHeight}>{children}</TableContainerScrollTrack>
    </TableContainerScrollClip>
  );
}

TableContainerScroll.displayName = 'TableContainerScroll';
