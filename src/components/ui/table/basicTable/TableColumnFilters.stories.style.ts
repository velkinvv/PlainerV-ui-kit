import styled from 'styled-components';

/** Ограничение ширины блока сторис (узкая таблица). */
export const StoryColumnFiltersPage = styled.div`
  max-width: 720px;
`;

/** Шире — под DataGrid с несколькими колонками. */
export const StoryColumnFiltersPageWide = styled.div`
  max-width: 880px;
`;

/** Вводный текст над таблицей. */
export const StoryColumnFiltersIntro = styled.p`
  margin: 0 0 12px;
  font-size: ${({ theme }) => theme.fontSizes?.sm ?? '14px'};
  line-height: ${({ theme }) => theme.lineHeights?.normal ?? 1.4};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** Подпись к полю внутри панели фильтра (сторис). */
export const StoryColumnFilterFieldLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes?.sm ?? '14px'};
  font-weight: ${({ theme }) => theme.fontWeights?.semiBold ?? 600};
  color: ${({ theme }) => theme.colors.text};
`;

/** Строка заголовка: подпись колонки + триггер фильтра (сторис). */
export const StoryColumnFilterHeaderRow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

/** Подпись колонки с обрезкой при нехватке места. */
export const StoryColumnFilterHeaderTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
