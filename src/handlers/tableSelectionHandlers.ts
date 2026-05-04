/**
 * Сводное состояние выбора строк (например, чекбокс «выбрать все» в шапке таблицы).
 */
export type TableSelectionAggregate = 'all' | 'none' | 'partial';

/**
 * Сводка выбора по списку id и множеству выбранных.
 * @param allIds - Все id строк текущей страницы или полного набора
 * @param selectedIds - Выбранные id
 */
export function getTableSelectionAggregate(
  allIds: readonly string[],
  selectedIds: ReadonlySet<string>,
): TableSelectionAggregate {
  if (!allIds?.length) {
    return 'none';
  }
  let selectedCount = 0;
  for (const id of allIds) {
    if (selectedIds.has(id)) {
      selectedCount += 1;
    }
  }
  if (selectedCount === 0) {
    return 'none';
  }
  if (selectedCount === allIds.length) {
    return 'all';
  }
  return 'partial';
}
