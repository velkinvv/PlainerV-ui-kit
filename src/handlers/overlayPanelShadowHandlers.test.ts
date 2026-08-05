import { ThemeColorScheme } from '../types/theme';
import { glassDarkTheme, glassLightTheme, lightTheme } from '../themes/themes';
import { mixColorWithTransparent } from './glassColorHandlers';
import {
  getOverlayPanelGlassBackground,
  isOverlayPanelGlassTheme,
  resolveOverlayPanelBackground,
} from './overlayPanelGlassHandlers';
import {
  overlayPanelBackgroundFromTheme,
  overlayPanelBackdropFilterFromTheme,
} from './overlayPanelShadowHandlers';

describe('overlayPanelGlassHandlers', () => {
  it('isOverlayPanelGlassTheme определяет glass по surfaceMaterial', () => {
    expect(isOverlayPanelGlassTheme(glassLightTheme)).toBe(true);
    expect(isOverlayPanelGlassTheme(lightTheme)).toBe(false);
  });

  it('getOverlayPanelGlassBackground возвращает лёгкую прозрачность', () => {
    expect(getOverlayPanelGlassBackground(ThemeColorScheme.LIGHT, '#ffffff')).toBe(
      mixColorWithTransparent('#ffffff', 26),
    );
    expect(getOverlayPanelGlassBackground(ThemeColorScheme.DARK, '#ffffff')).toBe(
      mixColorWithTransparent('#ffffff', 6),
    );
  });

  it('resolveOverlayPanelBackground использует fallback в обычной теме', () => {
    expect(resolveOverlayPanelBackground(lightTheme, '#ffffff')).toBe('#ffffff');
    expect(resolveOverlayPanelBackground(glassLightTheme)).toBe(
      mixColorWithTransparent(glassLightTheme.colors.onAccent, 26),
    );
  });
});

describe('overlayPanelShadowHandlers', () => {
  it('для обычной темы использует fallback или backgroundSecondary', () => {
    expect(overlayPanelBackgroundFromTheme(lightTheme)).toBe(lightTheme.colors.backgroundSecondary);
    expect(overlayPanelBackgroundFromTheme(lightTheme, '#ffffff')).toBe('#ffffff');
  });

  it('для glass-тем использует лёгкую прозрачность и vibrancy', () => {
    expect(overlayPanelBackgroundFromTheme(glassDarkTheme)).toBe(
      mixColorWithTransparent(glassDarkTheme.colors.onAccent, 6),
    );
    expect(overlayPanelBackgroundFromTheme(glassLightTheme)).toBe(
      mixColorWithTransparent(glassLightTheme.colors.onAccent, 26),
    );
    expect(overlayPanelBackdropFilterFromTheme(glassDarkTheme)).toContain('blur(8px)');
    expect(overlayPanelBackdropFilterFromTheme(glassLightTheme)).toContain('blur(8px)');
  });
});
