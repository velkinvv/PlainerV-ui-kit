import type { Decorator } from '@storybook/react';
import { useTheme } from 'styled-components';

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
 * В `preview.tsx` в массиве декораторов идёт **перед** {@link withStorybookUiKitTheme} (в SB 9 первый = ближе к сторис).
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

  const resolveBackgroundColor = (): string | undefined => {
    if (canvasParameters?.disableBackground) {
      return 'transparent';
    }
    if (useSecondarySurface) {
      return theme.colors?.backgroundSecondary;
    }
    return theme.colors?.background;
  };

  return (
    <div
      className={PLAINERV_STORY_CANVAS_ROOM_CLASS}
      style={{
        minHeight: 'min(90vh, 800px)',
        boxSizing: 'border-box',
        padding: canvasParameters?.disablePadding ? 0 : 16,
        overflow: 'visible',
        backgroundColor: resolveBackgroundColor(),
        color: theme.colors?.text,
      }}
    >
      <Story />
    </div>
  );
};
