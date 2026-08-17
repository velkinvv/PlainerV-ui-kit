import type { ReactNode } from 'react';
import type {
  LayoutScrollMode,
  LayoutSidebarBreakpoint,
  LayoutSidebarPlacement,
} from '../../../types/ui';

/** Развёрнутая ширина сайдбара по умолчанию (px). */
export const LAYOUT_SIDEBAR_DEFAULT_WIDTH_PX = 200;

/** Ширина свёрнутого сайдбара по умолчанию (px). */
export const LAYOUT_SIDEBAR_DEFAULT_COLLAPSED_WIDTH_PX = 80;

/** Горизонтальный padding шапки (px). */
export const LAYOUT_HEADER_PADDING_INLINE_PX = 24;

/** Размер кнопки при collapsedWidth 0 (px). */
export const LAYOUT_ZERO_WIDTH_TRIGGER_SIZE_PX = 40;

/** Пороги брейкпоинта: window.innerWidth < значение. */
export const LAYOUT_BREAKPOINT_THRESHOLD_PX: Record<LayoutSidebarBreakpoint, number> = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

/**
 * Режим скролла корня.
 * @param scrollMode - Проп
 */
export const resolveLayoutScrollMode = (scrollMode?: LayoutScrollMode): LayoutScrollMode => {
  if (scrollMode === 'content') {
    return 'content';
  }
  return 'page';
};

/**
 * Сторона сайдбара.
 * @param placement - Проп
 */
export const resolveLayoutSidebarPlacement = (
  placement?: LayoutSidebarPlacement,
): LayoutSidebarPlacement => {
  if (placement === 'end') {
    return 'end';
  }
  return 'start';
};

/**
 * Ряд, если есть сайдбар.
 * @param hasSidebarProp - Явный проп корня
 * @param registeredSidebarCount - Число зарегистрированных Sidebar
 */
export const shouldLayoutUseRowDirection = (
  hasSidebarProp: boolean | undefined,
  registeredSidebarCount: number,
): boolean => {
  if (hasSidebarProp != null) {
    return hasSidebarProp;
  }
  return registeredSidebarCount > 0;
};

/**
 * Ширина окна строго меньше порога брейкпоинта.
 * @param viewportWidthPx - window.innerWidth
 * @param breakpoint - Ключ
 */
export const isLayoutSidebarBelowBreakpoint = (
  viewportWidthPx: number,
  breakpoint: LayoutSidebarBreakpoint,
): boolean => viewportWidthPx < LAYOUT_BREAKPOINT_THRESHOLD_PX[breakpoint];

/**
 * matchMedia для «ниже порога».
 * @param breakpoint - Ключ
 */
export const getLayoutSidebarBreakpointMediaQuery = (
  breakpoint: LayoutSidebarBreakpoint,
): string => `(max-width: ${LAYOUT_BREAKPOINT_THRESHOLD_PX[breakpoint] - 1}px)`;

/**
 * CSS-ширина из числа (px) или готовой строки.
 * @param width - px или CSS
 */
export const formatLayoutWidthCss = (width: number | string): string => {
  if (typeof width === 'number') {
    return `${width}px`;
  }
  return width;
};

type ResolveLayoutSidebarWidthCssOptions = {
  collapsed: boolean;
  width?: number | string;
  collapsedWidth?: number | string;
};

/**
 * Текущая ширина сайдбара.
 * @param options.collapsed - Свёрнут
 * @param options.width - Развёрнутая ширина
 * @param options.collapsedWidth - Ширина collapsed
 */
export const resolveLayoutSidebarWidthCss = ({
  collapsed,
  width,
  collapsedWidth,
}: ResolveLayoutSidebarWidthCssOptions): string => {
  if (collapsed) {
    return formatLayoutWidthCss(collapsedWidth ?? LAYOUT_SIDEBAR_DEFAULT_COLLAPSED_WIDTH_PX);
  }
  return formatLayoutWidthCss(width ?? LAYOUT_SIDEBAR_DEFAULT_WIDTH_PX);
};

/**
 * collapsedWidth равен нулю.
 * @param collapsedWidth - Проп
 */
export const isLayoutCollapsedWidthZero = (collapsedWidth?: number | string): boolean => {
  if (collapsedWidth === 0 || collapsedWidth === '0' || collapsedWidth === '0px') {
    return true;
  }
  return false;
};

/**
 * Overlay активен только в развёрнутом виде.
 * @param overlay - Проп overlay
 * @param collapsed - Свёрнут
 */
export const shouldLayoutSidebarOverlay = (overlay: boolean, collapsed: boolean): boolean =>
  overlay && !collapsed;

/**
 * Ширина gutter в потоке при overlay.
 * @param collapsedWidth - Ширина collapsed
 */
export const resolveLayoutSidebarGutterCss = (collapsedWidth?: number | string): string =>
  formatLayoutWidthCss(collapsedWidth ?? LAYOUT_SIDEBAR_DEFAULT_COLLAPSED_WIDTH_PX);

/**
 * flex order сайдбара.
 * @param placement - start | end
 */
export const getLayoutSidebarFlexOrder = (placement: LayoutSidebarPlacement): number =>
  placement === 'end' ? 1 : 0;

/**
 * flex order Content (всегда 0).
 */
export const getLayoutContentFlexOrder = (): number => 0;

/**
 * Длительность анимации ширины.
 * @param durationMs - Из темы
 * @param prefersReducedMotion - reduced-motion
 */
export const resolveLayoutWidthTransitionMs = (
  durationMs: number,
  prefersReducedMotion: boolean,
): number => (prefersReducedMotion ? 0 : durationMs);

type ShouldShowLayoutZeroWidthTriggerOptions = {
  collapsed: boolean;
  collapsedWidth?: number | string;
  trigger: ReactNode | null | undefined;
};

/**
 * Показать крайний триггер при ширине 0.
 * @param options.collapsed - Свёрнут
 * @param options.collapsedWidth - Ширина collapsed
 * @param options.trigger - null скрывает кнопку
 */
export const shouldShowLayoutZeroWidthTrigger = ({
  collapsed,
  collapsedWidth,
  trigger,
}: ShouldShowLayoutZeroWidthTriggerOptions): boolean =>
  collapsed && isLayoutCollapsedWidthZero(collapsedWidth) && trigger !== null;

/**
 * Поворот шеврона триггера (deg).
 * @param placement - start | end
 * @param collapsed - Свёрнут
 */
export const getLayoutSidebarTriggerRotationDeg = (
  placement: LayoutSidebarPlacement,
  collapsed: boolean,
): number => {
  if (placement === 'end') {
    return collapsed ? 90 : -90;
  }
  return collapsed ? -90 : 90;
};
