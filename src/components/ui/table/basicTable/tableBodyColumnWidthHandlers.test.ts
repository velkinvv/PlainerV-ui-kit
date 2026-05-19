import { describe, expect, it } from 'vitest';
import {
  DATA_GRID_EXPANDED_DETAIL_ROW_ATTRIBUTE,
  findTableBodyColumnSyncReferenceRow,
  parseTableCellDeclaredWidthPx,
  shouldSkipTableBodyColumnSyncRow,
} from './tableBodyColumnWidthHandlers';

describe('findTableBodyColumnSyncReferenceRow', () => {
  it('выбирает строку шапки с наибольшим числом ячеек', () => {
    const toolbarRow = { cells: { length: 1 } } as HTMLTableRowElement;
    const headerRow = { cells: { length: 5 } } as HTMLTableRowElement;

    const tableElement = {
      tHead: {
        rows: [toolbarRow, headerRow],
      },
    } as HTMLTableElement;

    expect(findTableBodyColumnSyncReferenceRow(tableElement)).toBe(headerRow);
  });

  it('возвращает null без thead', () => {
    const tableElement = { tHead: null } as HTMLTableElement;
    expect(findTableBodyColumnSyncReferenceRow(tableElement)).toBeNull();
  });
});

describe('parseTableCellDeclaredWidthPx', () => {
  it('парсит px и число без единицы', () => {
    const cellElement = { style: { width: '150px' } } as HTMLTableCellElement;
    expect(parseTableCellDeclaredWidthPx(cellElement)).toBe(150);
  });
});

describe('shouldSkipTableBodyColumnSyncRow', () => {
  it('пропускает строку-деталь раскрытия', () => {
    const rowElement = {
      hasAttribute: (attributeName: string) =>
        attributeName === DATA_GRID_EXPANDED_DETAIL_ROW_ATTRIBUTE,
      cells: { length: 3, 0: { colSpan: 1 } },
    } as unknown as HTMLTableRowElement;

    expect(shouldSkipTableBodyColumnSyncRow(rowElement)).toBe(true);
  });

  it('пропускает строку с одной ячейкой colspan', () => {
    const rowElement = {
      hasAttribute: () => false,
      cells: { length: 1, 0: { colSpan: 4 } },
    } as unknown as HTMLTableRowElement;

    expect(shouldSkipTableBodyColumnSyncRow(rowElement)).toBe(true);
  });

  it('не пропускает обычную строку данных', () => {
    const rowElement = {
      hasAttribute: () => false,
      cells: { length: 3, 0: { colSpan: 1 } },
    } as unknown as HTMLTableRowElement;

    expect(shouldSkipTableBodyColumnSyncRow(rowElement)).toBe(false);
  });
});
