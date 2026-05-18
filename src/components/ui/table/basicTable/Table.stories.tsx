import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Size } from '@/types/sizes';
import type { TableSortDirection } from '@/types/ui';
import {
  TableContainer,
  TableContainerScroll,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  TableSortLabel,
} from './index';
import { clampTablePageZeroBased, getTableTotalPages, toggleTableSortDirection } from './handlers';
import { TableStoriesDataGridDemo } from './TableStoriesDataGridDemo.story';
import { TABLE_KIT_DOC } from '../storyDocs/documentation';
import { TableCellHeadLineClamp } from './Table.style';
import { TableWithTextFilterInHeader as tableColumnFilterTableStorySource } from './TableColumnFilters.stories';
import { tableStoriesStyles } from './Table.stories.styles';
import { noopHandler } from '@/handlers';

const meta: Meta<typeof Table> = {
  title: 'UI Kit/Data Display/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: TABLE_KIT_DOC,
      },
    },
  },
  argTypes: {
    stickyHeader: {
      control: 'boolean',
      description:
        'Липкая шапка: `thead th` остаётся видимой при вертикальном скролле. Родитель таблицы должен иметь ограниченную высоту и `overflow: auto`.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Плотность отступов ячеек (`md` — по умолчанию).',
    },
    striped: {
      control: 'boolean',
      description:
        'Зебра в `tbody`. По умолчанию у примитива `Table` — **выключена** (`false`): фон строк как у карточки. Явно передайте `striped`, чтобы включить чередование.',
    },
    columnDividers: {
      control: 'boolean',
      description: 'Тонкие вертикальные линии между колонками; по умолчанию включено.',
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Table>;

type Row = { id: string; name: string; calories: number };

const sampleRows: Row[] = [
  { id: '1', name: 'Замороженный йогурт', calories: 159 },
  { id: '2', name: 'Мороженое в рожке', calories: 237 },
  { id: '3', name: 'Эклер', calories: 262 },
  { id: '4', name: 'Кекс', calories: 305 },
  { id: '5', name: 'Пряник', calories: 356 },
  { id: '6', name: 'Зефир', calories: 318 },
  { id: '7', name: 'Нуга', calories: 360 },
  { id: '8', name: 'Мармелад', calories: 375 },
  { id: '9', name: 'Леденец', calories: 392 },
  { id: '10', name: 'Вафли с карамелью', calories: 408 },
  { id: '11', name: 'Пончик', calories: 452 },
  { id: '12', name: 'Яблочный пирог', calories: 411 },
  { id: '13', name: 'Чизкейк', calories: 321 },
  { id: '14', name: 'Брауни', calories: 466 },
  { id: '15', name: 'Тирамису', calories: 240 },
  { id: '16', name: 'Панна-котта', calories: 215 },
  { id: '17', name: 'Профитроли', calories: 289 },
  { id: '18', name: 'Макарон', calories: 170 },
];

/**
 * Базовая таблица, `TableFooter` с кнопкой и пагинация **снаружи** `TableContainer` (классическая вёрстка: карточка таблицы и отдельный блок пагинации).
 */
export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрирует `TableContainer` + `Table` с `striped` и `size="md"`, секцию `TableFooter`, а также `TablePagination` под карточкой. Номер страницы в state — **с нуля** (`onPageChange`). Для пагинации внутри той же карточки см. сторис **PaginationEmbeddedInCard**.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const totalPages = useMemo(
      () => getTableTotalPages(sampleRows.length, rowsPerPage),
      [rowsPerPage],
    );
    const safePage = clampTablePageZeroBased(page, totalPages);
    const slice = useMemo(() => {
      const start = safePage * rowsPerPage;
      return sampleRows.slice(start, start + rowsPerPage);
    }, [safePage, rowsPerPage]);

    return (
      <>
        <TableContainer elevated>
          <TableContainerScroll>
            <Table size="md" striped aria-label="Пример таблицы">
              <TableHead>
                <TableRow>
                  <TableCell>Блюдо</TableCell>
                  <TableCell align="right">Ккал</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slice.map((rowItem) => (
                  <TableRow key={rowItem.id}>
                    <TableCell>{rowItem.name}</TableCell>
                    <TableCell align="right">{rowItem.calories}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    align="center"
                    style={tableStoriesStyles.footerCellPadding}
                  >
                    Загрузить больше
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainerScroll>
        </TableContainer>

        <TablePagination
          count={sampleRows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[2, 3, 5]}
          onPageChange={(_unusedEvent, pageZeroBased) => {
            setPage(pageZeroBased);
          }}
          onRowsPerPageChange={(changeEvent) => {
            const nextPageSize = Number(changeEvent.target.value);
            setRowsPerPage(nextPageSize);
            setPage(0);
          }}
          size={Size.SM}
        />
      </>
    );
  },
};

/**
 * Тело таблицы без зебры: проп `striped` не передаётся (у `Table` по умолчанию `false`) — строки `tbody` с фоном карточки, только нижние разделители между строками.
 */
export const PlainBody: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Та же композиция, что у **Basic**, но без чередования фона: зебра включается только явным `striped`. В **Basic** зебра оставлена для наглядности «плотной» сетки.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const totalPages = useMemo(
      () => getTableTotalPages(sampleRows.length, rowsPerPage),
      [rowsPerPage],
    );
    const safePage = clampTablePageZeroBased(page, totalPages);
    const slice = useMemo(() => {
      const start = safePage * rowsPerPage;
      return sampleRows.slice(start, start + rowsPerPage);
    }, [safePage, rowsPerPage]);

    return (
      <>
        <TableContainer elevated>
          <TableContainerScroll>
            <Table size="md" aria-label="Таблица без зебры">
              <TableHead>
                <TableRow>
                  <TableCell>Блюдо</TableCell>
                  <TableCell align="right">Ккал</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slice.map((rowItem) => (
                  <TableRow key={rowItem.id}>
                    <TableCell>{rowItem.name}</TableCell>
                    <TableCell align="right">{rowItem.calories}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    align="center"
                    style={tableStoriesStyles.footerCellPadding}
                  >
                    Загрузить больше
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainerScroll>
        </TableContainer>

        <TablePagination
          count={sampleRows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[2, 3, 5]}
          onPageChange={(_unusedEvent, pageZeroBased) => {
            setPage(pageZeroBased);
          }}
          onRowsPerPageChange={(changeEvent) => {
            const nextPageSize = Number(changeEvent.target.value);
            setRowsPerPage(nextPageSize);
            setPage(0);
          }}
          size={Size.SM}
        />
      </>
    );
  },
};

/**
 * Полная композиция по макету: чекбоксы и indeterminate в шапке, сортировка, теги, аватар, меню строки, «Загрузить больше», пагинация внутри карточки (`embeddedInTableCard`).
 */
export const DataGridLike: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Ручная сборка того же UX, что даёт `DataGrid`: выбор строк на странице, `TableSortLabel`, узкая колонка `padding="checkbox"`, состояния строки `selected` / `disabled`. Пагинация встроена в `TableContainer` через `TablePagination` с `embeddedInTableCard`.',
      },
    },
  },
  render: () => <TableStoriesDataGridDemo />,
};

/**
 * Сортировка в шапке (`TableSortLabel`, `activeColumn`) и состояния строки (`selected`, `disabled`).
 */
export const SortableHead: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Контролируемая сортировка: клик по `TableSortLabel` меняет колонку и направление. Ячейка шапки получает `activeColumn`, когда колонка активна — усиливается нижняя граница. В теле — одна выделенная и одна неактивная строка.',
      },
    },
  },
  render: () => {
    const [orderBy, setOrderBy] = useState<'name' | 'calories'>('name');
    const [order, setOrder] = useState<TableSortDirection>('asc');

    const sorted = useMemo(() => {
      const copy = [...sampleRows];
      copy.sort((firstRow, secondRow) => {
        const firstValue = firstRow[orderBy];
        const secondValue = secondRow[orderBy];
        const comparisonResult =
          typeof firstValue === 'string'
            ? firstValue.localeCompare(String(secondValue))
            : (firstValue as number) - (secondValue as number);
        return order === 'asc' ? comparisonResult : -comparisonResult;
      });
      return copy;
    }, [order, orderBy]);

    return (
      <TableContainer elevated>
        <TableContainerScroll>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell activeColumn={orderBy === 'name'}>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : false}
                    onClick={() => {
                      if (orderBy === 'name') {
                        setOrder(toggleTableSortDirection(order));
                      } else {
                        setOrderBy('name');
                        setOrder('asc');
                      }
                    }}
                  >
                    Блюдо
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right" activeColumn={orderBy === 'calories'}>
                  <TableSortLabel
                    active={orderBy === 'calories'}
                    direction={orderBy === 'calories' ? order : false}
                    onClick={() => {
                      if (orderBy === 'calories') {
                        setOrder(toggleTableSortDirection(order));
                      } else {
                        setOrderBy('calories');
                        setOrder('asc');
                      }
                    }}
                  >
                    Ккал
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.map((rowItem, rowIndex) => (
                <TableRow key={rowItem.id} selected={rowIndex === 1}>
                  <TableCell>{rowItem.name}</TableCell>
                  <TableCell align="right">{rowItem.calories}</TableCell>
                </TableRow>
              ))}
              <TableRow disabled>
                <TableCell colSpan={2}>Неактивная строка (disabled)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainerScroll>
      </TableContainer>
    );
  },
};

/**
 * Фильтр в шапке колонки: тот же сценарий, что **Table › Column filters › TableWithTextFilterInHeader** (удобная точка входа из корня Table).
 */
export const ColumnFilterInHeader: Story = {
  name: 'Фильтр в шапке колонки',
  render: tableColumnFilterTableStorySource.render!,
  parameters: {
    docs: {
      description: {
        story:
          'Идентично **Table › Column filters › TableWithTextFilterInHeader**: иконка воронки, `Dropdown` (`multiSelection`), `ColumnFilterPanel`, `Input`; фильтр по подстроке в колонке «Пользователь».',
      },
    },
  },
};

/**
 * Ограничение высоты заголовка: `headerMaxLines` у `TableCell` + `maxLines` у `TableSortLabel`; для несортируемой ячейки — `TableCellHeadLineClamp`.
 */
export const HeadMaxLinesClamp: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`headerMaxLines={2}` на `TableCell` в шапке снимает `nowrap` и выравнивает ячейку по верху. У сортируемой колонки задайте `maxLines={2}` у `TableSortLabel`. У несортируемой длинной подписи оберните текст в `TableCellHeadLineClamp` с `$maxLines={2}`.',
      },
    },
  },
  render: () => (
    <TableContainer elevated>
      <TableContainerScroll>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell headerMaxLines={2}>
                <TableSortLabel active direction="asc" maxLines={2} onClick={noopHandler}>
                  Очень длинный заголовок колонки для проверки переноса и обрезки максимум на двух
                  строках
                </TableSortLabel>
              </TableCell>
              <TableCell headerMaxLines={2}>
                <TableCellHeadLineClamp $maxLines={2}>
                  Несортируемый заголовок тоже очень длинный — только две строки и многоточие
                </TableCellHeadLineClamp>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Ячейка A</TableCell>
              <TableCell>Ячейка B</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainerScroll>
    </TableContainer>
  ),
};

/**
 * Пагинация как нижняя часть одной карточки с таблицей (`embeddedInTableCard`), как в `DataGrid`.
 */
export const PaginationEmbeddedInCard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`TablePagination` рендерится внутри `TableContainer` после `</Table>` с пропом `embeddedInTableCard`: общий фон и скругление, верхняя граница отделения от сетки без лишнего `margin` между карточкой и футером.',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const totalPages = useMemo(
      () => getTableTotalPages(sampleRows.length, rowsPerPage),
      [rowsPerPage],
    );
    const safePage = clampTablePageZeroBased(page, totalPages);
    const slice = useMemo(() => {
      const start = safePage * rowsPerPage;
      return sampleRows.slice(start, start + rowsPerPage);
    }, [safePage, rowsPerPage]);

    return (
      <TableContainer elevated>
        <TableContainerScroll embeddedPaginationBelow>
          <Table size="md" striped aria-label="Таблица с встроенной пагинацией">
            <TableHead>
              <TableRow>
                <TableCell>Блюдо</TableCell>
                <TableCell align="right">Ккал</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slice.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainerScroll>

        <TablePagination
          embeddedInTableCard
          count={sampleRows.length}
          page={safePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[2, 3, 5]}
          onPageChange={(_event, nextPageZeroBased) => {
            setPage(nextPageZeroBased);
          }}
          onRowsPerPageChange={(changeEvent) => {
            const nextPageSize = Number(changeEvent.target.value);
            setRowsPerPage(nextPageSize);
            setPage(0);
          }}
          size={Size.SM}
        />
      </TableContainer>
    );
  },
};

/**
 * Липкая шапка: родитель с `max-height` и вертикальным скроллом.
 */
export const StickyHeader: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'У `Table` включён `stickyHeader`. Вертикальный скролл задаётся через `scrollAreaMaxHeight` у `TableContainerScroll` (один scroll-контейнер с таблицей), иначе липкость ломается.',
      },
    },
  },
  render: () => (
    <TableContainer elevated={false}>
      <TableContainerScroll scrollAreaMaxHeight={220}>
        <Table stickyHeader striped size="md" aria-label="Таблица со липкой шапкой">
          <TableHead>
            <TableRow>
              <TableCell>Блюдо</TableCell>
              <TableCell align="right">Ккал</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleRows.map((rowItem) => (
              <TableRow key={rowItem.id}>
                <TableCell>{rowItem.name}</TableCell>
                <TableCell align="right">{rowItem.calories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainerScroll>
    </TableContainer>
  ),
};

/**
 * Зебра и размеры `sm` / `md` для сравнения плотности.
 */
export const StripedSizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Две таблицы друг под другом: `striped` и размеры `sm` и `md`. Полезно подбирать плотность под экран.',
      },
    },
  },
  render: () => (
    <div style={tableStoriesStyles.stripedSizesContainer}>
      <TableContainer elevated>
        <TableContainerScroll>
          <Table striped size="sm" aria-label="Плотность sm">
            <TableHead>
              <TableRow>
                <TableCell>Блюдо</TableCell>
                <TableCell align="right">Ккал</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sampleRows.slice(0, 5).map((rowItem) => (
                <TableRow key={rowItem.id}>
                  <TableCell>{rowItem.name}</TableCell>
                  <TableCell align="right">{rowItem.calories}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainerScroll>
      </TableContainer>
      <TableContainer elevated>
        <TableContainerScroll>
          <Table striped size="md" aria-label="Плотность md">
            <TableHead>
              <TableRow>
                <TableCell>Блюдо</TableCell>
                <TableCell align="right">Ккал</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sampleRows.slice(0, 5).map((rowItem) => (
                <TableRow key={rowItem.id}>
                  <TableCell>{rowItem.name}</TableCell>
                  <TableCell align="right">{rowItem.calories}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainerScroll>
      </TableContainer>
    </div>
  ),
};
