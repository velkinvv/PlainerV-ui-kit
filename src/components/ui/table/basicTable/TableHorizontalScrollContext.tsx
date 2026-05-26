import React, { createContext, useContext, useMemo } from 'react';

/** Настройки горизонтальной прокрутки сетки */
export type TableHorizontalScrollContextValue = {
  /**
   * `true` — при широкой таблице горизонтальный скролл в `TableContainerScrollTrack`.
   * `false` — колонки сжимаются по ширине контейнера (без горизонтального скролла).
   */
  horizontalScroll: boolean;
};

const defaultTableHorizontalScrollContextValue: TableHorizontalScrollContextValue = {
  horizontalScroll: true,
};

const TableHorizontalScrollContext = createContext<TableHorizontalScrollContextValue>(
  defaultTableHorizontalScrollContextValue,
);

/**
 * Провайдер флага горизонтального скролла для `TableContainerScroll` и `Table`.
 * @param horizontalScroll — по умолчанию `true`
 */
export function TableHorizontalScrollProvider({
  horizontalScroll = true,
  children,
}: {
  horizontalScroll?: boolean;
  children: React.ReactNode;
}): React.ReactElement {
  const value = useMemo(
    (): TableHorizontalScrollContextValue => ({
      horizontalScroll,
    }),
    [horizontalScroll],
  );

  return (
    <TableHorizontalScrollContext.Provider value={value}>
      {children}
    </TableHorizontalScrollContext.Provider>
  );
}

/** Читает флаг горизонтального скролла из `TableContainerScroll`. */
export function useTableHorizontalScroll(): TableHorizontalScrollContextValue {
  return useContext(TableHorizontalScrollContext);
}
