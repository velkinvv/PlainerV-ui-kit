import styled from 'styled-components';
import { Button } from '../../buttons/Button/Button';

/** Текст-подсказка над демо в Storybook */
export const DataGridStoryHint = styled.p`
  margin: 0 0 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** Обёртка для кнопки и таблицы в сторис */
export const DataGridStoryBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/**
 * Кнопка управления демо: не растягивается на всю ширину родителя (`flex-direction: column`).
 */
export const DataGridStoryControlButton = styled(Button)`
  align-self: flex-start;
`;

/** Текст деталей в раскрытой строке (сторис ленивой загрузки) */
export const DataGridStoryExpandedDetailLine = styled.p`
  margin: 0;
`;

/** Подпись поля в панели фильтра сторис «Встроенная иконка фильтра» */
export const DataGridStoryFilterFieldLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/**
 * Область с вертикальным скроллом для демонстрации `stickyHeader` у `DataGrid`:
 * родитель с ограниченной высотой и `overflow: auto` (как у примитива `Table › StickyHeader`).
 */
export const DataGridStoryScrollArea = styled.div`
  max-height: 320px;
  overflow: auto;
  border-radius: 12px;
`;
