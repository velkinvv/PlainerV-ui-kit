import { renderHook } from '@testing-library/react';
import { useCarouselFullscreenKeyboard } from './carouselFullscreenHandlers';

describe('useCarouselFullscreenKeyboard', () => {
  it('вызывает onClose по Escape', () => {
    const onClose = jest.fn();
    const onPrevious = jest.fn();
    const onNext = jest.fn();

    renderHook(() =>
      useCarouselFullscreenKeyboard({
        isOpen: true,
        onClose,
        onPrevious,
        onNext,
        ownerDocument: document,
      }),
    );

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('вызывает onPrevious и onNext по стрелкам', () => {
    const onClose = jest.fn();
    const onPrevious = jest.fn();
    const onNext = jest.fn();

    renderHook(() =>
      useCarouselFullscreenKeyboard({
        isOpen: true,
        onClose,
        onPrevious,
        onNext,
        ownerDocument: document,
      }),
    );

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
