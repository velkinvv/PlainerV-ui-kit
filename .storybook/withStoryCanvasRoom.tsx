import type { Decorator } from '@storybook/react';
import { useTheme } from 'styled-components';
import { resolveStorybookCanvasRoomStyle } from '../src/handlers/storybookCanvasRoomHandlers';

/**
 * Параметры декоратора canvas в `parameters.plainervStoryCanvas`.
 */
export type PlainervStoryCanvasParameters = {
  /** Не добавлять padding 16px (для fullscreen-витрин). */
  disablePadding?: boolean;
  /** Не задавать фон — его рисует сама сторис. */
  disableBackground?: boolean;
  /**
   * `page` — `colors.background` (вкладка Canvas);
   * `secondary` — `colors.backgroundSecondary` (карточка в Docs).
   */
  surface?: 'page' | 'secondary';
};

const PLAINERV_STORY_CANVAS_ROOM_CLASS = 'plainerv-story-canvas-room';

/**
 * Декоратор превью Storybook.
 *
 * Задаёт минимальную высоту области сторис, фон из активной темы UI-kit и `overflow: visible`,
 * чтобы вложенные элементы с `position: absolute` (календарь DateInput и т.п.) не обрезались.
 * Для glass-тем рисует mesh-gradient, чтобы backdrop-filter компонентов был виден.
 */
export const withStoryCanvasRoom: Decorator = (Story, context) => {
  const theme = useTheme();
  const canvasParameters = context.parameters?.plainervStoryCanvas as
    | PlainervStoryCanvasParameters
    | undefined;

  const isDocsView = context.viewMode === 'docs';
  const useSecondarySurface =
    canvasParameters?.surface === 'secondary' ||
    (canvasParameters?.surface !== 'page' && isDocsView);

  const roomStyle = resolveStorybookCanvasRoomStyle(theme, {
    disableBackground: canvasParameters?.disableBackground,
    useSecondarySurface: theme.surfaceMaterial ? false : useSecondarySurface,
  });

  return (
    <div
      className={PLAINERV_STORY_CANVAS_ROOM_CLASS}
      style={{
        ...roomStyle,
        padding: canvasParameters?.disablePadding ? 0 : 16,
      }}
    >
      <Story />
    </div>
  );
};
