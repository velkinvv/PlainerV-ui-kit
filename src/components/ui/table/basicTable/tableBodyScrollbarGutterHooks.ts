import { useLayoutEffect, type RefObject } from 'react';
import {
  measureElementScrollbarGutterWidth,
  PLAINER_TABLE_BODY_SCROLLBAR_GUTTER_CSS_VAR,
} from './tableBodyScrollHandlers';

/**
 * Синхронизирует ширину колонок шапки и тела: у `thead` отступ справа = ширина скроллбара у `tbody`.
 * @param tableRef — ref корневой `<table>`
 * @param enabled — режим скролла только у `tbody`
 */
export function useTableBodyScrollbarGutterSync(
  tableRef: RefObject<HTMLTableElement | null>,
  enabled: boolean,
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

    const applyScrollbarGutter = (): void => {
      const gutterPixels = measureElementScrollbarGutterWidth(bodyElement);
      tableElement.style.setProperty(
        PLAINER_TABLE_BODY_SCROLLBAR_GUTTER_CSS_VAR,
        `${gutterPixels}px`,
      );
    };

    const scheduleScrollbarGutterUpdate = (): void => {
      requestAnimationFrame(() => {
        applyScrollbarGutter();
      });
    };

    scheduleScrollbarGutterUpdate();

    const resizeObserver = new ResizeObserver(scheduleScrollbarGutterUpdate);
    resizeObserver.observe(bodyElement);
    resizeObserver.observe(tableElement);

    const mutationObserver = new MutationObserver(scheduleScrollbarGutterUpdate);
    mutationObserver.observe(bodyElement, { childList: true, subtree: true });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      tableElement.style.removeProperty(PLAINER_TABLE_BODY_SCROLLBAR_GUTTER_CSS_VAR);
    };
  }, [enabled, tableRef]);
}
