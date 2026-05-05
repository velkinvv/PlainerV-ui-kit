import type { CSSProperties } from 'react';
import { lightTheme } from '@/themes/themes';

/**
 * Общие layout-стили для сторис поверхностей с оверлеем (Sheet, Drawer и аналоги).
 * Цвета берём из светлой темы для предсказуемого вида в доке Storybook.
 */
export const surfaceOverlayStoriesStyles = {
  /** Корневая обёртка простых демо с отступом. */
  paddedRoot: {
    padding: 24,
  } satisfies CSSProperties,

  /** Cheatsheet с переключателями lazy / unmountOnClose. */
  lifecycleCheatsheetRoot: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    maxWidth: 860,
  } satisfies CSSProperties,

  paragraphReset: {
    margin: 0,
  } satisfies CSSProperties,

  controlsRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  } satisfies CSSProperties,

  /** Подпись со счётчиком открытий (вторичный текст). */
  mutedOpenCountCaption: {
    margin: 0,
    color: lightTheme.colors.textSecondary,
  } satisfies CSSProperties,
};
