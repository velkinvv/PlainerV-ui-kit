import type { AvatarGroupTheme, AvatarTheme } from '../../types/theme';
import type { DeepPartial } from '../../types/themeOverride';
import { neutral } from '../../variables/colors/neutral';
import { getGlassSurfacePalette, type GlassPaletteVariant } from '../../variables/glass';
import { glassBackdropFilters } from '../../variables/blur';
import { withHexAlpha } from '../../handlers/glassColorHandlers';

/** Базовая прозрачность glass-аватаров — как у залитых glass-кнопок */
const SURFACE_ALPHA = 0.54;

/** Прозрачность при наведении */
const SURFACE_HOVER_ALPHA = 0.64;

/** Прозрачность в active-состоянии */
const SURFACE_ACTIVE_ALPHA = 0.72;

/**
 * Создаёт полупрозрачные background/border для нейтральной glass-поверхности аватара.
 * @param baseColor — основной цвет
 * @param hoverColor — цвет при hover
 * @param activeColor — цвет при active
 * @param borderColor — цвет тонкой границы
 */
function createAvatarGlassVariant(
  baseColor: string,
  hoverColor: string,
  activeColor: string,
  borderColor: string,
) {
  return {
    default: {
      background: withHexAlpha(baseColor, SURFACE_ALPHA),
      border: `1px solid ${withHexAlpha(borderColor, Math.min(SURFACE_ALPHA + 0.12, 1))}`,
    },
    hover: {
      background: withHexAlpha(hoverColor, SURFACE_HOVER_ALPHA),
      border: `1px solid ${withHexAlpha(borderColor, Math.min(SURFACE_HOVER_ALPHA + 0.08, 1))}`,
    },
    active: {
      background: withHexAlpha(activeColor, SURFACE_ACTIVE_ALPHA),
      border: `1px solid ${withHexAlpha(borderColor, SURFACE_ACTIVE_ALPHA)}`,
    },
    disabled: {
      background: withHexAlpha(baseColor, Math.max(SURFACE_ALPHA - 0.16, 0.28)),
      border: `1px solid ${withHexAlpha(borderColor, Math.min(SURFACE_ALPHA, 1))}`,
    },
  };
}

/**
 * Переопределение темы аватаров для glass-палитры: лёгкая прозрачность и vibrancy.
 * @param paletteVariant — `light` или `dark` glass-палитра
 */
export function createGlassAvatarThemeOverride(
  paletteVariant: GlassPaletteVariant,
): DeepPartial<AvatarTheme> {
  const isDarkBase = paletteVariant === 'dark';
  const glassPalette = getGlassSurfacePalette(paletteVariant);
  const { borderSubtle } = glassPalette;

  const baseColor = isDarkBase ? neutral[800] : neutral[100];
  const hoverColor = isDarkBase ? neutral[700] : neutral[200];
  const activeColor = isDarkBase ? neutral[600] : neutral[300];
  const textColor = isDarkBase ? neutral[100] : neutral[800];
  const disabledTextColor = neutral[400];

  const glassVariant = createAvatarGlassVariant(
    baseColor,
    hoverColor,
    activeColor,
    borderSubtle,
  );

  return {
    settings: {
      backdropFilter: glassBackdropFilters[paletteVariant].subtle,
      backgroundAlpha: SURFACE_ALPHA,
    },
    variants: {
      default: {
        ...glassVariant.default,
        color: textColor,
      },
      hover: {
        ...glassVariant.hover,
        color: textColor,
      },
      active: {
        ...glassVariant.active,
        color: textColor,
      },
      disabled: {
        ...glassVariant.disabled,
        color: disabledTextColor,
      },
    },
  };
}

/**
 * Переопределение темы группы аватаров для glass-палитры.
 * @param paletteVariant — `light` или `dark` glass-палитра
 */
export function createGlassAvatarGroupThemeOverride(
  paletteVariant: GlassPaletteVariant,
): DeepPartial<AvatarGroupTheme> {
  const isDarkBase = paletteVariant === 'dark';
  const glassPalette = getGlassSurfacePalette(paletteVariant);
  const { borderSubtle, surfaceElevated } = glassPalette;

  const baseColor = isDarkBase ? neutral[800] : neutral[100];
  const hoverColor = isDarkBase ? neutral[700] : neutral[200];
  const textColor = isDarkBase ? neutral[100] : neutral[800];

  return {
    settings: {
      backdropFilter: glassBackdropFilters[paletteVariant].subtle,
    },
    counter: {
      background: withHexAlpha(baseColor, SURFACE_ALPHA),
      color: textColor,
      border: `1px solid ${borderSubtle}`,
      hover: {
        background: withHexAlpha(hoverColor, SURFACE_HOVER_ALPHA),
        transform: 'scale(1.05)',
      },
    },
    avatarBorder: {
      color: surfaceElevated,
    },
  };
}
