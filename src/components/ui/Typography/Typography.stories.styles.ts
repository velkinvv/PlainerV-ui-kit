import type { CSSProperties } from 'react';
import { lightTheme } from '@/themes/themes';

const demoBorder = `1px solid ${lightTheme.colors.border}`;

/**
 * Стили разметки для сторис компонента `Typography`.
 */
export const typographyStoriesStyles = {
  columnGap16: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  } satisfies CSSProperties,

  columnGap12: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  } satisfies CSSProperties,

  columnGap20: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  } satisfies CSSProperties,

  columnGap8: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  } satisfies CSSProperties,

  /** Рамка для демонстрации выравнивания (граница из темы). */
  alignmentDemoBox: {
    border: demoBorder,
    padding: '8px',
  } satisfies CSSProperties,

  /** То же + фиксированная ширина для justify. */
  alignmentJustifyDemoBox: {
    border: demoBorder,
    padding: '8px',
    width: '300px',
  } satisfies CSSProperties,

  /** Узкий контейнер для демо переноса / noWrap. */
  noWrapDemoContainer: {
    width: '200px',
    border: demoBorder,
    padding: '8px',
  } satisfies CSSProperties,

  /** Отступ под заголовки блоков в сторис «Шрифты из темы». */
  themeFontSectionHeading: {
    marginBottom: '12px',
  } satisfies CSSProperties,
};
