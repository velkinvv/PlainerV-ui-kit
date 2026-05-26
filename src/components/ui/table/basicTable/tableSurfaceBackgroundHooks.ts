import { useMemo } from 'react';
import type { TableSurfaceBackgroundsInput } from '@/types/ui';
import { useTableContainerAppearance } from './TableContainerAppearanceContext';
import {
  normalizeTableSurfaceBackgrounds,
  type NormalizedTableSurfaceBackgrounds,
} from './tableSurfaceBackgroundHandlers';

/**
 * Итоговые флаги прозрачности: проп компонента или контекст `TableContainer`.
 * @param override — `surfaceBackgrounds` с `Table` / `DataGrid`
 */
export function useResolvedTableSurfaceBackgrounds(
  override?: TableSurfaceBackgroundsInput,
): NormalizedTableSurfaceBackgrounds {
  const { surfaceBackgrounds: containerSurfaces } = useTableContainerAppearance();

  return useMemo(
    () => normalizeTableSurfaceBackgrounds(override ?? containerSurfaces),
    [override, containerSurfaces],
  );
}
