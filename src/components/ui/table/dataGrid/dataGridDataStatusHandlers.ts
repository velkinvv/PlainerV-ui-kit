import type { DataGridDataStatus, DataGridLoadingDisplay } from '@/types/ui';

/** Заголовок блока ошибки таблицы по умолчанию */
export const DATA_GRID_ERROR_STATE_DEFAULT_TITLE = 'Не удалось загрузить данные';

/** Пояснение блока ошибки, если из `error` нельзя извлечь текст */
export const DATA_GRID_ERROR_STATE_DEFAULT_DESCRIPTION =
  'Попробуйте обновить таблицу или повторить запрос';

/** Подпись кнопки повтора в блоке ошибки */
export const DATA_GRID_ERROR_STATE_DEFAULT_RETRY_LABEL = 'Повторить';

/** Число строк-скелетонов, если не заданы `skeletonRowCount` и `paginationModel.pageSize` */
export const DATA_GRID_DEFAULT_SKELETON_ROW_COUNT = 8;

/** Верхняя граница числа строк-скелетонов */
export const DATA_GRID_MAX_SKELETON_ROW_COUNT = 50;

/**
 * Итоговый статус данных таблицы: явный `dataStatus` или устаревший флаг `isLoading`.
 * @param options — `dataStatus` и/или `isLoading` из пропсов `DataGrid`
 */
export function resolveDataGridDataStatus(options: {
  dataStatus?: DataGridDataStatus;
  isLoading?: boolean;
}): DataGridDataStatus {
  if (options.dataStatus != null) {
    return options.dataStatus;
  }
  if (options.isLoading) {
    return 'loading';
  }
  return 'ready';
}

/**
 * Вариант отображения загрузки: при `skeleton` и уже показанных строках переключаемся на оверлей,
 * чтобы не скрывать загруженные данные при фоновом обновлении.
 * @param loadingDisplay — желаемый режим из пропсов
 * @param options — флаг загрузки и наличие строк на текущей странице
 */
export function resolveDataGridLoadingDisplay(
  loadingDisplay: DataGridLoadingDisplay,
  options: { isTableLoading: boolean; hasVisibleRows: boolean },
): DataGridLoadingDisplay {
  if (!options.isTableLoading) {
    return loadingDisplay;
  }
  if (loadingDisplay === 'skeleton' && options.hasVisibleRows) {
    return 'overlay';
  }
  return loadingDisplay;
}

/**
 * Число строк-скелетонов для `loadingDisplay="skeleton"`.
 * @param options — `skeletonRowCount` и размер страницы пагинации
 */
export function resolveDataGridSkeletonRowCount(options: {
  skeletonRowCount?: number;
  paginationPageSize?: number;
}): number {
  if (options.skeletonRowCount != null && options.skeletonRowCount > 0) {
    return Math.min(DATA_GRID_MAX_SKELETON_ROW_COUNT, Math.floor(options.skeletonRowCount));
  }
  if (options.paginationPageSize != null && options.paginationPageSize > 0) {
    return Math.min(DATA_GRID_MAX_SKELETON_ROW_COUNT, Math.floor(options.paginationPageSize));
  }
  return DATA_GRID_DEFAULT_SKELETON_ROW_COUNT;
}

/**
 * Текст ошибки для UI: `Error.message`, непустая строка или запасной вариант.
 * @param error — значение из пропса `error`
 * @param fallback — строка по умолчанию
 */
export function getDataGridErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }
  if (typeof error === 'string' && error.trim().length > 0) {
    return error;
  }
  return fallback;
}
