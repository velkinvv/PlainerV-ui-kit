import { useEffect } from 'react';
import type { Target, Transition } from 'framer-motion';
import {
  resolveOverlayPortalHost,
  type OverlayPortalHost,
} from './portalOverlayHandlers';

/** Параметры обработки клавиатуры в полноэкранном режиме карусели */
export type CarouselFullscreenKeyboardParams = {
  /** Открыт ли полноэкранный режим */
  isOpen: boolean;
  /** Закрыть полноэкранный режим */
  onClose: () => void;
  /** Перейти к предыдущему слайду */
  onPrevious: () => void;
  /** Перейти к следующему слайду */
  onNext: () => void;
  /** Документ, в котором смонтирован оверлей (для блокировки прокрутки) */
  ownerDocument?: Document;
};

/** Набор анимаций полноэкранного режима карусели */
export type CarouselFullscreenAnimations = {
  overlay: {
    initial: Target;
    animate: Target;
    exit: Target;
    transition: Transition;
  };
  content: {
    initial: Target;
    animate: Target;
    exit: Target;
    transition: Transition;
  };
};

/**
 * Возвращает анимации полноэкранного режима с учётом prefers-reduced-motion.
 * @param reducedMotion — флаг reduced motion
 */
export function getCarouselFullscreenAnimations(
  reducedMotion: boolean,
): CarouselFullscreenAnimations {
  if (reducedMotion) {
    return {
      overlay: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.01 },
      },
      content: {
        initial: { opacity: 0, scale: 1 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1 },
        transition: { duration: 0.01 },
      },
    };
  }

  return {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    content: {
      initial: { opacity: 0, scale: 0.94 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.94 },
      transition: { duration: 0.25, ease: 'easeOut' },
    },
  };
}

/**
 * Возвращает узел портала для полноэкранного режима (в Storybook Docs — `window.top.document.body`).
 */
export function resolveCarouselFullscreenPortalHost(): OverlayPortalHost {
  return resolveOverlayPortalHost();
}

/**
 * Блокирует прокрутку страницы и обрабатывает Escape / стрелки в полноэкранном режиме.
 * @param params — параметры клавиатуры
 */
export function useCarouselFullscreenKeyboard({
  isOpen,
  onClose,
  onPrevious,
  onNext,
  ownerDocument,
}: CarouselFullscreenKeyboardParams): void {
  useEffect(() => {
    if (!isOpen || !ownerDocument) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onPrevious();
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNext();
      }
    };

    const bodyElement = ownerDocument.body;
    const previousBodyOverflow = bodyElement.style.overflow;
    bodyElement.style.overflow = 'hidden';
    ownerDocument.addEventListener('keydown', handleKeyDown);

    return () => {
      ownerDocument.removeEventListener('keydown', handleKeyDown);
      bodyElement.style.overflow = previousBodyOverflow;
    };
  }, [isOpen, onClose, onNext, onPrevious, ownerDocument]);
}
