import React from 'react';
import type {
  CarouselSlideInfo,
  CarouselSlideOverlayPanelGradient,
  CarouselSlideOverlayPanelPlacement,
  CarouselSlideOverlayPanelProps,
  CarouselSlideOverlayAlign,
} from '../types/ui';
import {
  CarouselSlideOverlayAlign as OverlayAlignEnum,
  CarouselSlideOverlayPanelGradient as OverlayPanelGradientEnum,
  CarouselSlideOverlayPanelPlacement as OverlayPanelPlacementEnum,
} from '../types/ui';
import { CAROUSEL_SLIDE_OVERLAY_PANEL_DISPLAY_NAME } from './carouselSlideOverlayConstants';

export { CAROUSEL_SLIDE_OVERLAY_PANEL_DISPLAY_NAME } from './carouselSlideOverlayConstants';

/** CSS-параметры flex-раскладки панели */
export type CarouselSlideOverlayPanelLayout = {
  /** justify-content */
  mainAxisAlignment: string;
  /** align-items */
  crossAxisAlignment: string;
  /** text-align для текстового содержимого */
  textAlignment: 'left' | 'center' | 'right';
};

/**
 * Возвращает flex-раскладку панели по placement и align.
 * @param placement — расположение панели
 * @param align — выравнивание содержимого
 */
export function getCarouselSlideOverlayPanelLayout(
  placement: CarouselSlideOverlayPanelPlacement,
  align: CarouselSlideOverlayAlign = OverlayAlignEnum.START,
): CarouselSlideOverlayPanelLayout {
  const crossAxisAlignment =
    align === OverlayAlignEnum.CENTER
      ? 'center'
      : align === OverlayAlignEnum.END
        ? 'flex-end'
        : 'flex-start';

  const textAlignment =
    align === OverlayAlignEnum.CENTER ? 'center' : align === OverlayAlignEnum.END ? 'right' : 'left';

  if (placement === OverlayPanelPlacementEnum.CENTER) {
    return {
      mainAxisAlignment: 'center',
      crossAxisAlignment,
      textAlignment,
    };
  }

  if (placement === OverlayPanelPlacementEnum.STRETCH) {
    return {
      mainAxisAlignment:
        align === OverlayAlignEnum.CENTER
          ? 'center'
          : align === OverlayAlignEnum.END
            ? 'flex-end'
            : 'flex-start',
      crossAxisAlignment,
      textAlignment,
    };
  }

  return {
    mainAxisAlignment: crossAxisAlignment,
    crossAxisAlignment: 'stretch',
    textAlignment,
  };
}

/**
 * Возвращает placement панели с дефолтом `bottom`.
 * @param placement — явное значение из пропсов
 */
export function resolveCarouselSlideOverlayPanelPlacement(
  placement: CarouselSlideOverlayPanelPlacement | undefined,
): CarouselSlideOverlayPanelPlacement {
  return placement ?? OverlayPanelPlacementEnum.BOTTOM;
}

/**
 * Возвращает gradient панели с дефолтом по placement.
 * @param gradient — явное значение из пропсов
 * @param placement — расположение панели
 */
export function resolveCarouselSlideOverlayPanelGradient(
  gradient: CarouselSlideOverlayPanelGradient | undefined,
  placement: CarouselSlideOverlayPanelPlacement,
): CarouselSlideOverlayPanelGradient {
  if (gradient) {
    return gradient;
  }

  if (placement === OverlayPanelPlacementEnum.TOP) {
    return OverlayPanelGradientEnum.TOP;
  }

  if (
    placement === OverlayPanelPlacementEnum.BOTTOM ||
    placement === OverlayPanelPlacementEnum.CENTER ||
    placement === OverlayPanelPlacementEnum.STRETCH
  ) {
    return OverlayPanelGradientEnum.BOTTOM;
  }

  return OverlayPanelGradientEnum.NONE;
}

/**
 * Рендерит содержимое панели с учётом render prop.
 * @param panelChildren — children Carousel.OverlayPanel
 * @param slideInfo — метаданные слайда
 */
export function resolveCarouselSlideOverlayPanelContent(
  panelChildren: CarouselSlideOverlayPanelProps['children'],
  slideInfo: CarouselSlideInfo | undefined,
): React.ReactNode {
  if (typeof panelChildren === 'function') {
    return slideInfo ? panelChildren(slideInfo) : null;
  }

  return panelChildren;
}

/**
 * Извлекает контентные панели из children слайда.
 * @param slideChildren — children Carousel.Slide
 */
export function extractCarouselSlideOverlayPanels(
  slideChildren: React.ReactNode,
): React.ReactElement<CarouselSlideOverlayPanelProps>[] {
  const childArray = React.Children.toArray(slideChildren);
  const overlayPanelElements: React.ReactElement<CarouselSlideOverlayPanelProps>[] = [];

  for (const child of childArray) {
    if (!React.isValidElement(child)) {
      continue;
    }

    const childType = child.type as { displayName?: string };

    if (childType.displayName === CAROUSEL_SLIDE_OVERLAY_PANEL_DISPLAY_NAME) {
      overlayPanelElements.push(child as React.ReactElement<CarouselSlideOverlayPanelProps>);
    }
  }

  return overlayPanelElements;
}
