import { createRef } from 'react';
import { renderHook } from '@testing-library/react';
import { useFloatingOverlayPosition } from './useFloatingOverlayPosition';

describe('useFloatingOverlayPosition', () => {
  it('не готов к показу, пока панель закрыта', () => {
    const anchorRef = createRef<HTMLElement>();
    const overlayRef = createRef<HTMLElement>();
    const { result } = renderHook(() =>
      useFloatingOverlayPosition({
        isOpen: false,
        anchorRef,
        overlayRef,
      }),
    );

    expect(result.current.isPositionReady).toBe(false);
    expect(result.current.position).toEqual({ x: 0, y: 0 });
  });

  it('после открытия измеряет координаты якоря и помечает позицию готовой', () => {
    const anchorElement = document.createElement('div');
    document.body.appendChild(anchorElement);
    anchorElement.getBoundingClientRect = () =>
      ({
        x: 40,
        y: 80,
        left: 40,
        top: 80,
        right: 140,
        bottom: 120,
        width: 100,
        height: 40,
        toJSON: () => ({}),
      }) as DOMRect;

    const overlayElement = document.createElement('div');
    document.body.appendChild(overlayElement);
    overlayElement.getBoundingClientRect = () =>
      ({
        x: 0,
        y: 0,
        left: 0,
        top: 0,
        right: 200,
        bottom: 100,
        width: 200,
        height: 100,
        toJSON: () => ({}),
      }) as DOMRect;

    const anchorRef = { current: anchorElement };
    const overlayRef = { current: overlayElement };

    const { result } = renderHook(() =>
      useFloatingOverlayPosition({
        isOpen: true,
        anchorRef,
        overlayRef,
      }),
    );

    expect(result.current.isPositionReady).toBe(true);
    expect(result.current.position.x).toBe(40);
    expect(result.current.position.y).toBeGreaterThanOrEqual(120);

    anchorElement.remove();
    overlayElement.remove();
  });
});
