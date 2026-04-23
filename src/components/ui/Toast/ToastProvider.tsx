import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import {
  ToastAppearance,
  type ToastItem,
  type ToastContextValue,
  type ToastProviderProps,
  type ToastType,
  type ShowToastOptions,
} from '@/types/ui';
import { Toast } from './Toast';
import { ToastStack } from './Toast.style';
import { createToastId } from './handlers';

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/**
 * Доступ к API стека уведомлений. Требует обёртки в `ToastProvider`.
 */
export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast: оберните приложение в <ToastProvider>');
  }
  return ctx;
};

/**
 * Провайдер стека toast: состояние, таймеры, портал с карточками в `document.body`.
 * @param children - Приложение
 * @param placement - Положение колонки (`top-right` по умолчанию)
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  placement = 'top-right',
  defaultAppearance = ToastAppearance.CARD,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timeoutRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const hideToast = useCallback((id: string) => {
    const existing = timeoutRefs.current.get(id);
    if (existing) {
      clearTimeout(existing);
      timeoutRefs.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (
      message: string,
      type: ToastType = 'info',
      title?: string,
      duration: number = 5000,
      options?: ShowToastOptions,
    ) => {
      const id = createToastId();
      const item: ToastItem = {
        id,
        type,
        message,
        title,
        duration,
        appearance: options?.appearance ?? defaultAppearance,
        actionLabel: options?.actionLabel,
        onAction: options?.onAction,
      };
      setToasts((prev) => [...prev, item]);
      if (duration > 0) {
        const tid = setTimeout(() => {
          hideToast(id);
        }, duration);
        timeoutRefs.current.set(id, tid);
      }
    },
    [hideToast, defaultAppearance],
  );

  const clearToasts = useCallback(() => {
    timeoutRefs.current.forEach((t) => clearTimeout(t));
    timeoutRefs.current.clear();
    setToasts([]);
  }, []);

  useEffect(() => {
    const map = timeoutRefs.current;
    return () => {
      map.forEach((t) => clearTimeout(t));
      map.clear();
    };
  }, []);

  const value = useMemo(
    () => ({
      toasts,
      showToast,
      hideToast,
      clearToasts,
    }),
    [toasts, showToast, hideToast, clearToasts],
  );

  const stack =
    typeof document !== 'undefined'
      ? createPortal(
          <ToastStack role="region" aria-label="Уведомления" $placement={placement}>
            {toasts.map((t) => (
              <Toast key={t.id} toast={t} onClose={hideToast} />
            ))}
          </ToastStack>,
          document.body,
        )
      : null;

  return (
    <ToastContext.Provider value={value}>
      {children}
      {stack}
    </ToastContext.Provider>
  );
};
