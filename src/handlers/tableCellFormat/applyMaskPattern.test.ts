import { applyMaskPattern } from './applyMaskPattern';

describe('applyMaskPattern', () => {
  it('форматирует телефон по маске с цифрами', () => {
    expect(applyMaskPattern('+7 (###) ###-##-##', '9161234567')).toBe('+7 (916) 123-45-67');
  });

  it('возвращает пустую строку для пустого значения', () => {
    expect(applyMaskPattern('###', '')).toBe('');
    expect(applyMaskPattern('###', null)).toBe('');
  });

  it('обрабатывает буквы в маске A', () => {
    expect(applyMaskPattern('AA-##', 'Ab12')).toBe('Ab-12');
  });
});
