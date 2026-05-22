import React from 'react';
import { describe, expect, it } from 'vitest';
import { PLAINER_TABLE_HEADER_TOOLBAR_ROW_ATTRIBUTE } from './tableBodyScrollHandlers';
import { partitionTableHeadForSplitScroll } from './tablePartitionHeadRowsHandlers';

describe('partitionTableHeadForSplitScroll', () => {
  const tableHeadType = { displayName: 'TableHead' } as const;

  it('возвращает исходный head без строки панели', () => {
    const columnRow = React.createElement('tr', { key: 'columns' });
    const headElement = React.createElement('thead', { children: columnRow }, columnRow);
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
      { children: [toolbarRow, columnRow] },
      toolbarRow,
      columnRow,
    );
    Object.assign(headElement.type, tableHeadType);

    const partitioned = partitionTableHeadForSplitScroll(headElement);

    expect(partitioned.toolbarHead?.props.children).toEqual([toolbarRow]);
    expect(partitioned.columnHeaderHead?.props.children).toEqual([columnRow]);
  });
});
