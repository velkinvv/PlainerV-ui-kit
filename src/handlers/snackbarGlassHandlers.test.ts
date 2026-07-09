import { ThemeColorScheme } from '../types/theme';
import {
  getSnackbarGlassSurfaceTokens,
  isSnackbarGlassTheme,
} from './snackbarGlassHandlers';

describe('snackbarGlassHandlers', () => {
  const glassContext = {
    mode: ThemeColorScheme.LIGHT,
    snackbars: {
      settings: {
        backdropFilter: 'blur(12px)',
      },
    },
  };

  it('isSnackbarGlassTheme определяет glass по backdropFilter', () => {
    expect(isSnackbarGlassTheme(glassContext)).toBe(true);
    expect(isSnackbarGlassTheme({ mode: ThemeColorScheme.LIGHT })).toBe(false);
  });

  it('getSnackbarGlassSurfaceTokens возвращает полупрозрачную плашку', () => {
    const tokens = getSnackbarGlassSurfaceTokens(glassContext);
    expect(tokens.surface).toMatch(/^rgba\(/);
    expect(tokens.messageColor).toBeTruthy();
  });
});
