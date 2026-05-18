import { coerceTableCellNumericValue } from './coerceTableCellNumericValue';

describe('coerceTableCellNumericValue', () => {
  it('понимает строку с пробелами и запятой', () => {
    expect(coerceTableCellNumericValue('1 234,56')).toBeCloseTo(1234.56);
  });

  it('возвращает null для пустого ввода', () => {
    expect(coerceTableCellNumericValue(null)).toBeNull();
    expect(coerceTableCellNumericValue('')).toBeNull();
  });
});
