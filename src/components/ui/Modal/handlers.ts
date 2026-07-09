import { useEffect } from 'react';
import type { NullableRefObject } from '../../../types/reactRefs';
import type { Target, Transition } from 'framer-motion';
import type { ModalButtonProps } from '../../../types/ui';
import {
  useOverlayFocusTrap,
  useOverlayInitialFocus,
} from '../../../handlers/overlayFocusHandlers';

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
  initialFocusRef?: NullableRefObject;
  initialFocusSelector?: string;
  fallbackRef: NullableRefObject;
}

export const useModalFocus = ({
  isOpen,
  initialFocusRef,
  initialFocusSelector,
  fallbackRef,
}: UseModalFocusParams) => {
  useOverlayInitialFocus({
    isOpen,
    initialFocusRef,
    initialFocusSelector,
    fallbackRef,
  });
};

export const useFocusTrap = (isOpen: boolean, containerRef: NullableRefObject) => {
  useOverlayFocusTrap(isOpen, containerRef);
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
