import { lightTableTheme } from '@/themes/table/light';
import {
  DEFAULT_STICKY_THEAD_SECOND_ROW_OFFSET,
  formatStickyTheadSecondRowOffset,
  resolveTableBodyCellRowDivider,
  resolveTableCellBottomBorder,
  resolveTableHeadToBodyCellDivider,
} from './tableRowDividerHandlers';

const themeSlice = { tables: lightTableTheme };

describe('resolveTableBodyCellRowDivider', () => {
  it('собирает границу строки тела из токена rowBorder', () => {
    expect(resolveTableBodyCellRowDivider(themeSlice)).toBe(
      `1px solid ${lightTableTheme.body.rowBorder}`,
    );
  });
});

describe('resolveTableHeadToBodyCellDivider', () => {
  it('для обычной колонки берёт header.borderBottom, а не слабый headBorderBottom', () => {
    expect(resolveTableHeadToBodyCellDivider(themeSlice, false)).toBe(
      lightTableTheme.header.borderBottom,
    );
    expect(resolveTableHeadToBodyCellDivider(themeSlice, false)).not.toBe(
      lightTableTheme.cell.headBorderBottom,
    );
  });

  it('для активной сортировки оставляет усиленную границу колонки', () => {
    expect(resolveTableHeadToBodyCellDivider(themeSlice, true)).toBe(
      lightTableTheme.cell.headActiveSortBorderBottom,
    );
  });
});

describe('resolveTableCellBottomBorder', () => {
  it('для тела рисует разделитель на ячейке, а не на tr', () => {
    expect(
      resolveTableCellBottomBorder({ isHead: false, theme: themeSlice }),
    ).toBe(`1px solid ${lightTableTheme.body.rowBorder}`);
  });

  it('для шапки отделяет последнюю строку thead от тела', () => {
    expect(resolveTableCellBottomBorder({ isHead: true, theme: themeSlice })).toBe(
      lightTableTheme.header.borderBottom,
    );
  });
});

describe('formatStickyTheadSecondRowOffset', () => {
  it('округляет измеренную высоту toolbar в px', () => {
    expect(formatStickyTheadSecondRowOffset(47.6)).toBe('48px');
    expect(formatStickyTheadSecondRowOffset(36)).toBe('36px');
  });

  it('при нулевой или невалидной высоте оставляет запасной отступ', () => {
    expect(formatStickyTheadSecondRowOffset(0)).toBe(DEFAULT_STICKY_THEAD_SECOND_ROW_OFFSET);
    expect(formatStickyTheadSecondRowOffset(Number.NaN)).toBe(
      DEFAULT_STICKY_THEAD_SECOND_ROW_OFFSET,
    );
  });
});
