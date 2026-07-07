import { BorderRadiusHandler } from '../../../handlers/uiHandlers';
import styled, { css } from 'styled-components';
import { ActionBarSize } from '../../../types/ui';
import { getActionBarDividerHeightPx, getActionBarItemSizePx } from './handlers';

/**
 * Корень панели действий.
 * @property $barSize — высота ряда кнопок
 */
export const ActionBarRoot = styled.div<{ $barSize: ActionBarSize }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  height: ${({ $barSize }) => getActionBarItemSizePx($barSize)}px;
`;

/**
 * Слот кнопки действия фиксированного размера.
 * @property $barSize — габарит кнопки
 */
export const ActionBarItemSlot = styled.div<{ $barSize: ActionBarSize }>`
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${({ $barSize }) => getActionBarItemSizePx($barSize)}px;
  height: ${({ $barSize }) => getActionBarItemSizePx($barSize)}px;

  & > .ui-icon-button {
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;
  }
`;

/**
 * Обёртка вертикального разделителя между группами.
 * @property $barSize — высота линии
 */
export const ActionBarDividerWrap = styled.div<{ $barSize: ActionBarSize }>`
  box-sizing: border-box;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1px;
  height: ${({ $barSize }) => getActionBarItemSizePx($barSize)}px;
`;

/** Линия разделителя */
export const ActionBarDividerLine = styled.div<{ $barSize: ActionBarSize }>`
  box-sizing: border-box;
  width: 1px;
  height: ${({ $barSize }) => getActionBarDividerHeightPx($barSize)}px;
  background: ${({ theme }) => theme.colors.borderSecondary};
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
