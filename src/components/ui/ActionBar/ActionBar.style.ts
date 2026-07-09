import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { BorderRadiusHandler } from '../../../handlers/uiHandlers';
import { ActionBarOrientation, ActionBarSize } from '../../../types/ui';
import { getActionBarDividerHeightPx, getActionBarItemSizePx } from './handlers';
import {
  horizontalScrollWithoutLayoutShiftCss,
  verticalScrollWithoutLayoutShiftCss,
} from '../../../handlers/scrollOverlayStyles';
import { navigationMenuItemHighlightPulseCss } from '@/handlers/navigationMenuItemHighlightHandlers';

/** Общие пропсы корней ActionBar */
type ActionBarRootSharedProps = {
  $barSize: ActionBarSize;
};

type ActionBarMotionRootProps = ActionBarRootSharedProps & {
  $orientation: ActionBarOrientation;
  $dynamicSizeMaxCss?: string;
  $sizeAnimating?: boolean;
};

/**
 * Корень панели — горизонтальный статический режим (100% ширины, overflow-меню).
 */
export const ActionBarRoot = styled.div<ActionBarRootSharedProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  height: ${({ $barSize }) => getActionBarItemSizePx($barSize)}px;
`;

/**
 * Корень панели — вертикальный статический режим.
 */
export const ActionBarVerticalRoot = styled.div<ActionBarRootSharedProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ $barSize }) => getActionBarItemSizePx($barSize)}px;
  max-width: 100%;
  min-width: 0;
  height: auto;
`;

/**
 * Корень панели с dynamicSize и layout-анимацией (horizontal / vertical).
 * Без фона и бордера — для встраивания в родительские компоненты.
 */
export const ActionBarMotionRoot = styled(motion.div)<ActionBarMotionRootProps>`
  box-sizing: border-box;
  display: flex;
  align-items: center;

  ${({ $orientation }) =>
    $orientation === ActionBarOrientation.VERTICAL
      ? css`
          .ui-action-bar-item-presence:not(:last-child) {
            margin-bottom: 4px;
          }

          .ui-action-bar-item-presence:last-child {
            margin-bottom: 0 !important;
          }
        `
      : css`
          .ui-action-bar-item-presence:not(:last-child) {
            margin-right: 4px;
          }

          .ui-action-bar-item-presence:last-child {
            margin-right: 0 !important;
          }
        `}

  ${({ $barSize, $orientation, $dynamicSizeMaxCss, $sizeAnimating }) => {
    const itemSizePx = getActionBarItemSizePx($barSize);
    const maxSizeCss = $dynamicSizeMaxCss ?? 'calc(100vw - 32px)';

    if ($orientation === ActionBarOrientation.VERTICAL) {
      return css`
        flex-direction: column;
        width: ${itemSizePx}px;
        max-width: 100%;
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
      width: max-content;
      max-width: ${maxSizeCss};
      height: ${itemSizePx}px;

      ${$sizeAnimating
        ? 'overflow: hidden;'
        : css`
            overflow-y: hidden;
            ${horizontalScrollWithoutLayoutShiftCss}
          `}
    `;
  }}
`;

/**
 * Прокручиваемая зона пунктов в режиме dynamicSize.
 * @property $orientation — направление flex
 */
export const ActionBarScrollableItemsZone = styled.div<{
  $orientation: ActionBarOrientation;
  $sizeAnimating?: boolean;
}>`
  display: flex;
  align-items: center;
  min-width: 0;
  min-height: 0;
  flex: 1 1 auto;
  gap: 0;

  ${({ $orientation, $sizeAnimating }) => {
    const directionCss =
      $orientation === ActionBarOrientation.VERTICAL
        ? css`
            flex-direction: column;
            width: 100%;
          `
        : css`
            flex-direction: row;
            height: 100%;
          `;

    if ($sizeAnimating) {
      return css`
        overflow: hidden;
        ${directionCss}
      `;
    }

    const scrollCss =
      $orientation === ActionBarOrientation.VERTICAL
        ? verticalScrollWithoutLayoutShiftCss
        : horizontalScrollWithoutLayoutShiftCss;

    return css`
      ${directionCss}
      ${scrollCss}
    `;
  }}
`;

/**
 * Обёртка для измерения натурального размера слота (клон в body).
 * @property $orientation — направление flex внутри слота
 */
export const ActionBarVisibleItemMeasureShell = styled.div<{ $orientation?: ActionBarOrientation }>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;

  ${({ $orientation }) =>
    $orientation === ActionBarOrientation.VERTICAL
      ? css`
          flex-direction: column;
          width: 100%;
        `
      : css`
          flex-direction: row;
          height: 100%;
        `}
`;

/**
 * Обёртка одного видимого действия (AnimatePresence).
 * @property $orientation — origin анимации и направление flex
 */
export const ActionBarVisibleItemPresence = styled(motion.div)<{
  $orientation: ActionBarOrientation;
}>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  overflow: hidden;

  ${({ $orientation }) =>
    $orientation === ActionBarOrientation.VERTICAL
      ? css`
          flex-direction: column;
          width: 100%;
          transform-origin: center top;
        `
      : css`
          flex-direction: row;
          height: 100%;
          transform-origin: left center;
        `}
`;

/**
 * Слот кнопки действия фиксированного размера.
 * @property $barSize — габарит кнопки
 */
export const ActionBarItemSlot = styled.div<{ $barSize: ActionBarSize; $highlightPulse?: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${({ $barSize }) => getActionBarItemSizePx($barSize)}px;
  height: ${({ $barSize }) => getActionBarItemSizePx($barSize)}px;
  border-radius: 6px;

  ${({ $highlightPulse, theme }) => ($highlightPulse ? navigationMenuItemHighlightPulseCss(theme) : '')}

  & > .ui-icon-button {
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;
  }
`;

/**
 * Обёртка разделителя между группами.
 * @property $barSize — габарит панели
 * @property $verticalLayout — горизонтальная линия в vertical
 */
export const ActionBarDividerWrap = styled.div<{
  $barSize: ActionBarSize;
  $verticalLayout?: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  ${({ $barSize, $verticalLayout }) =>
    $verticalLayout
      ? css`
          width: ${Math.round(getActionBarItemSizePx($barSize) * 0.55)}px;
          height: 1px;
        `
      : css`
          width: 1px;
          height: ${getActionBarItemSizePx($barSize)}px;
        `}
`;

/** Линия разделителя */
export const ActionBarDividerLine = styled.div<{
  $barSize: ActionBarSize;
  $verticalLayout?: boolean;
}>`
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.borderSecondary};

  ${({ $barSize, $verticalLayout }) =>
    $verticalLayout
      ? css`
          width: 100%;
          height: 1px;
        `
      : css`
          width: 1px;
          height: ${getActionBarDividerHeightPx($barSize)}px;
        `}
`;

/**
 * Слот overflow-меню.
 * @property $barSize — габарит кнопки «ещё»
 */
export const ActionBarOverflowSlot = styled.div<{ $barSize: ActionBarSize }>`
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${({ $barSize }) => getActionBarItemSizePx($barSize)}px;
  height: ${({ $barSize }) => getActionBarItemSizePx($barSize)}px;
`;

/**
 * Кнопка overflow-меню.
 * @property $barSize — габарит кнопки
 */
export const ActionBarOverflowTrigger = styled.button<{ $barSize: ActionBarSize }>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $barSize }) => getActionBarItemSizePx($barSize)}px;
  height: ${({ $barSize }) => getActionBarItemSizePx($barSize)}px;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;

  &:hover:enabled {
    background: ${({ theme }) => theme.colors.backgroundTertiary};
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;

/**
 * Содержимое строки overflow-меню (иконка + текст).
 * @property $barSize — размер иконки в пункте
 */
export const ActionBarDropMenuItemContent = styled.div<{ $barSize: ActionBarSize }>`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ $barSize }) =>
    $barSize === ActionBarSize.SM
      ? css`
          & > svg,
          & .ui-icon svg {
            width: 20px;
            height: 20px;
          }
        `
      : css`
          & > svg,
          & .ui-icon svg {
            width: 24px;
            height: 24px;
          }
        `}
`;
