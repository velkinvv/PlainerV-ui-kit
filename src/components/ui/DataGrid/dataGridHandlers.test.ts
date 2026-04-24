import { getDataGridCellValue, reorderByIndex, sliceRowsForPagination } from './dataGridHandlers';
import type { DataGridBaseRow } from '@/types/ui';

type R = DataGridBaseRow & { user: { name: string }; age: number };

describe('dataGridHandlers', () => {
  it('sliceRowsForPagination режет страницу', () => {
    const rows: R[] = [
      { id: '1', user: { name: 'a' }, age: 1 },
      { id: '2', user: { name: 'b' }, age: 2 },
      { id: '3', user: { name: 'c' }, age: 3 },
    ];
    expect(sliceRowsForPagination(rows, { page: 0, pageSize: 2 }).map(r => r.id)).toEqual(['1', '2']);
    expect(sliceRowsForPagination(rows, { page: 1, pageSize: 2 }).map(r => r.id)).toEqual(['3']);
  });

  it('getDataGridCellValue читает вложенное поле по точке', () => {
    const row: R = { id: '1', user: { name: 'Ann' }, age: 20 };
    expect(getDataGridCellValue(row, 'user.name')).toBe('Ann');
    expect(getDataGridCellValue(row, 'age')).toBe(20);
  });

  it('reorderByIndex переставляет элемент', () => {
    expect(reorderByIndex([1, 2, 3], 0, 2)).toEqual([2, 3, 1]);
  });
});
