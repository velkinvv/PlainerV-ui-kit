import styled from 'styled-components';

/**
 * Подсветка за иконкой статуса (`modalVariant`: danger / success / info).
 */
export const ModalStatusIconGlow = styled.div<{ $accentColor: string }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;

  &::before {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    background: ${({ $accentColor }) => $accentColor};
    opacity: 0.28;
    filter: blur(10px);
    pointer-events: none;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;
