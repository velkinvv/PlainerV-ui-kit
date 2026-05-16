import styled from 'styled-components';

/** Ограничение ширины демо в Storybook для горизонтального сегментного трека */
export const TabsSegmentStoryHorizontalWrap = styled.div`
  width: min(480px, 100%);
`;

/** Обёртка для вертикального примера */
export const TabsSegmentStoryVerticalWrap = styled.div`
  width: min(280px, 100%);
`;

/** Широкий контейнер: горизонтальный трек на всю доступную ширину блока */
export const TabsSegmentStoryFullWidthWrap = styled.div`
  width: 100%;
  max-width: 560px;
`;

/** Подпись под контролируемым примером в Storybook */
export const TabsSegmentStoryCaption = styled.p`
  margin-top: 16px;
  font-size: 13px;
  opacity: 0.8;
`;

/** Заголовок секции внутри обзорной истории */
export const TabsSegmentStorySectionTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.textSecondary ?? '#666'};
`;

/** Сетка «все сочетания direction × variant» */
export const TabsSegmentStoryMatrix = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: min(560px, 100%);
`;

/** Строка подписи + контента для матрицы */
export const TabsSegmentStoryMatrixBlock = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

/** Инлайн-метка: иконка + Typography в одном label */
export const TabsSegmentStoryInlineLabelWrap = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;
