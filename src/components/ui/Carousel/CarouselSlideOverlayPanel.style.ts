import styled, { css } from 'styled-components';
import {
  CarouselSlideOverlayPanelGradient,
  CarouselSlideOverlayPanelPlacement,
} from '../../../types/ui';

/**
 * Слой контентных панелей поверх слайда (ниже зон Carousel.Overlay).
 */
export const CarouselSlideOverlayPanelLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  border-radius: inherit;
`;

/**
 * Контентная панель поверх изображения слайда.
 * @property $placement — top / center / bottom / stretch
 * @property $mainAxisAlignment — justify-content
 * @property $crossAxisAlignment — align-items
 * @property $textAlignment — text-align
 * @property $gradient — тип градиентной подложки
 */
export const CarouselSlideOverlayPanelRoot = styled.div<{
  $placement: CarouselSlideOverlayPanelPlacement;
  $mainAxisAlignment: string;
  $crossAxisAlignment: string;
  $textAlignment: 'left' | 'center' | 'right';
  $gradient: CarouselSlideOverlayPanelGradient;
}>`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 24px;
  box-sizing: border-box;
  pointer-events: none;
  color: #ffffff;
  text-align: ${({ $textAlignment }) => $textAlignment};

  & > * {
    pointer-events: auto;
  }

  ${({ $placement, $mainAxisAlignment, $crossAxisAlignment }) => {
    if ($placement === CarouselSlideOverlayPanelPlacement.STRETCH) {
      return css`
        inset: 0;
        justify-content: ${$mainAxisAlignment};
        align-items: ${$crossAxisAlignment};
      `;
    }

    if ($placement === CarouselSlideOverlayPanelPlacement.CENTER) {
      return css`
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        justify-content: center;
        align-items: ${$crossAxisAlignment};
      `;
    }

    if ($placement === CarouselSlideOverlayPanelPlacement.TOP) {
      return css`
        top: 0;
        left: 0;
        right: 0;
        justify-content: ${$mainAxisAlignment};
        align-items: stretch;
      `;
    }

    return css`
      bottom: 0;
      left: 0;
      right: 0;
      justify-content: ${$mainAxisAlignment};
      align-items: stretch;
    `;
  }}

  ${({ $gradient, $placement }) => {
    if ($gradient === CarouselSlideOverlayPanelGradient.NONE) {
      return '';
    }

    if ($gradient === CarouselSlideOverlayPanelGradient.FULL) {
      return css`
        &::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: rgba(0, 0, 0, 0.48);
          pointer-events: none;
          z-index: -1;
        }
      `;
    }

    if ($gradient === CarouselSlideOverlayPanelGradient.TOP) {
      return css`
        &::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: ${$placement === CarouselSlideOverlayPanelPlacement.STRETCH ? '0' : '-60%'};
          border-radius: inherit;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.78) 0%,
            rgba(0, 0, 0, 0.42) 45%,
            rgba(0, 0, 0, 0) 100%
          );
          pointer-events: none;
          z-index: -1;
        }
      `;
    }

    return css`
      &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: ${$placement === CarouselSlideOverlayPanelPlacement.STRETCH ? '0' : '-70%'};
        border-radius: inherit;
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.82) 0%,
          rgba(0, 0, 0, 0.46) 42%,
          rgba(0, 0, 0, 0) 100%
        );
        pointer-events: none;
        z-index: -1;
      }
    `;
  }}
`;

/** Заголовок внутри контентной панели */
export const CarouselSlideOverlayPanelTitleRoot = styled.h3`
  margin: 0;
  font-size: 1.375rem;
  line-height: 1.25;
  font-weight: 700;
  color: inherit;
`;

/** Текст внутри контентной панели */
export const CarouselSlideOverlayPanelTextRoot = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.92);
  max-width: 42rem;
`;
