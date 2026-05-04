import type { TableSortDirection } from '@/types/ui';

export { getTableSelectionAggregate, type TableSelectionAggregate } from '@/handlers/tableSelectionHandlers';

/** Тон шеврона сортировки (активный / приглушённый / нейтральный). */
export type TableSortChevronTone = 'active' | 'muted' | 'idle';

/**
 * Тона верхнего и нижнего шевронов по состоянию сортировки (макет Figma).
 * @param active - Колонка активна
 * @param direction - Направление или «без направления»
 */
export function getSortChevronTones(
  active: boolean,
  direction: TableSortDirection | false | undefined,
): { up: TableSortChevronTone; down: TableSortChevronTone } {
  if (!active) {
    return { up: 'idle', down: 'idle' };
  }
  if (direction === 'asc') {
    return { up: 'active', down: 'muted' };
  }
  if (direction === 'desc') {
    return { up: 'muted', down: 'active' };
  }
  return { up: 'idle', down: 'idle' };
}

/**
 * Цвет штриха шеврона сортировки по тону (макет: активный / приглушённый / нейтральный).
 * @param theme — тема с палитрой текста и границ
 * @param tone — результат `getSortChevronTones`
 */
export function getTableSortChevronColor(
  theme: { colors: { text: string; textTertiary: string; border: string } },
  tone: TableSortChevronTone,
): string {
  switch (tone) {
    case 'active':
      return theme.colors.text;
    case 'muted':
      return theme.colors.textTertiary;
    case 'idle':
    default:
      return theme.colors.border;
  }
}

/**
 * Число страниц при заданном количестве записей и размере страницы (для пагинации с нумерацией с нуля).
 * @param count - Всего записей (>= 0)
 * @param rowsPerPage - Записей на странице (> 0)
 */
export function getTableTotalPages(count: number, rowsPerPage: number): number {
  const safeRows = Math.max(1, rowsPerPage);
  const safeCount = Math.max(0, count);
  return Math.max(1, Math.ceil(safeCount / safeRows));
}

/**
 * Ограничивает индекс страницы с нуля допустимым диапазоном.
 * @param pageZeroBased - Страница с нуля
 * @param totalPages - Всего страниц (>= 1)
 */
export function clampTablePageZeroBased(pageZeroBased: number, totalPages: number): number {
  const pages = Math.max(1, totalPages);
  return Math.min(Math.max(0, pageZeroBased), pages - 1);
}

/**
 * Разбирает ввод «перейти к странице»: номер страницы с единицы в диапазоне 1…totalPages.
 * @param raw - Строка из поля ввода
 * @param totalPages - Всего страниц (>= 1)
 * @returns Индекс страницы с нуля или `null`, если строка пустая или не число
 */
export function parseTablePageJumpInput(raw: string, totalPages: number): number | null {
  const trimmed = raw.trim();
  if (trimmed === '') {
    return null;
  }
  const parsed = Number.parseInt(trimmed, 10);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  const pages = Math.max(1, totalPages);
  const oneBased = Math.min(Math.max(1, parsed), pages);
  return oneBased - 1;
}

/**
 * Переключает направление сортировки по клику на заголовок (asc ↔ desc), при первом выборе — asc.
 * @param prev - Предыдущее направление или `false`, если колонка не была активной
 */
export function toggleTableSortDirection(
  prev: TableSortDirection | false | undefined,
): TableSortDirection {
  if (prev === 'asc') {
    return 'desc';
  }
  return 'asc';
}
