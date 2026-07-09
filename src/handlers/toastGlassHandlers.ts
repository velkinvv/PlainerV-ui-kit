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
 * Базовая glass-подложка для нейтральных поверхностей toast.
 * @param isDark — тёмная ли базовая палитра
 */
function getToastGlassBaseSurface(isDark: boolean): string {
  return isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.26)';
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

  if (type === 'neutral') {
    return {
      accent: accentColor,
      surface: getToastGlassBaseSurface(isDark),
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
  const white = '#ffffff';
  const cardTokens = getToastGlassSurfaceTokens(type, context);
  const accentColor = getToastAccentColor(type, isDark);
  const dismissIcon = isDark ? neutral[400] : grey[500];
  const titleColor = isDark ? neutral[200] : grey[900];

  const actionForType = (): Pick<ToastPillVisualTokens, 'actionBg' | 'actionText'> => {
    switch (type) {
      case 'success':
        return {
          actionBg: withHexAlpha(success[isDark ? 400 : 500], ACTION_ALPHA),
          actionText: white,
        };
      case 'error':
        return {
          actionBg: withHexAlpha(danger[isDark ? 400 : 500], ACTION_ALPHA),
          actionText: white,
        };
      case 'warning':
        return {
          actionBg: withHexAlpha(warning[isDark ? 400 : 500], ACTION_ALPHA),
          actionText: grey[900],
        };
      case 'neutral':
        return {
          actionBg: withHexAlpha(isDark ? neutral[600] : grey[700], ACTION_ALPHA),
          actionText: white,
        };
      case 'info':
      default:
        return {
          actionBg: withHexAlpha(primary[isDark ? 400 : 500], ACTION_ALPHA),
          actionText: white,
        };
    }
  };

  const iconGlowForType = (): string => {
    switch (type) {
      case 'success':
        return 'rgba(34, 197, 94, 0.38)';
      case 'error':
        return 'rgba(239, 68, 68, 0.38)';
      case 'warning':
        return 'rgba(234, 179, 8, 0.42)';
      case 'neutral':
        return isDark ? 'rgba(163, 163, 163, 0.32)' : 'rgba(115, 115, 115, 0.22)';
      case 'info':
      default:
        return 'rgba(33, 150, 243, 0.4)';
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
