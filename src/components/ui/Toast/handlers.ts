import type { IconName } from '@/icons';
import type { ToastType } from '@/types/ui';
import { ThemeMode } from '@/types/theme';
import { success } from '@/variables/colors/success';
import { danger } from '@/variables/colors/danger';
import { warning } from '@/variables/colors/warning';
import { primary } from '@/variables/colors/primary';
import { neutral } from '@/variables/colors/neutral';
import grey from '@/variables/colors/grey';

/**
 * Токены фона и текста карточки toast (без привязки к styled-theme).
 */
export interface ToastSurfaceTokens {
  accent: string;
  surface: string;
  titleColor: string;
  bodyColor: string;
}

/**
 * Токены внешнего вида «пилюля» (макет Figma): тонированный фон, обводка акцентом, иконка с glow, тёмный заголовок.
 */
export interface ToastPillVisualTokens {
  surface: string;
  border: string;
  titleColor: string;
  bodyColor: string;
  iconColor: string;
  /** Цвет мягкого свечения вокруг иконки (drop-shadow) */
  iconGlow: string;
  actionBg: string;
  actionText: string;
  /** Цвет иконки закрытия (контурный крестик справа) */
  dismissIcon: string;
}

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
 * @param mode - Режим темы из ThemeProvider
 */
export function getToastSurfaceTokens(type: ToastType, mode: ThemeMode): ToastSurfaceTokens {
  const isDark = mode === ThemeMode.DARK;
  const bodyColor = isDark ? neutral[300] : grey[600];

  switch (type) {
    case 'success':
      return {
        accent: success[500],
        surface: isDark ? '#1e2a1c' : success.bg,
        titleColor: isDark ? success[400] : success[600],
        bodyColor,
      };
    case 'error':
      return {
        accent: danger[500],
        surface: isDark ? '#2a1a1a' : danger.bg,
        titleColor: isDark ? danger[300] : danger[600],
        bodyColor,
      };
    case 'warning':
      return {
        accent: warning[500],
        surface: isDark ? '#2a2818' : warning.bg,
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
        accent: primary[500],
        surface: isDark ? '#13202e' : primary.bg,
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
 * @param mode - Режим темы
 */
export function getToastPillVisualTokens(type: ToastType, mode: ThemeMode): ToastPillVisualTokens {
  const isDark = mode === ThemeMode.DARK;
  const white = '#ffffff';
  const cardTokens = getToastSurfaceTokens(type, mode);
  const dismissIcon = isDark ? neutral[400] : grey[500];
  /** Заголовок по макету — тёмный нейтральный, акцент только в иконке и рамке */
  const titleColor = isDark ? neutral[200] : grey[900];

  const actionForType = (): Pick<ToastPillVisualTokens, 'actionBg' | 'actionText'> => {
    switch (type) {
      case 'success':
        return { actionBg: success[500], actionText: white };
      case 'error':
        return { actionBg: danger[500], actionText: white };
      case 'warning':
        return { actionBg: warning[500], actionText: grey[900] };
      case 'neutral':
        return { actionBg: isDark ? neutral[600] : grey[700], actionText: white };
      case 'info':
      default:
        return { actionBg: primary[500], actionText: white };
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
