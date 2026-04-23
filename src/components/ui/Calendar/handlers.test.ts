import {
  addMonths,
  buildCalendarGrid,
  buildMonthYearOptions,
  clampVisibleMonthStart,
  getMonthStartOffset,
  getRangeDayVisualFlags,
  getWeekdayLabels,
  isDateOutsideMinMax,
  isSameCalendarDay,
  monthYearKey,
  parseMonthYearKey,
  startOfMonth,
} from './handlers';

describe('Calendar handlers', () => {
  it('startOfMonth', () => {
    const d = new Date(2025, 8, 18);
    const s = startOfMonth(d);
    expect(s.getFullYear()).toBe(2025);
    expect(s.getMonth()).toBe(8);
    expect(s.getDate()).toBe(1);
  });

  it('getMonthStartOffset понедельник как первый столбец', () => {
    // 1 сентября 2025 — понедельник (проверка в JS: getDay())
    const first = new Date(2025, 8, 1);
    expect(getMonthStartOffset(first, 1)).toBe(0);
  });

  it('getWeekdayLabels возвращает 7 подписей', () => {
    expect(getWeekdayLabels('ru-RU', 1)).toHaveLength(7);
  });

  it('buildCalendarGrid даёт 42 ячейки', () => {
    const cells = buildCalendarGrid(new Date(2025, 8, 18), 1);
    expect(cells).toHaveLength(42);
    expect(cells.some((c) => c.inCurrentMonth && c.date.getDate() === 18)).toBe(true);
  });

  it('isSameCalendarDay', () => {
    expect(isSameCalendarDay(new Date(2025, 0, 2), new Date(2025, 0, 2))).toBe(true);
    expect(isSameCalendarDay(new Date(2025, 0, 2), new Date(2025, 0, 3))).toBe(false);
  });

  it('clampVisibleMonthStart', () => {
    const v = new Date(2025, 5, 15);
    const min = new Date(2025, 8, 1);
    const max = new Date(2025, 10, 30);
    expect(clampVisibleMonthStart(v, min, max).getMonth()).toBe(8);
  });

  it('isDateOutsideMinMax', () => {
    const d = new Date(2025, 8, 1);
    expect(isDateOutsideMinMax(d, new Date(2025, 8, 10), undefined)).toBe(true);
    expect(isDateOutsideMinMax(new Date(2025, 8, 15), new Date(2025, 8, 1), new Date(2025, 8, 30))).toBe(
      false,
    );
  });

  it('monthYearKey и parseMonthYearKey', () => {
    const k = monthYearKey(new Date(2025, 8, 1));
    expect(k).toBe('2025-09');
    const p = parseMonthYearKey(k);
    expect(p?.getFullYear()).toBe(2025);
    expect(p?.getMonth()).toBe(8);
  });

  it('buildMonthYearOptions', () => {
    const opts = buildMonthYearOptions(new Date(2025, 8, 1), 1, 1, 'ru-RU');
    expect(opts.length).toBeGreaterThanOrEqual(2);
    expect(opts.some((o) => o.value === '2025-09')).toBe(true);
  });

  it('addMonths', () => {
    const a = addMonths(new Date(2025, 0, 1), 1);
    expect(a.getMonth()).toBe(1);
  });

  it('getRangeDayVisualFlags: только начало', () => {
    const start = new Date(2025, 0, 10);
    const day = new Date(2025, 0, 10);
    const f = getRangeDayVisualFlags(day, 'range', start, null, null);
    expect(f.rangeStart).toBe(true);
    expect(f.rangeEnd).toBe(false);
    expect(f.inRange).toBe(false);
  });

  it('getRangeDayVisualFlags: середина и границы', () => {
    const start = new Date(2025, 0, 10);
    const end = new Date(2025, 0, 12);
    const mid = new Date(2025, 0, 11);
    expect(getRangeDayVisualFlags(mid, 'range', start, end, null).inRange).toBe(true);
    expect(getRangeDayVisualFlags(start, 'range', start, end, null).rangeStart).toBe(true);
    expect(getRangeDayVisualFlags(end, 'range', start, end, null).rangeEnd).toBe(true);
  });
});
