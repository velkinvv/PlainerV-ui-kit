import type { DragEvent } from 'react';
import type {
  DataGridBaseRow,
  DataGridExpandedRowDataStatus,
  DataGridPaginationModel,
  TableSize,
} from '@/types/ui';
import { Size } from '@/types/sizes';

/**
 * ╨б╨╛╨┐╨╛╤Б╤В╨░╨▓╨╗╨╡╨╜╨╕╨╡ ╤А╨░╨╖╨╝╨╡╤А╨░ ╨┤╨╕╨╖╨░╨╣╨╜-╤Б╨╕╤Б╤В╨╡╨╝╤Л ╤Б ╨┐╨╗╨╛╤В╨╜╨╛╤Б╤В╤М╤О ╨┐╤А╨╕╨╝╨╕╤В╨╕╨▓╨░ `Table`.
 * @param size - `Size` ╨╕╨╖ ╨┤╨╕╨╖╨░╨╣╨╜-╤Б╨╕╤Б╤В╨╡╨╝╤Л
 */
export function dataGridSizeToTableSize(size: Size | undefined): TableSize {
  switch (size) {
    case Size.XS:
    case Size.SM:
      return 'sm';
    case Size.LG:
    case Size.XL:
    case Size.MD:
    default:
      return 'md';
  }
}

/**
 * ╨б╤А╨╡╨╖ ╤Б╤В╤А╨╛╨║ ╨┤╨╗╤П ╨║╨╗╨╕╨╡╨╜╤В╤Б╨║╨╛╨╣ ╨┐╨░╨│╨╕╨╜╨░╤Ж╨╕╨╕.
 * @param rows - ╨Я╨╛╨╗╨╜╤Л╨╣ ╨╝╨░╤Б╤Б╨╕╨▓ ╤Б╤В╤А╨╛╨║
 * @param model - ╨в╨╡╨║╤Г╤Й╨░╤П ╤Б╤В╤А╨░╨╜╨╕╤Ж╨░ ╨╕ ╤А╨░╨╖╨╝╨╡╤А (╤Б╤В╤А╨░╨╜╨╕╤Ж╨░ ╤Б ╨╜╤Г╨╗╤П)
 */
export function sliceRowsForPagination<Row extends DataGridBaseRow>(
  rows: readonly Row[],
  model: DataGridPaginationModel,
): Row[] {
  const page = Math.max(0, model.page);
  const pageSize = Math.max(1, model.pageSize);
  const start = page * pageSize;
  return rows.slice(start, start + pageSize);
}

/**
 * ╨Ч╨╜╨░╤З╨╡╨╜╨╕╨╡ ╤П╤З╨╡╨╣╨║╨╕ ╨┐╨╛ ╨┐╨╛╨╗╤О; ╨┐╨╛╨┤╨┤╨╡╤А╨╢╨╕╨▓╨░╨╡╤В ╨║╨╗╤О╤З╨╕ ╤Б ╤В╨╛╤З╨║╨╛╨╣ (`user.name`).
 * @param row - ╨Ю╨▒╤К╨╡╨║╤В ╤Б╤В╤А╨╛╨║╨╕
 * @param field - ╨Ъ╨╗╤О╤З ╨╕╨╗╨╕ ╨┐╤Г╤В╤М ╤З╨╡╤А╨╡╨╖ `.`
 */
export function getDataGridCellValue<Row extends DataGridBaseRow>(row: Row, field: keyof Row | string): unknown {
  const key = String(field);
  if (!key.includes('.')) {
    return row[key as keyof Row];
  }
  const parts = key.split('.');
  let cur: unknown = row;
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') {
      return undefined;
    }
    cur = (cur as Record<string, unknown>)[p];
  }
  return cur;
}

/**
 * ╨Я╨╡╤А╨╡╤Б╤В╨░╨▓╨╗╤П╨╡╤В ╤Н╨╗╨╡╨╝╨╡╨╜╤В ╨╝╨░╤Б╤Б╨╕╨▓╨░ ╤Б ╨╕╨╜╨┤╨╡╨║╤Б╨░ `from` ╨╜╨░ `to`.
 * @param list - ╨Ш╤Б╤Е╨╛╨┤╨╜╤Л╨╣ ╤Г╨┐╨╛╤А╤П╨┤╨╛╤З╨╡╨╜╨╜╤Л╨╣ ╤Б╨┐╨╕╤Б╨╛╨║
 * @param from - ╨Ш╨╜╨┤╨╡╨║╤Б ╨┐╨╡╤А╨╡╤В╨░╤Б╨║╨╕╨▓╨░╨╡╨╝╨╛╨│╨╛ ╤Н╨╗╨╡╨╝╨╡╨╜╤В╨░
 * @param to - ╨ж╨╡╨╗╨╡╨▓╨╛╨╣ ╨╕╨╜╨┤╨╡╨║╤Б
 */
export function reorderByIndex<T>(list: readonly T[], from: number, to: number): T[] {
  const arr = [...list];
  const f = Math.max(0, Math.min(arr.length - 1, from));
  const t = Math.max(0, Math.min(arr.length - 1, to));
  if (f === t) {
    return arr;
  }
  const [item] = arr.splice(f, 1);
  arr.splice(t, 0, item);
  return arr;
}

/**
 * ╨Э╨╛╤А╨╝╨░╨╗╨╕╨╖╨░╤Ж╨╕╤П `selectedIds` / `disabledIds` ╨▓ `Set`.
 * @param ids - ╨Ь╨╜╨╛╨╢╨╡╤Б╤В╨▓╨╛ ╨╕╨╗╨╕ ╨╝╨░╤Б╤Б╨╕╨▓ id
 */
export function toIdSet(ids: ReadonlySet<string> | readonly string[] | undefined): Set<string> {
  if (!ids) {
    return new Set();
  }
  if (ids instanceof Set) {
    return new Set(ids);
  }
  return new Set(ids);
}

/**
 * Итоговый статус данных под раскрывающейся строкой: явный `getExpandedRowDataStatus` или флаг `getExpandedRowLoading`.
 * @param row — строка таблицы
 * @param options — фрагмент пропсов `DataGrid` (`getExpandedRowDataStatus`, `getExpandedRowLoading`)
 */
export function resolveDataGridExpandedRowDataStatus<Row extends DataGridBaseRow>(
  row: Row,
  options: {
    getExpandedRowDataStatus?: (row: Row) => DataGridExpandedRowDataStatus;
    getExpandedRowLoading?: (row: Row) => boolean;
  },
): DataGridExpandedRowDataStatus {
  if (options.getExpandedRowDataStatus) {
    return options.getExpandedRowDataStatus(row);
  }
  if (options.getExpandedRowLoading?.(row)) {
    return 'loading';
  }
  return 'ready';
}

/**
 * Превью HTML5 drag: «призрак» повторяет всю строку таблицы и следует за курсором (без этого видна только ручка).
 * Вызывать в `onDragStart` до `setState`, чтобы снимок строки был без стилей «перетаскивается».
 * @param event — `dragstart`, `currentTarget` — элемент внутри `tr` (например ручка)
 */
export function applyDataGridRowDragGhostPreview(event: DragEvent<HTMLElement>): void {
  const rowElement = event.currentTarget.closest('tr');
  if (!(rowElement instanceof HTMLElement)) {
    return;
  }
  const rect = rowElement.getBoundingClientRect();
  const offsetX = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
  const offsetY = Math.max(0, Math.min(event.clientY - rect.top, rect.height));
  event.dataTransfer.setDragImage(rowElement, offsetX, offsetY);
}

/** Запасная высота «слота» строки (px), если `offsetHeight` ещё не измерен */
export const DATA_GRID_ROW_DRAG_FALLBACK_HEIGHT_PX = 48;

/** Плавное смещение строк при предпросмотре порядка (inline style) */
export const DATA_GRID_ROW_DRAG_SHIFT_TRANSITION = 'transform 0.22s cubic-bezier(0.33, 1, 0.68, 1)';

/**
 * Вертикальное смещение строки при перетаскивании (предпросмотр вставки по `reorderByIndex`).
 * Перетаскиваемая строка (`rowIndex === from`) не смещается — у неё свой стиль «взята».
 * @param rowIndex — индекс строки в `visibleRows`
 * @param from — индекс перетаскиваемой строки или null
 * @param over — индекс строки под курсором (цель drop) или null
 * @param draggedRowHeightPx — высота перетаскиваемой `tr` (высота одного слота)
 */
export function getDataGridRowDragDisplacementPx(
  rowIndex: number,
  from: number | null,
  over: number | null,
  draggedRowHeightPx: number,
): number {
  if (from == null || over == null) {
    return 0;
  }
  const slotHeight =
    draggedRowHeightPx > 0 ? draggedRowHeightPx : DATA_GRID_ROW_DRAG_FALLBACK_HEIGHT_PX;
  if (from === over || slotHeight <= 0) {
    return 0;
  }
  if (rowIndex === from) {
    return 0;
  }
  if (from < over) {
    if (rowIndex > from && rowIndex <= over) {
      return -slotHeight;
    }
  } else if (from > over) {
    if (rowIndex >= over && rowIndex < from) {
      return slotHeight;
    }
  }
  return 0;
}

/** Запасная ширина «слота» колонки (px), если `offsetWidth` ячейки ещё не измерен */
export const DATA_GRID_COL_DRAG_FALLBACK_WIDTH_PX = 120;

/** Плавное горизонтальное смещение колонок при предпросмотре порядка */
export const DATA_GRID_COL_DRAG_SHIFT_TRANSITION = DATA_GRID_ROW_DRAG_SHIFT_TRANSITION;

/**
 * Горизонтальное смещение колонки при перетаскивании заголовка (та же логика, что у строк, но по оси X).
 * Индекс считается среди колонок данных (`columns`), без учёта служебных колонок слева.
 * @param columnIndex — индекс в массиве `columns`
 * @param from — индекс перетаскиваемой колонки или null
 * @param over — индекс колонки под курсором или null
 * @param draggedColumnWidthPx — ширина ячейки заголовка перетаскиваемой колонки
 */
export function getDataGridColDragDisplacementPx(
  columnIndex: number,
  from: number | null,
  over: number | null,
  draggedColumnWidthPx: number,
): number {
  if (from == null || over == null) {
    return 0;
  }
  const slotWidth =
    draggedColumnWidthPx > 0 ? draggedColumnWidthPx : DATA_GRID_COL_DRAG_FALLBACK_WIDTH_PX;
  if (from === over || slotWidth <= 0) {
    return 0;
  }
  if (columnIndex === from) {
    return 0;
  }
  if (from < over) {
    if (columnIndex > from && columnIndex <= over) {
      return -slotWidth;
    }
  } else if (from > over) {
    if (columnIndex >= over && columnIndex < from) {
      return slotWidth;
    }
  }
  return 0;
}

/**
 * Превью HTML5 drag колонки: «призрак» — ячейка заголовка (`th`), а не только текст.
 * @param event — `dragstart` с перетаскиваемой ячейки заголовка
 */
export function applyDataGridColDragGhostPreview(event: DragEvent<HTMLElement>): void {
  const cellElement = event.currentTarget;
  if (!(cellElement instanceof HTMLElement)) {
    return;
  }
  const rect = cellElement.getBoundingClientRect();
  const offsetX = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
  const offsetY = Math.max(0, Math.min(event.clientY - rect.top, rect.height));
  event.dataTransfer.setDragImage(cellElement, offsetX, offsetY);
}
