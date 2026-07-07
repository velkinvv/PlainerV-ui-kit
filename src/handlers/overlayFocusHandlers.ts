import { useEffect, useRef } from 'react';
import type { NullableRefObject } from '../types/reactRefs';

/** Параметры начального фокуса в оверлее */
export type UseOverlayInitialFocusParams = {
  /** Открыт ли оверлей */
  isOpen: boolean;
  /** Ref элемента для начального фокуса */
  initialFocusRef?: NullableRefObject;
  /** CSS-селектор элемента для начального фокуса */
  initialFocusSelector?: string;
  /** Fallback ref, если initial не задан */
  fallbackRef: NullableRefObject;
  /** Документ, в котором смонтирован оверлей */
  ownerDocument?: Document;
};

const FOCUSABLE_SELECTOR =
  'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

/**
 * Устанавливает начальный фокус при открытии оверлея и возвращает фокус при закрытии.
 * @param params — параметры начального фокуса
 */
export function useOverlayInitialFocus({
  isOpen,
  initialFocusRef,
  initialFocusSelector,
  fallbackRef,
  ownerDocument,
}: UseOverlayInitialFocusParams): void {
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const documentRef = ownerDocument ?? (typeof document !== 'undefined' ? document : undefined);

  useEffect(() => {
    if (!documentRef) {
      return undefined;
    }

    if (isOpen) {
      previouslyFocusedElement.current = documentRef.activeElement as HTMLElement | null;
      const selectorTarget = initialFocusSelector
        ? (documentRef.querySelector(initialFocusSelector) as HTMLElement | null)
        : null;
      const focusTarget = initialFocusRef?.current ?? selectorTarget ?? fallbackRef.current;
      focusTarget?.focus?.();
    } else {
      previouslyFocusedElement.current?.focus?.();
      previouslyFocusedElement.current = null;
    }

    return undefined;
  }, [documentRef, fallbackRef, initialFocusRef, initialFocusSelector, isOpen]);
}

/**
 * Ловушка фокуса внутри контейнера оверлея (Tab / Shift+Tab).
 * @param isOpen — открыт ли оверлей
 * @param containerRef — ref контейнера
 * @param ownerDocument — документ оверлея
 */
export function useOverlayFocusTrap(
  isOpen: boolean,
  containerRef: NullableRefObject,
  ownerDocument?: Document,
): void {
  const documentRef = ownerDocument ?? (typeof document !== 'undefined' ? document : undefined);

  useEffect(() => {
    if (!isOpen || !containerRef.current || !documentRef) {
      return undefined;
    }

    const container = containerRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter(
        (element) => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden'),
      );

      if (focusable.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (documentRef.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        }
        return;
      }

      if (documentRef.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef, documentRef, isOpen]);
}
