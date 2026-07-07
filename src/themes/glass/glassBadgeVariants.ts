import type { BadgeTheme } from '../../types/theme';
import type { DeepPartial } from '../../types/themeOverride';
import { primary } from '../../variables/colors/primary';
import { success } from '../../variables/colors/success';
import { danger } from '../../variables/colors/danger';
import { warning } from '../../variables/colors/warning';
import { neutral } from '../../variables/colors/neutral';
import { getGlassSurfacePalette, type GlassPaletteVariant } from '../../variables/glass';
import { glassBackdropFilters } from '../../variables/blur';
import { withHexAlpha } from '../../handlers/glassColorHandlers';

/** Базовая прозрачность glass-бейджей — как у залитых glass-кнопок */
const FILLED_ALPHA = 0.54;

/**
 * Создаёт полупрозрачные background/border для залитого варианта бейджа.
 * @param baseColor — основной цвет заливки
 */
function createFilledGlassBadgeVariant(baseColor: string): Pick<
  BadgeTheme['variants']['primary'],
  'background' | 'border'
> {
  return {
    background: withHexAlpha(baseColor, FILLED_ALPHA),
    border: `1px solid ${withHexAlpha(baseColor, Math.min(FILLED_ALPHA + 0.12, 1))}`,
  };
}

/**
 * Переопределение темы бейджей для glass-палитры: лёгкая прозрачность и vibrancy.
 * @param paletteVariant — `light` или `dark` glass-палитра
 */
export function createGlassBadgeThemeOverride(
  paletteVariant: GlassPaletteVariant,
): DeepPartial<BadgeTheme> {
  const isDarkBase = paletteVariant === 'dark';
  const glassPalette = getGlassSurfacePalette(paletteVariant);
  const { borderSubtle } = glassPalette;

  const whiteTextColor = neutral[10];
  const primaryColor = isDarkBase ? primary[400] : primary[500];
  const dangerColor = isDarkBase ? danger[400] : danger[500];
  const successColor = isDarkBase ? success[400] : success[500];
  const warningColor = isDarkBase ? warning[400] : warning[500];
  const disableBaseColor = isDarkBase ? neutral[600] : neutral[200];
  const disableTextColor = isDarkBase ? neutral[300] : neutral[800];

  const dangerFilled = createFilledGlassBadgeVariant(dangerColor);
  const primaryFilled = createFilledGlassBadgeVariant(primaryColor);
  const successFilled = createFilledGlassBadgeVariant(successColor);
  const warningFilled = createFilledGlassBadgeVariant(warningColor);
  const disableFilled = createFilledGlassBadgeVariant(disableBaseColor);

  const outlineBackground = isDarkBase
    ? 'rgba(255, 255, 255, 0.06)'
    : 'rgba(255, 255, 255, 0.26)';
  const outlineInversionBackground = isDarkBase
    ? withHexAlpha(neutral[800], FILLED_ALPHA)
    : withHexAlpha(neutral[10], FILLED_ALPHA);
  const outlineTextColor = isDarkBase ? neutral[10] : neutral[10];
  const outlineInversionTextColor = isDarkBase ? neutral[300] : neutral[800];
  const outlineInversionBorderColor = isDarkBase ? neutral[300] : neutral[800];
  const inversionTextColor = primaryColor;

  return {
    settings: {
      backdropFilter: glassBackdropFilters[paletteVariant].subtle,
    },
    variants: {
      default: {
        ...dangerFilled,
        color: whiteTextColor,
      },
      defaultMain: {
        ...primaryFilled,
        color: whiteTextColor,
      },
      defaultMainInversion: {
        background: outlineInversionBackground,
        color: inversionTextColor,
        border: `1px solid ${withHexAlpha(primaryColor, Math.min(FILLED_ALPHA + 0.12, 1))}`,
      },
      defaultSuccess: {
        ...successFilled,
        color: whiteTextColor,
      },
      disable: {
        ...disableFilled,
        color: disableTextColor,
      },
      outline: {
        background: outlineBackground,
        color: outlineTextColor,
        border: `1px solid ${borderSubtle}`,
      },
      outlineInversion: {
        background: outlineBackground,
        color: outlineInversionTextColor,
        border: `1px solid ${withHexAlpha(outlineInversionBorderColor, Math.min(FILLED_ALPHA + 0.12, 1))}`,
      },
      primary: {
        ...primaryFilled,
        color: whiteTextColor,
      },
      secondary: {
        ...dangerFilled,
        color: whiteTextColor,
      },
      success: {
        ...successFilled,
        color: whiteTextColor,
      },
      danger: {
        ...dangerFilled,
        color: whiteTextColor,
      },
      warning: {
        ...warningFilled,
        color: whiteTextColor,
      },
      info: {
        ...primaryFilled,
        color: whiteTextColor,
      },
    },
  };
}
