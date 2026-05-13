import React, { forwardRef, useCallback, useId, useMemo, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { clsx } from 'clsx';
import { Icon } from '../Icon/Icon';
import { Button } from '../buttons/Button/Button';
import type { ModalButtonProps, ModalProps } from '../../../types/ui';
import { IconSize, ModalSize } from '../../../types/sizes';
import {
  useModalEscape,
  shouldCloseOnOverlayClick,
  hasModalButtons,
  useModalFocus,
  useFocusTrap,
  getAnimationPreset,
} from './handlers';
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
  ModalButtonContainer,
  ModalHeaderTitleWrapper,
  ModalHeaderIcon,
  ModalContentIcon,
  ModalButtonsIcon,
  ModalFooter,
} from './Modal.style';
import { useOverlayVisibility } from '../../../hooks/useOverlayVisibility';
import { useOverlayPortal } from '../../../hooks/useOverlayPortal';
import { useOverlayPresentation } from '../../../hooks/useOverlayPresentation';

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      description,
      content,
      container,
      overlayStyledCss,
      overlayStyle,
      overlayVariant,
      overlayClassName,
      headerIcon,
      contentIcon,
      buttonsIcon,
      animationPreset = 'default',
      animationConfig,
      buttons,
      buttonsSlot,
      headerSlot,
      footerSlot,
      portalTargetId,
      portalZIndex,
      modalVariant = 'default',
      mobile = false,
      initialFocusRef,
      initialFocusSelector,
      children,
      size = ModalSize.MD,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      closeOnEscapeKeyDown = true,
      closeOnOutsideClick = true,
      showCloseButton = true,
      unmountOnClose = true,
      lazy = true,
      className,
    },
    ref,
  ) => {
    const prefersReducedMotion = useReducedMotion();
    useModalEscape({ isOpen, closeOnEscape, closeOnEscapeKeyDown, onClose });
    const titleId = useId();
    const descriptionId = useId();
    const contentRef = useRef<HTMLDivElement>(null);
    const modalContainerRef = useRef<HTMLDivElement | null>(null);
    useModalFocus({ isOpen, initialFocusRef, initialFocusSelector, fallbackRef: contentRef });
    useFocusTrap(isOpen, modalContainerRef);

    const setModalRef = useCallback(
      (node: HTMLDivElement | null) => {
        modalContainerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref],
    );

    const handleOverlayClick = (event: React.MouseEvent) => {
      if (shouldCloseOnOverlayClick(event, closeOnOverlayClick, closeOnOutsideClick)) {
        onClose();
      }
    };

    const { mountNode, overlayInlineStyle } = useOverlayPortal({
      container,
      portalTargetId,
      overlayStyle,
      portalZIndex,
    });
    const presetAnimations = getAnimationPreset(animationPreset);
    const animations = useMemo(() => {
      if (!animationConfig) {
        return presetAnimations;
      }
      return {
        overlay: {
          initial: { ...presetAnimations.overlay.initial, ...animationConfig.overlay?.initial },
          animate: { ...presetAnimations.overlay.animate, ...animationConfig.overlay?.animate },
          exit: { ...presetAnimations.overlay.exit, ...animationConfig.overlay?.exit },
        },
        modal: {
          initial: { ...presetAnimations.modal.initial, ...animationConfig.modal?.initial },
          animate: { ...presetAnimations.modal.animate, ...animationConfig.modal?.animate },
          exit: { ...presetAnimations.modal.exit, ...animationConfig.modal?.exit },
          transition: {
            ...presetAnimations.modal.transition,
            ...animationConfig.modal?.transition,
          },
        },
      };
    }, [animationConfig, presetAnimations]);

    const effectiveAnimations = useMemo(() => {
      if (!prefersReducedMotion) {
        return animations;
      }

      return {
        overlay: {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        },
        modal: {
          initial: { opacity: 0, scale: 1, y: 0 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 1, y: 0 },
          transition: { duration: 0.01 },
        },
      };
    }, [animations, prefersReducedMotion]);

    const [asyncButtonsState, setAsyncButtonsState] = useState<Record<number, boolean>>({});
    const { shouldRenderPortal, shouldRenderContent, isHidden, notifyPresenceExitComplete } =
      useOverlayVisibility({
        isOpen,
        unmountOnClose,
        lazy,
      });

    const handleButtonAction = useCallback(async (button: ModalButtonProps, index: number) => {
      if (button.asyncOnClick) {
        setAsyncButtonsState((prev) => ({ ...prev, [index]: true }));
        try {
          await button.asyncOnClick();
        } finally {
          setAsyncButtonsState((prev) => ({ ...prev, [index]: false }));
        }
      }
      button.onClick?.();
    }, []);

    const sortedButtons = useMemo(() => {
      if (!buttons) {
        return [];
      }
      const orderValue = (placement?: 'primary' | 'secondary') =>
        placement === 'secondary' ? 0 : 1;
      return [...buttons].sort((a, b) => orderValue(a.placement) - orderValue(b.placement));
    }, [buttons]);

    // Обработка завершения анимаций для Storybook
    useEffect(() => {
      if (!isOpen || !modalContainerRef.current) return;

      const modalElement = modalContainerRef.current;

      // Обработчик для события завершения анимации
      const handleAnimationComplete = () => {
        // Добавляем атрибут для Storybook, чтобы он знал, что анимация завершена
        modalElement.setAttribute('data-animation-complete', 'true');
      };

      // Слушаем события завершения анимации
      modalElement.addEventListener('animationend', handleAnimationComplete);
      modalElement.addEventListener('transitionend', handleAnimationComplete);

      return () => {
        modalElement.removeEventListener('animationend', handleAnimationComplete);
        modalElement.removeEventListener('transitionend', handleAnimationComplete);
        modalElement.removeAttribute('data-animation-complete');
      };
    }, [isOpen]);

    const { overlayPresentationStyle, ariaHidden } = useOverlayPresentation({
      isOpen,
      isHidden,
      overlayInlineStyle,
    });

    if (!mountNode || !shouldRenderPortal) {
      return null;
    }

    const modalBody = (
      <Overlay
        $mobile={mobile}
        $overlayCss={overlayStyledCss}
        $overlayVariant={overlayVariant}
        initial={effectiveAnimations.overlay.initial}
        animate={effectiveAnimations.overlay.animate}
        exit={effectiveAnimations.overlay.exit}
        onClick={handleOverlayClick}
        className={overlayClassName}
        style={overlayPresentationStyle}
        onAnimationComplete={() => {
          // Сигнализируем Storybook о завершении анимации оверлея
          const overlayElement = document.querySelector('[data-modal-overlay]');
          if (overlayElement) {
            overlayElement.setAttribute('data-animation-complete', 'true');
          }
        }}
        data-modal-overlay
        aria-hidden={ariaHidden}
      >
        <ModalContainer
          ref={setModalRef}
          size={size}
          $mobile={mobile}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={description ? descriptionId : undefined}
          className={clsx('ui-modal', className)}
          initial={effectiveAnimations.modal.initial}
          animate={effectiveAnimations.modal.animate}
          exit={effectiveAnimations.modal.exit}
          transition={effectiveAnimations.modal.transition}
          onAnimationComplete={() => {
            // Сигнализируем Storybook о завершении анимации модального окна
            if (modalContainerRef.current) {
              modalContainerRef.current.setAttribute('data-animation-complete', 'true');
            }
          }}
        >
          {headerSlot ? (
            <ModalHeader $variant={modalVariant}>{headerSlot}</ModalHeader>
          ) : (
            (title || showCloseButton || headerIcon) && (
              <ModalHeader $variant={modalVariant}>
                <ModalHeaderTitleWrapper>
                  {headerIcon && <ModalHeaderIcon>{headerIcon}</ModalHeaderIcon>}
                  {title && (
                    <ModalTitle $variant={modalVariant} id={titleId}>
                      {title}
                    </ModalTitle>
                  )}
                </ModalHeaderTitleWrapper>
                {showCloseButton && (
                  <CloseButton onClick={onClose} aria-label="Закрыть">
                    <Icon name="PhosphorX" size={IconSize.MD} color="#9E9E9E" />
                  </CloseButton>
                )}
              </ModalHeader>
            )
          )}
          <ModalContent ref={contentRef} tabIndex={-1}>
            {contentIcon && <ModalContentIcon>{contentIcon}</ModalContentIcon>}
            {description && <p id={descriptionId}>{description}</p>}
            {content}
            {children}
          </ModalContent>
          {footerSlot && <ModalFooter>{footerSlot}</ModalFooter>}
          {(buttonsSlot || hasModalButtons(sortedButtons)) && (
            <ModalButtonContainer>
              {buttonsIcon && <ModalButtonsIcon>{buttonsIcon}</ModalButtonsIcon>}
              {buttonsSlot
                ? buttonsSlot
                : sortedButtons.map((buttonProps, index) => (
                    <Button
                      key={index}
                      {...buttonProps}
                      loading={buttonProps.loading || asyncButtonsState[index]}
                      disabled={buttonProps.disabled || asyncButtonsState[index]}
                      onClick={() => handleButtonAction(buttonProps, index)}
                    >
                      {asyncButtonsState[index] && buttonProps.loadingLabel
                        ? buttonProps.loadingLabel
                        : buttonProps.label}
                    </Button>
                  ))}
            </ModalButtonContainer>
          )}
        </ModalContainer>
      </Overlay>
    );

    return createPortal(
      <AnimatePresence onExitComplete={notifyPresenceExitComplete}>
        {shouldRenderContent ? modalBody : null}
      </AnimatePresence>,
      mountNode,
    );
  },
);

Modal.displayName = 'Modal';
