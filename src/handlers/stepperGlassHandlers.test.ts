import { ThemeColorScheme } from '../types/theme';
import { glassDarkTheme, glassLightTheme } from '../themes/themes';
import {
  getStepperRootSurfaceTokens,
  getStepperTextTokens,
  isStepperGlassTheme,
} from './stepperGlassHandlers';

describe('stepperGlassHandlers', () => {
  const plainContext = {
    mode: ThemeColorScheme.LIGHT,
    colors: {
      backgroundSecondary: '#f5f5f5',
      text: '#212121',
      border: '#e0e0e0',
    },
  };

  const glassContext = {
    mode: ThemeColorScheme.LIGHT,
    colors: glassLightTheme.colors,
    surfaceMaterial: glassLightTheme.surfaceMaterial,
    dropdowns: glassLightTheme.dropdowns,
  };

  it('isStepperGlassTheme определяет glass по surfaceMaterial', () => {
    expect(isStepperGlassTheme(glassContext)).toBe(true);
    expect(isStepperGlassTheme(plainContext)).toBe(false);
  });

  it('getStepperRootSurfaceTokens возвращает лёгкую прозрачность в glass-теме', () => {
    const tokens = getStepperRootSurfaceTokens(glassContext, 'light');
    expect(tokens.background).toBe('rgba(255, 255, 255, 0.26)');
    expect(tokens.border).toContain('solid');
    expect(tokens.backdropFilter).toContain('blur');
  });

  it('getStepperRootSurfaceTokens сохраняет обычный фон вне glass', () => {
    const tokens = getStepperRootSurfaceTokens(plainContext as never, 'light');
    expect(tokens.background).toBe('#f5f5f5');
  });

  it('getStepperTextTokens возвращает светлый текст на тёмной панели в dark-теме', () => {
    const glassDarkContext = {
      mode: ThemeColorScheme.DARK,
      colors: glassDarkTheme.colors,
      surfaceMaterial: glassDarkTheme.surfaceMaterial,
      dropdowns: glassDarkTheme.dropdowns,
    };

    const textTokens = getStepperTextTokens(glassDarkContext, 'dark');

    expect(textTokens.primary).toBe('#FFFFFF');
    expect(textTokens.secondary).toContain('rgba');
    expect(textTokens.tertiary).toContain('rgba');
  });

  it('getStepperRootSurfaceTokens задаёт светлый color для dark appearance в glassDark', () => {
    const glassDarkContext = {
      mode: ThemeColorScheme.DARK,
      colors: glassDarkTheme.colors,
      surfaceMaterial: glassDarkTheme.surfaceMaterial,
      dropdowns: glassDarkTheme.dropdowns,
    };

    const tokens = getStepperRootSurfaceTokens(glassDarkContext, 'dark');

    expect(tokens.color).toBe('#FFFFFF');
    expect(tokens.background).toBe('rgba(255, 255, 255, 0.06)');
  });
});
