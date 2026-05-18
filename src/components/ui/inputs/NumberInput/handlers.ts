/**
 * Санитизация строки числового ввода и вспомогательные функции для `NumberInput`.
 */

export interface SanitizeNumericInputParams {
  /** Исходная строка из поля ввода. */
  rawInput: string;
  /** Позиция каретки до обработки. */
  caretIndex: number;
  /** Разрешить одну десятичную точку (или запятую, нормализуемая в `.`). */
  allowDecimal: boolean;
  /** Разрешить ведущий минуc. */
  allowNegative: boolean;
}

export interface SanitizeNumericInputResult {
  /** Строка только с допустимыми символами числа. */
  sanitizedValue: string;
  /** Позиция каретки после санитизации. */
  caretIndex: number;
}

const isDigit = (character: string): boolean => character >= '0' && character <= '9';

/**
 * Удаляет из строки всё, кроме цифр и (опционально) одного разделителя и ведущего минуса;
 * пересчитывает позицию каретки.
 * @param rawInput - Текущее значение инпута.
 * @param caretIndex - `selectionStart` до изменений.
 * @param allowDecimal - Одна `.` (входящая `,` приводится к `.`).
 * @param allowNegative - `-` только в начале строки.
 */
export const sanitizeNumericInput = ({
  rawInput,
  caretIndex,
  allowDecimal,
  allowNegative,
}: SanitizeNumericInputParams): SanitizeNumericInputResult => {
  let output = '';
  let newCaretIndex = 0;
  let decimalUsed = false;

  for (let index = 0; index < rawInput.length; index++) {
    const char = rawInput[index]!;

    if (isDigit(char)) {
      output += char;
      if (index < caretIndex) {
        newCaretIndex = output.length;
      }
      continue;
    }

    if (allowNegative && char === '-' && output === '') {
      output += char;
      if (index < caretIndex) {
        newCaretIndex = output.length;
      }
      continue;
    }

    const isDecimalSeparator = char === '.' || char === ',';
    if (allowDecimal && isDecimalSeparator && !decimalUsed) {
      decimalUsed = true;
      output += '.';
      if (index < caretIndex) {
        newCaretIndex = output.length;
      }
      continue;
    }
  }

  return { sanitizedValue: output, caretIndex: newCaretIndex };
};

/**
 * Парсит необязательный числовой атрибут (`min` / `max` у `input`).
 * @param raw - Значение из пропсов DOM (`string | number | undefined`).
 */
export const parseOptionalBound = (raw: string | number | undefined): number | undefined => {
  if (raw === undefined || raw === '') {
    return undefined;
  }
  const parsed = typeof raw === 'number' ? raw : Number(raw);
  return Number.isFinite(parsed) ? parsed : undefined;
};

/**
 * Приводит строку к диапазону [min, max], если число конечно; промежуточные «незавершённые» значения очищает.
 * @param value - Текущее значение поля.
 * @param minValue - Нижняя граница (из атрибута `min`), если задана.
 * @param maxValue - Верхняя граница (из атрибута `max`), если задана.
 */
export const clampNumericStringOnBlur = (
  value: string,
  minValue: number | undefined,
  maxValue: number | undefined,
): string => {
  const trimmed = value.trim();

  if (
    trimmed === '' ||
    trimmed === '-' ||
    trimmed === '.' ||
    trimmed === '-.' ||
    trimmed === ',' ||
    trimmed === '-,'
  ) {
    return '';
  }

  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed)) {
    return trimmed;
  }

  let next = parsed;
  if (minValue !== undefined) {
    next = Math.max(minValue, next);
  }
  if (maxValue !== undefined) {
    next = Math.min(maxValue, next);
  }

  return String(next);
};
