import {
  formatTableBodyScrollMaxHeight,
  measureElementScrollbarGutterWidth,
  resolveTableBodyScrollHost,
  shouldMeasureTableBodyNaturalColumnWidths,
  shouldUseTableBodyOnlyVerticalScroll,
} from './tableBodyScrollHandlers';

describe('formatTableBodyScrollMaxHeight', () => {
  it('число превращает в px', () => {
    expect(formatTableBodyScrollMaxHeight(320)).toBe('320px');
  });

  it('строку оставляет как есть', () => {
    expect(formatTableBodyScrollMaxHeight('40vh')).toBe('40vh');
  });
});

describe('measureElementScrollbarGutterWidth', () => {
  it('возвращает 0 без скроллбара', () => {
    const scrollElement = { offsetWidth: 200, clientWidth: 200 } as HTMLElement;
    expect(measureElementScrollbarGutterWidth(scrollElement)).toBe(0);
  });

  it('возвращает разницу offset и client', () => {
    const scrollElement = { offsetWidth: 200, clientWidth: 185 } as HTMLElement;
    expect(measureElementScrollbarGutterWidth(scrollElement)).toBe(15);
  });
});

describe('shouldUseTableBodyOnlyVerticalScroll', () => {
  it('true при липкой шапке и лимите высоты', () => {
    expect(shouldUseTableBodyOnlyVerticalScroll(true, 320)).toBe(true);
  });

  it('false без лимита высоты', () => {
    expect(shouldUseTableBodyOnlyVerticalScroll(true, undefined)).toBe(false);
  });

  it('false без липкой шапки', () => {
    expect(shouldUseTableBodyOnlyVerticalScroll(false, 320)).toBe(false);
  });
});

describe('resolveTableBodyScrollHost', () => {
  it('split-tables при лимите высоты', () => {
    expect(resolveTableBodyScrollHost(320)).toBe('split-tables');
  });

  it('undefined без лимита высоты', () => {
    expect(resolveTableBodyScrollHost(undefined)).toBeUndefined();
  });
});

describe('shouldMeasureTableBodyNaturalColumnWidths', () => {
  it('true при горизонтальном скролле', () => {
    expect(shouldMeasureTableBodyNaturalColumnWidths(true)).toBe(true);
  });

  it('false без горизонтального скролла', () => {
    expect(shouldMeasureTableBodyNaturalColumnWidths(false)).toBe(false);
  });
});
