import styled, { css } from 'styled-components';
import { CarouselSlideOverlayPlacement } from '../../../types/ui';

/**
 * Абсолютный слой оверлеев поверх содержимого слайда.
 */
export const CarouselSlideOverlayLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  border-radius: inherit;
`;

/**
 * Зона оверлея (top / bottom / left / right).
 * @property $placement — расположение полосы
 * @property $flexAlignment — justify-content / align-items по главной оси
 */
export const CarouselSlideOverlayZone = styled.div<{
  $placement: CarouselSlideOverlayPlacement;
  $flexAlignment: string;
}>`
  position: absolute;
  display: flex;
  gap: 8px;
  padding: 12px;
  box-sizing: border-box;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }

  ${({ $placement, $flexAlignment }) => {
    if ($placement === CarouselSlideOverlayPlacement.TOP) {
      return css`
        top: 0;
        left: 0;
        right: 0;
        flex-direction: row;
        justify-content: ${$flexAlignment};
        align-items: center;
      `;
    }

    if ($placement === CarouselSlideOverlayPlacement.BOTTOM) {
      return css`
        bottom: 0;
        left: 0;
        right: 0;
        flex-direction: row;
        justify-content: ${$flexAlignment};
        align-items: center;
      `;
    }

    if ($placement === CarouselSlideOverlayPlacement.LEFT) {
      return css`
        top: 0;
        bottom: 0;
        left: 0;
        flex-direction: column;
        justify-content: ${$flexAlignment};
        align-items: flex-start;
      `;
    }

    return css`
      top: 0;
      bottom: 0;
      right: 0;
      flex-direction: column;
      justify-content: ${$flexAlignment};
      align-items: flex-end;
    `;
  }}
`;

/**
 * Основное содержимое слайда (изображение, подпись).
 */
export const CarouselSlideContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
`;
