import type { HintTheme } from '../../types/theme';
import type { DeepPartial } from '../../types/themeOverride';
import { glassBackdropFilters } from '../../variables/blur';
import type { GlassPaletteVariant } from '../../variables/glass';

/**
 * Переопределение темы Hint для glass-палитры: vibrancy как у tooltip.
 * @param paletteVariant — `light` или `dark` glass-палитра
 */
export function createGlassHintThemeOverride(
  paletteVariant: GlassPaletteVariant,
): DeepPartial<HintTheme> {
  return {
    settings: {
      backdropFilter: glassBackdropFilters[paletteVariant].subtle,
    },
  };
}
