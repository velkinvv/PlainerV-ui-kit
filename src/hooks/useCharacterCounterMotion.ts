import { useMemo } from 'react';
import { useValuePulseMotion } from './useValuePulseMotion';

/** Параметры анимации счётчика символов */
export type UseCharacterCounterMotionOptions = {
  /** Текущая длина введённого текста */
  currentLength: number;
  /** Максимально допустимая длина */
  maxLength: number;
  /** Включить анимации */
  motionEnabled?: boolean;
};

/**
 * Анимация счётчика символов: пульс только при достижении или превышении лимита.
 * Не пульсирует на каждый введённый символ ниже лимита.
 *
 * @param options — длина текста и лимит
 */
export function useCharacterCounterMotion(options: UseCharacterCounterMotionOptions) {
  const { currentLength, maxLength, motionEnabled = true } = options;

  const pulseContentKey = useMemo(() => {
    const isAtOrOverLimit = maxLength > 0 && currentLength >= maxLength;
    return `limit:${isAtOrOverLimit}`;
  }, [currentLength, maxLength]);

  return useValuePulseMotion({
    contentKey: pulseContentKey,
    motionEnabled,
    layoutEnabled: false,
  });
}
