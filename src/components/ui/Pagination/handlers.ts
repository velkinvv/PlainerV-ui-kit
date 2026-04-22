import { Size } from '@/types/sizes';

/** Элемент списка: номер страницы или разрыв «…» */
export type PaginationSegment = { kind: 'page'; page: number } | { kind: 'gap'; id: string };

/**
 * Размеры кнопок страниц по размеру из дизайн-системы.
 * @param size - Размер из `Size`
 */
export function getPaginationDimensions(size: Size = Size.MD): {
  minWidth: string;
  minHeight: string;
  fontSize: string;
  gap: string;
  borderRadius: string;
} {
  switch (size) {
    case Size.XS:
      return {
        minWidth: '24px',
        minHeight: '24px',
        fontSize: '11px',
        gap: '2px',
        borderRadius: '4px',
      };
    case Size.SM:
      return {
        minWidth: '28px',
        minHeight: '28px',
        fontSize: '12px',
        gap: '4px',
        borderRadius: '6px',
      };
    case Size.LG:
      return {
        minWidth: '40px',
        minHeight: '40px',
        fontSize: '16px',
        gap: '8px',
        borderRadius: '8px',
      };
    case Size.XL:
      return {
        minWidth: '44px',
        minHeight: '44px',
        fontSize: '16px',
        gap: '8px',
        borderRadius: '8px',
      };
    case Size.MD:
    default:
      return {
        minWidth: '32px',
        minHeight: '32px',
        fontSize: '14px',
        gap: '6px',
        borderRadius: '8px',
      };
  }
}

/**
 * Строит последовательность страниц и разрывов «…» для отображения.
 * @param totalPages - Всего страниц (>= 1)
 * @param currentPage - Активная страница 1..totalPages
 * @param siblingCount - Соседи слева/справа от текущей (по умолчанию 1)
 */
export function buildPaginationSegments(
  totalPages: number,
  currentPage: number,
  siblingCount: number = 1,
): PaginationSegment[] {
  if (totalPages < 1) {
    return [];
  }
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const s = Math.max(0, siblingCount);

  const maxCompact = s * 2 + 5;
  if (totalPages <= maxCompact) {
    return Array.from({ length: totalPages }, (_, i) => ({
      kind: 'page' as const,
      page: i + 1,
    }));
  }

  const firstPage = 1;
  const lastPage = totalPages;
  const pages = new Set<number>();
  pages.add(firstPage);
  pages.add(lastPage);
  pages.add(safePage);
  for (let i = 1; i <= s; i++) {
    pages.add(Math.max(firstPage, safePage - i));
    pages.add(Math.min(lastPage, safePage + i));
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const out: PaginationSegment[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const p = sorted[i];
    const prev = sorted[i - 1];
    if (i > 0 && p != null && prev != null && p - prev > 1) {
      out.push({ kind: 'gap', id: `gap-${prev}-${p}` });
    }
    if (p != null) {
      out.push({ kind: 'page', page: p });
    }
  }
  return out;
}
