import type { Colors, ToastTheme } from '../types/theme';
import { ThemeColorScheme } from '../types/theme';
import type { ToastType } from '../types/ui';
import { success } from '../variables/colors/success';
import { danger } from '../variables/colors/danger';
import { warning } from '../variables/colors/warning';
import { primary } from '../variables/colors/primary';
import { neutral } from '../variables/colors/neutral';
import grey from '../variables/colors/grey';
import { withHexAlpha } from './glassColorHandlers';

/** Токены фона и текста карточки toast */
export interface ToastSurfaceTokens {
  accent: string;
  surface: string;
  titleColor: string;
  bodyColor: string;
}

/** Токены внешнего вида «пилюля» */
export interface ToastPillVisualTokens {
  surface: string;
  border: string;
  titleColor: string;
  bodyColor: string;
  iconColor: string;
  iconGlow: string;
  actionBg: string;
  actionText: string;
  dismissIcon: string;
}

/** Контекст темы для резолва токенов toast */
export type ToastThemeContext = {
  mode: ThemeColorScheme;
  colors?: Colors;
  toasts?: ToastTheme;
};

/** Прозрачность заливки toast — как у glass-тегов */
const FILL_ALPHA_LIGHT = 0.22;

const FILL_ALPHA_DARK = 0.28;

/** Прозрачность рамки и акцентной полосы */
const BORDER_ALPHA = 0.66;

/** Прозрачность кнопки действия — как у glass-кнопок */
const ACTION_ALPHA = 0.54;

/**
 * Проверяет, активна ли glass-тема для toast.
 * @param context — режим темы и секция `toasts`
 */
export function isToastGlassTheme(context: ToastThemeContext): boolean {
  return Boolean(context.toasts?.settings?.backdropFilter);
}

/**
 * Возвращает акцентный цвет типа уведомления.
 * @param type — категория toast
 * @param isDark — тёмная ли базовая палитра
 */
function getToastAccentColor(type: ToastType, isDark: boolean): string {
  switch (type) {
    case 'success':
      return isDark ? success[400] : success[500];
    case 'error':
      return isDark ? danger[400] : danger[500];
    case 'warning':
      return isDark ? warning[400] : warning[500];
    case 'neutral':
      return isDark ? neutral[500] : grey[500];
    case 'info':
    default:
      return isDark ? primary[400] : primary[500];
  }
}

/**
 * Базовая glass-подложка для нейтральных поверхностей toast из `onAccent`.
 * @param isDark — тёмная ли базовая палитра
 * @param onAccent — цвет текста/поверхности на акценте из темы
 */
function getToastGlassBaseSurface(isDark: boolean, onAccent?: string): string {
  const base = onAccent ?? '#ffffff';
  const alphaPercent = isDark ? 6 : 26;
  return `color-mix(in srgb, ${base} ${alphaPercent}%, transparent)`;
}

/**
 * Glass-токены карточки toast (акцентная полоса слева).
 * @param type — категория уведомления
 * @param context — контекст темы
 */
export function getToastGlassSurfaceTokens(
  type: ToastType,
  context: ToastThemeContext,
): ToastSurfaceTokens {
  const isDark = context.mode === ThemeColorScheme.DARK;
  const bodyColor = isDark ? neutral[300] : grey[600];
  const accentColor = getToastAccentColor(type, isDark);
  const fillAlpha = isDark ? FILL_ALPHA_DARK : FILL_ALPHA_LIGHT;
  const onAccent = context.colors?.onAccent;

  if (type === 'neutral') {
    return {
      accent: accentColor,
      surface: getToastGlassBaseSurface(isDark, onAccent),
      titleColor: isDark ? neutral[200] : grey[800],
      bodyColor,
    };
  }

  return {
    accent: accentColor,
    surface: withHexAlpha(accentColor, fillAlpha),
    titleColor:
      type === 'warning'
        ? isDark
          ? warning[400]
          : grey[900]
        : isDark
          ? accentColor
          : type === 'success'
            ? success[600]
            : type === 'error'
              ? danger[600]
              : primary[700],
    bodyColor,
  };
}

/**
 * Glass-токены внешнего вида «пилюля».
 * @param type — категория уведомления
 * @param context — контекст темы
 */
export function getToastGlassPillVisualTokens(
  type: ToastType,
  context: ToastThemeContext,
): ToastPillVisualTokens {
  const isDark = context.mode === ThemeColorScheme.DARK;
  const onAccent = context.colors?.onAccent ?? '#ffffff';
  const cardTokens = getToastGlassSurfaceTokens(type, context);
  const accentColor = getToastAccentColor(type, isDark);
  const dismissIcon = isDark ? neutral[400] : grey[500];
  const titleColor = isDark ? neutral[200] : grey[900];

  const actionForType = (): Pick<ToastPillVisualTokens, 'actionBg' | 'actionText'> => {
    switch (type) {
      case 'success':
        return {
          actionBg: withHexAlpha(success[isDark ? 400 : 500], ACTION_ALPHA),
          actionText: onAccent,
        };
      case 'error':
        return {
          actionBg: withHexAlpha(danger[isDark ? 400 : 500], ACTION_ALPHA),
          actionText: onAccent,
        };
      case 'warning':
        return {
          actionBg: withHexAlpha(warning[isDark ? 400 : 500], ACTION_ALPHA),
          actionText: grey[900],
        };
      case 'neutral':
        return {
          actionBg: withHexAlpha(isDark ? neutral[600] : grey[700], ACTION_ALPHA),
          actionText: onAccent,
        };
      case 'info':
      default:
        return {
          actionBg: withHexAlpha(primary[isDark ? 400 : 500], ACTION_ALPHA),
          actionText: onAccent,
        };
    }
  };

  const iconGlowForType = (): string => {
    switch (type) {
      case 'success':
        return `color-mix(in srgb, ${success[500]} 38%, transparent)`;
      case 'error':
        return `color-mix(in srgb, ${danger[500]} 38%, transparent)`;
      case 'warning':
        return `color-mix(in srgb, ${warning[500]} 42%, transparent)`;
      case 'neutral':
        return isDark
          ? `color-mix(in srgb, ${neutral[400]} 32%, transparent)`
          : `color-mix(in srgb, ${grey[600]} 22%, transparent)`;
      case 'info':
      default:
        return `color-mix(in srgb, ${primary[500]} 40%, transparent)`;
    }
  };

  return {
    surface: cardTokens.surface,
    border: `1px solid ${withHexAlpha(accentColor, BORDER_ALPHA)}`,
    titleColor,
    bodyColor: cardTokens.bodyColor,
    iconColor: accentColor,
    iconGlow: iconGlowForType(),
    ...actionForType(),
    dismissIcon,
  };
}
