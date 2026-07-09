import { ThemeColorScheme } from '../../types/theme';
import type { ThemeOverride } from '../../types/themeOverride';
import { Size } from '../../types/sizes';
import { createGlassBoxShadow, createGlassColors } from '../colors/glass';
import {
  createGlassSurfaceMaterial,
  getGlassSurfacePalette,
  type GlassPaletteVariant,
} from '../../variables/glass';
import { createGlassButtonThemeOverride } from './glassButtonVariants';
import {
  createGlassAvatarGroupThemeOverride,
  createGlassAvatarThemeOverride,
} from './glassAvatarVariants';
import { createGlassBadgeThemeOverride } from './glassBadgeVariants';
import { createGlassTagThemeOverride } from './glassTagVariants';
import { createGlassPillThemeOverride } from './glassPillVariants';
import { createGlassPaginationThemeOverride } from './glassPaginationVariants';
import { createGlassToastThemeOverride } from './glassToastVariants';
import { createGlassSnackbarThemeOverride } from './glassSnackbarVariants';
import { createGlassTooltipThemeOverride } from './glassTooltipVariants';
import { createGlassHintThemeOverride } from './glassHintVariants';
import { createGlassAccordionThemeOverride } from './glassAccordionVariants';
import { createGlassModalThemeOverride } from './glassModalVariants';
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
    surfaceFloating,
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
          background: surfaceFloating,
          border: `1px solid ${borderSubtle}`,
        },
        elevated: {
          background: surfaceFloating,
          border: `1px solid ${borderSubtle}`,
        },
        outlined: {
          background: surfaceFloating,
          border: `1px solid ${border}`,
        },
      },
      settings: {
        backdropFilter: backdrop.default,
      },
    },
    modals: createGlassModalThemeOverride(paletteVariant),
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
    hints: createGlassHintThemeOverride(paletteVariant),
    accordions: createGlassAccordionThemeOverride(paletteVariant),
    buttons: createGlassButtonThemeOverride(paletteVariant),
    avatars: createGlassAvatarThemeOverride(paletteVariant),
    avatarGroups: createGlassAvatarGroupThemeOverride(paletteVariant),
    badges: createGlassBadgeThemeOverride(paletteVariant),
    tags: createGlassTagThemeOverride(paletteVariant),
    pills: createGlassPillThemeOverride(paletteVariant),
    paginations: createGlassPaginationThemeOverride(paletteVariant),
    toasts: createGlassToastThemeOverride(paletteVariant),
    snackbars: createGlassSnackbarThemeOverride(paletteVariant),
    tooltips: createGlassTooltipThemeOverride(paletteVariant),
  };
}

/** @deprecated Используйте {@link createGlassThemeOverride}('light') */
export const glassLightThemeOverride = createGlassThemeOverride('light');

/** @deprecated Используйте {@link createGlassThemeOverride}('dark') */
export const glassDarkThemeOverride = createGlassThemeOverride('dark');
