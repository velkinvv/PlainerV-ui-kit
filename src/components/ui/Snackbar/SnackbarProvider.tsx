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
import type {
  SnackbarItem,
  SnackbarContextValue,
  SnackbarProviderProps,
  ShowSnackbarOptions,
} from '@/types/ui';
import { Snackbar } from './Snackbar';
import { SnackbarStack } from './Snackbar.style';
import { createSnackbarId } from './handlers';

const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined);

/**
 * Доступ к API стека snackbar. Требует обёртки в `SnackbarProvider`.
 */
export const useSnackbar = (): SnackbarContextValue => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) {
    throw new Error('useSnackbar: оберните приложение в <SnackbarProvider>');
  }
  return ctx;
};

/**
 * Провайдер snackbar: компактные полосы у нижнего края, портал в `document.body`.
 * @param children - Приложение
 * @param placement - Выравнивание (`bottom-center` по умолчанию)
 */
export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
  placement = 'bottom-center',
}) => {
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);
  const snackbarsRef = useRef<SnackbarItem[]>([]);
  const timeoutRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    snackbarsRef.current = snackbars;
  }, [snackbars]);

  const hideSnackbar = useCallback((id: string) => {
    const existing = timeoutRefs.current.get(id);
    if (existing) {
      clearTimeout(existing);
      timeoutRefs.current.delete(id);
    }
    setSnackbars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const showSnackbar = useCallback(
    (message: string, options?: ShowSnackbarOptions) => {
      const duration = options?.duration ?? 4000;
      const id = createSnackbarId();
      const item: SnackbarItem = {
        id,
        message,
        duration,
        actionLabel: options?.actionLabel,
        onAction: options?.onAction,
      };
      setSnackbars((prev) => [...prev, item]);
      if (duration > 0) {
        const tid = setTimeout(() => {
          hideSnackbar(id);
        }, duration);
        timeoutRefs.current.set(id, tid);
      }
    },
    [hideSnackbar],
  );

  const clearSnackbars = useCallback(() => {
    timeoutRefs.current.forEach((t) => clearTimeout(t));
    timeoutRefs.current.clear();
    setSnackbars([]);
  }, []);

  const handleActionClick = useCallback(
    (id: string) => {
      snackbarsRef.current.find((s) => s.id === id)?.onAction?.();
      hideSnackbar(id);
    },
    [hideSnackbar],
  );

  useEffect(() => {
    const map = timeoutRefs.current;
    return () => {
      map.forEach((t) => clearTimeout(t));
      map.clear();
    };
  }, []);

  const value = useMemo(
    () => ({
      snackbars,
      showSnackbar,
      hideSnackbar,
      clearSnackbars,
    }),
    [snackbars, showSnackbar, hideSnackbar, clearSnackbars],
  );

  const stack =
    typeof document !== 'undefined'
      ? createPortal(
          <SnackbarStack role="region" aria-label="Сообщения внизу экрана" $placement={placement}>
            {snackbars.map((s) => (
              <Snackbar
                key={s.id}
                snackbar={s}
                onClose={hideSnackbar}
                onActionClick={handleActionClick}
              />
            ))}
          </SnackbarStack>,
          document.body,
        )
      : null;

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {stack}
    </SnackbarContext.Provider>
  );
};
