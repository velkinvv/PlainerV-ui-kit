import type { ButtonTheme } from '../../types/theme';
import type { DeepPartial } from '../../types/themeOverride';
import { primary } from '../../variables/colors/primary';
import { success } from '../../variables/colors/success';
import { danger } from '../../variables/colors/danger';
import { warning } from '../../variables/colors/warning';
import { neutral } from '../../variables/colors/neutral';
import { getGlassSurfacePalette, type GlassPaletteVariant } from '../../variables/glass';
import { glassBackdropFilters } from '../../variables/blur';

/** Базовая прозрачность залитых glass-кнопок */
const FILLED_ALPHA = 0.54;

/** Прозрачность при наведении */
const FILLED_HOVER_ALPHA = 0.64;

/** Прозрачность в active-состоянии */
const FILLED_ACTIVE_ALPHA = 0.72;

/**
 * Преобразует hex-цвет (#RRGGBB) в rgba с заданной прозрачностью.
 * @param hexColor — цвет в формате #RRGGBB
 * @param alpha — прозрачность от 0 до 1
 */
function withHexAlpha(hexColor: string, alpha: number): string {
  const normalizedHex = hexColor.replace('#', '');
  const red = parseInt(normalizedHex.slice(0, 2), 16);
  const green = parseInt(normalizedHex.slice(2, 4), 16);
  const blue = parseInt(normalizedHex.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

/**
 * Создаёт полупрозрачные background/border для залитого варианта кнопки.
 * @param baseColor — основной цвет
 * @param hoverColor — цвет при hover
 * @param activeColor — цвет при active
 */
function createFilledGlassVariant(
  baseColor: string,
  hoverColor: string,
  activeColor: string,
): Pick<ButtonTheme['variants']['primary'], 'background' | 'border' | 'hover' | 'active'> {
  return {
    background: withHexAlpha(baseColor, FILLED_ALPHA),
    border: `1px solid ${withHexAlpha(baseColor, Math.min(FILLED_ALPHA + 0.12, 1))}`,
    hover: {
      background: withHexAlpha(hoverColor, FILLED_HOVER_ALPHA),
      border: `1px solid ${withHexAlpha(hoverColor, Math.min(FILLED_HOVER_ALPHA + 0.08, 1))}`,
    },
    active: {
      background: withHexAlpha(activeColor, FILLED_ACTIVE_ALPHA),
      border: `1px solid ${withHexAlpha(activeColor, FILLED_ACTIVE_ALPHA)}`,
    },
  };
}

/**
 * Переопределение темы кнопок для glass-палитры: лёгкая прозрачность и vibrancy.
 * @param paletteVariant — `light` или `dark` glass-палитра
 */
export function createGlassButtonThemeOverride(
  paletteVariant: GlassPaletteVariant,
): DeepPartial<ButtonTheme> {
  const glassPalette = getGlassSurfacePalette(paletteVariant);
  const isDarkBase = paletteVariant === 'dark';
  const { borderSubtle } = glassPalette;

  /** Более прозрачные поверхности для outline / ghost, чем у карточек */
  const outlineBackground = isDarkBase
    ? 'rgba(255, 255, 255, 0.06)'
    : 'rgba(255, 255, 255, 0.26)';
  const outlineHoverBackground = isDarkBase
    ? 'rgba(255, 255, 255, 0.10)'
    : 'rgba(255, 255, 255, 0.18)';
  const outlineActiveBackground = isDarkBase
    ? 'rgba(255, 255, 255, 0.14)'
    : 'rgba(255, 255, 255, 0.30)';

  const primaryFilled = createFilledGlassVariant(
    isDarkBase ? primary[400] : primary[500],
    isDarkBase ? primary[300] : primary[600],
    isDarkBase ? primary[200] : primary[700],
  );
  const secondaryFilled = createFilledGlassVariant(
    isDarkBase ? neutral[600] : neutral[500],
    isDarkBase ? neutral[500] : neutral[600],
    isDarkBase ? neutral[400] : neutral[700],
  );
  const dangerFilled = createFilledGlassVariant(
    isDarkBase ? danger[400] : danger[500],
    isDarkBase ? danger[300] : danger[600],
    isDarkBase ? danger[300] : danger[600],
  );
  const successFilled = createFilledGlassVariant(
    isDarkBase ? success[400] : success[500],
    isDarkBase ? success[300] : success[600],
    isDarkBase ? success[300] : success[600],
  );
  const warningFilled = createFilledGlassVariant(
    isDarkBase ? warning[400] : warning[500],
    isDarkBase ? warning[300] : warning[600],
    isDarkBase ? warning[300] : warning[600],
  );

  return {
    settings: {
      backdropFilter: glassBackdropFilters[paletteVariant].subtle,
    },
    variants: {
      primary: primaryFilled,
      secondary: secondaryFilled,
      danger: dangerFilled,
      success: successFilled,
      warning: warningFilled,
      outline: {
        background: outlineBackground,
        border: `1px solid ${borderSubtle}`,
        hover: {
          background: outlineHoverBackground,
          border: `1px solid ${borderSubtle}`,
        },
        active: {
          background: outlineActiveBackground,
          border: `1px solid ${borderSubtle}`,
        },
      },
      ghost: {
        background: 'transparent',
        border: '1px solid transparent',
        hover: {
          background: outlineHoverBackground,
          border: `1px solid ${borderSubtle}`,
        },
        active: {
          background: outlineActiveBackground,
          border: `1px solid ${borderSubtle}`,
        },
      },
      line: {
        background: 'transparent',
        hover: {
          background: outlineHoverBackground,
        },
        active: {
          background: outlineActiveBackground,
        },
      },
    },
  };
}
