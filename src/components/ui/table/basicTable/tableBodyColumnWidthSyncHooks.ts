import { useLayoutEffect, type RefObject } from 'react';
import {
  clearTableBodyColumnWidthSync,
  syncTableBodyColumnWidths,
} from './tableBodyColumnWidthHandlers';

/**
 * Выравнивает ширины колонок при `tbody` со скроллом (`display: block` + `tr` как отдельные таблицы).
 * @param tableRef — ref корневой `<table>`
 * @param enabled — режим скролла только у `tbody`
 * @param useNaturalColumnWidths — ширины для горизонтального скролла (не сжимать под viewport)
 */
export function useTableBodyColumnWidthSync(
  tableRef: RefObject<HTMLTableElement | null>,
  enabled: boolean,
  useNaturalColumnWidths = false,
): void {
  useLayoutEffect(() => {
    const tableElement = tableRef.current;
    if (!enabled || !tableElement) {
      return undefined;
    }

    const bodyElement = tableElement.tBodies[0] ?? tableElement.querySelector('tbody');
    if (!(bodyElement instanceof HTMLElement)) {
      return undefined;
    }

    const scheduleColumnWidthSync = (): void => {
      requestAnimationFrame(() => {
        syncTableBodyColumnWidths(tableElement, useNaturalColumnWidths);
      });
    };

    scheduleColumnWidthSync();

    const resizeObserver = new ResizeObserver(scheduleColumnWidthSync);
    resizeObserver.observe(bodyElement);
    resizeObserver.observe(tableElement);

    const headSection = tableElement.tHead;
    if (headSection instanceof HTMLElement) {
      resizeObserver.observe(headSection);
    }

    const mutationObserver = new MutationObserver(scheduleColumnWidthSync);
    mutationObserver.observe(bodyElement, { childList: true, subtree: true });
    if (headSection instanceof HTMLElement) {
      mutationObserver.observe(headSection, { childList: true, subtree: true });
    }

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      clearTableBodyColumnWidthSync(tableElement);
    };
  }, [enabled, tableRef, useNaturalColumnWidths]);
}
