import type { ModalTheme } from '../../types/theme';
import type { DeepPartial } from '../../types/themeOverride';
import { glassBackdropFilters } from '../../variables/blur';
import type { GlassPaletteVariant } from '../../variables/glass';

/**
 * Переопределение темы Modal для glass-палитры: vibrancy как у Card.
 * @param paletteVariant — `light` или `dark` glass-палитра
 */
export function createGlassModalThemeOverride(
  paletteVariant: GlassPaletteVariant,
): DeepPartial<ModalTheme> {
  return {
    overlay: {
      backdropFilter: glassBackdropFilters[paletteVariant].strong,
    },
  };
}
