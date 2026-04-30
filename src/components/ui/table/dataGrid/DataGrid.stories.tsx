import React, { useCallback, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@/themes/ThemeProvider';
import { Size } from '@/types/sizes';
import type { DataGridColumn, DataGridPaginationModel, DataGridSortModel } from '@/types/ui';
import { DataGrid } from './DataGrid';
import { TABLE_STORY_DEMO_ROWS, type DataGridStoryDemoRow } from './dataGridStoryDemoData';
import { getDataGridStoryDemoColumns } from './dataGridStoryDemoColumns';
import { getDataGridCellValue, reorderByIndex } from './dataGridHandlers';
import { DataGridStoryBlock, DataGridStoryHint } from './DataGrid.stories.style';

/** Колонки под демо-строки из `TABLE_STORY_DEMO_ROWS` (как в сторис примитива Table). */
const demoColumns: DataGridColumn<DataGridStoryDemoRow>[] = getDataGridStoryDemoColumns();

/** Id строк с `disableRow` (как в демо-таблице). */
const demoDisabledRowIds: string[] = TABLE_STORY_DEMO_ROWS.filter(row => row.disableRow).map(row => row.id);

const meta: Meta<typeof DataGrid> = {
  title: 'UI Kit/Data Display/DataGrid',
  component: DataGrid,
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DataGrid>;

function sortRows(rows: DataGridStoryDemoRow[], model: DataGridSortModel | null): DataGridStoryDemoRow[] {
  const copy = [...rows];
  if (!model) {
    return copy;
  }
  copy.sort((a, b) => {
    const av = getDataGridSortValue(a, model.field);
    const bv = getDataGridSortValue(b, model.field);
    const cmp =
      typeof av === 'number' && typeof bv === 'number'
        ? av - bv
        : String(av ?? '').localeCompare(String(bv ?? ''), 'ru');
    return model.direction === 'asc' ? cmp : -cmp;
  });
  return copy;
}

function getDataGridSortValue(row: DataGridStoryDemoRow, field: string): string | number | null {
  const value = getDataGridCellValue(row, field);
  if (typeof value === 'string' || typeof value === 'number' || value == null) {
    return value as string | number | null;
  }
  return null;
}

/** Клиентская пагинация, сортировка и множественный выбор */
export const ClientPagination: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [sortModel, setSortModel] = useState<DataGridSortModel | null>({ field: 'user', direction: 'asc' });
    const [pagination, setPagination] = useState<DataGridPaginationModel>({ page: 0, pageSize: 3 });

    const sorted = useMemo(() => sortRows(TABLE_STORY_DEMO_ROWS, sortModel), [sortModel]);

    return (
      <DataGrid<DataGridStoryDemoRow>
        tableId="story-data-grid-1"
        columns={demoColumns}
        rows={sorted}
        totalRows={sorted.length}
        displayRowSelectionColumn
        multiselect
        selectedIds={selectedIds}
        disabledIds={demoDisabledRowIds}
        onRowSelectionChange={ids => {
          setSelectedIds(ids);
        }}
        sortModel={sortModel}
        onSortChange={setSortModel}
        paginationModel={pagination}
        onPaginationChange={setPagination}
        paginationMode="client"
        stickyHeader
        size={Size.MD}
      />
    );
  },
};

/** Сокращённая плашка страниц и скрытый выбор размера страницы */
export const CompactPaginationHideRowsSelect: Story = {
  render: () => {
    const [pagination, setPagination] = useState<DataGridPaginationModel>({ page: 0, pageSize: 5 });
    const [sortModel, setSortModel] = useState<DataGridSortModel | null>({ field: 'user', direction: 'asc' });
    const sorted = useMemo(() => sortRows(TABLE_STORY_DEMO_ROWS, sortModel), [sortModel]);

    return (
      <DataGrid<DataGridStoryDemoRow>
        tableId="story-data-grid-compact-footer"
        columns={demoColumns}
        rows={sorted}
        totalRows={sorted.length}
        sortModel={sortModel}
        onSortChange={setSortModel}
        paginationModel={pagination}
        onPaginationChange={setPagination}
        paginationMode="client"
        paginationVariant="compact"
        showRowsPerPageSelect={false}
        rowsPerPageOptions={[5, 10, 25]}
        stickyHeader
        size={Size.SM}
      />
    );
  },
};

/** Выравнивание футера по центру (`paginationToolbarAlign`) */
export const PaginationToolbarCentered: Story = {
  render: () => {
    const [pagination, setPagination] = useState<DataGridPaginationModel>({ page: 0, pageSize: 3 });
    const sorted = useMemo(() => sortRows(TABLE_STORY_DEMO_ROWS, null), []);

    return (
      <DataGrid<DataGridStoryDemoRow>
        tableId="story-data-grid-toolbar-center"
        columns={demoColumns}
        rows={sorted}
        totalRows={sorted.length}
        paginationModel={pagination}
        onPaginationChange={setPagination}
        paginationMode="client"
        paginationToolbarAlign="center"
        rowsPerPageOptions={[2, 3, 5]}
        stickyHeader
        size={Size.MD}
      />
    );
  },
};

/** Реверсивный порядок блоков в строке футера (`paginationToolbarReverse`) */
export const PaginationToolbarReversed: Story = {
  render: () => {
    const [pagination, setPagination] = useState<DataGridPaginationModel>({ page: 0, pageSize: 3 });
    const sorted = useMemo(() => sortRows(TABLE_STORY_DEMO_ROWS, null), []);

    return (
      <DataGrid<DataGridStoryDemoRow>
        tableId="story-data-grid-toolbar-reverse"
        columns={demoColumns}
        rows={sorted}
        totalRows={sorted.length}
        paginationModel={pagination}
        onPaginationChange={setPagination}
        paginationMode="client"
        paginationToolbarReverse
        rowsPerPageOptions={[2, 3, 5]}
        stickyHeader
        size={Size.MD}
      />
    );
  },
};

/** Полная плашка страниц + компактный селект «строк на странице» */
export const CompactRowsPerPageSelect: Story = {
  render: () => {
    const [pagination, setPagination] = useState<DataGridPaginationModel>({ page: 0, pageSize: 3 });
    const sorted = useMemo(() => sortRows(TABLE_STORY_DEMO_ROWS, null), []);

    return (
      <DataGrid<DataGridStoryDemoRow>
        tableId="story-data-grid-compact-rows-select"
        columns={demoColumns}
        rows={sorted}
        totalRows={sorted.length}
        paginationModel={pagination}
        onPaginationChange={setPagination}
        paginationMode="client"
        paginationVariant="default"
        rowsPerPageSelectVariant="compact"
        rowsPerPageOptions={[2, 3, 5]}
        stickyHeader
        size={Size.MD}
      />
    );
  },
};

/** Одиночный выбор (радиокнопки) */
export const SingleSelect: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>(['2']);
    return (
      <DataGrid<DataGridStoryDemoRow>
        tableId="story-data-grid-radio"
        columns={demoColumns}
        rows={TABLE_STORY_DEMO_ROWS}
        totalRows={TABLE_STORY_DEMO_ROWS.length}
        displayRowSelectionColumn
        multiselect={false}
        selectedIds={selectedIds}
        disabledIds={demoDisabledRowIds}
        onRowSelectionChange={ids => {
          setSelectedIds(ids);
        }}
        size={Size.SM}
      />
    );
  },
};

/** Раскрытие строки + загрузка */
export const ExpandAndLoading: Story = {
  render: () => {
    const [expanded, setExpanded] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const onCollapse = useCallback((rowId: string, open: boolean) => {
      setExpanded(prev => {
        const nextSet = new Set(prev);
        if (open) {
          nextSet.add(rowId);
        } else {
          nextSet.delete(rowId);
        }
        return [...nextSet];
      });
    }, []);

    return (
      <DataGridStoryBlock>
        <button type="button" onClick={() => setLoading(loadingFlag => !loadingFlag)}>
          Переключить загрузку
        </button>
        <DataGrid<DataGridStoryDemoRow>
          tableId="story-data-grid-expand"
          columns={demoColumns.slice(0, 3)}
          rows={TABLE_STORY_DEMO_ROWS}
          totalRows={TABLE_STORY_DEMO_ROWS.length}
          expandedRowIds={expanded}
          onRowCollapseChange={onCollapse}
          getRowExpandable={row => row.id === '1' || row.id === '2'}
          renderExpandedRow={row => <p>Детали по строке {row.user}</p>}
          isLoading={loading}
        />
      </DataGridStoryBlock>
    );
  },
};

/**
 * Перетаскивание заголовков колонок: `enableColumnDrag` + `onColumnDragEnd` (HTML5 DnD, удобно на десктопе).
 */
export const ColumnReorder: Story = {
  render: () => {
    const [cols, setCols] = useState<DataGridColumn<DataGridStoryDemoRow>[]>(() => [...demoColumns]);

    return (
      <DataGridStoryBlock>
        <DataGridStoryHint>
          Перетащите заголовок колонки на другой заголовок, чтобы поменять порядок.
        </DataGridStoryHint>
        <DataGrid<DataGridStoryDemoRow>
          tableId="story-data-grid-col-dnd"
          columns={cols}
          rows={TABLE_STORY_DEMO_ROWS}
          totalRows={TABLE_STORY_DEMO_ROWS.length}
          enableColumnDrag
          onColumnDragEnd={(fromIndex, toIndex) => {
            setCols(previous => reorderByIndex(previous, fromIndex, toIndex));
          }}
          size={Size.MD}
        />
      </DataGridStoryBlock>
    );
  },
};

/**
 * Перетаскивание строк за ручку: `enableRowDrag` + `onRowDragEnd` (порядок строк хранится в стейте сторис).
 */
export const RowReorder: Story = {
  render: () => {
    const [rowsState, setRowsState] = useState<DataGridStoryDemoRow[]>(() => [...TABLE_STORY_DEMO_ROWS]);

    return (
      <DataGridStoryBlock>
        <DataGridStoryHint>
          Тяните иконку слева от строки и отпустите на другой ряд, чтобы изменить порядок.
        </DataGridStoryHint>
        <DataGrid<DataGridStoryDemoRow>
          tableId="story-data-grid-row-dnd"
          columns={demoColumns.slice(0, 3)}
          rows={rowsState}
          totalRows={rowsState.length}
          enableRowDrag
          onRowDragEnd={orderedIds => {
            const byId = new Map(rowsState.map(row => [row.id, row]));
            const next = orderedIds.map(id => byId.get(id)).filter((row): row is DataGridStoryDemoRow => row != null);
            if (next.length === rowsState.length) {
              setRowsState(next);
            }
          }}
          size={Size.MD}
        />
      </DataGridStoryBlock>
    );
  },
};

