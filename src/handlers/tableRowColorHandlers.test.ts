import {
  resolveTableRowBackgroundColor,
  resolveTableRowColorFromMap,
  resolveTableRowColorResolver,
  resolveTableColumnBackgroundColor,
} from './tableRowColorHandlers';
import type { Colors } from '../types/theme';

describe('tableRowColorHandlers', () => {
  const colors = {
    danger: '#ff0000',
    success: '#00ff00',
    backgroundSecondary: '#ffffff',
  } as Colors;

  it('resolveTableRowColorResolver поддерживает строку и функцию', () => {
    expect(resolveTableRowColorResolver('#abc', colors)).toBe('#abc');
    expect(
      resolveTableRowColorResolver(
        (palette) => `mix(${palette.danger}, ${palette.backgroundSecondary})`,
        colors,
      ),
    ).toBe('mix(#ff0000, #ffffff)');
  });

  it('resolveTableRowColorFromMap резолвит ключ из карты', () => {
    const rowColorMap = {
      danger: (palette: Colors) => palette.danger,
      success: '#0f0',
    };

    expect(resolveTableRowColorFromMap('danger', rowColorMap, colors)).toBe('#ff0000');
    expect(resolveTableRowColorFromMap('success', rowColorMap, colors)).toBe('#0f0');
    expect(resolveTableRowColorFromMap('missing', rowColorMap, colors)).toBeUndefined();
  });

  it('resolveTableRowBackgroundColor отдаёт приоритет явному rowColor', () => {
    const rowColorMap = {
      danger: '#f00',
    };

    expect(
      resolveTableRowBackgroundColor({
        rowColor: ' #abc ',
        rowColorKey: 'danger',
        rowColorMap,
        colors,
      }),
    ).toBe('#abc');

    expect(
      resolveTableRowBackgroundColor({
        rowColorKey: 'danger',
        rowColorMap,
        colors,
      }),
    ).toBe('#f00');
  });

  it('resolveTableColumnBackgroundColor резолвит ключ из карты колонок', () => {
    const columnColorMap = {
      info: '#00f',
    };

    expect(
      resolveTableColumnBackgroundColor({
        columnColorKey: 'info',
        columnColorMap,
        colors,
      }),
    ).toBe('#00f');
  });
});
