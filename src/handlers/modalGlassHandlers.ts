import type { Colors, ThemeType } from '../types/theme';
import { ThemeColorScheme } from '../types/theme';
import { isGlassColorScheme } from './glassSurfaceHandlers';
import { mixColorWithTransparent } from './glassColorHandlers';
import { getModalOverlayStyles } from './modalThemeHandlers';

/** Контекст темы для резолва glass-токенов модального окна и боковых панелей (Drawer, Sheet) */
export type ModalThemeContext = Pick<ThemeType, 'mode' | 'colors' | 'surfaceMaterial' | 'modals'>;

/**
 * Собирает контекст glass-токенов для Modal, Drawer и Sheet.
 * @param theme — активная тема styled-components
 */
export function getModalThemeContext(
  theme: Pick<ThemeType, 'mode' | 'colors' | 'surfaceMaterial' | 'modals'>,
): ModalThemeContext {
  return {
    mode: theme.mode,
    colors: theme.colors,
    surfaceMaterial: theme.surfaceMaterial,
    modals: theme.modals,
  };
}

/** Непрозрачность glass-панели модалки — плотнее, чем у Card (surfaceElevated) */
const CONTAINER_ALPHA_LIGHT = 0.68;

const CONTAINER_ALPHA_DARK = 0.74;

/**
 * Проверяет, активна ли glass-тема для модального окна.
 * @param context — активная тема styled-components
 */
export function isModalGlassTheme(context: ModalThemeContext): boolean {
  return isGlassColorScheme(context);
}

/**
 * Glass-фон панели модального окна (плотнее Card) из токенов темы.
 * @param mode — светлая или тёмная тема
 * @param colors — палитра темы (onAccent / card)
 */
export function getModalGlassContainerBackground(
  mode: ThemeColorScheme,
  colors?: Pick<Colors, 'onAccent' | 'card' | 'backgroundSecondary'>,
): string {
  const alphaPercent = Math.round(
    (mode === ThemeColorScheme.DARK ? CONTAINER_ALPHA_DARK : CONTAINER_ALPHA_LIGHT) * 100,
  );
  const base =
    mode === ThemeColorScheme.DARK
      ? (colors?.card ?? colors?.backgroundSecondary)
      : (colors?.onAccent ?? colors?.backgroundSecondary ?? colors?.card);

  if (!base) {
    return mixColorWithTransparent(
      mode === ThemeColorScheme.DARK ? 'rgb(44, 44, 48)' : 'rgb(255, 255, 255)',
      alphaPercent,
    );
  }

  return mixColorWithTransparent(base, alphaPercent);
}

/**
 * Glass-фон оверлея модального окна из `theme.colors.overlay`.
 * @param mode — светлая или тёмная тема
 * @param overlayToken — `theme.colors.overlay`
 */
export function getModalGlassOverlayBackground(
  mode: ThemeColorScheme,
  overlayToken?: string,
): string {
  const base =
    overlayToken ??
    (mode === ThemeColorScheme.DARK ? 'rgba(0, 0, 0, 0.55)' : 'rgba(0, 0, 0, 0.5)');
  // Чуть плотнее базового overlay для glass
  const denserAlpha = mode === ThemeColorScheme.DARK ? 70 : 45;
  return `color-mix(in srgb, ${base} ${denserAlpha}%, rgb(0, 0, 0))`;
}

/**
 * Фон панели модального окна с учётом glass-темы.
 * @param context — контекст темы
 */
export function getModalContainerBackground(context: ModalThemeContext): string {
  if (isModalGlassTheme(context)) {
    return getModalGlassContainerBackground(context.mode, context.colors);
  }

  return context.colors.card;
}

/**
 * Стили оверлея модального окна с учётом glass-темы.
 * @param context — контекст темы
 */
export function getModalOverlayTokens(context: ModalThemeContext) {
  const overlayStyles = getModalOverlayStyles(context.modals);

  if (!isModalGlassTheme(context)) {
    return overlayStyles;
  }

  return {
    ...overlayStyles,
    background: getModalGlassOverlayBackground(context.mode, context.colors?.overlay),
    backdropFilter: context.modals?.overlay?.backdropFilter ?? overlayStyles.backdropFilter,
  };
}
