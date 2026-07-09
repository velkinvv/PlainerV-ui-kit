import type { TooltipTheme } from '../../types/theme';
import type { DeepPartial } from '../../types/themeOverride';
import { glassBackdropFilters } from '../../variables/blur';
import type { GlassPaletteVariant } from '../../variables/glass';

/**
 * Переопределение темы Tooltip для glass-палитры: лёгкая прозрачность и vibrancy.
 * @param paletteVariant — `light` или `dark` glass-палитра
 */
export function createGlassTooltipThemeOverride(
  paletteVariant: GlassPaletteVariant,
): DeepPartial<TooltipTheme> {
  return {
    settings: {
      backdropFilter: glassBackdropFilters[paletteVariant].subtle,
    },
  };
}
