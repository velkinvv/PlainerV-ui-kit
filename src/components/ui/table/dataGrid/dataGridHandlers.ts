import type { DataGridBaseRow, DataGridPaginationModel, TableSize } from '@/types/ui';
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
