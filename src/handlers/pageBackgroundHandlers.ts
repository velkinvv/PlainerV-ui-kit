import { css, type RuleSet } from 'styled-components';
import type { ThemeType } from '../types/theme';

/**
 * Возвращает декоративный фон страницы (glass mesh или kids-градиент).
 * @param theme — активная тема styled-components
 */
export function getThemePageBackground(
  theme: Pick<ThemeType, 'surfaceMaterial' | 'pageBackground'>,
): string | undefined {
  return theme.surfaceMaterial?.pageBackground ?? theme.pageBackground;
}

/**
 * Проверяет, задан ли декоративный фон страницы.
 * @param theme — активная тема styled-components
 */
export function hasThemePageBackground(
  theme: Pick<ThemeType, 'surfaceMaterial' | 'pageBackground'>,
): boolean {
  return Boolean(getThemePageBackground(theme));
}

/**
 * CSS фона страницы (градиент / mesh) для glass и kids тем.
 * @param theme — активная тема styled-components
 */
export function themePageBackgroundCss(
  theme: Pick<ThemeType, 'surfaceMaterial' | 'pageBackground'>,
): RuleSet {
  const pageBackground = getThemePageBackground(theme);

  if (!pageBackground) {
    return css``;
  }

  return css`
    background: ${pageBackground};
    background-attachment: fixed;
    min-height: 100vh;
  `;
}
