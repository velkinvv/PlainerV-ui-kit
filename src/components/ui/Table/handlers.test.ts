import { clampTablePageZeroBased, getSortChevronTones, getTableTotalPages, toggleTableSortDirection } from './handlers';

describe('Table handlers', () => {
  it('getTableTotalPages считает страницы как в MUI', () => {
    expect(getTableTotalPages(0, 10)).toBe(1);
    expect(getTableTotalPages(10, 10)).toBe(1);
    expect(getTableTotalPages(11, 10)).toBe(2);
  });

  it('clampTablePageZeroBased ограничивает индекс страницы', () => {
    expect(clampTablePageZeroBased(0, 3)).toBe(0);
    expect(clampTablePageZeroBased(99, 3)).toBe(2);
  });

  it('toggleTableSortDirection переключает asc/desc', () => {
    expect(toggleTableSortDirection(false)).toBe('asc');
    expect(toggleTableSortDirection('asc')).toBe('desc');
    expect(toggleTableSortDirection('desc')).toBe('asc');
  });

  it('getSortChevronTones соответствует макету нейтрального и активного состояния', () => {
    expect(getSortChevronTones(false, 'asc')).toEqual({ up: 'idle', down: 'idle' });
    expect(getSortChevronTones(true, 'asc')).toEqual({ up: 'active', down: 'muted' });
    expect(getSortChevronTones(true, 'desc')).toEqual({ up: 'muted', down: 'active' });
  });
});
