/** Режим скролла при `scrollAreaMaxHeight`: отдельные таблицы шапки и тела. */
export type TableBodyScrollHost = 'split-tables';

/**
 * CSS-переменная отступа справа у `thead`, чтобы колонки совпадали с `tbody` при вертикальном скролле.
 * Значение задаётся на `<table>` из `useTableBodyScrollbarGutterSync`.
 */
export const PLAINER_TABLE_BODY_SCROLLBAR_GUTTER_CSS_VAR = '--plainer-table-body-scrollbar-gutter';

/** Строка `thead` с панелью действий (`headerToolbar` у DataGrid) — не участвует в горизонтальном скролле колонок. */
export const PLAINER_TABLE_HEADER_TOOLBAR_ROW_ATTRIBUTE = 'data-plainer-table-header-toolbar-row';

/**
 * Ширина полосы прокрутки у scroll-контейнера (0, если скроллбара нет).
 * @param scrollElement — обычно `tbody` с `overflow-y: auto`
 */
export function measureElementScrollbarGutterWidth(scrollElement: HTMLElement): number {
  return Math.max(0, scrollElement.offsetWidth - scrollElement.clientWidth);
}

/**
 * Нормализует макс. высоту скролла `tbody` в CSS-значение.
 * @param maxHeight — число (px) или строка (`320px`, `50vh`)
 */
export function formatTableBodyScrollMaxHeight(maxHeight: string | number): string {
  if (typeof maxHeight === 'number') {
    return `${maxHeight}px`;
  }
  return maxHeight;
}

/**
 * Нужен ли режим «вертикальный скролл только у строк».
 * @param stickyHeader — липкая/фиксированная шапка
 * @param bodyScrollMaxHeight — лимит высоты из `scrollAreaMaxHeight`
 */
export function shouldUseTableBodyOnlyVerticalScroll(
  stickyHeader: boolean,
  bodyScrollMaxHeight: string | number | undefined,
): boolean {
  return stickyHeader && bodyScrollMaxHeight != null && bodyScrollMaxHeight !== '';
}

/**
 * Split-layout при лимите высоты: шапка снаружи, скролл только у блока строк.
 * @param scrollAreaMaxHeight — лимит высоты из `TableContainerScroll`
 */
export function resolveTableBodyScrollHost(
  scrollAreaMaxHeight: string | number | undefined,
): TableBodyScrollHost | undefined {
  if (scrollAreaMaxHeight == null || scrollAreaMaxHeight === '') {
    return undefined;
  }

  return 'split-tables';
}

/**
 * Нужна ли синхронизация ширин колонок при скролле `tbody`.
 * @param bodyScrollOnlyVertical — скролл только у строк
 */
export function shouldUseTableBodyColumnWidthSync(bodyScrollOnlyVertical: boolean): boolean {
  return bodyScrollOnlyVertical;
}

/**
 * Измерять ли колонки в натуральной ширине (`max-content`), а не по сжатой шапке.
 * @param horizontalScroll — включён горизонтальный скролл
 */
export function shouldMeasureTableBodyNaturalColumnWidths(horizontalScroll: boolean): boolean {
  return horizontalScroll;
}
