import type { Colors, HintTheme } from '../types/theme';
import { ThemeColorScheme } from '../types/theme';
import { HintVariant } from '../types/ui';
import { neutral } from '../variables/colors/neutral';
import grey from '../variables/colors/grey';
import {
  withHexAlpha,
  GLASS_OVERLAY_FILLED_ALPHA,
  GLASS_OVERLAY_BORDER_ALPHA,
} from './glassColorHandlers';

/** Токены поверхности hint */
export interface HintSurfaceTokens {
  background: string;
  textColor: string;
  arrowColor: string;
  border?: string;
  boxShadow: string;
}

/** Контекст темы для резолва токенов hint */
export type HintThemeContext = {
  mode: ThemeColorScheme;
  colors: Colors;
  hints: HintTheme;
};

/**
 * Проверяет, активна ли glass-тема для hint.
 * @param context — режим темы и секция `hints`
 */
export function isHintGlassTheme(context: HintThemeContext): boolean {
  return Boolean(context.hints?.settings?.backdropFilter);
}

/**
 * Возвращает базовый цвет заливки для варианта hint.
 * @param variant — вариант hint
 * @param colors — палитра темы
 * @param mode — светлая или тёмная тема
 */
function getHintVariantBaseColor(
  variant: HintVariant,
  colors: Colors,
  mode: ThemeColorScheme,
): string {
  switch (variant) {
    case HintVariant.INFO:
      return colors.info;
    case HintVariant.SUCCESS:
      return colors.success;
    case HintVariant.WARNING:
      return colors.warning;
    case HintVariant.ERROR:
      return colors.danger;
    case HintVariant.DEFAULT:
    default:
      return mode === ThemeColorScheme.DARK ? neutral[700] : neutral[900];
  }
}

/**
 * Возвращает цвет текста для glass-варианта hint.
 * @param variant — вариант hint
 * @param mode — светлая или тёмная тема
 */
function getHintGlassTextColor(variant: HintVariant, mode: ThemeColorScheme): string {
  if (variant === HintVariant.WARNING && mode === ThemeColorScheme.LIGHT) {
    return grey[900];
  }

  return '#ffffff';
}

/**
 * Glass-палитра hint с той же непрозрачностью, что у tooltip.
 * @param variant — вариант hint
 * @param context — контекст темы
 */
export function getHintGlassSurfaceTokens(
  variant: HintVariant,
  context: HintThemeContext,
): HintSurfaceTokens {
  const baseColor = getHintVariantBaseColor(variant, context.colors, context.mode);
  const variantConfig = context.hints.variants[variant];

  return {
    background: withHexAlpha(baseColor, GLASS_OVERLAY_FILLED_ALPHA),
    textColor: getHintGlassTextColor(variant, context.mode),
    arrowColor: withHexAlpha(baseColor, GLASS_OVERLAY_FILLED_ALPHA),
    border: `1px solid ${withHexAlpha(baseColor, GLASS_OVERLAY_BORDER_ALPHA)}`,
    boxShadow: variantConfig.boxShadow,
  };
}

/**
 * Палитра hint по теме (glass или обычная).
 * @param variant — вариант hint
 * @param context — контекст темы
 */
export function getHintSurfaceTokens(
  variant: HintVariant,
  context: HintThemeContext,
): HintSurfaceTokens {
  if (isHintGlassTheme(context)) {
    return getHintGlassSurfaceTokens(variant, context);
  }

  const variantConfig = context.hints.variants[variant];

  return {
    background: variantConfig.background,
    textColor: variantConfig.color,
    arrowColor: variantConfig.border.replace(/^\d+px\s+solid\s+/, '') || variantConfig.border,
    border: variantConfig.border,
    boxShadow: variantConfig.boxShadow,
  };
}
