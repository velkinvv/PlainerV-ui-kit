import type { ThemeType } from '../types/theme';
import type { StepperAppearance } from '../types/ui';
import { neutral } from '../variables/colors/neutral';
import { mixColorWithTransparent } from './glassColorHandlers';
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
    const onAccent = context.colors?.onAccent ?? neutral[10];
    return {
      primary: onAccent,
      secondary: mixColorWithTransparent(onAccent, 72),
      tertiary: mixColorWithTransparent(onAccent, 52),
      backButton: onAccent,
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
      background: getOverlayPanelGlassBackground(context.mode, context.colors?.onAccent),
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
