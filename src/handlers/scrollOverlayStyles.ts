import { css } from 'styled-components';

/**
 * Прокрутка без полосы в потоке layout: колёсико и тач работают, ширина контента не «прыгает»
 * при кратковременном overflow (например, во время layout-анимации dynamicHeight).
 */
export const scrollWithoutLayoutShiftCss = css`
  scrollbar-width: none !important;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
`;

/**
 * Вертикальная прокрутка без сдвига layout при появлении/исчезновении overflow.
 */
export const verticalScrollWithoutLayoutShiftCss = css`
  overflow-x: hidden;
  overflow-y: auto;
  ${scrollWithoutLayoutShiftCss}
`;

/**
 * Горизонтальная прокрутка без сдвига layout при появлении/исчезновении overflow.
 */
export const horizontalScrollWithoutLayoutShiftCss = css`
  overflow-y: hidden;
  overflow-x: auto;
  ${scrollWithoutLayoutShiftCss}
`;
