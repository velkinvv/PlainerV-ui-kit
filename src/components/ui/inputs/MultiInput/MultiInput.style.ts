import styled from 'styled-components';
import { StyledInput } from '../shared/InputStyles';

/**
 * Контейнер чипов и поля ввода внутри `InputWrapper`: перенос строк, общий зазор.
 */
export const MultiInputInner = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  min-width: 0;
`;

/**
 * Внутреннее поле для следующего токена (без собственной рамки — обводка у обёртки).
 * @see StyledInput
 */
export const MultiInputNativeInput = styled(StyledInput)`
  flex: 1 1 80px;
  min-width: 3.5rem;
  width: auto;
`;
