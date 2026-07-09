import styled from 'styled-components';

/** Вертикальный стек секций */
export const PulseStoriesStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

/** Ряд точек */
export const PulseStoriesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
`;

/** Подпись рядом с точкой */
export const PulseStoriesLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
`;

/** Заголовок секции */
export const PulseStoriesSectionTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;
