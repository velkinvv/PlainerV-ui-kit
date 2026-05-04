import type { ThemeType } from '@/types/theme';

/**
 * Имя CSS-переменной фона шапки (`thead`, липкие `th`). Задаётся на `<table>` из `DataGrid` или вручную.
 * Fallback в стилях — `theme.tables.header.background`.
 */
export const PLAINER_TABLE_HEADER_BACKGROUND_CSS_VAR = '--plainer-table-header-background';

/** Запасной радиус, если в теме нет `tables` (например, устаревший мок). */
const TABLE_THEME_FALLBACK_BORDER_RADIUS = '12px';

/**
 * Единое скругление примитива таблицы: карточка-оболочка, клип скролла, верх шапки, низ встроенной пагинации, фокус мелких контролов.
 * @param theme — активная тема styled-components
 */
export function tableBorderRadiusFromTheme(theme: ThemeType): string {
  return theme.tables?.borderRadius ?? TABLE_THEME_FALLBACK_BORDER_RADIUS;
}

/**
 * Скругление мелких интерактивных контролов в таблице (сортировка, фильтр в шапке, expand).
 * Совпадает с `tableBorderRadiusFromTheme`: значение задаётся в `theme.tables.borderRadius`.
 * @param theme — активная тема styled-components
 */
export function tableInteractiveBorderRadiusFromTheme(theme: ThemeType): string {
  return tableBorderRadiusFromTheme(theme);
}
