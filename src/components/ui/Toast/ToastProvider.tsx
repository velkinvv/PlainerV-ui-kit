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
import { AnimatePresence, motion } from 'framer-motion';
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
  defaultAppearance = ToastAppearance.PILL,
  limit = 0,
  newestOnTop = true,
  stacked = false,
  pauseOnHover = true,
  pauseOnFocusLoss = true,
  closeOnClick = false,
  showProgressBar = true,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [timingByToastId, setTimingByToastId] = useState<
    Record<
      string,
      {
        duration: number;
        remaining: number;
        pauseOnHover: boolean;
        pauseOnFocusLoss: boolean;
        isHovered: boolean;
        isPausedByApi: boolean;
      }
    >
  >({});
  const toastsRef = useRef<ToastItem[]>([]);
  const windowHasFocusRef = useRef(true);

  useEffect(() => {
    toastsRef.current = toasts;
  }, [toasts]);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    setTimingByToastId((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const applyToastLimit = useCallback(
    (nextToasts: ToastItem[]) => {
      if (limit <= 0) {
        return nextToasts;
      }
      return newestOnTop ? nextToasts.slice(0, limit) : nextToasts.slice(-limit);
    },
    [limit, newestOnTop],
  );

  const showToast = useCallback(
    (
      message: string,
      type: ToastType = 'info',
      title?: string,
      duration: number = 5000,
      options?: ShowToastOptions,
    ) => {
      const id = options?.toastId ?? createToastId();
      const preventDuplicate = options?.preventDuplicate ?? false;
      const dedupeStrategy = options?.dedupeStrategy ?? 'both';
      if (preventDuplicate) {
        const hasDuplicateById = toastsRef.current.some((toastItem) => toastItem.id === id);
        const hasDuplicateByPayload = toastsRef.current.some(
          (toastItem) =>
            toastItem.message === message &&
            toastItem.type === type &&
            (toastItem.title ?? '') === (title ?? ''),
        );

        const shouldBlockDuplicate =
          dedupeStrategy === 'id'
            ? hasDuplicateById
            : dedupeStrategy === 'content'
              ? hasDuplicateByPayload
              : hasDuplicateById || hasDuplicateByPayload;

        if (shouldBlockDuplicate) {
          return;
        }
      }
      const resolvedPauseOnHover = options?.pauseOnHover ?? pauseOnHover;
      const resolvedPauseOnFocusLoss = options?.pauseOnFocusLoss ?? pauseOnFocusLoss;
      const resolvedCloseOnClick = options?.closeOnClick ?? closeOnClick;
      const resolvedShowProgressBar = options?.showProgressBar ?? showProgressBar;
      const item: ToastItem = {
        id,
        type,
        message,
        title,
        duration,
        appearance: options?.appearance ?? defaultAppearance,
        actionLabel: options?.actionLabel,
        onAction: options?.onAction,
        pauseOnHover: resolvedPauseOnHover,
        pauseOnFocusLoss: resolvedPauseOnFocusLoss,
        closeOnClick: resolvedCloseOnClick,
        showProgressBar: resolvedShowProgressBar,
      };
      setToasts((prev) => {
        const existingWithoutCurrent = prev.filter((toastItem) => toastItem.id !== id);
        const next = newestOnTop
          ? [item, ...existingWithoutCurrent]
          : [...existingWithoutCurrent, item];
        const limited = applyToastLimit(next);
        const keptIds = new Set(limited.map((toastItem) => toastItem.id));
        setTimingByToastId((previousTimingByToastId) => {
          const filtered: typeof previousTimingByToastId = {};
          Object.entries(previousTimingByToastId).forEach(([toastId, timerState]) => {
            if (keptIds.has(toastId)) {
              filtered[toastId] = timerState;
            }
          });
          return filtered;
        });
        return limited;
      });
      if (duration > 0) {
        setTimingByToastId((prev) => ({
          ...prev,
          [id]: {
            duration,
            remaining: duration,
            pauseOnHover: resolvedPauseOnHover,
            pauseOnFocusLoss: resolvedPauseOnFocusLoss,
            isHovered: false,
            isPausedByApi: false,
          },
        }));
      } else {
        setTimingByToastId((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      }
    },
    [
      applyToastLimit,
      closeOnClick,
      defaultAppearance,
      newestOnTop,
      pauseOnFocusLoss,
      pauseOnHover,
      showProgressBar,
    ],
  );

  const isActiveToast = useCallback((id: string) => {
    return toastsRef.current.some((toastItem) => toastItem.id === id);
  }, []);

  const updateToast = useCallback(
    (id: string, patch: Partial<Omit<ToastItem, 'id'>>) => {
      setToasts((prev) =>
        prev.map((toastItem) => (toastItem.id === id ? { ...toastItem, ...patch, id } : toastItem)),
      );

      if (patch.duration !== undefined) {
        if (patch.duration > 0) {
          setTimingByToastId((prev) => ({
            ...prev,
            [id]: {
              duration: patch.duration as number,
              remaining: patch.duration as number,
              pauseOnHover: patch.pauseOnHover ?? prev[id]?.pauseOnHover ?? pauseOnHover,
              pauseOnFocusLoss:
                patch.pauseOnFocusLoss ?? prev[id]?.pauseOnFocusLoss ?? pauseOnFocusLoss,
              isHovered: prev[id]?.isHovered ?? false,
              isPausedByApi: prev[id]?.isPausedByApi ?? false,
            },
          }));
        } else {
          setTimingByToastId((prev) => {
            const next = { ...prev };
            delete next[id];
            return next;
          });
        }
      }
    },
    [pauseOnFocusLoss, pauseOnHover],
  );

  const clearToasts = useCallback(() => {
    setToasts([]);
    setTimingByToastId({});
  }, []);

  const pauseToastTimer = useCallback((id: string) => {
    setTimingByToastId((prev) => {
      if (!prev[id]) {
        return prev;
      }
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isHovered: true,
        },
      };
    });
  }, []);

  const resumeToastTimer = useCallback((id: string) => {
    setTimingByToastId((prev) => {
      if (!prev[id]) {
        return prev;
      }
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isHovered: false,
        },
      };
    });
  }, []);

  const pauseToasts = useCallback((id?: string) => {
    setTimingByToastId((prev) => {
      if (!id) {
        const next: typeof prev = {};
        Object.entries(prev).forEach(([toastId, timerState]) => {
          next[toastId] = { ...timerState, isPausedByApi: true };
        });
        return next;
      }
      if (!prev[id]) {
        return prev;
      }
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isPausedByApi: true,
        },
      };
    });
  }, []);

  const playToasts = useCallback((id?: string) => {
    setTimingByToastId((prev) => {
      if (!id) {
        const next: typeof prev = {};
        Object.entries(prev).forEach(([toastId, timerState]) => {
          next[toastId] = { ...timerState, isPausedByApi: false };
        });
        return next;
      }
      if (!prev[id]) {
        return prev;
      }
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isPausedByApi: false,
        },
      };
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleFocus = () => {
      windowHasFocusRef.current = true;
    };

    const handleBlur = () => {
      windowHasFocusRef.current = false;
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    const tickMs = 100;
    const intervalId = setInterval(() => {
      setTimingByToastId((prev) => {
        if (!Object.keys(prev).length) {
          return prev;
        }

        const activeToastIds = new Set(toastsRef.current.map((toastItem) => toastItem.id));
        const next: typeof prev = {};

        for (const [toastId, timerState] of Object.entries(prev)) {
          if (!activeToastIds.has(toastId)) {
            continue;
          }

          const shouldPauseByWindow = timerState.pauseOnFocusLoss && !windowHasFocusRef.current;
          const shouldPause =
            timerState.isHovered || shouldPauseByWindow || timerState.isPausedByApi;

          if (shouldPause) {
            next[toastId] = timerState;
            continue;
          }

          const nextRemaining = timerState.remaining - tickMs;
          if (nextRemaining <= 0) {
            next[toastId] = {
              ...timerState,
              remaining: 0,
            };
            continue;
          }

          next[toastId] = {
            ...timerState,
            remaining: nextRemaining,
          };
        }

        return next;
      });
    }, tickMs);

    return () => {
      clearInterval(intervalId);
    };
  }, [hideToast]);

  useEffect(() => {
    const toastIdsToClose = Object.entries(timingByToastId)
      .filter(([, timerState]) => timerState.remaining <= 0)
      .map(([toastId]) => toastId);

    if (!toastIdsToClose.length) {
      return;
    }

    toastIdsToClose.forEach((toastId) => hideToast(toastId));
  }, [timingByToastId, hideToast]);

  const value = useMemo(
    () => ({
      toasts,
      showToast,
      updateToast,
      isActiveToast,
      hideToast,
      clearToasts,
      pauseToasts,
      playToasts,
    }),
    [
      toasts,
      showToast,
      updateToast,
      isActiveToast,
      hideToast,
      clearToasts,
      pauseToasts,
      playToasts,
    ],
  );

  const stack =
    typeof document !== 'undefined'
      ? createPortal(
          <ToastStack
            role="region"
            aria-label="Уведомления"
            $placement={placement}
            $stacked={stacked}
          >
            <AnimatePresence initial={false}>
              {toasts.map((toastItem) => (
                <motion.div
                  key={toastItem.id}
                  layout
                  initial={{ opacity: 0, y: -12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <Toast
                    toast={toastItem}
                    onClose={hideToast}
                    onPauseTimer={pauseToastTimer}
                    onResumeTimer={resumeToastTimer}
                    timing={
                      timingByToastId[toastItem.id]
                        ? {
                            duration: timingByToastId[toastItem.id].duration,
                            remaining: timingByToastId[toastItem.id].remaining,
                          }
                        : undefined
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
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
