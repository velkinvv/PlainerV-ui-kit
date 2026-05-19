/** Атрибут строки-детали раскрытия в DataGrid — не участвует в синхронизации колонок. */
export const DATA_GRID_EXPANDED_DETAIL_ROW_ATTRIBUTE = 'data-datagrid-expanded-detail';

/** Маркер `<colgroup>`, созданного синхронизацией split-layout. */
export const PLAINER_SPLIT_TABLE_COLUMN_SYNC_ATTRIBUTE = 'data-plainer-split-column-sync';

/** Таблица растянута на всю ширину трека (сумма колонок уже viewport). */
export const PLAINER_SPLIT_TABLE_FILL_SCROLLPORT_ATTRIBUTE = 'data-plainer-split-fill-scrollport';

const tableBodyColumnWidthStyleKeys = ['width', 'minWidth', 'maxWidth'] as const;

/**
 * Строка шапки с максимальным числом ячеек — обычно ряд заголовков колонок (не toolbar).
 * @param tableElement — корневая `<table>`
 */
export function findTableBodyColumnSyncReferenceRow(
  tableElement: HTMLTableElement,
): HTMLTableRowElement | null {
  const headSection = tableElement.tHead;
  if (!headSection) {
    return null;
  }

  let referenceRow: HTMLTableRowElement | null = null;
  let maxCellCount = 0;

  for (const row of Array.from(headSection.rows)) {
    const cellCount = row.cells.length;
    if (cellCount > maxCellCount) {
      maxCellCount = cellCount;
      referenceRow = row;
    }
  }

  return referenceRow;
}

/**
 * @param row — строка таблицы
 * @returns `true`, если строку не нужно выравнивать по колонкам
 */
export function shouldSkipTableBodyColumnSyncRow(row: HTMLTableRowElement): boolean {
  if (row.hasAttribute(DATA_GRID_EXPANDED_DETAIL_ROW_ATTRIBUTE)) {
    return true;
  }

  const firstCell = row.cells[0];
  if (row.cells.length === 1 && firstCell != null && firstCell.colSpan > 1) {
    return true;
  }

  return false;
}

/**
 * Все строки шапки, тела и подвала для выравнивания колонок.
 * @param tableElement — корневая `<table>`
 */
export function collectTableBodyColumnSyncRows(
  tableElement: HTMLTableElement,
): HTMLTableRowElement[] {
  const rows: HTMLTableRowElement[] = [];

  if (tableElement.tHead) {
    rows.push(...Array.from(tableElement.tHead.rows));
  }

  for (const bodySection of Array.from(tableElement.tBodies)) {
    rows.push(...Array.from(bodySection.rows));
  }

  if (tableElement.tFoot) {
    rows.push(...Array.from(tableElement.tFoot.rows));
  }

  return rows;
}

/**
 * Парсит inline-ширину ячейки (`150px` / `150`) в пиксели.
 * @param cell — `th` / `td`
 */
export function parseTableCellDeclaredWidthPx(cell: HTMLTableCellElement): number | null {
  const widthValue = cell.style.width?.trim();
  if (!widthValue) {
    return null;
  }

  if (widthValue.endsWith('px')) {
    const widthPixels = Number.parseFloat(widthValue);
    return Number.isFinite(widthPixels) ? widthPixels : null;
  }

  const widthPixels = Number.parseFloat(widthValue);
  return Number.isFinite(widthPixels) ? widthPixels : null;
}

/**
 * Ширины ячеек эталонной строки шапки (px).
 * @param referenceRow — ряд заголовков колонок
 * @param useNaturalColumnWidths — `true`: `max-content` и не меньше `style.width` колонки
 */
export function measureTableRowColumnWidthsPx(
  referenceRow: HTMLTableRowElement,
  useNaturalColumnWidths = false,
): number[] {
  if (!useNaturalColumnWidths) {
    return Array.from(referenceRow.cells).map((cell) => cell.getBoundingClientRect().width);
  }

  const previousRowWidth = referenceRow.style.width;
  referenceRow.style.width = 'max-content';

  const columnWidthsPx = Array.from(referenceRow.cells).map((cell) => {
    const declaredWidthPx = parseTableCellDeclaredWidthPx(cell);
    const layoutWidthPx = cell.getBoundingClientRect().width;
    return Math.max(declaredWidthPx ?? 0, layoutWidthPx);
  });

  if (previousRowWidth) {
    referenceRow.style.width = previousRowWidth;
  } else {
    referenceRow.style.removeProperty('width');
  }

  return columnWidthsPx;
}

/**
 * Сбрасывает inline-ширины, заданные синхронизацией колонок.
 * @param tableElement — корневая `<table>`
 */
export function clearTableBodyColumnWidthSync(tableElement: HTMLTableElement): void {
  const colgroupElement = tableElement.querySelector(':scope > colgroup');
  colgroupElement?.remove();
  tableElement.removeAttribute(PLAINER_SPLIT_TABLE_FILL_SCROLLPORT_ATTRIBUTE);

  for (const row of collectTableBodyColumnSyncRows(tableElement)) {
    row.style.removeProperty('width');

    for (const cell of Array.from(row.cells)) {
      for (const styleKey of tableBodyColumnWidthStyleKeys) {
        cell.style.removeProperty(styleKey);
      }
    }
  }
}

/**
 * Задаёт одинаковую ширину ячейкам по индексу колонки во всех строках (кроме пропущенных).
 * @param tableElement — корневая `<table>`
 * @param columnWidthsPx — ширины по порядку ячеек эталонной строки шапки
 */
export function applyTableBodyColumnWidthSync(
  tableElement: HTMLTableElement,
  columnWidthsPx: number[],
  lockColumnWidths = true,
): void {
  if (columnWidthsPx.length === 0) {
    return;
  }

  const totalRowWidthPx = columnWidthsPx.reduce(
    (accumulator, columnWidthPx) => accumulator + columnWidthPx,
    0,
  );
  const totalRowWidthCss = `${Math.round(totalRowWidthPx)}px`;

  for (const row of collectTableBodyColumnSyncRows(tableElement)) {
    if (shouldSkipTableBodyColumnSyncRow(row)) {
      continue;
    }

    Array.from(row.cells).forEach((cell, columnIndex) => {
      const columnWidthPx = columnWidthsPx[columnIndex];
      if (columnWidthPx == null || columnWidthPx <= 0) {
        return;
      }

      const columnWidthCss = `${Math.round(columnWidthPx)}px`;
      cell.style.width = columnWidthCss;
      cell.style.minWidth = columnWidthCss;
      if (lockColumnWidths) {
        cell.style.maxWidth = columnWidthCss;
      } else {
        cell.style.removeProperty('max-width');
      }
    });

    row.style.width = totalRowWidthCss;
  }
}

/** Допуск при сравнении ширин колонок (px). */
const TABLE_BODY_COLUMN_WIDTH_EQUALITY_TOLERANCE_PX = 1;

/**
 * Ширины колонок из `<colgroup>`, если синхронизация уже применялась.
 * @param tableElement — корневая `<table>`
 */
/**
 * @param tableElement — корневая `<table>`
 */
export function isSplitTableColumnSyncApplied(tableElement: HTMLTableElement): boolean {
  return (
    tableElement.querySelector(
      `:scope > colgroup[${PLAINER_SPLIT_TABLE_COLUMN_SYNC_ATTRIBUTE}]`,
    ) != null
  );
}

/**
 * @param tableElement — таблица split-layout
 */
export function isSplitTableFillScrollportApplied(tableElement: HTMLTableElement): boolean {
  return tableElement.hasAttribute(PLAINER_SPLIT_TABLE_FILL_SCROLLPORT_ATTRIBUTE);
}

/**
 * Нужно ли растянуть таблицу на всю ширину трека (нет лишней белой полосы справа).
 * @param bodyScrollTrackElement — трек со скроллом строк
 * @param totalRowWidthPx — сумма ширин колонок
 */
export function resolveSplitTableShouldFillScrollport(
  bodyScrollTrackElement: HTMLElement | null,
  totalRowWidthPx: number,
): boolean {
  if (!bodyScrollTrackElement || totalRowWidthPx <= 0) {
    return false;
  }

  return totalRowWidthPx < bodyScrollTrackElement.clientWidth - 1;
}

export function readTableColgroupColumnWidthsPx(tableElement: HTMLTableElement): number[] {
  const colElements = tableElement.querySelectorAll(':scope > colgroup > col');
  if (colElements.length === 0) {
    return [];
  }

  return Array.from(colElements).map((colElement) => {
    const widthPixels = parseTableCellDeclaredWidthPx(colElement as unknown as HTMLTableCellElement);
    return widthPixels ?? 0;
  });
}

/**
 * Текущие inline-ширины эталонной строки шапки.
 * @param tableElement — таблица с `thead`
 */
export function readTableHeaderReferenceRowColumnWidthsPx(
  tableElement: HTMLTableElement,
): number[] {
  const referenceRow = findTableBodyColumnSyncReferenceRow(tableElement);
  if (!referenceRow) {
    return [];
  }

  return Array.from(referenceRow.cells).map((cell) => parseTableCellDeclaredWidthPx(cell) ?? 0);
}

/**
 * @param leftWidthsPx — первый набор ширин
 * @param rightWidthsPx — второй набор ширин
 */
export function areTableBodyColumnWidthsEqual(
  leftWidthsPx: number[],
  rightWidthsPx: number[],
): boolean {
  if (leftWidthsPx.length !== rightWidthsPx.length || leftWidthsPx.length === 0) {
    return false;
  }

  return leftWidthsPx.every(
    (leftWidthPx, columnIndex) =>
      Math.abs(leftWidthPx - (rightWidthsPx[columnIndex] ?? 0)) <=
      TABLE_BODY_COLUMN_WIDTH_EQUALITY_TOLERANCE_PX,
  );
}

/**
 * Первая строка данных в `tbody` (без строки-детали).
 * @param bodyTableElement — таблица с `tbody`
 */
export function findFirstTableBodyDataRow(
  bodyTableElement: HTMLTableElement,
): HTMLTableRowElement | null {
  const bodySection = bodyTableElement.tBodies[0];
  if (!bodySection) {
    return null;
  }

  for (const row of Array.from(bodySection.rows)) {
    if (!shouldSkipTableBodyColumnSyncRow(row)) {
      return row;
    }
  }

  return null;
}

/**
 * Ширины колонок для split-layout: max по шапке и первой строке тела + declared width.
 * @param headerTableElement — таблица шапки
 * @param bodyTableElement — таблица тела
 * @param useNaturalColumnWidths — опираться на заявленные и content widths
 */
export function measureSplitTableColumnWidthsPx(
  headerTableElement: HTMLTableElement,
  bodyTableElement: HTMLTableElement,
  useNaturalColumnWidths: boolean,
): number[] {
  const headerRow = findTableBodyColumnSyncReferenceRow(headerTableElement);
  if (!headerRow) {
    return [];
  }

  const bodyRow = findFirstTableBodyDataRow(bodyTableElement);
  const columnCount = Math.max(headerRow.cells.length, bodyRow?.cells.length ?? 0);

  return Array.from({ length: columnCount }, (_, columnIndex) => {
    const headerCell = headerRow.cells[columnIndex];
    const bodyCell = bodyRow?.cells[columnIndex];

    const declaredWidthPx = Math.max(
      headerCell != null ? parseTableCellDeclaredWidthPx(headerCell) ?? 0 : 0,
      bodyCell != null ? parseTableCellDeclaredWidthPx(bodyCell) ?? 0 : 0,
    );

    if (useNaturalColumnWidths && declaredWidthPx > 0) {
      return declaredWidthPx;
    }

    const headerLayoutWidthPx = headerCell?.getBoundingClientRect().width ?? 0;
    const bodyLayoutWidthPx = bodyCell?.getBoundingClientRect().width ?? 0;

    if (useNaturalColumnWidths) {
      return Math.max(headerLayoutWidthPx, bodyLayoutWidthPx, declaredWidthPx);
    }

    if (headerCell != null) {
      return headerLayoutWidthPx;
    }

    return bodyLayoutWidthPx;
  });
}

/**
 * Задаёт `<colgroup>` с фиксированными ширинами колонок.
 * @param tableElement — корневая `<table>`
 * @param columnWidthsPx — ширины колонок в px
 */
export function applyTableColgroupColumnWidths(
  tableElement: HTMLTableElement,
  columnWidthsPx: number[],
): void {
  let colgroupElement = tableElement.querySelector(':scope > colgroup');
  if (colgroupElement?.tagName !== 'COLGROUP') {
    colgroupElement = document.createElement('colgroup');
    const firstElementChild = tableElement.firstElementChild;
    if (firstElementChild) {
      tableElement.insertBefore(colgroupElement, firstElementChild);
    } else {
      tableElement.appendChild(colgroupElement);
    }
  }

  const colgroup = colgroupElement;
  colgroup.setAttribute(PLAINER_SPLIT_TABLE_COLUMN_SYNC_ATTRIBUTE, 'true');
  while (colgroup.firstChild) {
    colgroup.removeChild(colgroup.firstChild);
  }

  columnWidthsPx.forEach((columnWidthPx) => {
    const colElement = document.createElement('col');
    if (columnWidthPx > 0) {
      colElement.style.width = `${Math.round(columnWidthPx)}px`;
    }
    colgroup.appendChild(colElement);
  });
}

/**
 * Измеряет шапку и выравнивает ширины колонок во всех строках.
 * @param tableElement — корневая `<table>`
 * @param useNaturalColumnWidths — не сжимать колонки под ширину viewport (горизонтальный скролл)
 */
export function syncTableBodyColumnWidths(
  tableElement: HTMLTableElement,
  useNaturalColumnWidths = false,
): void {
  const referenceRow = findTableBodyColumnSyncReferenceRow(tableElement);
  if (!referenceRow) {
    return;
  }

  const columnWidthsPx = measureTableRowColumnWidthsPx(referenceRow, useNaturalColumnWidths);
  applyTableBodyColumnWidthSync(tableElement, columnWidthsPx, !useNaturalColumnWidths);
}

/**
 * Выравнивает колонки в split-layout (отдельные таблицы шапки и тела).
 * @param headerTableElement — таблица с `thead`
 * @param bodyTableElement — таблица с `tbody`
 * @param useNaturalColumnWidths — ширины для горизонтального скролла
 */
export function syncSplitTableColumnWidths(
  headerTableElement: HTMLTableElement,
  bodyTableElement: HTMLTableElement,
  useNaturalColumnWidths: boolean,
  bodyScrollTrackElement: HTMLElement | null = null,
): void {
  const columnWidthsPx = measureSplitTableColumnWidthsPx(
    headerTableElement,
    bodyTableElement,
    useNaturalColumnWidths,
  );

  if (columnWidthsPx.length === 0) {
    return;
  }

  const totalRowWidthPx = columnWidthsPx.reduce(
    (accumulator, columnWidthPx) => accumulator + columnWidthPx,
    0,
  );
  const fillsScrollport = resolveSplitTableShouldFillScrollport(
    bodyScrollTrackElement,
    totalRowWidthPx,
  );

  const currentColumnWidthsPx = readTableHeaderReferenceRowColumnWidthsPx(headerTableElement);
  if (
    isSplitTableColumnSyncApplied(headerTableElement) &&
    isSplitTableColumnSyncApplied(bodyTableElement) &&
    areTableBodyColumnWidthsEqual(currentColumnWidthsPx, columnWidthsPx) &&
    isSplitTableFillScrollportApplied(headerTableElement) === fillsScrollport
  ) {
    return;
  }

  const lockColumnWidths = !fillsScrollport;
  applyTableColgroupColumnWidths(headerTableElement, columnWidthsPx);
  applyTableColgroupColumnWidths(bodyTableElement, columnWidthsPx);
  applyTableBodyColumnWidthSync(headerTableElement, columnWidthsPx, lockColumnWidths);
  applyTableBodyColumnWidthSync(bodyTableElement, columnWidthsPx, lockColumnWidths);

  if (fillsScrollport) {
    for (const tableElement of [headerTableElement, bodyTableElement]) {
      tableElement.style.width = '100%';
      tableElement.setAttribute(PLAINER_SPLIT_TABLE_FILL_SCROLLPORT_ATTRIBUTE, 'true');

      for (const row of collectTableBodyColumnSyncRows(tableElement)) {
        if (shouldSkipTableBodyColumnSyncRow(row)) {
          continue;
        }
        row.style.width = '100%';
      }
    }
    return;
  }

  headerTableElement.removeAttribute(PLAINER_SPLIT_TABLE_FILL_SCROLLPORT_ATTRIBUTE);
  bodyTableElement.removeAttribute(PLAINER_SPLIT_TABLE_FILL_SCROLLPORT_ATTRIBUTE);
  const totalRowWidthCss = `${Math.round(totalRowWidthPx)}px`;
  headerTableElement.style.width = totalRowWidthCss;
  bodyTableElement.style.width = totalRowWidthCss;
}
