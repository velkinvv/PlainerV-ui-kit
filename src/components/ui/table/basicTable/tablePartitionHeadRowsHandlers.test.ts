import React from 'react';
import { PLAINER_TABLE_HEADER_TOOLBAR_ROW_ATTRIBUTE } from './tableBodyScrollHandlers';
import {
  partitionTableHeadForSplitScroll,
  type TableHeadSectionProps,
} from './tablePartitionHeadRowsHandlers';

describe('partitionTableHeadForSplitScroll', () => {
  const tableHeadType = { displayName: 'TableHead' } as const;

  it('возвращает исходный head без строки панели', () => {
    const columnRow = React.createElement('tr', { key: 'columns' });
    const headElement = React.createElement(
      'thead',
      null,
      columnRow,
    ) as React.ReactElement<TableHeadSectionProps>;
    Object.assign(headElement.type, tableHeadType);

    const partitioned = partitionTableHeadForSplitScroll(headElement);

    expect(partitioned.toolbarHead).toBeNull();
    expect(partitioned.columnHeaderHead).toBe(headElement);
  });

  it('отделяет строку панели от строк заголовков колонок', () => {
    const toolbarRow = React.createElement('tr', {
      key: 'toolbar',
      [PLAINER_TABLE_HEADER_TOOLBAR_ROW_ATTRIBUTE]: true,
    });
    const columnRow = React.createElement('tr', { key: 'columns' });
    const headElement = React.createElement(
      'thead',
      null,
      toolbarRow,
      columnRow,
    ) as React.ReactElement<TableHeadSectionProps>;
    Object.assign(headElement.type, tableHeadType);

    const partitioned = partitionTableHeadForSplitScroll(headElement);

    const toolbarChildren = React.Children.toArray(
      partitioned.toolbarHead?.props.children,
    ) as React.ReactElement[];
    const columnChildren = React.Children.toArray(
      partitioned.columnHeaderHead?.props.children,
    ) as React.ReactElement[];

    expect(toolbarChildren).toHaveLength(1);
    expect(toolbarChildren[0]?.props[PLAINER_TABLE_HEADER_TOOLBAR_ROW_ATTRIBUTE]).toBe(true);
    expect(columnChildren).toHaveLength(1);
    expect(columnChildren[0]?.type).toBe('tr');
    expect(columnChildren[0]?.props).not.toHaveProperty(PLAINER_TABLE_HEADER_TOOLBAR_ROW_ATTRIBUTE);
  });
});
