import React, { forwardRef, useCallback, useId, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { clsx } from 'clsx';
import type { DrawerProps } from '../../../types/ui';
import { Icon } from '../Icon/Icon';
import { IconSize } from '../../../types/sizes';
import {
  useModalEscape,
  shouldCloseOnOverlayClick,
  useModalFocus,
  useFocusTrap,
} from '../Modal/handlers';
import { CloseButton } from '../Modal/Modal.style';
import {
  DrawerOverlay,
  DrawerPanel,
  DrawerHeader,
  DrawerHeaderSpacer,
  DrawerTitle,
  DrawerBody,
} from './Drawer.style';
import { getDrawerOverlayMotion, getDrawerPanelMotion, drawerSizeToCss } from './handlers';
import { useOverlayVisibility } from '../../../hooks/useOverlayVisibility';
import { useOverlayPortal } from '../../../hooks/useOverlayPortal';
import { useOverlayPresentation } from '../../../hooks/useOverlayPresentation';

const DEFAULT_PLACEMENT = 'right' as const;

/**
 * Выдвижная панель с оверлеем: портал, фокус-ловушка, Escape, клик по фону — как у `Modal`.
 *
 * Пропсы — см. `DrawerProps` в `types/ui` (`placement`, `width`, `height`, `overlayVariant`, …).
 */
export const Drawer = forwardRef<HTMLElement, DrawerProps>(
  (
    {
      isOpen,
      onClose,
      placement = DEFAULT_PLACEMENT,
      title,
      children,
      showCloseButton = true,
      width,
      height,
      container,
      portalTargetId,
      portalZIndex,
      overlayClassName,
      overlayVariant = 'default',
      overlayStyle,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      closeOnEscapeKeyDown = true,
      closeOnOutsideClick = true,
      initialFocusRef,
      initialFocusSelector,
      headerSlot,
      unmountOnClose = true,
      lazy = true,
      className,
    },
    ref,
  ) => {
    const prefersReducedMotion = useReducedMotion();
    useModalEscape({ isOpen, closeOnEscape, closeOnEscapeKeyDown, onClose });
    const titleId = useId();
    const contentRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLElement | null>(null);

    const setPanelRef = useCallback(
      (node: HTMLElement | null) => {
        panelRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      [ref],
    );

    useModalFocus({ isOpen, initialFocusRef, initialFocusSelector, fallbackRef: contentRef });
    useFocusTrap(isOpen, panelRef);

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

    const panelMotion = useMemo(
      () => getDrawerPanelMotion(placement, Boolean(prefersReducedMotion)),
      [placement, prefersReducedMotion],
    );
    const overlayMotion = useMemo(
      () => getDrawerOverlayMotion(Boolean(prefersReducedMotion)),
      [prefersReducedMotion],
    );

    const widthCss = useMemo(
      () =>
        placement === 'left' || placement === 'right'
          ? drawerSizeToCss(width, 'min(420px, 100vw)')
          : drawerSizeToCss(width, '100%'),
      [placement, width],
    );

    const heightCss = useMemo(
      () =>
        placement === 'top' || placement === 'bottom'
          ? drawerSizeToCss(height, 'min(360px, 45vh)')
          : drawerSizeToCss(height, '100%'),
      [placement, height],
    );

    const { shouldRenderPortal, shouldRenderContent, isHidden, notifyPresenceExitComplete } =
      useOverlayVisibility({
        isOpen,
        unmountOnClose,
        lazy,
      });

    const { overlayPresentationStyle, ariaHidden } = useOverlayPresentation({
      isOpen,
      isHidden,
      overlayInlineStyle,
    });

    if (!mountNode || !shouldRenderPortal) {
      return null;
    }

    const drawerBody = (
      <DrawerOverlay
        $drawerPlacement={placement}
        $overlayVariant={overlayVariant}
        initial={overlayMotion.initial}
        animate={overlayMotion.animate}
        exit={overlayMotion.exit}
        transition={overlayMotion.transition}
        onClick={handleOverlayClick}
        className={overlayClassName}
        style={overlayPresentationStyle}
        data-drawer-overlay
        aria-hidden={ariaHidden}
      >
        <DrawerPanel
          ref={setPanelRef}
          $widthCss={widthCss}
          $heightCss={heightCss}
          $placement={placement}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          className={clsx('ui-drawer', className)}
          initial={panelMotion.initial}
          animate={panelMotion.animate}
          exit={panelMotion.exit}
          transition={panelMotion.transition}
          onClick={(event) => event.stopPropagation()}
        >
          {headerSlot ? (
            <DrawerHeader>{headerSlot}</DrawerHeader>
          ) : (
            (title || showCloseButton) && (
              <DrawerHeader>
                {title ? <DrawerTitle id={titleId}>{title}</DrawerTitle> : null}
                {!title && showCloseButton ? <DrawerHeaderSpacer aria-hidden /> : null}
                {showCloseButton ? (
                  <CloseButton type="button" onClick={onClose} aria-label="Закрыть">
                    <Icon name="PhosphorX" size={IconSize.MD} color="#9E9E9E" />
                  </CloseButton>
                ) : null}
              </DrawerHeader>
            )
          )}
          <DrawerBody ref={contentRef} tabIndex={-1}>
            {children}
          </DrawerBody>
        </DrawerPanel>
      </DrawerOverlay>
    );

    return createPortal(
      <AnimatePresence onExitComplete={notifyPresenceExitComplete}>
        {shouldRenderContent ? drawerBody : null}
      </AnimatePresence>,
      mountNode,
    );
  },
);

Drawer.displayName = 'Drawer';
