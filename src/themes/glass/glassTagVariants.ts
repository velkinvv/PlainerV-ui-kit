import type { TagTheme } from '../../types/theme';
import type { DeepPartial } from '../../types/themeOverride';
import { glassBackdropFilters } from '../../variables/blur';
import type { GlassPaletteVariant } from '../../variables/glass';

/**
 * Переопределение темы тегов для glass-палитры: лёгкая прозрачность и vibrancy.
 * @param paletteVariant — `light` или `dark` glass-палитра
 */
export function createGlassTagThemeOverride(
  paletteVariant: GlassPaletteVariant,
): DeepPartial<TagTheme> {
  return {
    settings: {
      backdropFilter: glassBackdropFilters[paletteVariant].subtle,
    },
  };
}
