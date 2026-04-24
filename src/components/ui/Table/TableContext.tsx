import React, { createContext, useContext } from 'react';
import type { TableCellVariant, TableSize } from '@/types/ui';

/** Секция таблицы: влияет на тег ячейки по умолчанию (`th` в шапке). */
export type TableSection = 'head' | 'body' | 'footer';

type TableRootContextValue = {
  size: TableSize;
  striped: boolean;
  stickyHeader: boolean;
};

const TableRootContext = createContext<TableRootContextValue | null>(null);

const TableSectionContext = createContext<TableSection>('body');

/**
 * Контекст корневой таблицы: размер, зебра, липкая шапка.
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
 * Провайдер секции (`thead` / `tbody` / `tfoot`).
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
 * Текущая секция таблицы для наследования `th`/`td`.
 */
export function useTableSection(): TableSection {
  return useContext(TableSectionContext);
}

/**
 * Сводка для `TableCell`: секция + явный `variant` из пропсов.
 */
export function resolveTableCellVariant(
  section: TableSection,
  variant: TableCellVariant | undefined,
): TableCellVariant {
  return variant ?? section;
}
