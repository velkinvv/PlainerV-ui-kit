import {
  TABLE_HEADER_MAX_LINES_CAP,
  normalizeTableHeaderMaxLines,
} from './tableHeaderClampHandlers';

describe('tableHeaderClampHandlers', () => {
  it('normalizeTableHeaderMaxLines отбрасывает нечисла и значения ниже 1', () => {
    expect(normalizeTableHeaderMaxLines(undefined)).toBeUndefined();
    expect(normalizeTableHeaderMaxLines(Number.NaN)).toBeUndefined();
    expect(normalizeTableHeaderMaxLines(0)).toBeUndefined();
    expect(normalizeTableHeaderMaxLines(-2)).toBeUndefined();
  });

  it('normalizeTableHeaderMaxLines округляет вниз и ограничивает потолком', () => {
    expect(normalizeTableHeaderMaxLines(2.7)).toBe(2);
    expect(normalizeTableHeaderMaxLines(3)).toBe(3);
    expect(normalizeTableHeaderMaxLines(TABLE_HEADER_MAX_LINES_CAP + 5)).toBe(
      TABLE_HEADER_MAX_LINES_CAP,
    );
  });
});
