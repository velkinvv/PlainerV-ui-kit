import styled from 'styled-components';

/** Текст-подсказка над демо в Storybook */
export const DataGridStoryHint = styled.p`
  margin: 0 0 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** Обёртка для кнопки + таблицы в сторис */
export const DataGridStoryBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
