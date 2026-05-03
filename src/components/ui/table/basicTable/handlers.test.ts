import {
  clampTablePageZeroBased,
  getSortChevronTones,
  getTableTotalPages,
  parseTablePageJumpInput,
  toggleTableSortDirection,
} from './handlers';

describe('Table handlers', () => {
  it('getTableTotalPages считает число страниц для списка и размера страницы', () => {
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

  it('parseTablePageJumpInput возвращает индекс с нуля (1-based ввод) или null', () => {
    expect(parseTablePageJumpInput('', 5)).toBe(null);
    expect(parseTablePageJumpInput('  ', 5)).toBe(null);
    expect(parseTablePageJumpInput('abc', 5)).toBe(null);
    expect(parseTablePageJumpInput('1', 5)).toBe(0);
    expect(parseTablePageJumpInput('5', 5)).toBe(4);
    expect(parseTablePageJumpInput('99', 5)).toBe(4);
    expect(parseTablePageJumpInput('0', 5)).toBe(0);
    expect(parseTablePageJumpInput('-1', 5)).toBe(0);
  });
});
