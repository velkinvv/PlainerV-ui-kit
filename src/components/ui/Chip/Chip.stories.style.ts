import styled from 'styled-components';

/** Вертикальный стек секций сторис Chip */
export const ChipStoriesStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

/** Горизонтальный ряд чипов */
export const ChipStoriesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

/** Заголовок секции в сторис */
export const ChipStoriesSectionTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

/** Подпись под рядом */
export const ChipStoriesCaption = styled.p`
  margin: 0 0 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
