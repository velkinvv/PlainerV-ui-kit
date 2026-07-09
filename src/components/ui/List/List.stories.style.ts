import styled from 'styled-components';

/** Вертикальный стек секций сторис List */
export const ListStoriesStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-width: 480px;
`;

/** Заголовок секции */
export const ListStoriesSectionTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

/** Подпись */
export const ListStoriesCaption = styled.p`
  margin: 0 0 12px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** Две колонки для сравнения размеров */
export const ListStoriesColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
`;
