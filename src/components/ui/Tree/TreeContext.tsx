import React, { createContext, useContext } from 'react';
import type {
  TreeCanDropArgs,
  TreeDropArgs,
  TreeDropPosition,
  TreeItemData,
  TreeSelectionControl,
  TreeSelectionMode,
} from '../../../types/ui';
import { Size } from '../../../types/sizes';

/** Значение контекста Tree */
export type TreeContextValue = {
  size: Size;
  selectionControl: TreeSelectionControl;
  checkStrictly: boolean;
  checkOnRowClick: boolean;
  selectionMode: TreeSelectionMode;
  radioGroupName: string;
  expandedIds: string[];
  selectedIds: string[];
  checkedIds: string[];
  indeterminateIds: string[];
  items: TreeItemData[];
  treeDraggable: boolean;
  focusedId: string | null;
  setFocusedId: (itemId: string | null) => void;
  dropTargetId: string | null;
  dropPosition: TreeDropPosition | null;
  toggleExpand: (itemId: string) => void;
  selectItem: (itemId: string) => void;
  checkItem: (itemId: string, nextChecked: boolean) => void;
  handleRowActivate: (
    itemId: string,
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => void;
  notifyItemClick: (
    itemId: string,
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => void;
  canDropItem: (args: TreeCanDropArgs) => boolean;
  beginDrag: (event: React.DragEvent<HTMLElement>, itemId: string) => void;
  updateDropTarget: (
    event: React.DragEvent<HTMLElement>,
    targetId: string,
  ) => void;
  clearDropTarget: () => void;
  completeDrop: (event: React.DragEvent<HTMLElement>, targetId: string) => void;
  handleExternalDragOver: (event: React.DragEvent<HTMLElement>) => void;
  handleExternalDrop: (
    event: React.DragEvent<HTMLElement>,
    targetId: string | null,
  ) => void;
};

const TreeContext = createContext<TreeContextValue | null>(null);

/**
 * Провайдер контекста Tree.
 * @param props.value - Значение контекста
 * @param props.children - Потомки
 */
export const TreeProvider = ({
  value,
  children,
}: {
  value: TreeContextValue;
  children: React.ReactNode;
}) => <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;

/**
 * Хук контекста Tree.
 */
export const useTreeContext = (): TreeContextValue => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error('Tree.Item должен использоваться внутри Tree');
  }
  return context;
};

export type { TreeDropArgs };
