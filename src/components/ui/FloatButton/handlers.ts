import React from 'react';
import type { DefaultTheme } from 'styled-components';
import { getButtonVariant } from '../../../handlers/buttonThemeHandlers';
import { resolveControlAccentColors } from '../../../handlers/controlAccentColorHandlers';
import { resolveOnAccentTextColor } from '../../../handlers/onAccentColorHandlers';
import { ButtonVariant, type ControlColor, type FloatButtonPlacement } from '../../../types/ui';


/** Отступ от края по умолчанию (px). */
export const FLOAT_BUTTON_DEFAULT_INSET_PX = 24;

/** Слой по умолчанию (ниже modal). */
export const FLOAT_BUTTON_DEFAULT_Z_INDEX = 1100;

/** Порог показа BackTop (px). */
export const FLOAT_BUTTON_DEFAULT_VISIBILITY_HEIGHT_PX = 400;

/** Длительность скролла наверх (мс). */
export const FLOAT_BUTTON_DEFAULT_SCROLL_DURATION_MS = 450;

export type FloatButtonEdgeOffsets = {
  insetBlockStart?: number;
  insetBlockEnd?: number;
  insetInlineStart?: number;
  insetInlineEnd?: number;
};

export type FloatButtonBadgeResolve = {
  visible: boolean;
  isDot: boolean;
  content: React.ReactNode;
};

/**
 * Резолв угла якоря: default `bottom-end`.
 * @param placement - Проп
 */
export const resolveFloatButtonPlacement = (
  placement?: FloatButtonPlacement,
): FloatButtonPlacement => {
  if (
    placement === 'bottom-start' ||
    placement === 'top-end' ||
    placement === 'top-start' ||
    placement === 'bottom-end'
  ) {
    return placement;
  }
  return 'bottom-end';
};

/**
 * Отступ от края.
 * @param insetPx - Проп
 */
export const resolveFloatButtonInsetPx = (insetPx?: number): number =>
  typeof insetPx === 'number' && Number.isFinite(insetPx) ? insetPx : FLOAT_BUTTON_DEFAULT_INSET_PX;

/**
 * Логические inset-оффсеты для угла.
 * @param placement - Угол
 * @param insetPx - Отступ
 */
export const getFloatButtonEdgeOffsets = (
  placement: FloatButtonPlacement,
  insetPx: number,
): FloatButtonEdgeOffsets => {
  switch (placement) {
    case 'top-start':
      return { insetBlockStart: insetPx, insetInlineStart: insetPx };
    case 'top-end':
      return { insetBlockStart: insetPx, insetInlineEnd: insetPx };
    case 'bottom-start':
      return { insetBlockEnd: insetPx, insetInlineStart: insetPx };
    case 'bottom-end':
    default:
      return { insetBlockEnd: insetPx, insetInlineEnd: insetPx };
  }
};

/**
 * Виден ли BackTop.
 * @param scrollTopPx - Текущий scrollTop
 * @param visibilityHeightPx - Порог
 */
export const shouldShowFloatButtonBackTop = (
  scrollTopPx: number,
  visibilityHeightPx: number,
): boolean => scrollTopPx >= visibilityHeightPx;

/**
 * Доля прокрутки 0..1.
 * @param scrollTopPx - scrollTop
 * @param scrollHeightPx - scrollHeight
 * @param clientHeightPx - clientHeight / innerHeight
 */
export const getFloatButtonScrollProgressRatio = (
  scrollTopPx: number,
  scrollHeightPx: number,
  clientHeightPx: number,
): number => {
  const maxScrollPx = scrollHeightPx - clientHeightPx;
  if (maxScrollPx <= 0) {
    return 0;
  }
  const ratio = scrollTopPx / maxScrollPx;
  if (ratio < 0) {
    return 0;
  }
  if (ratio > 1) {
    return 1;
  }
  return ratio;
};

/**
 * Длительность скролла: 0 при reduced motion.
 * @param durationMs - Проп
 * @param prefersReducedMotion - prefers-reduced-motion
 */
export const resolveFloatButtonScrollDurationMs = (
  durationMs: number | undefined,
  prefersReducedMotion: boolean,
): number => {
  if (prefersReducedMotion) {
    return 0;
  }
  return typeof durationMs === 'number' && Number.isFinite(durationMs)
    ? durationMs
    : FLOAT_BUTTON_DEFAULT_SCROLL_DURATION_MS;
};

/**
 * Разбор пропа badge.
 * @param badge - Узел, число или `true` (точка)
 */
export const resolveFloatButtonBadge = (
  badge?: React.ReactNode | number | true,
): FloatButtonBadgeResolve => {
  if (badge === true) {
    return { visible: true, isDot: true, content: null };
  }
  if (badge === undefined || badge === null || badge === false) {
    return { visible: false, isDot: false, content: null };
  }
  if (typeof badge === 'number' && badge === 0) {
    return { visible: false, isDot: false, content: null };
  }
  return { visible: true, isDot: false, content: badge };
};

/**
 * Последний child — триггер, остальные — веер.
 * @param children - Children группы
 */
export const partitionFloatButtonGroupChildren = (
  children: React.ReactNode,
): { trigger: React.ReactNode; actions: React.ReactNode[] } => {
  const childNodes = React.Children.toArray(children).filter(Boolean);
  if (childNodes.length === 0) {
    return { trigger: null, actions: [] };
  }
  const trigger = childNodes[childNodes.length - 1];
  const actions = childNodes.slice(0, -1);
  return { trigger, actions };
};

export type FloatButtonScrollMetrics = {
  scrollTopPx: number;
  scrollHeightPx: number;
  clientHeightPx: number;
};

/**
 * Окно прокрутки, а не HTMLElement.
 * В Jest `window instanceof Window` ложно, поэтому не опираемся на конструктор Window.
 * @param target - window или HTMLElement
 */
export const isFloatButtonWindowScrollTarget = (
  target: Window | HTMLElement,
): target is Window => {
  if (typeof HTMLElement !== 'undefined' && target instanceof HTMLElement) {
    return false;
  }
  return true;
};

/**
 * Метрики прокрутки окна или элемента.
 * @param target - window или HTMLElement
 */
export const readFloatButtonScrollMetrics = (
  target: Window | HTMLElement,
): FloatButtonScrollMetrics => {
  if (isFloatButtonWindowScrollTarget(target)) {
    const documentElement = target.document?.documentElement;
    return {
      scrollTopPx: target.scrollY ?? target.pageYOffset ?? documentElement?.scrollTop ?? 0,
      scrollHeightPx: documentElement?.scrollHeight ?? 0,
      clientHeightPx: target.innerHeight ?? 0,
    };
  }
  return {
    scrollTopPx: target.scrollTop ?? 0,
    scrollHeightPx: target.scrollHeight ?? 0,
    clientHeightPx: target.clientHeight ?? 0,
  };
};

/**
 * Прокрутка цели к началу.
 * @param target - window или элемент
 * @param durationMs - 0 = без анимации
 */
export const scrollFloatButtonTargetToTop = (
  target: Window | HTMLElement,
  durationMs: number,
): void => {
  const behavior: ScrollBehavior = durationMs === 0 ? 'auto' : 'smooth';
  target.scrollTo({ top: 0, behavior });
};

export type FloatButtonSurfaceTokens = {
  background: string;
  color: string;
  border: string;
  hoverBackground: string;
  hoverColor: string;
  hoverBorder: string;
};

const FILLED_BUTTON_VARIANTS: ReadonlySet<ButtonVariant> = new Set([
  ButtonVariant.PRIMARY,
  ButtonVariant.SECONDARY,
  ButtonVariant.SUCCESS,
  ButtonVariant.DANGER,
  ButtonVariant.WARNING,
]);

/**
 * Цвета поверхности FloatButton из темы кнопок и опционального `color`.
 * @param theme - Тема
 * @param variant - Вариант кнопки
 * @param color - Override палитры
 */
export const resolveFloatButtonSurface = (
  theme: DefaultTheme,
  variant: ButtonVariant,
  color?: ControlColor | string,
): FloatButtonSurfaceTokens => {
  const variantStyles = getButtonVariant(theme?.buttons, variant);
  const fallbackBorder = '1px solid transparent';

  if (color == null) {
    return {
      background: variantStyles?.background ?? 'transparent',
      color: variantStyles?.color ?? theme.colors?.text ?? '#212121',
      border: variantStyles?.border ?? fallbackBorder,
      hoverBackground: variantStyles?.hover?.background ?? variantStyles?.background ?? 'transparent',
      hoverColor: variantStyles?.hover?.color ?? variantStyles?.color ?? theme.colors?.text ?? '#212121',
      hoverBorder: variantStyles?.hover?.border ?? variantStyles?.border ?? fallbackBorder,
    };
  }

  const accentColors = resolveControlAccentColors(theme, color);
  const onAccentText = resolveOnAccentTextColor(theme);
  const isFilled = FILLED_BUTTON_VARIANTS.has(variant);

  if (isFilled) {
    return {
      background: accentColors.checked,
      color: onAccentText,
      border: `1px solid ${accentColors.checked}`,
      hoverBackground: accentColors.checkedHover,
      hoverColor: onAccentText,
      hoverBorder: `1px solid ${accentColors.checkedHover}`,
    };
  }

  return {
    background: 'transparent',
    color: accentColors.checked,
    border:
      variant === ButtonVariant.OUTLINE ? `1px solid ${accentColors.checked}` : fallbackBorder,
    hoverBackground: `color-mix(in srgb, ${accentColors.checked} 12%, transparent)`,
    hoverColor: accentColors.checkedHover,
    hoverBorder:
      variant === ButtonVariant.OUTLINE
        ? `1px solid ${accentColors.checkedHover}`
        : fallbackBorder,
  };
};

/**
 * Сторона квадрата FloatButton по Size (px).
 * @param size - Размер
 */
export const getFloatButtonSizePx = (size: string): number => {
  switch (size) {
    case 'XS':
    case 'SM':
      return 32;
    case 'LG':
      return 48;
    case 'XL':
      return 56;
    case 'MD':
    default:
      return 40;
  }
};

