import {
  buildDataGridExcelSpreadsheetColumnDefinitionsXml,
  convertDataGridColumnWidthPxToSpreadsheetWidth,
} from './dataGridExcelExportColumnWidthHandlers';

describe('dataGridExcelExportColumnWidthHandlers', () => {
  it('convertDataGridColumnWidthPxToSpreadsheetWidth переводит px в пункты', () => {
    expect(convertDataGridColumnWidthPxToSpreadsheetWidth(96)).toBe(72);
    expect(convertDataGridColumnWidthPxToSpreadsheetWidth(160)).toBe(120);
  });

  it('buildDataGridExcelSpreadsheetColumnDefinitionsXml создаёт Column с разной шириной', () => {
    const xml = buildDataGridExcelSpreadsheetColumnDefinitionsXml([
      { key: 'a', header: 'A', widthPx: 80 },
      { key: 'b', header: 'B', widthPx: 200 },
    ]);
    expect(xml).toContain('<Column ss:Width="60"/>');
    expect(xml).toContain('<Column ss:Width="150"/>');
  });
});
