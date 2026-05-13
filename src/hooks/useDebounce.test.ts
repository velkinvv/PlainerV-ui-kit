import { renderHook, act } from '@testing-library/react';
import { useDebounce, useDebounceCallback } from './useDebounce';

// Мокаем таймеры
jest.useFakeTimers();

describe('useDebounce', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  it('возвращает начальное значение сразу', () => {
    const { result } = renderHook(() => useDebounce('test', 500));

    expect(result.current).toBe('test');
  });

  it('обновляет значение после задержки', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'test', delay: 500 },
    });

    expect(result.current).toBe('test');

    act(() => {
      rerender({ value: 'new value', delay: 500 });
    });

    // Значение еще не обновилось
    expect(result.current).toBe('test');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('new value');
  });

  it('отменяет предыдущее обновление при новом изменении', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'test', delay: 500 },
    });

    act(() => {
      rerender({ value: 'value1', delay: 500 });
    });

    act(() => {
      jest.advanceTimersByTime(250);
    });

    act(() => {
      rerender({ value: 'value2', delay: 500 });
    });

    act(() => {
      jest.advanceTimersByTime(250);
    });

    // value1 не должно быть применено
    expect(result.current).toBe('test');

    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Теперь должно быть value2
    expect(result.current).toBe('value2');
  });
});

describe('useDebounceCallback', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  it('вызывает callback после задержки', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounceCallback(callback, 500));

    act(() => {
      result.current();
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
