import type { FileInputProps } from '../../../../types/ui';
import { IconSize, Size } from '../../../../types/sizes';

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

/**
 * Ограничивает прогресс загрузки диапазоном 0–100.
 * @param value - Значение из пропсов.
 * @returns Число 0..100 или `null`, если значение не задано / не число.
 */
export const clampUploadProgress = (value: number | undefined): number | null => {
  if (value === undefined || Number.isNaN(value)) {
    return null;
  }
  return Math.min(100, Math.max(0, value));
};

/**
 * Короткое расширение файла для бейджа карточки (например `doc`).
 * @param fileName - Имя файла с точкой и расширением.
 */
export const getFileExtensionBadge = (fileName: string): string => {
  if (!fileName?.includes('.')) {
    return '';
  }
  const parts = fileName.split('.');
  const ext = parts[parts.length - 1];
  return ext ? ext.toLowerCase() : '';
};

/**
 * Размер иконки справа в поле выбора файла в зависимости от размера поля.
 * @param fieldSize - Размер поля `FileInput` (`size` из пропсов).
 */
export const getFileInputTrailingIconSize = (fieldSize: Size): IconSize => {
  switch (fieldSize) {
    case Size.SM:
    case Size.XS:
      return IconSize.SM;
    case Size.LG:
    case Size.XL:
      return IconSize.MD;
    default:
      return IconSize.SM;
  }
};
