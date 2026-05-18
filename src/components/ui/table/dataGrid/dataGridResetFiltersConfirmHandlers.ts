/** Тексты модалки подтверждения сброса фильтров (можно переопределить через пропсы DataGrid). */
export type DataGridResetFiltersConfirmTexts = {
  /** Заголовок модального окна */
  title?: string;
  /** Пояснение под заголовком */
  description?: string;
  /** Подпись кнопки подтверждения */
  confirmLabel?: string;
  /** Подпись кнопки отмены */
  cancelLabel?: string;
};

export const DATA_GRID_RESET_FILTERS_CONFIRM_DEFAULTS = {
  title: 'Сбросить все фильтры?',
  description: 'Будут сброшены все применённые фильтры таблицы.',
  confirmLabel: 'Сбросить',
  cancelLabel: 'Отмена',
} as const satisfies Required<DataGridResetFiltersConfirmTexts>;

/**
 * Собирает финальные тексты модалки сброса фильтров.
 * @param overrides — частичные переопределения из пропсов **DataGrid**
 */
export function resolveDataGridResetFiltersConfirmTexts(
  overrides?: DataGridResetFiltersConfirmTexts,
): Required<DataGridResetFiltersConfirmTexts> {
  return {
    title: overrides?.title ?? DATA_GRID_RESET_FILTERS_CONFIRM_DEFAULTS.title,
    description: overrides?.description ?? DATA_GRID_RESET_FILTERS_CONFIRM_DEFAULTS.description,
    confirmLabel: overrides?.confirmLabel ?? DATA_GRID_RESET_FILTERS_CONFIRM_DEFAULTS.confirmLabel,
    cancelLabel: overrides?.cancelLabel ?? DATA_GRID_RESET_FILTERS_CONFIRM_DEFAULTS.cancelLabel,
  };
}
