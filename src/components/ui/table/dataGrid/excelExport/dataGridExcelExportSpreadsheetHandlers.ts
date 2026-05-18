import type { DataGridBaseRow, DataGridColumn, DataGridExcelExportColumn } from '@/types/ui';
import type { DataGridExcelExportCellValue } from '@/types/ui';
import { mapDataGridRowToExportRecord } from './dataGridExcelExportColumnHandlers';
import {
  buildDataGridExcelExportRowCellValues,
  buildDataGridExportColumnsByFieldMap,
} from './dataGridExcelExportCellValueHandlers';
import { buildDataGridExcelSpreadsheetColumnDefinitionsXml } from './dataGridExcelExportColumnWidthHandlers';
import {
  DataGridExcelExportSpreadsheetStyleRegistry,
  buildSpreadsheetDataCellXml,
} from './dataGridExcelExportSpreadsheetStyleHandlers';

/** Экранирование текста для XML SpreadsheetML */
function escapeSpreadsheetXmlText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Генерация SpreadsheetML (`.xls`) без внешних библиотек.
 * @param sheetName — имя листа
 * @param exportColumns — колонки (заголовок и `widthPx`)
 * @param rows — строки ячеек (текст + опциональные стили)
 */
export function buildDataGridExcelSpreadsheetXml(
  sheetName: string,
  exportColumns: readonly DataGridExcelExportColumn[],
  rows: readonly (readonly DataGridExcelExportCellValue[])[],
): string {
  const safeSheetName = escapeSpreadsheetXmlText(sheetName.slice(0, 31) || 'Sheet1');
  const columnDefinitionsXml = buildDataGridExcelSpreadsheetColumnDefinitionsXml(exportColumns);
  const styleRegistry = new DataGridExcelExportSpreadsheetStyleRegistry();

  const headerRow = exportColumns
    .map(
      (column) =>
        `<Cell><Data ss:Type="String">${escapeSpreadsheetXmlText(column.header)}</Data></Cell>`,
    )
    .join('');

  const dataRows = rows
    .map((rowCells) => {
      const cellsXml = rowCells
        .map((cell) => {
          const styleIdentifier = styleRegistry.registerStyle(cell.style);
          return buildSpreadsheetDataCellXml(cell, styleIdentifier, escapeSpreadsheetXmlText);
        })
        .join('');
      return `<Row>${cellsXml}</Row>`;
    })
    .join('');

  const customStylesXml = styleRegistry.getRegisteredStylesXml();
  const stylesBlock = customStylesXml
    ? ` <Styles>\n  <Style ss:ID="Header">\n   <Font ss:Bold="1"/>\n  </Style>\n  ${customStylesXml}\n </Styles>`
    : ` <Styles>\n  <Style ss:ID="Header">\n   <Font ss:Bold="1"/>\n  </Style>\n </Styles>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
${stylesBlock}
 <Worksheet ss:Name="${safeSheetName}">
  <Table>
   ${columnDefinitionsXml}
   <Row ss:StyleID="Header">${headerRow}</Row>
   ${dataRows}
  </Table>
 </Worksheet>
</Workbook>`;
}

/**
 * Скачивание строки SpreadsheetML как файла `.xls`.
 * @param xmlContent — содержимое XML
 * @param fileName — имя файла (расширение `.xls` добавится при отсутствии)
 */
export function downloadDataGridExcelSpreadsheetFile(
  xmlContent: string,
  fileName: string,
): void {
  const blob = new Blob([xmlContent], {
    type: 'application/vnd.ms-excel;charset=utf-8',
  });
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = fileName.toLowerCase().endsWith('.xls') ? fileName : `${fileName}.xls`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
}

/** Параметры выгрузки таблицы в Excel */
export type ExportDataGridToExcelParams<Row extends DataGridBaseRow> = {
  dataFetcher: (
    skip: number,
    take: number,
    signal?: AbortSignal,
  ) => Promise<readonly Row[]>;
  exportColumns: readonly DataGridExcelExportColumn[];
  gridColumns: readonly DataGridColumn<Row>[];
  totalCount: number;
  pageSize: number;
  /** Номер начальной страницы (с 1) */
  startPage: number;
  /** Номер конечной страницы (с 1) */
  endPage: number;
  sheetName?: string;
  mapRowData?: (row: Row) => Record<string, unknown>;
  signal?: AbortSignal;
  onProgress?: (progress: { loaded: number; total: number }) => void;
};

/**
 * Загрузка данных по диапазону страниц и сборка SpreadsheetML.
 * @param params — параметры выгрузки
 * @returns XML-книга для скачивания
 */
export async function buildDataGridExcelExportSpreadsheet<Row extends DataGridBaseRow>(
  params: ExportDataGridToExcelParams<Row>,
): Promise<string> {
  const {
    dataFetcher,
    exportColumns,
    gridColumns,
    totalCount,
    pageSize,
    startPage,
    endPage,
    sheetName = 'Sheet1',
    mapRowData,
    signal,
    onProgress,
  } = params;

  const safePageSize = Math.max(1, pageSize);
  const safeStart = Math.max(1, startPage);
  const safeEnd = Math.max(safeStart, endPage);
  const offset = (safeStart - 1) * safePageSize;
  const maxRowsInRange = (safeEnd - safeStart + 1) * safePageSize;
  const totalToLoad = Math.min(maxRowsInRange, Math.max(0, totalCount - offset));

  const loadedRows: Row[] = [];
  let loaded = 0;

  for (let page = safeStart; page <= safeEnd; page += 1) {
    if (signal?.aborted) {
      throw new DOMException('Выгрузка отменена', 'AbortError');
    }
    const skip = (page - 1) * safePageSize;
    const take = Math.min(safePageSize, Math.max(0, totalCount - skip));
    if (take <= 0) {
      break;
    }
    const chunk = await dataFetcher(skip, take, signal);
    loadedRows.push(...chunk);
    loaded += chunk.length;
    onProgress?.({ loaded, total: totalToLoad });
    if (loaded >= totalToLoad) {
      break;
    }
  }

  const gridColumnsByField = buildDataGridExportColumnsByFieldMap(gridColumns);

  const dataMatrix = loadedRows.map((row, rowIndex) => {
    if (mapRowData) {
      const rowRecord = mapRowData(row);
      return buildDataGridExcelExportRowCellValues(
        row,
        exportColumns,
        gridColumnsByField,
        rowIndex,
        rowRecord,
      );
    }
    return buildDataGridExcelExportRowCellValues(
      row,
      exportColumns,
      gridColumnsByField,
      rowIndex,
    );
  });

  return buildDataGridExcelSpreadsheetXml(sheetName, exportColumns, dataMatrix);
}
