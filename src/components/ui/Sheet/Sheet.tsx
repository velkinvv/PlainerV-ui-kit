import React, { forwardRef, useCallback, useId, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import type { SheetProps } from '../../../types/ui';
import { Icon } from '../Icon/Icon';
import { IconSize } from '../../../types/sizes';
import {
  useModalEscape,
  shouldCloseOnOverlayClick,
  getModalMountNode,
  useModalFocus,
  useFocusTrap,
} from '../Modal/handlers';
import { CloseButton } from '../Modal/Modal.style';
import {
  SheetOverlay,
  SheetPanel,
  SheetHeader,
  SheetHeaderSpacer,
  SheetTitle,
  SheetBody,
} from './Sheet.style';
import { sheetOverlayMotion, getSheetPanelMotion, sheetSizeToCss } from './handlers';

const DEFAULT_PLACEMENT = 'bottom' as const;

/** Дефолтная высота вертикального sheet (нижний/верхний лист). */
const DEFAULT_VERTICAL_SHEET_HEIGHT = 'min(50vh, 560px)';

/**
 * Панель-лист с оверлеем (аналог `Drawer`): портал, фокус-ловушка, Escape, клик по фону.
 * По умолчанию выезжает **снизу** (`placement="bottom"`), для нижнего листа учитывается `safe-area-inset-bottom`.
 *
 * Пропсы — см. `SheetProps` в `types/ui` (совпадают с `DrawerProps`, включая `placement`, `width`, `height`).
 */
export const Sheet = forwardRef<HTMLElement, SheetProps>(
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
      className,
    },
    ref,
  ) => {
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

    const mountNode = getModalMountNode(container, portalTargetId);

    const overlayInlineStyle = useMemo(() => {
      if (portalZIndex === undefined) {
        return overlayStyle;
      }
      return { ...(overlayStyle || {}), zIndex: portalZIndex };
    }, [overlayStyle, portalZIndex]);

    const panelMotion = useMemo(() => getSheetPanelMotion(placement), [placement]);

    const widthCss = useMemo(
      () =>
        placement === 'left' || placement === 'right'
          ? sheetSizeToCss(width, 'min(420px, 100vw)')
          : sheetSizeToCss(width, '100%'),
      [placement, width],
    );

    const heightCss = useMemo(
      () =>
        placement === 'top' || placement === 'bottom'
          ? sheetSizeToCss(height, DEFAULT_VERTICAL_SHEET_HEIGHT)
          : sheetSizeToCss(height, '100%'),
      [placement, height],
    );

    if (!mountNode) {
      return null;
    }

    return createPortal(
      <AnimatePresence>
        {isOpen ? (
          <SheetOverlay
            $sheetPlacement={placement}
            $overlayVariant={overlayVariant}
            initial={sheetOverlayMotion.initial}
            animate={sheetOverlayMotion.animate}
            exit={sheetOverlayMotion.exit}
            transition={sheetOverlayMotion.transition}
            onClick={handleOverlayClick}
            className={overlayClassName}
            style={overlayInlineStyle}
            data-sheet-overlay
          >
            <SheetPanel
              ref={setPanelRef}
              $widthCss={widthCss}
              $heightCss={heightCss}
              $placement={placement}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? titleId : undefined}
              className={clsx('ui-sheet', className)}
              initial={panelMotion.initial}
              animate={panelMotion.animate}
              exit={panelMotion.exit}
              transition={panelMotion.transition}
              onClick={e => e.stopPropagation()}
            >
              {headerSlot ? (
                <SheetHeader>{headerSlot}</SheetHeader>
              ) : (title || showCloseButton) && (
                <SheetHeader>
                  {title ? <SheetTitle id={titleId}>{title}</SheetTitle> : null}
                  {!title && showCloseButton ? (
                    <SheetHeaderSpacer aria-hidden />
                  ) : null}
                  {showCloseButton ? (
                    <CloseButton type="button" onClick={onClose} aria-label="Закрыть">
                      <Icon name="PhosphorX" size={IconSize.MD} color="#9E9E9E" />
                    </CloseButton>
                  ) : null}
                </SheetHeader>
              )}
              <SheetBody ref={contentRef} tabIndex={-1}>
                {children}
              </SheetBody>
            </SheetPanel>
          </SheetOverlay>
        ) : null}
      </AnimatePresence>,
      mountNode,
    );
  },
);

Sheet.displayName = 'Sheet';
