import React, { createContext, useContext } from 'react';
import type { TableCellVariant, TableSize } from '@/types/ui';

/** ╨б╨╡╨║╤Ж╨╕╤П ╤В╨░╨▒╨╗╨╕╤Ж╤Л: ╨▓╨╗╨╕╤П╨╡╤В ╨╜╨░ ╤В╨╡╨│ ╤П╤З╨╡╨╣╨║╨╕ ╨┐╨╛ ╤Г╨╝╨╛╨╗╤З╨░╨╜╨╕╤О (`th` ╨▓ ╤И╨░╨┐╨║╨╡). */
export type TableSection = 'head' | 'body' | 'footer';

type TableRootContextValue = {
  size: TableSize;
  striped: boolean;
  stickyHeader: boolean;
};

const TableRootContext = createContext<TableRootContextValue | null>(null);

const TableSectionContext = createContext<TableSection>('body');

/**
 * ╨Ъ╨╛╨╜╤В╨╡╨║╤Б╤В ╨║╨╛╤А╨╜╨╡╨▓╨╛╨╣ ╤В╨░╨▒╨╗╨╕╤Ж╤Л: ╤А╨░╨╖╨╝╨╡╤А, ╨╖╨╡╨▒╤А╨░, ╨╗╨╕╨┐╨║╨░╤П ╤И╨░╨┐╨║╨░.
 */
export function TableRootProvider({
  value,
  children,
}: {
  value: TableRootContextValue;
  children: React.ReactNode;
}): React.ReactElement {
  return <TableRootContext.Provider value={value}>{children}</TableRootContext.Provider>;
}

export function useTableRootContext(): TableRootContextValue {
  const ctx = useContext(TableRootContext);
  if (!ctx) {
    return { size: 'md', striped: false, stickyHeader: false };
  }
  return ctx;
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
