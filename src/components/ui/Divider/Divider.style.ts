import styled from 'styled-components';
import { type DividerProps, DividerOrientation } from '../../../types/ui';
import { DividerSizeHandler } from '../../../handlers/uiHandlers';
import { Size } from '../../../types/sizes';

/**
 * Контейнер разделителя
 * @param orientation - ориентация разделителя (HORIZONTAL, VERTICAL)
 * @param size - размер разделителя
 */
export const DividerContainer = styled.div<DividerProps>`
  background: ${({ theme }) => theme.colors.backgroundQuaternary};

  ${({ orientation = DividerOrientation.HORIZONTAL, size = Size.MD }) => {
    const isHorizontal = orientation === DividerOrientation.HORIZONTAL;
    const sizeValue = DividerSizeHandler(size);

    return `
      ${isHorizontal ? `width: 100%; height: ${sizeValue};` : `width: ${sizeValue}; height: 100%;`}
    `;
  }}
`;
