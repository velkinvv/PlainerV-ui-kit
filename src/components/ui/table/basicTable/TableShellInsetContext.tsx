import React, { createContext, useContext, useMemo } from 'react';

/** Значение контекста режима `shellInset` у `TableContainer` */
export type TableShellInsetContextValue = {
  /** Включён ли отступ сетки от рамки карточки */
  shellInset: boolean;
};

const defaultTableShellInsetContextValue: TableShellInsetContextValue = {
  shellInset: false,
};

const TableShellInsetContext = createContext<TableShellInsetContextValue>(
  defaultTableShellInsetContextValue,
);

/**
 * Провайдер режима внутренних отступов оболочки таблицы.
 * @param shellInset — активен ли режим
 * @param children — `TableContainerScroll`, `TablePagination`, …
 */
export function TableShellInsetProvider({
  shellInset,
  children,
}: {
  shellInset: boolean;
  children: React.ReactNode;
}): React.ReactElement {
  const value = useMemo((): TableShellInsetContextValue => ({ shellInset }), [shellInset]);
  return <TableShellInsetContext.Provider value={value}>{children}</TableShellInsetContext.Provider>;
}

/**
 * Читает флаг `shellInset` из ближайшего `TableContainer`.
 */
export function useTableShellInset(): TableShellInsetContextValue {
  return useContext(TableShellInsetContext);
}
