import type { CSSProperties } from 'react';
import { darkTheme, lightTheme } from '@/themes/themes';

/**
 * Стили страницы обзора хуков (`Hooks.stories.tsx`).
 * Токены темы, без хардкода палитры в компоненте.
 */
export const hooksOverviewStoriesStyles = {
  codeBlockContainer: {
    backgroundColor: darkTheme.colors.background,
    color: darkTheme.colors.textSecondary,
    padding: '16px',
    borderRadius: '6px',
    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
    fontSize: '14px',
    overflow: 'auto',
    userSelect: 'text',
    WebkitUserSelect: 'text',
  } satisfies CSSProperties,

  codeBlockPre: {
    margin: 0,
    whiteSpace: 'pre-wrap',
    userSelect: 'text',
    WebkitUserSelect: 'text',
  } satisfies CSSProperties,

  /** Подпись-«чип» рядом с названием хука в примерах кода. */
  hookDescriptionPill: {
    color: lightTheme.colors.text,
    backgroundColor: lightTheme.colors.backgroundQuaternary,
    border: `1px solid ${lightTheme.colors.borderSecondary}`,
    borderRadius: '999px',
    padding: '4px 10px',
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '12px',
    lineHeight: '16px',
  } satisfies CSSProperties,

  sectionHeading: {
    color: lightTheme.colors.text,
  } satisfies CSSProperties,

  hookExampleCard: {
    padding: '20px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    border: `1px solid ${lightTheme.colors.border}`,
    borderRadius: '8px',
  } satisfies CSSProperties,

  principlesPanel: {
    padding: '16px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    borderRadius: '8px',
  } satisfies CSSProperties,

  flexAlignCenterMarginBottom12: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
  } satisfies CSSProperties,

  listUnstyled: {
    margin: 0,
    paddingLeft: '20px',
  } satisfies CSSProperties,

  listItemMarginBottom4: {
    marginBottom: '4px',
  } satisfies CSSProperties,

  overviewCardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px',
  } satisfies CSSProperties,

  columnFlexGap20: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  } satisfies CSSProperties,

  columnFlexGap24: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  } satisfies CSSProperties,

  tagNumberBadge: {
    marginRight: '12px',
    minWidth: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } satisfies CSSProperties,

  /** Вторичный текст (подзаголовки карточек). */
  bodyTextMuted: {
    color: lightTheme.colors.textSecondary,
  } satisfies CSSProperties,
};

/** Акцентные цвета рамок карточек хуков (цикл по списку). */
export const HOOK_OVERVIEW_CARD_BORDER_ACCENTS: readonly string[] = [
  lightTheme.colors.primary,
  lightTheme.colors.success,
  lightTheme.colors.info,
  lightTheme.colors.warning,
  lightTheme.colors.danger,
  lightTheme.colors.secondary,
];

/**
 * Карточка хука на обзорной странице.
 * @param accentBorderColor - цвет рамки из палитры темы
 */
export function hookOverviewCardStyle(accentBorderColor: string): CSSProperties {
  return {
    padding: '20px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    border: `2px solid ${accentBorderColor}`,
    borderRadius: '12px',
  };
}

/** Блок кода в секции «лучшие практики» с отступом снизу. */
export const hooksOverviewCodeBlockWithBottomMargin: CSSProperties = {
  ...hooksOverviewStoriesStyles.codeBlockContainer,
  marginBottom: '16px',
};
