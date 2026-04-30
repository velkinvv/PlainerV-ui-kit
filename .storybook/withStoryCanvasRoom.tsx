import type { Decorator } from '@storybook/react';

/**
 * Декоратор превью Storybook.
 *
 * Задаёт минимальную высоту области сторис и `overflow: visible`, чтобы вложенные элементы
 * с `position: absolute` (календарь DateInput и т.п.) не обрезались канвасом.
 * Попапы, смонтированные в `body` через портал (`Dropdown` при `inline={false}`), дополнительно
 * разжимают обёртки Storybook в `preview-storybook-overlays.css`.
 */
export const withStoryCanvasRoom: Decorator = (Story) => (
  <div
    style={{
      minHeight: 'min(90vh, 800px)',
      boxSizing: 'border-box',
      paddingBottom: 16,
      overflow: 'visible',
    }}
  >
    <Story />
  </div>
);
