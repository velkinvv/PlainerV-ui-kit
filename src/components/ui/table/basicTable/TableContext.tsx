import React, { createContext, useContext } from 'react';
import type { TableCellVariant, TableColumnColorMap, TableRowColorMap, TableSize } from '@/types/ui';

/** Секция таблицы: влияет на тег ячеек по умолчанию (`th` в шапке). */
export type TableSection = 'head' | 'body' | 'footer';

type TableRootContextValue<
  RowColorKey extends string = string,
  ColumnColorKey extends string = string,
> = {
  size: TableSize;
  striped: boolean;
  stickyHeader: boolean;
  /** Тонкая вертикальная граница между колонками (кроме последней ячейки в строке) */
  columnDividers: boolean;
  /** Карта цветов фона строк из пропса `Table rowColorMap` */
  rowColorMap?: TableRowColorMap<RowColorKey>;
  /** Карта цветов фона колонок из пропса `Table columnColorMap` */
  columnColorMap?: TableColumnColorMap<ColumnColorKey>;
};

const TableRootContext = createContext<TableRootContextValue | null>(null);

const TableSectionContext = createContext<TableSection>('body');

/**
 * ╨Ъ╨╛╨╜╤В╨╡╨║╤Б╤В ╨║╨╛╤А╨╜╨╡╨▓╨╛╨╣ ╤В╨░╨▒╨╗╨╕╤Ж╤Л: ╤А╨░╨╖╨╝╨╡╤А, ╨╖╨╡╨▒╤А╨░, ╨╗╨╕╨┐╨║╨░╤П ╤И╨░╨┐╨║╨░.
 */
export function TableRootProvider<
  RowColorKey extends string = string,
  ColumnColorKey extends string = string,
>({
  value,
  children,
}: {
  value: TableRootContextValue<RowColorKey, ColumnColorKey>;
  children: React.ReactNode;
}): React.ReactElement {
  return <TableRootContext.Provider value={value}>{children}</TableRootContext.Provider>;
}

export function useTableRootContext<
  RowColorKey extends string = string,
  ColumnColorKey extends string = string,
>(): TableRootContextValue<RowColorKey, ColumnColorKey> {
  const contextValue = useContext(TableRootContext);
  if (!contextValue) {
    return { size: 'md', striped: false, stickyHeader: false, columnDividers: true };
  }
  return contextValue as TableRootContextValue<RowColorKey, ColumnColorKey>;
}

/**
 * ╨Я╤А╨╛╨▓╨░╨╣╨┤╨╡╤А ╤Б╨╡╨║╤Ж╨╕╨╕ (`thead` / `tbody` / `tfoot`).
 */
export function TableSectionProvider({
  section,
  children,
}: {
  section: TableSection;
  children: React.ReactNode;
}): React.ReactElement {
  return <TableSectionContext.Provider value={section}>{children}</TableSectionContext.Provider>;
}

/**
 * ╨в╨╡╨║╤Г╤Й╨░╤П ╤Б╨╡╨║╤Ж╨╕╤П ╤В╨░╨▒╨╗╨╕╤Ж╤Л ╨┤╨╗╤П ╨╜╨░╤Б╨╗╨╡╨┤╨╛╨▓╨░╨╜╨╕╤П `th`/`td`.
 */
export function useTableSection(): TableSection {
  return useContext(TableSectionContext);
}

/**
 * ╨б╨▓╨╛╨┤╨║╨░ ╨┤╨╗╤П `TableCell`: ╤Б╨╡╨║╤Ж╨╕╤П + ╤П╨▓╨╜╤Л╨╣ `variant` ╨╕╨╖ ╨┐╤А╨╛╨┐╤Б╨╛╨▓.
 */
export function resolveTableCellVariant(
  section: TableSection,
  variant: TableCellVariant | undefined,
): TableCellVariant {
  return variant ?? section;
}
