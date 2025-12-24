import { parseDate, parseDateRange } from './dateHandlers';

describe('dateHandlers', () => {
  describe('parseDate', () => {
    it('parses DD.MM.YYYY format correctly', () => {
      const result = parseDate('06.08.2025');
      expect(result.isValid).toBe(true);
      expect(result.date?.getDate()).toBe(6);
      expect(result.date?.getMonth()).toBe(7); // август = 7 (0-based)
      expect(result.date?.getFullYear()).toBe(2025);
    });

    it('parses DD-MM-YYYY format correctly', () => {
      const result = parseDate('06-08-2025');
      expect(result.isValid).toBe(true);
      expect(result.date?.getDate()).toBe(6);
      expect(result.date?.getMonth()).toBe(7); // август = 7 (0-based)
      expect(result.date?.getFullYear()).toBe(2025);
    });

    it('parses DD/MM/YYYY format correctly', () => {
      const result = parseDate('06/08/2025');
      expect(result.isValid).toBe(true);
      expect(result.date?.getDate()).toBe(6);
      expect(result.date?.getMonth()).toBe(7); // август = 7 (0-based)
      expect(result.date?.getFullYear()).toBe(2025);
    });

    it('parses YYYY-MM-DD format correctly', () => {
      const result = parseDate('2025-08-06');
      expect(result.isValid).toBe(true);
      expect(result.date?.getDate()).toBe(6);
      expect(result.date?.getMonth()).toBe(7); // август = 7 (0-based)
      expect(result.date?.getFullYear()).toBe(2025);
    });

    it('parses ISO string correctly', () => {
      const result = parseDate('2025-08-06T10:30:00.000Z');
      expect(result.isValid).toBe(true);
      expect(result.date?.getDate()).toBe(6);
      expect(result.date?.getMonth()).toBe(7); // август = 7 (0-based)
      expect(result.date?.getFullYear()).toBe(2025);
    });

    it('parses timestamp correctly', () => {
      const timestamp = new Date(2025, 7, 6).getTime();
      const result = parseDate(timestamp);
      expect(result.isValid).toBe(true);
      expect(result.date).toEqual(new Date(2025, 7, 6));
    });

    it('handles invalid date', () => {
      const result = parseDate('invalid-date');
      expect(result.isValid).toBe(false);
      expect(result.date).toBeNull();
    });
  });

  describe('parseDateRange', () => {
    it('parses date range correctly', () => {
      const result = parseDateRange('06.08.2025 — 14.08.2025');
      expect(result.start?.getDate()).toBe(6);
      expect(result.start?.getMonth()).toBe(7); // август = 7 (0-based)
      expect(result.start?.getFullYear()).toBe(2025);
      expect(result.end?.getDate()).toBe(14);
      expect(result.end?.getMonth()).toBe(7); // август = 7 (0-based)
      expect(result.end?.getFullYear()).toBe(2025);
    });

    it('handles invalid range', () => {
      const result = parseDateRange('invalid-range');
      expect(result.start).toBeNull();
      expect(result.end).toBeNull();
    });
  });
});
