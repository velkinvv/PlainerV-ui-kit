import { ThemeColorScheme, ThemeMode } from '../types/theme';
import { glassDarkTheme, glassLightTheme } from '../themes/themes';
import { isGlassColorScheme } from './glassSurfaceHandlers';

describe('glassSurfaceHandlers', () => {
  it('isGlassColorScheme возвращает true для glassLight и glassDark', () => {
    expect(isGlassColorScheme(glassLightTheme)).toBe(true);
    expect(isGlassColorScheme(glassDarkTheme)).toBe(true);
  });

  it('glassLight использует blurClasses.glass через surfaceMaterial', () => {
    expect(glassLightTheme.surfaceMaterial?.backdropFilter).toContain('blur(8px)');
    expect(glassLightTheme.surfaceMaterial?.backdropFilter).toContain('saturate(1.8)');
  });

  it('glassDark использует blurClasses.glassDark через surfaceMaterial', () => {
    expect(glassDarkTheme.surfaceMaterial?.backdropFilter).toContain('blur(8px)');
    expect(glassDarkTheme.surfaceMaterial?.backdropFilter).toContain('brightness(0.92)');
  });

  it('glass-темы имеют mesh-gradient фон страницы', () => {
    expect(glassLightTheme.mode).toBe(ThemeColorScheme.LIGHT);
    expect(glassDarkTheme.mode).toBe(ThemeColorScheme.DARK);
    expect(glassLightTheme.surfaceMaterial?.pageBackground).toContain('gradient');
    expect(glassDarkTheme.surfaceMaterial?.pageBackground).toContain('gradient');
  });
});
