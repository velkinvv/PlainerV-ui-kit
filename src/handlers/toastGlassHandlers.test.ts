import { ThemeColorScheme } from '../types/theme';
import {
  getToastGlassPillVisualTokens,
  getToastGlassSurfaceTokens,
  isToastGlassTheme,
} from './toastGlassHandlers';

describe('toastGlassHandlers', () => {
  const glassContext = {
    mode: ThemeColorScheme.LIGHT,
    toasts: {
      settings: {
        backdropFilter: 'blur(12px)',
      },
    },
  };

  it('isToastGlassTheme определяет glass по backdropFilter', () => {
    expect(isToastGlassTheme(glassContext)).toBe(true);
    expect(isToastGlassTheme({ mode: ThemeColorScheme.LIGHT })).toBe(false);
  });

  it('getToastGlassSurfaceTokens возвращает полупрозрачный фон', () => {
    const tokens = getToastGlassSurfaceTokens('success', glassContext);
    expect(tokens.surface).toMatch(/^rgba\(/);
    expect(tokens.accent).toBeTruthy();
  });

  it('getToastGlassPillVisualTokens возвращает полупрозрачную кнопку действия', () => {
    const tokens = getToastGlassPillVisualTokens('info', glassContext);
    expect(tokens.actionBg).toMatch(/^rgba\(/);
    expect(tokens.border).toContain('solid');
  });
});
