import { ThemeColorScheme } from '@/types/theme';
import { neutral } from '@/variables/colors/neutral';
import { primary } from '@/variables/colors/primary';
import {
  getSnackbarGlassSurfaceTokens,
  isSnackbarGlassTheme,
  type SnackbarSurfaceTokens,
  type SnackbarThemeContext,
} from '@/handlers/snackbarGlassHandlers';

export type {
  SnackbarSurfaceTokens,
  SnackbarThemeContext,
} from '@/handlers/snackbarGlassHandlers';

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
 * @param context - Режим темы и опционально `snackbars` / `colors` для glass
 */
export function getSnackbarSurfaceTokens(context: SnackbarThemeContext): SnackbarSurfaceTokens {
  if (isSnackbarGlassTheme(context)) {
    return getSnackbarGlassSurfaceTokens(context);
  }

  const mode = context.mode;

  if (mode === ThemeColorScheme.DARK) {
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
