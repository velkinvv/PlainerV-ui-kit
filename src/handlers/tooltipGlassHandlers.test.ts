import { ThemeColorScheme } from '../types/theme';
import type { Colors } from '../types/theme';
import {
  getTooltipGlassSurfaceTokens,
  getTooltipSurfaceTokens,
  isTooltipGlassTheme,
} from './tooltipGlassHandlers';

describe('tooltipGlassHandlers', () => {
  const colors = {
    info: '#2196f3',
  } as Colors;

  const glassContext = {
    mode: ThemeColorScheme.LIGHT,
    colors,
    tooltips: {
      settings: {
        backdropFilter: 'blur(12px)',
      },
    },
  };

  it('isTooltipGlassTheme определяет glass по backdropFilter', () => {
    expect(isTooltipGlassTheme(glassContext)).toBe(true);
    expect(isTooltipGlassTheme({ mode: ThemeColorScheme.LIGHT, colors })).toBe(false);
  });

  it('getTooltipGlassSurfaceTokens возвращает полупрозрачный фон', () => {
    const tokens = getTooltipGlassSurfaceTokens(glassContext);
    expect(tokens.background).toMatch(/^rgba\(/);
    expect(tokens.arrowColor).toMatch(/^rgba\(/);
    expect(tokens.border).toContain('solid');
  });

  it('getTooltipSurfaceTokens возвращает непрозрачный info в обычной теме', () => {
    const tokens = getTooltipSurfaceTokens({ mode: ThemeColorScheme.LIGHT, colors });
    expect(tokens.background).toBe('#2196f3');
  });
});
