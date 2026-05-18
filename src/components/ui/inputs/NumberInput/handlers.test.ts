import { clampNumericStringOnBlur, parseOptionalBound, sanitizeNumericInput } from './handlers';

describe('NumberInput handlers', () => {
  describe('sanitizeNumericInput', () => {
    it('удаляет недопустимые символы и пересчитывает каретку', () => {
      const result = sanitizeNumericInput({
        rawInput: '1a2b3',
        caretIndex: 5,
        allowDecimal: false,
        allowNegative: false,
      });
      expect(result.sanitizedValue).toBe('123');
      expect(result.caretIndex).toBe(3);
    });

    it('нормализует запятую в точку при allowDecimal', () => {
      const result = sanitizeNumericInput({
        rawInput: '1,5',
        caretIndex: 3,
        allowDecimal: true,
        allowNegative: false,
      });
      expect(result.sanitizedValue).toBe('1.5');
    });
  });

  describe('parseOptionalBound', () => {
    it('возвращает undefined для пустого значения', () => {
      expect(parseOptionalBound('')).toBeUndefined();
      expect(parseOptionalBound(undefined)).toBeUndefined();
    });

    it('парсит строку в число', () => {
      expect(parseOptionalBound('10')).toBe(10);
    });
  });

  describe('clampNumericStringOnBlur', () => {
    it('возвращает пустую строку для незавершённого ввода', () => {
      expect(clampNumericStringOnBlur('-', 0, 10)).toBe('');
      expect(clampNumericStringOnBlur('.', 0, 10)).toBe('');
    });

    it('ограничивает по границам', () => {
      expect(clampNumericStringOnBlur('50', 0, 10)).toBe('10');
      expect(clampNumericStringOnBlur('-5', 0, 10)).toBe('0');
    });
  });
});
