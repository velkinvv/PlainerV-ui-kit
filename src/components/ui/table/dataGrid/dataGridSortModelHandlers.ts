import type { DataGridSortCriterion, DataGridSortModel } from '@/types/ui';

function isDataGridSortCriterionList(
  value: DataGridSortCriterion | readonly DataGridSortCriterion[],
): value is readonly DataGridSortCriterion[] {
  return Array.isArray(value);
}

/**
 * Приводит модель сортировки к массиву критериев (порядок = приоритет).
 * @param model — одно поле, массив полей или отсутствие сортировки
 */
export function normalizeDataGridSortModel(
  model: DataGridSortModel | null | undefined,
): DataGridSortCriterion[] {
  if (model == null) {
    return [];
  }
  if (isDataGridSortCriterionList(model)) {
    return model.slice();
  }
  return [model];
}

/**
 * Индекс критерия по полю или -1.
 * @param criteria — нормализованный список
 * @param field — `columns[].field`
 */
export function getDataGridSortCriterionIndexForField(
  criteria: readonly DataGridSortCriterion[],
  field: string,
): number {
  return criteria.findIndex((item) => item.field === field);
}

export type ResolveNextDataGridSortModelParams = {
  /** Текущая модель из пропсов грида */
  current: DataGridSortModel | null | undefined;
  /** Поле заголовка, по которому кликнули */
  field: string;
  /** Несколько полей в модели и цикл asc → desc → снять для каждого */
  multiColumnSort: boolean;
};

/**
 * Следующая модель сортировки после клика по заголовку колонки.
 * Одиночный режим: всегда одно поле, переключение asc ↔ desc по тому же полю, смена поля — новая сортировка asc.
 * Мульти: добавление asc, затем desc, затем исключение поля из списка; пустой список → `null`.
 */
export function resolveNextDataGridSortModel(
  params: ResolveNextDataGridSortModelParams,
): DataGridSortModel {
  const { current, field, multiColumnSort } = params;
  const list = normalizeDataGridSortModel(current);
  const index = getDataGridSortCriterionIndexForField(list, field);

  if (!multiColumnSort) {
    if (index === 0 && list[0]?.field === field) {
      const currentDirection = list[0].direction;
      return { field, direction: currentDirection === 'asc' ? 'desc' : 'asc' };
    }
    return { field, direction: 'asc' };
  }

  if (index === -1) {
    return [...list, { field, direction: 'asc' }];
  }

  const existing = list[index];
  if (!existing) {
    return [...list, { field, direction: 'asc' }];
  }

  if (existing.direction === 'asc') {
    return list.map((item, itemIndex) =>
      itemIndex === index ? { ...item, direction: 'desc' as const } : item,
    );
  }

  const filtered = list.filter((_, itemIndex) => itemIndex !== index);
  return filtered.length > 0 ? filtered : null;
}
