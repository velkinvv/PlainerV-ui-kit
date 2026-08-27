import {
  formatWeekOfMonthValue,
  getMonthWeeks,
  getWeekOfMonthFromDate,
  parseWeekOfMonthString,
} from './dateInputWeekHandlers';

describe('dateInputWeekHandlers', () => {
  describe('getMonthWeeks calendar', () => {
    it('для августа 2026 даёт 6 календарных недель с понедельника', () => {
      const weeks = getMonthWeeks(2026, 7, { weekOfMonthMode: 'calendar' });

      expect(weeks).toHaveLength(6);
      expect(weeks[0]?.startDate.getDate()).toBe(1);
      expect(weeks[0]?.endDate.getDate()).toBe(2);
      expect(weeks[1]?.startDate.getDate()).toBe(3);
      expect(weeks[1]?.endDate.getDate()).toBe(9);
      expect(weeks[5]?.startDate.getDate()).toBe(31);
      expect(weeks[5]?.endDate.getDate()).toBe(31);
    });
  });

  describe('getMonthWeeks chunks', () => {
    it('режет месяц семёрками от 1-го числа', () => {
      const weeks = getMonthWeeks(2026, 7, { weekOfMonthMode: 'chunks' });

      expect(weeks).toHaveLength(5);
      expect(weeks[0]?.startDate.getDate()).toBe(1);
      expect(weeks[0]?.endDate.getDate()).toBe(7);
      expect(weeks[4]?.startDate.getDate()).toBe(29);
      expect(weeks[4]?.endDate.getDate()).toBe(31);
    });
  });

  describe('formatWeekOfMonthValue', () => {
    it('15 августа 2026 в calendar — W3', () => {
      expect(formatWeekOfMonthValue(new Date(2026, 7, 15), { weekOfMonthMode: 'calendar' })).toBe(
        '2026-08-W3',
      );
    });

    it('15 августа 2026 в chunks — W3', () => {
      expect(formatWeekOfMonthValue(new Date(2026, 7, 15), { weekOfMonthMode: 'chunks' })).toBe(
        '2026-08-W3',
      );
    });

    it('1 августа 2026 в calendar — W1, 8 августа — W2', () => {
      expect(formatWeekOfMonthValue(new Date(2026, 7, 1), { weekOfMonthMode: 'calendar' })).toBe(
        '2026-08-W1',
      );
      expect(formatWeekOfMonthValue(new Date(2026, 7, 8), { weekOfMonthMode: 'calendar' })).toBe(
        '2026-08-W2',
      );
    });
  });

  describe('parseWeekOfMonthString', () => {
    it('разбирает YYYY-MM-W2 в начало календарной недели', () => {
      const parsedDate = parseWeekOfMonthString('2026-08-W2', { weekOfMonthMode: 'calendar' });

      expect(parsedDate?.getFullYear()).toBe(2026);
      expect(parsedDate?.getMonth()).toBe(7);
      expect(parsedDate?.getDate()).toBe(3);
    });

    it('в chunks W2 начинается с 8-го', () => {
      const parsedDate = parseWeekOfMonthString('2026-08-W2', { weekOfMonthMode: 'chunks' });

      expect(parsedDate?.getDate()).toBe(8);
    });

    it('разбирает отображаемый ввод 2.08.2026 как неделю 2', () => {
      const parsedDate = parseWeekOfMonthString('2.08.2026', { weekOfMonthMode: 'calendar' });

      expect(parsedDate?.getDate()).toBe(3);
    });
  });

  describe('getWeekOfMonthFromDate', () => {
    it('находит неделю по дате внутри месяца', () => {
      const week = getWeekOfMonthFromDate(new Date(2026, 7, 31), { weekOfMonthMode: 'calendar' });

      expect(week?.weekNumber).toBe(6);
    });
  });
});
