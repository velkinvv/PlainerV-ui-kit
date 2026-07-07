import { ThemeColorScheme } from '../types/theme';
import { glassLightTheme } from '../themes/themes';
import { lightModalTheme } from '../themes/modal/light';
import type { Colors } from '../types/theme';
import {
  getModalContainerBackground,
  getModalGlassContainerBackground,
  getModalOverlayTokens,
  isModalGlassTheme,
} from './modalGlassHandlers';

describe('modalGlassHandlers', () => {
  const colors = {
    card: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.5)',
  } as Colors;

  const plainContext = {
    mode: ThemeColorScheme.LIGHT,
    colors,
    modals: lightModalTheme,
  };

  const glassContext = {
    mode: ThemeColorScheme.LIGHT,
    colors: glassLightTheme.colors,
    surfaceMaterial: glassLightTheme.surfaceMaterial,
    modals: {
      ...lightModalTheme,
      overlay: {
        ...lightModalTheme.overlay,
        backdropFilter: 'blur(16px)',
      },
    },
  };

  it('isModalGlassTheme определяет glass по surfaceMaterial', () => {
    expect(isModalGlassTheme(glassContext)).toBe(true);
    expect(isModalGlassTheme(plainContext)).toBe(false);
  });

  it('getModalContainerBackground плотнее Card в glass-теме', () => {
    expect(getModalContainerBackground(glassContext)).toBe('rgba(255, 255, 255, 0.68)');
    expect(getModalGlassContainerBackground(ThemeColorScheme.LIGHT)).toBe(
      'rgba(255, 255, 255, 0.68)',
    );
    expect(getModalContainerBackground(glassContext)).not.toBe(glassLightTheme.colors.card);
  });

  it('getModalOverlayTokens усиливает затемнение оверлея в glass-теме', () => {
    const tokens = getModalOverlayTokens(glassContext);
    expect(tokens.background).toBe('rgba(15, 23, 42, 0.22)');
    expect(tokens.backdropFilter).toBe('blur(16px)');
  });

  it('getModalOverlayTokens сохраняет overlay темы в обычном режиме', () => {
    const tokens = getModalOverlayTokens(plainContext);
    expect(tokens.background).toBe(lightModalTheme.overlay.background);
  });
});
