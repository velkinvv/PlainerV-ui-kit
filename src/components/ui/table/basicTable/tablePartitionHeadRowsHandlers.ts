import React from 'react';
import { PLAINER_TABLE_HEADER_TOOLBAR_ROW_ATTRIBUTE } from './tableBodyScrollHandlers';

/** Результат разбиения `TableHead` для split-layout. */
export type PartitionedTableHeadForSplitScroll = {
  /** `TableHead` только со строкой панели иконок (ширина viewport) */
  toolbarHead: React.ReactElement | null;
  /** `TableHead` со строками заголовков колонок (горизонтальный скролл) */
  columnHeaderHead: React.ReactElement | null;
};

/**
 * @param rowElement — строка `TableRow` внутри `thead`
 */
function isTableHeaderToolbarRowElement(rowElement: React.ReactElement): boolean {
  return rowElement.props[PLAINER_TABLE_HEADER_TOOLBAR_ROW_ATTRIBUTE] === true;
}

/**
 * Делит `TableHead` на панель иконок и строки заголовков колонок.
 * Строка панели помечается атрибутом `data-plainer-table-header-toolbar-row` (DataGrid).
 * @param headElement — секция `TableHead` из `partitionTableChildren`
 */
export function partitionTableHeadForSplitScroll(
  headElement: React.ReactElement,
): PartitionedTableHeadForSplitScroll {
  const toolbarRows: React.ReactNode[] = [];
  const columnHeaderRows: React.ReactNode[] = [];

  React.Children.forEach(headElement.props.children, (child) => {
    if (React.isValidElement(child) && isTableHeaderToolbarRowElement(child)) {
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
    toolbarHead: React.cloneElement(headElement, headElement.props, ...toolbarRows),
    columnHeaderHead: React.cloneElement(headElement, headElement.props, ...columnHeaderRows),
  };
}
