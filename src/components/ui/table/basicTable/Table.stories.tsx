import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@/themes/ThemeProvider';
import { Size } from '@/types/sizes';
import type { TableSortDirection } from '@/types/ui';
import {
  TableContainer,
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
import { TableStoriesDataGridDemo } from './TableStoriesDataGridDemo';

const meta: Meta<typeof Table> = {
  title: 'UI Kit/Data Display/Table',
  component: Table,
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '╨Я╤А╨╕╨╝╨╕╤В╨╕╨▓╤Л ╤В╨░╨▒╨╗╨╕╤Ж╤Л ╨┐╨╛ ╤Б╤В╤А╤Г╨║╤В╤Г╤А╨╡ MUI Table: ╨║╨╛╨╜╤В╨╡╨╣╨╜╨╡╤А, ╤Б╨╡╨║╤Ж╨╕╨╕, ╤Б╤В╤А╨╛╨║╨╕, ╤П╤З╨╡╨╣╨║╨╕, ╤Б╨╛╤А╤В╨╕╤А╨╛╨▓╨║╨░ ╨▓ ╤И╨░╨┐╨║╨╡, ╨┐╨░╨│╨╕╨╜╨░╤Ж╨╕╤П. ╨б╤В╨╛╤А╨╕╤Б ┬лDataGridLike┬╗ тАФ ╤З╨╡╨║╨▒╨╛╨║╤Б╤Л, ╤В╨╡╨│╨╕, ╨░╨▓╨░╤В╨░╤А, ╨╝╨╡╨╜╤О ╤Б╤В╤А╨╛╨║╨╕ ╨╕ ╨┐╨╛╨┤╨▓╨░╨╗ ╨║╨░╨║ ╨▓ ╨╝╨░╨║╨╡╤В╨╡ Figma.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Table>;

type Row = { id: string; name: string; calories: number };

const sampleRows: Row[] = [
  { id: '1', name: 'Frozen yoghurt', calories: 159 },
  { id: '2', name: 'Ice cream sandwich', calories: 237 },
  { id: '3', name: 'Eclair', calories: 262 },
  { id: '4', name: 'Cupcake', calories: 305 },
  { id: '5', name: 'Gingerbread', calories: 356 },
];

/**
 * ╨С╨░╨╖╨╛╨▓╨░╤П ╤В╨░╨▒╨╗╨╕╤Ж╨░ + ╨┐╨░╨│╨╕╨╜╨░╤Ж╨╕╤П (╤Б╤В╤А╨░╨╜╨╕╤Ж╨░ ╤Б ╨╜╤Г╨╗╤П, ╨║╨░╨║ ╨▓ MUI).
 */
export const Basic: Story = {
  render: () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const totalPages = useMemo(() => getTableTotalPages(sampleRows.length, rowsPerPage), [rowsPerPage]);
    const safePage = clampTablePageZeroBased(page, totalPages);
    const slice = useMemo(() => {
      const start = safePage * rowsPerPage;
      return sampleRows.slice(start, start + rowsPerPage);
    }, [safePage, rowsPerPage]);

    return (
      <>
        <TableContainer elevated>
          <Table size="md" striped aria-label="╨Я╤А╨╕╨╝╨╡╤А ╤В╨░╨▒╨╗╨╕╤Ж╤Л">
            <TableHead>
              <TableRow>
                <TableCell>Dessert</TableCell>
                <TableCell align="right">Calories</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slice.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2} align="center" style={{ padding: '16px' }}>
                  ╨Ч╨░╨│╤А╤Г╨╖╨╕╤В╤М ╨▒╨╛╨╗╤М╤И╨╡
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        <TablePagination
          count={sampleRows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[2, 3, 5]}
          onPageChange={(_e, p) => {
            setPage(p);
          }}
          onRowsPerPageChange={e => {
            const next = Number(e.target.value);
            setRowsPerPage(next);
            setPage(0);
          }}
          size={Size.SM}
        />
      </>
    );
  },
};

/**
 * ╨Я╨╛╨╗╨╜╨░╤П ╨║╨╛╨╝╨┐╨╛╨╖╨╕╤Ж╨╕╤П: `Checkbox`, `Tag`, `Avatar`, `IconButton`, ┬л╨Ч╨░╨│╤А╤Г╨╖╨╕╤В╤М ╨▒╨╛╨╗╤М╤И╨╡┬╗, `TablePagination`.
 */
export const DataGridLike: Story = {
  render: () => <TableStoriesDataGridDemo />,
};

/**
 * ╨б╨╛╤А╤В╨╕╤А╨╛╨▓╨║╨░ ╨▓ ╤И╨░╨┐╨║╨╡ (`TableSortLabel`) ╨╕ ╨▓╤Л╨┤╨╡╨╗╨╡╨╜╨╜╨░╤П ╤Б╤В╤А╨╛╨║╨░.
 */
export const SortableHead: Story = {
  render: () => {
    const [orderBy, setOrderBy] = useState<'name' | 'calories'>('name');
    const [order, setOrder] = useState<TableSortDirection>('asc');

    const sorted = useMemo(() => {
      const copy = [...sampleRows];
      copy.sort((a, b) => {
        const av = a[orderBy];
        const bv = b[orderBy];
        const cmp = typeof av === 'string' ? av.localeCompare(String(bv)) : (av as number) - (bv as number);
        return order === 'asc' ? cmp : -cmp;
      });
      return copy;
    }, [order, orderBy]);

    return (
      <TableContainer elevated>
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
                  Dessert
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
                  Calories
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((row, i) => (
              <TableRow key={row.id} selected={i === 1}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
              </TableRow>
            ))}
            <TableRow disabled>
              <TableCell colSpan={2}>
                ╨Э╨╡╨░╨║╤В╨╕╨▓╨╜╨░╤П ╤Б╤В╤А╨╛╨║╨░ (disabled)
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  },
};

