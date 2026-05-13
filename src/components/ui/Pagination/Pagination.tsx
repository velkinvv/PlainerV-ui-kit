import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import type { PaginationProps } from '@/types/ui';
import { IconSize, Size } from '@/types/sizes';
import { Icon } from '../Icon/Icon';
import { buildPaginationSegments, getPaginationDimensions } from './handlers';
import {
  Ellipsis,
  PageButton,
  PaginationArrowButton,
  PaginationBar,
  PaginationCompactCurrent,
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
 * Пагинация: плашка с номерами и разрывами «…», по краям — контурные шевроны `PhosphorCaretLeft` / `PhosphorCaretRight` (макет Figma).
 * Режим `variant="compact"`: только «назад», текущая страница (без клика по номеру), «вперёд».
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
  variant = 'default',
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
    if (totalPages < 1 || variant === 'compact') {
      return [];
    }
    return buildPaginationSegments(totalPages, currentPage, siblingCount);
  }, [totalPages, currentPage, siblingCount, variant]);

  const dim = getPaginationDimensions(size);
  const iconSize = paginationSizeToIconSize(size);

  if (totalPages < 1) {
    return null;
  }

  return (
    <PaginationNav className={clsx(className)} aria-label={ariaLabel}>
      <PaginationBar>
        {showPrevNext ? (
          <PaginationArrowButton
            type="button"
            disabled={disabled || currentPage <= 1}
            aria-label="Предыдущая страница"
            $minW={dim.minWidth}
            $minH={dim.minHeight}
            $radius={dim.borderRadius}
            onClick={() => setPage(currentPage - 1)}
          >
            <Icon name="PhosphorCaretLeft" size={iconSize} color="currentColor" />
          </PaginationArrowButton>
        ) : null}

        <PaginationList $gap={dim.gap}>
          {variant === 'compact' ? (
            <PaginationListItem>
              <PaginationCompactCurrent
                aria-current="page"
                aria-label={`Текущая страница ${currentPage} из ${totalPages}`}
                $minW={dim.minWidth}
                $minH={dim.minHeight}
                $fontSize={dim.fontSize}
                $radius={dim.borderRadius}
              >
                {currentPage}
              </PaginationCompactCurrent>
            </PaginationListItem>
          ) : (
            segments.map((seg) => {
              if (seg.kind === 'gap') {
                return (
                  <PaginationListItem key={seg.id}>
                    <Ellipsis $minH={dim.minHeight} aria-hidden>
                      …
                    </Ellipsis>
                  </PaginationListItem>
                );
              }
              const isActive = seg.page === currentPage;
              return (
                <PaginationListItem key={seg.page}>
                  <PageButton
                    type="button"
                    disabled={disabled}
                    $disabled={disabled}
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
            })
          )}
        </PaginationList>

        {showPrevNext ? (
          <PaginationArrowButton
            type="button"
            disabled={disabled || currentPage >= totalPages}
            aria-label="Следующая страница"
            $minW={dim.minWidth}
            $minH={dim.minHeight}
            $radius={dim.borderRadius}
            onClick={() => setPage(currentPage + 1)}
          >
            <Icon name="PhosphorCaretRight" size={iconSize} color="currentColor" />
          </PaginationArrowButton>
        ) : null}
      </PaginationBar>
    </PaginationNav>
  );
};
