import type {
  DataGridExcelExportCellStyle,
  DataGridExcelExportCellValue,
  TableCellFormat,
  TableCellFormatContext,
} from '@/types/ui';
import { formatTableCellValue, isEmptyTableCellValue } from './formatTableCellValue';
import { reactNodeToExportPlainText } from './reactNodeToExportPlainText';

function resolveEnumMappedExportStyle(
  options:
    | Readonly<Record<string, unknown>>
    | ReadonlyArray<{
        readonly value: string | number | boolean;
        readonly label: unknown;
        readonly exportStyle?: DataGridExcelExportCellStyle;
      }>,
  key: string,
): DataGridExcelExportCellStyle | undefined {
  if (!Array.isArray(options)) {
    return undefined;
  }
  const matchingEntry = options.find((entry) => String(entry.value) === key);
  return matchingEntry?.exportStyle;
}

/**
 * Форматирование ячейки для Excel: текст и опциональные стили (`format.enum.exportStyle` и др.).
 * @param params — контекст и `format` колонки
 */
export function formatTableCellExportCellValue<Row = unknown>(
  params: TableCellFormatContext<Row> & { format: TableCellFormat<Row> },
): DataGridExcelExportCellValue {
  const { value, format } = params;
  const displayedNode = formatTableCellValue(params);
  const plainText = reactNodeToExportPlainText(displayedNode, '');

  let style: DataGridExcelExportCellStyle | undefined;

  if (format.type === 'enum' && !isEmptyTableCellValue(value)) {
    style = resolveEnumMappedExportStyle(format.options, String(value));
  }

  if (plainText.trim() !== '') {
    return { text: plainText.trim(), style };
  }

  if (format.type === 'enum' && !isEmptyTableCellValue(value)) {
    return { text: String(value), style };
  }

  if ('fallback' in format && format.fallback !== undefined && format.fallback !== null) {
    const fallbackText = reactNodeToExportPlainText(format.fallback, '');
    if (fallbackText.trim() !== '') {
      return { text: fallbackText.trim(), style };
    }
  }

  return { text: '', style };
}
