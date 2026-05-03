import {
  clampDataGridColumnResizeWidthPx,
  parseDataGridColumnMinWidthConstraintPx,
  parseDataGridColumnWidthToPixels,
} from './dataGridColumnResizeHandlers';

describe('dataGridColumnResizeHandlers', () => {
  it('parseDataGridColumnWidthToPixels понимает число и строку с px', () => {
    expect(parseDataGridColumnWidthToPixels(140, 99)).toBe(140);
    expect(parseDataGridColumnWidthToPixels('200px', 50)).toBe(200);
    expect(parseDataGridColumnWidthToPixels('  120px  ', 50)).toBe(120);
  });

  it('parseDataGridColumnWidthToPixels при неизвестной строке использует измеренную ширину', () => {
    expect(parseDataGridColumnWidthToPixels('12rem', 80)).toBe(80);
    expect(parseDataGridColumnWidthToPixels(undefined, 72)).toBe(72);
  });

  it('parseDataGridColumnMinWidthConstraintPx учитывает minWidth колонки', () => {
    expect(parseDataGridColumnMinWidthConstraintPx(48)).toBe(48);
    expect(parseDataGridColumnMinWidthConstraintPx('80px')).toBe(80);
  });

  it('clampDataGridColumnResizeWidthPx ограничивает диапазон', () => {
    expect(clampDataGridColumnResizeWidthPx(10, 40, 200)).toBe(40);
    expect(clampDataGridColumnResizeWidthPx(500, 40, 200)).toBe(200);
    expect(clampDataGridColumnResizeWidthPx(100, 40, 200)).toBe(100);
  });
});
