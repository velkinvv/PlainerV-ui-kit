import React, { useCallback, useId, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@/themes/ThemeProvider';
import { Size, IconSize } from '@/types/sizes';
import type { DataGridColumn } from '@/types/ui';
import { Dropdown } from '../../Dropdown/Dropdown';
import { Icon } from '../../Icon/Icon';
import { Input } from '../../inputs/Input/Input';
import { ColumnFilterPanel } from '../columnFilter/ColumnFilterPanel';
import { DataGrid } from '../dataGrid/DataGrid';
import { TABLE_STORY_DEMO_ROWS, type DataGridStoryDemoRow } from '../dataGrid/dataGridStoryDemoData';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableContainerScroll,
  TableHead,
  TableRow,
} from './index';
import { TableHeaderFilterIconButton } from './tableHeaderFilterIconButton.style';
import {
  StoryColumnFilterFieldLabel,
  StoryColumnFilterHeaderRow,
  StoryColumnFilterHeaderTitle,
  StoryColumnFiltersIntro,
  StoryColumnFiltersPage,
  StoryColumnFiltersPageWide,
} from './TableColumnFilters.stories.style';

const meta: Meta = {
  title: 'UI Kit/Data Display/Table/Column filters',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Примеры фильтрации по колонке в духе Admiral: `headerName` как React-узел, **Dropdown** с `multiSelection` (меню не закрывается при кликах внутри панели), внутри — **ColumnFilterPanel** и произвольное поле (**Input** / **DateInput**). Закрытие по «Применить» — через контролируемое `isMenuOpen` / `onMenuOpenChange`. Те же сценарии продублированы в корне **Table** и **DataGrid** сторис **ColumnFilterInHeader** (удобный поиск в сайдбаре). Встроенная иконка без кастомного `headerName`: **DataGrid › Встроенная иконка фильтра** (`filterable` + `onColumnFilterClick`).',
      },
    },
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

type TextFilterHeaderProps = {
  /** Подпись в шапке колонки */
  columnTitle: string;
  /** Текущее применённое значение (для подсказки / демо) */
  appliedValue: string;
  /** Обновление применённого фильтра */
  onApplyFilter: (nextValue: string) => void;
  /** Сброс фильтра */
  onClearFilter: () => void;
};

/**
 * Заголовок колонки с иконкой воронки и панелью фильтра (текстовое поле + Применить / Очистить).
 * @param columnTitle — видимый заголовок
 * @param appliedValue — значение после «Применить» (для демо)
 * @param onApplyFilter — вызывается с черновым значением при подтверждении
 * @param onClearFilter — сброс
 */
function TextFilterColumnHeader({
  columnTitle,
  appliedValue,
  onApplyFilter,
  onClearFilter,
}: TextFilterHeaderProps): React.ReactElement {
  const filterFieldReactId = useId();
  const filterInputDomId = `column-filter-draft-${filterFieldReactId.replace(/:/g, '')}`;
  const [menuOpen, setMenuOpen] = useState(false);
  const [draftValue, setDraftValue] = useState(appliedValue);

  const handleMenuOpenChange = useCallback(
    (nextOpen: boolean) => {
      setMenuOpen(nextOpen);
      if (nextOpen) {
        setDraftValue(appliedValue);
      }
    },
    [appliedValue],
  );

  return (
    <StoryColumnFilterHeaderRow>
      <StoryColumnFilterHeaderTitle>{columnTitle}</StoryColumnFilterHeaderTitle>
      <Dropdown
        multiSelection
        isMenuOpen={menuOpen}
        onMenuOpenChange={handleMenuOpenChange}
        size={Size.SM}
        menuWidth={300}
        trigger={
          <TableHeaderFilterIconButton
            type="button"
            aria-label={
              appliedValue?.trim()
                ? `Фильтр по колонке «${columnTitle}», фильтр активен`
                : `Фильтр по колонке «${columnTitle}»`
            }
            $filterApplied={Boolean(appliedValue?.trim())}
          >
            <Icon name="IconExFilter" size={IconSize.XS} color="currentColor" />
          </TableHeaderFilterIconButton>
        }
      >
        <ColumnFilterPanel
          size={Size.SM}
          presentation="embeddedInDropdown"
          onApply={() => {
            onApplyFilter(draftValue.trim());
            setMenuOpen(false);
          }}
          onClear={() => {
            setDraftValue('');
            onClearFilter();
            setMenuOpen(false);
          }}
        >
          <StoryColumnFilterFieldLabel htmlFor={filterInputDomId}>Значение:</StoryColumnFilterFieldLabel>
          <Input
            id={filterInputDomId}
            value={draftValue}
            onChange={event => {
              setDraftValue(event.target.value);
            }}
            placeholder="Введите текст"
            size={Size.SM}
          />
        </ColumnFilterPanel>
      </Dropdown>
    </StoryColumnFilterHeaderRow>
  );
}

/** Примитивная таблица: фильтр в шапке первой колонки, без DataGrid. */
export const TableWithTextFilterInHeader: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`TableContainer` → `TableContainerScroll` → `Table`; в `TableCell` шапки — `TextFilterColumnHeader` с **Dropdown** + **ColumnFilterPanel** + **Input**.',
      },
    },
  },
  render: function TableWithTextFilterInHeaderStory() {
    const [userFilter, setUserFilter] = useState('');

    const rows = useMemo(
      () =>
        TABLE_STORY_DEMO_ROWS.slice(0, 6).filter(row => {
          if (!userFilter) {
            return true;
          }
          return row.user.toLowerCase().includes(userFilter.toLowerCase());
        }),
      [userFilter],
    );

    return (
      <StoryColumnFiltersPage>
        <StoryColumnFiltersIntro>
          Фильтр по подстроке в колонке User. Панель — ColumnFilterPanel внутри Dropdown с multiSelection, чтобы
          клики по полю не закрывали меню до «Применить».
        </StoryColumnFiltersIntro>
        <TableContainer elevated>
          <TableContainerScroll>
            <Table size="md" striped aria-label="Таблица с фильтром в шапке">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TextFilterColumnHeader
                      columnTitle="User"
                      appliedValue={userFilter}
                      onApplyFilter={setUserFilter}
                      onClearFilter={() => {
                        setUserFilter('');
                      }}
                    />
                  </TableCell>
                  <TableCell>State</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell>{row.user}</TableCell>
                    <TableCell>{row.tag?.label ?? '—'}</TableCell>
                    <TableCell align="right">{row.dateLabel}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainerScroll>
        </TableContainer>
      </StoryColumnFiltersPage>
    );
  },
};

/** DataGrid: `headerName` с тем же заголовком-фильтром. */
export const DataGridWithTextFilterInHeader: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Те же пропсы колонок (`headerName` как ReactNode). Пагинация не передаётся — только фильтр и срез строк в state.',
      },
    },
  },
  render: function DataGridWithTextFilterInHeaderStory() {
    const [userFilter, setUserFilter] = useState('');

    const columns: DataGridColumn<DataGridStoryDemoRow>[] = useMemo(
      () => [
        {
          field: 'user',
          headerName: (
            <TextFilterColumnHeader
              columnTitle="User"
              appliedValue={userFilter}
              onApplyFilter={setUserFilter}
              onClearFilter={() => {
                setUserFilter('');
              }}
            />
          ),
          sortable: false,
        },
        {
          field: 'tag',
          headerName: 'State',
          sortable: false,
          render: ({ row }) => row.tag?.label ?? '—',
        },
        { field: 'dateLabel', headerName: 'Date', align: 'right', sortable: false },
      ],
      [userFilter],
    );

    const filteredRows = useMemo(
      () =>
        TABLE_STORY_DEMO_ROWS.slice(0, 8).filter(row => {
          if (!userFilter) {
            return true;
          }
          return row.user.toLowerCase().includes(userFilter.toLowerCase());
        }),
      [userFilter],
    );

    return (
      <StoryColumnFiltersPageWide>
        <StoryColumnFiltersIntro>
          DataGrid без пагинации: фильтр в первой колонке, в rows передаётся уже отфильтрованный срез (как при
          клиентской фильтрации).
        </StoryColumnFiltersIntro>
        <DataGrid<DataGridStoryDemoRow>
          tableId="story-datagrid-column-filter"
          columns={columns}
          rows={filteredRows}
          totalRows={filteredRows.length}
          size={Size.MD}
        />
      </StoryColumnFiltersPageWide>
    );
  },
};
