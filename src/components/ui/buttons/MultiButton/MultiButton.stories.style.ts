import styled from 'styled-components';

/** Вертикальный стек секций сторис MultiButton */
export const MultiButtonStoriesStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
`;

/** Горизонтальный ряд */
export const MultiButtonStoriesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
`;

/** Заголовок секции */
export const MultiButtonStoriesSectionTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

/** Подпись */
export const MultiButtonStoriesCaption = styled.p`
  margin: 0 0 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
