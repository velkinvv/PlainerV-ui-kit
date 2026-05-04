import React, { useCallback, useId, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconSize, Size } from '@/types/sizes';
import {
  ButtonVariant,
  type DataGridColumn,
  type DataGridColumnFilterIconPosition,
  type DataGridExpandedRowChangeParams,
  type DataGridExpandedRowDataStatus,
  type DataGridPaginationModel,
  type DataGridSortModel,
} from '@/types/ui';
import { normalizeDataGridSortModel } from './dataGridSortModelHandlers';
import { DataGrid } from './DataGrid';
import { TABLE_STORY_DEMO_ROWS, type DataGridStoryDemoRow } from './dataGridStoryDemoData';
import { getDataGridStoryDemoColumns } from './dataGridStoryDemoColumns';
import { getDataGridCellValue, reorderByIndex } from './dataGridHandlers';
import {
  DataGridStoryBlock,
  DataGridStoryControlButton,
  DataGridStoryExpandedDetailLine,
  DataGridStoryFilterFieldLabel,
  DataGridStoryHint,
  DataGridStoryScrollArea,
} from './DataGrid.stories.style';
import { ColumnFilterPanel } from '../columnFilter/ColumnFilterPanel';
import { Icon } from '../../Icon/Icon';
import { Input } from '../../inputs/Input/Input';
import { DATAGRID_DOC } from '../storyDocs/documentation';
import { DataGridWithTextFilterInHeader as tableColumnFilterDataGridStorySource } from '../basicTable/TableColumnFilters.stories';

/** Колонки под демо-строки из `TABLE_STORY_DEMO_ROWS` (как в сторис примитива Table). */
const demoColumns: DataGridColumn<DataGridStoryDemoRow>[] = getDataGridStoryDemoColumns();

/** Id строк с `disableRow` (как в демо-таблице). */
const demoDisabledRowIds: string[] = TABLE_STORY_DEMO_ROWS.filter(row => row.disableRow).map(row => row.id);

const meta: Meta<typeof DataGrid> = {
  title: 'UI Kit/Data Display/DataGrid',
  component: DataGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DATAGRID_DOC,
      },
    },
  },
  argTypes: {
    tableId: { description: 'Уникальный `id` у `<table>` и `name` у радиогруппы при `multiselect={false}`.' },
    columns: { description: 'Описание колонок (`field`, `headerName`, `render`, …).' },
    rows: { description: 'Строки данных; у каждой должен быть стабильный идентификатор (или через `getRowId`).' },
    totalRows: { description: 'Всего записей для пагинации (на сервере — полный счётчик).' },
    getRowId: { description: '(row) => id если ключ не в `row.id`.' },
    displayRowSelectionColumn: { description: 'Показать колонку выбора (чекбокс или радио).' },
    multiselect: { description: '`true` — чекбоксы; `false` — одна радиокнопка на строку.' },
    selectedIds: { description: 'Контролируемые выбранные id (`Set` или массив).' },
    disabledIds: { description: 'Строки без возможности выбора.' },
    onRowSelectionChange: {
      description: '(nextIds, reason) — reason: `row` | `header` | `clear`.',
    },
    onRowClick: { description: '(row, event) — клик по строке.' },
    onRowDoubleClick: { description: '(row, event) — двойной клик.' },
    paginationModel: { description: '{ page, pageSize }; страница с нуля.' },
    onPaginationChange: { description: 'Обновление модели пагинации; без пары с model футер скрыт.' },
    paginationVariant: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Вид плашки номеров страниц в подвале.',
    },
    paginationToolbarAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Выравнивание строки футера пагинации.',
    },
    paginationToolbarReverse: { description: 'Обратный порядок блоков в строке футера.' },
    showRowsPerPageSelect: { description: 'Показывать селект «строк на странице».' },
    rowsPerPageSelectVariant: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Компактный вид селектора размера страницы.',
    },
    showPageJump: { description: 'Поле перехода к номеру страницы.' },
    labelPageJump: { description: 'Подпись у поля перехода к странице.' },
    rowsPerPageOptions: { description: 'Числовые опции размера страницы для селекта.' },
    sortModel: {
      description:
        'Одно поле `{ field, direction }`, массив критериев по приоритету или `null`. С `multiColumnSort` — массив.',
    },
    onSortChange: { description: 'Смена модели сортировки; сортировку данных делает родитель.' },
    multiColumnSort: { description: 'Несколько полей: asc → desc → снять по каждой колонке; порядок в массиве — приоритет.' },
    paginationMode: {
      control: 'select',
      options: ['client', 'server'],
      description:
        '`client` — грид режет `rows` по странице; `server` — в `rows` уже текущая порция, `totalRows` с сервера.',
    },
    stickyHeader: { description: 'Липкая шапка при вертикальном скролле родителя.' },
    striped: {
      description:
        'Зебра строк в `tbody`. У `DataGrid` по умолчанию **включена**; передайте `false`, чтобы фон строк совпадал с карточкой (см. сторис **ClientPaginationPlainBody**).',
    },
    columnDividers: { description: 'Вертикальные разделители между колонками (`Table.columnDividers`); по умолчанию `true`.' },
    size: { description: 'Плотность (`Size` дизайн-системы).' },
    elevated: { description: 'Тень карточки (`TableContainer`).' },
    hideFooter: { description: 'Скрыть блок пагинации под таблицей.' },
    tableAriaLabel: { description: '`aria-label` для `<table>`.' },
    style: { description: 'Инлайн-стиль корневого контейнера грида.' },
    isLoading: { description: 'Глобальный оверлей загрузки над таблицей.' },
    rowBackgroundColorByStatus: { description: '(row) => CSS-цвет фона строки или undefined.' },
    expandedRowIds: { description: 'Контролируемые раскрытые id.' },
    onExpandedRowChange: {
      description:
        'Клик по кнопке раскрытия строки. Аргумент: `{ rowId, expanded, expandedIds }` — какая строка, стала ли развёрнутой, полный список id открытых строк после клика. Для контролируемого `expandedRowIds` обновляйте родитель из этого колбэка. Старое имя `onRowCollapseChange` удалено.',
    },
    getRowExpandable: { description: '(row) => boolean — можно ли развернуть строку.' },
    getExpandedRowDataStatus: { description: 'Статус данных подстроки: idle | loading | ready | error.' },
    getExpandedRowLoading: { description: 'Упрощённый флаг загрузки подстроки (если статус не задан).' },
    onExpandedRowOpen: { description: 'Вызов при развороте строки (ленивая загрузка).' },
    renderExpandedRow: { description: '(row, context) — контент под строкой.' },
    renderCell: { description: 'Глобальный рендер ячейки, если у колонки нет `render`.' },
    renderRowWrapper: { description: 'Обёртка над строкой `tr`.' },
    enableColumnDrag: { description: 'Перетаскивание заголовков колонок (HTML5 DnD).' },
    onColumnDragStart: { description: 'Старт DnD колонки: `{ fromIndex, field }`.' },
    onColumnDragEnd: { description: '(fromIndex, toIndex) после успешного drop.' },
    onColumnOrderChange: { description: 'Успешный reorder: `{ fromIndex, toIndex, field }` (дублирует смысл `onColumnDragEnd`).' },
    onColumnDragCancel: { description: 'DnD колонки без смены позиции (та же колонка или отпускание вне цели).' },
    enableColumnResize: { description: 'Ручка ширины на правом краю заголовка (вместе с `onColumnResize`).' },
    onColumnResizeStart: { description: 'Начало жеста ресайза: `{ field, width }` (px).' },
    onColumnResizeChange: { description: 'Движение ручки: предпросмотр `{ field, width }` (px).' },
    onColumnResize: { description: '({ field, width }) — фиксация после `pointerup`; обновите `columns[].width`.' },
    onColumnResizeEnd: { description: 'Конец жеста: `{ field, width, committed }`.' },
    columnResizeMaxWidthPx: { description: 'Верхний предел ширины при ресайзе (по умолчанию 2000).' },
    headerMaxLines: { description: 'Максимум строк в заголовках колонок (`line-clamp`); у колонки можно своё `headerMaxLines`.' },
    enableRowDrag: { description: 'Перетаскивание строк за ручку.' },
    onRowDragStart: { description: 'Старт DnD строки: `{ fromIndex, rowId }` (индекс на текущей странице).' },
    onRowDragEnd: { description: '(orderedIds) — новый порядок идентификаторов строк на странице.' },
    onRowDragCancel: { description: 'DnD строки без перестановки.' },
    onColumnFilterClick: {
      description:
        'Клик по встроенной иконке фильтра (`columns[].filterable`). Расположение иконки — `columns[].filterIconPosition`: `leading` | `inlineTitle` | `trailing` (по умолчанию).',
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DataGrid>;

function sortRows(rows: DataGridStoryDemoRow[], model: DataGridSortModel | null): DataGridStoryDemoRow[] {
  const criteria = normalizeDataGridSortModel(model ?? null);
  const copy = [...rows];
  if (criteria.length === 0) {
    return copy;
  }
  copy.sort((rowA, rowB) => {
    for (const criterion of criteria) {
      const valueA = getDataGridSortValue(rowA, criterion.field);
      const valueB = getDataGridSortValue(rowB, criterion.field);
      const comparison =
        typeof valueA === 'number' && typeof valueB === 'number'
          ? valueA - valueB
          : String(valueA ?? '').localeCompare(String(valueB ?? ''), 'ru');
      const signed = criterion.direction === 'asc' ? comparison : -comparison;
      if (signed !== 0) {
        return signed;
      }
    }
    return 0;
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
  parameters: {
    docs: {
      description: {
        story:
          '`paginationMode="client"` — передан полный массив `rows`, грид показывает срез по `paginationModel`. Сортировка и выбор строк управляются родителем.',
      },
    },
  },
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

/**
 * Без зебры и с липкой шапкой: `striped={false}` + `stickyHeader`.
 * Обёртка с `max-height` и `overflow: auto` — чтобы шапка «прилипала» при прокрутке (как `Table › StickyHeader`).
 */
export const ClientPaginationPlainBody: Story = {
  name: 'Без зебры и липкая шапка',
  parameters: {
    docs: {
      description: {
        story:
          'Ровный фон строк (`striped={false}`) и липкая шапка (`stickyHeader`). Родитель с **ограниченной высотой** и вертикальным скроллом — иначе `position: sticky` у заголовка не проявляется. На странице показаны все демо-строки (`pageSize` = числу строк), чтобы появилась прокрутка.',
      },
    },
  },
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [sortModel, setSortModel] = useState<DataGridSortModel | null>({ field: 'user', direction: 'asc' });
    const fullPageSize = TABLE_STORY_DEMO_ROWS.length;
    const [pagination, setPagination] = useState<DataGridPaginationModel>({ page: 0, pageSize: fullPageSize });

    const sorted = useMemo(() => sortRows(TABLE_STORY_DEMO_ROWS, sortModel), [sortModel]);

    return (
      <DataGridStoryScrollArea>
        <DataGrid<DataGridStoryDemoRow>
          tableId="story-data-grid-plain-body"
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
          striped={false}
          size={Size.MD}
        />
      </DataGridStoryScrollArea>
    );
  },
};

/** Только отключение зебры: `striped={false}`, липкая шапка выключена (как у `Table` по умолчанию). */
export const PlainBodyNoStickyHeader: Story = {
  name: 'Без зебры (без липкой шапки)',
  parameters: {
    docs: {
      description: {
        story:
          '`striped={false}` — ровный фон строк; `stickyHeader` не передаётся (`false`). Пагинация по 3 строки, как в **ClientPagination**.',
      },
    },
  },
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [sortModel, setSortModel] = useState<DataGridSortModel | null>({ field: 'user', direction: 'asc' });
    const [pagination, setPagination] = useState<DataGridPaginationModel>({ page: 0, pageSize: 3 });

    const sorted = useMemo(() => sortRows(TABLE_STORY_DEMO_ROWS, sortModel), [sortModel]);

    return (
      <DataGrid<DataGridStoryDemoRow>
        tableId="story-data-grid-plain-no-sticky"
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
        striped={false}
        size={Size.MD}
      />
    );
  },
};

/** Липкая шапка при зебре по умолчанию: вертикальный скролл и все строки на одной странице. */
export const StickyHeaderWithScroll: Story = {
  name: 'Липкая шапка (зебра, прокрутка)',
  parameters: {
    docs: {
      description: {
        story:
          '`stickyHeader` при зебре по умолчанию (`striped` не задаётся). Обёртка с `max-height` и `overflow: auto`; `pageSize` равен числу демо-строк — прокрутка по телу таблицы, шапка остаётся видимой.',
      },
    },
  },
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [sortModel, setSortModel] = useState<DataGridSortModel | null>({ field: 'user', direction: 'asc' });
    const fullPageSize = TABLE_STORY_DEMO_ROWS.length;
    const [pagination, setPagination] = useState<DataGridPaginationModel>({ page: 0, pageSize: fullPageSize });

    const sorted = useMemo(() => sortRows(TABLE_STORY_DEMO_ROWS, sortModel), [sortModel]);

    return (
      <DataGridStoryScrollArea>
        <DataGrid<DataGridStoryDemoRow>
          tableId="story-data-grid-sticky-zebra-scroll"
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
      </DataGridStoryScrollArea>
    );
  },
};

/** Сортировка по нескольким колонкам: `multiColumnSort` + массив в `sortModel` */
export const MultiColumnSort: Story = {
  name: 'Сортировка по нескольким полям',
  parameters: {
    docs: {
      description: {
        story:
          'Включён `multiColumnSort`: в `sortModel` передаётся массив критериев (порядок — приоритет сортировки). По колонке: добавить asc → desc → исключить. Рядом с шевронами — номер 1, 2, … Данные в сторис сортируются по цепочке критериев.',
      },
    },
  },
  render: () => {
    const [sortModel, setSortModel] = useState<DataGridSortModel | null>([{ field: 'user', direction: 'asc' }]);
    const [pagination, setPagination] = useState<DataGridPaginationModel>({ page: 0, pageSize: 10 });
    const sorted = useMemo(() => sortRows(TABLE_STORY_DEMO_ROWS, sortModel), [sortModel]);

    return (
      <DataGrid<DataGridStoryDemoRow>
        tableId="story-data-grid-multi-sort"
        columns={demoColumns}
        rows={sorted}
        totalRows={sorted.length}
        sortModel={sortModel}
        onSortChange={setSortModel}
        multiColumnSort
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
  parameters: {
    docs: {
      description: {
        story:
          '`paginationVariant="compact"` — только стрелки и текущая страница. `showRowsPerPageSelect={false}` скрывает блок размера страницы (опции всё равно можно передать для будущего включения).',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          '`paginationToolbarAlign="center"` — строка «строк на странице», поле перехода и плашка страниц выровнены по центру футера.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          '`paginationToolbarReverse` — меняет порядок блоков в строке футера (`flex-direction: row-reverse`), выравнивание по краю сохраняется за счёт логики в стилях.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          '`paginationVariant="default"` (полная плашка номеров) в сочетании с `rowsPerPageSelectVariant="compact"` — короткая подпись «На стр.:» и компактный селект.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          '`displayRowSelectionColumn` + `multiselect={false}` — колонка радиокнопок; у группы одинаковый `name`, привязанный к `tableId`. `selectedIds` — массив из нуля или одного id.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          '`expandedRowIds` + `onExpandedRowChange` + `getRowExpandable` + `renderExpandedRow`. Кнопка переключает **`isLoading`** — полупрозрачный оверлей на всей таблице (не путать со спиннером только в подстроке в **ExpandLazyRowData**).',
      },
    },
  },
  render: () => {
    const [expanded, setExpanded] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleExpandedRowChange = useCallback((params: DataGridExpandedRowChangeParams) => {
      setExpanded([...params.expandedIds]);
    }, []);

    return (
      <DataGridStoryBlock>
        <DataGridStoryControlButton
          type="button"
          variant={ButtonVariant.SECONDARY}
          size={Size.SM}
          onClick={() => {
            setLoading(loadingFlag => !loadingFlag);
          }}
        >
          Переключить загрузку
        </DataGridStoryControlButton>
        <DataGrid<DataGridStoryDemoRow>
          tableId="story-data-grid-expand"
          columns={demoColumns.slice(0, 3)}
          rows={TABLE_STORY_DEMO_ROWS}
          totalRows={TABLE_STORY_DEMO_ROWS.length}
          expandedRowIds={expanded}
          onExpandedRowChange={handleExpandedRowChange}
          getRowExpandable={row => row.id === '1' || row.id === '2'}
          renderExpandedRow={row => <p>Детали по строке {row.user}</p>}
          isLoading={loading}
        />
      </DataGridStoryBlock>
    );
  },
};

/** Ленивая подгрузка: `onExpandedRowOpen` + `getExpandedRowDataStatus` (спиннер только в области раскрытия, не `isLoading` таблицы) */
export const ExpandLazyRowData: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'При открытии строки вызывается `onExpandedRowOpen`; статус данных — `getExpandedRowDataStatus`. Пока `loading`, в подстроке показывается встроенный спиннер; глобальный `isLoading` грида не используется.',
      },
    },
  },
  render: () => {
    const [expanded, setExpanded] = useState<string[]>([]);
    const [detailStatusByRowId, setDetailStatusByRowId] = useState<
      Record<string, DataGridExpandedRowDataStatus>
    >({});

    const handleExpandedRowChange = useCallback((params: DataGridExpandedRowChangeParams) => {
      setExpanded([...params.expandedIds]);
      if (!params.expanded) {
        setDetailStatusByRowId(previous => {
          const next = { ...previous };
          delete next[params.rowId];
          return next;
        });
      }
    }, []);

    const handleExpandedRowOpen = useCallback((row: DataGridStoryDemoRow) => {
      setDetailStatusByRowId(previous => ({ ...previous, [row.id]: 'loading' }));
      window.setTimeout(() => {
        setDetailStatusByRowId(previous => ({ ...previous, [row.id]: 'ready' }));
      }, 900);
    }, []);

    return (
      <DataGridStoryBlock>
        <DataGridStoryHint>
          Разверните строку 1 или 2: сначала спиннер в подстроке, затем текст деталей. Глобальный оверлей
          таблицы не используется.
        </DataGridStoryHint>
        <DataGrid<DataGridStoryDemoRow>
          tableId="story-data-grid-expand-lazy"
          columns={demoColumns.slice(0, 3)}
          rows={TABLE_STORY_DEMO_ROWS}
          totalRows={TABLE_STORY_DEMO_ROWS.length}
          expandedRowIds={expanded}
          onExpandedRowChange={handleExpandedRowChange}
          getRowExpandable={demoRow => demoRow.id === '1' || demoRow.id === '2'}
          getExpandedRowDataStatus={demoRow => detailStatusByRowId[demoRow.id] ?? 'idle'}
          onExpandedRowOpen={handleExpandedRowOpen}
          renderExpandedRow={(demoRow, expandedContext) =>
            expandedContext.dataStatus === 'ready' ? (
              <DataGridStoryExpandedDetailLine>Детали по строке {demoRow.user}</DataGridStoryExpandedDetailLine>
            ) : null
          }
        />
      </DataGridStoryBlock>
    );
  },
};

/**
 * Перетаскивание заголовков колонок: `enableColumnDrag` + `onColumnDragEnd` (HTML5 DnD, удобно на десктопе).
 */
export const ColumnReorder: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`enableColumnDrag`: перетаскивание заголовков. Колонки с `disableReorder` фиксированы. Успешный drop: **`onColumnDragEnd(fromIndex, toIndex)`** и **`onColumnOrderChange({ fromIndex, toIndex, field })`** (дублируют смысл; подключайте то, что удобнее API). Дополнительно: **`onColumnDragStart`**, **`onColumnDragCancel`** (та же колонка или отпускание вне цели). События дублируются в **Actions** через `fn()`.',
      },
    },
  },
  render: function ColumnReorderStory() {
    const [cols, setCols] = useState<DataGridColumn<DataGridStoryDemoRow>[]>(() => [...demoColumns]);
    const onColumnDragStart = useMemo(() => fn(), []);
    const onColumnOrderChange = useMemo(() => fn(), []);
    const onColumnDragCancel = useMemo(() => fn(), []);

    return (
      <DataGridStoryBlock>
        <DataGridStoryHint>
          Перетащите заголовок колонки на другой заголовок, чтобы поменять порядок. Отпустите на той же колонке или вне таблицы — сработает отмена (см. Actions).
        </DataGridStoryHint>
        <DataGrid<DataGridStoryDemoRow>
          tableId="story-data-grid-col-dnd"
          columns={cols}
          rows={TABLE_STORY_DEMO_ROWS}
          totalRows={TABLE_STORY_DEMO_ROWS.length}
          enableColumnDrag
          onColumnDragStart={onColumnDragStart}
          onColumnDragEnd={(fromIndex, toIndex) => {
            setCols(previous => reorderByIndex(previous, fromIndex, toIndex));
          }}
          onColumnOrderChange={onColumnOrderChange}
          onColumnDragCancel={onColumnDragCancel}
          size={Size.MD}
        />
      </DataGridStoryBlock>
    );
  },
};

/**
 * Изменение ширины колонок: `enableColumnResize` + `onColumnResize`; числовые `width` в state колонок.
 */
export const ColumnResize: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Потяните за правый край заголовка. **`onColumnResize({ field, width })`** — фиксация после `pointerup`. Жизненный цикл: **`onColumnResizeStart`**, **`onColumnResizeChange`** (движение), **`onColumnResizeEnd`** (`committed` / отмена). События в **Actions** через `fn()`. У колонки действий включён `disableResize`.',
      },
    },
  },
  render: function ColumnResizeStory() {
    const [columnsState, setColumnsState] = useState<DataGridColumn<DataGridStoryDemoRow>[]>(() =>
      demoColumns.map(column =>
        String(column.field) === 'actions' ? { ...column, disableResize: true } : { ...column },
      ),
    );
    const onColumnResizeStart = useMemo(() => fn(), []);
    const onColumnResizeChange = useMemo(() => fn(), []);
    const onColumnResizeEnd = useMemo(() => fn(), []);

    return (
      <DataGridStoryBlock>
        <DataGridStoryHint>
          Потяните за правый край заголовка колонки. Колонка действий без ручки ресайза (`disableResize`). Панель Actions — все колбэки ресайза.
        </DataGridStoryHint>
        <DataGrid<DataGridStoryDemoRow>
          tableId="story-data-grid-col-resize"
          columns={columnsState}
          rows={TABLE_STORY_DEMO_ROWS}
          totalRows={TABLE_STORY_DEMO_ROWS.length}
          enableColumnResize
          onColumnResizeStart={onColumnResizeStart}
          onColumnResizeChange={onColumnResizeChange}
          onColumnResize={({ field, width }) => {
            setColumnsState(previous =>
              previous.map(column => (String(column.field) === field ? { ...column, width } : column)),
            );
          }}
          onColumnResizeEnd={onColumnResizeEnd}
          size={Size.MD}
        />
      </DataGridStoryBlock>
    );
  },
};

/**
 * Ограничение числа строк в заголовках: `headerMaxLines` у грида и опционально у колонки.
 */
export const HeaderMaxLines: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`headerMaxLines={2}`: сортируемые колонки получают `TableSortLabel` с `maxLines`; несортируемая длинная подпись — `TableCellHeadLineClamp`. У третьей колонки `headerMaxLines: 1` перекрывает значение грида.',
      },
    },
  },
  render: () => {
    const [sortModel, setSortModel] = useState<DataGridSortModel | null>({ field: 'user', direction: 'asc' });
    const [columnsForClamp] = useState<DataGridColumn<DataGridStoryDemoRow>[]>(() => [
      {
        ...demoColumns[0],
        headerName:
          'Пользователь: очень длинный заголовок колонки, который визуально ограничен двумя строками с многоточием',
      },
      {
        ...demoColumns[1],
        sortable: false,
        headerName:
          'Статус без сортировки: тот же лимит двух строк через обёртку `TableCellHeadLineClamp` внутри грида',
      },
      {
        ...demoColumns[2],
        headerName:
          'Канал: этот заголовок принудительно в одну строку за счёт `headerMaxLines: 1` у колонки при общих двух у грида',
        headerMaxLines: 1,
      },
    ]);

    return (
      <DataGridStoryBlock>
        <DataGridStoryHint>
          Грид с `headerMaxLines={2}`; третья колонка переопределена на одну строку.
        </DataGridStoryHint>
        <DataGrid<DataGridStoryDemoRow>
          tableId="story-data-grid-header-clamp"
          columns={columnsForClamp}
          rows={TABLE_STORY_DEMO_ROWS}
          totalRows={TABLE_STORY_DEMO_ROWS.length}
          headerMaxLines={2}
          sortModel={sortModel}
          onSortChange={setSortModel}
          size={Size.MD}
        />
      </DataGridStoryBlock>
    );
  },
};

/**
 * Фильтр в шапке колонки: тот же сценарий, что **Table › Column filters › DataGridWithTextFilterInHeader** (точка входа из корня DataGrid).
 */
export const ColumnFilterInHeader: Story = {
  name: 'Фильтр в шапке колонки',
  render: tableColumnFilterDataGridStorySource.render!,
  parameters: {
    docs: {
      description: {
        story:
          'Идентично **Table › Column filters › DataGridWithTextFilterInHeader**: `headerName` как ReactNode с `Dropdown` + `ColumnFilterPanel` + `Input`; в `rows` передаётся отфильтрованный срез. Для встроенной иконки без кастомного `headerName` см. сторис **Встроенная иконка фильтра** (`filterable` + `onColumnFilterClick`).',
      },
    },
  },
};

/**
 * Встроенная иконка фильтра: `filterable` у колонки и `onColumnFilterClick` у грида (без дублирования иконки в `headerName`).
 */
export const BuiltinColumnFilterIcon: Story = {
  name: 'Встроенная иконка фильтра',
  parameters: {
    docs: {
      description: {
        story:
          'Колонка **Пользователь** с `filterable: true`. После «Применить» у колонки выставляется `filterApplied: true` — иконка с заливкой `theme.colors.info`. Клик по иконке вызывает `onColumnFilterClick({ field, nativeEvent })`; здесь под таблицей показывается `ColumnFilterPanel` (в приложении чаще — `Dropdown` с порталом у курсора).',
      },
    },
  },
  render: function BuiltinColumnFilterIconStory() {
    const filterFieldReactId = useId();
    const filterInputDomId = `story-builtin-filter-${filterFieldReactId.replace(/:/g, '')}`;
    const [appliedUserSubstring, setAppliedUserSubstring] = useState('');
    const [draftUserSubstring, setDraftUserSubstring] = useState('');
    const [filterPanelOpen, setFilterPanelOpen] = useState(false);

    const filteredRows = useMemo(
      () =>
        TABLE_STORY_DEMO_ROWS.slice(0, 8).filter(row => {
          if (!appliedUserSubstring) {
            return true;
          }
          return row.user.toLocaleLowerCase('ru-RU').includes(appliedUserSubstring.toLocaleLowerCase('ru-RU'));
        }),
      [appliedUserSubstring],
    );

    const columnsWithFilter = useMemo(
      () =>
        demoColumns.slice(0, 3).map((column, columnIndex) =>
          columnIndex === 0
            ? {
                ...column,
                filterable: true,
                filterApplied: Boolean(appliedUserSubstring?.trim()),
              }
            : column,
        ),
      [appliedUserSubstring],
    );

    return (
      <DataGridStoryBlock>
        <DataGridStoryHint>
          Нажмите иконку воронки в заголовке «Пользователь». Панель под таблицей — упрощённый пример; вариант с `Dropdown` см. **Фильтр в шапке колонки**.
        </DataGridStoryHint>
        <DataGrid<DataGridStoryDemoRow>
          tableId="story-data-grid-builtin-filter-icon"
          columns={columnsWithFilter}
          rows={filteredRows}
          totalRows={filteredRows.length}
          onColumnFilterClick={({ field }) => {
            if (field === 'user') {
              setFilterPanelOpen(true);
              setDraftUserSubstring(appliedUserSubstring);
            }
          }}
          size={Size.MD}
        />
        {filterPanelOpen ? (
          <ColumnFilterPanel
            size={Size.MD}
            onApply={() => {
              setAppliedUserSubstring(draftUserSubstring.trim());
              setFilterPanelOpen(false);
            }}
            onClear={() => {
              setAppliedUserSubstring('');
              setDraftUserSubstring('');
              setFilterPanelOpen(false);
            }}
          >
            <DataGridStoryFilterFieldLabel htmlFor={filterInputDomId}>Подстрока в «Пользователь»:</DataGridStoryFilterFieldLabel>
            <Input
              id={filterInputDomId}
              value={draftUserSubstring}
              onChange={event => {
                setDraftUserSubstring(event.target.value);
              }}
              placeholder="Например, ann"
            />
          </ColumnFilterPanel>
        ) : null}
      </DataGridStoryBlock>
    );
  },
};

/**
 * Три колонки с разным `filterIconPosition`: у левого края, компактно у заголовка, у правого края (по умолчанию).
 */
export const FilterIconPositions: Story = {
  name: 'Иконка фильтра: позиция в заголовке',
  parameters: {
    docs: {
      description: {
        story:
          'У колонок **Пользователь** / **Статус** / **Дата** заданы `filterIconPosition`: `leading`, `inlineTitle`, `trailing`. Ширина колонок увеличена, чтобы визуально сравнить режимы. Клик по иконке — в Actions (без панели фильтра).',
      },
    },
  },
  render: function FilterIconPositionsStory() {
    const columns: DataGridColumn<DataGridStoryDemoRow>[] = useMemo(() => {
      const userColumn = demoColumns.find(column => column.field === 'user');
      const stateColumn = demoColumns.find(column => column.field === 'tag.color');
      const dateColumn = demoColumns.find(column => column.field === 'dateLabel');
      if (!userColumn || !stateColumn || !dateColumn) {
        return demoColumns.slice(0, 3).map((column, columnIndex) => ({
          ...column,
          filterable: true,
          filterIconPosition: (['leading', 'inlineTitle', 'trailing'] as const)[columnIndex],
          minWidth: 200,
          sortable: false,
        }));
      }
      return [
        {
          ...userColumn,
          headerName: 'Пользователь (leading)',
          filterable: true,
          filterIconPosition: 'leading' satisfies DataGridColumnFilterIconPosition,
          minWidth: 200,
          sortable: false,
        },
        {
          ...stateColumn,
          headerName: 'Статус (inlineTitle)',
          filterable: true,
          filterIconPosition: 'inlineTitle' satisfies DataGridColumnFilterIconPosition,
          minWidth: 200,
          sortable: false,
        },
        {
          ...dateColumn,
          headerName: 'Дата (trailing)',
          filterable: true,
          filterIconPosition: 'trailing' satisfies DataGridColumnFilterIconPosition,
          minWidth: 200,
          sortable: false,
        },
      ];
    }, []);

    return (
      <DataGridStoryBlock>
        <DataGridStoryHint>
          Свойство <code>columns[].filterIconPosition</code>: иконка слева от текста, сразу после текста без
          растягивания заголовка, или справа в ячейке (как раньше по умолчанию).
        </DataGridStoryHint>
        <DataGrid<DataGridStoryDemoRow>
          tableId="story-data-grid-filter-icon-position"
          columns={columns}
          rows={TABLE_STORY_DEMO_ROWS.slice(0, 6)}
          totalRows={6}
          onColumnFilterClick={fn()}
          size={Size.MD}
        />
      </DataGridStoryBlock>
    );
  },
};

/**
 * Кастомная иконка и цвета фильтра: `filterIconProps` и при активном фильтре `filterIconPropsApplied`.
 */
export const FilterIconCustomization: Story = {
  name: 'Иконка фильтра: кастомизация',
  parameters: {
    docs: {
      description: {
        story:
          'Колонка **Пользователь** с `filterIconProps` (`IconExFilter2`, цвет по умолчанию `currentColor`) и `filterIconPropsApplied` (белый `color` на заливке `info` после «Применить»). Альтернатива: полностью свой узел в `filterIcon`.',
      },
    },
  },
  render: function FilterIconCustomizationStory() {
    const filterFieldReactId = useId();
    const filterInputDomId = `story-filter-icon-custom-${filterFieldReactId.replace(/:/g, '')}`;
    const [appliedUserSubstring, setAppliedUserSubstring] = useState('');
    const [draftUserSubstring, setDraftUserSubstring] = useState('');
    const [filterPanelOpen, setFilterPanelOpen] = useState(false);

    const filteredRows = useMemo(
      () =>
        TABLE_STORY_DEMO_ROWS.slice(0, 8).filter(row => {
          if (!appliedUserSubstring) {
            return true;
          }
          return row.user.toLocaleLowerCase('ru-RU').includes(appliedUserSubstring.toLocaleLowerCase('ru-RU'));
        }),
      [appliedUserSubstring],
    );

    const columnsWithFilter = useMemo(
      () =>
        demoColumns.slice(0, 3).map((column, columnIndex) =>
          columnIndex === 0
            ? {
                ...column,
                filterable: true,
                filterApplied: Boolean(appliedUserSubstring?.trim()),
                filterIconProps: { name: 'IconExFilter2' as const },
                filterIconPropsApplied: { color: '#ffffff' },
              }
            : column,
        ),
      [appliedUserSubstring],
    );

    return (
      <DataGridStoryBlock>
        <DataGridStoryHint>
          Иконка по умолчанию другая; после применения фильтра — белая на синей плашке. Можно задать{' '}
          <code>filterIcon</code> с любым <code>ReactNode</code> (например <code>Icon</code> вручную).
        </DataGridStoryHint>
        <DataGrid<DataGridStoryDemoRow>
          tableId="story-data-grid-filter-icon-custom"
          columns={columnsWithFilter}
          rows={filteredRows}
          totalRows={filteredRows.length}
          onColumnFilterClick={({ field }) => {
            if (field === 'user') {
              setFilterPanelOpen(true);
              setDraftUserSubstring(appliedUserSubstring);
            }
          }}
          size={Size.MD}
        />
        {filterPanelOpen ? (
          <ColumnFilterPanel
            size={Size.MD}
            onApply={() => {
              setAppliedUserSubstring(draftUserSubstring.trim());
              setFilterPanelOpen(false);
            }}
            onClear={() => {
              setAppliedUserSubstring('');
              setDraftUserSubstring('');
              setFilterPanelOpen(false);
            }}
          >
            <DataGridStoryFilterFieldLabel htmlFor={filterInputDomId}>Подстрока в «Пользователь»:</DataGridStoryFilterFieldLabel>
            <Input
              id={filterInputDomId}
              value={draftUserSubstring}
              onChange={event => {
                setDraftUserSubstring(event.target.value);
              }}
              placeholder="Например, ann"
            />
          </ColumnFilterPanel>
        ) : null}
      </DataGridStoryBlock>
    );
  },
};

/**
 * Полностью свой узел в `filterIcon` (приоритет над `filterIconProps`).
 */
export const FilterIconCustomNode: Story = {
  name: 'Иконка фильтра: свой ReactNode',
  parameters: {
    docs: {
      description: {
        story: 'Колонка **Пользователь** с `filterIcon`: произвольный `ReactNode` внутри кнопки (здесь `Icon` с `IconExSettings`).',
      },
    },
  },
  render: function FilterIconCustomNodeStory() {
    const filterFieldReactId = useId();
    const filterInputDomId = `story-filter-icon-node-${filterFieldReactId.replace(/:/g, '')}`;
    const [appliedUserSubstring, setAppliedUserSubstring] = useState('');
    const [draftUserSubstring, setDraftUserSubstring] = useState('');
    const [filterPanelOpen, setFilterPanelOpen] = useState(false);

    const filteredRows = useMemo(
      () =>
        TABLE_STORY_DEMO_ROWS.slice(0, 8).filter(row => {
          if (!appliedUserSubstring) {
            return true;
          }
          return row.user.toLocaleLowerCase('ru-RU').includes(appliedUserSubstring.toLocaleLowerCase('ru-RU'));
        }),
      [appliedUserSubstring],
    );

    const columnsWithFilter = useMemo(
      () =>
        demoColumns.slice(0, 3).map((column, columnIndex) =>
          columnIndex === 0
            ? {
                ...column,
                filterable: true,
                filterApplied: Boolean(appliedUserSubstring?.trim()),
                filterIconProps: { name: 'IconExFilter2' as const },
                filterIcon: <Icon name="IconExSettings" size={IconSize.XS} color="currentColor" />,
              }
            : column,
        ),
      [appliedUserSubstring],
    );

    return (
      <DataGridStoryBlock>
        <DataGridStoryHint>
          <code>filterIconProps</code> здесь игнорируется: задан <code>filterIcon</code>.
        </DataGridStoryHint>
        <DataGrid<DataGridStoryDemoRow>
          tableId="story-data-grid-filter-icon-node"
          columns={columnsWithFilter}
          rows={filteredRows}
          totalRows={filteredRows.length}
          onColumnFilterClick={({ field }) => {
            if (field === 'user') {
              setFilterPanelOpen(true);
              setDraftUserSubstring(appliedUserSubstring);
            }
          }}
          size={Size.MD}
        />
        {filterPanelOpen ? (
          <ColumnFilterPanel
            size={Size.MD}
            onApply={() => {
              setAppliedUserSubstring(draftUserSubstring.trim());
              setFilterPanelOpen(false);
            }}
            onClear={() => {
              setAppliedUserSubstring('');
              setDraftUserSubstring('');
              setFilterPanelOpen(false);
            }}
          >
            <DataGridStoryFilterFieldLabel htmlFor={filterInputDomId}>Подстрока в «Пользователь»:</DataGridStoryFilterFieldLabel>
            <Input
              id={filterInputDomId}
              value={draftUserSubstring}
              onChange={event => {
                setDraftUserSubstring(event.target.value);
              }}
              placeholder="Например, ann"
            />
          </ColumnFilterPanel>
        ) : null}
      </DataGridStoryBlock>
    );
  },
};

/**
 * Перетаскивание строк за ручку: `enableRowDrag` + `onRowDragEnd` (порядок строк хранится в стейте сторис).
 */
export const RowReorder: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`enableRowDrag` добавляет колонку-ручку. Успешный drop: **`onRowDragEnd(orderedIds)`** — полный порядок id на странице. Дополнительно **`onRowDragStart`**, **`onRowDragCancel`** (та же строка или отпускание вне цели). События в **Actions** через `fn()`.',
      },
    },
  },
  render: function RowReorderStory() {
    const [rowsState, setRowsState] = useState<DataGridStoryDemoRow[]>(() => [...TABLE_STORY_DEMO_ROWS]);
    const onRowDragStart = useMemo(() => fn(), []);
    const onRowDragCancel = useMemo(() => fn(), []);

    return (
      <DataGridStoryBlock>
        <DataGridStoryHint>
          Тяните иконку слева от строки и отпустите на другой ряд, чтобы изменить порядок. Actions — старт и отмена DnD.
        </DataGridStoryHint>
        <DataGrid<DataGridStoryDemoRow>
          tableId="story-data-grid-row-dnd"
          columns={demoColumns.slice(0, 3)}
          rows={rowsState}
          totalRows={rowsState.length}
          enableRowDrag
          onRowDragStart={onRowDragStart}
          onRowDragEnd={orderedIds => {
            const byId = new Map(rowsState.map(row => [row.id, row]));
            const next = orderedIds.map(id => byId.get(id)).filter((row): row is DataGridStoryDemoRow => row != null);
            if (next.length === rowsState.length) {
              setRowsState(next);
            }
          }}
          onRowDragCancel={onRowDragCancel}
          size={Size.MD}
        />
      </DataGridStoryBlock>
    );
  },
};

/** Серверная пагинация: в `rows` только текущая страница, `totalRows` — полный объём (имитация ответа API). */
export const ServerPaginationMode: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`paginationMode="server"`: родитель отдаёт уже нарезанный массив `rows` для активной страницы; `totalRows` задаёт длину общего списка на сервере. Смена страницы в стейте подставляет другой срез из того же демо-массива.',
      },
    },
  },
  render: () => {
    const [paginationModel, setPaginationModel] = useState<DataGridPaginationModel>({ page: 0, pageSize: 3 });

    const visibleRows = useMemo(() => {
      const startIndex = paginationModel.page * paginationModel.pageSize;
      return TABLE_STORY_DEMO_ROWS.slice(startIndex, startIndex + paginationModel.pageSize);
    }, [paginationModel.page, paginationModel.pageSize]);

    return (
      <DataGrid<DataGridStoryDemoRow>
        tableId="story-data-grid-server-page"
        columns={demoColumns}
        rows={visibleRows}
        totalRows={TABLE_STORY_DEMO_ROWS.length}
        paginationModel={paginationModel}
        onPaginationChange={setPaginationModel}
        paginationMode="server"
        rowsPerPageOptions={[2, 3, 5]}
        stickyHeader
        size={Size.MD}
      />
    );
  },
};

/** Клики по строке: `onRowClick` и `onRowDoubleClick` (+ подсказка с последним событием). */
export const RowClickHandlers: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Обработчики получают объект строки и нативное событие мыши. Используйте для навигации, контекстного меню или модалки по двойному клику.',
      },
    },
  },
  render: () => {
    const [lastEventLabel, setLastEventLabel] = useState<string>('—');

    return (
      <DataGridStoryBlock>
        <DataGridStoryHint>Последнее событие: {lastEventLabel}</DataGridStoryHint>
        <DataGrid<DataGridStoryDemoRow>
          tableId="story-data-grid-row-click"
          columns={demoColumns.slice(0, 4)}
          rows={TABLE_STORY_DEMO_ROWS}
          totalRows={TABLE_STORY_DEMO_ROWS.length}
          onRowClick={(rowData, mouseEvent) => {
            setLastEventLabel(`click: ${rowData.user} (${mouseEvent.detail})`);
          }}
          onRowDoubleClick={rowData => {
            setLastEventLabel(`dblclick: ${rowData.user}`);
          }}
          size={Size.MD}
        />
      </DataGridStoryBlock>
    );
  },
};

/** Фон строки по данным: `rowBackgroundColorByStatus` (например подсветка по тегу). */
export const RowBackgroundByStatus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Функция возвращает CSS-цвет фона строки или `undefined`, чтобы оставить фон по умолчанию (зебра/карточка). Не дублирует `disabledIds` — только визуальный акцент.',
      },
    },
  },
  render: () => (
    <DataGrid<DataGridStoryDemoRow>
      tableId="story-data-grid-row-bg"
      columns={demoColumns.slice(0, 4)}
      rows={TABLE_STORY_DEMO_ROWS.slice(0, 8)}
      totalRows={8}
      rowBackgroundColorByStatus={demoRow =>
        demoRow.tag?.color === 'danger' ? 'rgba(239, 68, 68, 0.08)' : undefined
      }
      size={Size.MD}
    />
  ),
};

/** Обёртка над строкой `tr`: `renderRowWrapper` (например `data-*` или провайдер контекста). */
export const RenderRowWrapper: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`children` — уже собранный элемент строки; клонируйте его и добавьте атрибуты на `tr` или оберните в провайдер. Корень по-прежнему один `tr`.',
      },
    },
  },
  render: () => (
    <DataGrid<DataGridStoryDemoRow>
      tableId="story-data-grid-row-wrapper"
      columns={demoColumns.slice(0, 3)}
      rows={TABLE_STORY_DEMO_ROWS.slice(0, 5)}
      totalRows={5}
      renderRowWrapper={({ row, children }) =>
        React.cloneElement(children, {
          'data-demo-user': row.user,
        } as React.HTMLAttributes<HTMLTableRowElement>)
      }
      size={Size.MD}
    />
  ),
};

/**
 * Стабильный id строки через `getRowId`: `selectedIds` и колбэки должны использовать те же значения.
 */
export const CustomRowIdentifier: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Если доменный ключ не совпадает с полем `id`, верните его из `getRowId`. Здесь префикс `row_` для наглядности; в `selectedIds` используются те же строки.',
      },
    },
  },
  render: () => {
    const [selectedPrefixedIds, setSelectedPrefixedIds] = useState<string[]>(['row_2']);

    return (
      <DataGrid<DataGridStoryDemoRow>
        tableId="story-data-grid-custom-id"
        columns={demoColumns.slice(0, 3)}
        rows={TABLE_STORY_DEMO_ROWS.slice(0, 6)}
        totalRows={6}
        displayRowSelectionColumn
        multiselect
        getRowId={demoRow => `row_${demoRow.id}`}
        selectedIds={selectedPrefixedIds}
        onRowSelectionChange={nextIds => {
          setSelectedPrefixedIds(nextIds);
        }}
        size={Size.SM}
      />
    );
  },
};

/** Глобальный рендер ячейки, если у колонки нет своего `render`. */
export const GlobalRenderCell: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`renderCell` вызывается для ячеек без колоночного `render`. Удобно для форматирования по типу поля или заполнения вычисляемых колонок.',
      },
    },
  },
  render: () => {
    const columnsWithPlainField: DataGridColumn<DataGridStoryDemoRow>[] = [
      { field: 'user', headerName: 'Пользователь', sortable: true },
      {
        field: 'comment',
        headerName: 'Комментарий',
        sortable: false,
      },
    ];

    return (
      <DataGrid<DataGridStoryDemoRow>
        tableId="story-data-grid-global-render-cell"
        columns={columnsWithPlainField}
        rows={TABLE_STORY_DEMO_ROWS.slice(0, 5)}
        totalRows={5}
        renderCell={renderParams => {
          if (renderParams.field === 'comment') {
            return <em>Нет данных (из renderCell)</em>;
          }
          if (renderParams.value == null || renderParams.value === '') {
            return '—';
          }
          return String(renderParams.value);
        }}
        size={Size.MD}
      />
    );
  },
};

/** Скрытый футер пагинации и плоская карточка без тени. */
export const HideFooterFlatCard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`hideFooter` полностью скрывает подвал с пагинацией. `elevated={false}` убирает тень у `TableContainer` (бордер и фон карточки сохраняются). `tableAriaLabel` задаёт доступное имя таблицы.',
      },
    },
  },
  render: () => (
    <DataGrid<DataGridStoryDemoRow>
      tableId="story-data-grid-hide-footer"
      columns={demoColumns.slice(0, 3)}
      rows={TABLE_STORY_DEMO_ROWS.slice(0, 6)}
      totalRows={6}
      hideFooter
      elevated={false}
      tableAriaLabel="Таблица без подвала пагинации"
      size={Size.MD}
    />
  ),
};

