import type { TextAreaProps } from '../../../../types/ui';

/**
 * Вычисляет текущий статус поля на основе приоритетов.
 * @param status - Явно переданный статус компонента.
 * @param error - Сообщение об ошибке.
 * @param success - Флаг успешного состояния.
 * @returns Итоговый статус компонента.
 */
export const getTextAreaStatus = (
  status: TextAreaProps['status'],
  error?: TextAreaProps['error'],
  success?: TextAreaProps['success'],
): TextAreaProps['status'] => status || (error ? 'error' : success ? 'success' : undefined);

/**
 * Вычисляет длину текущего текста из controlled/uncontrolled состояния.
 * @param value - Значение из контролируемого режима.
 * @param fallbackValue - Локальное значение из неконтролируемого режима.
 * @returns Текущая длина текста.
 */
export const getTextAreaCurrentLength = (
  value?: TextAreaProps['value'],
  fallbackValue?: string,
): number => (value || fallbackValue || '').toString().length;

/**
 * Определяет необходимость отображения счетчика символов.
 * @param displayCharacterCounter - Флаг отображения счетчика.
 * @param maxLength - Максимальная длина текста.
 * @param currentLength - Текущая длина текста.
 * @param characterCounterVisibilityThreshold - Порог видимости счетчика.
 * @returns Нужно ли показывать счетчик.
 */
export const shouldShowTextAreaCounter = (
  displayCharacterCounter: boolean,
  maxLength: number,
  currentLength: number,
  characterCounterVisibilityThreshold: number,
): boolean =>
  displayCharacterCounter && maxLength > 0 && currentLength >= characterCounterVisibilityThreshold;
