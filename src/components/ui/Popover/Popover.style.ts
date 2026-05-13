import styled, { css, keyframes } from 'styled-components';

import type { Size } from '@/types/sizes';
import type { PopoverVariant } from '@/types/ui';

import {
  getDropdownAnimations,
  getDropdownContainerStyles,
} from '../../../handlers/dropdownThemeHandlers';
import {
  buildSurfaceRevealAnimationCss,
  buildSurfaceTransitionCss,
} from '../../../handlers/uiMotionStyleHandlers';

/** Пропсы плавающей поверхности `Popover` (токены из темы как у выпадающего меню) */
export interface PopoverSurfaceStyledProps {
  /** Размер из `theme.dropdowns.sizes` */
  $size: Size;
  /** Вариант из `theme.dropdowns.variants` */
  $variant: PopoverVariant;
  /** `fixed` в портале или `absolute` в режиме `inline` */
  $positionMode: 'fixed' | 'absolute';
  /** Ширина панели (строка CSS или число px) */
  $contentWidth?: string | number;
  /** Максимальная высота области контента со скроллом */
  $contentMaxHeight?: string | number;
}

const widthCss = ($contentWidth?: string | number) =>
  $contentWidth !== undefined
    ? css`
        min-width: 0;
        max-width: none;
        width: ${typeof $contentWidth === 'number' ? `${$contentWidth}px` : $contentWidth};
      `
    : undefined;

const maxHeightCss = ($contentMaxHeight?: string | number) =>
  $contentMaxHeight !== undefined
    ? css`
        max-height: ${typeof $contentMaxHeight === 'number'
          ? `${$contentMaxHeight}px`
          : $contentMaxHeight};
        overflow-y: auto;
        overflow-x: hidden;
      `
    : undefined;

const popoverSurfaceReveal = keyframes`
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

/**
 * Панель popover: радиусы, padding, border, фон, тень и анимация из `theme.dropdowns`.
 */
export const PopoverSurface = styled.div<PopoverSurfaceStyledProps>`
  position: ${({ $positionMode }) => $positionMode};
  box-sizing: border-box;
  outline: none;
  opacity: 1;
  will-change: transform, opacity;

  ${({ theme, $size, $variant }) => {
    const styles = getDropdownContainerStyles(theme.dropdowns, $size, $variant);
    const animations = getDropdownAnimations(theme.dropdowns);
    return css`
      min-width: ${styles.minWidth};
      max-width: ${styles.maxWidth};
      padding: ${styles.padding};
      background: ${styles.background};
      color: ${styles.color};
      border: ${styles.border};
      border-radius: ${styles.borderRadius};
      box-shadow: ${theme.boxShadow?.dropdown || '0px 8px 16px 0px rgba(0, 0, 0, 0.08)'};
      z-index: ${styles.zIndex};
      font-family: ${styles.fontFamily};
      font-weight: ${styles.fontWeight};
      line-height: ${styles.lineHeight};
      text-align: ${styles.textAlign};
      user-select: ${styles.userSelect};
      /* не наследуем nowrap от токенов dropdown — иначе длинный текст вылезает за max-width */
      white-space: normal;
      overflow-wrap: break-word;
      backdrop-filter: ${styles.backdropFilter};
      transform: ${animations.openAnimation.transform};
      ${buildSurfaceTransitionCss(
        `${animations.openAnimation.duration} ${animations.openAnimation.easing}`,
      )}
    `;
  }}
  ${buildSurfaceRevealAnimationCss(popoverSurfaceReveal)}

  ${({ $contentWidth }) => widthCss($contentWidth)}
  ${({ $contentMaxHeight }) => maxHeightCss($contentMaxHeight)}

  > * {
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
    white-space: normal;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
`;
