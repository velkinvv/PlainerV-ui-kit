import { css, type RuleSet } from 'styled-components';
import type { ThemeType } from '../types/theme';

/**
 * Проверяет, активна ли glass-тема (есть vibrancy-материал поверхности).
 * @param theme — активная тема styled-components
 */
export function isGlassColorScheme(theme: Pick<ThemeType, 'surfaceMaterial'>): boolean {
  return Boolean(theme.surfaceMaterial);
}

/**
 * CSS backdrop-filter для полупрозрачных поверхностей glass-темы.
 * @param theme — активная тема styled-components
 */
export function glassSurfaceMaterialCss(theme: ThemeType): RuleSet {
  const material = theme.surfaceMaterial;

  if (!material) {
    return css``;
  }

  return css`
    backdrop-filter: ${material.backdropFilter};
    -webkit-backdrop-filter: ${material.webkitBackdropFilter ?? material.backdropFilter};
  `;
}

/**
 * CSS фона страницы (mesh-gradient) для glass-темы.
 * @param theme — активная тема styled-components
 */
export function glassPageBackgroundCss(theme: ThemeType): RuleSet {
  const pageBackground = theme.surfaceMaterial?.pageBackground;

  if (!pageBackground) {
    return css``;
  }

  return css`
    background: ${pageBackground};
    background-attachment: fixed;
    min-height: 100vh;
  `;
}

/**
 * Тонкая обводка glass-панели (как в iOS / macOS).
 * @param theme — активная тема styled-components
 */
export function glassSurfaceBorderCss(theme: ThemeType): RuleSet {
  if (!isGlassColorScheme(theme)) {
    return css``;
  }

  return css`
    border: 1px solid ${theme.colors.borderTertiary};
  `;
}

/** Inline-стили фона canvas (Storybook и приложение). */
export type StoryCanvasBackgroundStyle = {
  background?: string;
  backgroundColor?: string;
  backgroundAttachment?: string;
};

/**
 * Фон области сторис: mesh-gradient для glass, иначе токены темы.
 * @param theme — активная тема styled-components
 * @param options.disableBackground — не задавать фон
 * @param options.useSecondarySurface — карточка Docs (`backgroundSecondary`)
 */
export function resolveStoryCanvasBackgroundStyle(
  theme: ThemeType,
  options: {
    disableBackground?: boolean;
    useSecondarySurface?: boolean;
  } = {},
): StoryCanvasBackgroundStyle {
  if (options.disableBackground) {
    return {
      background: 'transparent',
      backgroundColor: 'transparent',
    };
  }

  const pageBackground = theme.surfaceMaterial?.pageBackground;
  if (pageBackground) {
    return {
      background: pageBackground,
      backgroundAttachment: 'fixed',
      backgroundColor: 'transparent',
    };
  }

  if (options.useSecondarySurface) {
    return {
      backgroundColor: theme.colors.backgroundSecondary,
    };
  }

  return {
    backgroundColor: theme.colors.background,
  };
}
