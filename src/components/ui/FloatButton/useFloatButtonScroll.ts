import { useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  FLOAT_BUTTON_DEFAULT_VISIBILITY_HEIGHT_PX,
  getFloatButtonScrollProgressRatio,
  readFloatButtonScrollMetrics,
  resolveFloatButtonScrollDurationMs,
  scrollFloatButtonTargetToTop,
  shouldShowFloatButtonBackTop,
} from './handlers';

type UseFloatButtonScrollOptions = {
  enabled: boolean;
  visibilityHeight?: number;
  duration?: number;
  getScrollContainer?: () => HTMLElement | Window;
};

/**
 * Подписка на прокрутку для режима «наверх».
 * @param options.enabled - Включён BackTop
 * @param options.visibilityHeight - Порог показа
 * @param options.duration - Длительность скролла
 * @param options.getScrollContainer - Цель прокрутки
 */
export const useFloatButtonScroll = ({
  enabled,
  visibilityHeight = FLOAT_BUTTON_DEFAULT_VISIBILITY_HEIGHT_PX,
  duration,
  getScrollContainer,
}: UseFloatButtonScrollOptions): {
  isVisible: boolean;
  progressRatio: number;
  scrollToTop: () => void;
} => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [isVisible, setIsVisible] = useState(!enabled);
  const [progressRatio, setProgressRatio] = useState(0);

  const resolveTarget = useCallback((): Window | HTMLElement => {
    return getScrollContainer?.() ?? window;
  }, [getScrollContainer]);

  useEffect(() => {
    if (!enabled) {
      setIsVisible(true);
      setProgressRatio(0);
      return undefined;
    }

    const updateFromTarget = () => {
      const target = resolveTarget();
      const metrics = readFloatButtonScrollMetrics(target);
      setIsVisible(shouldShowFloatButtonBackTop(metrics.scrollTopPx, visibilityHeight));
      setProgressRatio(
        getFloatButtonScrollProgressRatio(
          metrics.scrollTopPx,
          metrics.scrollHeightPx,
          metrics.clientHeightPx,
        ),
      );
    };

    updateFromTarget();
    const target = resolveTarget();
    target.addEventListener('scroll', updateFromTarget, { passive: true });
    window.addEventListener('resize', updateFromTarget);
    return () => {
      target.removeEventListener('scroll', updateFromTarget);
      window.removeEventListener('resize', updateFromTarget);
    };
  }, [enabled, resolveTarget, visibilityHeight]);

  const scrollToTop = useCallback(() => {
    const durationMs = resolveFloatButtonScrollDurationMs(duration, prefersReducedMotion);
    scrollFloatButtonTargetToTop(resolveTarget(), durationMs);
  }, [duration, prefersReducedMotion, resolveTarget]);

  return { isVisible, progressRatio, scrollToTop };
};
