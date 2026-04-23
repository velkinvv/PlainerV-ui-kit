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
 * Токены внешнего вида «пилюля» (Figma): фон, иконка, glow, кнопка действия, кнопка закрытия
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
  closeBg: string;
  closeIcon: string;
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
 * Палитра «пилюли» по типу и теме (макет Figma: белая капсула, цветной glow и кнопка действия)
 * @param type - Категория уведомления
 * @param mode - Режим темы
 */
export function getToastPillVisualTokens(type: ToastType, mode: ThemeMode): ToastPillVisualTokens {
  const isDark = mode === ThemeMode.DARK;
  const white = '#ffffff';
  const closeBg = isDark ? neutral[700] : grey[800];
  const closeIcon = white;

  const baseNeutral = (): ToastPillVisualTokens => ({
    surface: isDark ? neutral[900] : white,
    border: isDark ? `1px solid ${neutral[700]}` : `1px solid ${grey[200]}`,
    titleColor: isDark ? neutral[200] : grey[800],
    bodyColor: isDark ? neutral[300] : grey[600],
    iconColor: isDark ? neutral[400] : grey[600],
    iconGlow: isDark ? 'rgba(163, 163, 163, 0.35)' : 'rgba(115, 115, 115, 0.25)',
    actionBg: isDark ? neutral[600] : grey[700],
    actionText: white,
    closeBg,
    closeIcon,
  });

  switch (type) {
    case 'success':
      return {
        surface: isDark ? neutral[900] : white,
        border: isDark ? `1px solid ${neutral[700]}` : `1px solid ${grey[200]}`,
        titleColor: isDark ? neutral[200] : grey[800],
        bodyColor: isDark ? neutral[300] : grey[600],
        iconColor: success[500],
        iconGlow: 'rgba(34, 197, 94, 0.45)',
        actionBg: success[500],
        actionText: white,
        closeBg,
        closeIcon,
      };
    case 'error':
      return {
        surface: isDark ? neutral[900] : white,
        border: isDark ? `1px solid ${neutral[700]}` : `1px solid ${grey[200]}`,
        titleColor: isDark ? neutral[200] : grey[800],
        bodyColor: isDark ? neutral[300] : grey[600],
        iconColor: danger[500],
        iconGlow: 'rgba(239, 68, 68, 0.45)',
        actionBg: danger[500],
        actionText: white,
        closeBg,
        closeIcon,
      };
    case 'warning':
      return {
        surface: isDark ? neutral[900] : white,
        border: isDark ? `1px solid ${neutral[700]}` : `1px solid ${grey[200]}`,
        titleColor: isDark ? neutral[200] : grey[800],
        bodyColor: isDark ? neutral[300] : grey[600],
        iconColor: warning[500],
        iconGlow: 'rgba(234, 179, 8, 0.5)',
        actionBg: warning[500],
        actionText: grey[900],
        closeBg,
        closeIcon,
      };
    case 'neutral':
      return baseNeutral();
    case 'info':
    default:
      return {
        surface: isDark ? neutral[900] : white,
        border: isDark ? `1px solid ${neutral[700]}` : `1px solid ${grey[200]}`,
        titleColor: isDark ? neutral[200] : grey[800],
        bodyColor: isDark ? neutral[300] : grey[600],
        iconColor: primary[500],
        iconGlow: 'rgba(59, 130, 246, 0.45)',
        actionBg: primary[500],
        actionText: white,
        closeBg,
        closeIcon,
      };
  }
}
