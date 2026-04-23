/** Реальный styled-components: иначе мок в jest.setup прокидывает `$*` в DOM и сыпятся warning’и */
jest.unmock('styled-components');

import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { ThemeProvider } from '../themes/ThemeProvider';
import { ToastProvider } from '../components/ui/Toast';
import { useToast } from './useToast';
import { ToastAppearance } from '@/types/ui';

jest.useFakeTimers();

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(ThemeProvider, null, React.createElement(ToastProvider, null, children));

describe('useToast', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  it('инициализируется с пустым массивом toasts', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    expect(result.current.toasts).toEqual([]);
  });

  it('показывает toast', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.showToast('Тестовое сообщение', 'success');
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]?.message).toBe('Тестовое сообщение');
    expect(result.current.toasts[0]?.type).toBe('success');
  });

  it('скрывает toast автоматически', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

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
    const { result } = renderHook(() => useToast(), { wrapper });

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
    const { result } = renderHook(() => useToast(), { wrapper });

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
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.showToast('Успех', 'success');
      result.current.showToast('Ошибка', 'error');
      result.current.showToast('Предупреждение', 'warning');
      result.current.showToast('Информация', 'info');
      result.current.showToast('Нейтрально', 'neutral');
    });

    expect(result.current.toasts).toHaveLength(5);
    expect(result.current.toasts[0]?.type).toBe('success');
    expect(result.current.toasts[1]?.type).toBe('error');
    expect(result.current.toasts[2]?.type).toBe('warning');
    expect(result.current.toasts[3]?.type).toBe('info');
    expect(result.current.toasts[4]?.type).toBe('neutral');
  });

  it('принимает пятый аргумент options: внешний вид, действие', () => {
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.showToast('Текст', 'info', 'Заголовок', 0, {
        appearance: ToastAppearance.PILL,
        actionLabel: 'OK',
        onAction: () => {},
      });
    });

    const t = result.current.toasts[0];
    expect(t?.appearance).toBe(ToastAppearance.PILL);
    expect(t?.actionLabel).toBe('OK');
    expect(t?.onAction).toBeDefined();
  });
});
