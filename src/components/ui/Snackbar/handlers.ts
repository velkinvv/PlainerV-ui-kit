import { ThemeMode } from '@/types/theme';
import { neutral } from '@/variables/colors/neutral';
import { primary } from '@/variables/colors/primary';

/**
 * Токены «инверсной» полосы snackbar (тёмная плашка, светлый текст).
 */
export interface SnackbarSurfaceTokens {
  surface: string;
  messageColor: string;
  actionColor: string;
}

/**
 * Генерирует id записи для стека snackbar.
 */
export function createSnackbarId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `snackbar-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Палитра компактной полосы по теме (контрастная плашка внизу экрана).
 * @param mode - Режим темы из ThemeProvider
 */
export function getSnackbarSurfaceTokens(mode: ThemeMode): SnackbarSurfaceTokens {
  if (mode === ThemeMode.DARK) {
    return {
      surface: neutral[800],
      messageColor: neutral[10],
      actionColor: primary[200],
    };
  }
  return {
    surface: neutral[900],
    messageColor: neutral[10],
    actionColor: primary[300],
  };
}
