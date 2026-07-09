import styled from 'styled-components';
import { createStyledShouldForwardProp } from '../../../handlers/styledComponentHandlers';

/**
 * Контейнер группы чипов (flex-ряд с переносом).
 */
export const ChipsRoot = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
`;
