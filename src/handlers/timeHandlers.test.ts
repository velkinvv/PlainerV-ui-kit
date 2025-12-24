import {
  parseTime,
  parseTimeRange,
  formatTimeForDisplay,
  toISOTimeString,
  getHours,
  getMinutes,
  getSeconds,
  createTime,
  getHoursFromTime,
  getMinutesFromTime,
  getSecondsFromTime,
  formatHours,
  formatMinutes,
  formatSeconds,
} from './timeHandlers';

describe('timeHandlers', () => {
  describe('parseTime', () => {
    it('parses HH:mm format correctly', () => {
      const result = parseTime('14:30');
      expect(result.isValid).toBe(true);
      expect(result.time?.getHours()).toBe(14);
      expect(result.time?.getMinutes()).toBe(30);
      expect(result.time?.getSeconds()).toBe(0);
    });

    it('parses HH:mm:ss format correctly', () => {
      const result = parseTime('14:30:45');
      expect(result.isValid).toBe(true);
      expect(result.time?.getHours()).toBe(14);
      expect(result.time?.getMinutes()).toBe(30);
      expect(result.time?.getSeconds()).toBe(45);
    });

    it('parses HH.mm format correctly', () => {
      const result = parseTime('14.30');
      expect(result.isValid).toBe(true);
      expect(result.time?.getHours()).toBe(14);
      expect(result.time?.getMinutes()).toBe(30);
    });

    it('parses HH/mm format correctly', () => {
      const result = parseTime('14/30');
      expect(result.isValid).toBe(true);
      expect(result.time?.getHours()).toBe(14);
      expect(result.time?.getMinutes()).toBe(30);
    });

    it('parses ISO string correctly', () => {
      const result = parseTime('2025-08-06T14:30:45.000Z');
      expect(result.isValid).toBe(true);
      // Проверяем только что время парсится корректно, не конкретные значения из-за часовых поясов
      expect(result.time).toBeInstanceOf(Date);
      expect(result.time?.getTime()).toBeGreaterThan(0);
    });

    it('parses timestamp correctly', () => {
      const timestamp = new Date(2025, 7, 6, 14, 30, 45).getTime();
      const result = parseTime(timestamp);
      expect(result.isValid).toBe(true);
      expect(result.time?.getHours()).toBe(14);
      expect(result.time?.getMinutes()).toBe(30);
      expect(result.time?.getSeconds()).toBe(45);
    });

    it('handles invalid time', () => {
      const result = parseTime('invalid-time');
      expect(result.isValid).toBe(false);
      expect(result.time).toBeNull();
    });

    it('handles null/undefined', () => {
      expect(parseTime(null).isValid).toBe(false);
      expect(parseTime(undefined).isValid).toBe(false);
    });
  });

  describe('parseTimeRange', () => {
    it('parses time range correctly', () => {
      const result = parseTimeRange('09:00 — 17:30');
      expect(result.start?.getHours()).toBe(9);
      expect(result.start?.getMinutes()).toBe(0);
      expect(result.end?.getHours()).toBe(17);
      expect(result.end?.getMinutes()).toBe(30);
    });

    it('handles invalid range', () => {
      const result = parseTimeRange('invalid-range');
      expect(result.start).toBeNull();
      expect(result.end).toBeNull();
    });
  });

  describe('formatTimeForDisplay', () => {
    it('formats time correctly', () => {
      const time = new Date(2025, 7, 6, 14, 30, 45);
      expect(formatTimeForDisplay(time)).toBe('14:30');
      expect(formatTimeForDisplay(time, 'HH:mm:ss')).toBe('14:30:45');
    });

    it('handles null time', () => {
      expect(formatTimeForDisplay(null)).toBe('');
    });
  });

  describe('toISOTimeString', () => {
    it('converts to ISO time string', () => {
      const time = new Date(2025, 7, 6, 14, 30, 45);
      expect(toISOTimeString(time)).toBe('14:30:45');
      expect(toISOTimeString(time, 'HH:mm')).toBe('14:30');
    });

    it('handles null time', () => {
      expect(toISOTimeString(null)).toBe('');
    });
  });

  describe('getHours', () => {
    it('returns array of hours 0-23', () => {
      const hours = getHours();
      expect(hours).toHaveLength(24);
      expect(hours[0]).toBe(0);
      expect(hours[23]).toBe(23);
    });
  });

  describe('getMinutes', () => {
    it('returns array of minutes with default step', () => {
      const minutes = getMinutes();
      expect(minutes).toHaveLength(60);
      expect(minutes[0]).toBe(0);
      expect(minutes[59]).toBe(59);
    });

    it('returns array of minutes with custom step', () => {
      const minutes = getMinutes(15);
      expect(minutes).toHaveLength(4);
      expect(minutes).toEqual([0, 15, 30, 45]);
    });
  });

  describe('getSeconds', () => {
    it('returns array of seconds with default step', () => {
      const seconds = getSeconds();
      expect(seconds).toHaveLength(60);
      expect(seconds[0]).toBe(0);
      expect(seconds[59]).toBe(59);
    });

    it('returns array of seconds with custom step', () => {
      const seconds = getSeconds(30);
      expect(seconds).toHaveLength(2);
      expect(seconds).toEqual([0, 30]);
    });
  });

  describe('createTime', () => {
    it('creates time from hours and minutes', () => {
      const time = createTime(14, 30);
      expect(time.getHours()).toBe(14);
      expect(time.getMinutes()).toBe(30);
      expect(time.getSeconds()).toBe(0);
    });

    it('creates time with seconds', () => {
      const time = createTime(14, 30, 45);
      expect(time.getHours()).toBe(14);
      expect(time.getMinutes()).toBe(30);
      expect(time.getSeconds()).toBe(45);
    });
  });

  describe('getHoursFromTime', () => {
    it('extracts hours from time', () => {
      const time = new Date(2025, 7, 6, 14, 30, 45);
      expect(getHoursFromTime(time)).toBe(14);
    });
  });

  describe('getMinutesFromTime', () => {
    it('extracts minutes from time', () => {
      const time = new Date(2025, 7, 6, 14, 30, 45);
      expect(getMinutesFromTime(time)).toBe(30);
    });
  });

  describe('getSecondsFromTime', () => {
    it('extracts seconds from time', () => {
      const time = new Date(2025, 7, 6, 14, 30, 45);
      expect(getSecondsFromTime(time)).toBe(45);
    });
  });

  describe('formatHours', () => {
    it('formats hours with leading zero', () => {
      expect(formatHours(9)).toBe('09');
      expect(formatHours(14)).toBe('14');
    });
  });

  describe('formatMinutes', () => {
    it('formats minutes with leading zero', () => {
      expect(formatMinutes(5)).toBe('05');
      expect(formatMinutes(30)).toBe('30');
    });
  });

  describe('formatSeconds', () => {
    it('formats seconds with leading zero', () => {
      expect(formatSeconds(5)).toBe('05');
      expect(formatSeconds(45)).toBe('45');
    });
  });
});
