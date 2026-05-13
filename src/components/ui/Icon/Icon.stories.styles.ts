import type { CSSProperties } from 'react';
import { lightTheme, darkTheme } from '@/themes/themes';

const thinScrollbarColor = `${lightTheme.colors.borderSecondary} ${lightTheme.colors.backgroundTertiary}`;

/**
 * Общие стили для Storybook-страниц с иконками.
 */
export const iconStoriesStyles = {
  pageRoot: {
    padding: '20px',
  } satisfies CSSProperties,

  pageRootWide: {
    padding: '20px',
    maxWidth: '1200px',
  } satisfies CSSProperties,

  pageSection: {
    marginBottom: '40px',
  } satisfies CSSProperties,

  titleWithMargin: {
    marginBottom: '16px',
    color: lightTheme.colors.text,
  } satisfies CSSProperties,

  description: {
    marginBottom: '20px',
    color: lightTheme.colors.textSecondary,
  } satisfies CSSProperties,

  controlsRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    alignItems: 'center',
  } satisfies CSSProperties,

  controlsRowEnd: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  } satisfies CSSProperties,

  controlLabel: {
    display: 'block',
    marginBottom: '4px',
  } satisfies CSSProperties,

  controlInput: {
    padding: '8px 12px',
    border: `1px solid ${lightTheme.colors.borderSecondary}`,
    borderRadius: '6px',
    fontSize: '14px',
  } satisfies CSSProperties,

  searchInput: {
    padding: '8px 12px',
    border: `1px solid ${lightTheme.colors.borderSecondary}`,
    borderRadius: '6px',
    fontSize: '14px',
    minWidth: '200px',
  } satisfies CSSProperties,

  statsPanel: {
    marginBottom: '20px',
    padding: '12px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    borderRadius: '8px',
    border: `1px solid ${lightTheme.colors.border}`,
  } satisfies CSSProperties,

  statsMeta: {
    marginTop: '4px',
    fontSize: '14px',
    color: lightTheme.colors.textSecondary,
  } satisfies CSSProperties,

  scrollableGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '16px',
    overflowY: 'auto',
    padding: '8px',
    border: `1px solid ${lightTheme.colors.border}`,
    borderRadius: '8px',
    backgroundColor: lightTheme.colors.backgroundQuinary,
    scrollbarWidth: 'thin',
    scrollbarColor: thinScrollbarColor,
  } satisfies CSSProperties,

  fixedSixColumnGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '16px',
    padding: '20px',
  } satisfies CSSProperties,

  responsiveCardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  } satisfies CSSProperties,

  iconPreviewCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px',
    border: `1px solid ${lightTheme.colors.border}`,
    borderRadius: '8px',
    backgroundColor: lightTheme.colors.backgroundSecondary,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  } satisfies CSSProperties,

  iconCategoryCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    border: `1px solid ${lightTheme.colors.border}`,
    borderRadius: '8px',
    backgroundColor: lightTheme.colors.backgroundSecondary,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  } satisfies CSSProperties,

  iconNameLabel: {
    marginTop: '8px',
    fontSize: '12px',
    textAlign: 'center',
    color: lightTheme.colors.textSecondary,
  } satisfies CSSProperties,

  iconNameLabelFlexible: {
    marginTop: '8px',
    fontSize: '12px',
    textAlign: 'center',
    color: lightTheme.colors.textSecondary,
    wordBreak: 'break-word',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } satisfies CSSProperties,

  iconVariantLabel: {
    fontSize: '10px',
    color: lightTheme.colors.textTertiary,
    marginTop: '4px',
    textTransform: 'uppercase',
  } satisfies CSSProperties,

  iconCellCentered: {
    textAlign: 'center',
  } satisfies CSSProperties,

  hintTitle: {
    marginBottom: '8px',
  } satisfies CSSProperties,

  hintMeta: {
    marginBottom: '8px',
    fontSize: '11px',
  } satisfies CSSProperties,

  hintCode: {
    marginBottom: '8px',
    fontSize: '11px',
    fontFamily: 'monospace',
  } satisfies CSSProperties,

  hintTooltipCss: `
    .icon-stories-scroll::-webkit-scrollbar {
      width: 8px;
    }
    .icon-stories-scroll::-webkit-scrollbar-track {
      background: ${lightTheme.colors.backgroundTertiary};
      border-radius: 4px;
    }
    .icon-stories-scroll::-webkit-scrollbar-thumb {
      background: ${lightTheme.colors.borderSecondary};
      border-radius: 4px;
    }
    .icon-stories-scroll::-webkit-scrollbar-thumb:hover {
      background: ${lightTheme.colors.borderTertiary};
    }
    .icon-tooltip-content {
      background-color: ${darkTheme.colors.backgroundSecondary};
      color: ${darkTheme.colors.text};
      text-align: center;
      padding: 12px;
      border-radius: 8px;
      font-size: 12px;
      white-space: nowrap;
      box-shadow: ${darkTheme.boxShadow.lg};
    }
    .icon-copy-button {
      background: ${lightTheme.colors.info};
      color: ${lightTheme.colors.backgroundSecondary};
      border: none;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 10px;
      cursor: pointer;
      margin-top: 4px;
      transition: background 0.2s;
      pointer-events: auto;
    }
    .icon-copy-button:hover {
      background: ${lightTheme.colors.infoHover};
    }
    .icon-copy-button.copied {
      background: ${lightTheme.colors.success};
    }
  `,
};

/**
 * Собирает стиль прокручиваемой сетки иконок с динамической высотой.
 * @param minHeight Минимальная высота контейнера.
 * @param maxHeight Максимальная высота контейнера.
 */
export const buildIconStoriesScrollableGridStyle = (
  minHeight: number,
  maxHeight: number,
): CSSProperties => ({
  ...iconStoriesStyles.scrollableGrid,
  minHeight,
  maxHeight,
});

/**
 * Собирает стиль карточки предпросмотра иконки с фиксированной высотой.
 * @param cardHeight Высота карточки в пикселях или CSS-строке.
 */
export const buildIconPreviewCardStyle = (cardHeight: number | string): CSSProperties => ({
  ...iconStoriesStyles.iconPreviewCard,
  height: cardHeight,
  boxSizing: 'border-box',
});

/**
 * Собирает стиль карточки предпросмотра иконки с минимальной высотой и центрированием содержимого.
 * @param minHeight Минимальная высота карточки.
 */
export const buildCenteredIconPreviewCardStyle = (minHeight: number): CSSProperties => ({
  ...iconStoriesStyles.iconPreviewCard,
  minHeight,
  justifyContent: 'center',
});
