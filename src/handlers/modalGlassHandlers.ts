import type { ThemeType } from '../types/theme';
import { ThemeColorScheme } from '../types/theme';
import { isGlassColorScheme } from './glassSurfaceHandlers';
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

/** Непрозрачность glass-оверлея — чуть плотнее, чем theme.colors.overlay */
const OVERLAY_ALPHA_LIGHT = 0.22;

const OVERLAY_ALPHA_DARK = 0.38;

/**
 * Проверяет, активна ли glass-тема для модального окна.
 * @param context — активная тема styled-components
 */
export function isModalGlassTheme(context: ModalThemeContext): boolean {
  return isGlassColorScheme(context);
}

/**
 * Glass-фон панели модального окна (плотнее Card).
 * @param mode — светлая или тёмная тема
 */
export function getModalGlassContainerBackground(mode: ThemeColorScheme): string {
  if (mode === ThemeColorScheme.DARK) {
    return `rgba(44, 44, 48, ${CONTAINER_ALPHA_DARK})`;
  }

  return `rgba(255, 255, 255, ${CONTAINER_ALPHA_LIGHT})`;
}

/**
 * Glass-фон оверлея модального окна.
 * @param mode — светлая или тёмная тема
 */
export function getModalGlassOverlayBackground(mode: ThemeColorScheme): string {
  if (mode === ThemeColorScheme.DARK) {
    return `rgba(0, 0, 0, ${OVERLAY_ALPHA_DARK})`;
  }

  return `rgba(15, 23, 42, ${OVERLAY_ALPHA_LIGHT})`;
}

/**
 * Фон панели модального окна с учётом glass-темы.
 * @param context — контекст темы
 */
export function getModalContainerBackground(context: ModalThemeContext): string {
  if (isModalGlassTheme(context)) {
    return getModalGlassContainerBackground(context.mode);
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
    background: getModalGlassOverlayBackground(context.mode),
    backdropFilter: context.modals?.overlay?.backdropFilter ?? overlayStyles.backdropFilter,
  };
}
