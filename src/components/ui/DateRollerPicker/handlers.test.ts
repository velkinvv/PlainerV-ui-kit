import {
  buildDayRollerItems,
  buildMonthRollerItems,
  buildYearRollerItems,
  clampDateToMinMaxCalendar,
  clampDayForMonth,
  composeNormalizedDate,
  getDaysInMonthCount,
} from './handlers';

describe('DateRollerPicker handlers', () => {
  it('getDaysInMonthCount февраль високосный', () => {
    expect(getDaysInMonthCount(2024, 1)).toBe(29);
    expect(getDaysInMonthCount(2023, 1)).toBe(28);
  });

  it('clampDayForMonth', () => {
    expect(clampDayForMonth(2023, 1, 31)).toBe(28);
    expect(clampDayForMonth(2024, 0, 1)).toBe(1);
  });

  it('composeNormalizedDate', () => {
    const d = composeNormalizedDate(2024, 1, 15);
    expect(d.getFullYear()).toBe(2024);
    expect(d.getMonth()).toBe(1);
    expect(d.getDate()).toBe(15);
  });

  it('clampDateToMinMaxCalendar', () => {
    const min = new Date(2024, 5, 10);
    const max = new Date(2024, 5, 20);
    const before = new Date(2024, 5, 1);
    const after = new Date(2024, 6, 1);
    expect(clampDateToMinMaxCalendar(before, min, max).getDate()).toBe(10);
    expect(clampDateToMinMaxCalendar(after, min, max).getDate()).toBe(20);
  });

  it('buildDayRollerItems', () => {
    expect(buildDayRollerItems(2024, 1)).toHaveLength(29);
    expect(buildDayRollerItems(2024, 0)[0]?.value).toBe(1);
  });

  it('buildMonthRollerItems даёт 12 месяцев', () => {
    expect(buildMonthRollerItems('ru-RU')).toHaveLength(12);
  });

  it('buildYearRollerItems в границах', () => {
    const items = buildYearRollerItems(new Date(2022, 0, 1), new Date(2024, 0, 1), 2023);
    expect(items[0]?.value).toBe(2022);
    expect(items[items.length - 1]?.value).toBe(2024);
  });
});
