import type { CSSProperties } from 'react';
import type { ThemeType } from '../types/theme';
import { resolveStoryCanvasBackgroundStyle } from './glassSurfaceHandlers';

/**
 * Inline-стили фона canvas Storybook из активной темы UI-kit.
 * @param theme — тема styled-components
 * @param options.disableBackground — не задавать фон (рисует сама сторис)
 * @param options.useSecondarySurface — фон карточки Docs
 */
export function resolveStorybookCanvasRoomStyle(
  theme: ThemeType,
  options: {
    disableBackground?: boolean;
    useSecondarySurface?: boolean;
  } = {},
): CSSProperties {
  const backgroundStyle = resolveStoryCanvasBackgroundStyle(theme, options);

  return {
    minHeight: 'min(90vh, 800px)',
    boxSizing: 'border-box',
    padding: 0,
    overflow: 'visible',
    color: theme.colors?.text,
    ...backgroundStyle,
  };
}
