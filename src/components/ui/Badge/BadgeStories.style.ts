import styled from 'styled-components';

/** Корневая сетка истории «все размеры» */
export const BadgeStoriesSizesRoot = styled.section`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  align-items: flex-end;
`;

/** Одна колонка: подпись и бейдж */
export const BadgeStoriesSizeFigure = styled.figure`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-width: 96px;
`;

/** Подпись размера и пропа */
export const BadgeStoriesSizeCaption = styled.figcaption`
  text-align: center;
  font-size: 12px;
  line-height: 1.45;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** Человекочитаемое имя (Точка, XS, …) */
export const BadgeStoriesSizeTitle = styled.strong`
  display: block;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

/** Строка кода с именем пропа */
export const BadgeStoriesSizeProp = styled.code`
  display: block;
  font-size: 11px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: ${({ theme }) => theme.colors.textTertiary};
  word-break: break-word;
`;
