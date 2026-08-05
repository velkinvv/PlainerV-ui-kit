import styled, { css } from 'styled-components';
import { createStyledShouldForwardProp } from '../../../handlers/styledComponentHandlers';
import { BorderRadiusHandler, TransitionHandler } from '../../../handlers/uiHandlers';

/**
 * Корень TransferList.
 * @property $fullWidth - На всю ширину родителя
 */
export const TransferListRoot = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 12px;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  max-width: 100%;
  box-sizing: border-box;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

/**
 * Панель (левая / правая).
 */
export const TransferListPanelRoot = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  background: ${({ theme }) => theme.colors.card ?? theme.colors.background};
  overflow: hidden;
`;

/** Шапка панели: заголовок / select-all / счётчик */
export const TransferListPanelHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 12px 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSecondary};
`;

/** Строка заголовка и счётчика */
export const TransferListPanelTitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
`;

export const TransferListPanelTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.label.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.fontWeight};
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.text};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TransferListCounter = styled.span`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const TransferListSelectAllRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TransferListSearchWrap = styled.div`
  padding: 0 12px 8px;
`;

/**
 * Прокручиваемый список пунктов.
 * @property $heightCss - Высота области списка
 * @property $isDropTarget - Подсветка зоны drop
 */
export const TransferListList = styled.ul.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $heightCss: string; $isDropTarget?: boolean }>`
  list-style: none;
  margin: 0;
  padding: 4px 0;
  overflow: auto;
  height: ${({ $heightCss }) => $heightCss};
  box-sizing: border-box;
  background: ${({ theme, $isDropTarget }) =>
    $isDropTarget
      ? `color-mix(in srgb, ${theme.colors.primary} 8%, ${theme.colors.input ?? theme.colors.background})`
      : 'transparent'};
  transition: ${TransitionHandler()};
`;

/**
 * Строка пункта.
 * @property $dragging - Полупрозрачность при drag
 * @property $dropBefore - Индикатор вставки перед строкой
 * @property $disabled - Неактивная строка
 */
export const TransferListItemRowRoot = styled.li.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{
  $dragging?: boolean;
  $dropBefore?: boolean;
  $disabled?: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
  margin: 0;
  padding: 8px 12px;
  box-sizing: border-box;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'default')};
  opacity: ${({ $dragging }) => ($dragging ? 0.45 : 1)};
  transition: ${TransitionHandler()};

  ${({ $dropBefore, theme }) =>
    $dropBefore
      ? css`
          &::before {
            content: '';
            position: absolute;
            left: 12px;
            right: 12px;
            top: 0;
            height: 2px;
            border-radius: 1px;
            background: ${theme.colors.primary};
          }
        `
      : undefined}

  &:hover {
    background: ${({ theme, $disabled }) =>
      $disabled ? 'transparent' : theme.colors.backgroundSecondary};
  }
`;

export const TransferListItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1 1 auto;
`;

export const TransferListItemLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.text};
  word-break: break-word;
`;

export const TransferListItemDescription = styled.span`
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.textSecondary};
  word-break: break-word;
`;

export const TransferListEmpty = styled.li`
  margin: 0;
  padding: 16px 12px;
  text-align: center;
  list-style: none;
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  color: ${({ theme }) => theme.colors.textTertiary ?? theme.colors.textSecondary};
`;

/**
 * Колонка кнопок переноса.
 */
export const TransferListActionsColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 0 0 auto;
  padding: 8px 0;

  @media (max-width: 720px) {
    flex-direction: row;
    padding: 0;
  }
`;

/** Иконка «перенести всё вправо» (отражение double-left) */
export const TransferListFlipIcon = styled.span`
  display: inline-flex;
  transform: scaleX(-1);
`;
