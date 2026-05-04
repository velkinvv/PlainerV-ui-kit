import styled from 'styled-components';

/** Корневая обёртка демо (ограничение ширины для читаемости) */
export const SliderStoriesRoot = styled.div`
  max-width: 640px;
`;

/** Вертикальный стек секций */
export const SliderStoriesStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

/** Секция с заголовком */
export const SliderStoriesSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/** Заголовок секции в демо */
export const SliderStoriesSectionTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** Ряд: подпись размера + слайдер */
export const SliderStoriesSizeRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

/** Подпись размера (enum Size) */
export const SliderStoriesSizeLabel = styled.span`
  font-size: 12px;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.textTertiary};
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
`;

/** Узкий контейнер (проверка переноса и бегунка у края) */
export const SliderStoriesNarrow = styled.div`
  max-width: 280px;
`;
