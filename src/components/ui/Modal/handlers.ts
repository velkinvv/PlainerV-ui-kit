import { useEffect, useRef } from 'react';
import type { Target, Transition } from 'framer-motion';
import type { ModalButtonProps } from '../../../types/ui';

interface UseModalEscapeParams {
  isOpen: boolean;
  closeOnEscape: boolean;
  closeOnEscapeKeyDown: boolean;
  onClose: () => void;
}

export const useModalEscape = ({
  isOpen,
  closeOnEscape,
  closeOnEscapeKeyDown,
  onClose,
}: UseModalEscapeParams) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape && closeOnEscapeKeyDown) {
        onClose();
      }
    };

    if (isOpen && closeOnEscapeKeyDown) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, closeOnEscapeKeyDown, onClose]);
};

export const shouldCloseOnOverlayClick = (
  event: React.MouseEvent,
  closeOnOverlayClick: boolean,
  closeOnOutsideClick: boolean,
) => closeOnOverlayClick && closeOnOutsideClick && event.target === event.currentTarget;

export const getModalMountNode = (
  container?: Element | null,
  portalTargetId?: string,
): Element | null => {
  if (typeof document === 'undefined') {
    return null;
  }

  if (container) {
    return container;
  }

  if (portalTargetId) {
    return document.getElementById(portalTargetId);
  }

  return document.body ?? null;
};

export const hasModalButtons = (buttons?: ModalButtonProps[]): buttons is ModalButtonProps[] =>
  Array.isArray(buttons) && buttons.length > 0;

interface UseModalFocusParams {
  isOpen: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  initialFocusSelector?: string;
  fallbackRef: React.RefObject<HTMLElement>;
}

export const useModalFocus = ({
  isOpen,
  initialFocusRef,
  initialFocusSelector,
  fallbackRef,
}: UseModalFocusParams) => {
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      const selectorTarget = initialFocusSelector
        ? (document.querySelector(initialFocusSelector) as HTMLElement | null)
        : null;
      const focusTarget = initialFocusRef?.current ?? selectorTarget ?? fallbackRef.current;
      focusTarget?.focus?.();
    } else {
      previouslyFocusedElement.current?.focus?.();
      previouslyFocusedElement.current = null;
    }
  }, [isOpen, initialFocusRef, initialFocusSelector, fallbackRef]);
};

const FOCUSABLE_SELECTOR =
  'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

export const useFocusTrap = (isOpen: boolean, containerRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!isOpen || !containerRef.current) {
      return;
    }

    const container = containerRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

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

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, containerRef]);
};

type AnimationPresetKey = 'default' | 'fade' | 'slideUp';

const animationPresets: Record<
  AnimationPresetKey,
  {
    overlay: { initial: Target; animate: Target; exit: Target };
    modal: { initial: Target; animate: Target; exit: Target; transition: Transition };
  }
> = {
  default: {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    modal: {
      initial: { scale: 0.95, opacity: 0, y: 20 },
      animate: { scale: 1, opacity: 1, y: 0 },
      exit: { scale: 0.95, opacity: 0, y: 20 },
      transition: { duration: 0.2, ease: 'easeOut' },
    },
  },
  fade: {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    modal: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.15, ease: 'easeOut' },
    },
  },
  slideUp: {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    modal: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 40 },
      transition: { duration: 0.25, ease: 'easeOut' },
    },
  },
};

export const getAnimationPreset = (preset: AnimationPresetKey = 'default') =>
  animationPresets[preset] ?? animationPresets.default;
