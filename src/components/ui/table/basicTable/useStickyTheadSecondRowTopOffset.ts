import { useLayoutEffect, useState, type RefObject } from 'react';

import {
  DEFAULT_STICKY_THEAD_SECOND_ROW_OFFSET,
  formatStickyTheadSecondRowOffset,
} from './tableRowDividerHandlers';

export type UseStickyTheadSecondRowTopOffsetParameters = {
  /** Нужно ли смещать вторую строку `thead` (sticky + toolbar) */
  enabled: boolean;
  /** Первая строка шапки (`headerToolbar`) */
  firstHeadRowRef: RefObject<HTMLTableRowElement | null>;
};

/**
 * Смещение второй sticky-строки `thead` по фактической высоте первой строки, а не по магическим 48px.
 * @param parameters.enabled - измерять только при sticky-шапке и панели toolbar
 * @param parameters.firstHeadRowRef - ref строки `headerToolbar`
 */
export function useStickyTheadSecondRowTopOffset({
  enabled,
  firstHeadRowRef,
}: UseStickyTheadSecondRowTopOffsetParameters): string {
  const [offset, setOffset] = useState(DEFAULT_STICKY_THEAD_SECOND_ROW_OFFSET);

  useLayoutEffect(() => {
    if (!enabled) {
      setOffset(DEFAULT_STICKY_THEAD_SECOND_ROW_OFFSET);
      return;
    }

    const rowElement = firstHeadRowRef.current;
    if (!rowElement) {
      return;
    }

    const updateOffset = () => {
      setOffset(formatStickyTheadSecondRowOffset(rowElement.getBoundingClientRect().height));
    };

    updateOffset();

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      updateOffset();
    });
    resizeObserver.observe(rowElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [enabled, firstHeadRowRef]);

  return offset;
}
