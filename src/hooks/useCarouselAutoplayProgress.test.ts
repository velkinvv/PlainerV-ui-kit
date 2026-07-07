import { renderHook } from '@testing-library/react';
import { useCarouselAutoplayProgress } from './useCarouselAutoplayProgress';

describe('useCarouselAutoplayProgress', () => {
  it('сбрасывает progressRatio при смене activeIndex', () => {
    const requestAnimationFrameSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation(() => 1);
    const cancelAnimationFrameSpy = jest
      .spyOn(window, 'cancelAnimationFrame')
      .mockImplementation(() => undefined);

    const { result, rerender } = renderHook(
      (hookParams) => useCarouselAutoplayProgress(hookParams),
      {
        initialProps: {
          autoplay: true,
          autoplayRunning: true,
          autoplayPaused: false,
          autoplayInterval: 1000,
          activeIndex: 0,
          reducedMotion: false,
        },
      },
    );

    expect(result.current.progressRatio).toBe(0);

    rerender({
      autoplay: true,
      autoplayRunning: true,
      autoplayPaused: false,
      autoplayInterval: 1000,
      activeIndex: 1,
      reducedMotion: false,
    });

    expect(result.current.progressRatio).toBe(0);

    requestAnimationFrameSpy.mockRestore();
    cancelAnimationFrameSpy.mockRestore();
  });
});
