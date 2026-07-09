import type { ReactNode } from 'react';
import type { DataGridBaseRow, DataGridColumn, DataGridExcelExportColumn } from '@/types/ui';
import { getDataGridCellValue } from '../dataGridHandlers';
import { parseDataGridColumnWidthToPixels } from '../dataGridColumnResizeHandlers';
import { DATA_GRID_EXCEL_EXPORT_DEFAULT_COLUMN_WIDTH_PX } from './dataGridExcelExportColumnWidthHandlers';

/**
 * Преобразование React-узла заголовка колонки в строку для Excel.
 * @param headerName — заголовок колонки грида
 * @param fallback — запасной текст (обычно `field`)
 */
export function resolveDataGridColumnHeaderText(
  headerName: ReactNode | undefined,
  fallback: string,
): string {
  if (headerName === null || headerName === undefined || typeof headerName === 'boolean') {
    return fallback;
  }
  if (typeof headerName === 'string' || typeof headerName === 'number') {
    return String(headerName);
  }
  if (Array.isArray(headerName)) {
    return headerName
      .map((part) => resolveDataGridColumnHeaderText(part, ''))
      .filter(Boolean)
      .join(' ')
      .trim();
  }
  if (typeof headerName === 'object' && headerName !== null && 'props' in headerName) {
    const elementProps = (headerName as { props?: { children?: ReactNode } }).props;
    if (elementProps?.children !== undefined) {
      const nested = resolveDataGridColumnHeaderText(elementProps.children, fallback);
      if (nested) {
        return nested;
      }
    }
  }
  return fallback;
}

/**
 * Сборка колонок выгрузки из описания колонок **DataGrid**.
 * @param columns — колонки грида
 * @param ignoreFields — поля, которые не попадают в файл
 */
export function convertDataGridColumnsToExportColumns<Row extends DataGridBaseRow>(
  columns: readonly DataGridColumn<Row>[],
  ignoreFields?: readonly string[],
): DataGridExcelExportColumn[] {
  const ignored = new Set(ignoreFields?.map(String) ?? []);
  return columns
    .filter((column) => !column.hide && !ignored.has(String(column.field)))
    .map((column) => {
      const fieldKey = String(column.field);
      return {
        key: fieldKey,
        header: resolveDataGridColumnHeaderText(column.headerName, fieldKey),
        widthPx: parseDataGridColumnWidthToPixels(
          column.width,
          DATA_GRID_EXCEL_EXPORT_DEFAULT_COLUMN_WIDTH_PX,
        ),
      };
    });
}

/**
 * Строковое представление значения ячейки для Excel.
 * @param value — сырое значение
 */
export function formatDataGridExcelExportCellValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === 'boolean') {
    return value ? 'Да' : 'Нет';
  }
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

/**
 * Плоский объект строки по колонкам грида (для выгрузки без `mapRowData`).
 * @param row — строка данных
 * @param columns — колонки грида
 */
export function mapDataGridRowToExportRecord<Row extends DataGridBaseRow>(
  row: Row,
  columns: readonly DataGridColumn<Row>[],
): Record<string, unknown> {
  const record: Record<string, unknown> = {};
  for (const column of columns) {
    const fieldKey = String(column.field);
    const rawValue = column.valueGetter
      ? column.valueGetter(row)
      : getDataGridCellValue(row, column.field);
    record[fieldKey] = rawValue;
  }
  return record;
}
