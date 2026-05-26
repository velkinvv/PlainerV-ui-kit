import { useLayoutEffect, type RefObject } from 'react';
import {
  clearTableBodyColumnWidthSync,
  syncSplitTableColumnWidths,
} from './tableBodyColumnWidthHandlers';
import {
  measureElementScrollbarGutterWidth,
  PLAINER_TABLE_BODY_SCROLLBAR_GUTTER_CSS_VAR,
} from './tableBodyScrollHandlers';

/**
 * Отступ справа у шапки = ширина вертикального скроллбара у трека строк.
 * @param splitRootRef — корень split-layout
 * @param bodyTrackRef — трек со скроллом строк
 * @param enabled — включён split-scroll
 */
export function useTableSplitScrollbarGutterSync(
  splitRootRef: RefObject<HTMLElement | null>,
  bodyTrackRef: RefObject<HTMLElement | null>,
  enabled: boolean,
): void {
  useLayoutEffect(() => {
    const splitRootElement = splitRootRef.current;
    const bodyTrackElement = bodyTrackRef.current;
    if (!enabled || !splitRootElement || !bodyTrackElement) {
      return undefined;
    }

    const applyScrollbarGutter = (): void => {
      const gutterPixels = measureElementScrollbarGutterWidth(bodyTrackElement);
      splitRootElement.style.setProperty(
        PLAINER_TABLE_BODY_SCROLLBAR_GUTTER_CSS_VAR,
        `${gutterPixels}px`,
      );
    };

    const scheduleUpdate = (): void => {
      requestAnimationFrame(applyScrollbarGutter);
    };

    scheduleUpdate();

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(bodyTrackElement);

    return () => {
      resizeObserver.disconnect();
      splitRootElement.style.removeProperty(PLAINER_TABLE_BODY_SCROLLBAR_GUTTER_CSS_VAR);
    };
  }, [enabled, splitRootRef, bodyTrackRef]);
}

/**
 * Синхронизирует ширины колонок между таблицей шапки и таблицей тела.
 * @param headerTableRef — `<table>` только с `thead`
 * @param bodyTableRef — `<table>` только с `tbody`
 * @param enabled — включён split-scroll
 * @param useNaturalColumnWidths — не сжимать колонки под viewport
 */
export function useTableSplitColumnWidthSync(
  headerTableRef: RefObject<HTMLTableElement | null>,
  bodyTableRef: RefObject<HTMLTableElement | null>,
  bodyTrackRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  useNaturalColumnWidths: boolean,
): void {
  useLayoutEffect(() => {
    const headerTableElement = headerTableRef.current;
    const bodyTableElement = bodyTableRef.current;
    const bodyTrackElement = bodyTrackRef.current;
    if (!enabled || !headerTableElement || !bodyTableElement) {
      return undefined;
    }

    let syncFrameId = 0;
    let isColumnSyncRunning = false;

    const runColumnSync = (): void => {
      if (isColumnSyncRunning) {
        return;
      }

      isColumnSyncRunning = true;
      try {
        syncSplitTableColumnWidths(
          headerTableElement,
          bodyTableElement,
          useNaturalColumnWidths,
          bodyTrackElement,
        );
      } finally {
        isColumnSyncRunning = false;
      }
    };

    const scheduleSync = (): void => {
      if (syncFrameId !== 0) {
        cancelAnimationFrame(syncFrameId);
      }

      syncFrameId = requestAnimationFrame(() => {
        syncFrameId = requestAnimationFrame(() => {
          syncFrameId = 0;
          runColumnSync();
        });
      });
    };

    scheduleSync();

    const resizeObserver = new ResizeObserver(scheduleSync);
    if (bodyTrackElement) {
      resizeObserver.observe(bodyTrackElement);
    }

    const bodySection = bodyTableElement.tBodies[0];
    const mutationObserver = bodySection != null ? new MutationObserver(scheduleSync) : null;
    mutationObserver?.observe(bodySection, { childList: true });

    return () => {
      if (syncFrameId !== 0) {
        cancelAnimationFrame(syncFrameId);
      }
      resizeObserver.disconnect();
      mutationObserver?.disconnect();
      clearTableBodyColumnWidthSync(headerTableElement);
      clearTableBodyColumnWidthSync(bodyTableElement);
    };
  }, [enabled, headerTableRef, bodyTableRef, bodyTrackRef, useNaturalColumnWidths]);
}

/**
 * Горизонтальный скролл тела синхронизирует `scrollLeft` у обёртки заголовков колонок.
 * @param headerColumnsScrollRef — скрытый горизонтальный скролл только для строк заголовков
 * @param bodyScrollTrackRef — трек строк (вертикальный и горизонтальный скролл)
 * @param enabled — включён горизонтальный скролл
 */
export function useTableSplitHorizontalScrollSync(
  headerColumnsScrollRef: RefObject<HTMLElement | null>,
  bodyScrollTrackRef: RefObject<HTMLElement | null>,
  enabled: boolean,
): void {
  useLayoutEffect(() => {
    const headerColumnsScrollElement = headerColumnsScrollRef.current;
    const bodyScrollTrackElement = bodyScrollTrackRef.current;
    if (!enabled || !headerColumnsScrollElement || !bodyScrollTrackElement) {
      return undefined;
    }

    let isSyncingScroll = false;

    const syncHeaderScrollLeft = (): void => {
      if (isSyncingScroll) {
        return;
      }

      const nextScrollLeft = bodyScrollTrackElement.scrollLeft;
      if (headerColumnsScrollElement.scrollLeft === nextScrollLeft) {
        return;
      }

      isSyncingScroll = true;
      headerColumnsScrollElement.scrollLeft = nextScrollLeft;
      isSyncingScroll = false;
    };

    syncHeaderScrollLeft();
    bodyScrollTrackElement.addEventListener('scroll', syncHeaderScrollLeft, { passive: true });

    const resizeObserver = new ResizeObserver(syncHeaderScrollLeft);
    resizeObserver.observe(bodyScrollTrackElement);

    return () => {
      bodyScrollTrackElement.removeEventListener('scroll', syncHeaderScrollLeft);
      resizeObserver.disconnect();
      headerColumnsScrollElement.scrollLeft = 0;
    };
  }, [enabled, headerColumnsScrollRef, bodyScrollTrackRef]);
}
