import type { CSSProperties } from 'react';
import { lightTheme } from '@/themes/themes';

/**
 * Общие стили для сторис `Grid` и `GridItem` (без инлайнов в JSX).
 */
export const gridStoriesStyles = {
  cardFullHeight: {
    height: '100%',
  } satisfies CSSProperties,

  /** Фиксированные высоты карточек в сторис выравнивания по сетке. */
  alignmentCardHeight100: { height: '100px' } satisfies CSSProperties,
  alignmentCardHeight150: { height: '150px' } satisfies CSSProperties,
  alignmentCardHeight80: { height: '80px' } satisfies CSSProperties,
  alignmentCardHeight120: { height: '120px' } satisfies CSSProperties,
  alignmentCardHeight90: { height: '90px' } satisfies CSSProperties,
  alignmentCardHeight110: { height: '110px' } satisfies CSSProperties,

  gridNestedMarginTop: {
    marginTop: '16px',
  } satisfies CSSProperties,

  /** Нейтральная ячейка вложенного грида (серый фон из темы). */
  nestedDemoNeutralCell: {
    padding: '8px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    borderRadius: '4px',
  } satisfies CSSProperties,

  /** Чуть контрастнее нейтральная ячейка (вторичный фон). */
  nestedDemoNeutralCellEmphasis: {
    padding: '8px',
    backgroundColor: lightTheme.colors.backgroundSecondary,
    borderRadius: '4px',
  } satisfies CSSProperties,

  /** Условный «зелёный» блок вместо хардкода #e8f5e8. */
  nestedDemoSuccessTintCell: {
    padding: '8px',
    backgroundColor: `color-mix(in srgb, ${lightTheme.colors.success} 16%, ${lightTheme.colors.background})`,
    borderRadius: '4px',
  } satisfies CSSProperties,

  allFeaturesRoot: {
    padding: '20px',
  } satisfies CSSProperties,

  sectionSpacingMarginBottom40: {
    marginBottom: '40px',
  } satisfies CSSProperties,
};
