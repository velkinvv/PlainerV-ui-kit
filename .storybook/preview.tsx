import type { Preview } from '@storybook/react';
import { ThemeProvider } from '../src/themes/ThemeProvider';
import { withStoryCanvasRoom } from './withStoryCanvasRoom';

/**
 * Глобальные параметры превью.
 * Декоратор `ThemeProvider` нужен всем сторис с styled-components: без темы `theme` в контексте
 * undefined и падает доступ к полям вроде `theme.sizes` / `theme.buttons` и т.д.
 * Дополнительная обёртка в отдельных сторис допустима (внутренний провайдер перекрывает внешний).
 *
 * `withStoryCanvasRoom` — см. файл декоратора: место под абсолютные попапы на Canvas и в Docs.
 */
const preview: Preview = {
  decorators: [
    /**
     * @param Story — компонент сторис из CSF (`Story` из `@storybook/react`)
     * Порядок декораторов Storybook: первый в массиве — внутренний (ближе к сторис), следующие — снаружи.
     * Итог: снаружи запас по высоте (`withStoryCanvasRoom`), внутри — тема и сама сторис.
     */
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
    withStoryCanvasRoom,
  ],
  parameters: {
    // Минимальная высота блока сторис на странице документации (autodocs), чтобы попапы влезали
    docs: {
      story: {
        height: 'min(90vh, 800px)',
      },
    },
  },
};

export default preview;
