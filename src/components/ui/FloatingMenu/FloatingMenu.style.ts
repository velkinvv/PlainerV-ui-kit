import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { ThemeColorScheme } from '@/types/theme';
import { Size } from '@/types/sizes';
import { ButtonVariant, FloatingMenuGroupVariant, FloatingMenuOrientation } from '@/types/ui';
import { BorderRadiusHandler } from '../../../handlers/uiHandlers';
import { getButtonVariant } from '../../../handlers/buttonThemeHandlers';
import { getDropdownContainerStyles } from '../../../handlers/dropdownThemeHandlers';
import { overlayPanelBoxShadowFromTheme, overlayPanelSurfaceCss } from '../../../handlers/overlayPanelShadowHandlers';
import {
  horizontalScrollWithoutLayoutShiftCss,
  verticalScrollWithoutLayoutShiftCss,
} from '../../../handlers/scrollOverlayStyles';
import { navigationMenuItemHighlightPulseCss } from '@/handlers/navigationMenuItemHighlightHandlers';

const floatingMenuBarSurfaceCss = css`
  border-radius: ${({ theme }: { theme: import('styled-components').DefaultTheme }) =>
    BorderRadiusHandler(theme.borderRadius)};
  ${({ theme }: { theme: import('styled-components').DefaultTheme }) => overlayPanelSurfaceCss(theme)}
  border: 1px solid
    ${({ theme }: { theme: import('styled-components').DefaultTheme }) => theme.colors.borderSecondary};
  box-shadow: ${({ theme }: { theme: import('styled-components').DefaultTheme }) =>
    overlayPanelBoxShadowFromTheme(theme)};
`;

/** Корневая фиксированная панель */
export const FloatingMenuRoot = styled.div<{
  $isDragging?: boolean;
  $orientation: FloatingMenuOrientation;
}>`
  position: fixed;
  box-sizing: border-box;
  width: max-content;
  max-width: calc(100vw - 32px);
  max-height: ${({ $orientation }) =>
    $orientation === FloatingMenuOrientation.VERTICAL ? 'calc(100vh - 32px)' : 'none'};
  cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'default')};
`;

/** Панель с тенью; скругление из `theme.borderRadius` */
export const FloatingMenuBar = styled.div<{ $orientation: FloatingMenuOrientation }>`
  display: flex;
  box-sizing: border-box;
  padding: 6px 10px;
  gap: 4px;
  ${floatingMenuBarSurfaceCss};

  ${({ $orientation }) =>
    $orientation === FloatingMenuOrientation.VERTICAL
      ? css`
          flex-direction: column;
          align-items: center;
          height: max-content;
        `
      : css`
          flex-direction: row;
          align-items: center;
          width: max-content;
        `}
`;

/**
 * Панель с dynamicSize: размер по контенту до max-width / max-height.
 * @property $orientation — horizontal / vertical
 * @property $dynamicSizeMaxCss — CSS max-width или max-height
 * @property $sizeAnimating — блокировка overflow на время анимации
 */
export const FloatingMenuMotionBar = styled(motion.div)<{
  $orientation: FloatingMenuOrientation;
  $dynamicSizeMaxCss?: string;
  $sizeAnimating?: boolean;
}>`
  display: flex;
  box-sizing: border-box;
  padding: 6px 10px;
  gap: 4px;
  ${floatingMenuBarSurfaceCss};

  ${({ $orientation, $dynamicSizeMaxCss, $sizeAnimating }) => {
    const maxSizeCss = $dynamicSizeMaxCss ?? 'calc(100vw - 32px)';

    if ($orientation === FloatingMenuOrientation.VERTICAL) {
      return css`
        flex-direction: column;
        align-items: center;
        width: max-content;
        height: max-content;
        max-height: ${maxSizeCss};

        ${$sizeAnimating
          ? 'overflow: hidden;'
          : css`
              overflow-x: hidden;
              ${verticalScrollWithoutLayoutShiftCss}
            `}
      `;
    }

    return css`
      flex-direction: row;
      align-items: center;
      width: max-content;
      max-width: ${maxSizeCss};

      ${$sizeAnimating
        ? 'overflow: hidden;'
        : css`
            overflow-y: hidden;
            ${horizontalScrollWithoutLayoutShiftCss}
          `}
    `;
  }}
`;

/** Ряд / колонка группы кнопок */
export const FloatingMenuGroupInner = styled.div<{
  $variant: FloatingMenuGroupVariant;
  $dynamicSize?: boolean;
  $orientation: FloatingMenuOrientation;
}>`
  display: flex;
  flex-shrink: 0;
  gap: ${({ $dynamicSize }) => ($dynamicSize ? 0 : 2)}px;

  ${({ $orientation }) =>
    $orientation === FloatingMenuOrientation.VERTICAL
      ? css`
          flex-direction: column;
          align-items: center;
          width: 100%;
        `
      : css`
          flex-direction: row;
          align-items: center;
        `}

  ${({ $dynamicSize, $orientation }) =>
    $dynamicSize
      ? $orientation === FloatingMenuOrientation.VERTICAL
        ? css`
            .ui-floating-menu-item-presence:not(:last-child) {
              margin-bottom: 2px;
            }

            .ui-floating-menu-item-presence:last-child {
              margin-bottom: 0 !important;
            }
          `
        : css`
            .ui-floating-menu-item-presence:not(:last-child) {
              margin-right: 2px;
            }

            .ui-floating-menu-item-presence:last-child {
              margin-right: 0 !important;
            }
          `
      : ''}

  ${({ $variant, theme }) =>
    $variant === FloatingMenuGroupVariant.INSET
      ? css`
          padding: 4px;
          border-radius: ${BorderRadiusHandler(theme.borderRadius)};
          background: ${theme.mode === ThemeColorScheme.DARK
            ? 'rgba(255, 255, 255, 0.06)'
            : '#f0f0f0'};
        `
      : ''}
`;

/** Обёртка одного пункта группы (AnimatePresence) */
export const FloatingMenuGroupItemPresence = styled(motion.div)<{
  $orientation: FloatingMenuOrientation;
}>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  overflow: hidden;
  transform-origin: ${({ $orientation }) =>
    $orientation === FloatingMenuOrientation.VERTICAL ? 'center top' : 'left center'};
`;

/** Корень пункта — единый DOM-узел для AnimatePresence и измерения размера */
export const FloatingMenuGroupItemRoot = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  width: max-content;
`;

/** Кнопка пункта панели */
export const FloatingMenuItemButton = styled.button<{
  $active: boolean;
  $disabled: boolean;
  $insetGroup: boolean;
  $highlightPulse?: boolean;
}>`
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-width: 36px;
  min-height: 36px;
  padding: 0 6px;
  border: none;
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};
  transition:
    background 0.15s ease,
    color 0.15s ease;

  ${({ $highlightPulse, theme }) => ($highlightPulse ? navigationMenuItemHighlightPulseCss(theme) : '')}

  &:hover {
    background: ${({ theme, $disabled }) =>
      $disabled
        ? 'transparent'
        : theme.mode === ThemeColorScheme.DARK
          ? 'rgba(255,255,255,0.08)'
          : '#f5f5f5'};
  }

  ${({ $active, $insetGroup, theme }) => {
    if (!$active || $insetGroup) {
      return '';
    }
    const primaryButtonStyles = getButtonVariant(theme.buttons, ButtonVariant.PRIMARY);
    const activeTextOnInfo = primaryButtonStyles.hover.color ?? primaryButtonStyles.color;
    return css`
      background: ${theme.colors.info};
      color: ${primaryButtonStyles.color};

      &:hover {
        background: ${theme.colors.infoHover};
        color: ${activeTextOnInfo};
      }
    `;
  }}

  ${({ $active, $insetGroup, theme }) =>
    $active && $insetGroup
      ? css`
          background: ${theme.mode === ThemeColorScheme.DARK
            ? theme.colors.backgroundSecondary
            : '#ffffff'};
          color: ${theme.colors.info};
          box-shadow: 0 0 0 1px
            ${theme.mode === ThemeColorScheme.DARK ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)'};

          &:hover {
            background: ${theme.mode === ThemeColorScheme.DARK
              ? theme.colors.backgroundSecondary
              : '#ffffff'};
            color: ${theme.colors.infoHover};
          }
        `
      : ''}

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.info};
    outline-offset: 2px;
  }
`;

export const FloatingMenuItemIconSlot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
`;

export const FloatingMenuItemChevron = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  line-height: 1;
  opacity: 0.75;
  margin-left: 1px;
`;

/** Разделитель между группами */
export const FloatingMenuDivider = styled.div<{ $orientation: FloatingMenuOrientation }>`
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.borderSecondary};

  ${({ $orientation }) =>
    $orientation === FloatingMenuOrientation.VERTICAL
      ? css`
          align-self: stretch;
          width: auto;
          min-width: 28px;
          height: 1px;
          margin: 4px 0;
        `
      : css`
          align-self: stretch;
          width: 1px;
          min-height: 28px;
          margin: 0 4px;
        `}
`;

export const FloatingMenuDropdownPanel = styled.div<{ $zIndex: number }>`
  position: fixed;
  z-index: ${({ $zIndex }) => $zIndex};
  min-width: 180px;
  max-width: min(320px, calc(100vw - 24px));
  padding: 8px;
  border-radius: ${({ theme }) =>
    getDropdownContainerStyles(theme.dropdowns, theme.defaultInputSize ?? Size.SM, 'default')
      .borderRadius};
  ${({ theme }) => overlayPanelSurfaceCss(theme)}
  border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  box-shadow: ${({ theme }) => overlayPanelBoxShadowFromTheme(theme)};
`;

export const FloatingMenuDragHandleGrip = styled.span`
  font-size: 14px;
  letter-spacing: -2px;
  user-select: none;
`;

/** Зона «хваталки» для перетаскивания */
export const FloatingMenuDragHandleRoot = styled.div<{ $orientation: FloatingMenuOrientation }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  cursor: grab;
  color: ${({ theme }) => theme.colors.textSecondary};

  ${({ $orientation }) =>
    $orientation === FloatingMenuOrientation.VERTICAL ? 'margin-bottom: 2px;' : 'margin-right: 2px;'}

  &:hover {
    background: ${({ theme }) =>
      theme.mode === ThemeColorScheme.DARK ? 'rgba(255,255,255,0.08)' : '#f0f0f0'};
  }

  &:active {
    cursor: grabbing;
  }
`;
