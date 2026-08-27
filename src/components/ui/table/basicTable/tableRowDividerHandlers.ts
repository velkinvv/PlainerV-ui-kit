import type { TableTheme } from '@/types/theme';

/** Запасной отступ второй sticky-строки `thead`, пока высота первой строки не измерена. */
export const DEFAULT_STICKY_THEAD_SECOND_ROW_OFFSET = '48px';

type TableDividerThemeSlice = {
  tables: Pick<TableTheme, 'header' | 'cell' | 'body'>;
};

/**
 * Нижняя граница ячейки тела: рисуется на `td`/`th`, потому что при `border-collapse: separate`
 * границы `tr` в Chromium/WebKit не отображаются.
 * @param theme - тема с `tables.body.rowBorder`
 */
export function resolveTableBodyCellRowDivider(theme: TableDividerThemeSlice): string {
  return `1px solid ${theme.tables.body.rowBorder}`;
}

/**
 * Нижняя граница ячейки шапки (последняя строка `thead` → тело).
 * Берём `header.borderBottom`: он контрастнее `cell.headBorderBottom` и отделяет шапку,
 * когда фон `card` совпадает с телом.
 * @param theme - тема с токенами шапки и активной сортировки
 * @param isActiveSortColumn - усиленная граница активной колонки сортировки
 */
export function resolveTableHeadToBodyCellDivider(
  theme: TableDividerThemeSlice,
  isActiveSortColumn: boolean,
): string {
  if (isActiveSortColumn) {
    return theme.tables.cell.headActiveSortBorderBottom;
  }
  return theme.tables.header.borderBottom;
}

/**
 * Нижняя граница ячейки таблицы в зависимости от секции.
 * @param options.isHead - ячейка шапки
 * @param options.isActiveSortColumn - активная колонка сортировки (только шапка)
 * @param options.theme - тема таблицы
 */
export function resolveTableCellBottomBorder(options: {
  isHead: boolean;
  isActiveSortColumn?: boolean;
  theme: TableDividerThemeSlice;
}): string {
  const { isHead, isActiveSortColumn = false, theme } = options;
  if (isHead) {
    return resolveTableHeadToBodyCellDivider(theme, isActiveSortColumn);
  }
  return resolveTableBodyCellRowDivider(theme);
}

/**
 * CSS-значение `--plainer-sticky-thead-second-row-top` по измеренной высоте первой строки `thead`.
 * @param heightPx - высота первой строки шапки в пикселях
 */
export function formatStickyTheadSecondRowOffset(heightPx: number): string {
  if (!Number.isFinite(heightPx) || heightPx <= 0) {
    return DEFAULT_STICKY_THEAD_SECOND_ROW_OFFSET;
  }
  return `${Math.round(heightPx)}px`;
}
