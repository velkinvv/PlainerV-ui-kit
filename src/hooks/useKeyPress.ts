import { useEffect, useCallback } from 'react';

export type KeyHandler = (event: KeyboardEvent) => void;

export interface UseKeyPressOptions {
  targetKey: string | string[];
  handler: KeyHandler;
  modifier?: 'ctrl' | 'alt' | 'shift' | 'meta';
  preventDefault?: boolean;
  enabled?: boolean;
}

export function useKeyPress({
  targetKey,
  handler,
  modifier,
  preventDefault = false,
  enabled = true,
}: UseKeyPressOptions) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      const keys = Array.isArray(targetKey) ? targetKey : [targetKey];
      const isTargetKey = keys.some(key => event.key.toLowerCase() === key.toLowerCase());

      if (!isTargetKey) return;

      // Проверяем модификатор
      if (modifier) {
        const modifierPressed = event[`${modifier}Key`];
        if (!modifierPressed) return;
      }

      if (preventDefault) {
        event.preventDefault();
      }

      handler(event);
    },
    [targetKey, handler, modifier, preventDefault, enabled],
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress, enabled]);
}

// Упрощенная версия для одного ключа
export function useKeyPressSimple(targetKey: string, handler: KeyHandler, enabled: boolean = true) {
  useKeyPress({
    targetKey,
    handler,
    enabled,
  });
}
