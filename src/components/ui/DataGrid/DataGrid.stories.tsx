import React, { useCallback, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@/themes/ThemeProvider';
import { Size } from '@/types/sizes';
import type {
  DataGridBaseRow,
  DataGridColumn,
  DataGridPaginationModel,
  DataGridSortModel,
} from '@/types/ui';
import { DataGrid } from './DataGrid';
import { reorderByIndex } from './dataGridHandlers';
import { DataGridStoryBlock, DataGridStoryHint } from './DataGrid.stories.style';

type Row = DataGridBaseRow & {
  firstName: string;
  lastName: string;
  age: number | null;
};

const allRows: Row[] = [
  { id: '1', firstName: 'Jon', lastName: 'Snow', age: 35 },
  { id: '2', firstName: 'Cersei', lastName: 'Lannister', age: 42 },
  { id: '3', firstName: 'Jaime', lastName: 'Lannister', age: 45 },
  { id: '4', firstName: 'Arya', lastName: 'Stark', age: 16 },
  { id: '5', firstName: 'Daenerys', lastName: 'Targaryen', age: null },
];

const columns: DataGridColumn<Row>[] = [
  { field: 'firstName', headerName: 'Имя', sortable: true, width: 140 },
  { field: 'lastName', headerName: 'Фамилия', sortable: true, width: 160 },
  { field: 'age', headerName: 'Возраст', sortable: true, align: 'right', width: 100 },
  {
    field: 'fullName',
    headerName: 'Полное имя',
    sortable: false,
    valueGetter: row => `${row.firstName} ${row.lastName}`,
  },
];

const meta: Meta<typeof DataGrid> = {
  title: 'Components/DataGrid',
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

function sortRows(rows: Row[], model: DataGridSortModel | null): Row[] {
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

function getDataGridSortValue(row: Row, field: string): string | number | null {
  if (field === 'fullName') {
    return `${row.firstName} ${row.lastName}`;
  }
  const v = row[field as keyof Row];
  if (typeof v === 'string' || typeof v === 'number' || v == null) {
    return v as string | number | null;
  }
  return null;
}

/** Клиентская пагинация, сортировка и множественный выбор */
export const ClientPagination: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [sortModel, setSortModel] = useState<DataGridSortModel | null>({ field: 'lastName', direction: 'asc' });
    const [pagination, setPagination] = useState<DataGridPaginationModel>({ page: 0, pageSize: 3 });

    const sorted = useMemo(() => sortRows(allRows, sortModel), [sortModel]);

    return (
      <DataGrid<Row>
        tableId="story-data-grid-1"
        columns={columns}
        rows={sorted}
        totalRows={sorted.length}
        displayRowSelectionColumn
        multiselect
        selectedIds={selectedIds}
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

/** Одиночный выбор (радиокнопки) */
export const SingleSelect: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>(['2']);
    return (
      <DataGrid<Row>
        tableId="story-data-grid-radio"
        columns={columns}
        rows={allRows}
        totalRows={allRows.length}
        displayRowSelectionColumn
        multiselect={false}
        selectedIds={selectedIds}
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
        const s = new Set(prev);
        if (open) {
          s.add(rowId);
        } else {
          s.delete(rowId);
        }
        return [...s];
      });
    }, []);

    return (
      <DataGridStoryBlock>
        <button type="button" onClick={() => setLoading(l => !l)}>
          Переключить загрузку
        </button>
        <DataGrid<Row>
          tableId="story-data-grid-expand"
          columns={columns.slice(0, 3)}
          rows={allRows}
          totalRows={allRows.length}
          expandedRowIds={expanded}
          onRowCollapseChange={onCollapse}
          getRowExpandable={row => row.id === '1' || row.id === '2'}
          renderExpandedRow={row => <p>Детали по строке {row.lastName}</p>}
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
    const [cols, setCols] = useState<DataGridColumn<Row>[]>(() => [...columns]);

    return (
      <DataGridStoryBlock>
        <DataGridStoryHint>
          Перетащите заголовок колонки на другой заголовок, чтобы поменять порядок.
        </DataGridStoryHint>
        <DataGrid<Row>
          tableId="story-data-grid-col-dnd"
          columns={cols}
          rows={allRows}
          totalRows={allRows.length}
          enableColumnDrag
          onColumnDragEnd={(from, to) => {
            setCols(prev => reorderByIndex(prev, from, to));
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
    const [rowsState, setRowsState] = useState<Row[]>(() => [...allRows]);

    return (
      <DataGridStoryBlock>
        <DataGridStoryHint>
          Тяните иконку слева от строки и отпустите на другой ряд, чтобы изменить порядок.
        </DataGridStoryHint>
        <DataGrid<Row>
          tableId="story-data-grid-row-dnd"
          columns={columns.slice(0, 3)}
          rows={rowsState}
          totalRows={rowsState.length}
          enableRowDrag
          onRowDragEnd={orderedIds => {
            const byId = new Map(rowsState.map(r => [r.id, r]));
            const next = orderedIds.map(id => byId.get(id)).filter((r): r is Row => r != null);
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
