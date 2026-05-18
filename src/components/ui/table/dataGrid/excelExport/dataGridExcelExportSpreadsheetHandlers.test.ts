import { buildDataGridExcelSpreadsheetXml } from './dataGridExcelExportSpreadsheetHandlers';

describe('buildDataGridExcelSpreadsheetXml', () => {
  it('формирует SpreadsheetML с заголовком и строкой', () => {
    const xml = buildDataGridExcelSpreadsheetXml(
      'Лист1',
      [{ key: 'name', header: 'Имя', widthPx: 120 }],
      [
        [
          {
            text: 'Активен',
            style: { textColor: '#1B5E20', backgroundColor: '#E8F5E9' },
          },
        ],
      ],
    );
    expect(xml).toContain('<Column ss:Width="90"/>');
    expect(xml).toContain('ss:Color="#1B5E20"');
    expect(xml).toContain('ss:Pattern="Solid"');
    expect(xml).toContain('<?xml version="1.0"');
    expect(xml).toContain('<Worksheet ss:Name="Лист1">');
    expect(xml).toContain('Имя');
    expect(xml).toContain('Активен');
  });
});
