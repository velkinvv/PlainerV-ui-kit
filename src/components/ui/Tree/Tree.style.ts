import styled, { css } from 'styled-components';
import { createStyledShouldForwardProp } from '../../../handlers/styledComponentHandlers';
import { TransitionHandler } from '../../../handlers/uiHandlers';
import type { TreeDropPosition } from '../../../types/ui';

type TreeRootProps = {
  $gap: string;
};

/**
 * Корень дерева.
 */
export const TreeRoot = styled.ul.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<TreeRootProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap};
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  width: 100%;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  color: ${({ theme }) => theme.colors.text};

  /* Tooltip / Hint — на всю ширину строки */
  .ui-tree-node > .ui-tooltip-trigger,
  .ui-tree-node > .ui-hint-anchor,
  .ui-tree-node > .ui-hint-trigger {
    display: block;
    width: 100%;
  }
`;

type TreeNodeListProps = {
  $gap: string;
};

/**
 * Вложенный список детей.
 */
export const TreeNodeList = styled.ul.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<TreeNodeListProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap};
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  width: 100%;
`;

type TreeRowProps = {
  $level: number;
  $indentStep: number;
  $minHeight: string;
  $paddingInline: string;
  $paddingBlock: string;
  $fontSize: string;
  $selected: boolean;
  $disabled: boolean;
  $dropPosition: TreeDropPosition | null;
  $isDropTarget: boolean;
};

/**
 * Строка узла дерева.
 */
export const TreeRow = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<TreeRowProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  min-height: ${({ $minHeight }) => $minHeight};
  padding-block: ${({ $paddingBlock }) => $paddingBlock};
  padding-inline: ${({ $paddingInline }) => $paddingInline};
  padding-left: ${({ $level, $indentStep, $paddingInline }) =>
    `calc(${$paddingInline} + ${$level * $indentStep}px)`};
  border-radius: 8px;
  font-size: ${({ $fontSize }) => $fontSize};
  line-height: 1.35;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};
  user-select: none;
  transition: ${TransitionHandler()};
  outline: none;
  background: ${({ theme, $selected }) =>
    $selected
      ? `color-mix(in srgb, ${theme.colors.primary} 12%, ${theme.colors.input})`
      : 'transparent'};
  color: ${({ theme }) => theme.colors.text};

  ${({ $disabled, theme, $selected }) =>
    !$disabled &&
    css`
      &:hover {
        background: ${$selected
          ? `color-mix(in srgb, ${theme.colors.primary} 16%, ${theme.colors.input})`
          : theme.colors.backgroundSecondary};
      }

      &:focus-visible {
        box-shadow: 0 0 0 2px ${theme.colors.primary};
      }
    `}

  ${({ $isDropTarget, $dropPosition, theme }) =>
    $isDropTarget &&
    $dropPosition === 'into' &&
    css`
      background: color-mix(in srgb, ${theme.colors.primary} 10%, ${theme.colors.input});
      outline: 1px dashed ${theme.colors.primary};
    `}

  ${({ $isDropTarget, $dropPosition, theme }) =>
    $isDropTarget &&
    ($dropPosition === 'before' || $dropPosition === 'after') &&
    css`
      &::after {
        content: '';
        position: absolute;
        left: 8px;
        right: 8px;
        height: 2px;
        border-radius: 1px;
        background: ${theme.colors.primary};
        ${$dropPosition === 'before' ? 'top: 0;' : 'bottom: 0;'}
      }
    `}
`;

type TreeChevronButtonProps = {
  $expanded: boolean;
  $slotSize: number;
  $hidden: boolean;
};

/**
 * Кнопка раскрытия узла.
 */
export const TreeChevronButton = styled.button.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<TreeChevronButtonProps>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${({ $slotSize }) => `${$slotSize}px`};
  height: ${({ $slotSize }) => `${$slotSize}px`};
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  pointer-events: ${({ $hidden }) => ($hidden ? 'none' : 'auto')};
  transition: ${TransitionHandler()};

  .ui-tree-chevron-icon {
    display: inline-flex;
    /* IconPlainerArrowLeft: свёрнут → вправо, раскрыт → вниз */
    transform: ${({ $expanded }) => ($expanded ? 'rotate(270deg)' : 'rotate(180deg)')};
    transition: transform 0.2s ease;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundTertiary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 1px;
  }
`;

type TreeIconSlotProps = {
  $slotSize: number;
};

/**
 * Слот иконки узла.
 */
export const TreeIconSlot = styled.span.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<TreeIconSlotProps>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${({ $slotSize }) => `${$slotSize}px`};
  height: ${({ $slotSize }) => `${$slotSize}px`};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/**
 * Подпись узла.
 */
export const TreeLabel = styled.span`
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/**
 * Слот под контрол UI Kit (`Checkbox` / `RadioButton`) — без собственной отрисовки.
 */
export const TreeControlSlot = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  line-height: 0;

  /* Не переопределяем стили компонентов кита */
  .ui-checkbox,
  .ui-radio-button {
    flex-shrink: 0;
  }
`;

/** @deprecated Используйте TreeControlSlot */
export const TreeCheckboxSlot = TreeControlSlot;