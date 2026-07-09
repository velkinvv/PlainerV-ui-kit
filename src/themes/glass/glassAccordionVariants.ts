import type { AccordionTheme } from '../../types/theme';
import type { DeepPartial } from '../../types/themeOverride';
import { glassBackdropFilters } from '../../variables/blur';
import type { GlassPaletteVariant } from '../../variables/glass';

/**
 * Переопределение темы Accordion для glass-палитры: лёгкая прозрачность и vibrancy.
 * @param paletteVariant — `light` или `dark` glass-палитра
 */
export function createGlassAccordionThemeOverride(
  paletteVariant: GlassPaletteVariant,
): DeepPartial<AccordionTheme> {
  return {
    settings: {
      backdropFilter: glassBackdropFilters[paletteVariant].subtle,
    },
  };
}
