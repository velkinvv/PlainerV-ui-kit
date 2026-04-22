import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import type { PaginationProps } from '@/types/ui';
import { ButtonVariant } from '@/types/ui';
import { IconSize, Size } from '@/types/sizes';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../buttons/IconButton';
import { buildPaginationSegments, getPaginationDimensions } from './handlers';
import {
  Ellipsis,
  PageButton,
  PaginationList,
  PaginationListItem,
  PaginationNav,
} from './Pagination.style';

/**
 * Сопоставление размера пагинации и иконок стрелок.
 * @param size - Размер из `PaginationProps.size`
 */
function paginationSizeToIconSize(size: Size | undefined): IconSize {
  switch (size) {
    case Size.XS:
    case Size.SM:
      return IconSize.SM;
    case Size.LG:
    case Size.XL:
      return IconSize.MD;
    case Size.MD:
    default:
      return IconSize.SM;
  }
}

/**
 * Пагинация: номера страниц с разрывами «…», опционально «назад»/«вперёд».
 * Поддерживаются контролируемый (`page` + `onPageChange`) и неконтролируемый (`defaultPage`) режимы.
 * @param props - Пропсы `PaginationProps`.
 */
export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  page: pageProp,
  defaultPage = 1,
  onPageChange,
  siblingCount = 1,
  showPrevNext = true,
  size = Size.MD,
  disabled = false,
  ariaLabel = 'Пагинация',
  className,
}) => {
  const isControlled = pageProp !== undefined;
  const [internalPage, setInternalPage] = useState(() =>
    Math.min(Math.max(1, defaultPage), Math.max(1, totalPages)),
  );

  useEffect(() => {
    if (!isControlled && totalPages >= 1) {
      setInternalPage((p) => Math.min(Math.max(1, p), totalPages));
    }
  }, [totalPages, isControlled]);

  const currentPage = useMemo(() => {
    if (totalPages < 1) {
      return 1;
    }
    const raw = isControlled ? (pageProp ?? 1) : internalPage;
    return Math.min(Math.max(1, raw), totalPages);
  }, [totalPages, isControlled, pageProp, internalPage]);

  const setPage = useCallback(
    (next: number) => {
      if (totalPages < 1) {
        return;
      }
      const clamped = Math.min(Math.max(1, next), totalPages);
      if (!isControlled) {
        setInternalPage(clamped);
      }
      onPageChange?.(clamped);
    },
    [isControlled, onPageChange, totalPages],
  );

  const segments = useMemo(() => {
    if (totalPages < 1) {
      return [];
    }
    return buildPaginationSegments(totalPages, currentPage, siblingCount);
  }, [totalPages, currentPage, siblingCount]);

  const dim = getPaginationDimensions(size);
  const iconSize = paginationSizeToIconSize(size);
  const navGap = size === Size.XS || size === Size.SM ? '4px' : '8px';

  if (totalPages < 1) {
    return null;
  }

  return (
    <PaginationNav className={clsx(className)} aria-label={ariaLabel} $gap={navGap}>
      {showPrevNext ? (
        <IconButton
          type="button"
          variant={ButtonVariant.GHOST}
          size={size}
          disabled={disabled || currentPage <= 1}
          aria-label="Предыдущая страница"
          icon={<Icon name="PhosphorArrowCircleLeft" size={iconSize} />}
          onClick={() => setPage(currentPage - 1)}
        />
      ) : null}

      <PaginationList $gap={dim.gap}>
        {segments.map((seg) => {
          if (seg.kind === 'gap') {
            return (
              <PaginationListItem key={seg.id}>
                <Ellipsis aria-hidden>…</Ellipsis>
              </PaginationListItem>
            );
          }
          const isActive = seg.page === currentPage;
          return (
            <PaginationListItem key={seg.page}>
              <PageButton
                type="button"
                disabled={disabled}
                $dim={disabled}
                $active={isActive}
                $minW={dim.minWidth}
                $minH={dim.minHeight}
                $fontSize={dim.fontSize}
                $radius={dim.borderRadius}
                aria-label={`Страница ${seg.page}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => {
                  if (!isActive && !disabled) {
                    setPage(seg.page);
                  }
                }}
              >
                {seg.page}
              </PageButton>
            </PaginationListItem>
          );
        })}
      </PaginationList>

      {showPrevNext ? (
        <IconButton
          type="button"
          variant={ButtonVariant.GHOST}
          size={size}
          disabled={disabled || currentPage >= totalPages}
          aria-label="Следующая страница"
          icon={<Icon name="PhosphorArrowCircleRight" size={iconSize} />}
          onClick={() => setPage(currentPage + 1)}
        />
      ) : null}
    </PaginationNav>
  );
};
