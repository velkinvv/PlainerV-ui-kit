/**
 * Разбор вставки и валидация токенов для `MultiInput`.
 */

import type { MultiInputDuplicatePolicy } from '../../../../types/ui';

export interface ShouldAcceptTokenParams {
  /** Очищенная строка одного токена. */
  token: string;
  /** Текущий список токенов. */
  currentValues: string[];
  /** Политика дубликатов. */
  duplicates: MultiInputDuplicatePolicy;
  /** Внешняя проверка токена; `false` — не добавлять. */
  validateToken?: (token: string) => boolean;
  /** Максимальное число токенов (если задано). */
  maxItems?: number;
}

/**
 * Обрезает пробелы у токена.
 * @param raw - Строка токена.
 */
export const normalizeMultiInputToken = (raw: string): string => raw.trim();

/**
 * Разбивает вставленный текст на токены (переносы, запятые, точки с запятой, табы).
 * @param raw - Текст из буфера обмена или поля.
 */
export const splitMultiInputPaste = (raw: string): string[] => {
  return raw
    .split(/[\n,;\t]+/)
    .map(normalizeMultiInputToken)
    .filter((part) => part.length > 0);
};

/**
 * Проверяет, можно ли добавить токен к списку.
 * @param token - Нормализованный токен.
 * @param currentValues - Уже добавленные значения.
 * @param duplicates - `reject` — не добавлять повтор (точное совпадение после trim).
 * @param validateToken - Дополнительный предикат.
 * @param maxItems - Верхняя граница числа токенов.
 */
export const shouldAcceptMultiInputToken = ({
  token,
  currentValues,
  duplicates,
  validateToken,
  maxItems,
}: ShouldAcceptTokenParams): boolean => {
  if (!token) {
    return false;
  }

  if (validateToken && !validateToken(token)) {
    return false;
  }

  if (maxItems !== undefined && currentValues.length >= maxItems) {
    return false;
  }

  if (duplicates === 'reject' && currentValues.includes(token)) {
    return false;
  }

  return true;
};
