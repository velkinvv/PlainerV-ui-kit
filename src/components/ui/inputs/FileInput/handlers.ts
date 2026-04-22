import type { FileInputProps } from '../../../../types/ui';

/**
 * Вычисляет текущий статус поля на основе приоритетов.
 * @param status - Явно переданный статус компонента.
 * @param error - Сообщение об ошибке.
 * @param success - Флаг успешного состояния.
 * @returns Итоговый статус компонента.
 */
export const getFileInputStatus = (
  status: FileInputProps['status'],
  error?: FileInputProps['error'],
  success?: FileInputProps['success'],
): FileInputProps['status'] => status || (error ? 'error' : success ? 'success' : undefined);

/**
 * Формирует строку подписи по списку файлов из `input.files`.
 * @param files - Список файлов из `FileList`.
 * @param multiple - Режим множественного выбора.
 * @returns Строка для отображения (пустая строка, если файлов нет).
 */
export const formatFileListSummary = (
  files: FileList | null | undefined,
  multiple?: boolean,
): string => {
  const list = files;
  if (!list?.length) {
    return '';
  }
  if (multiple && list.length > 1) {
    return `Выбрано файлов: ${list.length}`;
  }
  return list[0]?.name ?? '';
};
