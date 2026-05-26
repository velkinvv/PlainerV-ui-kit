import { BorderRadiusHandler } from '@/handlers/uiHandlers';
import { Size } from '@/types/sizes';
import type { ThemeType } from '@/types/theme';

/**
 * Имя CSS-переменной фона шапки (`thead`, липкие `th`). Задаётся на `<table>` из `DataGrid` или вручную.
 * Fallback в стилях — `theme.tables.header.background`.
 */
export const PLAINER_TABLE_HEADER_BACKGROUND_CSS_VAR = '--plainer-table-header-background';

/**
 * Скругление оболочки таблицы. Задаётся на `TableContainerRoot`, наследуется clip / split-layout / `thead`.
 */
export const PLAINER_TABLE_BORDER_RADIUS_CSS_VAR = '--plainer-table-border-radius';

/** Запасной радиус, если в теме нет токенов таблицы и карточки. */
const TABLE_THEME_FALLBACK_BORDER_RADIUS = '16px';

/**
 * Скругление из ступени **Card** (для `shellInset` и явного размера карточки).
 * @param theme — активная тема styled-components
 * @param cardSize — ступень `theme.cards.sizes`
 */
export function tableCardBorderRadiusFromTheme(theme: ThemeType, cardSize: Size = Size.MD): string {
  const fromCardTier = theme.cards?.sizes?.[cardSize]?.borderRadius?.trim();
  if (fromCardTier) {
    return fromCardTier;
  }

  return tableBorderRadiusFromTheme(theme);
}

/**
 * Единое скругление примитива таблицы из `theme.tables.borderRadius`, затем Card MD, `theme.borderRadius`, fallback.
 * @param theme — активная тема styled-components
 */
export function tableBorderRadiusFromTheme(theme: ThemeType): string {
  const fromTableTheme = theme.tables?.borderRadius?.trim();
  if (fromTableTheme) {
    return fromTableTheme;
  }

  const fromCardMedium = theme.cards?.sizes?.[Size.MD]?.borderRadius?.trim();
  if (fromCardMedium) {
    return fromCardMedium;
  }

  if (theme.borderRadius != null) {
    return BorderRadiusHandler(theme.borderRadius);
  }

  return TABLE_THEME_FALLBACK_BORDER_RADIUS;
}

/**
 * Значение для `border-radius` у потомков `TableContainer`: CSS-переменная с fallback на тему.
 * @param theme — активная тема styled-components
 */
export function tableBorderRadiusFromCssVar(theme: ThemeType): string {
  return `var(${PLAINER_TABLE_BORDER_RADIUS_CSS_VAR}, ${tableBorderRadiusFromTheme(theme)})`;
}

/**
 * Скругление мелких интерактивных контролов в таблице (сортировка, фильтр в шапке, expand).
 * @param theme — активная тема styled-components
 */
export function tableInteractiveBorderRadiusFromTheme(theme: ThemeType): string {
  return tableBorderRadiusFromTheme(theme);
}
