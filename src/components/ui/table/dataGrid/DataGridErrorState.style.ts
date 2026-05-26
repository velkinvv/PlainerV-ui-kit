import styled from 'styled-components';

/** Корень блока ошибки в `tbody` или в раскрытой подстроке */
export const DataGridErrorStateRoot = styled.div<{ $compact?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  min-height: ${({ $compact }) => ($compact ? '96px' : '160px')};
  padding: ${({ $compact }) => ($compact ? '16px 20px' : '32px 24px')};
  text-align: center;
  gap: ${({ $compact }) => ($compact ? '8px' : '12px')};
`;

/** Круг с иконкой предупреждения */
export const DataGridErrorStateIconWrap = styled.div<{ $compact?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $compact }) => ($compact ? '44px' : '56px')};
  height: ${({ $compact }) => ($compact ? '44px' : '56px')};
  border-radius: 50%;
  background: ${({ theme }) =>
    `color-mix(in srgb, ${theme.colors.danger} 12%, ${theme.colors.backgroundSecondary})`};
  color: ${({ theme }) => theme.colors.danger};
  flex-shrink: 0;
`;

export const DataGridErrorStateTitle = styled.p<{ $compact?: boolean }>`
  margin: 0;
  font-size: ${({ $compact }) => ($compact ? '14px' : '16px')};
  font-weight: 600;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.text};
`;

export const DataGridErrorStateDescription = styled.p<{ $compact?: boolean }>`
  margin: 0;
  max-width: 360px;
  font-size: ${({ $compact }) => ($compact ? '13px' : '14px')};
  font-weight: 400;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const DataGridErrorStateActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 4px;
`;
