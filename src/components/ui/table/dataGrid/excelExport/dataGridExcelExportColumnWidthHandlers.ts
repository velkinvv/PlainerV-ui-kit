import type { DataGridExcelExportColumn } from '@/types/ui';

/** Ширина колонки в файле по умолчанию, если в гриде не задана `width` (px) */
export const DATA_GRID_EXCEL_EXPORT_DEFAULT_COLUMN_WIDTH_PX = 96;

/**
 * Перевод ширины колонки из пикселей (как в **DataGrid**) в единицы `ss:Width` SpreadsheetML.
 * Excel интерпретирует `ss:Width` как ширину в пунктах (1/72 дюйма); для 96 DPI: px × 0,75.
 * @param widthPx — ширина колонки в пикселях
 */
export function convertDataGridColumnWidthPxToSpreadsheetWidth(widthPx: number): number {
  const safePixels = Math.max(1, widthPx);
  const widthPoints = (safePixels * 72) / 96;
  return Math.round(widthPoints * 100) / 100;
}

/**
 * Ширина колонки выгрузки в SpreadsheetML (`ss:Width`).
 * @param column — колонка выгрузки
 */
export function resolveDataGridExcelExportSpreadsheetColumnWidth(
  column: DataGridExcelExportColumn,
): number {
  const widthPx = column.widthPx ?? DATA_GRID_EXCEL_EXPORT_DEFAULT_COLUMN_WIDTH_PX;
  return convertDataGridColumnWidthPxToSpreadsheetWidth(widthPx);
}

/**
 * XML-описание ширин колонок для `<Table>` (перед строками данных).
 * @param exportColumns — колонки выгрузки с `widthPx`
 */
export function buildDataGridExcelSpreadsheetColumnDefinitionsXml(
  exportColumns: readonly DataGridExcelExportColumn[],
): string {
  return exportColumns
    .map((column) => {
      const width = resolveDataGridExcelExportSpreadsheetColumnWidth(column);
      return `<Column ss:Width="${width}"/>`;
    })
    .join('\n   ');
}
