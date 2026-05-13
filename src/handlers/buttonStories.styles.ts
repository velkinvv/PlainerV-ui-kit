import type { CSSProperties } from 'react';
import { lightTheme } from '@/themes/themes';

/** Градиент «штрихового» shimmer для отладочного skeleton-состояния (как в GlobalStyles `@keyframes skeleton-loading`). */
const skeletonShimmerGradientBackground = `linear-gradient(
  90deg,
  ${lightTheme.colors.backgroundQuaternary} 25%,
  ${lightTheme.colors.backgroundTertiary} 50%,
  ${lightTheme.colors.backgroundQuaternary} 75%
)`;

/** Полупрозранный текст для заглушек skeleton отладки — аналог прежних hex с альфой. */
const skeletonDebugMutedTextColor = `color-mix(in srgb, ${lightTheme.colors.textTertiary} 50%, transparent)`;

/**
 * Стили layout и отладочных «сырых» кнопок для историй `Button` и `IconButton` в Storybook.
 * Используют токены `lightTheme`, без хардкода hex в примерах.
 */
export const buttonStoriesStyles = {
  /** Вертикальный стек с выравниванием по началу (оси крест-на-крест). */
  columnFlexStartGap16: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'flex-start',
  } satisfies CSSProperties,

  /** Вертикальный стек с фиксированным шагом 16px. */
  columnGap16: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  } satisfies CSSProperties,

  /** Вертикальный стек с шагом 24px (крупные блоки в «шоукейсе» вариантов). */
  columnGap24: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  } satisfies CSSProperties,

  /** Горизонтальный ряд с переносом и шагом 12px. */
  rowWrapGap12: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  } satisfies CSSProperties,

  /** Горизонтальный ряд с переносом, шаг 12px, выравнивание по центру по поперечной оси. */
  rowWrapGap12AlignCenter: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    alignItems: 'center',
  } satisfies CSSProperties,

  /** Горизонтальный ряд с переносом и шагом 16px. */
  rowWrapGap16: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  } satisfies CSSProperties,

  /** Горизонтальный ряд с переносом, шаг 16px, выравнивание по центру по поперечной оси. */
  rowWrapGap16AlignCenter: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'center',
  } satisfies CSSProperties,

  /**
   * Отладочная «голая» кнопка (native `<button>`) для сравнения с skeleton-вариантом компонента.
   * Анимируется глобальным ключевым кадром `skeleton-loading` из `GlobalStyles.tsx`.
   */
  skeletonDebugNativeTextButton: {
    background: skeletonShimmerGradientBackground,
    backgroundSize: '200% 100%',
    backgroundPosition: '-200% 0',
    color: skeletonDebugMutedTextColor,
    border: `2px solid ${lightTheme.colors.borderSecondary}`,
    padding: '10px 18px',
    borderRadius: '35px',
    fontSize: '14px',
    animation: 'skeleton-loading 1.5s infinite ease-in-out',
  } satisfies CSSProperties,

  /**
   * Отладочная круглая «голая» кнопка под IconButton skeleton (контент — иконка внутри blur-обёртки).
   */
  skeletonDebugNativeIconButton: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: skeletonShimmerGradientBackground,
    backgroundSize: '200% 100%',
    backgroundPosition: '-200% 0',
    color: skeletonDebugMutedTextColor,
    border: `2px solid ${lightTheme.colors.borderSecondary}`,
    animation: 'skeleton-loading 1.5s infinite ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } satisfies CSSProperties,

  /** Обёртка для иконки внутри skeleton-отладки: лёгкое размытие и сниженная непрозрачность. */
  skeletonDebugIconBlurWrapper: {
    filter: 'blur(1px)',
    opacity: 0.7,
  } satisfies CSSProperties,
};
