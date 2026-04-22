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
