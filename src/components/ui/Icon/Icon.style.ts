import styled from 'styled-components';

/**
 * Заглушка, если иконка с указанным именем не найдена.
 * @property $sizePx — ширина и высота в пикселях
 */
export const IconMissingPlaceholder = styled.div<{ $sizePx: number }>`
  width: ${({ $sizePx }) => $sizePx}px;
  height: ${({ $sizePx }) => $sizePx}px;
  background-color: ${({ theme }) => theme.colors.backgroundTertiary};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
