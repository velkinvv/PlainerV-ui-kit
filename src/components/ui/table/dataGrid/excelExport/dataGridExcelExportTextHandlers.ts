import type { DataGridExcelExportTexts } from '@/types/ui';

/** Значения формы диапазона страниц (строки для полей ввода) */
export type DataGridExcelExportPageRangeForm = {
  startPage: string;
  endPage: string;
};

/** Тексты модалки и кнопки выгрузки с подстановкой значений по умолчанию */
export type DataGridExcelExportResolvedTexts = {
  modalTitle: string;
  modalDescription: string;
  rangeHint: string;
  startPageLabel: string;
  endPageLabel: string;
  startPagePlaceholder: string;
  endPagePlaceholder: string;
  cancelLabel: string;
  exportLabel: string;
  loadingLabel: string;
  tooltipText: string;
  exportButtonAriaLabel: string;
  rowsSummary: (params: { totalRows: number; totalPages: number }) => string;
};

const defaultRowsSummary = (params: { totalRows: number; totalPages: number }): string =>
  `Всего записей: ${params.totalRows}, страниц: ${params.totalPages}`;

/**
 * Слияние пользовательских текстов выгрузки Excel с дефолтами на русском языке.
 * @param texts — частичные переопределения из `DataGridExcelExportConfig.texts`
 */
export function resolveDataGridExcelExportTexts(
  texts?: DataGridExcelExportTexts,
): DataGridExcelExportResolvedTexts {
  return {
    modalTitle: texts?.modalTitle ?? 'Выгрузка данных в Excel (.xls)',
    modalDescription:
      texts?.modalDescription ??
      'Укажите диапазон страниц для выгрузки. Данные будут загружены порциями.',
    rangeHint: texts?.rangeHint ?? 'Выберите диапазон выгружаемых страниц',
    startPageLabel: texts?.startPageLabel ?? 'Начальная страница',
    endPageLabel: texts?.endPageLabel ?? 'Конечная страница',
    startPagePlaceholder: texts?.startPagePlaceholder ?? '1',
    endPagePlaceholder: texts?.endPagePlaceholder ?? '1',
    cancelLabel: texts?.cancelLabel ?? 'Отмена',
    exportLabel: texts?.exportLabel ?? 'Выгрузить',
    loadingLabel: texts?.loadingLabel ?? 'Загрузка данных…',
    tooltipText: texts?.tooltipText ?? 'Выгрузить в Excel',
    exportButtonAriaLabel: texts?.exportButtonAriaLabel ?? 'Выгрузить таблицу в Excel',
    rowsSummary: texts?.rowsSummary ?? defaultRowsSummary,
  };
}
