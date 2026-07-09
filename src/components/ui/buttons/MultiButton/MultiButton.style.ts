import styled from 'styled-components';
import { createStyledShouldForwardProp } from '../../../../handlers/styledComponentHandlers';
import { getButtonSize } from '../../../../handlers/buttonThemeHandlers';
import type { Size } from '../../../../types/sizes';
import { getMultiButtonChevronPadding } from './handlers';

/**
 * Корневая обёртка split-кнопки (склеенная пара).
 * Высота сегментов выравнивается через stretch; радиусы — из темы кнопок.
 *
 * @property $size - Размер для радиуса и отступов шеврона
 * @property $disabled - Блокировка всего блока
 */
export const MultiButtonRoot = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $size: Size; $disabled: boolean }>`
  display: inline-flex;
  flex-direction: row;
  align-items: stretch;
  vertical-align: middle;
  box-sizing: border-box;
  border-radius: ${({ theme, $size }) => getButtonSize(theme.buttons, $size).borderRadius};
  opacity: ${({ $disabled }) => ($disabled ? 0.72 : 1)};

  & > .ui-multi-button__main,
  & .ui-multi-button__chevron {
    margin: 0;
    position: relative;
    z-index: 0;
    box-sizing: border-box;
    align-self: stretch;
    height: auto;
    min-height: ${({ theme, $size }) => getButtonSize(theme.buttons, $size).minHeight};
  }

  & > .ui-multi-button__main:hover,
  & > .ui-multi-button__main:focus-visible,
  & .ui-multi-button__chevron:hover,
  & .ui-multi-button__chevron:focus-visible {
    z-index: 1;
  }

  /* Основная кнопка — левый сегмент */
  & > .ui-multi-button__main {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-top-left-radius: ${({ theme, $size }) =>
      getButtonSize(theme.buttons, $size).borderRadius} !important;
    border-bottom-left-radius: ${({ theme, $size }) =>
      getButtonSize(theme.buttons, $size).borderRadius} !important;
  }

  /*
   * DropMenu → Dropdown: по умолчанию inline-block, из‑за этого шеврон
   * не растягивается по высоте main. Растягиваем всю цепочку.
   */
  & > .ui-multi-button__menu.ui-drop-menu,
  & > .ui-multi-button__menu {
    display: flex;
    align-items: stretch;
    align-self: stretch;
    height: auto;

    & > div {
      display: flex;
      align-items: stretch;
      align-self: stretch;
      height: auto;
      box-sizing: border-box;
    }
  }

  /* Шеврон — правый сегмент: высота как у Button, компактная ширина */
  & .ui-multi-button__chevron {
    border-left-width: 0;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    border-top-right-radius: ${({ theme, $size }) =>
      getButtonSize(theme.buttons, $size).borderRadius} !important;
    border-bottom-right-radius: ${({ theme, $size }) =>
      getButtonSize(theme.buttons, $size).borderRadius} !important;
    padding: ${({ theme, $size }) =>
      getMultiButtonChevronPadding(getButtonSize(theme.buttons, $size).padding, $size)};
    min-width: ${({ theme, $size }) => getButtonSize(theme.buttons, $size).minHeight};
    flex-shrink: 0;
  }
`;
