import type {
  DataGridBaseRow,
  DataGridColumn,
  DataGridExcelExportCellStyle,
  DataGridExcelExportCellValue,
  DataGridExcelExportCellValueInput,
  DataGridExcelExportColumn,
} from '@/types/ui';
import { formatTableCellExportCellValue } from '@/handlers/tableCellFormat/formatTableCellExportCellValue';
import { formatTableCellValueForExport } from '@/handlers/tableCellFormat/formatTableCellValueForExport';
import { reactNodeToExportPlainText } from '@/handlers/tableCellFormat/reactNodeToExportPlainText';
import { getDataGridCellValue } from '../dataGridHandlers';
import { formatDataGridExcelExportCellValue } from './dataGridExcelExportColumnHandlers';
import { extractDataGridExcelExportStyleFromReactNode } from './dataGridExcelExportReactStyleExtractHandlers';
import {
  isEmptyDataGridExcelExportCellStyle,
  mergeDataGridExcelExportCellStyles,
} from './dataGridExcelExportSpreadsheetStyleHandlers';

/**
 * Нормализует результат `exportValueGetter` в объект выгрузки.
 * @param rawValue — строка, число или `{ text, style? }`
 */
export function normalizeDataGridExcelExportCellValueInput(
  rawValue: DataGridExcelExportCellValueInput,
): DataGridExcelExportCellValue {
  if (
    rawValue !== null &&
    typeof rawValue === 'object' &&
    'text' in rawValue &&
    typeof (rawValue as DataGridExcelExportCellValue).text === 'string'
  ) {
    const cellValue = rawValue as DataGridExcelExportCellValue;
    return {
      text: cellValue.text,
      style: cellValue.style,
    };
  }
  return {
    text: formatDataGridExcelExportCellValue(rawValue),
  };
}

/**
 * Текст и стили ячейки для Excel.
 * @param row — строка данных
 * @param column — колонка грида
 * @param rowIndex — индекс строки на текущей выгрузке
 */
export function resolveDataGridExportCellValue<Row extends DataGridBaseRow>(
  row: Row,
  column: DataGridColumn<Row>,
  rowIndex: number,
): DataGridExcelExportCellValue {
  const fieldKey = String(column.field);

  if (column.exportValueGetter) {
    const fromGetter = normalizeDataGridExcelExportCellValueInput(column.exportValueGetter(row));
    const overrideStyle = column.exportCellStyle?.(row);
    return {
      text: fromGetter.text,
      style: mergeDataGridExcelExportCellStyles(fromGetter.style, overrideStyle),
    };
  }

  const cellValue = column.valueGetter
    ? column.valueGetter(row)
    : getDataGridCellValue(row, column.field);

  let resolved: DataGridExcelExportCellValue;

  if (column.format) {
    resolved = formatTableCellExportCellValue({
      value: cellValue,
      row,
      field: fieldKey,
      rowIndex,
      format: column.format,
    });
  } else if (column.render) {
    const renderedNode = column.render({
      row,
      field: fieldKey,
      value: cellValue,
      rowIndex,
    });
    const textFromRender = reactNodeToExportPlainText(renderedNode, '');
    const styleFromRender = extractDataGridExcelExportStyleFromReactNode(renderedNode);
    resolved = {
      text: textFromRender.trim() !== '' ? textFromRender.trim() : formatDataGridExcelExportCellValue(cellValue),
      style: styleFromRender,
    };
  } else {
    resolved = {
      text: formatDataGridExcelExportCellValue(cellValue),
    };
  }

  const exportCellStyle = column.exportCellStyle?.(row);
  if (!isEmptyDataGridExcelExportCellStyle(exportCellStyle)) {
    resolved = {
      text: resolved.text,
      style: mergeDataGridExcelExportCellStyles(resolved.style, exportCellStyle),
    };
  }

  return resolved;
}

/**
 * @deprecated Используйте `resolveDataGridExportCellValue`. Оставлено для совместимости.
 */
export function resolveDataGridExportCellText<Row extends DataGridBaseRow>(
  row: Row,
  column: DataGridColumn<Row>,
  rowIndex: number,
): string {
  return resolveDataGridExportCellValue(row, column, rowIndex).text;
}

/**
 * Карта колонок грида по `field` для выгрузки.
 * @param gridColumns — колонки **DataGrid**
 */
export function buildDataGridExportColumnsByFieldMap<Row extends DataGridBaseRow>(
  gridColumns: readonly DataGridColumn<Row>[],
): Map<string, DataGridColumn<Row>> {
  const columnsByField = new Map<string, DataGridColumn<Row>>();
  for (const column of gridColumns) {
    columnsByField.set(String(column.field), column);
  }
  return columnsByField;
}

/**
 * Значения ячеек одной строки для Excel (текст + стили).
 * @param row — строка данных
 * @param exportColumns — колонки файла
 * @param gridColumnsByField — колонки грида по ключу `field`
 * @param rowIndex — индекс строки
 * @param rowRecordFallback — плоский объект при `mapRowData` (только текст, без стилей колонок)
 */
export function buildDataGridExcelExportRowCellValues<Row extends DataGridBaseRow>(
  row: Row,
  exportColumns: readonly DataGridExcelExportColumn[],
  gridColumnsByField: ReadonlyMap<string, DataGridColumn<Row>>,
  rowIndex: number,
  rowRecordFallback?: Record<string, unknown>,
): DataGridExcelExportCellValue[] {
  return exportColumns.map((exportColumn) => {
    const gridColumn = gridColumnsByField.get(exportColumn.key);
    if (gridColumn) {
      return resolveDataGridExportCellValue(row, gridColumn, rowIndex);
    }
    if (rowRecordFallback) {
      return {
        text: formatDataGridExcelExportCellValue(rowRecordFallback[exportColumn.key]),
      };
    }
    return { text: '' };
  });
}
