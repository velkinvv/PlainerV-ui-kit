import styled, { css, keyframes } from 'styled-components';
import { createStyledShouldForwardProp } from '../../../handlers/styledComponentHandlers';
import { Size } from '../../../types/sizes';
import type { DropdownAlignSelf, DropdownCssMixin } from '../../../types/ui';
import {
  getDropdownContainerStyles,
  getDropdownItemStyles,
  getDropdownAnimations,
} from '../../../handlers/dropdownThemeHandlers';
import { overlayPanelBoxShadowFromTheme, overlayPanelBackgroundFromTheme, overlayPanelBackdropFilterFromTheme } from '../../../handlers/overlayPanelShadowHandlers';
import {
  buildHoverPressMotionCss,
  buildSurfaceTransitionCss,
} from '../../../handlers/uiMotionStyleHandlers';

/**
 * Контейнер dropdown
 * @property $fullWidth — блок на всю ширину родителя (иначе `inline-block` сжимает триггер, как у `Select fullWidth`)
 */
export const DropdownContainer = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $alignSelf?: DropdownAlignSelf; $fullWidth?: boolean }>`
  position: relative;
  ${({ $fullWidth }) =>
    $fullWidth
      ? css`
          display: block;
          width: 100%;
        `
      : css`
          display: inline-block;
        `}
  ${({ $alignSelf }) => $alignSelf && `align-self: ${$alignSelf};`}
`;

/**
 * Триггер dropdown
 */
export const DropdownTrigger = styled.div`
  cursor: pointer;
  display: inline-block;
  transition: transform 0.12s ease;
  ${buildHoverPressMotionCss({
    hoverSelector: '&:hover',
    activeSelector: '&:active',
    hoverTransform: 'none',
    activeTransform: 'scale(0.98)',
  })}
`;

/**
 * Контент dropdown
 * @param isOpen - состояние открытия
 * @param position - позиция dropdown
 * @param size - размер dropdown
 * @param variant - вариант dropdown
 */
export const DropdownContent = styled.div<{
  $isOpen: boolean;
  $position: { x: number; y: number };
  $size?: Size;
  $variant?: 'default' | 'elevated' | 'outlined';
  $menuWidth?: string | number;
  $menuMaxHeight?: string | number;
  $dropContainerCssMixin?: DropdownCssMixin;
  $inline?: boolean;
  /** Перекрывает z-index из темы (оверлейный слой Modal / Drawer) */
  $overlayZIndex?: number;
  /** Узкие внутренние отступы панели списка (календарь и т.п.) */
  $menuDensity?: 'default' | 'compact';
}>`
  position: ${({ $inline }) => ($inline ? 'absolute' : 'fixed')};
  overflow: hidden;
  box-sizing: border-box;

  ${({ theme, $size = Size.MD, $variant = 'default', $overlayZIndex }) => {
    const styles = getDropdownContainerStyles(theme.dropdowns, $size, $variant);
    const backdropFilter = overlayPanelBackdropFilterFromTheme(theme) ?? styles.backdropFilter;
    return css`
      min-width: ${styles.minWidth};
      max-width: ${styles.maxWidth};
      padding: ${styles.padding};
      background: ${overlayPanelBackgroundFromTheme(theme, styles.background)};
      color: ${styles.color};
      border: ${styles.border};
      border-radius: ${styles.borderRadius};
      box-shadow: ${overlayPanelBoxShadowFromTheme(theme)};
      z-index: ${$overlayZIndex ?? styles.zIndex};
      font-family: ${styles.fontFamily};
      font-weight: ${styles.fontWeight};
      line-height: ${styles.lineHeight};
      text-align: ${styles.textAlign};
      user-select: ${styles.userSelect};
      ${backdropFilter
        ? css`
            backdrop-filter: ${backdropFilter};
            -webkit-backdrop-filter: ${backdropFilter};
          `
        : ''}
    `;
  }}

  ${({ $menuDensity }) =>
    $menuDensity === 'compact' &&
    css`
      padding: 4px 4px;
    `}

  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  will-change: transform, opacity;
  transform: ${({ $isOpen, theme }) => {
    const animations = getDropdownAnimations(theme.dropdowns);
    return $isOpen ? animations.openAnimation.transform : animations.closeAnimation.transform;
  }};
  ${({ theme }) => {
    const animations = getDropdownAnimations(theme.dropdowns);
    return buildSurfaceTransitionCss(
      `${animations.openAnimation.duration} ${animations.openAnimation.easing}`,
    );
  }}

  left: ${({ $position }) => $position.x}px;
  top: ${({ $position }) => $position.y}px;

  /* Явная ширина панели: сбрасываем min/max из темы, иначе узкая ширина триггера не применяется к выпадашке (minWidth из темы dropdown). */
  ${({ $menuWidth }) =>
    $menuWidth !== undefined &&
    css`
      min-width: 0;
      max-width: none;
      width: ${typeof $menuWidth === 'number' ? `${$menuWidth}px` : $menuWidth};
    `}

  /* Максимальная высота меню, если задана */
  ${({ $menuMaxHeight }) =>
    $menuMaxHeight !== undefined &&
    `
      max-height: ${typeof $menuMaxHeight === 'number' ? `${$menuMaxHeight}px` : $menuMaxHeight};
      overflow-y: auto;
      overflow-x: hidden;
    `}

  /* Внутренний контент: min-width 0 — иначе flex/min-width у вложенных панелей (напр. фильтр колонки) обрезается при overflow:hidden */
  > * {
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  ${({ $dropContainerCssMixin }) => $dropContainerCssMixin ?? ''}
`;

/**
 * Панель сверху над выпадающим списком
 */
export const DropdownTopPanel = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  margin-bottom: 4px;
  padding-bottom: 8px;
`;

/**
 * Панель снизу под выпадающим списком
 */
export const DropdownBottomPanel = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  margin-top: 4px;
  padding-top: 8px;
`;

export const DropdownSearchContainer = styled.div`
  padding: 4px 0 8px;
  position: relative;
`;

export const DropdownSearchInput = styled.input`
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px 12px;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.backgroundTertiary};
  color: ${({ theme }) => theme.colors.text};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px
      ${({ theme }) => `color-mix(in srgb, ${theme.colors.primary} 20%, transparent)`};
    background: ${({ theme }) => theme.colors.input ?? theme.colors.backgroundSecondary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

export const DropdownGroupHeader = styled.div`
  padding: 6px 0;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const DropdownGroupTitle = styled.span`
  font-weight: 600;
`;

export const DropdownGroupDescription = styled.span`
  display: block;
  font-size: 11px;
  text-transform: none;
  letter-spacing: 0;
  color: ${({ theme }) => theme.colors.textTertiary};
  margin-top: 2px;
`;

/**
 * Разделитель dropdown
 */
export const DropdownDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 4px 0;
  width: 100%;
`;

/** Контейнер вложенного уровня дерева пунктов меню */
export const DropdownMenuTreeNestedList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 10px;
  margin-left: 8px;
  border-left: 1px solid ${({ theme }) => theme.colors.borderSecondary};
`;

/** Обёртка иконки шеврона ветки: поворот без `style` на `Icon` (тип `IconProps` не принимает `style`). */
export const DropdownMenuTreeChevronFrame = styled.span<{ $expanded: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: ${({ $expanded }) => ($expanded ? 'rotate(0deg)' : 'rotate(-90deg)')};
  transition: transform 0.15s ease;
`;

/** Кнопка раскрытия ветки (шеврон), не участвует в выборе строки */
export const DropdownMenuTreeExpandButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  margin: 0 4px 0 0;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: inherit;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) =>
      `color-mix(in srgb, ${theme.colors.text} 6%, transparent)`};
  }

  &:active {
    transform: scale(0.96);
  }
  ${buildHoverPressMotionCss({
    hoverSelector: '&:hover',
    activeSelector: '&:active',
    hoverTransform: 'none',
    activeTransform: 'scale(0.96)',
  })}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 1px;
  }
`;

/**
 * Обёртка списка пунктов меню
 */
/** Обёртка списка пунктов; при `compact` без лишнего вертикального зазора между строками */
export const DropdownMenuWrapper = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $density?: 'default' | 'compact' }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $density }) => ($density === 'compact' ? '2px' : '4px')};
  width: 100%;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

/**
 * Элемент dropdown
 * @param size - размер элемента
 * @param state - состояние элемента
 */
export const DropdownItem = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{
  $size?: Size;
  $state?: 'hover' | 'active' | 'disabled' | 'selected' | 'focus';
  /** Компактные строки меню (календарь) */
  $density?: 'default' | 'compact';
}>`
  display: flex;
  align-items: center;
  border: none;
  gap: 8px;

  ${({ theme, $size = Size.MD, $state }) => {
    const styles = getDropdownItemStyles(theme.dropdowns, $size, $state);
    // Default состояние: прозрачный фон, цвет neutral[800]
    const defaultColor = theme.colors.text;

    return `
      padding: ${styles.padding};
      font-size: ${styles.fontSize};
      border-radius: ${styles.borderRadius};
      gap: ${styles.gap};
      background: ${$state && 'background' in styles ? styles.background : 'transparent'};
      color: ${$state && 'color' in styles ? styles.color : defaultColor};
      cursor: ${styles.cursor};
      transition: ${styles.transition};
      font-family: ${styles.fontFamily};
      font-weight: ${$state && 'fontWeight' in styles ? styles.fontWeight : 400};
      line-height: ${styles.lineHeight};
      text-align: ${styles.textAlign};
      user-select: ${styles.userSelect};
      opacity: ${$state && 'opacity' in styles ? styles.opacity : 1};
      ${
        $state === 'focus'
          ? `
      border: none;
      outline: none;
      box-shadow: 0 0 0 2px ${theme.colors.primary};
    `
          : 'border: none;'
      }
    `;
  }}

  &:hover {
    ${({ theme, $size = Size.MD }) => {
      const hoverStyles = getDropdownItemStyles(theme.dropdowns, $size, 'hover');
      return `
        background: ${'background' in hoverStyles ? hoverStyles.background : 'transparent'};
        color: ${'color' in hoverStyles ? hoverStyles.color : 'inherit'};
        font-weight: ${'fontWeight' in hoverStyles ? hoverStyles.fontWeight : 400};
      `;
    }}
  }

  &[data-loading='true'] {
    cursor: progress;
    opacity: 0.75;
  }

  &:focus {
    outline: none;
  }

  /* Клик мышью: без рамки/кольца фокуса (раньше срабатывал общий блок с border из темы). */
  &:focus:not(:focus-visible) {
    border: none;
    box-shadow: none;
  }

  /* Клавиатура: кольцо через box-shadow — без смены border и без системной чёрной обводки. */
  &:focus-visible {
    ${({ theme, $size = Size.MD }) => {
      const focusStyles = getDropdownItemStyles(theme.dropdowns, $size, 'focus');
      const ringColor = theme.colors.primary;
      return `
        background: ${'background' in focusStyles ? focusStyles.background : 'transparent'};
        color: ${'color' in focusStyles ? focusStyles.color : 'inherit'};
        border: none;
        font-weight: ${'fontWeight' in focusStyles ? focusStyles.fontWeight : 400};
        outline: none;
        box-shadow: 0 0 0 2px ${ringColor};
      `;
    }}
  }

  &:active {
    ${({ theme, $size = Size.MD }) => {
      const activeStyles = getDropdownItemStyles(theme.dropdowns, $size, 'active');
      return `
        background: ${'background' in activeStyles ? activeStyles.background : 'transparent'};
        color: ${'color' in activeStyles ? activeStyles.color : 'inherit'};
        font-weight: ${'fontWeight' in activeStyles ? activeStyles.fontWeight : 500};
      `;
    }}
  }

  &[aria-disabled='true'],
  &[disabled] {
    ${({ theme, $size = Size.MD }) => {
      const disabledStyles = getDropdownItemStyles(theme.dropdowns, $size, 'disabled');
      return `
        background: ${'background' in disabledStyles ? disabledStyles.background : 'transparent'};
        color: ${'color' in disabledStyles ? disabledStyles.color : 'inherit'};
        font-weight: ${'fontWeight' in disabledStyles ? disabledStyles.fontWeight : 500};
        cursor: ${disabledStyles.cursor};
        opacity: ${'opacity' in disabledStyles ? disabledStyles.opacity : 1};
        pointer-events: none;
      `;
    }}
  }

  &:first-child {
    border-top-left-radius: ${({ theme, $size = Size.MD }) => {
      const styles = getDropdownItemStyles(theme.dropdowns, $size);
      return styles.borderRadius;
    }};
    border-top-right-radius: ${({ theme, $size = Size.MD }) => {
      const styles = getDropdownItemStyles(theme.dropdowns, $size);
      return styles.borderRadius;
    }};
  }

  &:last-child {
    border-bottom-left-radius: ${({ theme, $size = Size.MD }) => {
      const styles = getDropdownItemStyles(theme.dropdowns, $size);
      return styles.borderRadius;
    }};
    border-bottom-right-radius: ${({ theme, $size = Size.MD }) => {
      const styles = getDropdownItemStyles(theme.dropdowns, $size);
      return styles.borderRadius;
    }};
  }

  /* После правил скругления краёв списка — чтобы padding/радиус компактного режима не перебивались */
  ${({ $density }) =>
    $density === 'compact' &&
    css`
      padding: 3px 10px;
      line-height: 1.2;
      border-radius: 6px;
      gap: 6px;
    `}
`;

export const DropdownItemIconSlot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  min-width: 20px;
  color: inherit;
`;

export const DropdownItemLoadingSpinner = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: ${spin} 0.8s linear infinite;
`;

export const DropdownItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`;

export const DropdownItemLabel = styled.span<{ $tone?: 'default' | 'danger' }>`
  font-weight: inherit;
  color: ${({ theme, $tone }) => ($tone === 'danger' ? theme.colors.danger : 'inherit')};
  display: block;
  word-break: normal;
  overflow-wrap: break-word;
`;

export const DropdownItemDescription = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
  word-break: break-word;
`;

export const DropdownItemRightSlot = styled.span`
  margin-left: auto;
  padding-left: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const DropdownItemShortcut = styled.span`
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 12px;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const DropdownLoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 96px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`;

export const DropdownEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  gap: 4px;
`;

export const DropdownLoadingSpinner = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: ${spin} 0.8s linear infinite;
`;
