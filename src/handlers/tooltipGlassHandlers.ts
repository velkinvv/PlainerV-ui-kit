import type { Colors, TooltipTheme } from '../types/theme';
import { ThemeColorScheme } from '../types/theme';
import { withHexAlpha, GLASS_OVERLAY_FILLED_ALPHA, GLASS_OVERLAY_BORDER_ALPHA } from './glassColorHandlers';

/** Токены поверхности tooltip */
export interface TooltipSurfaceTokens {
  background: string;
  textColor: string;
  arrowColor: string;
  border?: string;
}

/** Контекст темы для резолва токенов tooltip */
export type TooltipThemeContext = {
  mode: ThemeColorScheme;
  colors: Colors;
  tooltips?: TooltipTheme;
};

/** Непрозрачность glass-tooltip — как у {@link GLASS_OVERLAY_FILLED_ALPHA} */
const FILLED_ALPHA = GLASS_OVERLAY_FILLED_ALPHA;

/** Непрозрачность glass-рамки — как у {@link GLASS_OVERLAY_BORDER_ALPHA} */
const BORDER_ALPHA = GLASS_OVERLAY_BORDER_ALPHA;

/**
 * Проверяет, активна ли glass-тема для tooltip.
 * @param context — режим темы и секция `tooltips`
 */
export function isTooltipGlassTheme(context: TooltipThemeContext): boolean {
  return Boolean(context.tooltips?.settings?.backdropFilter);
}

/**
 * Glass-палитра tooltip на базе `colors.info`.
 * @param context — контекст темы
 */
export function getTooltipGlassSurfaceTokens(context: TooltipThemeContext): TooltipSurfaceTokens {
  const infoColor = context.colors.info;

  return {
    background: withHexAlpha(infoColor, FILLED_ALPHA),
    textColor: '#ffffff',
    arrowColor: withHexAlpha(infoColor, FILLED_ALPHA),
    border: `1px solid ${withHexAlpha(infoColor, BORDER_ALPHA)}`,
  };
}

/**
 * Палитра tooltip по теме (glass или обычная).
 * @param context — контекст темы
 */
export function getTooltipSurfaceTokens(context: TooltipThemeContext): TooltipSurfaceTokens {
  if (isTooltipGlassTheme(context)) {
    return getTooltipGlassSurfaceTokens(context);
  }

  const infoColor = context.colors.info;

  return {
    background: infoColor,
    textColor: '#ffffff',
    arrowColor: infoColor,
  };
}
