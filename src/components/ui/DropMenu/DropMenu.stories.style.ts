import styled from 'styled-components';

/** Вертикальный стек секций сторис DropMenu */
export const DropMenuStoriesStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
`;

/** Заголовок секции */
export const DropMenuStoriesSectionTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

/** Подпись */
export const DropMenuStoriesCaption = styled.p`
  margin: 0 0 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** Ряд с несколькими демо */
export const DropMenuStoriesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
`;
