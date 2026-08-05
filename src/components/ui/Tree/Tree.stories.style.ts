import styled from 'styled-components';

/** Вертикальный стек демо */
export const TreeStoriesStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 420px;
`;

/** Подпись секции */
export const TreeStoriesCaption = styled.p`
  margin: 0 0 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** Внешняя drop-зона для демо */
export const TreeStoriesExternalZone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  margin-bottom: 12px;
  padding: 12px;
  border: 1px dashed ${({ theme }) => theme.colors.borderSecondary};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  user-select: none;
`;
