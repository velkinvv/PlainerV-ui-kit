import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // Получаем значение из localStorage или используем initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      // console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Функция для установки значения
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Позволяем value быть функцией, чтобы у нас была та же API, что и у useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        // Сохраняем в state
        setStoredValue(valueToStore);

        // Сохраняем в localStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch {
        // console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  // Функция для удаления значения
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch {
      // console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Синхронизируем с изменениями в других вкладках
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch {
          // console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
}
