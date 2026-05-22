import type { DataGridColumn } from '@/types/ui';
import type { DataGridStoryDemoRow } from './dataGridStoryDemoData';
import { getDataGridStoryDemoColumns } from './dataGridStoryDemoColumns';

/**
 * Колонки для сторис с горизонтальным скроллом: базовые демо-колонки плюс дополнительные узкие поля.
 * @param extraColumnCount — число дополнительных колонок (по умолчанию 10)
 * @param options.useShortHeaderNames — короткие заголовки «Доп. N» вместо «Доп. поле N»
 * @param options.extraColumnValueField — поле демо-строки для значений доп. колонок
 */
export function getDataGridStoryWideColumns(
  extraColumnCount = 10,
  options?: {
    useShortHeaderNames?: boolean;
    extraColumnValueField?: 'socialChannel' | 'dateLabel';
  },
): DataGridColumn<DataGridStoryDemoRow>[] {
  const baseColumns = getDataGridStoryDemoColumns();
  const useShortHeaderNames = options?.useShortHeaderNames ?? false;
  const extraColumnValueField = options?.extraColumnValueField ?? 'socialChannel';

  const extraColumns = Array.from({ length: extraColumnCount }, (_, columnIndex) => ({
    field: `extraField${columnIndex}`,
    headerName: useShortHeaderNames
      ? `Доп. ${columnIndex + 1}`
      : `Доп. поле ${columnIndex + 1}`,
    width: 150,
    minWidth: extraColumnValueField === 'dateLabel' ? undefined : 120,
    sortable: false,
    valueGetter: (row: DataGridStoryDemoRow) => row[extraColumnValueField] ?? '—',
  }));

  return [...baseColumns, ...extraColumns];
}
