import type { Colors } from '../types/theme';
import type { TagColorVariant } from '../types/ui';
import { withHexAlpha } from './glassColorHandlers';

/** Тон заливки/обводки тега */
export type TagTone = {
  fg: string;
  border: string;
  fill: string;
  outlineBg: string;
  outlineBorder: string;
};

/** Базовая прозрачность glass-границ — как у glass-кнопок и бейджей */
const BORDER_ALPHA = 0.66;

/** Прозрачность заливки filled-тега (ниже, чтобы сохранить контраст текста) */
const FILL_ALPHA_LIGHT = 0.22;

const FILL_ALPHA_DARK = 0.28;

/**
 * Полупрозрачный тон для акцентного тега в glass-теме.
 * @param accentColor — акцентный цвет варианта
 * @param isDark — тёмная ли базовая палитра
 * @param outlineBackground — фон outline-варианта
 */
function createGlassAccentTagTone(
  accentColor: string,
  isDark: boolean,
  outlineBackground: string,
): TagTone {
  const fillAlpha = isDark ? FILL_ALPHA_DARK : FILL_ALPHA_LIGHT;

  return {
    fg: accentColor,
    border: withHexAlpha(accentColor, BORDER_ALPHA),
    fill: withHexAlpha(accentColor, fillAlpha),
    outlineBg: outlineBackground,
    outlineBorder: withHexAlpha(accentColor, BORDER_ALPHA),
  };
}

/**
 * Возвращает glass-тон тега по цветовому варианту.
 * @param theme — палитра темы (`colors`)
 * @param color — вариант цвета тега
 * @param isDark — тёмная ли базовая палитра
 */
export function getGlassTagTone(
  theme: { colors: Colors },
  color: TagColorVariant,
  isDark: boolean,
): TagTone {
  const outlineBackground = isDark
    ? 'rgba(255, 255, 255, 0.06)'
    : 'rgba(255, 255, 255, 0.26)';

  switch (color) {
    case 'neutral':
      return {
        fg: theme.colors.textSecondary,
        border: theme.colors.borderSecondary,
        fill: outlineBackground,
        outlineBg: outlineBackground,
        outlineBorder: theme.colors.borderTertiary,
      };
    case 'secondary':
      return createGlassAccentTagTone(theme.colors.secondary, isDark, outlineBackground);
    case 'primary':
      return createGlassAccentTagTone(theme.colors.tagPrimaryAccent, isDark, outlineBackground);
    case 'danger':
      return createGlassAccentTagTone(theme.colors.danger, isDark, outlineBackground);
    case 'info':
      return createGlassAccentTagTone(theme.colors.info, isDark, outlineBackground);
    case 'success':
      return createGlassAccentTagTone(theme.colors.success, isDark, outlineBackground);
    case 'warning':
      return createGlassAccentTagTone(theme.colors.warning, isDark, outlineBackground);
    case 'purple':
      return createGlassAccentTagTone(theme.colors.tagAccentPurple, isDark, outlineBackground);
    case 'teal':
      return createGlassAccentTagTone(theme.colors.tagAccentTeal, isDark, outlineBackground);
    case 'cyan':
      return createGlassAccentTagTone(theme.colors.tagAccentCyan, isDark, outlineBackground);
    case 'pink':
      return createGlassAccentTagTone(theme.colors.tagAccentPink, isDark, outlineBackground);
    case 'custom':
      return getGlassTagTone(theme, 'neutral', isDark);
    default:
      return getGlassTagTone(theme, 'neutral', isDark);
  }
}
