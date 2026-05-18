import {
  calculateDataGridExcelExportTotalPages,
  parseDataGridExcelExportPageNumber,
  validateDataGridExcelExportPageRange,
} from './dataGridExcelExportPageRangeHandlers';

describe('dataGridExcelExportPageRangeHandlers', () => {
  it('parseDataGridExcelExportPageNumber убирает пробелы', () => {
    expect(parseDataGridExcelExportPageNumber(' 12 ')).toBe(12);
  });

  it('validateDataGridExcelExportPageRange проверяет границы', () => {
    const errors = validateDataGridExcelExportPageRange(
      { startPage: '0', endPage: '5' },
      3,
    );
    expect(errors.startPage).toBeDefined();
    expect(errors.endPage).toBe('Не может быть больше количества страниц');
  });

  it('calculateDataGridExcelExportTotalPages считает страницы', () => {
    expect(calculateDataGridExcelExportTotalPages(25, 10)).toBe(3);
  });
});
