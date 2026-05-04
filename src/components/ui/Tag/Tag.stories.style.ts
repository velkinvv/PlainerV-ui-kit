import styled from 'styled-components';

/** Вертикальный стек секций сторис */
export const TagStoriesStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

/** Заголовок секции */
export const TagStoriesSectionTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text};
`;

/** Ряд элементов с переносом */
export const TagStoriesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

/** Колонка: подпись + контент (размеры, скелетоны) */
export const TagStoriesColumn = styled.figure`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 96px;
`;

export const TagStoriesCaption = styled.figcaption`
  margin: 0;
  text-align: center;
  font-size: 12px;
  line-height: 1.4;
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const TagStoriesCaptionTitle = styled.strong`
  display: block;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

export const TagStoriesCaptionCode = styled.code`
  display: block;
  font-size: 11px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: ${({ theme }) => theme.colors.textTertiary};
  word-break: break-word;
`;

/** Таблица: строка палитры × колонки иконок */
export const TagStoriesMatrixSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TagStoriesMatrixAppearanceTitle = styled.h4`
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text};
`;

export const TagStoriesMatrixColorRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

export const TagStoriesMatrixLabel = styled.span`
  font-size: 12px;
  min-width: 72px;
  font-family: ${({ theme }) => theme.typography.caption.fontFamily};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
