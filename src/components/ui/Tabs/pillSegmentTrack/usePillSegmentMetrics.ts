import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { TabsDirection } from '@/types/ui';
import {
  scrollSegmentTriggerIntoView,
  measureSegmentTriggerRelativeToTrack,
} from '@/handlers/tabsScrollHandlers';
import type { PillSegmentMetrics } from './pillSegmentMetricsTypes';

interface UsePillSegmentMetricsParams {
  /** Включить наблюдатели и расчёт (**pill** или текстовые **minimal** / **line** / **underline**) */
  enabled: boolean;
  /** value активного сегмента */
  activeSegmentValue: string;
  /** Прокрутка трека: пересчёт индикатора при scroll и подскролл к активному сегменту */
  scrollable?: boolean;
  /** Ось списка (для подскролла) */
  direction?: TabsDirection;
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
export function usePillSegmentMetrics(
  params: UsePillSegmentMetricsParams,
): UsePillSegmentMetricsResult {
  const { enabled, activeSegmentValue, scrollable = false, direction } = params;
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
    setMetrics(measureSegmentTriggerRelativeToTrack(trackRoot, activeTrigger));
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

  useLayoutEffect(() => {
    if (!scrollable || !enabled) {
      return undefined;
    }
    const trackRoot = trackRootRef.current;
    if (!trackRoot) {
      return undefined;
    }
    const handleScroll = () => {
      measure();
    };
    trackRoot.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      trackRoot.removeEventListener('scroll', handleScroll);
    };
  }, [scrollable, enabled, measure]);

  useLayoutEffect(() => {
    if (!scrollable || !direction) {
      return;
    }
    const trackRoot = trackRootRef.current;
    const activeTrigger = segmentTriggersRef.current.get(activeSegmentValue);
    if (!trackRoot || !activeTrigger) {
      return;
    }
    scrollSegmentTriggerIntoView(trackRoot, activeTrigger, direction);
  }, [scrollable, direction, activeSegmentValue]);

  return {
    metrics,
    setTrackRootElement,
    registerSegmentTriggerRef,
  };
}
