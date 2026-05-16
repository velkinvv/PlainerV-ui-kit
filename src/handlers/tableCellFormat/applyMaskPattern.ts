const DIGIT_PATTERN = /\d/;
const LETTER_PATTERN = /[a-zA-Zа-яА-ЯёЁ]/;

/**
 * Применяет к строковому представлению значения маску отображения.
 * Символы маски: `#` — следующая цифра из значения; `A` — следующая буква; `*` — следующий символ.
 * Остальные символы маски копируются в результат без расхода ввода.
 * @param pattern — шаблон (например `+7 (###) ###-##-##`)
 * @param rawValue — исходное значение ячейки
 */
export function applyMaskPattern(pattern: string, rawValue: unknown): string {
  const source = String(rawValue ?? '');
  if (source.trim() === '') {
    return '';
  }

  let inputPosition = 0;

  const takeNextDigit = (): string => {
    while (inputPosition < source.length) {
      const character = source[inputPosition];
      inputPosition += 1;
      if (character != null && DIGIT_PATTERN.test(character)) {
        return character;
      }
    }
    return '';
  };

  const takeNextLetter = (): string => {
    while (inputPosition < source.length) {
      const character = source[inputPosition];
      inputPosition += 1;
      if (character != null && LETTER_PATTERN.test(character)) {
        return character;
      }
    }
    return '';
  };

  const takeNextAny = (): string => {
    if (inputPosition >= source.length) {
      return '';
    }
    const character = source[inputPosition];
    inputPosition += 1;
    return character ?? '';
  };

  let result = '';
  for (let index = 0; index < pattern.length; index += 1) {
    const maskCharacter = pattern[index];
    if (maskCharacter === '#') {
      result += takeNextDigit();
    } else if (maskCharacter === 'A') {
      result += takeNextLetter();
    } else if (maskCharacter === '*') {
      result += takeNextAny();
    } else if (maskCharacter != null) {
      result += maskCharacter;
    }
  }

  return result;
}
