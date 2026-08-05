import {
  DEFAULT_INPUT_FIELD_WIDTH_PX,
  getInputFieldWidthCss,
} from './inputFieldLayoutHandlers';

describe('inputFieldLayoutHandlers', () => {
  it('getInputFieldWidthCss: по умолчанию фиксированная ширина', () => {
    expect(getInputFieldWidthCss()).toBe(`${DEFAULT_INPUT_FIELD_WIDTH_PX}px`);
    expect(getInputFieldWidthCss(false, false)).toBe(`${DEFAULT_INPUT_FIELD_WIDTH_PX}px`);
  });

  it('getInputFieldWidthCss: fullWidth даёт 100%', () => {
    expect(getInputFieldWidthCss(true)).toBe('100%');
    expect(getInputFieldWidthCss(true, true)).toBe('100%');
  });

  it('getInputFieldWidthCss: autoWidth даёт auto', () => {
    expect(getInputFieldWidthCss(false, true)).toBe('auto');
  });
});
