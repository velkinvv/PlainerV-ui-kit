/** Реальный styled-components — иначе мок прокидывает `$*` в DOM */
jest.unmock('styled-components');

import React from 'react';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { ThemeProvider } from '../themes/ThemeProvider';
import { SnackbarProvider } from '../components/ui/Snackbar';
import { useSnackbar } from './useSnackbar';

jest.useFakeTimers();

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(ThemeProvider, null, React.createElement(SnackbarProvider, null, children));

describe('useSnackbar', () => {
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

  it('инициализируется с пустым массивом', () => {
    const { result } = renderHook(() => useSnackbar(), { wrapper });
    expect(result.current.snackbars).toEqual([]);
  });

  it('показывает snackbar', () => {
    const { result } = renderHook(() => useSnackbar(), { wrapper });
    act(() => {
      result.current.showSnackbar('Текст');
    });
    expect(result.current.snackbars).toHaveLength(1);
    expect(result.current.snackbars[0]?.message).toBe('Текст');
  });

  it('скрывает по таймеру', () => {
    const { result } = renderHook(() => useSnackbar(), { wrapper });
    act(() => {
      result.current.showSnackbar('X', { duration: 1000 });
    });
    expect(result.current.snackbars).toHaveLength(1);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.snackbars).toHaveLength(0);
  });

  it('скрывает вручную', () => {
    const { result } = renderHook(() => useSnackbar(), { wrapper });
    act(() => {
      result.current.showSnackbar('Y');
    });
    const id = result.current.snackbars[0]?.id;
    act(() => {
      if (id) result.current.hideSnackbar(id);
    });
    expect(result.current.snackbars).toHaveLength(0);
  });

  it('очищает все', () => {
    const { result } = renderHook(() => useSnackbar(), { wrapper });
    act(() => {
      result.current.showSnackbar('a');
      result.current.showSnackbar('b');
    });
    expect(result.current.snackbars).toHaveLength(2);
    act(() => {
      result.current.clearSnackbars();
    });
    expect(result.current.snackbars).toHaveLength(0);
  });

  it('вызывает onAction при клике по кнопке действия и закрывает', () => {
    const onAction = jest.fn();
    const Trigger = () => {
      const { showSnackbar } = useSnackbar();
      return (
        <button
          type="button"
          onClick={() => showSnackbar('Сообщение', { actionLabel: 'OK', onAction, duration: 0 })}
        >
          Показать
        </button>
      );
    };
    render(
      <ThemeProvider>
        <SnackbarProvider>
          <Trigger />
        </SnackbarProvider>
      </ThemeProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Показать' }));
    });
    expect(screen.getByText('Сообщение')).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    });
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Сообщение')).not.toBeInTheDocument();
  });
});
