import { ThemeColorScheme } from '../../types/theme';
import type { ThemeOverride } from '../../types/themeOverride';
import { Size } from '../../types/sizes';
import { createGlassBoxShadow, createGlassColors } from '../colors/glass';
import {
  createGlassSurfaceMaterial,
  getGlassSurfacePalette,
  type GlassPaletteVariant,
} from '../../variables/glass';
import { glassBackdropFilters } from '../../variables/blur';

/**
 * Создаёт частичное переопределение базовой темы для glass (vibrancy).
 * @param paletteVariant — `light` или `dark` glass-палитра
 */
export function createGlassThemeOverride(paletteVariant: GlassPaletteVariant): ThemeOverride {
  const glassPalette = getGlassSurfacePalette(paletteVariant);
  const glassBoxShadow = createGlassBoxShadow(paletteVariant);
  const backdrop = glassBackdropFilters[paletteVariant];

  const {
    surface,
    surfaceElevated,
    surfaceMuted,
    surfaceSubtle,
    border,
    borderSubtle,
    borderHairline,
  } = glassPalette;

  return {
    mode: paletteVariant === 'dark' ? ThemeColorScheme.DARK : ThemeColorScheme.LIGHT,
    borderRadius: Size.LG,
    colors: createGlassColors(paletteVariant),
    boxShadow: glassBoxShadow,
    surfaceMaterial: createGlassSurfaceMaterial(paletteVariant),
    cards: {
      variants: {
        elevated: {
          background: surfaceElevated,
          border: `1px solid ${border}`,
          boxShadow: glassBoxShadow.md,
        },
        outlined: {
          background: surface,
          border: `1px solid ${borderSubtle}`,
        },
        filled: {
          background: surfaceMuted,
          border: `1px solid ${borderHairline}`,
        },
      },
    },
    dropdowns: {
      variants: {
        default: {
          background: surfaceElevated,
          border: `1px solid ${borderSubtle}`,
        },
        elevated: {
          background: surfaceElevated,
          border: `1px solid ${borderSubtle}`,
        },
        outlined: {
          background: surface,
          border: `1px solid ${border}`,
        },
      },
      settings: {
        backdropFilter: backdrop.subtle,
      },
    },
    modals: {
      overlay: {
        background:
          paletteVariant === 'dark' ? 'rgba(0, 0, 0, 0.35)' : 'rgba(15, 23, 42, 0.18)',
        backdropFilter: backdrop.strong,
      },
    },
    tables: {
      shell: {
        background: surfaceElevated,
        border: `1px solid ${borderSubtle}`,
        insetFrameBackground: surfaceElevated,
        insetSurfaceBackground: surface,
        insetSurfaceBorder: `1px solid ${borderHairline}`,
      },
      header: {
        background: surfaceMuted,
        borderBottom: `1px solid ${borderHairline}`,
      },
      footerSection: {
        background: surfaceElevated,
      },
      zebra: {
        oddRowBackground: surfaceSubtle,
      },
    },
    hints: {
      variants: {
        default: {
          background: surfaceElevated,
          border: `1px solid ${borderSubtle}`,
        },
      },
    },
    buttons: {
      variants: {
        outline: {
          background: surface,
          border: `1px solid ${borderSubtle}`,
        },
        ghost: {
          background: 'transparent',
        },
      },
    },
  };
}

/** @deprecated Используйте {@link createGlassThemeOverride}('light') */
export const glassLightThemeOverride = createGlassThemeOverride('light');

/** @deprecated Используйте {@link createGlassThemeOverride}('dark') */
export const glassDarkThemeOverride = createGlassThemeOverride('dark');
