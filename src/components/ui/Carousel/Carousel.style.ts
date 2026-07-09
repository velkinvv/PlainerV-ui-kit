import styled, { css } from 'styled-components';
import { CarouselAnimation, CarouselDotsPosition, CarouselOrientation } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import type { Colors, ThemeColorScheme } from '../../../types/theme';
import { compactCardBorderRadiusFromTheme } from '../../../handlers/cardThemeHandlers';
import {
  getCarouselSurfaceTokens,
  type CarouselThemeContext,
} from '../../../handlers/carouselGlassHandlers';
import { getCarouselTrackTransformValue } from '../../../handlers/carouselDragHandlers';

type CarouselStyledThemeSlice = {
  mode: ThemeColorScheme;
  colors: Colors;
  surfaceMaterial?: CarouselThemeContext['surfaceMaterial'];
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
 * CSS vibrancy для glass-поверхностей карусели.
 * @param tokens — токены поверхности
 */
const carouselBackdropFilterCss = (tokens: ReturnType<typeof getCarouselSurfaceTokens>) =>
  tokens.backdropFilter
    ? css`
        backdrop-filter: ${tokens.backdropFilter};
        -webkit-backdrop-filter: ${tokens.backdropFilter};
      `
    : css``;

/**
 * Корень карусели.
 * @property $hasThumbnails — есть полоса миниатюр (aspect-ratio на main stage)
 */
export const CarouselRoot = styled.section<{
  $hasThumbnails?: boolean;
  $shellBorderRadius?: string;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  font-family: ${({ theme }) => theme.fonts.primary};
  overflow: hidden;

  ${({ $shellBorderRadius }) =>
    $shellBorderRadius
      ? css`
          border-radius: ${$shellBorderRadius};
        `
      : css``}

  ${({ theme }) => {
    const tokens = getCarouselSurfaceTokens(getCarouselThemeContext(theme));

    return tokens.shellBorder
      ? css`
          border: ${tokens.shellBorder};
        `
      : css``;
  }}
`;

/**
 * Основная область слайдов (aspect-ratio / height).
 * @property $aspectRatio — CSS aspect-ratio
 * @property $height — фиксированная высота
 */
export const CarouselMainStage = styled.div<{
  $aspectRatio?: string;
  $height?: string;
  $hasThumbnails?: boolean;
  $shellBorderRadius?: string;
}>`
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  overflow: hidden;

  ${({ $shellBorderRadius, $hasThumbnails }) =>
    $shellBorderRadius
      ? css`
          border-top-left-radius: ${$shellBorderRadius};
          border-top-right-radius: ${$shellBorderRadius};
          border-bottom-left-radius: ${$hasThumbnails ? 0 : $shellBorderRadius};
          border-bottom-right-radius: ${$hasThumbnails ? 0 : $shellBorderRadius};
        `
      : css``}

  ${({ $aspectRatio, $height }) =>
    $height
      ? css`
          height: ${$height};
        `
      : css`
          aspect-ratio: ${$aspectRatio ?? '16 / 9'};
        `}
`;

/** Область слайдов с overflow hidden */
export const CarouselViewport = styled.div<{
  $touchAction?: string;
  $isSwipeEnabled?: boolean;
  $isDragging?: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  border-radius: inherit;
  touch-action: ${({ $touchAction = 'pan-y pinch-zoom' }) => $touchAction};
  user-select: ${({ $isDragging }) => ($isDragging ? 'none' : 'auto')};
  cursor: ${({ $isSwipeEnabled, $isDragging }) => {
    if (!$isSwipeEnabled) {
      return 'default';
    }

    return $isDragging ? 'grabbing' : 'grab';
  }};

  [data-carousel-slide-clickable] {
    cursor: pointer;
  }
`;

/**
 * Горизонтальная или вертикальная лента для slide-анимации.
 * @property $activeIndex — текущий слайд
 * @property $transition — CSS transition
 * @property $orientation — ориентация карусели
 */
export const CarouselTrack = styled.div<{
  $activeIndex: number;
  $transition: string;
  $orientation?: CarouselOrientation;
  $dragOffsetPx?: number;
  $isDragging?: boolean;
}>`
  display: flex;
  flex-direction: ${({ $orientation = CarouselOrientation.HORIZONTAL }) =>
    $orientation === CarouselOrientation.VERTICAL ? 'column' : 'row'};
  width: 100%;
  height: 100%;
  transform: ${({ $activeIndex, $dragOffsetPx = 0, $orientation = CarouselOrientation.HORIZONTAL }) =>
    getCarouselTrackTransformValue($activeIndex, $dragOffsetPx, $orientation)};
  transition: ${({ $transition, $isDragging }) => ($isDragging ? 'none' : $transition)};
  will-change: transform;
`;

/** Один слайд в slide-ленте */
export const CarouselSlidePane = styled.div`
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
`;

/** Контейнер fade / scale — один слайд на экране */
export const CarouselCrossfadeViewport = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

/** Абсолютный слой fade / scale слайда */
export const CarouselCrossfadeSlide = styled.div<{
  $isActive: boolean;
  $animation: CarouselAnimation;
  $crossfadeDuration?: number;
}>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  z-index: ${({ $isActive }) => ($isActive ? 2 : 1)};
  pointer-events: ${({ $isActive }) => ($isActive ? 'auto' : 'none')};
  transform: ${({ $isActive, $animation }) => {
    if ($animation === CarouselAnimation.FADE) {
      return 'none';
    }

    return $isActive ? 'scale(1)' : 'scale(0.92)';
  }};
  transition:
    opacity ${({ $crossfadeDuration = 350 }) => `${$crossfadeDuration}ms`} ease,
    transform ${({ $crossfadeDuration = 350 }) => `${$crossfadeDuration}ms`} ease;
`;

/** Обёртка role=group вокруг слайда */
export const CarouselSlideShell = styled.div`
  width: 100%;
  height: 100%;
`;

/** Заглушка для lazy-render слайда */
export const CarouselSlidePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
`;

/** Обёртка содержимого слайда (figure для семантики с figcaption) */
export const CarouselSlideRoot = styled('figure')`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: inherit;
  margin: 0;
`;

/**
 * Изображение слайда.
 * @property $objectFit — object-fit
 */
export const CarouselImageRoot = styled.img<{ $objectFit: string }>`
  display: block;
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
  min-height: 0;
  object-fit: ${({ $objectFit }) => $objectFit};
  user-select: none;
  -webkit-user-drag: none;
`;

/** Подпись под изображением */
export const CarouselCaptionRoot = styled('figcaption')<{ $titleClickable?: boolean }>`
  flex-shrink: 0;
  margin: 0;
  padding: 10px 14px;
  font-size: 14px;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.text};
  cursor: ${({ $titleClickable }) => ($titleClickable ? 'pointer' : 'default')};

  ${({ theme }) => {
    const tokens = getCarouselSurfaceTokens(getCarouselThemeContext(theme));

    return css`
      background: ${tokens.captionBackground};
      border-top: ${tokens.captionBorder};
      ${carouselBackdropFilterCss(tokens)}
    `;
  }}
`;

/** Ряд стрелок поверх слайдов */
export const CarouselArrowsLayer = styled.div<{ $isVertical?: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: ${({ $isVertical }) => ($isVertical ? 'column' : 'row')};
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
  padding: ${({ $isVertical }) => ($isVertical ? '8px 0' : '0 8px')};
  box-sizing: border-box;
`;

/**
 * Кнопка-стрелка карусели.
 * @property $size — размер из Size
 */
export const CarouselArrowButton = styled.button<{ $size: Size }>`
  pointer-events: auto;
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
      ${carouselBackdropFilterCss(tokens)}
    `;
  }}

  ${({ $size }) => {
    switch ($size) {
      case Size.SM:
        return css`
          width: 32px;
          height: 32px;
        `;
      case Size.LG:
      case Size.XL:
        return css`
          width: 44px;
          height: 44px;
        `;
      case Size.MD:
      default:
        return css`
          width: 36px;
          height: 36px;
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

/**
 * Обёртка точек и autoplay-кнопки.
 * @property $dotsPosition — inner / outer
 * @property $orientation — ориентация карусели
 */
export const CarouselControlsFooter = styled.div<{
  $dotsPosition: CarouselDotsPosition;
  $orientation?: CarouselOrientation;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;

  ${({ $dotsPosition, $orientation = CarouselOrientation.HORIZONTAL }) => {
    const isVerticalOrientation = $orientation === CarouselOrientation.VERTICAL;

    if ($dotsPosition === CarouselDotsPosition.INNER) {
      if (isVerticalOrientation) {
        return css`
          position: absolute;
          top: 50%;
          right: 12px;
          bottom: auto;
          left: auto;
          transform: translateY(-50%);
          flex-direction: column;
          width: auto;
          z-index: 2;
          pointer-events: none;

          & > * {
            pointer-events: auto;
          }
        `;
      }

      return css`
        position: absolute;
        left: 0;
        right: 0;
        bottom: 12px;
        z-index: 2;
        pointer-events: none;

        & > * {
          pointer-events: auto;
        }
      `;
    }

    return css`
      position: relative;
      margin-top: 10px;
      flex-direction: ${isVerticalOrientation ? 'column' : 'row'};
    `;
  }}
`;

/** Список точек-индикаторов */
export const CarouselDotsList = styled.ul<{ $isVertical?: boolean }>`
  display: inline-flex;
  flex-direction: ${({ $isVertical }) => ($isVertical ? 'column' : 'row')};
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 6px 10px;
  list-style: none;
  border-radius: 9999px;

  ${({ theme }) => {
    const tokens = getCarouselSurfaceTokens(getCarouselThemeContext(theme));

    return css`
      background: ${tokens.dotsTrackBackground};
      ${carouselBackdropFilterCss(tokens)}
    `;
  }}
`;

/**
 * Точка-индикатор слайда.
 * @property $active — текущий слайд
 */
export const CarouselDotButton = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $active }) => ($active ? '10px' : '8px')};
  height: ${({ $active }) => ($active ? '10px' : '8px')};
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'rgba(255, 255, 255, 0.72)'};
  transition:
    transform 0.2s ease,
    background 0.2s ease;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/** Кнопка паузы / воспроизведения автопрокрутки */
export const CarouselAutoplayButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin: 0;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;

  ${({ theme }) => {
    const tokens = getCarouselSurfaceTokens(getCarouselThemeContext(theme));

    return css`
      color: ${tokens.controlTextColor};
      background: ${tokens.controlBackground};
      border: ${tokens.controlBorder};
      ${carouselBackdropFilterCss(tokens)}
    `;
  }}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/**
 * Полоса миниатюр под основной областью.
 * @property $thumbnailHeight — высота миниатюры в px
 */
export const CarouselThumbnailsStrip = styled.nav<{
  $thumbnailHeight: number;
  $bottomBorderRadius?: string;
}>`
  flex-shrink: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;

  ${({ $bottomBorderRadius }) =>
    $bottomBorderRadius
      ? css`
          border-bottom-left-radius: ${$bottomBorderRadius};
          border-bottom-right-radius: ${$bottomBorderRadius};
        `
      : css``}

  ${({ theme }) => {
    const tokens = getCarouselSurfaceTokens(getCarouselThemeContext(theme));

    return css`
      background: ${tokens.thumbnailStripBackground};
      border-top: ${tokens.captionBorder};
      ${carouselBackdropFilterCss(tokens)}
    `;
  }}
`;

/** Горизонтальный скролл миниатюр */
export const CarouselThumbnailsList = styled.ul`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 9999px;
    background: ${({ theme }) => theme.colors.borderSecondary};
  }
`;

/**
 * Кнопка-миниатюра слайда.
 * @property $active — текущий слайд
 * @property $thumbnailHeight — высота в px
 */
export const CarouselThumbnailButton = styled.button<{
  $active: boolean;
  $thumbnailHeight: number;
}>`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $thumbnailHeight }) => Math.round($thumbnailHeight * 1.5)}px;
  height: ${({ $thumbnailHeight }) => $thumbnailHeight}px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  border-radius: 8px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  ${({ theme, $active }) => {
    const tokens = getCarouselSurfaceTokens(getCarouselThemeContext(theme));

    return css`
      border: 2px solid
        ${$active ? tokens.thumbnailActiveBorder : tokens.thumbnailInactiveBorder};
      box-shadow: ${$active ? `0 0 0 1px ${tokens.thumbnailActiveBorder}` : 'none'};
      transform: ${$active ? 'scale(1.02)' : 'none'};
      opacity: ${$active ? 1 : 0.72};
    `;
  }}

  &:hover:enabled {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/** Изображение внутри кнопки-миниатюры */
export const CarouselThumbnailImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
`;

/** Скругление внешней оболочки карусели — на ступень меньше, чем у Card */
export const getCarouselShellBorderRadius = (
  theme: { borderRadius?: unknown; cards?: unknown; globalSize?: unknown },
  size: Size,
) => compactCardBorderRadiusFromTheme(theme as never, size);
