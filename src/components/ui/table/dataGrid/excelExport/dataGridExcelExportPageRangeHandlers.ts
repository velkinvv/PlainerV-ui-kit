import type { DataGridExcelExportPageRangeForm } from './dataGridExcelExportTextHandlers';

/**
 * Парсинг номера страницы из строки поля ввода (пробелы игнорируются).
 * @param value — значение поля
 */
export function parseDataGridExcelExportPageNumber(value: string | null | undefined): number {
  if (!value) {
    return 0;
  }
  const normalized = value.replace(/\s/g, '');
  const parsed = Number.parseInt(normalized, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

/** Ошибки валидации диапазона страниц */
export type DataGridExcelExportPageRangeErrors = {
  startPage?: string;
  endPage?: string;
};

/**
 * Валидация диапазона страниц выгрузки (номера страниц с 1).
 * @param form — значения полей формы
 * @param totalPages — всего страниц в таблице (минимум 1)
 */
export function validateDataGridExcelExportPageRange(
  form: DataGridExcelExportPageRangeForm,
  totalPages: number,
): DataGridExcelExportPageRangeErrors {
  const safeTotalPages = Math.max(1, totalPages);
  const startPage = parseDataGridExcelExportPageNumber(form.startPage);
  const endPage = parseDataGridExcelExportPageNumber(form.endPage);
  const errors: DataGridExcelExportPageRangeErrors = {};

  if (startPage <= 0) {
    errors.startPage = 'Введите значение';
  } else if (startPage > safeTotalPages) {
    errors.startPage = 'Не может быть больше количества страниц';
  }

  if (endPage <= 0) {
    errors.endPage = 'Введите значение';
  } else if (endPage > safeTotalPages) {
    errors.endPage = 'Не может быть больше количества страниц';
  } else if (startPage > 0 && endPage < startPage) {
    errors.endPage = 'Не может быть меньше начальной страницы';
  }

  return errors;
}

/**
 * Есть ли ошибки валидации диапазона страниц.
 * @param errors — результат `validateDataGridExcelExportPageRange`
 */
export function hasDataGridExcelExportPageRangeErrors(
  errors: DataGridExcelExportPageRangeErrors,
): boolean {
  return Boolean(errors.startPage ?? errors.endPage);
}

/**
 * Число страниц по общему количеству записей и размеру страницы.
 * @param totalCount — всего записей
 * @param pageSize — строк на странице
 */
export function calculateDataGridExcelExportTotalPages(
  totalCount: number,
  pageSize: number,
): number {
  const safePageSize = Math.max(1, pageSize);
  const safeTotal = Math.max(0, totalCount);
  return Math.max(1, Math.ceil(safeTotal / safePageSize));
}

/**
 * Оценка числа строк к выгрузке в выбранном диапазоне страниц.
 * @param form — диапазон страниц (строки полей)
 * @param totalCount — всего записей в наборе
 * @param pageSize — размер страницы
 */
export function calculateDataGridExcelExportRowCountInRange(
  form: DataGridExcelExportPageRangeForm,
  totalCount: number,
  pageSize: number,
): number {
  const safePageSize = Math.max(1, pageSize);
  const startPage = parseDataGridExcelExportPageNumber(form.startPage);
  const endPage = parseDataGridExcelExportPageNumber(form.endPage);
  if (startPage <= 0 || endPage <= 0 || endPage < startPage) {
    return 0;
  }
  const pagesCount = endPage - startPage + 1;
  const rowsInRange = pagesCount * safePageSize;
  const offset = (startPage - 1) * safePageSize;
  const remaining = Math.max(0, totalCount - offset);
  return Math.min(rowsInRange, remaining);
}

/**
 * Процент прогресса выгрузки (0–100).
 * @param loaded — загружено строк
 * @param total — всего к загрузке
 */
export function calculateDataGridExcelExportProgressPercent(loaded: number, total: number): number {
  const safeTotal = Math.max(1, total);
  const safeLoaded = Math.max(0, loaded);
  return Math.min(100, Math.round((safeLoaded / safeTotal) * 100));
}

/**
 * Начальное состояние формы диапазона (1-based страницы).
 * @param startPage — начальная страница
 * @param endPage — конечная страница
 */
export function createDataGridExcelExportInitialPageRange(
  startPage = 1,
  endPage = 1,
): DataGridExcelExportPageRangeForm {
  return {
    startPage: String(Math.max(1, startPage)),
    endPage: String(Math.max(1, endPage)),
  };
}
