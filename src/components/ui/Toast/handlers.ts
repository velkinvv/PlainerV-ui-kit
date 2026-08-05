import type { IconName } from '@/icons';
import type { ToastType } from '@/types/ui';
import { ThemeColorScheme } from '@/types/theme';
import {
  getToastGlassPillVisualTokens,
  getToastGlassSurfaceTokens,
  isToastGlassTheme,
  type ToastPillVisualTokens,
  type ToastSurfaceTokens,
  type ToastThemeContext,
} from '@/handlers/toastGlassHandlers';
import { success } from '@/variables/colors/success';
import { danger } from '@/variables/colors/danger';
import { warning } from '@/variables/colors/warning';
import { primary } from '@/variables/colors/primary';
import { neutral } from '@/variables/colors/neutral';
import grey from '@/variables/colors/grey';

export type {
  ToastPillVisualTokens,
  ToastSurfaceTokens,
  ToastThemeContext,
} from '@/handlers/toastGlassHandlers';

/**
 * Генерирует id записи для стека toast.
 */
export function createToastId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `toast-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Возвращает палитру карточки по типу уведомления и теме.
 * @param type - Категория (акцентная полоса слева)
 * @param context - Режим темы и опционально `toasts` / `colors` для glass
 */
export function getToastSurfaceTokens(
  type: ToastType,
  context: ToastThemeContext,
): ToastSurfaceTokens {
  if (isToastGlassTheme(context)) {
    return getToastGlassSurfaceTokens(type, context);
  }

  const mode = context.mode;
  const isDark = mode === ThemeColorScheme.DARK;
  const surfaceBase = context.colors?.backgroundSecondary ?? (isDark ? neutral[800] : grey[50]);
  const bodyColor = context.colors?.textSecondary ?? (isDark ? neutral[300] : grey[600]);

  switch (type) {
    case 'success':
      return {
        accent: context.colors?.success ?? success[500],
        surface: isDark
          ? `color-mix(in srgb, ${success[500]} 14%, ${surfaceBase})`
          : success.bg,
        titleColor: isDark ? success[400] : success[600],
        bodyColor,
      };
    case 'error':
      return {
        accent: context.colors?.danger ?? danger[500],
        surface: isDark
          ? `color-mix(in srgb, ${danger[500]} 14%, ${surfaceBase})`
          : danger.bg,
        titleColor: isDark ? danger[300] : danger[600],
        bodyColor,
      };
    case 'warning':
      return {
        accent: context.colors?.warning ?? warning[500],
        surface: isDark
          ? `color-mix(in srgb, ${warning[500]} 14%, ${surfaceBase})`
          : warning.bg,
        titleColor: isDark ? warning[400] : grey[900],
        bodyColor,
      };
    case 'neutral':
      return {
        accent: isDark ? neutral[500] : grey[500],
        surface: isDark ? neutral[900] : grey[100],
        titleColor: isDark ? neutral[200] : grey[800],
        bodyColor,
      };
    case 'info':
    default:
      return {
        accent: context.colors?.info ?? primary[500],
        surface: isDark
          ? `color-mix(in srgb, ${primary[500]} 14%, ${surfaceBase})`
          : primary.bg,
        titleColor: isDark ? primary[300] : primary[700],
        bodyColor,
      };
  }
}

/**
 * Имя иконки для типа toast во внешнем виде «пилюля»
 * @param type - Категория уведомления
 */
export function getToastPillIconName(type: ToastType): IconName {
  switch (type) {
    case 'success':
      return 'IconPlainerCheck';
    case 'error':
      return 'IconExDanger';
    case 'warning':
      return 'IconPlainerWarning';
    case 'neutral':
      return 'IconExInfoCircle';
    case 'info':
    default:
      return 'IconExInfoCircle';
  }
}

/**
 * Палитра «пилюли» по типу и теме (макет Figma: пастельный фон, рамка цветом типа, иконка с glow, заголовок тёмно‑серый).
 * Фон и вторичный текст согласованы с {@link getToastSurfaceTokens}.
 * @param type - Категория уведомления
 * @param context - Режим темы и опционально `toasts` / `colors` для glass
 */
export function getToastPillVisualTokens(
  type: ToastType,
  context: ToastThemeContext,
): ToastPillVisualTokens {
  if (isToastGlassTheme(context)) {
    return getToastGlassPillVisualTokens(type, context);
  }

  const mode = context.mode;
  const isDark = mode === ThemeColorScheme.DARK;
  const onAccent = context.colors?.onAccent ?? '#ffffff';
  const cardTokens = getToastSurfaceTokens(type, context);
  const dismissIcon = isDark ? neutral[400] : grey[500];
  /** Заголовок по макету — тёмный нейтральный, акцент только в иконке и рамке */
  const titleColor = isDark ? neutral[200] : grey[900];

  const actionForType = (): Pick<ToastPillVisualTokens, 'actionBg' | 'actionText'> => {
    switch (type) {
      case 'success':
        return { actionBg: success[500], actionText: onAccent };
      case 'error':
        return { actionBg: danger[500], actionText: onAccent };
      case 'warning':
        return { actionBg: warning[500], actionText: grey[900] };
      case 'neutral':
        return { actionBg: isDark ? neutral[600] : grey[700], actionText: onAccent };
      case 'info':
      default:
        return { actionBg: primary[500], actionText: onAccent };
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

  const iconColorForType = (): string => {
    switch (type) {
      case 'success':
        return success[500];
      case 'error':
        return danger[500];
      case 'warning':
        return warning[500];
      case 'neutral':
        return isDark ? neutral[400] : grey[600];
      case 'info':
      default:
        return primary[500];
    }
  };

  return {
    surface: cardTokens.surface,
    border: `1px solid ${cardTokens.accent}`,
    titleColor,
    bodyColor: cardTokens.bodyColor,
    iconColor: iconColorForType(),
    iconGlow: iconGlowForType(),
    ...actionForType(),
    dismissIcon,
  };
}
