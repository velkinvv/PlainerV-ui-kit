import React, { createContext, useContext, useMemo } from 'react';
import type { TableShellVariant, TableSurfaceBackgroundsInput } from '@/types/ui';
import {
  normalizeTableSurfaceBackgrounds,
  type NormalizedTableSurfaceBackgrounds,
} from './tableSurfaceBackgroundHandlers';

/** Значение контекста внешнего вида оболочки и фонов таблицы */
export type TableContainerAppearanceContextValue = {
  shellVariant: TableShellVariant;
  surfaceBackgrounds: NormalizedTableSurfaceBackgrounds;
};

const defaultTableContainerAppearanceContextValue: TableContainerAppearanceContextValue = {
  shellVariant: 'card',
  surfaceBackgrounds: normalizeTableSurfaceBackgrounds(),
};

const TableContainerAppearanceContext = createContext<TableContainerAppearanceContextValue>(
  defaultTableContainerAppearanceContextValue,
);

/**
 * Провайдер `shellVariant` и прозрачных фонов для `TableContainer`, `Table` и `TablePagination`.
 *
 * @param shellVariant — `card` (бордер и карточка) или `embedded` (без бордера, для вложения в другой UI)
 * @param surfaceBackgrounds — по поверхностям или `'transparent'` для всех
 */
export function TableContainerAppearanceProvider({
  shellVariant = 'card',
  surfaceBackgrounds,
  children,
}: {
  shellVariant?: TableShellVariant;
  surfaceBackgrounds?: TableSurfaceBackgroundsInput;
  children: React.ReactNode;
}): React.ReactElement {
  const value = useMemo(
    (): TableContainerAppearanceContextValue => ({
      shellVariant,
      surfaceBackgrounds: normalizeTableSurfaceBackgrounds(surfaceBackgrounds),
    }),
    [shellVariant, surfaceBackgrounds],
  );

  return (
    <TableContainerAppearanceContext.Provider value={value}>
      {children}
    </TableContainerAppearanceContext.Provider>
  );
}

/**
 * Читает настройки оболочки и фонов из ближайшего `TableContainer` / `TableContainerAppearanceProvider`.
 */
export function useTableContainerAppearance(): TableContainerAppearanceContextValue {
  return useContext(TableContainerAppearanceContext);
}
