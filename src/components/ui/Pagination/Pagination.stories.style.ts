import styled from 'styled-components';

/** Вертикальный стек секций сторис Pagination */
export const PaginationStoriesStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
`;

/** Заголовок секции в сторис */
export const PaginationStoriesSectionTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;
