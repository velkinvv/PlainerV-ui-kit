import styled from 'styled-components';

/** Контент панели вкладки в сторис */
export const TabsStoriesPanelContent = styled.div`
  padding: 16px;
`;

/** Блок кода внутри панели */
export const TabsStoriesCodeBlock = styled.pre`
  background-color: ${({ theme }) => theme.colors.backgroundTertiary};
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  overflow: auto;
`;

/** Превью-панель внутри контента вкладки */
export const TabsStoriesPreviewPanel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundTertiary};
`;

/** Вертикальный стек блоков в docs-сторис */
export const TabsStoriesDocsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/** Контейнер контролируемого примера */
export const TabsStoriesControlledContainer = styled.div`
  width: 500px;
`;

/** Подпись над контролируемыми Tabs */
export const TabsStoriesControlledLabel = styled.p`
  margin-bottom: 16px;
`;

/**
 * Широкая рамка для сторис underline / line.
 * @property $widthPx - Ширина в px (по умолчанию без фиксированной ширины)
 */
export const TabsStoriesWideDashedPanel = styled.div<{ $widthPx?: number }>`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  padding: 12px;
  width: ${({ $widthPx }) => ($widthPx != null ? `${$widthPx}px` : 'auto')};
`;

/** Узкий хост для демо scrollable-трека */
export const TabsStoriesScrollableHost = styled.div`
  width: 280px;
  max-width: 100%;
`;

/** Вертикальный стек для сторис Colors */
export const TabsStoriesColorsStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: stretch;
  min-width: 280px;
`;
