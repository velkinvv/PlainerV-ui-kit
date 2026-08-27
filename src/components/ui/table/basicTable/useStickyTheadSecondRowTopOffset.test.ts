import { createRef } from 'react';
import { renderHook } from '@testing-library/react';
import { DEFAULT_STICKY_THEAD_SECOND_ROW_OFFSET } from './tableRowDividerHandlers';
import { useStickyTheadSecondRowTopOffset } from './useStickyTheadSecondRowTopOffset';

describe('useStickyTheadSecondRowTopOffset', () => {
  it('без включения оставляет запасной отступ', () => {
    const firstHeadRowRef = createRef<HTMLTableRowElement>();
    const { result } = renderHook(() =>
      useStickyTheadSecondRowTopOffset({
        enabled: false,
        firstHeadRowRef,
      }),
    );

    expect(result.current).toBe(DEFAULT_STICKY_THEAD_SECOND_ROW_OFFSET);
  });

  it('после измерения высоты первой строки thead ставит её в CSS-отступ', () => {
    const rowElement = document.createElement('tr');
    document.body.appendChild(rowElement);
    rowElement.getBoundingClientRect = () =>
      ({
        x: 0,
        y: 0,
        left: 0,
        top: 0,
        right: 100,
        bottom: 41,
        width: 100,
        height: 41,
        toJSON: () => ({}),
      }) as DOMRect;

    const firstHeadRowRef = { current: rowElement };
    const { result } = renderHook(() =>
      useStickyTheadSecondRowTopOffset({
        enabled: true,
        firstHeadRowRef,
      }),
    );

    expect(result.current).toBe('41px');
    rowElement.remove();
  });
});
