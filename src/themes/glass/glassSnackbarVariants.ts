import type { SnackbarTheme } from '../../types/theme';
import type { DeepPartial } from '../../types/themeOverride';
import { glassBackdropFilters } from '../../variables/blur';
import type { GlassPaletteVariant } from '../../variables/glass';

/**
 * Переопределение темы Snackbar для glass-палитры: лёгкая прозрачность и vibrancy.
 * @param paletteVariant — `light` или `dark` glass-палитра
 */
export function createGlassSnackbarThemeOverride(
  paletteVariant: GlassPaletteVariant,
): DeepPartial<SnackbarTheme> {
  return {
    settings: {
      backdropFilter: glassBackdropFilters[paletteVariant].subtle,
    },
  };
}
