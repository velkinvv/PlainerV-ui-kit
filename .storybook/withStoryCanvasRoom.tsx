import type { Decorator } from '@storybook/react';

/**
 * Декоратор превью Storybook.
 *
 * Задаёт минимальную высоту области сторис и `overflow: visible`, чтобы вложенные элементы
 * с `position: absolute` (календарь DateInput, выпадающие меню и т.п.) не обрезались канвасом:
 * абсолютное позиционирование не увеличивает высоту потока, и без «запаса» по высоте попап
 * оказывается за пределами кликабельной/видимой зоны превью.
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
