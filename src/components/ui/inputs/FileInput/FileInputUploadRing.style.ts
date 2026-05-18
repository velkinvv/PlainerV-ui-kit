import styled from 'styled-components';

/** SVG кольца прогресса загрузки (`FileInputUploadRing`). */
export const FileInputUploadRingSvg = styled.svg`
  flex-shrink: 0;

  .track {
    fill: none;
    stroke: ${({ theme }) => theme.colors.borderSecondary};
    stroke-width: 2;
  }

  .arc {
    fill: none;
    stroke: ${({ theme }) => theme.colors.progressStatusLoading};
    stroke-width: 3;
    stroke-linecap: round;
    transform: rotate(-90deg);
    transform-origin: center;
  }
`;
