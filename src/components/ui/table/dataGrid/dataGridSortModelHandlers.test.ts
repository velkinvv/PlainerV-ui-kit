import {
  getDataGridSortCriterionIndexForField,
  normalizeDataGridSortModel,
  resolveNextDataGridSortModel,
} from './dataGridSortModelHandlers';

describe('normalizeDataGridSortModel', () => {
  it('возвращает пустой массив для null и undefined', () => {
    expect(normalizeDataGridSortModel(null)).toEqual([]);
    expect(normalizeDataGridSortModel(undefined)).toEqual([]);
  });

  it('оборачивает один критерий в массив', () => {
    expect(normalizeDataGridSortModel({ field: 'a', direction: 'asc' })).toEqual([{ field: 'a', direction: 'asc' }]);
  });

  it('копирует массив критериев', () => {
    const input = [{ field: 'a', direction: 'asc' as const }];
    const result = normalizeDataGridSortModel(input);
    expect(result).toEqual(input);
    expect(result).not.toBe(input);
  });
});

describe('resolveNextDataGridSortModel', () => {
  it('одиночный режим: смена поля задаёт asc', () => {
    expect(
      resolveNextDataGridSortModel({
        current: { field: 'user', direction: 'asc' },
        field: 'age',
        multiColumnSort: false,
      }),
    ).toEqual({ field: 'age', direction: 'asc' });
  });

  it('одиночный режим: тот же столбец переключает направление', () => {
    expect(
      resolveNextDataGridSortModel({
        current: { field: 'user', direction: 'asc' },
        field: 'user',
        multiColumnSort: false,
      }),
    ).toEqual({ field: 'user', direction: 'desc' });
  });

  it('мульти: добавляет колонку', () => {
    expect(
      resolveNextDataGridSortModel({
        current: [{ field: 'user', direction: 'asc' }],
        field: 'age',
        multiColumnSort: true,
      }),
    ).toEqual([
      { field: 'user', direction: 'asc' },
      { field: 'age', direction: 'asc' },
    ]);
  });

  it('мульти: asc → desc', () => {
    expect(
      resolveNextDataGridSortModel({
        current: [{ field: 'user', direction: 'asc' }],
        field: 'user',
        multiColumnSort: true,
      }),
    ).toEqual([{ field: 'user', direction: 'desc' }]);
  });

  it('мульти: desc → удаление и null если список пуст', () => {
    expect(
      resolveNextDataGridSortModel({
        current: [{ field: 'user', direction: 'desc' }],
        field: 'user',
        multiColumnSort: true,
      }),
    ).toBeNull();
  });
});

describe('getDataGridSortCriterionIndexForField', () => {
  it('находит индекс по field', () => {
    const list = [
      { field: 'a', direction: 'asc' as const },
      { field: 'b', direction: 'desc' as const },
    ];
    expect(getDataGridSortCriterionIndexForField(list, 'b')).toBe(1);
    expect(getDataGridSortCriterionIndexForField(list, 'c')).toBe(-1);
  });
});
