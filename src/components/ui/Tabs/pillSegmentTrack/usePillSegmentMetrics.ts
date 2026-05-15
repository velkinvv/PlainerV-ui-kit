import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { PillSegmentMetrics } from './pillSegmentMetricsTypes';

interface UsePillSegmentMetricsParams {
  /** Включить наблюдатели и расчёт (**pill** или текстовые **minimal** / **line** / **underline**) */
  enabled: boolean;
  /** value активного сегмента */
  activeSegmentValue: string;
}

interface UsePillSegmentMetricsResult {
  metrics: PillSegmentMetrics | null;
  /** Повесить на корневой элемент трека (TabItemGroupList) */
  setTrackRootElement: (element: HTMLDivElement | null) => void;
  registerSegmentTriggerRef: (segmentValue: string, element: HTMLElement | null) => void;
}

/**
 * Отслеживает положение и размер активного триггера относительно трека: pill-thumb или скользящая полоска текстовых вариантов (**minimal** / **line** / **underline**).
 *
 * @param params.enabled — считать метрики в режимах с анимированным индикатором
 * @param params.activeSegmentValue — какой сегмент считается выбранным
 */
export function usePillSegmentMetrics(params: UsePillSegmentMetricsParams): UsePillSegmentMetricsResult {
  const { enabled, activeSegmentValue } = params;
  const trackRootRef = useRef<HTMLDivElement | null>(null);
  const segmentTriggersRef = useRef<Map<string, HTMLElement>>(new Map());
  const [metrics, setMetrics] = useState<PillSegmentMetrics | null>(null);

  const measure = useCallback(() => {
    if (!enabled) {
      return;
    }
    const trackRoot = trackRootRef.current;
    const activeTrigger = segmentTriggersRef.current.get(activeSegmentValue);
    if (!trackRoot || !activeTrigger) {
      setMetrics(null);
      return;
    }
    const trackRect = trackRoot.getBoundingClientRect();
    const triggerRect = activeTrigger.getBoundingClientRect();
    setMetrics({
      offsetX: triggerRect.left - trackRect.left,
      offsetY: triggerRect.top - trackRect.top,
      width: triggerRect.width,
      height: triggerRect.height,
    });
  }, [enabled, activeSegmentValue]);

  const registerSegmentTriggerRef = useCallback(
    (segmentValue: string, element: HTMLElement | null) => {
      const triggersMap = segmentTriggersRef.current;
      if (element) {
        triggersMap.set(segmentValue, element);
      } else {
        triggersMap.delete(segmentValue);
      }
      queueMicrotask(() => {
        measure();
      });
    },
    [measure],
  );

  const setTrackRootElement = useCallback(
    (element: HTMLDivElement | null) => {
      trackRootRef.current = element;
      queueMicrotask(() => {
        measure();
      });
    },
    [measure],
  );

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useLayoutEffect(() => {
    if (!enabled) {
      return undefined;
    }
    const trackRoot = trackRootRef.current;
    if (!trackRoot) {
      return undefined;
    }
    const resizeObserver = new ResizeObserver(() => {
      measure();
    });
    resizeObserver.observe(trackRoot);
    const activeTrigger = segmentTriggersRef.current.get(activeSegmentValue);
    if (activeTrigger) {
      resizeObserver.observe(activeTrigger);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [enabled, activeSegmentValue, measure]);

  return {
    metrics,
    setTrackRootElement,
    registerSegmentTriggerRef,
  };
}
