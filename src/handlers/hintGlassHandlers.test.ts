import { ThemeColorScheme } from '../types/theme';
import type { Colors, HintTheme } from '../types/theme';
import { HintVariant } from '../types/ui';
import { lightHintTheme } from '../themes/hint/light';
import {
  getHintGlassSurfaceTokens,
  getHintSurfaceTokens,
  isHintGlassTheme,
} from './hintGlassHandlers';

describe('hintGlassHandlers', () => {
  const colors = {
    info: '#2196f3',
    success: '#22c55e',
    warning: '#eab308',
    danger: '#ef4444',
  } as Colors;

  const hints: HintTheme = {
    ...lightHintTheme,
    settings: {
      ...lightHintTheme.settings,
      backdropFilter: 'blur(12px)',
    },
  };

  const glassContext = {
    mode: ThemeColorScheme.LIGHT,
    colors,
    hints,
  };

  it('isHintGlassTheme определяет glass по backdropFilter', () => {
    expect(isHintGlassTheme(glassContext)).toBe(true);
    expect(
      isHintGlassTheme({
        mode: ThemeColorScheme.LIGHT,
        colors,
        hints: lightHintTheme,
      }),
    ).toBe(false);
  });

  it('getHintGlassSurfaceTokens возвращает полупрозрачный фон как у tooltip', () => {
    const tokens = getHintGlassSurfaceTokens(HintVariant.INFO, glassContext);
    expect(tokens.background).toMatch(/^rgba\(/);
    expect(tokens.background).toContain(', 0.86)');
    expect(tokens.arrowColor).toContain(', 0.86)');
    expect(tokens.border).toContain(', 0.94)');
  });

  it('getHintSurfaceTokens возвращает непрозрачный фон в обычной теме', () => {
    const tokens = getHintSurfaceTokens(HintVariant.INFO, {
      mode: ThemeColorScheme.LIGHT,
      colors,
      hints: lightHintTheme,
    });
    expect(tokens.background).toBe(lightHintTheme.variants.info.background);
  });
});
