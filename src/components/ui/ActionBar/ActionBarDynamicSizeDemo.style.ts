import styled, { css } from 'styled-components';
import { ActionBarOrientation } from '../../../types/ui';

/** Корень демо dynamicSize */
export const ActionBarDynamicSizeDemoRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: min(100%, 560px);
`;

/**
 * Сцена с ограниченным размером родителя.
 * @property $orientation — для vertical ограничиваем высоту, для horizontal — ширину
 */
export const ActionBarDynamicSizeDemoStage = styled.div<{ $orientation: ActionBarOrientation }>`
  position: relative;
  padding: 16px;
  border-radius: 16px;
  border: 1px dashed ${({ theme }) => theme.colors.borderSecondary};
  background: ${({ theme }) => theme.colors.backgroundTertiary};
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: ${({ $orientation }) =>
    $orientation === ActionBarOrientation.VERTICAL ? 'flex-start' : 'center'};
  justify-content: ${({ $orientation }) =>
    $orientation === ActionBarOrientation.VERTICAL ? 'center' : 'flex-start'};

  ${({ $orientation }) =>
    $orientation === ActionBarOrientation.VERTICAL
      ? css`
          height: 420px;
        `
      : css`
          width: 100%;
          max-width: 420px;
          min-height: 96px;
        `}
`;

/** Подпись демо */
export const ActionBarDynamicSizeDemoHint = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** Переключатель ориентации */
export const ActionBarDynamicSizeDemoOrientationToggle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

/** Кнопки управления */
export const ActionBarDynamicSizeDemoControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

/**
 * Кнопка управления.
 * @property $active — активное состояние (переключатель ориентации)
 */
export const ActionBarDynamicSizeDemoButton = styled.button<{ $active?: boolean }>`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.borderSecondary};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.backgroundSecondary : theme.colors.background};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  font-size: 13px;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/** Статус количества действий */
export const ActionBarDynamicSizeDemoStatus = styled.output`
  display: block;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
