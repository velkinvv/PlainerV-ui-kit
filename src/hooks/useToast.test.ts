import { renderHook, act } from '@testing-library/react';
import { useToast } from './useToast';

// Мокаем таймеры
jest.useFakeTimers();

describe('useToast', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  it('инициализируется с пустым массивом toasts', () => {
    const { result } = renderHook(() => useToast());

    expect(result.current.toasts).toEqual([]);
  });

  it('показывает toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast('Тестовое сообщение', 'success');
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]?.message).toBe('Тестовое сообщение');
    expect(result.current.toasts[0]?.type).toBe('success');
  });

  it('скрывает toast автоматически', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast('Сообщение', 'info', undefined, 1000);
    });

    expect(result.current.toasts).toHaveLength(1);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('скрывает toast вручную', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast('Сообщение', 'info');
    });

    const toastId = result.current.toasts[0]?.id;
    expect(toastId).toBeDefined();

    act(() => {
      if (toastId) {
        result.current.hideToast(toastId);
      }
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('очищает все toasts', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast('Сообщение 1', 'info');
      result.current.showToast('Сообщение 2', 'success');
    });

    expect(result.current.toasts).toHaveLength(2);

    act(() => {
      result.current.clearToasts();
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('поддерживает разные типы toasts', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast('Успех', 'success');
      result.current.showToast('Ошибка', 'error');
      result.current.showToast('Предупреждение', 'warning');
      result.current.showToast('Информация', 'info');
    });

    expect(result.current.toasts).toHaveLength(4);
    expect(result.current.toasts[0]?.type).toBe('success');
    expect(result.current.toasts[1]?.type).toBe('error');
    expect(result.current.toasts[2]?.type).toBe('warning');
    expect(result.current.toasts[3]?.type).toBe('info');
  });
});
