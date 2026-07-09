import { useEffect, useRef } from 'react';
import { useAnimationControls, useReducedMotion } from 'framer-motion';
import {
  badgeEnterExitTransition,
  badgeLayoutTransition,
  uiMotionBadgeExit,
  uiMotionBadgeInitial,
  uiMotionBadgeValuePulse,
  uiMotionBadgeValuePulseTransition,
  uiMotionBadgeVisible,
} from '../handlers/badgeMotionHandlers';
import { uiMotionBadgeInteractive } from '../handlers/uiMotion';

/** Параметры хука пульсации при смене значения */
export type UseValuePulseMotionOptions = {
  /** Ключ содержимого — при изменении запускается пульс */
  contentKey: string;
  /** Включить lifecycle-анимации (появление, пульс, layout) */
  motionEnabled?: boolean;
  /** Кликабельный элемент (hover/tap) */
  interactive?: boolean;
  /** Анимировать layout при смене размера */
  layoutEnabled?: boolean;
};

/**
 * Управляет появлением, пульсом при смене ключа и опциональной layout-анимацией.
 * Базовый хук для Badge, счётчиков и индикаторов.
 *
 * @param options — ключ содержимого и флаги анимации
 */
export function useValuePulseMotion(options: UseValuePulseMotionOptions) {
  const {
    contentKey,
    motionEnabled = true,
    interactive = false,
    layoutEnabled = false,
  } = options;

  const reducedMotion = useReducedMotion();
  const controls = useAnimationControls();
  const isFirstRenderRef = useRef(true);
  const previousContentKeyRef = useRef<string | null>(null);
  const isMotionActive = motionEnabled && !reducedMotion;

  useEffect(() => {
    if (!isMotionActive) {
      void controls.set({ scale: 1, opacity: 1 });
      previousContentKeyRef.current = contentKey;
      isFirstRenderRef.current = false;
      return;
    }

    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      previousContentKeyRef.current = contentKey;
      void controls.start({
        ...uiMotionBadgeVisible(reducedMotion),
        transition: badgeEnterExitTransition,
      });
      return;
    }

    if (previousContentKeyRef.current === contentKey) {
      return;
    }

    previousContentKeyRef.current = contentKey;
    void controls.start({
      ...uiMotionBadgeValuePulse(reducedMotion),
      transition: uiMotionBadgeValuePulseTransition(reducedMotion),
    });
  }, [contentKey, controls, isMotionActive, reducedMotion]);

  const interactiveMotion = uiMotionBadgeInteractive(reducedMotion, interactive);

  return {
    contentKey,
    motionProps: {
      ...interactiveMotion,
      initial: isMotionActive ? uiMotionBadgeInitial(reducedMotion) : false,
      animate: isMotionActive ? controls : uiMotionBadgeVisible(reducedMotion),
      exit: isMotionActive ? uiMotionBadgeExit(reducedMotion) : undefined,
      layout: isMotionActive && layoutEnabled ? ('size' as const) : false,
      transition: badgeEnterExitTransition,
      layoutTransition: badgeLayoutTransition,
    },
  };
}
