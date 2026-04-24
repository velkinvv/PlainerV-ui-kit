import styled from 'styled-components';
import { TableCell } from './TableCell';

/** Горизонтальный ряд внутри ячейки (аватар + текст, и т.п.). */
export const StoryTableInline = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

/**
 * Кнопка «Загрузить больше» в подвале таблицы (как ссылка с иконкой шеврона).
 * @param $disabled — визуально приглушить (опционально для сторис)
 */
export const StoryTableLoadMore = styled.button<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 0;
  padding: 4px 8px;
  border: 0;
  background: transparent;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes?.sm ?? '14px'};
  font-weight: ${({ theme }) => theme.fontWeights?.medium ?? 500};
  color: ${({ theme }) => theme.colors.primary};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: opacity 0.15s ease;

  &:hover {
    opacity: ${({ $disabled }) => ($disabled ? 0.5 : 0.85)};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: 6px;
  }
`;

/** Ячейка подвала на всю ширину под «Загрузить больше». */
export const StoryTableLoadMoreCell = styled(TableCell).attrs({
  colSpan: 7,
  align: 'center',
})`
  padding: 16px 12px;
`;

/** Счётчик кликов рядом с подписью (для сторис). */
export const StoryLoadMoreHint = styled.span`
  margin-left: 4px;
  font-size: 12px;
  opacity: 0.85;
  color: inherit;
`;
