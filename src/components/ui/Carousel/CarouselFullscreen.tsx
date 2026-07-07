import React, { useCallback, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { StyleSheetManager } from 'styled-components';
import { IconSize, Size } from '../../../types/sizes';
import type { CarouselSlideInfo, CarouselSlideProps } from '../../../types/ui';
import { getCarouselSlideInfoAtIndex } from '../../../handlers/carouselSlideInfoHandlers';
import {
  getCarouselNextSlideAriaLabel,
  getCarouselPreviousSlideAriaLabel,
  getCarouselFullscreenCounterLabel,
  getCarouselFullscreenOverlayAriaLabel,
  type CarouselAriaLabels,
} from '../../../handlers/carouselAriaLabelHandlers';
import {
  getCarouselFullscreenAnimations,
  resolveCarouselFullscreenPortalHost,
  useCarouselFullscreenKeyboard,
} from '../../../handlers/carouselFullscreenHandlers';
import {
  useOverlayFocusTrap,
  useOverlayInitialFocus,
} from '../../../handlers/overlayFocusHandlers';
import { useOverlayPresentation } from '../../../hooks/useOverlayPresentation';
import { useOverlayVisibility } from '../../../hooks/useOverlayVisibility';
import { canGoToNextCarouselSlide, canGoToPreviousCarouselSlide } from './handlers';
import { Icon } from '../Icon/Icon';
import { CarouselSlideInteractionContext } from './CarouselSlideInteractionContext';
import {
  CarouselFullscreenArrowsLayer,
  CarouselFullscreenArrowButton,
  CarouselFullscreenCaption,
  CarouselFullscreenCloseButton,
  CarouselFullscreenContent,
  CarouselFullscreenCounter,
  CarouselFullscreenCustomContent,
  CarouselFullscreenHeader,
  CarouselFullscreenImage,
  CarouselFullscreenOverlay,
  CarouselFullscreenStage,
} from './CarouselFullscreen.style';

/** Пропсы полноэкранного просмотра карусели */
export type CarouselFullscreenProps = {
  /** Открыт ли полноэкранный режим */
  isOpen: boolean;
  /** Закрыть полноэкранный режим */
  onClose: () => void;
  /** Активный индекс слайда */
  activeIndex: number;
  /** Число слайдов */
  slideCount: number;
  /** Метаданные слайдов */
  slideInfoList: CarouselSlideInfo[];
  /** React-элемент активного слайда для произвольного контента */
  activeSlideElement?: React.ReactElement<CarouselSlideProps>;
  /** Показывать подпись слайда */
  showCaption: boolean;
  /** Зацикливание навигации */
  loop: boolean;
  /** Перейти к предыдущему слайду */
  onPrevious: () => void;
  /** Перейти к следующему слайду */
  onNext: () => void;
  /** Размер контролов */
  size?: Size;
  /** Локализованные aria-label контролов */
  ariaLabels?: CarouselAriaLabels;
  /** aria-label оверлея (устаревший проп, предпочтительнее ariaLabels) */
  overlayAriaLabel?: string;
  /** aria-label кнопки закрытия */
  closeAriaLabel?: string;
};

/**
 * Полноэкранный просмотр активного слайда карусели.
 * @param props — см. `CarouselFullscreenProps`
 */
export const CarouselFullscreen: React.FC<CarouselFullscreenProps> = ({
  isOpen,
  onClose,
  activeIndex,
  slideCount,
  slideInfoList,
  activeSlideElement,
  showCaption,
  loop,
  onPrevious,
  onNext,
  size = Size.MD,
  ariaLabels,
  overlayAriaLabel,
  closeAriaLabel = 'Закрыть полноэкранный режим',
}) => {
  const reducedMotion = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const portalHost = useMemo(() => resolveCarouselFullscreenPortalHost(), []);
  const mountNode = portalHost.root;
  const ownerDocument = mountNode?.ownerDocument;
  const { shouldRenderPortal, shouldRenderContent, isHidden, notifyPresenceExitComplete } =
    useOverlayVisibility({
      isOpen,
      unmountOnClose: true,
      lazy: true,
    });
  const { overlayPresentationStyle, ariaHidden } = useOverlayPresentation({
    isOpen,
    isHidden,
  });
  const fullscreenAnimations = useMemo(
    () => getCarouselFullscreenAnimations(Boolean(reducedMotion)),
    [reducedMotion],
  );
  const resolvedOverlayAriaLabel =
    overlayAriaLabel ?? getCarouselFullscreenOverlayAriaLabel(ariaLabels);
  const previousSlideAriaLabel = getCarouselPreviousSlideAriaLabel(ariaLabels);
  const nextSlideAriaLabel = getCarouselNextSlideAriaLabel(ariaLabels);
  const counterLabel = getCarouselFullscreenCounterLabel(activeIndex, slideCount, ariaLabels);

  useCarouselFullscreenKeyboard({
    isOpen,
    onClose,
    onPrevious,
    onNext,
    ownerDocument,
  });

  useOverlayInitialFocus({
    isOpen,
    initialFocusRef: closeButtonRef,
    fallbackRef: overlayRef,
    ownerDocument,
  });

  useOverlayFocusTrap(isOpen, overlayRef, ownerDocument);

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  if (!mountNode || !shouldRenderPortal) {
    return null;
  }

  const activeSlideInfo = getCarouselSlideInfoAtIndex(slideInfoList, activeIndex);
  const activeCaption = showCaption ? activeSlideInfo?.caption : undefined;
  const hasImage = Boolean(activeSlideInfo?.imageSrc);

  const fullscreenBody = (
    <CarouselFullscreenOverlay
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={resolvedOverlayAriaLabel}
      aria-hidden={ariaHidden}
      tabIndex={-1}
      data-carousel-fullscreen-overlay=""
      data-modal-overlay=""
      className="ui-carousel-fullscreen-overlay"
      style={overlayPresentationStyle}
      initial={fullscreenAnimations.overlay.initial}
      animate={fullscreenAnimations.overlay.animate}
      exit={fullscreenAnimations.overlay.exit}
      transition={fullscreenAnimations.overlay.transition}
      onClick={handleOverlayClick}
    >
      <CarouselFullscreenContent
        initial={fullscreenAnimations.content.initial}
        animate={fullscreenAnimations.content.animate}
        exit={fullscreenAnimations.content.exit}
        transition={fullscreenAnimations.content.transition}
        onClick={(event) => event.stopPropagation()}
      >
        <CarouselFullscreenHeader>
          <CarouselFullscreenCounter>{counterLabel}</CarouselFullscreenCounter>
          <CarouselFullscreenCloseButton
            ref={closeButtonRef}
            type="button"
            data-carousel-control=""
            $size={size}
            aria-label={closeAriaLabel}
            onClick={onClose}
          >
            <Icon name="PhosphorX" size={IconSize.SM} color="currentColor" />
          </CarouselFullscreenCloseButton>
        </CarouselFullscreenHeader>

        <CarouselFullscreenStage>
          {hasImage ? (
            <CarouselFullscreenImage
              src={activeSlideInfo.imageSrc ?? ''}
              alt={activeSlideInfo.imageAlt ?? ''}
              decoding="async"
              draggable={false}
            />
          ) : null}

          {!hasImage && activeSlideElement ? (
            <CarouselSlideInteractionContext.Provider
              value={{
                slideIndex: activeIndex,
                slideInfo: activeSlideInfo,
              }}
            >
              <CarouselFullscreenCustomContent>
                {activeSlideElement}
              </CarouselFullscreenCustomContent>
            </CarouselSlideInteractionContext.Provider>
          ) : null}

          {activeCaption ? (
            <CarouselFullscreenCaption>{activeCaption}</CarouselFullscreenCaption>
          ) : null}

          {slideCount > 1 ? (
            <CarouselFullscreenArrowsLayer>
              <CarouselFullscreenArrowButton
                type="button"
                data-carousel-control=""
                $size={size}
                aria-label={previousSlideAriaLabel}
                disabled={!canGoToPreviousCarouselSlide(activeIndex, loop)}
                onClick={onPrevious}
              >
                <Icon name="PhosphorCaretLeft" size={IconSize.SM} color="currentColor" />
              </CarouselFullscreenArrowButton>
              <CarouselFullscreenArrowButton
                type="button"
                data-carousel-control=""
                $size={size}
                aria-label={nextSlideAriaLabel}
                disabled={!canGoToNextCarouselSlide(activeIndex, slideCount, loop)}
                onClick={onNext}
              >
                <Icon name="PhosphorCaretRight" size={IconSize.SM} color="currentColor" />
              </CarouselFullscreenArrowButton>
            </CarouselFullscreenArrowsLayer>
          ) : null}
        </CarouselFullscreenStage>
      </CarouselFullscreenContent>
    </CarouselFullscreenOverlay>
  );

  return createPortal(
    <StyleSheetManager target={mountNode}>
      <AnimatePresence onExitComplete={notifyPresenceExitComplete}>
        {shouldRenderContent ? fullscreenBody : null}
      </AnimatePresence>
    </StyleSheetManager>,
    mountNode,
  );
};

CarouselFullscreen.displayName = 'CarouselFullscreen';
