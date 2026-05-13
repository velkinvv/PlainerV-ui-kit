import type { CSSProperties } from 'react';
import { lightTheme } from '@/themes/themes';

/**
 * Стили разметки для сторис компонента `Pill`.
 */
export const pillStoriesStyles = {
  statusRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
  } satisfies CSSProperties,

  skeletonRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
    alignItems: 'center',
  } satisfies CSSProperties,

  statesMatrixColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  } satisfies CSSProperties,

  /** Сетка заголовков и ячеек матрицы состояний (5 колонок данных + колонка размеров). */
  statesMatrixGrid: {
    display: 'grid',
    gridTemplateColumns: '120px repeat(5, minmax(100px, 1fr))',
    gap: 12,
    alignItems: 'center',
  } satisfies CSSProperties,

  /** Заголовки колонок и подпись размера — вторичный/третичный текст из темы. */
  matrixMetaCaption: {
    fontSize: 12,
    color: lightTheme.colors.textTertiary,
  } satisfies CSSProperties,

  matrixFootnote: {
    fontSize: 12,
    color: lightTheme.colors.textSecondary,
    maxWidth: 560,
  } satisfies CSSProperties,

  radioGroupRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  } satisfies CSSProperties,

  controlledColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    alignItems: 'flex-start',
  } satisfies CSSProperties,

  controlledStateLabel: {
    fontSize: 12,
    color: lightTheme.colors.textSecondary,
  } satisfies CSSProperties,
};
