import type { ThemeType } from '../types/theme';
import type { StepperAppearance } from '../types/ui';
import { neutral } from '../variables/colors/neutral';
import {
  getOverlayPanelGlassBackground,
  isOverlayPanelGlassTheme,
} from './overlayPanelGlassHandlers';
import { overlayPanelBackdropFilterFromTheme } from './overlayPanelShadowHandlers';

/** Контекст темы для резолва glass-токенов степпера */
export type StepperThemeContext = Pick<
  ThemeType,
  'mode' | 'colors' | 'surfaceMaterial' | 'dropdowns'
>;

/** Токены поверхности корня степпера */
export interface StepperRootSurfaceTokens {
  background: string;
  color: string;
  border?: string;
  backdropFilter?: string;
}

/** Токены текста степпера с учётом appearance панели */
export interface StepperTextTokens {
  /** Заголовок, счётчик, основной текст */
  primary: string;
  /** Подзаголовок и приглушённые заголовки шагов */
  secondary: string;
  /** Подписи «Шаг N» и второстепенные метки */
  tertiary: string;
  /** Иконка кнопки «назад» */
  backButton: string;
}

/** Светлый текст на тёмной панели — не зависит от mode темы */
const STEPPER_DARK_PANEL_TEXT_PRIMARY = neutral[10];
const STEPPER_DARK_PANEL_TEXT_SECONDARY = 'rgba(255, 255, 255, 0.72)';
const STEPPER_DARK_PANEL_TEXT_TERTIARY = 'rgba(255, 255, 255, 0.52)';

/**
 * Проверяет, активна ли glass-тема для степпера.
 * @param context — активная тема styled-components
 */
export function isStepperGlassTheme(context: StepperThemeContext): boolean {
  return isOverlayPanelGlassTheme(context);
}

/**
 * Токены текста степпера: на тёмной панели всегда светлые, на светлой — из палитры темы.
 * @param context — контекст темы
 * @param appearance — светлая или тёмная панель по макету
 */
export function getStepperTextTokens(
  context: StepperThemeContext,
  appearance: StepperAppearance,
): StepperTextTokens {
  if (appearance === 'dark') {
    return {
      primary: STEPPER_DARK_PANEL_TEXT_PRIMARY,
      secondary: STEPPER_DARK_PANEL_TEXT_SECONDARY,
      tertiary: STEPPER_DARK_PANEL_TEXT_TERTIARY,
      backButton: STEPPER_DARK_PANEL_TEXT_PRIMARY,
    };
  }

  return {
    primary: context.colors.text,
    secondary: context.colors.textSecondary,
    tertiary: context.colors.textTertiary,
    backButton: context.colors.text,
  };
}

/**
 * Токены фона корня степпера с учётом glass-темы и appearance.
 * @param context — контекст темы
 * @param appearance — светлая или тёмная панель по макету
 */
export function getStepperRootSurfaceTokens(
  context: StepperThemeContext,
  appearance: StepperAppearance,
): StepperRootSurfaceTokens {
  const textTokens = getStepperTextTokens(context, appearance);

  if (isStepperGlassTheme(context)) {
    return {
      background: getOverlayPanelGlassBackground(context.mode),
      color: textTokens.primary,
      border: `1px solid ${context.colors.borderSecondary}`,
      backdropFilter: overlayPanelBackdropFilterFromTheme(context as ThemeType),
    };
  }

  if (appearance === 'dark') {
    return {
      background: neutral[800],
      color: textTokens.primary,
    };
  }

  return {
    background: context.colors.backgroundSecondary,
    color: context.colors.text,
    border: `1px solid ${context.colors.border}`,
  };
}
