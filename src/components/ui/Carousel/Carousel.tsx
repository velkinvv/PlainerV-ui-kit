import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from 'styled-components';
import {
  CarouselAnimation,
  CarouselDotsPosition,
  CarouselNavigation,
  CarouselOrientation,
  CarouselProgressBarPosition,
  type CarouselProps,
  type CarouselSlideProps,
} from '../../../types/ui';
import { IconSize, Size } from '../../../types/sizes';
import type { ThemeType } from '../../../types/theme';
import { Icon } from '../Icon/Icon';
import {
  CarouselArrowsLayer,
  CarouselArrowButton,
  CarouselAutoplayButton,
  CarouselControlsFooter,
  CarouselCrossfadeSlide,
  CarouselCrossfadeViewport,
  CarouselDotButton,
  CarouselDotsList,
  CarouselMainStage,
  CarouselRoot,
  CarouselSlidePane,
  CarouselSlidePlaceholder,
  CarouselSlideShell,
  CarouselTrack,
  CarouselViewport,
  getCarouselShellBorderRadius,
} from './Carousel.style';
import { CarouselSlide } from './CarouselSlide';
import { CarouselDisplayContext } from './CarouselDisplayContext';
import { CarouselSlideInteractionContext } from './CarouselSlideInteractionContext';
import { CarouselImage } from './CarouselImage';
import { CarouselCaption } from './CarouselCaption';
import { CarouselSlideOverlay } from './CarouselSlideOverlay';
import {
  CarouselSlideOverlayPanel,
  CarouselSlideOverlayPanelText,
  CarouselSlideOverlayPanelTitle,
} from './CarouselSlideOverlayPanel';
import { CarouselThumbnails } from './CarouselThumbnails';
import { CarouselFullscreen } from './CarouselFullscreen';
import { CarouselProgressBar } from './CarouselProgressBar';
import { CarouselAutoplayProgress } from './CarouselAutoplayProgress';
import { CarouselAutoplayProgressCountdown } from './CarouselAutoplayProgress.style';
import { CarouselEffectSlides } from './CarouselEffectSlides';
import type { CarouselEffectAnimationType } from './CarouselEffectSlides';
import { CarouselParallaxContext } from './CarouselParallaxContext';
import { CarouselParallaxLayer } from './CarouselParallaxLayer';
import {
  CarouselFullscreenOpenLayer,
  CarouselOverlayUtilityButton,
} from './CarouselFullscreen.style';
import {
  carouselHasRenderableThumbnails,
  extractCarouselSlideThumbnails,
} from '../../../handlers/carouselThumbnailHandlers';
import { extractCarouselSlideMediaList } from '../../../handlers/carouselSlideMediaHandlers';
import {
  buildCarouselSlideChangeEvent,
  extractCarouselSlideInfoList,
  getCarouselSlideInfoAtIndex,
  shouldIgnoreCarouselSlideClickTarget,
} from '../../../handlers/carouselSlideInfoHandlers';
import {
  applyCarouselDisplayOrder,
  buildCarouselSlideOrderSignature,
  createCarouselDisplayOrder,
} from '../../../handlers/carouselRandomHandlers';
import {
  applyCarouselKeyboardAction,
  resolveCarouselKeyboardAction,
} from '../../../handlers/carouselKeyboardHandlers';
import {
  getCarouselAutoplayAriaLabel,
  getCarouselDotsListAriaLabel,
  getCarouselNextSlideAriaLabel,
  getCarouselPreviousSlideAriaLabel,
  getCarouselSlideDotAriaLabel,
  type CarouselAriaLabels,
} from '../../../handlers/carouselAriaLabelHandlers';
import {
  getCarouselSlideIdAtIndex,
  resolveCarouselActiveIndex,
  resolveCarouselDefaultActiveIndex,
} from '../../../handlers/carouselSlideIdHandlers';
import {
  getCarouselSlideIndicesToPreload,
  preloadCarouselImageSrc,
  shouldRenderCarouselSlide,
} from '../../../handlers/carouselLazySlideHandlers';
import {
  getCarouselNextArrowIconName,
  getCarouselPreviousArrowIconName,
  getCarouselViewportTouchAction,
  isCarouselVerticalOrientation,
  resolveCarouselAspectRatio,
} from '../../../handlers/carouselOrientationHandlers';
import {
  getCarouselPointerPrimaryCoordinate,
  isCarouselPointerDragGesture,
} from '../../../handlers/carouselSwipeHandlers';
import {
  appendCarouselPointerVelocitySample,
  applyCarouselDragResistance,
  calculateCarouselPointerVelocity,
  getCarouselViewportPrimarySize,
  resolveCarouselDragReleaseIndex,
} from '../../../handlers/carouselDragHandlers';
import {
  CAROUSEL_PARALLAX_BACKGROUND_RATIO,
  CAROUSEL_PARALLAX_OVERLAY_RATIO,
  isCarouselParallaxEnabled,
  resolveCarouselAnimation,
} from '../../../handlers/carouselParallaxHandlers';
import { resolveCarouselSlideElements } from '../../../handlers/carouselSlideItemsHandlers';
import { useCarouselParallaxMotion } from '../../../hooks/useCarouselParallaxMotion';
import { useCarouselAutoplayProgress } from '../../../hooks/useCarouselAutoplayProgress';
import { getCarouselAutoplayRemainingSeconds } from '../../../handlers/carouselAutoplayProgressHandlers';
import {
  canGoToNextCarouselSlide,
  canGoToPreviousCarouselSlide,
  carouselShowsArrows,
  carouselShowsDots,
  carouselShowsThumbnails,
  clampCarouselIndex,
  getCarouselAriaLive,
  getCarouselCrossfadeDuration,
  getCarouselSlideAriaLabel,
  getCarouselSlideTransition,
  getNextCarouselIndex,
  getPreviousCarouselIndex,
  getCarouselEffectTransition,
  isCarouselEffectAnimation,
  isCarouselSlideTrackAnimation,
  shouldIgnoreCarouselSwipePointerTarget,
} from './handlers';

const DEFAULT_AUTOPLAY_INTERVAL_MS = 5000;

const DEFAULT_ANIMATION_DURATION_MS = 350;

const DEFAULT_THUMBNAIL_HEIGHT = 72;

const DEFAULT_VISIBLE_SLIDES_RANGE = 1;

/**
 * Карусель изображений: slide / fade / scale анимации, стрелки, точки, свайп, автопрокрутка.
 * @param props — см. `CarouselProps`
 */
export const Carousel: React.FC<CarouselProps> & {
  Slide: typeof CarouselSlide;
  Image: typeof CarouselImage;
  Caption: typeof CarouselCaption;
  Overlay: typeof CarouselSlideOverlay;
  OverlayPanel: typeof CarouselSlideOverlayPanel & {
    Title: typeof CarouselSlideOverlayPanelTitle;
    Text: typeof CarouselSlideOverlayPanelText;
  };
  ParallaxLayer: typeof CarouselParallaxLayer;
} = ({
  activeIndex: activeIndexProp,
  activeSlideId: activeSlideIdProp,
  defaultActiveIndex = 0,
  defaultSlideId,
  onActiveIndexChange,
  onActiveSlideIdChange,
  onSlideChange,
  onSlideClick,
  onThumbnailClick,
  onTitleClick,
  random = false,
  randomSeed,
  loop = false,
  animation = CarouselAnimation.SLIDE,
  animationDuration = DEFAULT_ANIMATION_DURATION_MS,
  navigation = CarouselNavigation.BOTH,
  dotsPosition = CarouselDotsPosition.INNER,
  thumbnails = false,
  thumbnailHeight = DEFAULT_THUMBNAIL_HEIGHT,
  showCaption = true,
  fullscreen = false,
  fullscreenOpenAriaLabel = 'Открыть слайд на весь экран',
  fullscreenCloseAriaLabel = 'Закрыть полноэкранный режим',
  fullscreenOverlayAriaLabel,
  fullscreenCounterAriaLabel,
  onFullscreenChange,
  autoplay = false,
  autoplayInterval = DEFAULT_AUTOPLAY_INTERVAL_MS,
  pauseOnHover = true,
  pauseOnFocus = true,
  swipeEnabled = true,
  visibleSlidesRange = DEFAULT_VISIBLE_SLIDES_RANGE,
  preloadAdjacentSlides = true,
  keyboardEnabled = true,
  previousSlideAriaLabel,
  nextSlideAriaLabel,
  dotsListAriaLabel,
  slideDotAriaLabel,
  autoplayPauseAriaLabel,
  autoplayPlayAriaLabel,
  orientation = CarouselOrientation.HORIZONTAL,
  showProgressBar = false,
  progressBarPosition = CarouselProgressBarPosition.INNER,
  progressBarAriaLabel,
  showAutoplayProgress = false,
  showAutoplayCountdown = true,
  autoplayProgressAriaLabel,
  parallax = false,
  parallaxBackgroundRatio = CAROUSEL_PARALLAX_BACKGROUND_RATIO,
  parallaxForegroundRatio = CAROUSEL_PARALLAX_OVERLAY_RATIO,
  aspectRatio = '16 / 9',
  height,
  size = Size.MD,
  className,
  children,
  items,
  'aria-label': ariaLabel,
}) => {
  const theme = useTheme() as ThemeType;
  const reducedMotion = useReducedMotion();
  const resolvedAnimation = resolveCarouselAnimation(animation);
  const parallaxEnabled = isCarouselParallaxEnabled(animation, parallax);
  const slideElements = useMemo(
    () => resolveCarouselSlideElements({ children, items }),
    [children, items],
  );
  const slideCount = slideElements.length;
  const slideSignature = useMemo(
    () => buildCarouselSlideOrderSignature(slideElements),
    [slideElements],
  );
  const displayOrder = useMemo(
    () => createCarouselDisplayOrder(slideCount, random, randomSeed),
    [random, randomSeed, slideCount, slideSignature],
  );
  const orderedSlideElements = useMemo(
    () => applyCarouselDisplayOrder(slideElements, displayOrder),
    [displayOrder, slideElements],
  );
  const slideThumbnails = useMemo(
    () => extractCarouselSlideThumbnails(orderedSlideElements),
    [orderedSlideElements],
  );
  const slideMediaList = useMemo(
    () => extractCarouselSlideMediaList(orderedSlideElements),
    [orderedSlideElements],
  );
  const slideInfoList = useMemo(
    () => extractCarouselSlideInfoList(orderedSlideElements),
    [orderedSlideElements],
  );

  const isIndexControlled = activeIndexProp !== undefined && activeSlideIdProp === undefined;
  const isSlideIdControlled = activeSlideIdProp !== undefined;
  const isControlled = isIndexControlled || isSlideIdControlled;

  const [internalIndex, setInternalIndex] = useState(() =>
    resolveCarouselDefaultActiveIndex(slideInfoList, defaultActiveIndex, defaultSlideId, slideCount),
  );

  const [autoplayRunning, setAutoplayRunning] = useState(autoplay);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusedWithin, setIsFocusedWithin] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const pointerStartPrimaryRef = useRef<number | null>(null);
  const pointerVelocitySamplesRef = useRef<
    Array<{ coordinate: number; timestamp: number }>
  >([]);
  const viewportPrimarySizeRef = useRef(0);
  const pendingDragOffsetRef = useRef(0);
  const dragAnimationFrameRef = useRef<number | null>(null);
  const suppressSlideClickRef = useRef(false);
  const previousDisplayOrderRef = useRef<string | null>(null);

  const activeIndex = useMemo(
    () =>
      resolveCarouselActiveIndex({
        activeIndexProp,
        activeSlideIdProp,
        slideInfoList,
        internalIndex,
        defaultActiveIndex,
        defaultSlideId,
        slideCount,
      }),
    [
      activeIndexProp,
      activeSlideIdProp,
      defaultActiveIndex,
      defaultSlideId,
      internalIndex,
      slideCount,
      slideInfoList,
    ],
  );

  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const ariaLabels = useMemo<CarouselAriaLabels>(
    () => ({
      previousSlideAriaLabel,
      nextSlideAriaLabel,
      dotsListAriaLabel,
      slideDotAriaLabel,
      autoplayPauseAriaLabel,
      autoplayPlayAriaLabel,
      fullscreenOverlayAriaLabel,
      fullscreenCounterAriaLabel,
    }),
    [
      autoplayPauseAriaLabel,
      autoplayPlayAriaLabel,
      dotsListAriaLabel,
      fullscreenCounterAriaLabel,
      fullscreenOverlayAriaLabel,
      nextSlideAriaLabel,
      previousSlideAriaLabel,
      slideDotAriaLabel,
    ],
  );

  const isVerticalOrientation = isCarouselVerticalOrientation(orientation);
  const resolvedAspectRatio = resolveCarouselAspectRatio(orientation, aspectRatio, height);
  const useSlideTrackInteractiveDrag =
    swipeEnabled && slideCount > 1 && isCarouselSlideTrackAnimation(resolvedAnimation);
  const viewportTouchAction = isDragging
    ? 'none'
    : getCarouselViewportTouchAction(swipeEnabled, orientation);
  const previousArrowIconName = getCarouselPreviousArrowIconName(orientation);
  const nextArrowIconName = getCarouselNextArrowIconName(orientation);
  const showProgressBarInner =
    showProgressBar && progressBarPosition === CarouselProgressBarPosition.INNER && slideCount > 1;
  const showProgressBarOuter =
    showProgressBar && progressBarPosition === CarouselProgressBarPosition.OUTER && slideCount > 1;
  const showAutoplayProgressInner =
    showAutoplayProgress && autoplay && slideCount > 1 && progressBarPosition !== CarouselProgressBarPosition.OUTER;
  const showAutoplayProgressOuter =
    showAutoplayProgress && autoplay && slideCount > 1 && progressBarPosition === CarouselProgressBarPosition.OUTER;

  const parallaxTransitionDurationMs = reducedMotion ? 0 : animationDuration;
  const { motionIndex, viewportPrimarySize } = useCarouselParallaxMotion({
    activeIndex,
    dragOffsetPx,
    isDragging,
    animationDuration: parallaxTransitionDurationMs,
    reducedMotion: Boolean(reducedMotion),
    viewportRef,
    orientation,
    enabled: parallaxEnabled,
  });
  const parallaxContextValue = useMemo(
    () => ({
      enabled: parallaxEnabled,
      motionIndex,
      viewportPrimarySize,
      orientation,
      reducedMotion: Boolean(reducedMotion),
      isDragging,
      transitionDurationMs: parallaxTransitionDurationMs,
      backgroundRatio: parallaxBackgroundRatio,
      foregroundRatio: parallaxForegroundRatio,
    }),
    [
      isDragging,
      motionIndex,
      orientation,
      parallaxBackgroundRatio,
      parallaxEnabled,
      parallaxForegroundRatio,
      parallaxTransitionDurationMs,
      reducedMotion,
      viewportPrimarySize,
    ],
  );

  const scheduleDragOffsetUpdate = useCallback((nextDragOffsetPx: number) => {
    pendingDragOffsetRef.current = nextDragOffsetPx;

    if (dragAnimationFrameRef.current !== null) {
      return;
    }

    dragAnimationFrameRef.current = window.requestAnimationFrame(() => {
      setDragOffsetPx(pendingDragOffsetRef.current);
      dragAnimationFrameRef.current = null;
    });
  }, []);

  const resetCarouselDragState = useCallback(() => {
    pointerStartPrimaryRef.current = null;
    pointerVelocitySamplesRef.current = [];
    viewportPrimarySizeRef.current = 0;
    pendingDragOffsetRef.current = 0;

    if (dragAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(dragAnimationFrameRef.current);
      dragAnimationFrameRef.current = null;
    }

    setDragOffsetPx(0);
    setIsDragging(false);
  }, []);

  useEffect(
    () => () => {
      if (dragAnimationFrameRef.current !== null) {
        window.cancelAnimationFrame(dragAnimationFrameRef.current);
      }
    },
    [],
  );

  const notifySlideChange = useCallback(
    (nextIndex: number) => {
      if (!onSlideChange) {
        return;
      }

      onSlideChange(buildCarouselSlideChangeEvent(slideInfoList, nextIndex, loop));
    },
    [loop, onSlideChange, slideInfoList],
  );

  const setActiveIndex = useCallback(
    (nextIndex: number) => {
      if (slideCount <= 0) {
        return;
      }

      const clampedIndex = clampCarouselIndex(nextIndex, slideCount);
      const previousActiveIndex = activeIndexRef.current;

      if (clampedIndex === previousActiveIndex) {
        return;
      }

      if (!isControlled) {
        setInternalIndex(clampedIndex);
      }

      onActiveIndexChange?.(clampedIndex);
      onActiveSlideIdChange?.(getCarouselSlideIdAtIndex(slideInfoList, clampedIndex));
      notifySlideChange(clampedIndex);
    },
    [
      isControlled,
      notifySlideChange,
      onActiveIndexChange,
      onActiveSlideIdChange,
      slideCount,
      slideInfoList,
    ],
  );

  useEffect(() => {
    if (!onSlideChange || slideCount <= 0) {
      return;
    }

    notifySlideChange(activeIndex);
    // Начальное состояние при монтировании
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isControlled && slideCount > 0) {
      setInternalIndex((previousIndex) => clampCarouselIndex(previousIndex, slideCount));
    }
  }, [isControlled, slideCount]);

  useEffect(() => {
    const displayOrderKey = displayOrder.join(',');

    if (previousDisplayOrderRef.current === null) {
      previousDisplayOrderRef.current = displayOrderKey;
      return;
    }

    if (previousDisplayOrderRef.current === displayOrderKey) {
      return;
    }

    previousDisplayOrderRef.current = displayOrderKey;

    if (!isControlled && slideCount > 0) {
      setInternalIndex(
        resolveCarouselDefaultActiveIndex(slideInfoList, defaultActiveIndex, defaultSlideId, slideCount),
      );
    }
  }, [
    defaultActiveIndex,
    defaultSlideId,
    displayOrder,
    isControlled,
    slideCount,
    slideInfoList,
  ]);

  useEffect(() => {
    setAutoplayRunning(autoplay);
  }, [autoplay]);

  useEffect(() => {
    if (!fullscreen && isFullscreenOpen) {
      setIsFullscreenOpen(false);
      onFullscreenChange?.(false);
    }
  }, [fullscreen, isFullscreenOpen, onFullscreenChange]);

  useEffect(() => {
    if (!preloadAdjacentSlides || slideCount <= 0) {
      return;
    }

    const preloadIndices = getCarouselSlideIndicesToPreload(activeIndex, slideCount, loop);

    preloadIndices.forEach((slideIndex) => {
      preloadCarouselImageSrc(slideInfoList[slideIndex]?.imageSrc);
    });
  }, [activeIndex, loop, preloadAdjacentSlides, slideCount, slideInfoList]);

  const goToPrevious = useCallback(() => {
    setActiveIndex(getPreviousCarouselIndex(activeIndex, slideCount, loop));
  }, [activeIndex, loop, setActiveIndex, slideCount]);

  const goToNext = useCallback(() => {
    setActiveIndex(getNextCarouselIndex(activeIndex, slideCount, loop));
  }, [activeIndex, loop, setActiveIndex, slideCount]);

  const handleFullscreenOpen = useCallback(() => {
    setIsFullscreenOpen(true);
    onFullscreenChange?.(true);
  }, [onFullscreenChange]);

  const handleFullscreenClose = useCallback(() => {
    setIsFullscreenOpen(false);
    onFullscreenChange?.(false);
  }, [onFullscreenChange]);

  const handleCarouselKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (keyboardEnabled === false || slideCount <= 1) {
        return;
      }

      const keyboardAction = resolveCarouselKeyboardAction(event, orientation);

      if (!keyboardAction) {
        return;
      }

      event.preventDefault();
      setActiveIndex(applyCarouselKeyboardAction(keyboardAction, activeIndex, slideCount, loop));
    },
    [activeIndex, keyboardEnabled, loop, orientation, setActiveIndex, slideCount],
  );

  const autoplayPaused =
    !autoplayRunning ||
    (pauseOnHover && isHovered) ||
    (pauseOnFocus && isFocusedWithin) ||
    isDragging ||
    isFullscreenOpen;

  const { progressRatio: autoplayProgressRatio } = useCarouselAutoplayProgress({
    autoplay: Boolean(showAutoplayProgress && autoplay),
    autoplayRunning,
    autoplayPaused,
    autoplayInterval,
    activeIndex,
    reducedMotion: Boolean(reducedMotion),
  });

  useEffect(() => {
    if (!autoplay || autoplayPaused || slideCount <= 1) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      const nextIndex = getNextCarouselIndex(activeIndexRef.current, slideCount, loop);
      setActiveIndex(nextIndex);
    }, autoplayInterval);

    return () => {
      window.clearInterval(timerId);
    };
  }, [autoplay, autoplayInterval, autoplayPaused, loop, setActiveIndex, slideCount]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!swipeEnabled || slideCount <= 1) {
        return;
      }

      if (event.pointerType === 'mouse' && event.button !== 0) {
        return;
      }

      if (shouldIgnoreCarouselSwipePointerTarget(event.target)) {
        return;
      }

      const viewportElement = viewportRef.current;
      viewportPrimarySizeRef.current = getCarouselViewportPrimarySize(viewportElement, orientation);
      pointerStartPrimaryRef.current = getCarouselPointerPrimaryCoordinate(event, orientation);
      pointerVelocitySamplesRef.current = appendCarouselPointerVelocitySample(
        [],
        pointerStartPrimaryRef.current,
        event.timeStamp,
      );
      suppressSlideClickRef.current = false;
      pendingDragOffsetRef.current = 0;
      setDragOffsetPx(0);
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [orientation, slideCount, swipeEnabled],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (pointerStartPrimaryRef.current == null) {
        return;
      }

      const currentPrimary = getCarouselPointerPrimaryCoordinate(event, orientation);
      const rawDragDeltaPrimaryPx = pointerStartPrimaryRef.current - currentPrimary;
      const resistedDragOffsetPx = applyCarouselDragResistance(
        rawDragDeltaPrimaryPx,
        activeIndexRef.current,
        slideCount,
        loop,
      );

      pointerVelocitySamplesRef.current = appendCarouselPointerVelocitySample(
        pointerVelocitySamplesRef.current,
        currentPrimary,
        event.timeStamp,
      );

      if (isCarouselPointerDragGesture(pointerStartPrimaryRef.current, currentPrimary)) {
        suppressSlideClickRef.current = true;
      }

      if (useSlideTrackInteractiveDrag) {
        scheduleDragOffsetUpdate(resistedDragOffsetPx);
      }
    },
    [loop, orientation, scheduleDragOffsetUpdate, slideCount, useSlideTrackInteractiveDrag],
  );

  const finishPointerGesture = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!swipeEnabled || pointerStartPrimaryRef.current == null) {
        resetCarouselDragState();
        return;
      }

      const currentPrimary = getCarouselPointerPrimaryCoordinate(event, orientation);
      const rawDragDeltaPrimaryPx = pointerStartPrimaryRef.current - currentPrimary;
      const resistedDragOffsetPx = applyCarouselDragResistance(
        rawDragDeltaPrimaryPx,
        activeIndexRef.current,
        slideCount,
        loop,
      );
      const velocityPrimary = calculateCarouselPointerVelocity(pointerVelocitySamplesRef.current);
      const viewportPrimarySize =
        viewportPrimarySizeRef.current ||
        getCarouselViewportPrimarySize(viewportRef.current, orientation);
      const targetIndex = resolveCarouselDragReleaseIndex({
        activeIndex: activeIndexRef.current,
        dragDeltaPrimaryPx: resistedDragOffsetPx,
        viewportPrimarySize,
        slideCount,
        loop,
        velocityPrimary,
      });

      if (targetIndex !== activeIndexRef.current) {
        suppressSlideClickRef.current = true;
        setActiveIndex(targetIndex);
      }

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      resetCarouselDragState();
    },
    [loop, orientation, resetCarouselDragState, setActiveIndex, slideCount, swipeEnabled],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      finishPointerGesture(event);
    },
    [finishPointerGesture],
  );

  const handlePointerCancel = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      suppressSlideClickRef.current = true;
      finishPointerGesture(event);
    },
    [finishPointerGesture],
  );

  const handleSlideClick = useCallback(
    (slideIndex: number, nativeEvent: React.MouseEvent<HTMLElement>) => {
      if (!onSlideClick) {
        return;
      }

      if (suppressSlideClickRef.current) {
        suppressSlideClickRef.current = false;
        return;
      }

      if (shouldIgnoreCarouselSlideClickTarget(nativeEvent.target)) {
        return;
      }

      onSlideClick({
        slide: getCarouselSlideInfoAtIndex(slideInfoList, slideIndex),
        nativeEvent,
      });
    },
    [onSlideClick, slideInfoList],
  );

  const handleThumbnailClick = useCallback(
    (slideIndex: number, nativeEvent: React.MouseEvent<HTMLButtonElement>) => {
      if (!onThumbnailClick) {
        return;
      }

      onThumbnailClick({
        slide: getCarouselSlideInfoAtIndex(slideInfoList, slideIndex),
        nativeEvent,
      });
    },
    [onThumbnailClick, slideInfoList],
  );

  const showArrows = carouselShowsArrows(navigation) && slideCount > 1;
  const showDots = carouselShowsDots(navigation) && slideCount > 1;
  const showThumbnails =
    carouselShowsThumbnails(navigation, thumbnails) &&
    slideCount > 1 &&
    carouselHasRenderableThumbnails(slideThumbnails);
  const showFullscreenOpenButton = fullscreen && slideCount > 0;
  const shellBorderRadius = getCarouselShellBorderRadius(theme, size);
  const slideTransition = getCarouselSlideTransition(animationDuration, Boolean(reducedMotion));
  const crossfadeDuration = getCarouselCrossfadeDuration(animationDuration, Boolean(reducedMotion));
  const effectTransition = getCarouselEffectTransition(animationDuration, Boolean(reducedMotion));
  const useSlideTrack = isCarouselSlideTrackAnimation(resolvedAnimation);
  const useEffectAnimation = isCarouselEffectAnimation(resolvedAnimation);
  const ariaLive = getCarouselAriaLive(autoplay && autoplayRunning && !autoplayPaused);
  const previousSlideAriaLabelText = getCarouselPreviousSlideAriaLabel(ariaLabels);
  const nextSlideAriaLabelText = getCarouselNextSlideAriaLabel(ariaLabels);
  const dotsListAriaLabelText = getCarouselDotsListAriaLabel(ariaLabels);
  const autoplayAriaLabelText = getCarouselAutoplayAriaLabel(autoplayRunning, ariaLabels);
  const carouselDisplayContextValue = useMemo(
    () => ({
      showCaption,
      onTitleClick,
    }),
    [onTitleClick, showCaption],
  );

  if (slideCount === 0) {
    return null;
  }

  const renderSlideShell = (slideElement: React.ReactElement<CarouselSlideProps>, slideIndex: number) => {
    const slideLabel = slideElement.props?.slideLabel;
    const isActive = slideIndex === activeIndex;
    const slideInfo = getCarouselSlideInfoAtIndex(slideInfoList, slideIndex);
    const shouldRenderSlideContent = shouldRenderCarouselSlide(
      slideIndex,
      activeIndex,
      visibleSlidesRange,
    );

    return (
      <CarouselSlideInteractionContext.Provider
        value={{
          slideIndex,
          slideInfo,
        }}
      >
        <CarouselSlideShell
          role="group"
          aria-roledescription="slide"
          aria-label={getCarouselSlideAriaLabel(slideIndex, slideCount, slideLabel)}
          aria-hidden={!isActive}
          data-carousel-slide=""
          data-carousel-slide-clickable={onSlideClick ? '' : undefined}
          onClick={(event) => handleSlideClick(slideIndex, event)}
        >
          {shouldRenderSlideContent ? slideElement : <CarouselSlidePlaceholder aria-hidden />}
        </CarouselSlideShell>
      </CarouselSlideInteractionContext.Provider>
    );
  };

  const activeSlideElement = orderedSlideElements[activeIndex];

  return (
    <CarouselDisplayContext.Provider value={carouselDisplayContextValue}>
      <CarouselRoot
        className={clsx('ui-carousel', className)}
        aria-label={ariaLabel}
        aria-roledescription="carousel"
        aria-live={ariaLive}
        tabIndex={keyboardEnabled === false ? undefined : 0}
        $hasThumbnails={showThumbnails}
        $shellBorderRadius={shellBorderRadius}
        onKeyDown={handleCarouselKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsFocusedWithin(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsFocusedWithin(false);
          }
        }}
      >
        <CarouselMainStage
          $aspectRatio={resolvedAspectRatio}
          $height={height ? (typeof height === 'number' ? `${height}px` : height) : undefined}
          $hasThumbnails={showThumbnails}
          $shellBorderRadius={shellBorderRadius}
        >
          <CarouselViewport
            ref={viewportRef}
            $touchAction={viewportTouchAction}
            $isSwipeEnabled={swipeEnabled && slideCount > 1}
            $isDragging={isDragging}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            {showProgressBarInner ? (
              <CarouselProgressBar
                slideCount={slideCount}
                activeIndex={activeIndex}
                position={CarouselProgressBarPosition.INNER}
                autoplay={autoplay}
                autoplayRunning={autoplayRunning}
                autoplayPaused={autoplayPaused}
                autoplayInterval={autoplayInterval}
                reducedMotion={Boolean(reducedMotion)}
                progressBarAriaLabel={progressBarAriaLabel}
              />
            ) : null}

            {showAutoplayProgressInner ? (
              <CarouselAutoplayProgress
                progressRatio={autoplayProgressRatio}
                autoplayInterval={autoplayInterval}
                position={CarouselProgressBarPosition.INNER}
                autoplayProgressAriaLabel={autoplayProgressAriaLabel}
              />
            ) : null}

            <CarouselParallaxContext.Provider value={parallaxContextValue}>
            {useSlideTrack ? (
              <CarouselTrack
                $activeIndex={activeIndex}
                $transition={slideTransition}
                $orientation={orientation}
                $dragOffsetPx={dragOffsetPx}
                $isDragging={isDragging}
              >
                {orderedSlideElements.map((slideElement, slideIndex) => (
                  <CarouselSlidePane key={slideElement.key ?? slideIndex}>
                    {renderSlideShell(slideElement, slideIndex)}
                  </CarouselSlidePane>
                ))}
              </CarouselTrack>
            ) : useEffectAnimation ? (
              <CarouselEffectSlides
                animation={resolvedAnimation as CarouselEffectAnimationType}
                activeIndex={activeIndex}
                orientation={orientation}
                effectTransition={effectTransition}
                orderedSlideElements={orderedSlideElements}
                renderSlideShell={renderSlideShell}
              />
            ) : (
              <CarouselCrossfadeViewport>
                {orderedSlideElements.map((slideElement, slideIndex) => {
                  if (
                    !shouldRenderCarouselSlide(slideIndex, activeIndex, visibleSlidesRange)
                  ) {
                    return null;
                  }

                  return (
                    <CarouselCrossfadeSlide
                      key={slideElement.key ?? slideIndex}
                      $isActive={slideIndex === activeIndex}
                      $animation={resolvedAnimation}
                      $crossfadeDuration={crossfadeDuration}
                    >
                      {renderSlideShell(slideElement, slideIndex)}
                    </CarouselCrossfadeSlide>
                  );
                })}
              </CarouselCrossfadeViewport>
            )}
            </CarouselParallaxContext.Provider>

            {showArrows ? (
              <CarouselArrowsLayer $isVertical={isVerticalOrientation}>
                <CarouselArrowButton
                  type="button"
                  data-carousel-control=""
                  $size={size}
                  aria-label={previousSlideAriaLabelText}
                  disabled={!canGoToPreviousCarouselSlide(activeIndex, loop)}
                  onClick={goToPrevious}
                >
                  <Icon name={previousArrowIconName} size={IconSize.SM} color="currentColor" />
                </CarouselArrowButton>
                <CarouselArrowButton
                  type="button"
                  data-carousel-control=""
                  $size={size}
                  aria-label={nextSlideAriaLabelText}
                  disabled={!canGoToNextCarouselSlide(activeIndex, slideCount, loop)}
                  onClick={goToNext}
                >
                  <Icon name={nextArrowIconName} size={IconSize.SM} color="currentColor" />
                </CarouselArrowButton>
              </CarouselArrowsLayer>
            ) : null}

            {showFullscreenOpenButton ? (
              <CarouselFullscreenOpenLayer>
                <CarouselOverlayUtilityButton
                  type="button"
                  data-carousel-control=""
                  $size={size}
                  aria-label={fullscreenOpenAriaLabel}
                  onClick={handleFullscreenOpen}
                >
                  <Icon name="IconExScreen" size={IconSize.SM} color="currentColor" />
                </CarouselOverlayUtilityButton>
              </CarouselFullscreenOpenLayer>
            ) : null}

            {showDots || autoplay ? (
              <CarouselControlsFooter
                $dotsPosition={dotsPosition}
                $orientation={orientation}
              >
                {showDots ? (
                  <CarouselDotsList
                    $isVertical={isVerticalOrientation}
                    aria-label={dotsListAriaLabelText}
                  >
                    {orderedSlideElements.map((_slideElement, slideIndex) => (
                      <li key={slideIndex}>
                        <CarouselDotButton
                          type="button"
                          data-carousel-control=""
                          $active={slideIndex === activeIndex}
                          aria-label={getCarouselSlideDotAriaLabel(
                            slideIndex,
                            slideCount,
                            ariaLabels,
                          )}
                          aria-current={slideIndex === activeIndex ? 'true' : undefined}
                          onClick={() => setActiveIndex(slideIndex)}
                        />
                      </li>
                    ))}
                  </CarouselDotsList>
                ) : null}
                {autoplay ? (
                  <CarouselAutoplayButton
                    type="button"
                    data-carousel-control=""
                    aria-label={autoplayAriaLabelText}
                    onClick={() => setAutoplayRunning((previousValue) => !previousValue)}
                  >
                    {autoplayRunning ? (
                      <Icon name="IconExPause" size={IconSize.SM} color="currentColor" />
                    ) : (
                      <Icon name="IconExPlay" size={IconSize.SM} color="currentColor" />
                    )}
                  </CarouselAutoplayButton>
                ) : null}
                {showAutoplayProgress && showAutoplayCountdown && autoplay ? (
                  <CarouselAutoplayProgressCountdown aria-hidden>
                    {getCarouselAutoplayRemainingSeconds(autoplayProgressRatio, autoplayInterval)} с
                  </CarouselAutoplayProgressCountdown>
                ) : null}
              </CarouselControlsFooter>
            ) : null}
          </CarouselViewport>
        </CarouselMainStage>

        {showAutoplayProgressOuter ? (
          <CarouselAutoplayProgress
            progressRatio={autoplayProgressRatio}
            autoplayInterval={autoplayInterval}
            position={CarouselProgressBarPosition.OUTER}
            autoplayProgressAriaLabel={autoplayProgressAriaLabel}
            showCountdown={showAutoplayCountdown}
          />
        ) : null}

        {showProgressBarOuter ? (
          <CarouselProgressBar
            slideCount={slideCount}
            activeIndex={activeIndex}
            position={CarouselProgressBarPosition.OUTER}
            autoplay={autoplay}
            autoplayRunning={autoplayRunning}
            autoplayPaused={autoplayPaused}
            autoplayInterval={autoplayInterval}
            reducedMotion={Boolean(reducedMotion)}
            progressBarAriaLabel={progressBarAriaLabel}
          />
        ) : null}

        {showThumbnails ? (
          <CarouselThumbnails
            slideThumbnails={slideThumbnails}
            activeIndex={activeIndex}
            slideCount={slideCount}
            onSelectSlide={setActiveIndex}
            onThumbnailClick={handleThumbnailClick}
            thumbnailHeight={thumbnailHeight}
            bottomBorderRadius={shellBorderRadius}
          />
        ) : null}

        <CarouselFullscreen
          isOpen={isFullscreenOpen}
          onClose={handleFullscreenClose}
          activeIndex={activeIndex}
          slideCount={slideCount}
          slideInfoList={slideInfoList}
          activeSlideElement={activeSlideElement}
          showCaption={showCaption}
          loop={loop}
          onPrevious={goToPrevious}
          onNext={goToNext}
          size={size}
          ariaLabels={ariaLabels}
          closeAriaLabel={fullscreenCloseAriaLabel}
        />
      </CarouselRoot>
    </CarouselDisplayContext.Provider>
  );
};

Carousel.displayName = 'Carousel';
Carousel.Slide = CarouselSlide;
Carousel.Image = CarouselImage;
Carousel.Caption = CarouselCaption;
Carousel.Overlay = CarouselSlideOverlay;
Carousel.OverlayPanel = Object.assign(CarouselSlideOverlayPanel, {
  Title: CarouselSlideOverlayPanelTitle,
  Text: CarouselSlideOverlayPanelText,
});
Carousel.ParallaxLayer = CarouselParallaxLayer;
