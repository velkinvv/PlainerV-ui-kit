import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Size } from '../../../types/sizes';
import {
  getCarouselSurfaceTokens,
  type CarouselThemeContext,
} from '../../../handlers/carouselGlassHandlers';
import {
  getModalOverlayTokens,
  getModalThemeContext,
} from '../../../handlers/modalGlassHandlers';

type CarouselStyledThemeSlice = {
  mode: CarouselThemeContext['mode'];
  colors: CarouselThemeContext['colors'];
  surfaceMaterial?: CarouselThemeContext['surfaceMaterial'];
  modals?: ReturnType<typeof getModalThemeContext>['modals'];
};

/**
 * Контекст темы карусели для резолва glass-токенов.
 * @param theme — styled-components theme
 */
const getCarouselThemeContext = (theme: CarouselStyledThemeSlice): CarouselThemeContext => ({
  mode: theme.mode,
  colors: theme.colors,
  surfaceMaterial: theme.surfaceMaterial,
});

/**
 * CSS vibrancy для glass-поверхностей полноэкранного режима.
 * @param tokens — токены поверхности
 */
const carouselFullscreenBackdropFilterCss = (
  tokens: ReturnType<typeof getCarouselSurfaceTokens>,
) =>
  tokens.backdropFilter
    ? css`
        backdrop-filter: ${tokens.backdropFilter};
        -webkit-backdrop-filter: ${tokens.backdropFilter};
      `
    : css``;

/** Затемнённый оверлей полноэкранного просмотра (как у Modal) */
export const CarouselFullscreenOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  min-width: 100vw;
  min-height: 100vh;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;

  ${({ theme }) => {
    const overlayTokens = getModalOverlayTokens(getModalThemeContext(theme));

    return css`
      background: ${overlayTokens.background};
      backdrop-filter: ${overlayTokens.backdropFilter};
      -webkit-backdrop-filter: ${overlayTokens.backdropFilter};
      z-index: ${overlayTokens.zIndex};
    `;
  }}
`;

/** Внутренний контент полноэкранного режима с анимацией появления */
export const CarouselFullscreenContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
`;

/** Верхняя панель полноэкранного режима */
export const CarouselFullscreenHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-shrink: 0;
  padding: 16px 20px;
  box-sizing: border-box;
`;

/** Счётчик слайдов в полноэкранном режиме */
export const CarouselFullscreenCounter = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.text};
`;

/** Область изображения */
export const CarouselFullscreenStage = styled.div`
  position: relative;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  padding: 0 20px 20px;
  box-sizing: border-box;
`;

/** Изображение на весь экран */
export const CarouselFullscreenImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
`;

/** Контейнер произвольного контента слайда в полноэкранном режиме */
export const CarouselFullscreenCustomContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: min(100%, 1200px);
  max-height: 100%;
  box-sizing: border-box;
  overflow: auto;
`;

/** Подпись под изображением в полноэкранном режиме */
export const CarouselFullscreenCaption = styled.p`
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 20px;
  margin: 0;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.45;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.card};
  box-sizing: border-box;
  opacity: 0.92;
`;

/** Слой стрелок в полноэкранном режиме */
export const CarouselFullscreenArrowsLayer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
  padding: 0 12px;
  box-sizing: border-box;
`;

/**
 * Кнопка управления каруселью поверх слайда.
 * @property $size — размер из Size
 */
export const CarouselOverlayUtilityButton = styled.button<{ $size: Size }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
  opacity: 0.92;
  box-shadow: ${({ theme }) => theme.boxShadow.sm};

  ${({ theme }) => {
    const tokens = getCarouselSurfaceTokens(getCarouselThemeContext(theme));

    return css`
      border: ${tokens.controlBorder};
      background: ${tokens.controlBackground};
      color: ${tokens.controlTextColor};
      ${carouselFullscreenBackdropFilterCss(tokens)}
    `;
  }}

  ${({ $size }) => {
    switch ($size) {
      case Size.SM:
        return css`
          width: 32px;
          height: 32px;
          font-size: 14px;
        `;
      case Size.LG:
      case Size.XL:
        return css`
          width: 44px;
          height: 44px;
          font-size: 18px;
        `;
      case Size.MD:
      default:
        return css`
          width: 36px;
          height: 36px;
          font-size: 16px;
        `;
    }
  }}

  &:hover:enabled {
    ${({ theme }) => {
      const tokens = getCarouselSurfaceTokens(getCarouselThemeContext(theme));

      return css`
        background: ${tokens.controlHoverBackground};
      `;
    }}
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

/** Кнопка закрытия полноэкранного режима */
export const CarouselFullscreenCloseButton = styled(CarouselOverlayUtilityButton)`
  flex-shrink: 0;
`;

/** Слой кнопки открытия полноэкранного режима */
export const CarouselFullscreenOpenLayer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 4;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;

/** Кнопка-стрелка в полноэкранном режиме */
export const CarouselFullscreenArrowButton = styled(CarouselOverlayUtilityButton)`
  pointer-events: auto;
`;
