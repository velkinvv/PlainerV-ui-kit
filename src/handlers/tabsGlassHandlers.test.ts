import { ThemeColorScheme } from '../types/theme';
import { glassDarkTheme, glassLightTheme } from '../themes/themes';
import { getTabsSurfaceTokens, isTabsGlassTheme } from './tabsGlassHandlers';

describe('tabsGlassHandlers', () => {
  const plainContext = {
    mode: ThemeColorScheme.LIGHT,
    colors: {
      backgroundSecondary: '#ffffff',
      backgroundTertiary: '#f5f5f5',
      borderSecondary: '#e0e0e0',
    },
    boxShadow: { sm: '0 1px 2px rgba(0,0,0,0.08)' },
  };

  const glassLightContext = {
    mode: ThemeColorScheme.LIGHT,
    colors: glassLightTheme.colors,
    surfaceMaterial: glassLightTheme.surfaceMaterial,
    dropdowns: glassLightTheme.dropdowns,
    boxShadow: glassLightTheme.boxShadow,
  };

  it('isTabsGlassTheme определяет glass по surfaceMaterial', () => {
    expect(isTabsGlassTheme(glassLightContext)).toBe(true);
    expect(isTabsGlassTheme(plainContext)).toBe(false);
  });

  it('getTabsSurfaceTokens возвращает более плотный glass-трек', () => {
    const tokens = getTabsSurfaceTokens(glassLightContext);

    expect(tokens.pillTrackBackground).toBe('rgba(255, 255, 255, 0.34)');
    expect(tokens.filledTrackBackground).toBe('rgba(255, 255, 255, 0.34)');
    expect(tokens.pillTrackBorder).toContain('solid');
    expect(tokens.backdropFilter).toContain('blur');
  });

  it('getTabsSurfaceTokens сохраняет обычные фоны вне glass', () => {
    const tokens = getTabsSurfaceTokens(plainContext as never);

    expect(tokens.pillTrackBackground).toBe('#f5f5f5');
    expect(tokens.filledTrackBackground).toBe('#ffffff');
    expect(tokens.backdropFilter).toBeUndefined();
  });

  it('getTabsSurfaceTokens использует более плотный thumb в glassDark', () => {
    const glassDarkContext = {
      mode: ThemeColorScheme.DARK,
      colors: glassDarkTheme.colors,
      surfaceMaterial: glassDarkTheme.surfaceMaterial,
      dropdowns: glassDarkTheme.dropdowns,
      boxShadow: glassDarkTheme.boxShadow,
    };

    const tokens = getTabsSurfaceTokens(glassDarkContext);

    expect(tokens.pillTrackBackground).toBe('rgba(255, 255, 255, 0.1)');
    expect(tokens.pillThumbBackground).toBe('rgba(255, 255, 255, 0.16)');
  });
});
