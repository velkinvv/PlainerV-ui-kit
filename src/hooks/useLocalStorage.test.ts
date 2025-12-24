import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

// Мокаем localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('инициализируется с initialValue', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    expect(result.current[0]).toBe('initial');
  });

  it('читает значение из localStorage', () => {
    localStorageMock.setItem('test-key', JSON.stringify('stored value'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    expect(result.current[0]).toBe('stored value');
  });

  it('сохраняет значение в localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('new value');
    expect(localStorageMock.getItem('test-key')).toBe(JSON.stringify('new value'));
  });

  it('обновляет значение функцией', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });

  it('удаляет значение из localStorage', () => {
    localStorageMock.setItem('test-key', JSON.stringify('value'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBe('initial');
    expect(localStorageMock.getItem('test-key')).toBeNull();
  });

  it('синхронизируется с изменениями в других вкладках', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      // Симулируем изменение в другой вкладке
      const event = new StorageEvent('storage', {
        key: 'test-key',
        newValue: JSON.stringify('updated from other tab'),
      });
      window.dispatchEvent(event);
    });

    expect(result.current[0]).toBe('updated from other tab');
  });
});
