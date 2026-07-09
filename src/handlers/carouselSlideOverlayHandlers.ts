import React from 'react';
import type {
  CarouselSlideInfo,
  CarouselSlideOverlayAlign,
  CarouselSlideOverlayPlacement,
  CarouselSlideOverlayPanelProps,
  CarouselSlideOverlayProps,
} from '../types/ui';
import { CarouselSlideOverlayAlign as OverlayAlignEnum } from '../types/ui';
import {
  CAROUSEL_SLIDE_OVERLAY_DISPLAY_NAME,
  CAROUSEL_SLIDE_OVERLAY_PANEL_DISPLAY_NAME,
} from './carouselSlideOverlayConstants';

export { CAROUSEL_SLIDE_OVERLAY_DISPLAY_NAME } from './carouselSlideOverlayConstants';

/** Ключ зоны оверлея: placement + align */
export type CarouselSlideOverlayZoneKey = `${CarouselSlideOverlayPlacement}-${CarouselSlideOverlayAlign}`;

/** Группа оверлеев в одной зоне */
export type CarouselSlideOverlayZoneGroup = {
  /** Ключ зоны */
  zoneKey: CarouselSlideOverlayZoneKey;
  /** Расположение зоны */
  placement: CarouselSlideOverlayPlacement;
  /** Выравнивание содержимого */
  align: CarouselSlideOverlayAlign;
  /** React-элементы оверлеев в зоне */
  overlayElements: React.ReactElement<CarouselSlideOverlayProps>[];
};

/** Результат разделения children слайда */
export type CarouselSlideChildrenSplitResult = {
  /** Контент слайда без оверлеев и панелей */
  contentChildren: React.ReactNode[];
  /** Сгруппированные оверлеи по зонам */
  overlayZoneGroups: CarouselSlideOverlayZoneGroup[];
  /** Контентные панели поверх слайда */
  overlayPanelElements: React.ReactElement<CarouselSlideOverlayPanelProps>[];
};

/**
 * Возвращает ключ зоны оверлея.
 * @param placement — расположение зоны
 * @param align — выравнивание
 */
export function getCarouselSlideOverlayZoneKey(
  placement: CarouselSlideOverlayPlacement,
  align: CarouselSlideOverlayAlign = OverlayAlignEnum.START,
): CarouselSlideOverlayZoneKey {
  return `${placement}-${align}`;
}

/**
 * Разделяет children слайда на контент и оверлеи.
 * @param slideChildren — children Carousel.Slide
 */
export function splitCarouselSlideChildren(
  slideChildren: React.ReactNode,
): CarouselSlideChildrenSplitResult {
  const childArray = React.Children.toArray(slideChildren);
  const contentChildren: React.ReactNode[] = [];
  const overlayElements: React.ReactElement<CarouselSlideOverlayProps>[] = [];
  const overlayPanelElements: React.ReactElement<CarouselSlideOverlayPanelProps>[] = [];

  for (const child of childArray) {
    if (!React.isValidElement(child)) {
      contentChildren.push(child);
      continue;
    }

    const childType = child.type as { displayName?: string };

    if (childType.displayName === CAROUSEL_SLIDE_OVERLAY_DISPLAY_NAME) {
      overlayElements.push(child as React.ReactElement<CarouselSlideOverlayProps>);
      continue;
    }

    if (childType.displayName === CAROUSEL_SLIDE_OVERLAY_PANEL_DISPLAY_NAME) {
      overlayPanelElements.push(child as React.ReactElement<CarouselSlideOverlayPanelProps>);
      continue;
    }

    contentChildren.push(child);
  }

  return {
    contentChildren,
    overlayZoneGroups: groupCarouselSlideOverlaysByZone(overlayElements),
    overlayPanelElements,
  };
}

/**
 * Группирует оверлеи по зонам placement + align.
 * @param overlayElements — массив Carousel.Overlay
 */
export function groupCarouselSlideOverlaysByZone(
  overlayElements: React.ReactElement<CarouselSlideOverlayProps>[],
): CarouselSlideOverlayZoneGroup[] {
  const zoneMap = new Map<CarouselSlideOverlayZoneKey, React.ReactElement<CarouselSlideOverlayProps>[]>();

  for (const overlayElement of overlayElements) {
    const placement = overlayElement.props?.placement;
    const align = overlayElement.props?.align ?? OverlayAlignEnum.START;
    const zoneKey = getCarouselSlideOverlayZoneKey(placement, align);
    const existingOverlays = zoneMap.get(zoneKey) ?? [];

    existingOverlays.push(overlayElement);
    zoneMap.set(zoneKey, existingOverlays);
  }

  return Array.from(zoneMap.entries()).map(([zoneKey, groupedOverlayElements]) => {
    const [placement, align] = zoneKey.split('-') as [
      CarouselSlideOverlayPlacement,
      CarouselSlideOverlayAlign,
    ];

    return {
      zoneKey,
      placement,
      align,
      overlayElements: groupedOverlayElements,
    };
  });
}

/**
 * Рендерит содержимое оверлея с учётом render prop.
 * @param overlayChildren — children Carousel.Overlay
 * @param slideInfo — метаданные слайда
 */
export function resolveCarouselSlideOverlayContent(
  overlayChildren: CarouselSlideOverlayProps['children'],
  slideInfo: CarouselSlideInfo | undefined,
): React.ReactNode {
  if (typeof overlayChildren === 'function') {
    return slideInfo ? overlayChildren(slideInfo) : null;
  }

  return overlayChildren;
}

/**
 * CSS-значение выравнивания по главной оси flex.
 * @param align — start / center / end
 */
export function getCarouselSlideOverlayFlexAlignment(align: CarouselSlideOverlayAlign): string {
  if (align === OverlayAlignEnum.CENTER) {
    return 'center';
  }

  if (align === OverlayAlignEnum.END) {
    return 'flex-end';
  }

  return 'flex-start';
}
