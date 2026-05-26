import React, { createContext, useContext, useMemo } from 'react';
import type { TableBodyScrollHost } from './tableBodyScrollHandlers';

/** Параметры вертикального скролла таблицы из `TableContainerScroll`. */
export type TableBodyScrollContextValue = {
  /** Макс. высота прокручиваемой области (число — px) */
  bodyScrollMaxHeight?: string | number;
  /** `split-tables` — шапка и тело в отдельных таблицах, скролл только у блока строк */
  bodyScrollHost?: TableBodyScrollHost;
  /** Как у `TableContainerScroll.embeddedPaginationBelow` — скругление только сверху у сетки */
  embeddedPaginationBelow?: boolean;
};

const TableBodyScrollContext = createContext<TableBodyScrollContextValue | null>(null);

/**
 * Задаёт режим скролла для вложенной `Table`.
 * @param bodyScrollMaxHeight — то же значение, что `TableContainerScroll.scrollAreaMaxHeight`
 * @param bodyScrollHost — где прокрутка при лимите высоты
 */
export function TableBodyScrollProvider({
  bodyScrollMaxHeight,
  bodyScrollHost,
  embeddedPaginationBelow,
  children,
}: {
  bodyScrollMaxHeight?: string | number;
  bodyScrollHost?: TableBodyScrollHost;
  embeddedPaginationBelow?: boolean;
  children: React.ReactNode;
}): React.ReactElement {
  const value = useMemo(
    (): TableBodyScrollContextValue => ({
      bodyScrollMaxHeight,
      bodyScrollHost,
      embeddedPaginationBelow,
    }),
    [bodyScrollMaxHeight, bodyScrollHost, embeddedPaginationBelow],
  );

  return <TableBodyScrollContext.Provider value={value}>{children}</TableBodyScrollContext.Provider>;
}

/** Читает настройки скролла таблицы из `TableContainerScroll`. */
export function useTableBodyScroll(): TableBodyScrollContextValue | null {
  return useContext(TableBodyScrollContext);
}
