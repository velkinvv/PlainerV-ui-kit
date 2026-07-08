import styled from 'styled-components';

/** Контейнер демо с ограниченной высотой родителя */
export const SidemenuDynamicHeightDemoRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: min(100%, 420px);
`;

/** Область с фиксированной высотой родителя для проверки max-height */
export const SidemenuDynamicHeightDemoStage = styled.div`
  position: relative;
  height: 420px;
  padding: 16px;
  border-radius: 16px;
  border: 1px dashed ${({ theme }) => theme.colors.borderSecondary};
  background: ${({ theme }) => theme.colors.backgroundTertiary};
  box-sizing: border-box;
  overflow: hidden;
`;

/** Подпись к демо */
export const SidemenuDynamicHeightDemoHint = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** Ряд кнопок управления */
export const SidemenuDynamicHeightDemoControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

/** Кнопка управления демо */
export const SidemenuDynamicHeightDemoButton = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/** Статус количества пунктов */
export const SidemenuDynamicHeightDemoStatus = styled.output`
  display: block;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
