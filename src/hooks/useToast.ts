import { useState, useCallback, useRef, useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  duration?: number;
  isVisible: boolean;
}

export interface UseToastReturn {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType, title?: string, duration?: number) => void;
  hideToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const showToast = useCallback(
    (message: string, type: ToastType = 'info', title?: string, duration: number = 5000) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast: Toast = {
        id,
        type,
        message,
        title,
        duration,
        isVisible: true,
      };

      setToasts(prev => [...prev, newToast]);

      // Автоматическое скрытие
      if (duration > 0) {
        const timeout = setTimeout(() => {
          hideToast(id);
        }, duration);
        timeoutRefs.current.set(id, timeout);
      }
    },
    [hideToast],
  );

  const hideToast = useCallback((id: string) => {
    // Очищаем timeout
    const timeout = timeoutRefs.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutRefs.current.delete(id);
    }

    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    // Очищаем все timeouts
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current.clear();
    setToasts([]);
  }, []);

  // Очистка при размонтировании
  useEffect(() => {
    const currentTimeouts = timeoutRefs.current;
    return () => {
      currentTimeouts.forEach(timeout => clearTimeout(timeout));
      currentTimeouts.clear();
    };
  }, []);

  return {
    toasts,
    showToast,
    hideToast,
    clearToasts,
  };
};
