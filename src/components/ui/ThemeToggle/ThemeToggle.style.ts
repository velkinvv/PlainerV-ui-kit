import styled from 'styled-components';

/**
 * Контейнер иконки
 */
export const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
`;

/**
 * Иконка солнца
 */
export const SunIcon = styled(IconContainer)`
  left: 2px;
`;

/**
 * Иконка луны
 */
export const MoonIcon = styled(IconContainer)`
  right: 2px;
`;
