import type { DataGridBaseRow, DataGridPaginationModel, TableSize } from '@/types/ui';
import { Size } from '@/types/sizes';

/**
 * Сопоставление размера дизайн-системы с плотностью примитива `Table`.
 * @param size - `Size` из дизайн-системы
 */
export function dataGridSizeToTableSize(size: Size | undefined): TableSize {
  switch (size) {
    case Size.XS:
    case Size.SM:
      return 'sm';
    case Size.LG:
    case Size.XL:
    case Size.MD:
    default:
      return 'md';
  }
}

/**
 * Срез строк для клиентской пагинации.
 * @param rows - Полный массив строк
 * @param model - Текущая страница и размер (страница с нуля)
 */
export function sliceRowsForPagination<Row extends DataGridBaseRow>(
  rows: readonly Row[],
  model: DataGridPaginationModel,
): Row[] {
  const page = Math.max(0, model.page);
  const pageSize = Math.max(1, model.pageSize);
  const start = page * pageSize;
  return rows.slice(start, start + pageSize);
}

/**
 * Значение ячейки по полю; поддерживает ключи с точкой (`user.name`).
 * @param row - Объект строки
 * @param field - Ключ или путь через `.`
 */
export function getDataGridCellValue<Row extends DataGridBaseRow>(row: Row, field: keyof Row | string): unknown {
  const key = String(field);
  if (!key.includes('.')) {
    return row[key as keyof Row];
  }
  const parts = key.split('.');
  let cur: unknown = row;
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') {
      return undefined;
    }
    cur = (cur as Record<string, unknown>)[p];
  }
  return cur;
}

/**
 * Переставляет элемент массива с индекса `from` на `to`.
 * @param list - Исходный упорядоченный список
 * @param from - Индекс перетаскиваемого элемента
 * @param to - Целевой индекс
 */
export function reorderByIndex<T>(list: readonly T[], from: number, to: number): T[] {
  const arr = [...list];
  const f = Math.max(0, Math.min(arr.length - 1, from));
  const t = Math.max(0, Math.min(arr.length - 1, to));
  if (f === t) {
    return arr;
  }
  const [item] = arr.splice(f, 1);
  arr.splice(t, 0, item);
  return arr;
}

/**
 * Нормализация `selectedIds` / `disabledIds` в `Set`.
 * @param ids - Множество или массив id
 */
export function toIdSet(ids: ReadonlySet<string> | readonly string[] | undefined): Set<string> {
  if (!ids) {
    return new Set();
  }
  if (ids instanceof Set) {
    return new Set(ids);
  }
  return new Set(ids);
}
