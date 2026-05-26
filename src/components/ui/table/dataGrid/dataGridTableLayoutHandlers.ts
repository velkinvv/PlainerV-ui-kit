/**
 * Режим раскладки `<table>` в DataGrid: при горизонтальном скролле — `fixed`, чтобы ширины колонок не сжимались.
 * @param horizontalScroll — включён ли горизонтальный скролл оболочки
 * @param showColumnResizeUi — активен ли UI ресайза колонок
 */
export function resolveDataGridTableLayout(
  horizontalScroll: boolean,
  showColumnResizeUi: boolean,
): 'fixed' | undefined {
  if (horizontalScroll || showColumnResizeUi) {
    return 'fixed';
  }

  return undefined;
}
