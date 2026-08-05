import type { Colors, SnackbarTheme } from '../types/theme';
import { ThemeColorScheme } from '../types/theme';
import { neutral } from '../variables/colors/neutral';
import { primary } from '../variables/colors/primary';
import { mixColorWithTransparent, withHexAlpha } from './glassColorHandlers';

/** Токены «инверсной» полосы snackbar */
export interface SnackbarSurfaceTokens {
  surface: string;
  messageColor: string;
  actionColor: string;
}

/** Контекст темы для резолва токенов snackbar */
export type SnackbarThemeContext = {
  mode: ThemeColorScheme;
  colors?: Colors;
  snackbars?: SnackbarTheme;
};

/** Прозрачность тёмной glass-плашки на светлой теме, 0–1 */
const INVERSE_SURFACE_ALPHA_LIGHT = 0.78;

/** Прозрачность светлой glass-плашки на тёмной теме, % */
const INVERSE_SURFACE_ALPHA_DARK_PERCENT = 12;

/**
 * Проверяет, активна ли glass-тема для snackbar.
 * @param context — режим темы и секция `snackbars`
 */
export function isSnackbarGlassTheme(context: SnackbarThemeContext): boolean {
  return Boolean(context.snackbars?.settings?.backdropFilter);
}

/**
 * Glass-палитра компактной полосы snackbar.
 * @param context — контекст темы
 */
export function getSnackbarGlassSurfaceTokens(
  context: SnackbarThemeContext,
): SnackbarSurfaceTokens {
  const isDark = context.mode === ThemeColorScheme.DARK;
  const onAccent = context.colors?.onAccent ?? '#ffffff';
  const messageColor = context.colors?.onAccent ?? neutral[10];

  if (isDark) {
    return {
      surface: mixColorWithTransparent(onAccent, INVERSE_SURFACE_ALPHA_DARK_PERCENT),
      messageColor,
      actionColor: primary[200],
    };
  }

  const inverseBase = context.colors?.text ?? neutral[900];

  return {
    surface: inverseBase.startsWith('#')
      ? withHexAlpha(inverseBase, INVERSE_SURFACE_ALPHA_LIGHT)
      : mixColorWithTransparent(inverseBase, Math.round(INVERSE_SURFACE_ALPHA_LIGHT * 100)),
    messageColor,
    actionColor: primary[300],
  };
}
