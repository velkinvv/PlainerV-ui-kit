import type { TableCellFormat, TableCellFormatContext } from '@/types/ui';
import { formatTableCellExportCellValue } from './formatTableCellExportCellValue';

/**
 * То же, что `formatTableCellExportCellValue`, но только текст (без стилей).
 * @param params.value — значение поля
 * @param params.row — строка (опционально)
 * @param params.field — ключ колонки
 * @param params.rowIndex — индекс строки
 * @param params.format — пресет из `columns[].format`
 */
export function formatTableCellValueForExport<Row = unknown>(
  params: TableCellFormatContext<Row> & { format: TableCellFormat<Row> },
): string {
  return formatTableCellExportCellValue(params).text;
}
