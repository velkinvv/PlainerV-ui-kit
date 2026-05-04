import { getTableSelectionAggregate } from './tableSelectionHandlers';

describe('tableSelectionHandlers', () => {
  it('getTableSelectionAggregate для чекбокса «выбрать все»', () => {
    const ids = ['a', 'b', 'c'];
    expect(getTableSelectionAggregate(ids, new Set())).toBe('none');
    expect(getTableSelectionAggregate(ids, new Set(['a', 'b', 'c']))).toBe('all');
    expect(getTableSelectionAggregate(ids, new Set(['b']))).toBe('partial');
  });
});
