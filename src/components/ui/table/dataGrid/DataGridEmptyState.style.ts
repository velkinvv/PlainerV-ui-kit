import styled from 'styled-components';

/** Обёртка пустого состояния в ячейке на всю ширину таблицы */
export const DataGridEmptyStateRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  min-height: 160px;
  padding: 32px 24px;
  text-align: center;
  gap: 12px;
`;

/** Круг с иконкой лупы */
export const DataGridEmptyStateIconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.textSecondary};
  flex-shrink: 0;
`;

export const DataGridEmptyStateTitle = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.text};
`;

export const DataGridEmptyStateDescription = styled.p`
  margin: 0;
  max-width: 360px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
