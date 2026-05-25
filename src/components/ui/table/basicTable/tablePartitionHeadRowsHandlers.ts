import React from 'react';
import { PLAINER_TABLE_HEADER_TOOLBAR_ROW_ATTRIBUTE } from './tableBodyScrollHandlers';

/** Результат разбиения `TableHead` для split-layout. */
export type PartitionedTableHeadForSplitScroll = {
  /** `TableHead` только со строкой панели иконок (ширина viewport) */
  toolbarHead: React.ReactElement<TableHeadSectionProps> | null;
  /** `TableHead` со строками заголовков колонок (горизонтальный скролл) */
  columnHeaderHead: React.ReactElement<TableHeadSectionProps> | null;
};

/** Пропсы секции `TableHead` при разбиении для split-scroll. */
export type TableHeadSectionProps = {
  children?: React.ReactNode;
};

/** Пропсы строки панели `headerToolbar` в `thead`. */
type TableHeaderToolbarRowProps = {
  [PLAINER_TABLE_HEADER_TOOLBAR_ROW_ATTRIBUTE]?: boolean;
};

/**
 * @param child — потомок `TableHead`
 */
function isTableHeaderToolbarRowChild(
  child: React.ReactNode,
): child is React.ReactElement<TableHeaderToolbarRowProps> {
  if (!React.isValidElement(child)) {
    return false;
  }

  const toolbarRow = child as React.ReactElement<TableHeaderToolbarRowProps>;
  return toolbarRow.props[PLAINER_TABLE_HEADER_TOOLBAR_ROW_ATTRIBUTE] === true;
}

/**
 * Делит `TableHead` на панель иконок и строки заголовков колонок.
 * Строка панели помечается атрибутом `data-plainer-table-header-toolbar-row` (DataGrid).
 * @param headElement — секция `TableHead` из `partitionTableChildren`
 */
export function partitionTableHeadForSplitScroll(
  headElement: React.ReactElement<TableHeadSectionProps>,
): PartitionedTableHeadForSplitScroll {
  const toolbarRows: React.ReactNode[] = [];
  const columnHeaderRows: React.ReactNode[] = [];
  const headProps = headElement.props;

  React.Children.forEach(headProps.children, (child) => {
    if (isTableHeaderToolbarRowChild(child)) {
      toolbarRows.push(child);
      return;
    }

    if (child != null) {
      columnHeaderRows.push(child);
    }
  });

  if (toolbarRows.length === 0) {
    return {
      toolbarHead: null,
      columnHeaderHead: headElement,
    };
  }

  if (columnHeaderRows.length === 0) {
    return {
      toolbarHead: headElement,
      columnHeaderHead: null,
    };
  }

  return {
    toolbarHead: React.cloneElement(headElement, headProps, ...toolbarRows),
    columnHeaderHead: React.cloneElement(headElement, headProps, ...columnHeaderRows),
  };
}
