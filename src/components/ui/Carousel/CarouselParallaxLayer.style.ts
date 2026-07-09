import styled from 'styled-components';

/**
 * Обёртка parallax-слоя внутри слайда.
 * @property $transform — CSS transform
 * @property $transition — CSS transition
 */
export const CarouselParallaxLayerRoot = styled.div<{
  $transform: string;
  $transition: string;
}>`
  transform: ${({ $transform }) => $transform};
  transition: ${({ $transition }) => $transition};
`;

/** Фоновая обёртка изображения с overflow для scale parallax */
export const CarouselParallaxImageShell = styled.div`
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  overflow: hidden;

  ${CarouselParallaxLayerRoot} {
    width: 100%;
    height: 100%;
  }
`;
