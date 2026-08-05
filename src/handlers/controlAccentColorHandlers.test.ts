import type { DefaultTheme } from 'styled-components';
import {
  CONTROL_COLOR_PRESETS,
  isControlColorPreset,
  resolveControlAccentColors,
} from './controlAccentColorHandlers';

const mockTheme = {
  colors: {
    primary: '#1111ff',
    primaryHover: '#0000ee',
    info: '#1111ff',
    infoHover: '#0000ee',
    success: '#00aa00',
    successHover: '#008800',
    danger: '#cc0000',
    dangerHover: '#990000',
    warning: '#ff8800',
  },
} as DefaultTheme;

describe('controlAccentColorHandlers', () => {
  it('CONTROL_COLOR_PRESETS содержит ожидаемые ключи', () => {
    expect(CONTROL_COLOR_PRESETS).toEqual(['primary', 'success', 'error', 'warning', 'info']);
  });

  it('isControlColorPreset', () => {
    expect(isControlColorPreset('success')).toBe(true);
    expect(isControlColorPreset('#ff00aa')).toBe(false);
    expect(isControlColorPreset(undefined)).toBe(false);
  });

  it('resolveControlAccentColors: default = success', () => {
    expect(resolveControlAccentColors(mockTheme)).toEqual({
      checked: '#00aa00',
      checkedHover: '#008800',
      focusRing: '#00aa00',
    });
  });

  it('resolveControlAccentColors: error → danger', () => {
    expect(resolveControlAccentColors(mockTheme, 'error').checked).toBe('#cc0000');
  });

  it('resolveControlAccentColors: primary и info раздельно', () => {
    const themeWithDistinctInfo = {
      colors: {
        ...mockTheme.colors,
        info: '#00ccff',
        infoHover: '#00aadd',
      },
    } as DefaultTheme;

    expect(resolveControlAccentColors(themeWithDistinctInfo, 'primary').checked).toBe('#1111ff');
    expect(resolveControlAccentColors(themeWithDistinctInfo, 'info').checked).toBe('#00ccff');
    expect(resolveControlAccentColors(themeWithDistinctInfo, 'info').checkedHover).toBe('#00aadd');
  });

  it('resolveControlAccentColors: произвольный CSS-цвет', () => {
    const resolved = resolveControlAccentColors(mockTheme, '#ff00aa');
    expect(resolved.checked).toBe('#ff00aa');
    expect(resolved.focusRing).toBe('#ff00aa');
    expect(resolved.checkedHover).toContain('#ff00aa');
  });
});
